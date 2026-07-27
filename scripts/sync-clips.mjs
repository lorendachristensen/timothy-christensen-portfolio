/**
 * sync-clips.mjs — hands-off, self-healing capture of Timothy Christensen's O'Colly work.
 *
 * Each run:
 *  1) DISCOVER  — poll the O'Colly RSS feed (sanctioned syndication channel, never 429s) for
 *                 any newly-published articles; grab headline/date/byline/summary/feature photo.
 *  2) ARCHIVE   — for clips without an owned full-text copy yet, fetch the article page and
 *                 extract the full body + photographer credit, and write a self-contained
 *                 fallback page to fulltext/<id>.html. Paced (BACKFILL_LIMIT per run) so we
 *                 never hammer the source.
 *  3) HEAL      — re-check every clip's O'Colly URL. Only a definitive 404/410 marks it dead
 *                 (a timeout/429/500 is treated as still-live, so a transient hiccup never
 *                 wrongly flips the site to the fallback).
 *
 * The site links "Read full story" -> live O'Colly URL while healthy, else -> the archived
 * fallback page. So new articles appear automatically and removed ones self-heal to our copy.
 *
 * Pure Node (global fetch + fs), no dependencies. Usage: node scripts/sync-clips.mjs
 * Env: BACKFILL_LIMIT (default 6), SKIP_LIVECHECK=1 to skip stage 3.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CLIPS = join(ROOT, 'clips.json');
const IMAGES = join(ROOT, 'images');
const FULLTEXT = join(ROOT, 'fulltext');
const FEED = 'https://www.ocolly.com/search/?f=rss&sd=desc&l=50&nsa=eedition&q=Timothy+Christensen';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const BACKFILL_LIMIT = parseInt(process.env.BACKFILL_LIMIT || '6', 10);

const ents = (s) => s
  .replace(/&#8217;|&#x2019;/g, '’').replace(/&#8216;/g, '‘')
  .replace(/&#8220;/g, '“').replace(/&#8221;/g, '”')
  .replace(/&#8230;/g, '…').replace(/&#8212;/g, '—').replace(/&#8211;/g, '–')
  .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&');
const strip = (s) => ents(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clean = (s) => (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').trim();
const pick = (block, tag) => { const m = block.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>')); return m ? clean(m[1]) : ''; };
const enc = (block) => { const m = block.match(/<enclosure[^>]*url="([^"]+)"/); return m ? clean(m[1]) : ''; };

// O'Colly URL sport-slug (the path segment before the article slug) -> our canonical category key.
// Gendered and cross-country/track spelling variants fold onto one key so the display stays consistent.
// Anything not listed here falls through to 'sports' (shown as "General") and can be retagged by hand.
const SECTION_SLUGS = {
  football: 'football',
  mens_basketball: 'mens_basketball', womens_basketball: 'womens_basketball',
  baseball: 'baseball', softball: 'softball',
  golf: 'golf', mens_golf: 'golf', womens_golf: 'golf',
  soccer: 'soccer', mens_soccer: 'soccer', womens_soccer: 'soccer',
  tennis: 'tennis', mens_tennis: 'tennis', womens_tennis: 'tennis',
  cross_country: 'track', track: 'track', track_and_field: 'track', track_field: 'track',
  wrestling: 'wrestling', equestrian: 'equestrian',
};
const section = (url) => { const p = new URL(url).pathname.split('/').filter(Boolean); const ai = p.findIndex((x) => x.startsWith('article_')); const slug = ai >= 2 ? p[ai - 2] : ''; return SECTION_SLUGS[slug] || 'sports'; };
// The RSS feed carries only ONE section (the story's canonical URL), but O'Colly files stories under
// every relevant section and lists them all in the article page's <meta name="news_keywords"/"keywords">.
// Read that from the archived page HTML and return the primary section + any extra recognized sections
// (deduped, primary first), or null when the story is single-section. Lets one story land in several chips.
const catsFromKeywords = (html, primary) => {
  const tag = html.match(/<meta[^>]*\bname=["'](?:news_keywords|keywords)["'][^>]*>/i);
  const cm = tag && tag[0].match(/content=["']([^"']*)["']/i);
  if (!cm) return null;
  const extra = cm[1].split(',').map((s) => SECTION_SLUGS[s.trim().toLowerCase()]).filter(Boolean);
  const all = [primary, ...extra].filter((v, i, a) => v && a.indexOf(v) === i);
  return all.length > 1 ? all : null;
};
const slug = (url) => { const p = new URL(url).pathname.split('/').filter(Boolean); const ai = p.findIndex((x) => x.startsWith('article_')); return p[ai - 1] || 'clip'; };
const iso = (d) => new Date(d).toISOString().slice(0, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); // politeness between requests

const JUNK = /out of date|recommend switching|sign up for|subscribe to|load comments|watch now|most popular|thank you for reading/i;
function extractArticle(html) {
  const bi = html.search(/itemprop=["']articleBody["']/i);
  let paras = [];
  if (bi !== -1) {
    const region = html.slice(bi, bi + 60000);
    for (const m of region.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
      const t = strip(m[1]);
      if (JUNK.test(t)) break;            // stop at the first footer/junk paragraph
      if (t.length > 30) paras.push(t);
    }
  }
  const cm = html.match(/class="[^"]*credit[^"]*"[^>]*>([\s\S]*?)<\/[a-z]+>/i);
  // credit is often "Name, The O'Colly, @handle" or "Name // @handle" — keep just the name
  let credit = cm ? strip(cm[1]) : '';
  credit = credit.split(/\s*(?:,|\/\/|\/|@|·|\|)\s*/)[0].trim();
  if (/^(the )?o.?colly$|^provided$|^courtesy$/i.test(credit)) credit = ''; // not a photographer name
  return { body: paras.join('\n\n'), paras, credit };
}

function fallbackPage(clip, paras) {
  const img = clip.localImage || clip.imageUrlRemote || '';
  const body = paras.map((p) => `      <p>${esc(p)}</p>`).join('\n');
  const cred = clip.photoCredit ? `<figcaption>Photo by ${esc(clip.photoCredit)} / The O'Colly</figcaption>` : '';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(clip.headline)} — Timothy Christensen</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Newsreader:opsz,wght@6..72,400;6..72,600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  :root{--brand:#FF6A00;--ink:#0A0A0B;--paper:#F7F6F3;--border:#e3e1dc}
  *{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:Newsreader,Georgia,serif;line-height:1.72}
  .wrap{max-width:680px;margin:0 auto;padding:32px 20px 80px}
  .kicker{font-family:'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.08em;font-size:12px;color:var(--brand)}
  h1{font-family:Oswald,sans-serif;text-transform:uppercase;line-height:1.0;font-size:40px;margin:.3em 0 .2em}
  .meta{font-family:'IBM Plex Mono',monospace;font-size:13px;color:#555;border-bottom:2px solid var(--ink);padding-bottom:14px;margin-bottom:22px}
  figure{margin:0 0 24px}figure img{width:100%;height:auto;border:2px solid var(--ink);display:block}
  figcaption{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#666;padding-top:6px}
  p{font-size:19px;margin:0 0 1.1em}
  .archived-note{background:#fff;border:2px solid var(--ink);padding:14px 16px;margin-bottom:26px;font-family:'IBM Plex Mono',monospace;font-size:12.5px;line-height:1.5}
  .archived-note b{color:var(--brand)}
  footer{margin-top:36px;border-top:1px solid var(--border);padding-top:16px;font-family:'IBM Plex Mono',monospace;font-size:12px;color:#777}
  a{color:var(--brand)}
</style></head>
<body><div class="wrap">
  <div class="kicker">Archived clip · The O'Colly</div>
  <h1>${esc(clip.headline)}</h1>
  <div class="meta">By ${esc(clip.author || 'Timothy Christensen')} &nbsp;/&nbsp; The O'Colly &nbsp;/&nbsp; ${esc(clip.date)}</div>
  <div class="archived-note">This is an <b>archived copy</b> preserved for Timothy Christensen's portfolio. The original was published in <i>The O'Colly</i>${clip.url ? ` at <a href="${esc(clip.url)}">this link</a>` : ''}; this copy is shown because the original page is no longer reachable.</div>
  ${img ? `<figure><img src="${esc(img)}" alt="${esc(clip.headline)}">${cred}</figure>` : ''}
${body}
  <footer>&ldquo;${esc(clip.headline)}.&rdquo; By Timothy Christensen. The O'Colly, ${esc(clip.date)}. Original: ${esc(clip.url)}</footer>
</div></body></html>`;
}

const HEADERS = { 'User-Agent': UA, 'Accept': 'application/rss+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8', 'Accept-Language': 'en-US,en;q=0.9' };
async function fetchText(url) {
  try { const r = await fetch(url, { headers: HEADERS, redirect: 'follow' }); return { ok: r.ok, status: r.status, text: r.ok ? await r.text() : '' }; }
  catch { return { ok: false, status: 0, text: '' }; }
}
// Retry transient failures (429 rate-limit, 5xx, network). Hard client errors (403/404/…) are not retried.
async function fetchTextRetry(url, tries = 3) {
  let r;
  for (let i = 0; i < tries; i++) {
    r = await fetchText(url);
    if (r.ok || (r.status && r.status !== 429 && r.status < 500)) return r;
    if (i < tries - 1) await sleep(3000 * (i + 1)); // 3s, then 6s
  }
  return r;
}

// ---------- run ----------
const data = JSON.parse(readFileSync(CLIPS, 'utf8'));
const known = new Set(data.clips.map((c) => c.url));

// 1) DISCOVER
const feed = await fetchTextRetry(FEED);
let added = 0;
if (!feed.ok) {
  // A blocked/rate-limited feed (429 from a datacenter IP, transient 5xx) must NOT fail the whole
  // run — archive + heal still work, and discovery resumes on a later run. Surface it as a warning.
  console.warn(`::warning::RSS discovery unavailable (HTTP ${feed.status || 'network error'}) — skipping new-clip discovery this run.`);
}
for (const b of (feed.ok ? [...feed.text.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]) : [])) {
  const author = pick(b, 'dc:creator'); const url = pick(b, 'link');
  if (!/timothy christensen/i.test(author) || !url.includes('/article_') || known.has(url)) continue;
  const date = iso(pick(b, 'pubDate')); const id = date + '-' + slug(url); const imageUrlRemote = enc(b);
  let localImage = '';
  if (imageUrlRemote) { const ir = await fetch(imageUrlRemote.split('?')[0], { headers: { 'User-Agent': UA } }).catch(() => null); if (ir && ir.ok) { if (!existsSync(IMAGES)) mkdirSync(IMAGES, { recursive: true }); writeFileSync(join(IMAGES, id + '.jpg'), Buffer.from(await ir.arrayBuffer())); localImage = 'images/' + id + '.jpg'; } }
  data.clips.push({ id, headline: pick(b, 'title'), date, section: section(url), type: 'article', author: author.replace(/,\s*Staff Reporter$/i, '').trim(), url, excerpt: pick(b, 'description'), imageUrlRemote, localImage, photoCredit: '', fulltext: '', wordCount: 0, live: true, lastChecked: '', waybackUrl: '', status: 'indexed' });
  known.add(url); added++; console.log('DISCOVER + ' + date + '  ' + pick(b, 'title'));
}

// 2) ARCHIVE full text + credit (paced)
if (!existsSync(FULLTEXT)) mkdirSync(FULLTEXT, { recursive: true });
let archived = 0;
for (const c of data.clips) {
  if (c.fulltext) continue;
  if (archived >= BACKFILL_LIMIT) break;
  const a = await fetchText(c.url);
  if (!a.ok) { console.log('ARCHIVE skip (' + a.status + ') ' + c.id); continue; }
  if (!c.categories) { const cc = catsFromKeywords(a.text, c.section); if (cc) { c.categories = cc; console.log('CATS ' + cc.join(' + ') + '  ' + c.id); } } // multi-section stories -> all chips
  const { paras, credit } = extractArticle(a.text);
  if (!paras.length) { console.log('ARCHIVE no-body ' + c.id); continue; }
  if (credit && !c.photoCredit) c.photoCredit = credit;
  c.wordCount = paras.join(' ').split(/\s+/).length;
  writeFileSync(join(FULLTEXT, c.id + '.html'), fallbackPage(c, paras));
  c.fulltext = 'fulltext/' + c.id + '.html';
  archived++; console.log('ARCHIVE ✓ ' + c.wordCount + 'w credit=[' + (credit || '?') + '] ' + c.id);
  await sleep(500);
}

// 3) HEAL — re-check link health (only 404/410 -> dead)
if (!process.env.SKIP_LIVECHECK) {
  for (const c of data.clips) {
    let r; try { r = await fetch(c.url, { method: 'HEAD', headers: { 'User-Agent': UA }, redirect: 'follow' }); } catch { r = null; }
    if (r && r.ok) c.live = true;
    else if (r && (r.status === 404 || r.status === 410)) { c.live = false; console.log('HEAL dead(' + r.status + ') -> fallback: ' + c.id); }
    // any other status/error: leave c.live unchanged (transient)
    c.lastChecked = iso(new Date().toISOString());
    await sleep(400);
  }
}

data.clips.sort((a, b) => b.date.localeCompare(a.date));
data._meta.totalArticles = data.clips.length;
data._meta.lastSync = new Date().toISOString();
writeFileSync(CLIPS, JSON.stringify(data, null, 2));
console.log(`Done. +${added} new, +${archived} full-text archived, ${data.clips.length} total.`);

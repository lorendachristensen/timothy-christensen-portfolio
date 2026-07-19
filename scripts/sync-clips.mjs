/**
 * sync-clips.mjs — hands-off capture of Timothy Christensen's O'Colly articles.
 *
 * Polls the O'Colly RSS feed (the publisher-sanctioned syndication channel, which is
 * NOT behind the bot-block that walls off article pages), finds any articles not already
 * in clips.json, downloads each new feature photo, and appends them. Idempotent: running
 * it repeatedly only ever ADDS genuinely new clips.
 *
 * Pure Node (global fetch + fs) — no dependencies, so it runs anywhere (GitHub Actions, cron, local).
 * Usage: node scripts/sync-clips.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CLIPS = join(ROOT, 'clips.json');
const IMAGES = join(ROOT, 'images');
const FEED = 'https://www.ocolly.com/search/?f=rss&sd=desc&l=50&nsa=eedition&q=Timothy+Christensen';
const UA = 'Mozilla/5.0 (compatible; tc-portfolio-sync)';

const clean = (s) => (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').trim();
const pick = (block, tag) => {
  const m = block.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>'));
  return m ? clean(m[1]) : '';
};
const enc = (block) => { const m = block.match(/<enclosure[^>]*url="([^"]+)"/); return m ? clean(m[1]) : ''; };

const KNOWN_SECTIONS = new Set(['football', 'womens_basketball', 'mens_basketball', 'baseball', 'equestrian', 'wrestling']);
const section = (url) => {
  const p = new URL(url).pathname.split('/').filter(Boolean);
  const ai = p.findIndex((x) => x.startsWith('article_'));
  const c = ai >= 2 ? p[ai - 2] : 'sports';
  return KNOWN_SECTIONS.has(c) ? c : 'sports';
};
const slug = (url) => {
  const p = new URL(url).pathname.split('/').filter(Boolean);
  const ai = p.findIndex((x) => x.startsWith('article_'));
  return p[ai - 1] || 'clip';
};
const iso = (d) => new Date(d).toISOString().slice(0, 10);

const data = JSON.parse(readFileSync(CLIPS, 'utf8'));
const known = new Set(data.clips.map((c) => c.url));

const res = await fetch(FEED, { headers: { 'User-Agent': UA } });
if (!res.ok) { console.error('RSS fetch failed:', res.status); process.exit(1); }
const xml = await res.text();
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);

let added = 0;
for (const b of items) {
  const author = pick(b, 'dc:creator');
  const url = pick(b, 'link');
  if (!/timothy christensen/i.test(author)) continue; // his bylines only
  if (!url.includes('/article_')) continue;           // real articles only
  if (known.has(url)) continue;                        // already have it

  const date = iso(pick(b, 'pubDate'));
  const id = date + '-' + slug(url);
  const imageUrlRemote = enc(b);
  let localImage = '';
  if (imageUrlRemote) {
    try {
      const ir = await fetch(imageUrlRemote.split('?')[0], { headers: { 'User-Agent': UA } }); // strip ?resize -> original
      if (ir.ok) {
        if (!existsSync(IMAGES)) mkdirSync(IMAGES, { recursive: true });
        writeFileSync(join(IMAGES, id + '.jpg'), Buffer.from(await ir.arrayBuffer()));
        localImage = 'images/' + id + '.jpg';
      }
    } catch { /* leave blank; the card can fall back to imageUrlRemote */ }
  }

  data.clips.push({
    id, headline: pick(b, 'title'), date, section: section(url), type: 'article',
    author: author.replace(/,\s*Staff Reporter$/i, '').trim(), url,
    excerpt: pick(b, 'description'), imageUrlRemote, localImage,
    photoCredit: '', waybackUrl: '', status: 'indexed',
  });
  known.add(url);
  added++;
  console.log('  + ' + date + '  ' + pick(b, 'title'));
}

data.clips.sort((a, b) => b.date.localeCompare(a.date));
data._meta.totalArticles = data.clips.length;
data._meta.lastSync = new Date().toISOString();
writeFileSync(CLIPS, JSON.stringify(data, null, 2));
console.log(added ? `Added ${added} new clip(s). Total: ${data.clips.length}.` : `No new clips. Total: ${data.clips.length}.`);

// Vercel serverless relay for the O'Colly clip sync.
//
// O'Colly's CDN returns HTTP 429 to GitHub Actions' datacenter IPs, so cloud discovery never worked
// directly. The sync (scripts/sync-clips.mjs), when OCOLLY_FETCH_PROXY is set, fetches the feed + article
// pages THROUGH this function instead — which runs on Vercel and makes the outbound request from Vercel's
// IP. Free (runs on the site's existing Vercel project), no API key, no third-party service.
//
// Locked to ocolly.com targets so it can't be abused as an open proxy.
module.exports = async (req, res) => {
  const target = (req.query && req.query.url) || '';
  if (!/^https:\/\/(www\.)?ocolly\.com\//i.test(target)) {
    res.status(400).json({ error: 'only https://ocolly.com URLs are allowed' });
    return;
  }
  try {
    const r = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, text/html;q=0.9, */*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });
    const buf = Buffer.from(await r.arrayBuffer());
    res.status(r.status);
    res.setHeader('content-type', r.headers.get('content-type') || 'application/octet-stream');
    res.setHeader('cache-control', 'no-store');
    res.send(buf);
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e) });
  }
};

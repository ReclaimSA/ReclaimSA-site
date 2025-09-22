// netlify/functions/news.js
// Proxy that fetches Google News RSS server-side and returns XML with CORS headers.
exports.handler = async function(event, context) {
  try {
    const q = (event.queryStringParameters && event.queryStringParameters.q) || 'South Africa protest OR ReclaimSA OR corruption OR governance';
    const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-ZA&gl=ZA&ceid=ZA:en`;

    const r = await fetch(feedUrl);
    if (!r.ok) {
      return {
        statusCode: r.status,
        body: JSON.stringify({ error: 'Failed fetching RSS' }),
      };
    }

    const xml = await r.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/xml; charset=utf-8'
      },
      body: xml,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || String(err) }),
    };
  }
}

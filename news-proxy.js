// netlify/functions/news-proxy.js
const fetch = require('node-fetch');

exports.handler = async function(event) {
  const apiKey = process.env.NEWSAPI_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing NEWSAPI_KEY env var' }) };
  }

  const q = event.queryStringParameters?.q || 'South Africa protest OR ReclaimSA';
  const pageSize = event.queryStringParameters?.pageSize || '10';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};

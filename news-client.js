// news-client.js
// Client script that calls the Netlify function endpoint to load RSS XML and populate the carousel.
// Default endpoint works when the site is served by Netlify. If your frontend stays on GitHub Pages,
// replace API_ENDPOINT with the full Netlify function URL: https://YOUR_NETLIFY_DOMAIN/.netlify/functions/news
const API_ENDPOINT = "https://reclaimsa-site.netlify.app/.netlify/functions/news"; // <-- change to full URL if using GitHub Pages frontend

let articles = [];
let currentIndex = 0;

async function loadNewsFromProxy() {
  try {
    const q = encodeURIComponent("South Africa protest OR ReclaimSA OR corruption OR governance");
    const url = `${API_ENDPOINT}?q=${q}`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Failed to fetch news proxy: ' + resp.status);
    const xmlText = await resp.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "text/xml");
    const items = Array.from(doc.querySelectorAll("item"));

    articles = items.map(it => ({
      title: it.querySelector("title")?.textContent || "",
      link: it.querySelector("link")?.textContent || it.querySelector("guid")?.textContent || "#",
      description: it.querySelector("description")?.textContent || "",
      pubDate: it.querySelector("pubDate") ? new Date(it.querySelector("pubDate").textContent) : new Date()
    }));

    if (!articles.length) {
      const el = document.querySelector(".news-item");
      if (el) el.innerHTML = "<p>No news found.</p>";
      return;
    }

    currentIndex = 0;
    showArticle(currentIndex);
  } catch (err) {
    console.error("loadNewsFromProxy error:", err);
    const el = document.querySelector(".news-item");
    if (el) el.innerHTML = "<p>Unable to load news right now.</p>";
  }
}

function showArticle(index) {
  const newsItem = document.querySelector(".news-item");
  if (!articles.length || !newsItem) return;
  const a = articles[index];
  newsItem.innerHTML = `
    <h3><a href="${a.link}" target="_blank" rel="noopener noreferrer">${escapeHtml(a.title)}</a></h3>
    <p>${truncateText(stripHtml(a.description), 260)} <a href="${a.link}" target="_blank" rel="noopener noreferrer">Read more</a></p>
    <span class="news-date">Published: ${a.pubDate.toLocaleDateString()}</span>
  `;
}

// Attach listeners safely after DOM has the elements
function attachControls() {
  const nextBtn = document.getElementById("nextNews");
  const prevBtn = document.getElementById("prevNews");
  if (nextBtn) nextBtn.addEventListener("click", () => {
    if (!articles.length) return;
    currentIndex = (currentIndex + 1) % articles.length;
    showArticle(currentIndex);
  });
  if (prevBtn) prevBtn.addEventListener("click", () => {
    if (!articles.length) return;
    currentIndex = (currentIndex - 1 + articles.length) % articles.length;
    showArticle(currentIndex);
  });
}

function stripHtml(html){ const tmp=document.createElement('div'); tmp.innerHTML = html||''; return tmp.textContent||tmp.innerText||''; }
function truncateText(text, maxLen){ return text && text.length>maxLen ? text.substring(0,maxLen)+'…' : (text||''); }
function escapeHtml(unsafe){ return (unsafe||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

window.addEventListener('DOMContentLoaded', () => {
  attachControls();
  loadNewsFromProxy();
});

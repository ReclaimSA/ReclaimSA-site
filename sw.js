// Simple service worker - caches site shell for offline install (PWA)
const CACHE = 'reclaimsa-v1';
const OFFLINE_URL = 'index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll([
      '/',
      OFFLINE_URL
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Try network first, fallback to cache
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(resp => resp || caches.match(OFFLINE_URL))));
});

const CACHE_NAME = 'codm-prostats-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/BG.png',
  '/favicon.ico'
];

// Install Service Worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching shell assets');
      cache.addAll(assets);
    })
  );
});

// Fetch events
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});

const CACHE_NAME = 'lovely-loots-cache-v1';
const DATA_CACHE_NAME = 'lovely-loots-data-cache-v1';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/src/main.jsx',
  '/src/assets/css/style.css',
  '/src/assets/images/logo.png',
  '/manifest.json',
];

// Cache Static Assets

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pre-caching static assets');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Clean Up Old Caches

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Respond with Cache or Network

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/graphql')) {

    // Handle GraphQL requests

    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(() => cache.match(event.request));
      })
    );
    return;
  }

  // Handle Static Files
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

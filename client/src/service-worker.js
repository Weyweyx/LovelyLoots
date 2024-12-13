const CACHE_NAME = "lovely-loots-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/vite.svg",
  "/src/main.jsx",
  "/src/assets/css/style.css",
];

// Install the service worker

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
    
      if (response) {
        return response;
      }
      return fetch(event.request).then((fetchedResponse) => {

        // Clone the response before caching

        const responseToCache = fetchedResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return fetchedResponse;
      });
    })
  );
});

// Update the service worker

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

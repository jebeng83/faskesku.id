// Service Worker for Faskesku.id

const CACHE_NAME = 'faskesku-cache-v1';
const urlsToCache = [
  '/',
  '/build/assets/app-BMY5FyOP.css',
  '/build/assets/app-0u_V7acG.js',
];

// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached response if found
        if (response) {
          return response;
        }
        
        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => {
              console.warn('Failed to cache response:', err);
            });
            
          return response;
        }).catch(error => {
          console.warn('Fetch failed, returning offline page:', error);
          // Return a basic response for failed requests
          return new Response('Network error occurred', {
            status: 408,
            statusText: 'Network error'
          });
        });
      })
      .catch(error => {
        console.warn('Cache match failed:', error);
        // Return a basic response for cache errors
        return new Response('Cache error occurred', {
          status: 500,
          statusText: 'Cache error'
        });
      })
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
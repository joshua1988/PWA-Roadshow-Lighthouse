var cacheName = 'lighthouse-step3-web-app-manifest-install';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/icons/icon-128.png',
  '/images/icons/icon-144.png',
  '/images/icons/icon-152.png',
  '/images/icons/icon-192.png',
  '/images/icons/icon-256.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg'
];

self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching app shell', filesToCache);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[Service Worker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
      // return response || new Response("Nothing in the cache for this request");
    }).catch(function(err) {
      console.log("fetch error occured : ", err);
    })
  );

  // e.respondWith(
  //   caches.match(e.request)
  //     .then(function(response) {
  //       // Cache hit - return response
  //       if (response) {
  //         return response;
  //       }
  //       return fetch(e.request);
  //     }
  //   )
  // );
});

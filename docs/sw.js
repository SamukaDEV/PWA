var CACHE_NAME = 'static-v1';

var upath = '/PWA/'

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      if (self.registration.scope === 'http://localhost/') {
        return cache.addAll([
          '/',
          'index.html',
          'css/bootstrap.min.css'
        ]);
      } else {
        return cache.addAll([
          upath,
          upath + 'index.html',
          upath + '/css/bootstrap.min.css'
          // '/styles.css',
          // '/app.js',
          // '/manifest.js',
          // '/vendor.js',
        ]);
      }

    })
  )
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});

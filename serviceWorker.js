self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                './index.html',
                './manifest.json',
                './images/icons/icon-72x72.png',
                './images/icons/icon-96x96.png',
                './images/icons/icon-152x152.png',
                './images/icons/icon-192x192.png',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

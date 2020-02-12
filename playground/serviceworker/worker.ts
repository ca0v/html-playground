const cacheName = "cache-v1";
const precacheItems = ["app/index.html"];
const worker = (self as any) as ServiceWorkerGlobalScope;
worker.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(async () => {
    const cache = await caches.open(cacheName);
    return cache.addAll(precacheItems);
  });
});

worker.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchResponse = cachedResponse || fetch(event.request);
      caches.open(cacheName).then(cache => cache.add(event.request));
      return fetchResponse;
    })
  );
});

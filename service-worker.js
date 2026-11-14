// Den gamla React-sidan (2022) registrerade en service worker som cachade sidan
// hos besökarna. Den här versionen tömmer cachen och avregistrerar sig, så att
// återkommande besökare får den nya statiska sidan.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then((clients) => clients.forEach((c) => c.navigate(c.url)))
  );
});

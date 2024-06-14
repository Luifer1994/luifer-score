import { precacheAndRoute } from 'workbox-precaching';

// This is needed to tell TypeScript that `self` is a ServiceWorkerGlobalScope
declare let self: ServiceWorkerGlobalScope;

// Definimos el tipo del evento como ExtendableMessageEvent
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

precacheAndRoute(self.__WB_MANIFEST);

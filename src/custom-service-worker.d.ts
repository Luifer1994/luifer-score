declare var self: ServiceWorkerGlobalScope;

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  skipWaiting: () => Promise<void>;
}

interface ExtendableMessageEvent extends Event {
  data: any;
}

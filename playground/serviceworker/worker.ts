/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/// <reference lib="WebWorker" />

const DATABASE_NAME = "service_worker";
const WORKER_VERSION = "2";

abstract class IndexDb {
  public db: IDBDatabase | null = null;

  constructor(public name: string) { }

  async init() {
    return new Promise<void>((good, bad) => {
      const handle = indexedDB.open(this.name, 2);

      handle.onerror = () => {
        this.err(handle.error);
        bad(handle.error);
      };

      handle.onsuccess = () => {
        this.success(handle.result);
        good();
      };

      handle.onupgradeneeded = () => {
        this.upgrade(handle.result);
      };
    });
  }

  private err(info: any) {
    console.error(info);
  }

  private success(db: IDBDatabase) {
    console.log(db);
    this.db = db;
  }

  abstract upgrade(db: IDBDatabase): Promise<any>;

  async asPromise<T>(query: IDBRequest) {
    return new Promise<T>((good, bad) => {
      query.onsuccess = e => {
        good(query.result);
      };
      query.onerror = e => {
        bad(query.error);
      };
    });
  }

  readable(name: string) {
    if (!this.db) throw "no store";
    return this.db.transaction(name, "readonly").objectStore(name);
  }

  writeable(name: string) {
    if (!this.db) throw "no store";
    return this.db.transaction(name, "readwrite").objectStore(name);
  }

  cursor<T>(name: string, cb: (data: T) => boolean) {
    const store = this.readable(name);
    const cursor = store.openCursor();
    cursor.onsuccess = () => {
      if (true === cb(cursor.result?.value)) cursor.result?.continue();
    };
    cursor.onerror = () => this.err(cursor.error);
  }
}

class DbStore<T> extends IndexDb {
  async put(id: string, data: T) {
    return this.asPromise<T>(this.writeable(this.name).put({ id, ...data }));
  }

  async get(id: string) {
    return this.asPromise<T>(this.readable(this.name).get(id));
  }

  async upgrade(db: IDBDatabase) {
    console.log(db);
    return new Promise<void>((good, bad) => {
      const store = db.createObjectStore(this.name, { keyPath: "id", autoIncrement: false });
      store.createIndex("primary", "id", { unique: true });
      store.transaction.oncomplete = () => {
        good();
      };
      store.transaction.onerror = () => bad();
    });
  }
}

class DebugStore extends DbStore<{
  name: string;
  state: string;
}> { }

const store = new DebugStore(DATABASE_NAME);
const p = store.init();
const worker = (self as any) as ServiceWorker;

class AppManager {
  constructor() {
    const cacheName = "cache-v1";

    /**
     * This fires once the old service worker is gone, and your new service worker is able to control clients.
     * Happens next time page opens after worker changes (browser must go completely offline)
     */
    worker.addEventListener("activate", (event: ExtendableEvent) => {
      p.then(() => {
        store.put("activate", { name: "activate", state: new Date().toISOString() });
      });
      event.waitUntil(async () => { });
    });

    /**
     * Happens every time brower loads for 1st time
     * or when worker changes
     */
    worker.addEventListener("install", event => {
      p.then(() => {
        store.put("install", { name: "install", state: new Date().toISOString() });
      });

      event.waitUntil(async () => { });
    });

    worker.addEventListener("fetch", event => {
      p.then(() => {
        store.put("install", { name: "install", state: new Date().toISOString() });
      });
      event.respondWith(this.fetchFromCacheFirst(cacheName, event));
    });

    worker.addEventListener("message", event => {
      event.ports.forEach(port => this.unicast(port, { version: WORKER_VERSION, database: DATABASE_NAME }));
      this.broadcast("all");
    });
  }

  private fetchFromCacheFirst(cacheName: string, event: FetchEvent): Response | Promise<Response> {
    return (async () => {
      const cache = await caches.open(cacheName);
      let response = await cache.match(event.request);
      if (!response) {
        response = await fetch(event.request);
        cache.put(event.request, response.clone());
        return response;
      }
      fetch(event.request).then(response => {
        cache.put(event.request, response);
        p.then(() => {
          store.put("fetchFromCacheFirst", { name: "fetchFromCacheFirst", state: new Date().toISOString() });
        });
      });
      return response;
    })();
  }

  private unicast(port: MessagePort, message: any) {
    port.postMessage(message);
  }

  private async broadcast(message: any) {
    const clients = await worker.clients.matchAll();
    await Promise.all(clients.map(client => client.postMessage(message)));
  }
}

new AppManager();

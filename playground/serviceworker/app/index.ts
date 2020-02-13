const APP_VERSION = "1";

abstract class IndexDb {
  public db: IDBDatabase | null = null;

  constructor(public name: string) {}

  async init() {
    return new Promise((good, bad) => {
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
    return new Promise((good, bad) => {
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
}> {}

self.addEventListener("load", async () => {
  const reg = await navigator.serviceWorker.register("../worker.js");
  console.log(reg);
});

function log(message: string) {
  const dom = document.createElement("div");
  dom.innerHTML = message;
  document.body.appendChild(dom);
}

log(`version ${APP_VERSION}`);

const channel = new MessageChannel();
channel.port1.onmessage = async event => {
  log(`response from worker: ${JSON.stringify(event.data)}`);
  const { database } = event.data;
  const db = new DebugStore(database);
  await db.init();

  ["activate", "install", "fetchFromCacheFirst"].forEach(async name => {
    const data = await db.get(name);
    log(`${data.name} ${data.state}`);
  });
};

navigator.serviceWorker.addEventListener("message", event => {
  log(`broadcast from worker: ${event.data}`);
});

navigator.serviceWorker.controller!.postMessage({ command: "version" }, [channel.port2]);

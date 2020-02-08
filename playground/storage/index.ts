class CacheDb {
    async init(key: string): Promise<any> {
        const c1 = await caches.open("c1");
        const version = await c1.match(key);
        const versionData = await version?.json();
        if (versionData) return versionData;

        const fetchRes = await fetch(`http://localhost:8000/forecast/${key}`, { mode: "cors" });
        c1.put(key, fetchRes);
        return this.init(key);
    }
};

const cacheDb = new CacheDb();
cacheDb.init("35,-85").then(d => console.log(d));

/**
 * The basic pattern that IndexedDB encourages is the following:
    Open a database.
    Create an object store in the database. 
    Start a transaction and make a request to do some database operation, like adding or retrieving data.
    Wait for the operation to complete by listening to the right kind of DOM event.
    Do something with the results (which can be found on the request object).
 */
class IndexDb {

    public db: IDBDatabase | null = null;
    async init(key: string) {

        return new Promise((good, bad) => {
            const handle = indexedDB.open("c1", 2);
            handle.onerror = e => this.err(e);
            handle.onsuccess = async (e: any) => {
                await this.success(handle.result);
                good();
            };
            handle.onupgradeneeded = async (e: any) => {
                await this.upgrade(handle.result);
            };
        })
    }

    private err(info: any) {
        console.error(info);
    }

    private success(db: IDBDatabase) {
        console.log(db);
        this.db = db;
    }

    private async upgrade(db: IDBDatabase) {
        console.log(db);
        return new Promise((good, bad) => {
            const store = db.createObjectStore("cities", { keyPath: "id", autoIncrement: false });
            store.createIndex("primary", "id", { unique: true });
            store.transaction.oncomplete = () => {
                good();
            };
            store.transaction.onerror = () => bad();
        });
    }
}

class MetroCenters extends IndexDb {
    addCity(name: string) {
        if (!this.db) throw "no store"
        const store = this.db.transaction("cities", "readwrite").objectStore("cities");
        store.add({ id: name });
    }
}
async function go() {
    const idb = new MetroCenters();
    await idb.init("anyvalue");
    idb.addCity("Greenville, SC");
};

go();
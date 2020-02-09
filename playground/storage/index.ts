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
abstract class IndexDb {

    public db: IDBDatabase | null = null;
    async init(key: string) {

        return new Promise((good, bad) => {
            const handle = indexedDB.open("c1", 2);

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
        })
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
            query.onsuccess = e => { good(query.result) };
            query.onerror = e => { bad(query.error) };
        })
    }

    readable(name: string) {
        if (!this.db) throw "no store"
        return this.db.transaction(name, "readonly").objectStore(name);
    }

    writeable(name: string) {
        if (!this.db) throw "no store"
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

    constructor(public name: string) {
        super();
    }

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

class MetroCenterStore extends DbStore<{
    name: string;
    state: string;
}>{ }

async function go() {
    const metroCenters = new MetroCenterStore("cities");
    await metroCenters.init("anyvalue");
    const cities = [{ name: "Greenville", state: "SC" }, { name: "Greenville", state: "NC" }];
    cities.forEach(city => {
        metroCenters.put(`${city.name}, ${city.state}`, city);
    });
    const city = await metroCenters.get("Greenville, NC");
    console.log(city.name, city.state);
    const putCity = await metroCenters.put(city.name, city);
    console.log(putCity);

    metroCenters.cursor("cities", data => {
        data && console.log(data);
        return !!data;
    });
};

go();
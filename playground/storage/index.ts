class Db {
    async init(key:string): Promise<any> {
        const c1 = await caches.open("c1");
        const version = await c1.match(key);
        const versionData = await version?.json();
        if (versionData) return versionData;

        const fetchRes = await fetch(`http://localhost:8000/forecast/${key}`, { mode: "cors" });
        c1.put(key, fetchRes);
        return this.init(key);
    }
};

const db = new Db();
db.init("35,-85").then(d => console.log(d));
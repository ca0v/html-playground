var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("fun/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IndexDb {
        constructor(name) {
            this.name = name;
            this.db = null;
        }
        init() {
            return __awaiter(this, void 0, void 0, function* () {
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
            });
        }
        err(info) {
            console.error(info);
        }
        success(db) {
            console.log(db);
            this.db = db;
        }
        asPromise(query) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((good, bad) => {
                    query.onsuccess = e => {
                        good(query.result);
                    };
                    query.onerror = e => {
                        bad(query.error);
                    };
                });
            });
        }
        readable(name) {
            if (!this.db)
                throw "no store";
            return this.db.transaction(name, "readonly").objectStore(name);
        }
        writeable(name) {
            if (!this.db)
                throw "no store";
            return this.db.transaction(name, "readwrite").objectStore(name);
        }
        cursor(name, cb) {
            const store = this.readable(name);
            const cursor = store.openCursor();
            cursor.onsuccess = () => {
                var _a, _b;
                if (true === cb((_a = cursor.result) === null || _a === void 0 ? void 0 : _a.value))
                    (_b = cursor.result) === null || _b === void 0 ? void 0 : _b.continue();
            };
            cursor.onerror = () => this.err(cursor.error);
        }
    }
    class DbStore extends IndexDb {
        put(id, data) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.asPromise(this.writeable(this.name).put(Object.assign({ id }, data)));
            });
        }
        get(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.asPromise(this.readable(this.name).get(id));
            });
        }
        upgrade(db) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(db);
                return new Promise((good, bad) => {
                    const store = db.createObjectStore(this.name, { keyPath: "id", autoIncrement: false });
                    store.createIndex("primary", "id", { unique: true });
                    store.transaction.oncomplete = () => {
                        good();
                    };
                    store.transaction.onerror = () => bad();
                });
            });
        }
    }
    exports.DbStore = DbStore;
});
define("index", ["require", "exports", "fun/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DebugStore extends index_1.DbStore {
    }
    function debounce(cb, wait = 20) {
        let h = 0;
        let callable = (...args) => {
            clearTimeout(h);
            h = setTimeout(() => cb(...args), wait);
        };
        return callable;
    }
    function run() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const notebook = document.getElementById("notebook");
            const database = "notebook";
            const db = new DebugStore(database);
            yield db.init();
            const data = yield db.get("notes");
            notebook.value = (data === null || data === void 0 ? void 0 : data.state) || "";
            const save = () => {
                db.put("notes", { name: "notes", state: notebook.value });
            };
            notebook.addEventListener("input", debounce(save));
            const channel = new MessageChannel();
            channel.port1.onmessage = (event) => __awaiter(this, void 0, void 0, function* () {
                const { database } = event.data;
                const db = new DebugStore(database);
                yield db.init();
                ["APP_VERSION", "activate", "install", "fetchFromCacheFirst"].forEach((name) => __awaiter(this, void 0, void 0, function* () {
                    const data = yield db.get(name);
                    const status = document.querySelector(`.${name}`);
                    if (!status)
                        return;
                    status.innerText = (data === null || data === void 0 ? void 0 : data.state) || "";
                }));
            });
            (_b = (_a = navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) === null || _b === void 0 ? void 0 : _b.postMessage({ command: "version" }, [channel.port2]);
            const positionStatus = document.querySelector(".altitude");
            if (positionStatus) {
                navigator.geolocation.getCurrentPosition(position => {
                    const c = position.coords;
                    positionStatus.innerText = `${c.altitude} ${c.longitude},${c.latitude}`;
                });
            }
        });
    }
    exports.run = run;
});

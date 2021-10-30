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
    exports.DbStore = void 0;
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
define("version_004/fun/merge-audio", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.merge = void 0;
    function merge(...audio) {
        return new Blob([...audio], { type: "audio/webm" });
    }
    exports.merge = merge;
});
define("version_004/fun/audio-recorder", ["require", "exports", "version_004/fun/merge-audio"], function (require, exports, merge_audio_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AudioRecorder = void 0;
    class AudioRecorder {
        constructor() {
            this.player = document.createElement("audio");
            this.player.controls = true;
        }
        canRecordAudio() {
            return __awaiter(this, void 0, void 0, function* () {
                const permission = yield navigator.permissions.query({ name: 'microphone' });
                switch (permission.state) {
                    case "granted":
                    case "prompt":
                        return true;
                    default:
                        return false;
                }
                permission.onchange = function () {
                };
            });
        }
        canFindDevice() {
            return __awaiter(this, void 0, void 0, function* () {
                const devices = yield navigator.mediaDevices.enumerateDevices();
                const audioDevices = devices.filter((d) => d.kind === 'audioinput');
                return 0 < audioDevices.length;
            });
        }
        record(duration = 1000) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!(yield this.canRecordAudio()))
                    throw "cannot record audio";
                if (!(yield this.canFindDevice()))
                    throw "cannot find device";
                const mediaStream = yield navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                const audio = yield this.recordFromStream(mediaStream, duration);
                return (0, merge_audio_1.merge)(...audio);
            });
        }
        recordFromStream(stream, duration = 2000) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((good, bad) => {
                    const options = { mimeType: 'audio/webm' };
                    const recordedChunks = [];
                    const mediaRecorder = new MediaRecorder(stream, options);
                    mediaRecorder.ondataavailable = e => {
                        if (e.data.size > 0) {
                            recordedChunks.push(e.data);
                        }
                    };
                    mediaRecorder.onstop = () => {
                        good(recordedChunks);
                    };
                    mediaRecorder.start(0);
                    setTimeout(() => mediaRecorder.stop(), duration);
                });
            });
        }
        playback(audio) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((good, bad) => {
                    const url = URL.createObjectURL(audio);
                    this.player.src = url;
                    this.player.play();
                    this.player.onended = () => {
                        // removes the reference from the internal mapping, thus allowing the Blob to be deleted (if there are no other references), and the memory to be freed.
                        URL.revokeObjectURL(url);
                        good();
                    };
                    this.player.onerror = (err) => {
                        bad(err);
                    };
                });
            });
        }
    }
    exports.AudioRecorder = AudioRecorder;
});
define("version_004/index", ["require", "exports", "fun/index", "version_004/fun/audio-recorder", "version_004/fun/merge-audio"], function (require, exports, index_1, audio_recorder_1, merge_audio_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.run = void 0;
    const recorder = new audio_recorder_1.AudioRecorder();
    class NotebookStore extends index_1.DbStore {
    }
    class AudioStore extends index_1.DbStore {
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
        return __awaiter(this, void 0, void 0, function* () {
            const notebook = document.getElementById("notebook");
            const noteLog = new NotebookStore("notebook");
            yield noteLog.init();
            const data = yield noteLog.get("notes");
            notebook.value = (data === null || data === void 0 ? void 0 : data.state) || "";
            const audioLog = new AudioStore("audio");
            yield audioLog.init();
            const save = () => {
                noteLog.put("notes", { name: "notes", state: notebook.value });
            };
            notebook.addEventListener("input", debounce(save, 500));
            let looping = false;
            const recorderButton = document.querySelector(".record-audio");
            const appendButton = document.querySelector(".append-audio");
            const concatButton = document.querySelector(".concatinate-audio");
            recorderButton === null || recorderButton === void 0 ? void 0 : recorderButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                looping = !looping;
                const priorAudio = yield audioLog.get("audio-1");
                if (priorAudio) {
                    recorderButton.classList.add("playing");
                    yield recorder.playback(priorAudio.state);
                    recorderButton.classList.remove("playing");
                }
                while (looping) {
                    recorderButton.classList.add("recording");
                    const audio = yield recorder.record(3000);
                    recorderButton.classList.remove("recording");
                    if (audio) {
                        audioLog.put("audio-1", { name: "audio-1", state: audio });
                        recorderButton.classList.add("playing");
                        yield recorder.playback(audio);
                        recorderButton.classList.remove("playing");
                    }
                }
            }));
            appendButton === null || appendButton === void 0 ? void 0 : appendButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const priorAudio = yield audioLog.get("audio-1");
                const tracks = parseInt(((_a = (yield noteLog.get("track-count"))) === null || _a === void 0 ? void 0 : _a.state) || "0");
                audioLog.put(`track-${tracks + 1}`, { name: "track", state: priorAudio.state });
                noteLog.put("track-count", { name: "track-count", state: tracks + 1 + "" });
                appendButton.innerText = tracks + "";
            }));
            concatButton === null || concatButton === void 0 ? void 0 : concatButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                var _b, _c;
                looping = false;
                const tracks = parseInt(((_b = (yield noteLog.get("track-count"))) === null || _b === void 0 ? void 0 : _b.state) || "0");
                noteLog.put("track-count", { name: "track-count", state: "0" });
                let fullAudio = (_c = (yield audioLog.get("audio-2"))) === null || _c === void 0 ? void 0 : _c.state;
                for (let i = 1; i <= tracks; i++) {
                    const blobs = (yield audioLog.get(`track-${i}`)).state;
                    fullAudio = fullAudio ? (0, merge_audio_2.merge)(fullAudio, blobs) : (0, merge_audio_2.merge)(blobs);
                }
                yield recorder.playback(fullAudio);
                yield audioLog.put("audio-2", { name: "audio-2", state: fullAudio });
            }));
        });
    }
    exports.run = run;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9mdW4vaW5kZXgudHMiLCJmdW4vbWVyZ2UtYXVkaW8udHMiLCJmdW4vYXVkaW8tcmVjb3JkZXIudHMiLCJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQUEsTUFBZSxPQUFPO1FBR3BCLFlBQW1CLElBQVk7WUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1lBRnhCLE9BQUUsR0FBdUIsSUFBSSxDQUFDO1FBRUYsQ0FBQztRQUU5QixJQUFJOztnQkFDUixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNyQyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRTVDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO3dCQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDO29CQUVGLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO3dCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxFQUFFLENBQUM7b0JBQ1QsQ0FBQyxDQUFDO29CQUVGLE1BQU0sQ0FBQyxlQUFlLEdBQUcsR0FBRyxFQUFFO3dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDOUIsQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUFBO1FBRU8sR0FBRyxDQUFDLElBQVM7WUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBRU8s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
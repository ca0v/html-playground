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
define("version_004/fun/merge-audio", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function merge(...audio) {
        return new Blob([...audio], { type: "audio/webm" });
    }
    exports.merge = merge;
});
define("version_004/fun/audio-recorder", ["require", "exports", "version_004/fun/merge-audio"], function (require, exports, merge_audio_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                return merge_audio_1.merge(...audio);
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
                    fullAudio = fullAudio ? merge_audio_2.merge(fullAudio, blobs) : merge_audio_2.merge(blobs);
                }
                yield recorder.playback(fullAudio);
                yield audioLog.put("audio-2", { name: "audio-2", state: fullAudio });
            }));
        });
    }
    exports.run = run;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9mdW4vaW5kZXgudHMiLCJmdW4vbWVyZ2UtYXVkaW8udHMiLCJmdW4vYXVkaW8tcmVjb3JkZXIudHMiLCJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxNQUFlLE9BQU87UUFHcEIsWUFBbUIsSUFBWTtZQUFaLFNBQUksR0FBSixJQUFJLENBQVE7WUFGeEIsT0FBRSxHQUF1QixJQUFJLENBQUM7UUFFRixDQUFDO1FBRTlCLElBQUk7O2dCQUNSLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQy9CLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFNUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7d0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQixDQUFDLENBQUM7b0JBRUYsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM1QixJQUFJLEVBQUUsQ0FBQztvQkFDVCxDQUFDLENBQUM7b0JBRUYsTUFBTSxDQUFDLGVBQWUsR0FBRyxHQUFHLEVBQUU7d0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1NBQUE7UUFFTyxHQUFHLENBQUMsSUFBUztZQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFFTyxP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
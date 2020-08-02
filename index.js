define("collage/models/Dictionary", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("collage/controls/Listener", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Listener = void 0;
    /**
     * Google speech recognition
     */
    class Listener {
        constructor() {
            this.stopped = true;
            this.autostart = true;
            this._callbacks = {};
            this.recognition = new window["webkitSpeechRecognition"]();
            let recognition = this.recognition;
            recognition.interimResults = false;
            recognition.continuous = false;
            recognition.lang = "en-PH";
            recognition.maxAlternatives = 5;
            recognition.addEventListener("start", e => {
                this.stopped = false;
            });
            recognition.addEventListener("end", e => {
                this.stopped = false;
                if (this.autostart)
                    recognition.start();
            });
            recognition.addEventListener("result", e => {
                for (let i = 0; i < e.results.length; i++) {
                    let result = e.results[i];
                    if (result.isFinal) {
                        for (let j = 0; j < result.length; j++) {
                            let transcript = result[j].transcript;
                            console.log(transcript, result[j]);
                            let confidence = result[j].confidence;
                            this.trigger("speech-detected", {
                                result: transcript,
                                power: confidence * 100
                            });
                            return;
                        }
                    }
                }
            });
        }
        callbacks(topic) {
            var _a;
            return this._callbacks[topic] = (_a = this._callbacks[topic]) !== null && _a !== void 0 ? _a : [];
        }
        on(topic, cb) {
            this.callbacks(topic).push(cb);
        }
        trigger(topic, value) {
            this.callbacks(topic).forEach(cb => cb(value));
        }
        listen() {
            if (this.stopped)
                this.recognition.start();
        }
    }
    exports.Listener = Listener;
});
define("collage/controls/Toaster", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Toaster = void 0;
    const messageDuration = 5000;
    const fadeDelay = 1500;
    async function fadeOut(node) {
        return new Promise((good, bad) => {
            node.classList.add("fade-out");
            setTimeout(() => good(node), fadeDelay);
        });
    }
    class Toaster {
        constructor(target) {
            this.target = target;
            Array.from(target.querySelectorAll(".toast")).map(t => this.destroyToast(t));
        }
        toast(message) {
            this.target.classList.remove("fade-out");
            let toast = document.createElement("div");
            toast.classList.add("toast");
            toast.innerText = message;
            this.target.insertBefore(toast, this.target.firstElementChild);
            setTimeout(() => this.destroyToast(toast), messageDuration);
        }
        async destroyToast(toast) {
            await fadeOut(toast);
            toast.remove();
            if (!this.target.querySelector(".toast"))
                fadeOut(this.target);
        }
    }
    exports.Toaster = Toaster;
});
define("collage/fun/tail", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tail = void 0;
    /** Global Functions */
    function tail(value) {
        let list = value.split(" ");
        list.shift();
        return list.join(" ");
    }
    exports.tail = tail;
});
define("collage/controls/CommandParser", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CommandParser = void 0;
    /** Global Classes */
    /**
     * Try to turn a spoken phrase into a command grammar
     */
    class CommandParser {
        parsePhrase(phrase) {
            phrase = phrase.toLowerCase();
            let map = {
                "zoom in": "zoom",
                "zoom out": "zoom",
                "drag": "pan",
                "number for": "4",
                "number": "",
                "frame": "",
                "photo": "",
                "one": "1",
                "two": "2",
                "three": "3",
                "four": "4",
                "five": "5",
                "six": "6",
                "seven": "7",
                "eight": "8",
                "nine": "9",
                "into": "",
                "on": "",
                "and": "",
                "picture": "",
                "go to": "goto",
                "-": " ",
            };
            Object.keys(map).forEach(v => phrase = phrase.replace(v, map[v]));
            let tokens = phrase.split(" ");
            tokens = tokens.map(v => { var _a; return (_a = map[v]) !== null && _a !== void 0 ? _a : v; }).filter(v => !!v);
            return tokens.join(" ");
        }
    }
    exports.CommandParser = CommandParser;
});
define("collage/controls/CollagePhoto", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CollagePhoto = void 0;
    /**
     * Keeps the google media info and has helper functions
     * to upgrade the lo-res to hi-res version
     */
    class CollagePhoto {
    }
    exports.CollagePhoto = CollagePhoto;
});
define("collage/models/GoogleMediaItem", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("collage/controls/GoogleCollagePhoto", ["require", "exports", "collage/controls/CollagePhoto"], function (require, exports, CollagePhoto_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleCollagePhoto = void 0;
    class GoogleCollagePhoto extends CollagePhoto_1.CollagePhoto {
        constructor(mediaInfo) {
            super();
            this.mediaInfo = mediaInfo;
            let img = this.img = document.createElement("div");
            img.classList.add("img");
            img.style.backgroundImage = `url(${this.mediaInfo.baseUrl})`;
            img.title = mediaInfo.filename;
        }
        renderInto(target) {
            target.appendChild(this.img);
        }
        clone() {
            return new GoogleCollagePhoto(JSON.parse(JSON.stringify(this.mediaInfo)));
        }
    }
    exports.GoogleCollagePhoto = GoogleCollagePhoto;
});
define("collage/controls/Sprite", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sprite = void 0;
    /**
     * Manages image style.transform by persisting
     * the scale and rotation to facilitate computing transforms
     */
    class Sprite {
        constructor(image) {
            this.image = image;
            this.x = this.y = this.r = 0;
            this.s = 1;
        }
        transform(args) {
            this.x += (args.dx || 0);
            this.y += (args.dy || 0);
            this.r += (args.angle || 0);
            this.s *= (args.scale || 1.0);
            this.image.style.transform = `translate(${this.x}px,${this.y}px) rotate(${this.r}deg) scale(${this.s})`;
        }
        translate(dx, dy) {
            return this.transform({ dx, dy });
        }
        rotate(angle) {
            return this.transform({ angle });
        }
        scale(scale) {
            return this.transform({ scale });
        }
        // modify the pixel density of the image
        // useful when using google photos API to 
        // request higher resolution photos
        upscale(scale) {
            let style = getComputedStyle(this.image);
            let width = parseFloat(style.width);
            let height = parseFloat(style.height);
            this.scale(1 / scale);
            this.image.style.width = scale * width + "px";
            this.image.style.height = scale * height + "px";
            this.translate(width / 2 - width * scale / 2, height / 2 - height * scale / 2);
        }
    }
    exports.Sprite = Sprite;
});
define("collage/controls/CollagePanel", ["require", "exports", "collage/controls/Sprite", "collage/globals"], function (require, exports, Sprite_1, globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CollagePanel = void 0;
    /**
     * Manages a single image on the collage,
     * not to be confused with an Photo on the album
     */
    class CollagePanel {
        /**
         *
         * @param panel dom element to control
         */
        constructor(panel) {
            this.panel = panel;
            this.photo = null;
            this.image = document.createElement("img");
            this.sprite = new Sprite_1.Sprite(this.image);
            this.image.classList.add("img");
            this.image.draggable = false;
            this.panel.appendChild(this.image);
            this.asPanel(this.panel);
        }
        /**
         * @param photo renders this photo onto the panel
         */
        addPhoto(photo) {
            this.photo = photo;
            this.setBackgroundImage(photo.mediaInfo.baseUrl);
        }
        /**
         * computes the width of the photo display area
         */
        get photoWidth() {
            return parseInt(window.getComputedStyle(this.image).width);
        }
        /**
         * computes the height of the photo display area
         */
        get photoHeight() {
            return parseInt(window.getComputedStyle(this.image).height);
        }
        /**
         * computes the scale of the photo, assumes aspect ratio is preserved (at least the width or height is 'auto')
         */
        get photoScale() {
            let style = window.getComputedStyle(this.image);
            let scale = style.height;
            if (scale === "auto")
                return 1.0;
            return parseFloat(scale) / 100.0;
        }
        /**
         * return the panel overlay (does not belong here)
         */
        get overlay() {
            return this.panel.querySelector(".overlay");
        }
        /**
         * Adds text as an input control on the panel
         * Label is absolutely positioned and can move outside the bounds of this panel
         * so probably doesn't belong here
         */
        set text(value) {
            let label = document.createElement("textarea");
            label.readOnly = true;
            label.title = "1";
            label.style.top = label.style.left = "0";
            label.classList.add("label");
            this.panel.appendChild(label);
            label.value = value;
            globals_1.globals.dnd.moveable(label);
        }
        /**
         * Remove the panel from the dom
         */
        destroy() {
            this.panel.remove();
        }
        /**
       *
       * @param backgroundImage the url of the image to display in this panel
       */
        setBackgroundImage(backgroundImage) {
            this.image.src = backgroundImage;
        }
        /**
         * style the frame
         * @param width border width in "em"
         */
        border(width, color = "white") {
            this.panel.style.border = `${width}em solid ${color}`;
        }
        /**
        * Rotate the actual frame
        * @param angle angle in degrees
        */
        rotateFrame(angle) {
            let node = this.panel;
            if (!node)
                return;
            if (!!angle) {
                this.transform_node(`rotate(${angle}deg)`);
            }
            else {
                let angle = 0;
                let transform = node.style.transform;
                let animations = globals_1.globals.repl.animations;
                animations.animate("rotate", () => {
                    angle += 1;
                    node.style.transform = transform + ` rotate(${angle}deg)`;
                });
            }
        }
        scaleFrame(scale) {
            this.transform_node(`scale(${scale}, ${scale})`);
        }
        transform_node(v) {
            let node = this.panel;
            let transform = (node.style.transform || "").split(" ");
            transform.unshift(v);
            node.style.transform = transform.join(" ");
        }
        asPanel(element) {
            element.classList.add("panel");
            element.tabIndex = 1;
            let overlay = document.createElement("div");
            overlay.classList.add("overlay");
            this.panel.appendChild(overlay);
        }
    }
    exports.CollagePanel = CollagePanel;
});
define("collage/controls/Animations", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Animations = void 0;
    /**
     * runs an animation on an interval, returns stop()
     * Used for panning, zooming, rotating
     */
    class Animations {
        constructor() {
            this.animations = [];
        }
        stop(type) {
            let animations = this.animations.map(v => v); //clone
            animations.forEach((v, i) => {
                if (!type || v.type === type) {
                    clearInterval(v.handle);
                    this.animations.splice(i, 1);
                }
            });
        }
        animate(type, cb) {
            this.animations.push({ type, handle: setInterval(cb, 100) });
        }
    }
    exports.Animations = Animations;
});
define("collage/models/Command", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("collage/controls/Commands", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Commands = void 0;
    /**
     * Keeps hash of commands
     */
    class Commands {
        constructor() {
            this.commands = {};
        }
        /**
         * Finds the command associated with the action keyword
         * @param verb the full name of the action keyword or a partial match
         */
        get(verb) {
            if (this.commands[verb])
                return this.commands[verb];
            var key = Object.keys(this.commands).find(v => v.startsWith(verb));
            return key && this.commands[key];
        }
        /**
         * Adds/replaces command associated with an action keyword
         * @param command command to process the action
         * @param verb action to associate with a command
         */
        add(command, verb) {
            this.commands[verb] = command;
        }
        list() {
            return Object.keys(this.commands);
        }
    }
    exports.Commands = Commands;
});
define("collage/fun/getActiveOverlay", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActiveOverlay = void 0;
    function getActiveOverlay() {
        let activePanel = document.activeElement;
        if (!activePanel) {
            console.log("no active panel");
            return;
        }
        return activePanel.querySelector(".overlay");
    }
    exports.getActiveOverlay = getActiveOverlay;
});
define("collage/models/KeyboardHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("collage/controls/KeyboardHandlers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KeyboardHandlers = void 0;
    class KeyboardHandlers {
        constructor() {
            this.keyboardHandlers = [];
        }
        getEventHandlers(event) {
            return this.keyboardHandlers.filter(handler => {
                let match = handler.match;
                if (event.altKey !== match.altKey)
                    return false;
                if (event.shiftKey !== match.shiftKey)
                    return false;
                if (event.ctrlKey !== match.ctrlKey)
                    return false;
                if (!!match.key && event.key !== match.key)
                    return false;
                return true;
            });
        }
        addEventHandler(command, match) {
            var _a, _b, _c, _d;
            let fullMatch = {
                altKey: (_a = match.altKey) !== null && _a !== void 0 ? _a : false,
                ctrlKey: (_b = match.ctrlKey) !== null && _b !== void 0 ? _b : false,
                shiftKey: (_c = match.shiftKey) !== null && _c !== void 0 ? _c : false,
                key: (_d = match.key) !== null && _d !== void 0 ? _d : ""
            };
            this.keyboardHandlers.push({ match: fullMatch, command });
        }
        list() {
            return this.keyboardHandlers.map(h => JSON.stringify(h.match));
        }
    }
    exports.KeyboardHandlers = KeyboardHandlers;
});
define("collage/fun/transform", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transform = void 0;
    function transform(node, value) {
        let t = window.getComputedStyle(node).transform;
        t = (t === "none") ? "" : t + " ";
        node.style.transform = t + value;
    }
    exports.transform = transform;
});
define("collage/fun/bbox", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bbox = void 0;
    function bbox(node) {
        let { left, top, width, height } = getComputedStyle(node);
        return { top: parseFloat(top), left: parseFloat(left), width: parseFloat(width), height: parseFloat(height) };
    }
    exports.bbox = bbox;
});
define("collage/controls/DragAndDrop", ["require", "exports", "collage/fun/getActiveOverlay", "collage/fun/transform", "collage/fun/bbox"], function (require, exports, getActiveOverlay_1, transform_1, bbox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DragAndDrop = void 0;
    /**
     * manages user interactions for keyboard shortcuts, wheel, drag, click events
     */
    class DragAndDrop {
        constructor(repl, keydownHandlers) {
            this.repl = repl;
            this.keydownHandlers = keydownHandlers;
            this.source = null;
            window.addEventListener("wheel", (event) => {
                let source = getActiveOverlay_1.getActiveOverlay();
                if (!source) {
                    console.log("no active overlay found");
                    return;
                }
                // TODO would be nice to only perform when mouse is over the element
                // document.elementsFromPoint(event.screenX, event.screenY);
                let from = source.innerHTML;
                // -150 => 0.9, 150 => 1.1, so
                let delta = 1 + event.deltaY / 1500;
                repl.executeCommand(`zoom ${from} ${delta}`);
            });
            window.addEventListener("keydown", event => {
                if (this.keydownHandlers.getEventHandlers(event).some(handler => {
                    return false !== handler.command.execute(repl);
                })) {
                    // handled
                    event.preventDefault();
                }
            });
        }
        /**
         * Move the background image on the panel
         * @param panel Invoke pan on the panel so that it follows the mouse
         */
        panable(panel) {
            let draggable = panel.image;
            let startPosition = [0, 0];
            draggable.classList.add("draggable");
            draggable.addEventListener("pointerdown", event => {
                let left = parseFloat(draggable.style.left || "0");
                let top = parseFloat(draggable.style.top || "0");
                startPosition = [left - event.screenX, top - event.screenY];
                draggable.setPointerCapture(event.pointerId);
                draggable.addEventListener("pointermove", pointermove);
                event.stopPropagation();
            });
            draggable.addEventListener("pointerup", event => {
                draggable.releasePointerCapture(event.pointerId);
                draggable.removeEventListener("pointermove", pointermove);
                let box = bbox_1.bbox(draggable);
                let rect = draggable.getBoundingClientRect();
                let scale = rect.width / box.width;
                draggable.style.top = draggable.style.left = "0px";
                transform_1.transform(draggable, `translate(${box.left / scale}px, ${box.top / scale}px)`);
                event.stopPropagation();
            });
            let pointermove = (event) => {
                let [x, y] = [startPosition[0] + event.screenX, startPosition[1] + event.screenY];
                draggable.style.left = `${x}px`;
                draggable.style.top = `${y}px`;
                event.stopPropagation();
            };
        }
        moveable(draggable) {
            let startPosition = [0, 0];
            draggable.classList.add("draggable");
            draggable.addEventListener("pointerdown", event => {
                let top = parseFloat(draggable.style.top);
                let left = parseFloat(draggable.style.left);
                startPosition = [left - event.screenX, top - event.screenY];
                draggable.setPointerCapture(event.pointerId);
                draggable.addEventListener("pointermove", pointermove);
                event.stopPropagation();
            });
            draggable.addEventListener("pointerup", event => {
                draggable.releasePointerCapture(event.pointerId);
                draggable.removeEventListener("pointermove", pointermove);
                event.stopPropagation();
            });
            let pointermove = (event) => {
                let [left, top] = [startPosition[0] + event.screenX, startPosition[1] + event.screenY];
                draggable.style.top = top + "px";
                draggable.style.left = left + "px";
                event.stopPropagation();
            };
        }
        /**
         * Make an element a drag source
         * @param div element to make draggable
         */
        draggable(draggable) {
            draggable.classList.add("draggable");
            draggable.draggable = true;
            draggable.addEventListener("dragstart", event => this.ondragstart(draggable));
        }
        /**
         * Make an element a drop target
         * @param target element to make into a drop target (draggable are droppable, bad name)
         */
        droppable(target) {
            target.addEventListener("dragover", (event) => {
                if (!this.source)
                    return;
                event.preventDefault();
                this.ondragover(target, this.source);
            });
            target.addEventListener("drop", (event) => {
                if (!this.source)
                    return;
                event.preventDefault();
                this.ondrop(target, this.source);
            });
        }
        /**
         *
         * @param source listen for wheel events
         */
        zoomable(source) {
        }
        ondragstart(source) {
            this.source = source;
        }
        ondragover(target, source) {
            // nothing to do?
        }
        ondrop(target, source) {
            let from = source.innerHTML;
            let to = target.innerHTML;
            let command = `move ${from} ${to}`;
            this.repl.executeCommand(command);
        }
    }
    exports.DragAndDrop = DragAndDrop;
});
define("collage/models/Behavior", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("collage/controls/Repl", ["require", "exports", "collage/fun/tail", "collage/controls/CommandParser", "collage/controls/CollagePanel", "collage/controls/Animations"], function (require, exports, tail_1, CommandParser_1, CollagePanel_1, Animations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Repl = void 0;
    class Repl {
        constructor(commands) {
            this.commands = commands;
            // public so split command can operate on them
            this.panels = [];
            // public so openAlbums command can operation on them
            this.photos = [];
            this.commandHistory = [];
            this.commandHistoryIndex = -1;
            this.dnd = null;
            this.animations = new Animations_1.Animations();
            // cannot set dnd because dnd needs repl (for now)
        }
        // extension point for behaviors
        notify(message) {
            console.log(message);
        }
        use(behavior) {
            behavior.extend(this);
        }
        async eval(command) {
            console.log(`executing: ${command}`);
            let [verb] = command.split(" ");
            let handler = this.commands.get(verb);
            if (handler) {
                await handler.execute(this, tail_1.tail(command));
                return;
            }
            switch (verb) {
                case "export":
                    let canvas = await this.asCanvas();
                    if (!canvas)
                        return;
                    let img = document.createElement("img");
                    img.classList.add("export-result");
                    img.src = canvas.toDataURL();
                    document.body.insertBefore(img, document.body.firstElementChild);
                    break;
            }
        }
        // create a canvas of the entire collage
        async asCanvas() {
            return new Promise((good, bad) => {
                var _a;
                let imageCanvas = (_a = document.querySelector(".canvas")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                if (!imageCanvas)
                    return;
                let canvas = document.createElement("canvas");
                canvas.width = imageCanvas.width;
                canvas.height = imageCanvas.height;
                const ctx = canvas.getContext("2d");
                if (!ctx)
                    return;
                let count = 0;
                let panels = this.panels.filter(p => 0 === getComputedStyle(p.panel).backgroundImage.indexOf(`url("`));
                console.log("loading", panels.length);
                panels.forEach(p => {
                    let pos = p.panel.getBoundingClientRect();
                    let img = document.createElement("img");
                    img.crossOrigin = "anonymous";
                    img.width = pos.width;
                    img.height = pos.height;
                    img.style.transform = p.panel.style.transform;
                    img.onload = () => {
                        ctx.drawImage(img, pos.x, pos.y);
                        count++;
                        console.log("loaded:", count);
                        if (count === panels.length) {
                            good(canvas);
                        }
                    };
                    // strip url("");
                    let url = getComputedStyle(p.panel).backgroundImage;
                    console.log("url", url);
                    url = url.substring(5, url.length - 2);
                    console.log("url", url);
                    img.src = url;
                });
            });
        }
        getCollageOverlays() {
            return Array.from(document.querySelectorAll(`.panel[data-id] .overlay`));
        }
        getPhotoOverlays() {
            return Array.from(document.querySelectorAll(`.photos .img .overlay[data-id]`));
        }
        select(id) {
            var _a;
            return (_a = this.selectPanel(id)) === null || _a === void 0 ? void 0 : _a.panel;
        }
        selectPanel(id) {
            return this.panels.find(p => p.overlay.dataset.id === id);
        }
        selectPhoto(id) {
            return this.photos[parseInt(id) - 1];
        }
        removePanel(panel) {
            let index = this.panels.indexOf(panel);
            if (-1 === index)
                throw "panel not found";
            this.panels.splice(index, 1);
            panel.panel.remove();
        }
        reindex() {
            this.panels.filter(p => { var _a; return !!((_a = p === null || p === void 0 ? void 0 : p.panel) === null || _a === void 0 ? void 0 : _a.parentElement); }).forEach((p, i) => p.overlay.dataset.id = p.overlay.innerText = i + 1 + "");
        }
        /**
         * Adds zoom and drag capabilities to a panel
         * @param panel make this panel interactive
         */
        addBehaviors(panel) {
            let overlay = panel.overlay;
            let dnd = this.dnd;
            if (dnd) {
                dnd.zoomable(overlay);
                dnd.draggable(overlay);
                dnd.panable(panel);
                dnd.droppable(overlay);
            }
        }
        reindexPhotos() {
            this.photos.forEach((photo, i) => {
                var _a;
                let p = photo.img;
                let overlay = p.querySelector(".overlay");
                if (!overlay) {
                    overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    overlay.dataset.id = overlay.innerText = 1 + i + "";
                    p.appendChild(overlay);
                    (_a = this.dnd) === null || _a === void 0 ? void 0 : _a.draggable(overlay);
                }
            });
        }
        priorCommand() {
            if (this.commandHistoryIndex > 0) {
                return this.commandHistory[--this.commandHistoryIndex];
            }
            return "";
        }
        nextCommand() {
            if (this.commandHistoryIndex < this.commandHistory.length - 1) {
                return this.commandHistory[++this.commandHistoryIndex];
            }
            return "";
        }
        async startup() {
            let childPanels = Array.from(document.querySelectorAll(".panel")).map(p => new CollagePanel_1.CollagePanel(p));
            childPanels.forEach(c => this.addBehaviors(c));
            this.panels.push(...childPanels);
            let cmd = document.querySelector(".console");
            cmd.onkeydown = event => {
                switch (event.key) {
                    case "Enter":
                        this.executeCommand(cmd.value);
                        cmd.value = "";
                        break;
                    case "ArrowUp":
                        cmd.value = this.priorCommand();
                        break;
                    case "ArrowDown":
                        cmd.value = this.nextCommand();
                        break;
                }
            };
            this.reindex();
        }
        executeCommand(cmd) {
            this.eval(cmd);
            this.commandHistoryIndex = this.commandHistory.push(cmd);
        }
        parseCommand(command) {
            let ai = new CommandParser_1.CommandParser();
            return ai.parsePhrase(command);
        }
    }
    exports.Repl = Repl;
});
define("collage/commands/Help", ["require", "exports", "collage/globals"], function (require, exports, globals_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HelpCommand = void 0;
    class HelpCommand {
        execute(repl, args) {
            const commands = globals_2.globals.repl.commands.list().join(",");
            const keyboardCommands = globals_2.globals.keyboardHandlers.list().join(",");
            console.log(commands, keyboardCommands);
            window.alert(commands + keyboardCommands);
        }
    }
    exports.HelpCommand = HelpCommand;
});
define("collage/commands/SplitCommand", ["require", "exports", "collage/controls/CollagePanel"], function (require, exports, CollagePanel_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SplitCommand = void 0;
    /**
       * Splits the current panel into 4 equal size panels
       * This panel then takes on the role of a panel container
       */
    function split(panel) {
        let [topleft, topright, bottomleft, bottomright] = [1, 2, 3, 4].map(n => document.createElement("div"));
        let children = [topleft, topright, bottomleft, bottomright].map(v => new CollagePanel_2.CollagePanel(v));
        topleft.classList.add("q1");
        topright.classList.add("q2");
        bottomleft.classList.add("q3");
        bottomright.classList.add("q4");
        // photo contains no state so not cloning
        const photo = panel.photo;
        if (photo) {
            children.forEach(c => c.addPhoto(photo.clone()));
        }
        panel.panel.classList.remove("panel");
        panel.overlay.remove();
        panel.image.src = "";
        panel.panel.classList.add("panel-container");
        panel.panel.dataset["id"] = "";
        children.forEach(c => panel.panel.appendChild(c.panel));
        return children;
    }
    /**
     * Splits the panel into 4 new child panels
     */
    class SplitCommand {
        execute(repl, commandArgs) {
            let id = commandArgs;
            let node = repl.select(id);
            if (!node) {
                console.log("no node found");
                return;
            }
            let panel = repl.panels.find(p => p.panel === node);
            if (!panel) {
                console.log("no panel found");
                return;
            }
            let originalIndex = repl.panels.indexOf(panel);
            let childPanels = split(panel);
            // remove since it is no longer a panel
            repl.panels.splice(originalIndex, 1, ...childPanels);
            childPanels.forEach(c => repl.addBehaviors(c));
            repl.reindex();
        }
    }
    exports.SplitCommand = SplitCommand;
});
define("collage/commands/AspectRatioCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AspectRatioCommand = void 0;
    class AspectRatioCommand {
        execute(repl, args) {
            let [w, h] = args.split(" ");
            let width = parseFloat(w);
            let height = parseFloat(h);
            let window = document.querySelector(".window");
            let canvas = window.parentElement;
            let currentWidth = parseFloat(getComputedStyle(canvas).width);
            let currentHeight = parseFloat(getComputedStyle(canvas).height);
            // multiple width and height by maximum scale such that
            // width * scale <= currentWidth and height * scale <= currentHeight
            let sx = currentWidth / width;
            let sy = currentHeight / height;
            let scale = Math.min(sx, sy);
            window.style.width = `${Math.round(width * scale)}px`;
            window.style.height = `${Math.round(height * scale)}px`;
        }
    }
    exports.AspectRatioCommand = AspectRatioCommand;
});
define("collage/commands/BorderCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BorderCommand = void 0;
    class BorderCommand {
        execute(repl, args) {
            var _a;
            let [id, width, color] = args.split(" ");
            (_a = repl.selectPanel(id)) === null || _a === void 0 ? void 0 : _a.border(width, color);
        }
    }
    exports.BorderCommand = BorderCommand;
});
define("collage/commands/ChangeStyleCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChangeStyleCommand = void 0;
    const units = "px em".split(" ");
    function hasUnits(value) {
        return units.some(v => value.endsWith(v));
    }
    class ChangeStyleCommand {
        constructor(target, options) {
            this.target = target;
            this.options = options;
        }
        keyboardHandler(repl) {
            return repl.panels
                .filter(p => p.panel.classList.contains("focus"))
                .some(panel => {
                var _a, _b, _c, _d;
                let target = panel.panel;
                let value = parseFloat(getComputedStyle(target)[this.target]) + ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.delta) !== null && _b !== void 0 ? _b : 0);
                target.style[this.target] = value + ((_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.units) !== null && _d !== void 0 ? _d : "");
                return true;
            });
        }
        execute(repl, args) {
            var _a;
            if (!args) {
                if (this.keyboardHandler(repl))
                    return;
                return false;
            }
            let panels = repl.panels;
            let [value, id] = args.split(" ");
            if (!!id) {
                let panel = repl.selectPanel(id);
                if (!panel) {
                    repl.notify(`panel not found: ${id}`);
                    return false;
                }
                panels = [panel];
            }
            if (!panels.length)
                return false;
            if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.units) && !hasUnits(value)) {
                value += this.options.units;
            }
            panels.forEach(panel => {
                panel.panel.style[this.target] = value;
            });
        }
    }
    exports.ChangeStyleCommand = ChangeStyleCommand;
});
define("collage/commands/GotoCommandEditorCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GotoCommandEditorCommand = void 0;
    function hasFocus(node) {
        return document.activeElement === node;
    }
    class GotoCommandEditorCommand {
        execute(repl, args) {
            let editor = document.querySelector(".console");
            if (!editor) {
                repl.notify("no command editor found");
                return false;
            }
            if (hasFocus(editor))
                return false;
            editor.focus();
            editor.select();
        }
    }
    exports.GotoCommandEditorCommand = GotoCommandEditorCommand;
});
define("collage/commands/getFocusPanels", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFocusPanels = void 0;
    function getFocusPanels(repl) {
        return repl.panels.filter(p => p.panel.classList.contains("focus"));
    }
    exports.getFocusPanels = getFocusPanels;
});
define("collage/commands/SwapPanelsCommand", ["require", "exports", "collage/commands/getFocusPanels"], function (require, exports, getFocusPanels_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SwapPanelsCommand = void 0;
    /**
     * swap images of two panels
     */
    function swapImages(panel1, panel2) {
        let image1 = panel1.image;
        let image2 = panel2.image;
        let parent1 = image1.parentElement;
        let parent2 = image2.parentElement;
        if (!parent1 || !parent2)
            return false;
        let next1 = image1.nextElementSibling;
        let next2 = image2.nextElementSibling;
        image1.remove();
        image2.remove();
        parent2.insertBefore(image1, next2);
        parent1.insertBefore(image2, next1);
        let photo1 = panel1.photo;
        let photo2 = panel2.photo;
        panel1.image = image2;
        panel2.image = image1;
        panel1.photo = photo2;
        panel2.photo = photo1;
    }
    class SwapPanelsCommand {
        keyboardHandler(repl) {
            let panels = getFocusPanels_1.getFocusPanels(repl);
            if (!panels.length)
                return;
            if (2 !== panels.length) {
                repl.notify("Exactly two panels must be selected before you can perform a swap.");
                return false;
            }
            swapImages(panels[0], panels[1]);
        }
        execute(repl, args) {
            if (!args)
                return this.keyboardHandler(repl);
            let [id1, id2] = args.split(" ");
            let panel1 = repl.selectPanel(id1);
            let panel2 = repl.selectPanel(id2);
            if (!panel1) {
                repl.notify(`Panel not found: ${id1}`);
                return false;
            }
            if (!panel2) {
                repl.notify(`Panel not found: ${id2}`);
                return false;
            }
            swapImages(panel1, panel2);
        }
    }
    exports.SwapPanelsCommand = SwapPanelsCommand;
});
define("collage/commands/GotoCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GotoCommand = void 0;
    class GotoCommand {
        execute(repl, args) {
            let id = args;
            let node = repl.select(id);
            if (!node)
                return;
            node.focus();
        }
    }
    exports.GotoCommand = GotoCommand;
});
define("collage/commands/TextCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextCommand = void 0;
    class TextCommand {
        execute(repl, args) {
            let [id, value] = args.split(" ");
            let panel = repl.selectPanel(id);
            if (!panel)
                return;
            panel.text = value;
        }
    }
    exports.TextCommand = TextCommand;
});
define("collage/commands/PadCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PadCommand = void 0;
    class PadCommand {
        execute(repl, args) {
            let [id, width] = args.split(" ");
            let node = repl.select(id);
            if (!node)
                return;
            node.style.padding = `${width}em`;
        }
    }
    exports.PadCommand = PadCommand;
});
define("collage/fun/isVisible", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isVisible = void 0;
    function isVisible(node) {
        return node.style.visibility !== "hidden";
    }
    exports.isVisible = isVisible;
});
define("collage/commands/ToggleVisibilityCommand", ["require", "exports", "collage/fun/isVisible"], function (require, exports, isVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToggleVisibilityCommand = void 0;
    class ToggleVisibilityCommand {
        constructor(options) {
            this.options = options;
        }
        execute(repl, args) {
            let overlays = Array.from(document.querySelectorAll(this.options.selector));
            let allVisible = overlays.every(v => isVisible_1.isVisible(v));
            if (!allVisible) {
                overlays.forEach(v => v.style.visibility = "visible");
            }
            else {
                overlays.forEach(v => v.style.visibility = "hidden");
            }
        }
    }
    exports.ToggleVisibilityCommand = ToggleVisibilityCommand;
});
define("collage/commands/TranslateCommand", ["require", "exports", "collage/commands/getFocusPanels", "collage/fun/transform"], function (require, exports, getFocusPanels_2, transform_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TranslateImageCommand = void 0;
    /**
       * Move the image inside the frame
       * @param x horizontal offset in pixels
       * @param y vertical offset in pixels
       */
    function pan(repl, node, x, y) {
        let [dx, dy] = [0, 0];
        let animate = true;
        let pixelSize = 1;
        switch (x) {
            case "up":
                dy = -pixelSize;
                break;
            case "down":
                dy = pixelSize;
                break;
            case "left":
                dx = -pixelSize;
                break;
            case "right":
                dx = pixelSize;
                break;
            default:
                animate = false;
                dx = pixelSize * parseFloat(x);
                dy = pixelSize * parseFloat(y);
                break;
        }
        let op = () => {
            transform_2.transform(node, `translate(${dx}px, ${dy}px)`);
        };
        op();
        let animations = repl.animations;
        animate && animations.animate("pan", op);
    }
    class TranslateImageCommand {
        constructor(delta) {
            this.delta = delta;
        }
        execute(repl, args) {
            if (!!args) {
                let [id, x, y] = args.split(" ");
                let panel = repl.selectPanel(id);
                if (!panel)
                    return false;
                pan(repl, panel.image, x, y || "0");
            }
            else if (this.delta) {
                let panels = getFocusPanels_2.getFocusPanels(repl);
                if (!panels.length)
                    return false;
                panels.forEach(panel => {
                    pan(repl, panel.image, (this.delta.x || 0) + "", (this.delta.y || 0) + "");
                });
            }
            else {
                // not handled
                return false;
            }
        }
    }
    exports.TranslateImageCommand = TranslateImageCommand;
});
define("collage/commands/MarginCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarginCommand = void 0;
    class MarginCommand {
        execute(repl, args) {
            let [id, width] = args.split(" ");
            let node = repl.select(id);
            if (!node)
                return;
            node.style.margin = `${width}em`;
        }
    }
    exports.MarginCommand = MarginCommand;
});
define("collage/commands/MergeCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MergeCommand = void 0;
    function merge_nodes(repl, panel1, panel2) {
        var _a;
        let node1 = panel1.panel;
        let node2 = panel2.panel;
        node2.classList.forEach(c => node1.classList.add(c));
        repl.removePanel(panel2);
        // if node1 is q1...q4 and only child then it assumes the q of it's container and replaces its container
        let qs = [1, 2, 3, 4].map(v => `q${v}`);
        if (qs.every(v => node1.classList.contains(v))) {
            const parent = node1.parentElement;
            if (!parent)
                return;
            if (parent.classList.contains("panel-container")) {
                qs.forEach(v => node1.classList.remove(v));
                qs.forEach(v => parent.classList.contains(v) && node1.classList.add(v));
                (_a = parent.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(node1, parent);
                parent.remove();
            }
        }
        repl.reindex();
    }
    class MergeCommand {
        execute(repl, args) {
            let [id1, id2] = args.split(" ");
            let node1 = repl.selectPanel(id1);
            let node2 = repl.selectPanel(id2);
            node1 && node2 && merge_nodes(repl, node1, node2);
        }
    }
    exports.MergeCommand = MergeCommand;
});
define("collage/commands/HiResCommand", ["require", "exports", "collage/fun/bbox"], function (require, exports, bbox_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HiResCommand = void 0;
    class HiResCommand {
        /**
         * replaces the current photo with one of higher quality
         */
        async upgradeResolution(repl, panel) {
            if (!panel.photo)
                return;
            // attempts to increase an image size and decrease the transform scale 
            // to have a negligable effect on the image but allow for swapping in 
            // a higher resolution version.
            // this is not compensating for  padding, margin, border width, etc.
            // it is not preserving rotation
            let box = bbox_2.bbox(panel.image);
            let imageRect = panel.image.getBoundingClientRect();
            let scale = imageRect.width / box.width;
            if (1 > scale) {
                repl.notify("this would not be an upgrade");
                return;
            }
            let panelRect = panel.panel.getBoundingClientRect();
            panel.image.style.width = imageRect.width + "px";
            panel.image.style.height = imageRect.height + "px";
            let dx = imageRect.left - panelRect.left - parseFloat(panel.panel.style.borderLeftWidth);
            let dy = imageRect.top - panelRect.top - parseFloat(panel.panel.style.borderTopWidth);
            panel.image.style.transform = `translate(${dx}px,${dy}px)`;
            panel.setBackgroundImage(`${panel.photo.mediaInfo.baseUrl}=w${Math.floor(imageRect.width)}`);
            repl.notify(`upgraded by ${Math.round(scale * 100)}%`);
        }
        execute(repl, args) {
            let id = args;
            let panel = repl.selectPanel(id);
            if (!panel)
                return;
            this.upgradeResolution(repl, panel);
        }
    }
    exports.HiResCommand = HiResCommand;
});
define("collage/commands/MoveCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MoveCommand = void 0;
    class MoveCommand {
        execute(repl, args) {
            let [id1, id2] = args.split(" ");
            let photo = repl.selectPhoto(id1);
            if (!photo)
                return;
            let panel = repl.selectPanel(id2);
            if (!panel)
                return;
            panel.addPhoto(photo);
        }
    }
    exports.MoveCommand = MoveCommand;
});
define("collage/commands/ChangeRotationCommand", ["require", "exports", "collage/commands/getFocusPanels", "collage/fun/transform"], function (require, exports, getFocusPanels_3, transform_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RotateImageCommand = exports.RotatePanelCommand = void 0;
    function rotateImage(repl, node, angle) {
        if (!node)
            return;
        if (!!angle) {
            transform_3.transform(node, `rotate(${angle}deg)`);
        }
        else {
            let angle = 0;
            let animations = repl.animations;
            animations.animate("rotate", () => {
                angle += 1;
                transform_3.transform(node, `rotate(${angle}deg)`);
            });
        }
    }
    class RotatePanelCommand {
        constructor(delta) {
            this.delta = delta;
        }
        execute(repl, args) {
            let panels = getFocusPanels_3.getFocusPanels(repl);
            if (!panels.length)
                return false;
            panels.forEach(panel => {
                let labelImageOrPanel = panel.panel;
                transform_3.transform(labelImageOrPanel, `rotate(${this.delta}deg)`);
            });
        }
    }
    exports.RotatePanelCommand = RotatePanelCommand;
    class RotateImageCommand {
        constructor(delta) {
            this.delta = delta;
        }
        execute(repl, args) {
            if (!!args) {
                let [noun, noun2] = args.split(" ");
                let panel = repl.selectPanel(noun);
                if (!panel)
                    return false;
                rotateImage(repl, panel.image, noun2);
                return;
            }
            let panels = getFocusPanels_3.getFocusPanels(repl);
            if (!panels.length)
                return false;
            panels.forEach(panel => {
                let labelImageOrPanel = panel.image;
                transform_3.transform(labelImageOrPanel, `rotate(${this.delta}deg)`);
            });
        }
    }
    exports.RotateImageCommand = RotateImageCommand;
});
define("collage/commands/ChangePositionCommand", ["require", "exports", "collage/commands/getFocusPanels"], function (require, exports, getFocusPanels_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TranslatePanelCommand = void 0;
    class TranslatePanelCommand {
        constructor(delta) {
            this.delta = delta;
        }
        execute(repl, args) {
            let panels = getFocusPanels_4.getFocusPanels(repl);
            if (!panels.length)
                return false;
            panels.forEach(panel => {
                let labelImageOrPanel = panel.panel;
                let computedTranform = getComputedStyle(labelImageOrPanel).transform;
                if (computedTranform === "none")
                    computedTranform = "";
                labelImageOrPanel.style.transform = computedTranform + ` translate(${this.delta.x || 0}px, ${this.delta.y || 0}px)`;
            });
        }
    }
    exports.TranslatePanelCommand = TranslatePanelCommand;
});
define("collage/commands/StopCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToggleFocusCommand = exports.StopCommand = void 0;
    class StopCommand {
        execute(repl, args) {
            if (!repl.animations.animations.length)
                return false;
            repl.animations.stop(args);
        }
    }
    exports.StopCommand = StopCommand;
    class ToggleFocusCommand {
        execute(repl, args) {
            let activePanel = document.activeElement;
            if (!(activePanel === null || activePanel === void 0 ? void 0 : activePanel.classList.contains("panel")))
                return false;
            activePanel.classList.toggle("focus");
            // here i am - if not "shift" key then unfocus all panels
        }
    }
    exports.ToggleFocusCommand = ToggleFocusCommand;
});
define("collage/commands/EscapeCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EscapeCommand = void 0;
    class EscapeCommand {
        isPanel(element) {
            if (!element)
                return false;
            return element.classList.contains("panel") || element.classList.contains("panel-container");
        }
        selectParentPanel() {
            let currentPanel = document.activeElement;
            if (!currentPanel)
                return;
            while (currentPanel) {
                currentPanel = currentPanel.parentElement;
                if (!currentPanel)
                    return;
                if (this.isPanel(currentPanel)) {
                    currentPanel.focus();
                    return;
                }
            }
        }
        execute(repl, args) {
            // unfocus all panels
            repl.panels.forEach(p => p.panel.classList.remove("focus"));
            this.selectParentPanel();
        }
    }
    exports.EscapeCommand = EscapeCommand;
});
define("collage/commands/ChangeFontSizeCommand", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChangeFontSizeCommand = void 0;
    class ChangeFontSizeCommand {
        constructor(delta) {
            this.delta = delta;
        }
        isLabel(element) {
            if (!element)
                return false;
            return element.classList.contains("label");
        }
        execute(repl, args) {
            let label = document.activeElement;
            if (!this.isLabel(label))
                return false;
            let fontSize = parseFloat(getComputedStyle(label).fontSize);
            label.style.fontSize = `${fontSize + this.delta}px`;
        }
    }
    exports.ChangeFontSizeCommand = ChangeFontSizeCommand;
});
define("collage/models/GooglePhotoAPI", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("collage/controls/GooglePhotoSignin", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GooglePhotoSignin = void 0;
    class GooglePhotoSignin {
        constructor() {
            this.peopleApiDiscovery = "";
            // where to store these values?
            this.scopes = "https://www.googleapis.com/auth/photoslibrary.readonly";
            this.authorizeButton = document.getElementById("authorize-button");
            this.signoutButton = document.getElementById("signout-button");
            this.ready = () => { };
        }
        async handleClientLoad() {
            // Load the API client and auth2 library.
            await new Promise((resolve, reject) => {
                gapi.load("client:auth2", resolve);
            });
            let credentialsResponse = await fetch("./web/credentials.json");
            let credentials = await credentialsResponse.json();
            let resp = await fetch("./web/photos_rest_v1.json");
            this.peopleApiDiscovery = await resp.json();
            await this.initClient(credentials);
        }
        async initClient(args) {
            return new Promise(async (good, bad) => {
                this.ready = () => good();
                await gapi.client.init({
                    apiKey: args.apiKey,
                    discoveryDocs: [this.peopleApiDiscovery],
                    clientId: args.clientId,
                    scope: this.scopes,
                });
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
                // Handle the initial sign-in state.
                this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                this.authorizeButton.onclick = this.handleAuthClick;
                this.signoutButton.onclick = this.handleSignoutClick;
            });
        }
        updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
                this.authorizeButton.style.display = "none";
                this.signoutButton.style.display = "block";
                this.ready();
            }
            else {
                this.authorizeButton.style.display = "block";
                this.signoutButton.style.display = "none";
            }
        }
        handleAuthClick() {
            gapi.auth2.getAuthInstance().signIn();
        }
        handleSignoutClick() {
            gapi.auth2.getAuthInstance().signOut();
        }
    }
    exports.GooglePhotoSignin = GooglePhotoSignin;
});
define("collage/models/GoogleAlbum", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("collage/controls/GooglePhotos", ["require", "exports", "collage/controls/GooglePhotoSignin"], function (require, exports, GooglePhotoSignin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GooglePhotos = void 0;
    class GooglePhotos {
        async getAlbums() {
            let signin = new GooglePhotoSignin_1.GooglePhotoSignin();
            await signin.handleClientLoad();
            let resp = await gapi.client.photoslibrary.albums.list();
            if (resp.status !== 200)
                throw `status: ${resp.status}`;
            console.log({ resp });
            let albums = resp.result.albums;
            while (resp.result.nextPageToken) {
                resp = await gapi.client.photoslibrary.albums.list({ pageToken: resp.result.nextPageToken });
                if (resp.status !== 200)
                    throw `status: ${resp.status}`;
                console.log({ resp });
                albums = albums.concat(resp.result.albums);
            }
            return albums;
        }
        async getAlbum(album) {
            let data = await gapi.client.photoslibrary.mediaItems.search({ albumId: album.id });
            let { mediaItems } = data.result;
            while (data.result.nextPageToken) {
                data = await gapi.client.photoslibrary.mediaItems.search({ albumId: album.id, pageToken: data.result.nextPageToken });
                mediaItems.push(...data.result.mediaItems);
            }
            return mediaItems;
        }
        async getPhoto(mediaItemId) {
            let data = await gapi.client.photoslibrary.mediaItems.get({ mediaItemId });
            return (data.result);
        }
    }
    exports.GooglePhotos = GooglePhotos;
});
define("collage/commands/OpenAlbumsCommand", ["require", "exports", "collage/controls/GooglePhotos", "collage/controls/GoogleCollagePhoto"], function (require, exports, GooglePhotos_1, GoogleCollagePhoto_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OpenAlbumsCommand = void 0;
    class OpenAlbumsCommand {
        async execute(repl, args) {
            if (!args) {
                await this.openAlbums(repl);
                return;
            }
            let albumNames = args.split(",");
            await this.openAlbums(repl, albumNames);
        }
        async openAlbums(repl, albumNames) {
            let photos = new GooglePhotos_1.GooglePhotos();
            const target = document.querySelector(".photos");
            if (target) {
                let albums = await photos.getAlbums();
                if (albumNames)
                    albums = albums.filter(a => -1 < albumNames.indexOf(a.title));
                albums.forEach(async (album) => {
                    console.log(`opening album: ${album.id} (${album.title})`);
                    let mediaItems = await photos.getAlbum(album);
                    mediaItems.forEach(mediaItem => {
                        let photo = new GoogleCollagePhoto_1.GoogleCollagePhoto(mediaItem);
                        repl.photos.push(photo);
                        photo.renderInto(target);
                        repl.reindexPhotos();
                    });
                });
            }
        }
    }
    exports.OpenAlbumsCommand = OpenAlbumsCommand;
});
define("collage/behavior/MultiSelector", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiSelector = void 0;
    /**
     * When user shift-clicks a panel add "focus" class
     * When user clicks a panel add "focus" class, remove "focus" from all others
     */
    class MultiSelector {
        extend(control) {
            window.addEventListener("click", event => {
                // clear current "focus" if shift not clicked
                if (!event.shiftKey) {
                    control.panels.forEach(p => p.panel.classList.remove("focus"));
                }
                let panels = event.composedPath();
                panels = panels.filter((node) => { var _a; return true === ((_a = node === null || node === void 0 ? void 0 : node.classList) === null || _a === void 0 ? void 0 : _a.contains("panel")); });
                panels.forEach((node) => node.classList.toggle("focus"));
            });
        }
    }
    exports.MultiSelector = MultiSelector;
});
define("collage/behavior/NotificationBehavior", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotificationBehavior = void 0;
    /**
     * When user shift-clicks a panel add "focus" class
     * When user clicks a panel add "focus" class, remove "focus" from all others
     */
    class NotificationBehavior {
        constructor(toaster) {
            this.toaster = toaster;
        }
        extend(control) {
            let notify = control.notify;
            control.notify = (message) => {
                notify(message);
                this.toaster.toast(message);
            };
        }
    }
    exports.NotificationBehavior = NotificationBehavior;
});
define("collage/commands/ChangeScaleCommand", ["require", "exports", "collage/commands/getFocusPanels", "collage/fun/transform"], function (require, exports, getFocusPanels_5, transform_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScaleImageCommand = exports.ScalePanelCommand = void 0;
    /**
     * Scale the image
     * @param scale percentage delta from current scale
     */
    function scaleImage(repl, panel, scale) {
        let node = panel.image;
        if (!node)
            return;
        if (!scale) {
            let width = getComputedStyle(node).width;
            let scale = parseFloat(width) / 100;
            repl.animations.animate("zoom", () => {
                scale *= 1.01;
                node.style.width = `${100 * scale}%`;
            });
        }
        else {
            // compute focal point to zoom about
            // let imageBox = bbox(node);
            // let panelBox = bbox(panel.panel);
            // let focalPoint = [-imageBox.left + panelBox.width / 2, -imageBox.top + panelBox.height / 2];
            let effectiveScale = parseFloat(scale);
            //node.style.width = `${100 * effectiveScale}%`;
            // the image width and height changed, translate the original image
            // center back to the panel center
            transform_4.transform(node, `scale(${effectiveScale},${effectiveScale})`);
        }
    }
    class ScalePanelCommand {
        constructor(scale) {
            this.scale = scale;
        }
        execute(repl, args) {
            if (!!args) {
                let [noun, noun2] = args.split(" ");
                let panel = repl.selectPanel(noun);
                if (!panel)
                    return false;
                panel.scaleFrame(noun2);
            }
            let panels = getFocusPanels_5.getFocusPanels(repl);
            if (!panels.length)
                return false;
            panels.forEach(panel => {
                panel.scaleFrame(this.scale + "");
            });
        }
    }
    exports.ScalePanelCommand = ScalePanelCommand;
    class ScaleImageCommand {
        constructor(scale) {
            this.scale = scale;
        }
        execute(repl, args) {
            if (!!args) {
                let [id, scale] = args.split(" ");
                let panel = repl.selectPanel(id);
                if (!panel)
                    return false;
                scaleImage(repl, panel, scale);
                return;
            }
            if (!this.scale)
                return false;
            let panels = getFocusPanels_5.getFocusPanels(repl);
            if (!panels.length)
                return false;
            panels.forEach(panel => {
                scaleImage(repl, panel, this.scale + "");
            });
        }
    }
    exports.ScaleImageCommand = ScaleImageCommand;
});
define("collage/globals", ["require", "exports", "collage/controls/Toaster", "collage/controls/Repl", "collage/controls/DragAndDrop", "collage/controls/Commands", "collage/commands/Help", "collage/commands/SplitCommand", "collage/commands/AspectRatioCommand", "collage/commands/BorderCommand", "collage/commands/ChangeStyleCommand", "collage/commands/GotoCommandEditorCommand", "collage/commands/SwapPanelsCommand", "collage/commands/GotoCommand", "collage/commands/TextCommand", "collage/commands/PadCommand", "collage/commands/ToggleVisibilityCommand", "collage/commands/TranslateCommand", "collage/commands/MarginCommand", "collage/commands/MergeCommand", "collage/commands/HiResCommand", "collage/commands/MoveCommand", "collage/commands/ChangeRotationCommand", "collage/commands/ChangePositionCommand", "collage/commands/StopCommand", "collage/controls/KeyboardHandlers", "collage/commands/EscapeCommand", "collage/commands/ChangeFontSizeCommand", "collage/commands/OpenAlbumsCommand", "collage/behavior/MultiSelector", "collage/behavior/NotificationBehavior", "collage/commands/ChangeScaleCommand"], function (require, exports, Toaster_1, Repl_1, DragAndDrop_1, Commands_1, Help_1, SplitCommand_1, AspectRatioCommand_1, BorderCommand_1, ChangeStyleCommand_1, GotoCommandEditorCommand_1, SwapPanelsCommand_1, GotoCommand_1, TextCommand_1, PadCommand_1, ToggleVisibilityCommand_1, TranslateCommand_1, MarginCommand_1, MergeCommand_1, HiResCommand_1, MoveCommand_1, ChangeRotationCommand_1, ChangePositionCommand_1, StopCommand_1, KeyboardHandlers_1, EscapeCommand_1, ChangeFontSizeCommand_1, OpenAlbumsCommand_1, MultiSelector_1, NotificationBehavior_1, ChangeScaleCommand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.globals = void 0;
    /** global variables */
    const toaster = new Toaster_1.Toaster(document.querySelector(".toaster"));
    const commands = new Commands_1.Commands();
    const repl = new Repl_1.Repl(commands);
    const keyboardHandlers = new KeyboardHandlers_1.KeyboardHandlers();
    repl.use(new MultiSelector_1.MultiSelector());
    repl.use(new NotificationBehavior_1.NotificationBehavior(toaster));
    keyboardHandlers.addEventHandler(new Help_1.HelpCommand(), { key: "?" });
    keyboardHandlers.addEventHandler(new EscapeCommand_1.EscapeCommand(), { key: "Escape" });
    keyboardHandlers.addEventHandler(new ChangeFontSizeCommand_1.ChangeFontSizeCommand(1), { key: "+" });
    keyboardHandlers.addEventHandler(new ChangeFontSizeCommand_1.ChangeFontSizeCommand(-1), { key: "-" });
    keyboardHandlers.addEventHandler(new ChangeScaleCommand_1.ScalePanelCommand(1.01), { shiftKey: true, key: "+" });
    keyboardHandlers.addEventHandler(new ChangeScaleCommand_1.ScalePanelCommand(1 / 1.01), { shiftKey: true, key: "-" });
    keyboardHandlers.addEventHandler(new ChangeScaleCommand_1.ScaleImageCommand(1.01), { key: "+" });
    keyboardHandlers.addEventHandler(new ChangeScaleCommand_1.ScaleImageCommand(1 / 1.01), { key: "-" });
    keyboardHandlers.addEventHandler(new ChangeRotationCommand_1.RotateImageCommand(1), { key: "." });
    keyboardHandlers.addEventHandler(new ChangeRotationCommand_1.RotateImageCommand(-1), { key: "," });
    keyboardHandlers.addEventHandler(new ChangeRotationCommand_1.RotatePanelCommand(1), { shiftKey: true, key: ">" });
    keyboardHandlers.addEventHandler(new ChangeRotationCommand_1.RotatePanelCommand(-1), { shiftKey: true, key: "<" });
    /** vim commands
    To move left, press h.
    To move right, press l.
    To move down, press j.
    To move up, press k.
     */
    keyboardHandlers.addEventHandler(new ChangePositionCommand_1.TranslatePanelCommand({ x: -1 }), { shiftKey: true, key: "ArrowLeft" });
    keyboardHandlers.addEventHandler(new ChangePositionCommand_1.TranslatePanelCommand({ x: 1 }), { shiftKey: true, key: "ArrowRight" });
    keyboardHandlers.addEventHandler(new ChangePositionCommand_1.TranslatePanelCommand({ y: 1 }), { shiftKey: true, key: "ArrowDown" });
    keyboardHandlers.addEventHandler(new ChangePositionCommand_1.TranslatePanelCommand({ y: -1 }), { shiftKey: true, key: "ArrowUp" });
    keyboardHandlers.addEventHandler(new TranslateCommand_1.TranslateImageCommand({ x: -1 }), { shiftKey: false, key: "ArrowLeft" });
    keyboardHandlers.addEventHandler(new TranslateCommand_1.TranslateImageCommand({ x: 1 }), { shiftKey: false, key: "ArrowRight" });
    keyboardHandlers.addEventHandler(new TranslateCommand_1.TranslateImageCommand({ y: 1 }), { shiftKey: false, key: "ArrowDown" });
    keyboardHandlers.addEventHandler(new TranslateCommand_1.TranslateImageCommand({ y: -1 }), { shiftKey: false, key: "ArrowUp" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("top", { delta: 1, units: "px" }), { key: "t" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("top", { delta: -1, units: "px" }), { shiftKey: true, key: "T" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("left", { delta: 1, units: "px" }), { key: "l" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("left", { delta: -1, units: "px" }), { shiftKey: true, key: "L" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("bottom", { delta: 1, units: "px" }), { key: "b" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("bottom", { delta: -1, units: "px" }), { shiftKey: true, key: "B" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("right", { delta: 1, units: "px" }), { key: "r" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("right", { delta: -1, units: "px" }), { shiftKey: true, key: "R" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("width", { delta: 1, units: "px" }), { key: "w" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("width", { delta: -1, units: "px" }), { shiftKey: true, key: "W" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("height", { delta: 1, units: "px" }), { key: "h" });
    keyboardHandlers.addEventHandler(new ChangeStyleCommand_1.ChangeStyleCommand("height", { delta: -1, units: "px" }), { shiftKey: true, key: "H" });
    keyboardHandlers.addEventHandler(new SwapPanelsCommand_1.SwapPanelsCommand(), { ctrlKey: true, key: "s" });
    keyboardHandlers.addEventHandler(new StopCommand_1.StopCommand(), { shiftKey: true, key: " " });
    keyboardHandlers.addEventHandler(new GotoCommandEditorCommand_1.GotoCommandEditorCommand(), { key: "c" });
    keyboardHandlers.addEventHandler(new StopCommand_1.ToggleFocusCommand(), { shiftKey: true, key: " " });
    keyboardHandlers.addEventHandler(new StopCommand_1.ToggleFocusCommand(), { shiftKey: false, key: " " });
    const dnd = new DragAndDrop_1.DragAndDrop(repl, keyboardHandlers);
    repl.dnd = dnd;
    commands.add(new Help_1.HelpCommand(), "?");
    commands.add(new OpenAlbumsCommand_1.OpenAlbumsCommand(), "open");
    commands.add(new AspectRatioCommand_1.AspectRatioCommand(), "aspect");
    commands.add(new BorderCommand_1.BorderCommand(), "border");
    commands.add(new GotoCommand_1.GotoCommand(), "goto");
    commands.add(new HiResCommand_1.HiResCommand(), "hires");
    commands.add(new MarginCommand_1.MarginCommand(), "margin");
    commands.add(new MergeCommand_1.MergeCommand(), "merge");
    commands.add(new MoveCommand_1.MoveCommand(), "move");
    commands.add(new PadCommand_1.PadCommand(), "pad");
    commands.add(new ChangeRotationCommand_1.RotateImageCommand(), "rotate");
    commands.add(new ChangeScaleCommand_1.ScalePanelCommand(), "scale");
    commands.add(new SwapPanelsCommand_1.SwapPanelsCommand(), "swap");
    commands.add(new SplitCommand_1.SplitCommand(), "split");
    commands.add(new StopCommand_1.StopCommand(), "stop");
    commands.add(new TextCommand_1.TextCommand(), "text");
    commands.add(new TranslateCommand_1.TranslateImageCommand(), "translate");
    commands.add(new TranslateCommand_1.TranslateImageCommand(), "pan");
    commands.add(new ChangeScaleCommand_1.ScaleImageCommand(), "zoom");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("backgroundColor"), "bgc");
    commands.add(new ToggleVisibilityCommand_1.ToggleVisibilityCommand({ selector: ".collage .panel-container .overlay" }), "overlay");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderColor"), "bc");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderTopColor"), "bct");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderBottomColor"), "bcb");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderLeftColor"), "bcl");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderRightColor"), "bcr");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderWidth"), "bw");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderBottomWidth"), "bwb");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderTopWidth"), "bwt");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderLeftWidth"), "bwl");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderRightWidth"), "bwr");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("opacity"), "opacity");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderRadius"), "br");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderTopLeftRadius"), "brtl");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderTopRightRadius"), "brtr");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderBottomLeftRadius"), "brbl");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderBottomRightRadius"), "brbr");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("width", { units: "em" }), "width");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("height", { units: "px" }), "height");
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("zIndex"), "z");
    toaster.toast("Welcome!");
    exports.globals = {
        allowSpeechRecognition: false,
        debug: true,
        repl,
        dnd,
        keyboardHandlers,
    };
});
define("collage/fun/start", ["require", "exports", "collage/controls/Listener", "collage/globals"], function (require, exports, Listener_1, globals_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.start = void 0;
    async function start() {
        let repl = globals_3.globals.repl;
        await repl.startup();
        if (globals_3.globals.allowSpeechRecognition) {
            let listener = new Listener_1.Listener();
            listener.listen();
            listener.on("speech-detected", value => { repl.executeCommand(repl.parseCommand(value.result)); });
        }
        repl.getPhotoOverlays().forEach(overlay => {
            globals_3.globals.dnd.draggable(overlay);
            console.log(`${overlay.innerHTML} is draggable`);
        });
    }
    exports.start = start;
});
define("index", ["require", "exports", "collage/fun/start", "collage/globals"], function (require, exports, start_1, globals_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    async function run() {
        start_1.start();
        const repl = globals_4.globals.repl;
        repl.eval("aspect 6 6");
        if (globals_4.globals.debug) {
            repl.eval("?");
            repl.eval("split 1");
            repl.eval("merge 4 3");
            repl.eval("split 2");
            repl.eval("merge 4 5");
            repl.eval("merge 2 3");
            ///repl.eval("split 1");
            repl.eval("bw 1em");
            repl.eval("bc white");
            repl.eval("bgc silver");
            // repl.eval("scale 1 0.75");
            // repl.eval("border 1 3 silver");
            // repl.eval("rotate 1 -2");
            // repl.eval("zoom 2 0.5");
            // repl.eval("split 1");
            // repl.eval("merge 1 2");
            // repl.eval("split 6");
            // repl.eval("merge 8 9");
            // repl.eval("merge 6 7");
            // repl.eval("goto 1");
            // repl.eval("text 1 Summer 2019");
            await repl.eval("open Date Night,2019"); // present list of google photo albums?
            //await repl.eval("open gp 1999"); // open google photo album "1999"?
            setTimeout(() => {
                let panelCount = document.querySelectorAll(".collage .panel").length;
                let photoCount = document.querySelectorAll(".collage .photos .img").length;
                for (let i = 1; i <= panelCount; i++) {
                    repl.eval(`move ${1 + (i - 1) % photoCount} ${i}`);
                }
                // repl.eval("open 1");
                // repl.eval("hires 6");
                // repl.eval("export");
            }, 3000);
        }
    }
    run();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xsYWdlL21vZGVscy9EaWN0aW9uYXJ5LnRzIiwiY29sbGFnZS9jb250cm9scy9MaXN0ZW5lci50cyIsImNvbGxhZ2UvY29udHJvbHMvVG9hc3Rlci50cyIsImNvbGxhZ2UvZnVuL3RhaWwudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRQYXJzZXIudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQaG90by50cyIsImNvbGxhZ2UvbW9kZWxzL0dvb2dsZU1lZGlhSXRlbS50cyIsImNvbGxhZ2UvY29udHJvbHMvR29vZ2xlQ29sbGFnZVBob3RvLnRzIiwiY29sbGFnZS9jb250cm9scy9TcHJpdGUudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbC50cyIsImNvbGxhZ2UvY29udHJvbHMvQW5pbWF0aW9ucy50cyIsImNvbGxhZ2UvbW9kZWxzL0NvbW1hbmQudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRzLnRzIiwiY29sbGFnZS9mdW4vZ2V0QWN0aXZlT3ZlcmxheS50cyIsImNvbGxhZ2UvbW9kZWxzL0tleWJvYXJkSGFuZGxlci50cyIsImNvbGxhZ2UvY29udHJvbHMvS2V5Ym9hcmRIYW5kbGVycy50cyIsImNvbGxhZ2UvZnVuL3RyYW5zZm9ybS50cyIsImNvbGxhZ2UvZnVuL2Jib3gudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0RyYWdBbmREcm9wLnRzIiwiY29sbGFnZS9tb2RlbHMvQmVoYXZpb3IudHMiLCJjb2xsYWdlL2NvbnRyb2xzL1JlcGwudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hlbHAudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1NwbGl0Q29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQXNwZWN0UmF0aW9Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Cb3JkZXJDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTdHlsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvZ2V0Rm9jdXNQYW5lbHMudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Hb3RvQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvVGV4dENvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1BhZENvbW1hbmQudHMiLCJjb2xsYWdlL2Z1bi9pc1Zpc2libGUudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9UcmFuc2xhdGVDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NYXJnaW5Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NZXJnZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hpUmVzQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvTW92ZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0NoYW5nZVJvdGF0aW9uQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlUG9zaXRpb25Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9TdG9wQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvRXNjYXBlQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlUGhvdG9BUEkudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3RvU2lnbmluLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlQWxidW0udHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3Rvcy50cyIsImNvbGxhZ2UvY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmQudHMiLCJjb2xsYWdlL2JlaGF2aW9yL011bHRpU2VsZWN0b3IudHMiLCJjb2xsYWdlL2JlaGF2aW9yL05vdGlmaWNhdGlvbkJlaGF2aW9yLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2dsb2JhbHMudHMiLCJjb2xsYWdlL2Z1bi9zdGFydC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lDQ0E7O09BRUc7SUFDSCxNQUFhLFFBQVE7UUFJbkI7WUFGQSxZQUFPLEdBQVksSUFBSSxDQUFDO1lBQ3hCLGNBQVMsR0FBWSxJQUFJLENBQUM7WUFrQ2xCLGVBQVUsR0FHSCxFQUFFLENBQUM7WUFuQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBVSxNQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRSxDQUFDO1lBQ2xFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbkMsV0FBVyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDbkMsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDL0IsV0FBVyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDM0IsV0FBVyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDaEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxJQUFJLENBQUMsU0FBUztvQkFDaEIsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN6QyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7d0JBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN0QyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDOzRCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbkMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzs0QkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtnQ0FDOUIsTUFBTSxFQUFFLFVBQVU7Z0NBQ2xCLEtBQUssRUFBRSxVQUFVLEdBQUcsR0FBRzs2QkFDeEIsQ0FBQyxDQUFDOzRCQUNILE9BQU87eUJBQ1I7cUJBQ0Y7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFLTyxTQUFTLENBQUMsS0FBYTs7WUFDN0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUdSO1lBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELE9BQU8sQ0FBQyxLQUFhLEVBQUUsS0FHdEI7WUFDQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCxNQUFNO1lBQ0osSUFBSSxJQUFJLENBQUMsT0FBTztnQkFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FDRjtJQTVERCw0QkE0REM7Ozs7OztJQ2hFRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDN0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXZCLEtBQUssVUFBVSxPQUFPLENBQUMsSUFBaUI7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQWEsT0FBTztRQUNoQixZQUFtQixNQUFtQjtZQUFuQixXQUFNLEdBQU4sTUFBTSxDQUFhO1lBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFnQixDQUFDLENBQUMsQ0FBQztRQUNoRyxDQUFDO1FBRUQsS0FBSyxDQUFDLE9BQWU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMvRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFrQjtZQUNqQyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUNKO0lBbkJELDBCQW1CQzs7Ozs7O0lDN0JELHVCQUF1QjtJQUN2QixTQUFnQixJQUFJLENBQUMsS0FBYTtRQUNoQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBSkQsb0JBSUM7Ozs7OztJQ0xELHFCQUFxQjtJQUNyQjs7T0FFRztJQUNILE1BQWEsYUFBYTtRQUN4QixXQUFXLENBQUMsTUFBYztZQUN4QixNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlCLElBQUksR0FBRyxHQUFRO2dCQUNiLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRSxFQUFFO2dCQUNYLEtBQUssRUFBRSxHQUFHO2dCQUNWLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxHQUFHO2dCQUNYLE1BQU0sRUFBRSxHQUFHO2dCQUNYLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE1BQU0sRUFBRSxHQUFHO2dCQUNYLE1BQU0sRUFBRSxFQUFFO2dCQUNWLElBQUksRUFBRSxFQUFFO2dCQUNSLEtBQUssRUFBRSxFQUFFO2dCQUNULFNBQVMsRUFBRSxFQUFFO2dCQUNiLE9BQU8sRUFBRSxNQUFNO2dCQUNmLEdBQUcsRUFBRSxHQUFHO2FBQ1QsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSx3QkFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1DQUFJLENBQUMsR0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDO0tBQ0Y7SUFoQ0Qsc0NBZ0NDOzs7Ozs7SUNwQ0Q7OztPQUdHO0lBQ0gsTUFBYSxZQUFZO0tBQ3hCO0lBREQsb0NBQ0M7Ozs7Ozs7Ozs7SUVGRCxNQUFhLGtCQUFtQixTQUFRLDJCQUE2QjtRQUduRSxZQUFtQixTQUEwQjtZQUMzQyxLQUFLLEVBQUUsQ0FBQztZQURTLGNBQVMsR0FBVCxTQUFTLENBQWlCO1lBRTNDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUM7WUFDN0QsR0FBRyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ2pDLENBQUM7UUFFRCxVQUFVLENBQUMsTUFBbUI7WUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVELEtBQUs7WUFDSCxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQztLQUNGO0lBbEJELGdEQWtCQzs7Ozs7O0lDckJEOzs7T0FHRztJQUNILE1BQWEsTUFBTTtRQUtqQixZQUFtQixLQUF1QjtZQUF2QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtZQUN4QyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixDQUFDO1FBQ0QsU0FBUyxDQUFDLElBS1Q7WUFDQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDMUcsQ0FBQztRQUNELFNBQVMsQ0FBQyxFQUFVLEVBQUUsRUFBVTtZQUM5QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQWE7WUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsS0FBSyxDQUFDLEtBQWE7WUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0Qsd0NBQXdDO1FBQ3hDLDBDQUEwQztRQUMxQyxtQ0FBbUM7UUFDbkMsT0FBTyxDQUFDLEtBQWE7WUFDbkIsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakYsQ0FBQztLQUNGO0lBMUNELHdCQTBDQzs7Ozs7O0lDMUNEOzs7T0FHRztJQUNILE1BQWEsWUFBWTtRQVd2Qjs7O1dBR0c7UUFDSCxZQUFtQixLQUFxQjtZQUFyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUVEOztXQUVHO1FBQ0gsUUFBUSxDQUFDLEtBQXlCO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRDs7V0FFRztRQUNILElBQUksVUFBVTtZQUNaLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVEOztXQUVHO1FBQ0gsSUFBSSxXQUFXO1lBQ2IsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQ7O1dBRUc7UUFDSCxJQUFJLFVBQVU7WUFDWixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDekIsSUFBSSxLQUFLLEtBQUssTUFBTTtnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUNqQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDbkMsQ0FBQztRQUVEOztXQUVHO1FBQ0gsSUFBSSxPQUFPO1lBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQW1CLENBQUM7UUFDaEUsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxJQUFJLElBQUksQ0FBQyxLQUFhO1lBQ3BCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0MsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDbEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLGlCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxPQUFPO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQ7OztTQUdDO1FBQ0Qsa0JBQWtCLENBQUMsZUFBdUI7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDO1FBQ25DLENBQUM7UUFFRDs7O1dBR0c7UUFDSCxNQUFNLENBQUMsS0FBYSxFQUFFLEtBQUssR0FBRyxPQUFPO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEtBQUssWUFBWSxLQUFLLEVBQUUsQ0FBQztRQUN4RCxDQUFDO1FBRUQ7OztVQUdFO1FBQ0YsV0FBVyxDQUFDLEtBQWE7WUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsSUFBSTtnQkFDUCxPQUFPO1lBQ1QsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNYLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDO2FBQzVDO2lCQUNJO2dCQUNILElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztnQkFDckMsSUFBSSxVQUFVLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUN6QyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7b0JBQ2hDLEtBQUssSUFBSSxDQUFDLENBQUM7b0JBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLFdBQVcsS0FBSyxNQUFNLENBQUM7Z0JBQzVELENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO1FBRUQsVUFBVSxDQUFDLEtBQWE7WUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEtBQUssS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFTyxjQUFjLENBQUMsQ0FBUztZQUM5QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ08sT0FBTyxDQUFDLE9BQXVCO1lBQ3JDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUVGO0lBL0lELG9DQStJQzs7Ozs7O0lDdkpEOzs7T0FHRztJQUNILE1BQWEsVUFBVTtRQUF2QjtZQUNFLGVBQVUsR0FHTCxFQUFFLENBQUM7UUFlVixDQUFDO1FBYkMsSUFBSSxDQUFDLElBQVk7WUFDZixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztZQUNyRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO29CQUM1QixhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxDQUFDLElBQVksRUFBRSxFQUFjO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQ0Y7SUFuQkQsZ0NBbUJDOzs7Ozs7Ozs7O0lFcEJEOztPQUVHO0lBQ0gsTUFBYSxRQUFRO1FBQXJCO1lBRVksYUFBUSxHQUF3QixFQUFFLENBQUM7UUF5Qi9DLENBQUM7UUF2Qkc7OztXQUdHO1FBQ0gsR0FBRyxDQUFDLElBQVk7WUFDWixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkUsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILEdBQUcsQ0FBQyxPQUFnQixFQUFFLElBQVk7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbEMsQ0FBQztRQUVELElBQUk7WUFDRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FFSjtJQTNCRCw0QkEyQkM7Ozs7OztJQ2pDRCxTQUFnQixnQkFBZ0I7UUFDOUIsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMvQixPQUFPO1NBQ1I7UUFDRCxPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFnQixDQUFDO0lBQzlELENBQUM7SUFQRCw0Q0FPQzs7Ozs7Ozs7OztJRUpELE1BQWEsZ0JBQWdCO1FBQTdCO1lBQ1UscUJBQWdCLEdBQXNELEVBQUUsQ0FBQztRQTBCbkYsQ0FBQztRQXhCQyxnQkFBZ0IsQ0FBQyxLQUFvQjtZQUNuQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzVDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQzFCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDaEQsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxRQUFRO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUNwRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLE9BQU87b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDekQsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxlQUFlLENBQUMsT0FBZ0IsRUFBRSxLQUErQjs7WUFDL0QsSUFBSSxTQUFTLEdBQW9CO2dCQUMvQixNQUFNLFFBQUUsS0FBSyxDQUFDLE1BQU0sbUNBQUksS0FBSztnQkFDN0IsT0FBTyxRQUFFLEtBQUssQ0FBQyxPQUFPLG1DQUFJLEtBQUs7Z0JBQy9CLFFBQVEsUUFBRSxLQUFLLENBQUMsUUFBUSxtQ0FBSSxLQUFLO2dCQUNqQyxHQUFHLFFBQUUsS0FBSyxDQUFDLEdBQUcsbUNBQUksRUFBRTthQUNyQixDQUFDO1lBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRUQsSUFBSTtZQUNGLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQztLQUNGO0lBM0JELDRDQTJCQzs7Ozs7O0lDN0JELFNBQWdCLFNBQVMsQ0FBQyxJQUFpQixFQUFFLEtBQWE7UUFDeEQsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFKRCw4QkFJQzs7Ozs7O0lDTEQsU0FBZ0IsSUFBSSxDQUFDLElBQWlCO1FBQ2xDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2xILENBQUM7SUFIRCxvQkFHQzs7Ozs7O0lDSUQ7O09BRUc7SUFDSCxNQUFhLFdBQVc7UUFHdEIsWUFBbUIsSUFBVSxFQUFTLGVBQWlDO1lBQXBELFNBQUksR0FBSixJQUFJLENBQU07WUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFGL0QsV0FBTSxHQUF1QixJQUFJLENBQUM7WUFJeEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN6QyxJQUFJLE1BQU0sR0FBRyxtQ0FBZ0IsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztvQkFDdkMsT0FBTztpQkFDUjtnQkFDRCxvRUFBb0U7Z0JBQ3BFLDREQUE0RDtnQkFDNUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDNUIsOEJBQThCO2dCQUM5QixJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBRXpDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzlELE9BQU8sS0FBSyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsRUFBRTtvQkFDRixVQUFVO29CQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDeEI7WUFFSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRDs7O1dBR0c7UUFDSCxPQUFPLENBQUMsS0FBbUI7WUFDekIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVyQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ25ELElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDakQsYUFBYSxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0MsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDdkQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDOUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakQsU0FBUyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxHQUFHLEdBQUcsV0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNuQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ25ELHFCQUFTLENBQUMsU0FBUyxFQUFFLGFBQWEsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUMvRSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLFdBQVcsR0FBRyxDQUFDLEtBQWlCLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xGLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQsUUFBUSxDQUFDLFNBQXNCO1lBQzdCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXJDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2hELElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsYUFBYSxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0MsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDdkQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDOUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakQsU0FBUyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDMUQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxXQUFXLEdBQUcsQ0FBQyxLQUFpQixFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNqQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVEOzs7V0FHRztRQUNILFNBQVMsQ0FBQyxTQUFzQjtZQUM5QixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUMzQixTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFFRDs7O1dBR0c7UUFDSCxTQUFTLENBQUMsTUFBbUI7WUFDM0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07b0JBQ2QsT0FBTztnQkFDVCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO29CQUNkLE9BQU87Z0JBQ1QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQ7OztXQUdHO1FBQ0gsUUFBUSxDQUFDLE1BQW1CO1FBQzVCLENBQUM7UUFDRCxXQUFXLENBQUMsTUFBbUI7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUVELFVBQVUsQ0FBQyxNQUFtQixFQUFFLE1BQW1CO1lBQ2pELGlCQUFpQjtRQUNuQixDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQW1CLEVBQUUsTUFBbUI7WUFDN0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUM1QixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQzFCLElBQUksT0FBTyxHQUFHLFFBQVEsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FDRjtJQWhKRCxrQ0FnSkM7Ozs7Ozs7Ozs7SUVqSkQsTUFBYSxJQUFJO1FBZ0JmLFlBQW1CLFFBQWtCO1lBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7WUFUckMsOENBQThDO1lBQ3ZDLFdBQU0sR0FBd0IsRUFBRSxDQUFDO1lBQ3hDLHFEQUFxRDtZQUM5QyxXQUFNLEdBQThCLEVBQUUsQ0FBQztZQUN0QyxtQkFBYyxHQUFrQixFQUFFLENBQUM7WUFDbkMsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsUUFBRyxHQUF1QixJQUFJLENBQUM7WUFDL0IsZUFBVSxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO1lBR25DLGtEQUFrRDtRQUNwRCxDQUFDO1FBaEJELGdDQUFnQztRQUNoQyxNQUFNLENBQUMsT0FBZTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFlTSxHQUFHLENBQUMsUUFBd0I7WUFDakMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFlO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksT0FBTyxFQUFFO2dCQUNYLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsV0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU87YUFDUjtZQUNELFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssUUFBUTtvQkFDWCxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLE1BQU07d0JBQUUsT0FBTztvQkFFcEIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ25DLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUNqRSxNQUFNO2FBQ1Q7UUFDSCxDQUFDO1FBRUQsd0NBQXdDO1FBQ3hDLEtBQUssQ0FBQyxRQUFRO1lBQ1osT0FBTyxJQUFJLE9BQU8sQ0FBb0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7O2dCQUNsRCxJQUFJLFdBQVcsU0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywwQ0FBRSxxQkFBcUIsRUFBRSxDQUFDO2dCQUM3RSxJQUFJLENBQUMsV0FBVztvQkFBRSxPQUFPO2dCQUV6QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFFbkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLEdBQUc7b0JBQUUsT0FBTztnQkFFakIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDakIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO29CQUMxQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QyxHQUFHLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztvQkFDOUIsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUN0QixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7b0JBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDOUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7d0JBQ2hCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxLQUFLLEVBQUUsQ0FBQzt3QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRTs0QkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUNkO29CQUNILENBQUMsQ0FBQztvQkFDRixpQkFBaUI7b0JBQ2pCLElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUM7b0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3hCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGtCQUFrQjtZQUNoQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFDLENBQWtCLENBQUM7UUFDNUYsQ0FBQztRQUVELGdCQUFnQjtZQUNkLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUMsQ0FBa0IsQ0FBQztRQUNsRyxDQUFDO1FBRUQsTUFBTSxDQUFDLEVBQVU7O1lBQ2YsYUFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxLQUFLLENBQUM7UUFDckMsQ0FBQztRQUVELFdBQVcsQ0FBQyxFQUFVO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVELFdBQVcsQ0FBQyxFQUFVO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELFdBQVcsQ0FBQyxLQUFtQjtZQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUs7Z0JBQUUsTUFBTSxpQkFBaUIsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsT0FBTztZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQUMsT0FBQSxDQUFDLFFBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLEtBQUssMENBQUUsYUFBYSxDQUFBLENBQUEsRUFBQSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDaEksQ0FBQztRQUVEOzs7V0FHRztRQUNILFlBQVksQ0FBQyxLQUFtQjtZQUM5QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDbkIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUM7UUFFRCxhQUFhO1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUMvQixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBZ0IsQ0FBQztnQkFDekQsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDWixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3BELENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZCLE1BQUEsSUFBSSxDQUFDLEdBQUcsMENBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRTtpQkFDOUI7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxZQUFZO1lBQ1YsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUN4RDtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUVELFdBQVc7WUFDVCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzdELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3hEO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO1FBRUQsS0FBSyxDQUFDLE9BQU87WUFDWCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksMkJBQVksQ0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoSCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDakMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQXFCLENBQUM7WUFDakUsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDdEIsUUFBUSxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUNqQixLQUFLLE9BQU87d0JBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQy9CLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUNmLE1BQU07b0JBQ1IsS0FBSyxTQUFTO3dCQUNaLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNoQyxNQUFNO29CQUNSLEtBQUssV0FBVzt3QkFDZCxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDL0IsTUFBTTtpQkFDVDtZQUNILENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBRU0sY0FBYyxDQUFDLEdBQVc7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRU0sWUFBWSxDQUFDLE9BQWU7WUFDakMsSUFBSSxFQUFFLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FDRjtJQS9MRCxvQkErTEM7Ozs7OztJQ25NRCxNQUFhLFdBQVc7UUFDdEIsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLE1BQU0sUUFBUSxHQUFHLGlCQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEQsTUFBTSxnQkFBZ0IsR0FBRyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLENBQUM7UUFDNUMsQ0FBQztLQUNGO0lBUEQsa0NBT0M7Ozs7OztJQ1JEOzs7U0FHSztJQUNILFNBQVMsS0FBSyxDQUFDLEtBQW1CO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN4RyxJQUFJLFFBQVEsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksMkJBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLHlDQUF5QztRQUN6QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksS0FBSyxFQUFFO1lBQ1QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsRDtRQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFSDs7T0FFRztJQUNILE1BQWEsWUFBWTtRQUV2QixPQUFPLENBQUMsSUFBVSxFQUFFLFdBQW1CO1lBQ3JDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQztZQUVyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0IsT0FBTzthQUNSO1lBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUM5QixPQUFPO2FBQ1I7WUFFRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQztZQUNyRCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDO0tBRUY7SUF6QkQsb0NBeUJDOzs7Ozs7SUN0REQsTUFBYSxrQkFBa0I7UUFDN0IsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFnQixDQUFDO1lBQzlELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUE0QixDQUFDO1lBQ2pELElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RCxJQUFJLGFBQWEsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEUsdURBQXVEO1lBQ3ZELG9FQUFvRTtZQUNwRSxJQUFJLEVBQUUsR0FBRyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksRUFBRSxHQUFHLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMxRCxDQUFDO0tBQ0Y7SUFqQkQsZ0RBaUJDOzs7Ozs7SUNqQkQsTUFBYSxhQUFhO1FBQ3hCLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBWTs7WUFDOUIsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxNQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLDBDQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO1FBQzdDLENBQUM7S0FDRjtJQUxELHNDQUtDOzs7Ozs7SUNMRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLFNBQVMsUUFBUSxDQUFDLEtBQWE7UUFDN0IsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxNQUFhLGtCQUFrQjtRQUM3QixZQUNTLE1BQStDLEVBQy9DLE9BR047WUFKTSxXQUFNLEdBQU4sTUFBTSxDQUF5QztZQUMvQyxZQUFPLEdBQVAsT0FBTyxDQUdiO1FBQ0MsQ0FBQztRQUVHLGVBQWUsQ0FBQyxJQUFVO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU07aUJBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7O2dCQUNaLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxhQUFDLElBQUksQ0FBQyxPQUFPLDBDQUFFLEtBQUssbUNBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLE1BQU0sQ0FBQyxLQUFLLENBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxhQUFDLElBQUksQ0FBQyxPQUFPLDBDQUFFLEtBQUssbUNBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3JFLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUF5Qjs7WUFDM0MsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO29CQUFFLE9BQU87Z0JBQ3ZDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUVqQyxJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsS0FBSyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDN0I7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBOUNELGdEQThDQzs7Ozs7O0lDcERELFNBQVMsUUFBUSxDQUFDLElBQWlCO1FBQ2pDLE9BQU8sUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUM7SUFDekMsQ0FBQztJQUVELE1BQWEsd0JBQXdCO1FBQ25DLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBWTtZQUM5QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBcUIsQ0FBQztZQUNwRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztLQUNGO0lBWEQsNERBV0M7Ozs7OztJQ2hCRCxTQUFnQixjQUFjLENBQUMsSUFBVTtRQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUZELHdDQUVDOzs7Ozs7SUNDRDs7T0FFRztJQUNILFNBQVMsVUFBVSxDQUFDLE1BQW9CLEVBQUUsTUFBb0I7UUFDNUQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDbkMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3ZDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztRQUN0QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUM7UUFDdEMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDdEIsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDdEIsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDdEIsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUdELE1BQWEsaUJBQWlCO1FBQ3BCLGVBQWUsQ0FBQyxJQUFVO1lBQ2hDLElBQUksTUFBTSxHQUFHLCtCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUFFLE9BQU87WUFDM0IsSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO2dCQUNsRixPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUF5QjtZQUMzQyxJQUFJLENBQUMsSUFBSTtnQkFDUCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUM7S0FDRjtJQTVCRCw4Q0E0QkM7Ozs7OztJQ3ZERCxNQUFhLFdBQVc7UUFDdEIsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO0tBQ0Y7SUFQRCxrQ0FPQzs7Ozs7O0lDUEQsTUFBYSxXQUFXO1FBQ3RCLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBWTtZQUM5QixJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPO1lBQ25CLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUM7S0FDRjtJQVBELGtDQU9DOzs7Ozs7SUNQRCxNQUFhLFVBQVU7UUFDckIsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxLQUFLLElBQUksQ0FBQztRQUVwQyxDQUFDO0tBQ0Y7SUFSRCxnQ0FRQzs7Ozs7O0lDVkQsU0FBZ0IsU0FBUyxDQUFDLElBQWlCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDO0lBQzVDLENBQUM7SUFGRCw4QkFFQzs7Ozs7O0lDQ0QsTUFBYSx1QkFBdUI7UUFDbEMsWUFBbUIsT0FFbEI7WUFGa0IsWUFBTyxHQUFQLE9BQU8sQ0FFekI7UUFDRCxDQUFDO1FBQ0QsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQXVCLENBQUM7WUFDbEcsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQzthQUN2RDtpQkFDSTtnQkFDSCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUM7YUFDdEQ7UUFDSCxDQUFDO0tBQ0Y7SUFmRCwwREFlQzs7Ozs7O0lDYkQ7Ozs7U0FJSztJQUNMLFNBQVMsR0FBRyxDQUFDLElBQVUsRUFBRSxJQUFpQixFQUFFLENBQVMsRUFBRSxDQUFTO1FBQzlELElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixRQUFRLENBQUMsRUFBRTtZQUNULEtBQUssSUFBSTtnQkFDUCxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hCLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsRUFBRSxHQUFHLFNBQVMsQ0FBQztnQkFDZixNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQztnQkFDaEIsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixFQUFFLEdBQUcsU0FBUyxDQUFDO2dCQUNmLE1BQU07WUFDUjtnQkFDRSxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNoQixFQUFFLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsRUFBRSxHQUFHLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU07U0FDVDtRQUNELElBQUksRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUNaLHFCQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDO1FBQ0YsRUFBRSxFQUFFLENBQUM7UUFDTCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBYSxxQkFBcUI7UUFFaEMsWUFBbUIsS0FHbEI7WUFIa0IsVUFBSyxHQUFMLEtBQUssQ0FHdkI7UUFBSSxDQUFDO1FBR04sT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtnQkFDVixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsS0FBSztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDekIsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7YUFDckM7aUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNyQixJQUFJLE1BQU0sR0FBRywrQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBRWpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3JCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRSxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLGNBQWM7Z0JBQ2QsT0FBTyxLQUFLLENBQUM7YUFDZDtRQUNILENBQUM7S0FDRjtJQTFCRCxzREEwQkM7Ozs7OztJQ2pFRCxNQUFhLGFBQWE7UUFDeEIsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFFbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxLQUFLLElBQUksQ0FBQztRQUNqQyxDQUFDO0tBQ0o7SUFSRCxzQ0FRQzs7Ozs7O0lDTkQsU0FBUyxXQUFXLENBQUMsSUFBVSxFQUFFLE1BQW9CLEVBQUUsTUFBb0I7O1FBQ3pFLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUV6QixLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6Qix3R0FBd0c7UUFDeEcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU87WUFFcEIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUNoRCxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLE1BQUEsTUFBTSxDQUFDLGFBQWEsMENBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7Z0JBQ2xELE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQjtTQUNGO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxNQUFhLFlBQVk7UUFDdkIsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsS0FBSyxJQUFJLEtBQUssSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBRUY7SUFSRCxvQ0FRQzs7Ozs7O0lDOUJELE1BQWEsWUFBWTtRQUV2Qjs7V0FFRztRQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFVLEVBQUUsS0FBbUI7WUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUNkLE9BQU87WUFFVCx1RUFBdUU7WUFDdkUsc0VBQXNFO1lBQ3RFLCtCQUErQjtZQUMvQixvRUFBb0U7WUFDcEUsZ0NBQWdDO1lBQ2hDLElBQUksR0FBRyxHQUFHLFdBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3BELElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN4QyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPO2FBQ1I7WUFDRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDcEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pELEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuRCxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pGLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEYsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO1lBQzNELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBR0QsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXRDLENBQUM7S0FDRjtJQXZDRCxvQ0F1Q0M7Ozs7OztJQzFDRCxNQUFhLFdBQVc7UUFDdEIsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU87WUFHbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPO1lBRW5CLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsQ0FBQztLQUNGO0lBYkQsa0NBYUM7Ozs7OztJQ1ZELFNBQVMsV0FBVyxDQUFDLElBQVUsRUFBRSxJQUFpQixFQUFFLEtBQWE7UUFDL0QsSUFBSSxDQUFDLElBQUk7WUFDUCxPQUFPO1FBRVQsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ1gscUJBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO2FBQ0k7WUFDSCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2pDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDWCxxQkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEtBQUssTUFBTSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUVILENBQUM7SUFHRCxNQUFhLGtCQUFrQjtRQUM3QixZQUFtQixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFJLENBQUM7UUFFckMsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksTUFBTSxHQUFHLCtCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDcEMscUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLElBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBWkQsZ0RBWUM7SUFFRCxNQUFhLGtCQUFrQjtRQUM3QixZQUFtQixLQUFjO1lBQWQsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUFJLENBQUM7UUFFdEMsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFZO1lBQzlCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtnQkFDVixJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUN6QixXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLE9BQU87YUFDUjtZQUVELElBQUksTUFBTSxHQUFHLCtCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDcEMscUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLElBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBcEJELGdEQW9CQzs7Ozs7O0lDdERELE1BQWEscUJBQXFCO1FBQ2hDLFlBQW1CLEtBR2xCO1lBSGtCLFVBQUssR0FBTCxLQUFLLENBR3ZCO1FBQUksQ0FBQztRQUVOLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBWTtZQUM5QixJQUFJLE1BQU0sR0FBRywrQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLElBQUksZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3JFLElBQUksZ0JBQWdCLEtBQUssTUFBTTtvQkFBRSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZELGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLEdBQUcsY0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEgsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0Y7SUFoQkQsc0RBZ0JDOzs7Ozs7SUNqQkQsTUFBYSxXQUFXO1FBQ3RCLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBWTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQ0Y7SUFMRCxrQ0FLQztJQUVELE1BQWEsa0JBQWtCO1FBQzdCLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBWTtZQUM5QixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3pDLElBQUksRUFBQyxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDNUQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMseURBQXlEO1FBQzNELENBQUM7S0FDRjtJQVBELGdEQU9DOzs7Ozs7SUNmRCxNQUFhLGFBQWE7UUFFaEIsT0FBTyxDQUFDLE9BQXVCO1lBQ3JDLElBQUksQ0FBQyxPQUFPO2dCQUNWLE9BQU8sS0FBSyxDQUFDO1lBQ2YsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlGLENBQUM7UUFFTyxpQkFBaUI7WUFDdkIsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQW1DLENBQUM7WUFDaEUsSUFBSSxDQUFDLFlBQVk7Z0JBQ2YsT0FBTztZQUNULE9BQU8sWUFBWSxFQUFFO2dCQUNuQixZQUFZLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFlBQVk7b0JBQ2YsT0FBTztnQkFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQzlCLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckIsT0FBTztpQkFDUjthQUNGO1FBQ0gsQ0FBQztRQUVELE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBWTtZQUM5QixxQkFBcUI7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQ0Y7SUE1QkQsc0NBNEJDOzs7Ozs7SUMzQkQsTUFBYSxxQkFBcUI7UUFFOUIsWUFBbUIsS0FBYTtZQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDaEMsQ0FBQztRQUVELE9BQU8sQ0FBQyxPQUF1QjtZQUMzQixJQUFJLENBQUMsT0FBTztnQkFDUixPQUFPLEtBQUssQ0FBQztZQUNqQixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRCxPQUFPLENBQUMsSUFBVSxFQUFFLElBQXlCO1lBQ3pDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUE0QixDQUFDO1lBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUN2QyxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3hELENBQUM7S0FDSjtJQWpCRCxzREFpQkM7Ozs7Ozs7Ozs7SUVoQkQsTUFBYSxpQkFBaUI7UUFBOUI7WUFDVSx1QkFBa0IsR0FBRyxFQUFFLENBQUM7WUFDaEMsK0JBQStCO1lBQ3ZCLFdBQU0sR0FBRyx3REFBd0QsQ0FBQztZQUNsRSxvQkFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQXNCLENBQUM7WUFDbkYsa0JBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFzQixDQUFDO1lBQy9FLFVBQUssR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFvRDVCLENBQUM7UUFuREMsS0FBSyxDQUFDLGdCQUFnQjtZQUNwQix5Q0FBeUM7WUFDekMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLG1CQUFtQixHQUFHLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDaEUsSUFBSSxXQUFXLEdBR1gsTUFBTSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQyxJQUFJLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNPLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFHeEI7WUFDQyxPQUFPLElBQUksT0FBTyxDQUFNLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO29CQUN4QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtpQkFDbkIsQ0FBQyxDQUFDO2dCQUNILG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN4RSxvQ0FBb0M7Z0JBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ08sa0JBQWtCLENBQUMsVUFBbUI7WUFDNUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDM0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7aUJBQ0k7Z0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzthQUMzQztRQUNILENBQUM7UUFDTyxlQUFlO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUNPLGtCQUFrQjtZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pDLENBQUM7S0FDRjtJQTFERCw4Q0EwREM7Ozs7Ozs7Ozs7SUV2REQsTUFBYSxZQUFZO1FBRXZCLEtBQUssQ0FBQyxTQUFTO1lBQ2IsSUFBSSxNQUFNLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDaEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUc7Z0JBQ3JCLE1BQU0sV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUE0QixDQUFDO1lBQ3RELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDO2dCQUMzRixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRztvQkFDckIsTUFBTSxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUM7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFrQjtZQUMvQixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEYsSUFBSSxFQUFDLFVBQVUsRUFBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtnQkFDaEMsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7Z0JBQ3RILFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQztRQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBbUI7WUFDaEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMzRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBb0IsQ0FBQztRQUMxQyxDQUFDO0tBQ0Y7SUFsQ0Qsb0NBa0NDOzs7Ozs7SUNwQ0QsTUFBYSxpQkFBaUI7UUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBeUI7WUFDL0MsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLE9BQU87YUFDVjtZQUNELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFVLEVBQUUsVUFBMEI7WUFDbkQsSUFBSSxNQUFNLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFDaEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQWdCLENBQUM7WUFDaEUsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksVUFBVTtvQkFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixLQUFLLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzNCLElBQUksS0FBSyxHQUFHLElBQUksdUNBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN4QixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3pCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO0tBQ0o7SUE1QkQsOENBNEJDOzs7Ozs7SUM5QkQ7OztPQUdHO0lBQ0gsTUFBYSxhQUFhO1FBRXRCLE1BQU0sQ0FBQyxPQUFhO1lBQ2hCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JDLDZDQUE2QztnQkFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ2xFO2dCQUNELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxXQUFDLE9BQUEsSUFBSSxZQUFLLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLDBDQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUMsQ0FBQSxFQUFBLENBQXVCLENBQUM7Z0JBQ3pHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBRUo7SUFkRCxzQ0FjQzs7Ozs7O0lDakJEOzs7T0FHRztJQUNILE1BQWEsb0JBQW9CO1FBRTdCLFlBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDbkMsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFhO1lBQ2hCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDNUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFO2dCQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQTtRQUNMLENBQUM7S0FDSjtJQVpELG9EQVlDOzs7Ozs7SUNkRDs7O09BR0c7SUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFVLEVBQUUsS0FBbUIsRUFBRSxLQUFhO1FBQzlELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUk7WUFDTCxPQUFPO1FBRVgsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN6QyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ2pDLEtBQUssSUFBSSxJQUFJLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJO1lBQ0Qsb0NBQW9DO1lBQ3BDLDZCQUE2QjtZQUM3QixvQ0FBb0M7WUFDcEMsK0ZBQStGO1lBQy9GLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxnREFBZ0Q7WUFDaEQsbUVBQW1FO1lBQ25FLGtDQUFrQztZQUNsQyxxQkFBUyxDQUFDLElBQUksRUFBRSxTQUFTLGNBQWMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO1NBRWpFO0lBQ0wsQ0FBQztJQUVELE1BQWEsaUJBQWlCO1FBQzFCLFlBQW1CLEtBQWM7WUFBZCxVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQ2pDLENBQUM7UUFDRCxPQUFPLENBQUMsSUFBVSxFQUFFLElBQXlCO1lBQ3pDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUN6QixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO1lBRUQsSUFBSSxNQUFNLEdBQUcsK0JBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUNKO0lBbEJELDhDQWtCQztJQUVELE1BQWEsaUJBQWlCO1FBQzFCLFlBQW1CLEtBQWM7WUFBZCxVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQ2pDLENBQUM7UUFDRCxPQUFPLENBQUMsSUFBVSxFQUFFLElBQXlCO1lBQ3pDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUN6QixVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0IsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQzlCLElBQUksTUFBTSxHQUFHLCtCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQ0o7SUFwQkQsOENBb0JDOzs7Ozs7SUM5Q0QsdUJBQXVCO0lBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBZ0IsQ0FBQyxDQUFDO0lBQy9FLE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO0lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSw2QkFBYSxFQUFFLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksMkNBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUU1QyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxrQkFBVyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNsRSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSw2QkFBYSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN6RSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUU5RSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxzQ0FBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDNUYsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksc0NBQWlCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxzQ0FBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHNDQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRWhGLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDBDQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUUsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksMENBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDBDQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxRixnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSwwQ0FBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUUzRjs7Ozs7T0FLRztJQUNILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDN0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksNkNBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksNkNBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDNUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksNkNBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUUzRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx3Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzlHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHdDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzlHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHdDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzdHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHdDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFFNUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3pHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUgsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0gsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0gsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFNUgsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDNUgsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxD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QzNCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNaO0lBQ0wsQ0FBQztJQUVELEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIE9uZSBiaWcgaGFwcHkgZmFtaWx5IG9mIGNsYXNzZXMgdG8gYXZvaWQgbG9hZGluZ1xyXG4gKiBhbmQgY29uY2F0aW5hdGlvblxyXG4gKi9cclxuLyoqIEludGVyZmFjZXMgICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGljdGlvbmFyeTxUPiB7XHJcbiAgW0tleTogc3RyaW5nXTogVDtcclxufVxyXG4iLCJpbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL21vZGVscy9EaWN0aW9uYXJ5XCI7XHJcbi8qKlxyXG4gKiBHb29nbGUgc3BlZWNoIHJlY29nbml0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGlzdGVuZXIge1xyXG4gIHJlY29nbml0aW9uOiBTcGVlY2hSZWNvZ25pdGlvbjtcclxuICBzdG9wcGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICBhdXRvc3RhcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyAoPGFueT53aW5kb3cpW1wid2Via2l0U3BlZWNoUmVjb2duaXRpb25cIl0oKTtcclxuICAgIGxldCByZWNvZ25pdGlvbiA9IHRoaXMucmVjb2duaXRpb247XHJcbiAgICByZWNvZ25pdGlvbi5pbnRlcmltUmVzdWx0cyA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXRpb24uY29udGludW91cyA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXRpb24ubGFuZyA9IFwiZW4tUEhcIjtcclxuICAgIHJlY29nbml0aW9uLm1heEFsdGVybmF0aXZlcyA9IDU7XHJcbiAgICByZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKFwic3RhcnRcIiwgZSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICByZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZW5kXCIsIGUgPT4ge1xyXG4gICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMuYXV0b3N0YXJ0KVxyXG4gICAgICAgIHJlY29nbml0aW9uLnN0YXJ0KCk7XHJcbiAgICB9KTtcclxuICAgIHJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXN1bHRcIiwgZSA9PiB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZS5yZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGUucmVzdWx0c1tpXTtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRmluYWwpIHtcclxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2NyaXB0ID0gcmVzdWx0W2pdLnRyYW5zY3JpcHQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyYW5zY3JpcHQsIHJlc3VsdFtqXSk7XHJcbiAgICAgICAgICAgIGxldCBjb25maWRlbmNlID0gcmVzdWx0W2pdLmNvbmZpZGVuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInNwZWVjaC1kZXRlY3RlZFwiLCB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0OiB0cmFuc2NyaXB0LFxyXG4gICAgICAgICAgICAgIHBvd2VyOiBjb25maWRlbmNlICogMTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzOiBEaWN0aW9uYXJ5PEFycmF5PCh2YWx1ZToge1xyXG4gICAgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICBwb3dlcjogbnVtYmVyO1xyXG4gIH0pID0+IHZvaWQ+PiA9IHt9O1xyXG4gIHByaXZhdGUgY2FsbGJhY2tzKHRvcGljOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLl9jYWxsYmFja3NbdG9waWNdID0gdGhpcy5fY2FsbGJhY2tzW3RvcGljXSA/PyBbXTtcclxuICB9XHJcbiAgb24odG9waWM6IHN0cmluZywgY2I6ICh2YWx1ZToge1xyXG4gICAgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICBwb3dlcjogbnVtYmVyO1xyXG4gIH0pID0+IHZvaWQpIHtcclxuICAgIHRoaXMuY2FsbGJhY2tzKHRvcGljKS5wdXNoKGNiKTtcclxuICB9XHJcbiAgdHJpZ2dlcih0b3BpYzogc3RyaW5nLCB2YWx1ZToge1xyXG4gICAgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICBwb3dlcjogbnVtYmVyO1xyXG4gIH0pIHtcclxuICAgIHRoaXMuY2FsbGJhY2tzKHRvcGljKS5mb3JFYWNoKGNiID0+IGNiKHZhbHVlKSk7XHJcbiAgfVxyXG4gIGxpc3RlbigpIHtcclxuICAgIGlmICh0aGlzLnN0b3BwZWQpXHJcbiAgICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgbWVzc2FnZUR1cmF0aW9uID0gNTAwMDtcclxuY29uc3QgZmFkZURlbGF5ID0gMTUwMDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZhZGVPdXQobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZ29vZCwgYmFkKSA9PiB7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKFwiZmFkZS1vdXRcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBnb29kKG5vZGUpLCBmYWRlRGVsYXkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb2FzdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0YXJnZXQ6IEhUTUxFbGVtZW50KSB7IFxyXG4gICAgICAgIEFycmF5LmZyb20odGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9hc3RcIikpLm1hcCh0ID0+IHRoaXMuZGVzdHJveVRvYXN0KHQgYXMgSFRNTEVsZW1lbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdChtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZS1vdXRcIik7XHJcbiAgICAgICAgbGV0IHRvYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0b2FzdC5jbGFzc0xpc3QuYWRkKFwidG9hc3RcIik7XHJcbiAgICAgICAgdG9hc3QuaW5uZXJUZXh0ID0gbWVzc2FnZTtcclxuICAgICAgICB0aGlzLnRhcmdldC5pbnNlcnRCZWZvcmUodG9hc3QsIHRoaXMudGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGVzdHJveVRvYXN0KHRvYXN0KSwgbWVzc2FnZUR1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZXN0cm95VG9hc3QodG9hc3Q6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgYXdhaXQgZmFkZU91dCh0b2FzdCk7XHJcbiAgICAgICAgdG9hc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0XCIpKSBmYWRlT3V0KHRoaXMudGFyZ2V0KTtcclxuICAgIH1cclxufSIsIi8qKiBHbG9iYWwgRnVuY3Rpb25zICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0YWlsKHZhbHVlOiBzdHJpbmcpIHtcclxuICBsZXQgbGlzdCA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcclxuICBsaXN0LnNoaWZ0KCk7XHJcbiAgcmV0dXJuIGxpc3Quam9pbihcIiBcIik7XHJcbn1cclxuIiwiLyoqIEdsb2JhbCBDbGFzc2VzICovXHJcbi8qKlxyXG4gKiBUcnkgdG8gdHVybiBhIHNwb2tlbiBwaHJhc2UgaW50byBhIGNvbW1hbmQgZ3JhbW1hclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbW1hbmRQYXJzZXIge1xyXG4gIHBhcnNlUGhyYXNlKHBocmFzZTogc3RyaW5nKSB7XHJcbiAgICBwaHJhc2UgPSBwaHJhc2UudG9Mb3dlckNhc2UoKTtcclxuICAgIGxldCBtYXAgPSA8YW55PntcclxuICAgICAgXCJ6b29tIGluXCI6IFwiem9vbVwiLFxyXG4gICAgICBcInpvb20gb3V0XCI6IFwiem9vbVwiLFxyXG4gICAgICBcImRyYWdcIjogXCJwYW5cIixcclxuICAgICAgXCJudW1iZXIgZm9yXCI6IFwiNFwiLFxyXG4gICAgICBcIm51bWJlclwiOiBcIlwiLFxyXG4gICAgICBcImZyYW1lXCI6IFwiXCIsXHJcbiAgICAgIFwicGhvdG9cIjogXCJcIixcclxuICAgICAgXCJvbmVcIjogXCIxXCIsXHJcbiAgICAgIFwidHdvXCI6IFwiMlwiLFxyXG4gICAgICBcInRocmVlXCI6IFwiM1wiLFxyXG4gICAgICBcImZvdXJcIjogXCI0XCIsXHJcbiAgICAgIFwiZml2ZVwiOiBcIjVcIixcclxuICAgICAgXCJzaXhcIjogXCI2XCIsXHJcbiAgICAgIFwic2V2ZW5cIjogXCI3XCIsXHJcbiAgICAgIFwiZWlnaHRcIjogXCI4XCIsXHJcbiAgICAgIFwibmluZVwiOiBcIjlcIixcclxuICAgICAgXCJpbnRvXCI6IFwiXCIsXHJcbiAgICAgIFwib25cIjogXCJcIixcclxuICAgICAgXCJhbmRcIjogXCJcIixcclxuICAgICAgXCJwaWN0dXJlXCI6IFwiXCIsXHJcbiAgICAgIFwiZ28gdG9cIjogXCJnb3RvXCIsXHJcbiAgICAgIFwiLVwiOiBcIiBcIixcclxuICAgIH07XHJcbiAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2godiA9PiBwaHJhc2UgPSBwaHJhc2UucmVwbGFjZSh2LCBtYXBbdl0pKTtcclxuICAgIGxldCB0b2tlbnMgPSBwaHJhc2Uuc3BsaXQoXCIgXCIpO1xyXG4gICAgdG9rZW5zID0gdG9rZW5zLm1hcCh2ID0+IG1hcFt2XSA/PyB2KS5maWx0ZXIodiA9PiAhIXYpO1xyXG4gICAgcmV0dXJuIHRva2Vucy5qb2luKFwiIFwiKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEtlZXBzIHRoZSBnb29nbGUgbWVkaWEgaW5mbyBhbmQgaGFzIGhlbHBlciBmdW5jdGlvbnNcclxuICogdG8gdXBncmFkZSB0aGUgbG8tcmVzIHRvIGhpLXJlcyB2ZXJzaW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29sbGFnZVBob3RvPFRNZWRpYUluZm8+IHtcclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEdvb2dsZU1lZGlhSXRlbSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHByb2R1Y3RVcmw6IHN0cmluZztcclxuICBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgbWltZVR5cGU6IHN0cmluZztcclxuICBtZWRpYU1ldGFkYXRhOiBhbnk7XHJcbiAgY29udHJpYnV0b3JJbmZvOiBhbnk7XHJcbiAgZmlsZW5hbWU6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi9Db2xsYWdlUGhvdG9cIjtcclxuaW1wb3J0IHsgR29vZ2xlTWVkaWFJdGVtIH0gZnJvbSBcIi4uL21vZGVscy9Hb29nbGVNZWRpYUl0ZW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVDb2xsYWdlUGhvdG8gZXh0ZW5kcyBDb2xsYWdlUGhvdG88R29vZ2xlTWVkaWFJdGVtPiB7XHJcbiAgcHVibGljIGltZzogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZWRpYUluZm86IEdvb2dsZU1lZGlhSXRlbSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGxldCBpbWcgPSB0aGlzLmltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpbWcuY2xhc3NMaXN0LmFkZChcImltZ1wiKTtcclxuICAgIGltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7dGhpcy5tZWRpYUluZm8uYmFzZVVybH0pYDtcclxuICAgIGltZy50aXRsZSA9IG1lZGlhSW5mby5maWxlbmFtZTtcclxuICB9XHJcbiAgXHJcbiAgcmVuZGVySW50byh0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5pbWcpO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gbmV3IEdvb2dsZUNvbGxhZ2VQaG90byhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubWVkaWFJbmZvKSkpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogTWFuYWdlcyBpbWFnZSBzdHlsZS50cmFuc2Zvcm0gYnkgcGVyc2lzdGluZ1xyXG4gKiB0aGUgc2NhbGUgYW5kIHJvdGF0aW9uIHRvIGZhY2lsaXRhdGUgY29tcHV0aW5nIHRyYW5zZm9ybXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUge1xyXG4gIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgcHVibGljIHk6IG51bWJlcjtcclxuICBwdWJsaWMgcjogbnVtYmVyO1xyXG4gIHB1YmxpYyBzOiBudW1iZXI7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcbiAgICB0aGlzLnggPSB0aGlzLnkgPSB0aGlzLnIgPSAwO1xyXG4gICAgdGhpcy5zID0gMTtcclxuICB9XHJcbiAgdHJhbnNmb3JtKGFyZ3M6IHtcclxuICAgIGR4PzogbnVtYmVyO1xyXG4gICAgZHk/OiBudW1iZXI7XHJcbiAgICBzY2FsZT86IG51bWJlcjtcclxuICAgIGFuZ2xlPzogbnVtYmVyO1xyXG4gIH0pIHtcclxuICAgIHRoaXMueCArPSAoYXJncy5keCB8fCAwKTtcclxuICAgIHRoaXMueSArPSAoYXJncy5keSB8fCAwKTtcclxuICAgIHRoaXMuciArPSAoYXJncy5hbmdsZSB8fCAwKTtcclxuICAgIHRoaXMucyAqPSAoYXJncy5zY2FsZSB8fCAxLjApO1xyXG4gICAgdGhpcy5pbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54fXB4LCR7dGhpcy55fXB4KSByb3RhdGUoJHt0aGlzLnJ9ZGVnKSBzY2FsZSgke3RoaXMuc30pYDtcclxuICB9XHJcbiAgdHJhbnNsYXRlKGR4OiBudW1iZXIsIGR5OiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IGR4LCBkeSB9KTtcclxuICB9XHJcbiAgcm90YXRlKGFuZ2xlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IGFuZ2xlIH0pO1xyXG4gIH1cclxuICBzY2FsZShzY2FsZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyBzY2FsZSB9KTtcclxuICB9XHJcbiAgLy8gbW9kaWZ5IHRoZSBwaXhlbCBkZW5zaXR5IG9mIHRoZSBpbWFnZVxyXG4gIC8vIHVzZWZ1bCB3aGVuIHVzaW5nIGdvb2dsZSBwaG90b3MgQVBJIHRvIFxyXG4gIC8vIHJlcXVlc3QgaGlnaGVyIHJlc29sdXRpb24gcGhvdG9zXHJcbiAgdXBzY2FsZShzY2FsZTogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuaW1hZ2UpO1xyXG4gICAgbGV0IHdpZHRoID0gcGFyc2VGbG9hdChzdHlsZS53aWR0aCk7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcGFyc2VGbG9hdChzdHlsZS5oZWlnaHQpO1xyXG4gICAgdGhpcy5zY2FsZSgxIC8gc2NhbGUpO1xyXG4gICAgdGhpcy5pbWFnZS5zdHlsZS53aWR0aCA9IHNjYWxlICogd2lkdGggKyBcInB4XCI7XHJcbiAgICB0aGlzLmltYWdlLnN0eWxlLmhlaWdodCA9IHNjYWxlICogaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgdGhpcy50cmFuc2xhdGUod2lkdGggLyAyIC0gd2lkdGggKiBzY2FsZSAvIDIsIGhlaWdodCAvIDIgLSBoZWlnaHQgKiBzY2FsZSAvIDIpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vU3ByaXRlXCI7XHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgYSBzaW5nbGUgaW1hZ2Ugb24gdGhlIGNvbGxhZ2UsIFxyXG4gKiBub3QgdG8gYmUgY29uZnVzZWQgd2l0aCBhbiBQaG90byBvbiB0aGUgYWxidW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2xsYWdlUGFuZWwge1xyXG5cclxuICAvKipcclxuICAgKiBBIHBhbmVsIGNvbnRhaW5zIGEgc2luZ2xlIHBob3RvICh0aGlzIG9uZSlcclxuICAgKi9cclxuICBwdWJsaWMgcGhvdG86IEdvb2dsZUNvbGxhZ2VQaG90byB8IG51bGw7XHJcblxyXG4gIC8vIHRoZSBhY3R1YWwgaW1hZ2UgcmVuZGVyZWQgb24gdGhlIHBhbmVsXHJcbiAgcHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHB1YmxpYyBzcHJpdGU6IFNwcml0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHBhbmVsIGRvbSBlbGVtZW50IHRvIGNvbnRyb2xcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFuZWw6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICB0aGlzLnBob3RvID0gbnVsbDtcclxuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKHRoaXMuaW1hZ2UpO1xyXG4gICAgdGhpcy5pbWFnZS5jbGFzc0xpc3QuYWRkKFwiaW1nXCIpO1xyXG4gICAgdGhpcy5pbWFnZS5kcmFnZ2FibGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XHJcbiAgICB0aGlzLmFzUGFuZWwodGhpcy5wYW5lbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gcGhvdG8gcmVuZGVycyB0aGlzIHBob3RvIG9udG8gdGhlIHBhbmVsXHJcbiAgICovXHJcbiAgYWRkUGhvdG8ocGhvdG86IEdvb2dsZUNvbGxhZ2VQaG90bykge1xyXG4gICAgdGhpcy5waG90byA9IHBob3RvO1xyXG4gICAgdGhpcy5zZXRCYWNrZ3JvdW5kSW1hZ2UocGhvdG8ubWVkaWFJbmZvLmJhc2VVcmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29tcHV0ZXMgdGhlIHdpZHRoIG9mIHRoZSBwaG90byBkaXNwbGF5IGFyZWFcclxuICAgKi9cclxuICBnZXQgcGhvdG9XaWR0aCgpIHtcclxuICAgIHJldHVybiBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmltYWdlKS53aWR0aCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb21wdXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBwaG90byBkaXNwbGF5IGFyZWFcclxuICAgKi9cclxuICBnZXQgcGhvdG9IZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5pbWFnZSkuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbXB1dGVzIHRoZSBzY2FsZSBvZiB0aGUgcGhvdG8sIGFzc3VtZXMgYXNwZWN0IHJhdGlvIGlzIHByZXNlcnZlZCAoYXQgbGVhc3QgdGhlIHdpZHRoIG9yIGhlaWdodCBpcyAnYXV0bycpXHJcbiAgICovXHJcbiAgZ2V0IHBob3RvU2NhbGUoKSB7XHJcbiAgICBsZXQgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmltYWdlKTtcclxuICAgIGxldCBzY2FsZSA9IHN0eWxlLmhlaWdodDtcclxuICAgIGlmIChzY2FsZSA9PT0gXCJhdXRvXCIpIHJldHVybiAxLjA7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzY2FsZSkgLyAxMDAuMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybiB0aGUgcGFuZWwgb3ZlcmxheSAoZG9lcyBub3QgYmVsb25nIGhlcmUpXHJcbiAgICovXHJcbiAgZ2V0IG92ZXJsYXkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIHRleHQgYXMgYW4gaW5wdXQgY29udHJvbCBvbiB0aGUgcGFuZWxcclxuICAgKiBMYWJlbCBpcyBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgYW5kIGNhbiBtb3ZlIG91dHNpZGUgdGhlIGJvdW5kcyBvZiB0aGlzIHBhbmVsXHJcbiAgICogc28gcHJvYmFibHkgZG9lc24ndCBiZWxvbmcgaGVyZVxyXG4gICAqL1xyXG4gIHNldCB0ZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGxldCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgIGxhYmVsLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgIGxhYmVsLnRpdGxlID0gXCIxXCI7XHJcbiAgICBsYWJlbC5zdHlsZS50b3AgPSBsYWJlbC5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcbiAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKFwibGFiZWxcIik7XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIGxhYmVsLnZhbHVlID0gdmFsdWU7XHJcbiAgICBnbG9iYWxzLmRuZC5tb3ZlYWJsZShsYWJlbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIHBhbmVsIGZyb20gdGhlIGRvbVxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnBhbmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0gYmFja2dyb3VuZEltYWdlIHRoZSB1cmwgb2YgdGhlIGltYWdlIHRvIGRpc3BsYXkgaW4gdGhpcyBwYW5lbFxyXG4gKi9cclxuICBzZXRCYWNrZ3JvdW5kSW1hZ2UoYmFja2dyb3VuZEltYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuaW1hZ2Uuc3JjID0gYmFja2dyb3VuZEltYWdlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3R5bGUgdGhlIGZyYW1lXHJcbiAgICogQHBhcmFtIHdpZHRoIGJvcmRlciB3aWR0aCBpbiBcImVtXCJcclxuICAgKi9cclxuICBib3JkZXIod2lkdGg6IHN0cmluZywgY29sb3IgPSBcIndoaXRlXCIpIHtcclxuICAgIHRoaXMucGFuZWwuc3R5bGUuYm9yZGVyID0gYCR7d2lkdGh9ZW0gc29saWQgJHtjb2xvcn1gO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSb3RhdGUgdGhlIGFjdHVhbCBmcmFtZVxyXG4gICogQHBhcmFtIGFuZ2xlIGFuZ2xlIGluIGRlZ3JlZXNcclxuICAqL1xyXG4gIHJvdGF0ZUZyYW1lKGFuZ2xlOiBzdHJpbmcpIHtcclxuICAgIGxldCBub2RlID0gdGhpcy5wYW5lbDtcclxuICAgIGlmICghbm9kZSlcclxuICAgICAgcmV0dXJuO1xyXG4gICAgaWYgKCEhYW5nbGUpIHtcclxuICAgICAgdGhpcy50cmFuc2Zvcm1fbm9kZShgcm90YXRlKCR7YW5nbGV9ZGVnKWApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBhbmdsZSA9IDA7XHJcbiAgICAgIGxldCB0cmFuc2Zvcm0gPSBub2RlLnN0eWxlLnRyYW5zZm9ybTtcclxuICAgICAgbGV0IGFuaW1hdGlvbnMgPSBnbG9iYWxzLnJlcGwuYW5pbWF0aW9ucztcclxuICAgICAgYW5pbWF0aW9ucy5hbmltYXRlKFwicm90YXRlXCIsICgpID0+IHtcclxuICAgICAgICBhbmdsZSArPSAxO1xyXG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtICsgYCByb3RhdGUoJHthbmdsZX1kZWcpYDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzY2FsZUZyYW1lKHNjYWxlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudHJhbnNmb3JtX25vZGUoYHNjYWxlKCR7c2NhbGV9LCAke3NjYWxlfSlgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtX25vZGUodjogc3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IHRoaXMucGFuZWw7XHJcbiAgICBsZXQgdHJhbnNmb3JtID0gKG5vZGUuc3R5bGUudHJhbnNmb3JtIHx8IFwiXCIpLnNwbGl0KFwiIFwiKTtcclxuICAgIHRyYW5zZm9ybS51bnNoaWZ0KHYpO1xyXG4gICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm0uam9pbihcIiBcIik7XHJcbiAgfVxyXG4gIHByaXZhdGUgYXNQYW5lbChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGFuZWxcIik7XHJcbiAgICBlbGVtZW50LnRhYkluZGV4ID0gMTtcclxuICAgIGxldCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIHJ1bnMgYW4gYW5pbWF0aW9uIG9uIGFuIGludGVydmFsLCByZXR1cm5zIHN0b3AoKVxyXG4gKiBVc2VkIGZvciBwYW5uaW5nLCB6b29taW5nLCByb3RhdGluZ1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbnMge1xyXG4gIGFuaW1hdGlvbnM6IEFycmF5PHtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIGhhbmRsZTogbnVtYmVyO1xyXG4gIH0+ID0gW107XHJcbiAgXHJcbiAgc3RvcCh0eXBlOiBzdHJpbmcpIHtcclxuICAgIGxldCBhbmltYXRpb25zID0gdGhpcy5hbmltYXRpb25zLm1hcCh2ID0+IHYpOyAvL2Nsb25lXHJcbiAgICBhbmltYXRpb25zLmZvckVhY2goKHYsIGkpID0+IHtcclxuICAgICAgaWYgKCF0eXBlIHx8IHYudHlwZSA9PT0gdHlwZSkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodi5oYW5kbGUpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYW5pbWF0ZSh0eXBlOiBzdHJpbmcsIGNiOiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLmFuaW1hdGlvbnMucHVzaCh7IHR5cGUsIGhhbmRsZTogc2V0SW50ZXJ2YWwoY2IsIDEwMCkgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZCB7XHJcbiAgLy8gcmV0dXJuIGZhbHNlIHRvIHNpZ25hbCB0aGUgY29tbWFuZCB3YXMgbm90IGhhbmRsZWRcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcpOiB2b2lkIHwgZmFsc2UgfCBQcm9taXNlPHZvaWQgfCBmYWxzZT47XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tIFwiLi4vbW9kZWxzL0RpY3Rpb25hcnlcIjtcclxuXHJcbi8qKlxyXG4gKiBLZWVwcyBoYXNoIG9mIGNvbW1hbmRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tbWFuZHMge1xyXG5cclxuICAgIHByaXZhdGUgY29tbWFuZHM6IERpY3Rpb25hcnk8Q29tbWFuZD4gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIHRoZSBjb21tYW5kIGFzc29jaWF0ZWQgd2l0aCB0aGUgYWN0aW9uIGtleXdvcmRcclxuICAgICAqIEBwYXJhbSB2ZXJiIHRoZSBmdWxsIG5hbWUgb2YgdGhlIGFjdGlvbiBrZXl3b3JkIG9yIGEgcGFydGlhbCBtYXRjaFxyXG4gICAgICovXHJcbiAgICBnZXQodmVyYjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tbWFuZHNbdmVyYl0pIHJldHVybiB0aGlzLmNvbW1hbmRzW3ZlcmJdO1xyXG4gICAgICAgIHZhciBrZXkgPSBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKS5maW5kKHYgPT4gdi5zdGFydHNXaXRoKHZlcmIpKTtcclxuICAgICAgICByZXR1cm4ga2V5ICYmIHRoaXMuY29tbWFuZHNba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMvcmVwbGFjZXMgY29tbWFuZCBhc3NvY2lhdGVkIHdpdGggYW4gYWN0aW9uIGtleXdvcmRcclxuICAgICAqIEBwYXJhbSBjb21tYW5kIGNvbW1hbmQgdG8gcHJvY2VzcyB0aGUgYWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gdmVyYiBhY3Rpb24gdG8gYXNzb2NpYXRlIHdpdGggYSBjb21tYW5kXHJcbiAgICAgKi9cclxuICAgIGFkZChjb21tYW5kOiBDb21tYW5kLCB2ZXJiOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbW1hbmRzW3ZlcmJdID0gY29tbWFuZDtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0KCkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5jb21tYW5kcyk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVPdmVybGF5KCkge1xyXG4gIGxldCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgaWYgKCFhY3RpdmVQYW5lbCkge1xyXG4gICAgY29uc29sZS5sb2coXCJubyBhY3RpdmUgcGFuZWxcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHJldHVybiBhY3RpdmVQYW5lbC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIikgYXMgSFRNTEVsZW1lbnQ7XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBLZXlib2FyZEhhbmRsZXIge1xyXG4gIGFsdEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBjdHJsS2V5OiBib29sZWFuO1xyXG4gIGtleTogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVyIH0gZnJvbSBcIi4uL21vZGVscy9LZXlib2FyZEhhbmRsZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEhhbmRsZXJzIHtcclxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcnM6IEFycmF5PHttYXRjaDogS2V5Ym9hcmRIYW5kbGVyOyBjb21tYW5kOiBDb21tYW5kfT4gPSBbXTtcclxuXHJcbiAgZ2V0RXZlbnRIYW5kbGVycyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5maWx0ZXIoaGFuZGxlciA9PiB7XHJcbiAgICAgIGxldCBtYXRjaCA9IGhhbmRsZXIubWF0Y2g7XHJcbiAgICAgIGlmIChldmVudC5hbHRLZXkgIT09IG1hdGNoLmFsdEtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgIT09IG1hdGNoLnNoaWZ0S2V5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChldmVudC5jdHJsS2V5ICE9PSBtYXRjaC5jdHJsS2V5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmICghIW1hdGNoLmtleSAmJiBldmVudC5rZXkgIT09IG1hdGNoLmtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkRXZlbnRIYW5kbGVyKGNvbW1hbmQ6IENvbW1hbmQsIG1hdGNoOiBQYXJ0aWFsPEtleWJvYXJkSGFuZGxlcj4pIHtcclxuICAgIGxldCBmdWxsTWF0Y2g6IEtleWJvYXJkSGFuZGxlciA9IHtcclxuICAgICAgYWx0S2V5OiBtYXRjaC5hbHRLZXkgPz8gZmFsc2UsXHJcbiAgICAgIGN0cmxLZXk6IG1hdGNoLmN0cmxLZXkgPz8gZmFsc2UsXHJcbiAgICAgIHNoaWZ0S2V5OiBtYXRjaC5zaGlmdEtleSA/PyBmYWxzZSxcclxuICAgICAga2V5OiBtYXRjaC5rZXkgPz8gXCJcIlxyXG4gICAgfTtcclxuICAgIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5wdXNoKHttYXRjaDogZnVsbE1hdGNoLCBjb21tYW5kfSk7XHJcbiAgfVxyXG5cclxuICBsaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5tYXAoaCA9PiBKU09OLnN0cmluZ2lmeShoLm1hdGNoKSk7XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtKG5vZGU6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgbGV0IHQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS50cmFuc2Zvcm07XHJcbiAgdCA9ICh0ID09PSBcIm5vbmVcIikgPyBcIlwiIDogdCArIFwiIFwiO1xyXG4gIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gdCArIHZhbHVlO1xyXG59XHJcblxyXG4iLCJleHBvcnQgZnVuY3Rpb24gYmJveChub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgcmV0dXJuIHsgdG9wOiBwYXJzZUZsb2F0KHRvcCksIGxlZnQ6IHBhcnNlRmxvYXQobGVmdCksIHdpZHRoOiBwYXJzZUZsb2F0KHdpZHRoKSwgaGVpZ2h0OiBwYXJzZUZsb2F0KGhlaWdodCkgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBnZXRBY3RpdmVPdmVybGF5IH0gZnJvbSBcIi4uL2Z1bi9nZXRBY3RpdmVPdmVybGF5XCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4vUmVwbFwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZEhhbmRsZXJzIH0gZnJvbSBcIi4vS2V5Ym9hcmRIYW5kbGVyc1wiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi4vZnVuL3RyYW5zZm9ybVwiO1xyXG5pbXBvcnQgeyBiYm94IH0gZnJvbSBcIi4uL2Z1bi9iYm94XCI7XHJcblxyXG4vKipcclxuICogbWFuYWdlcyB1c2VyIGludGVyYWN0aW9ucyBmb3Iga2V5Ym9hcmQgc2hvcnRjdXRzLCB3aGVlbCwgZHJhZywgY2xpY2sgZXZlbnRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3Age1xyXG4gIHByaXZhdGUgc291cmNlOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVwbDogUmVwbCwgcHVibGljIGtleWRvd25IYW5kbGVyczogS2V5Ym9hcmRIYW5kbGVycykge1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBzb3VyY2UgPSBnZXRBY3RpdmVPdmVybGF5KCk7XHJcbiAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJubyBhY3RpdmUgb3ZlcmxheSBmb3VuZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy8gVE9ETyB3b3VsZCBiZSBuaWNlIHRvIG9ubHkgcGVyZm9ybSB3aGVuIG1vdXNlIGlzIG92ZXIgdGhlIGVsZW1lbnRcclxuICAgICAgLy8gZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoZXZlbnQuc2NyZWVuWCwgZXZlbnQuc2NyZWVuWSk7XHJcbiAgICAgIGxldCBmcm9tID0gc291cmNlLmlubmVySFRNTDtcclxuICAgICAgLy8gLTE1MCA9PiAwLjksIDE1MCA9PiAxLjEsIHNvXHJcbiAgICAgIGxldCBkZWx0YSA9IDEgKyBldmVudC5kZWx0YVkgLyAxNTAwO1xyXG4gICAgICByZXBsLmV4ZWN1dGVDb21tYW5kKGB6b29tICR7ZnJvbX0gJHtkZWx0YX1gKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XHJcblxyXG4gICAgICBpZiAodGhpcy5rZXlkb3duSGFuZGxlcnMuZ2V0RXZlbnRIYW5kbGVycyhldmVudCkuc29tZShoYW5kbGVyID0+IHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgIT09IGhhbmRsZXIuY29tbWFuZC5leGVjdXRlKHJlcGwpO1xyXG4gICAgICB9KSkge1xyXG4gICAgICAgIC8vIGhhbmRsZWRcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlIHRoZSBiYWNrZ3JvdW5kIGltYWdlIG9uIHRoZSBwYW5lbFxyXG4gICAqIEBwYXJhbSBwYW5lbCBJbnZva2UgcGFuIG9uIHRoZSBwYW5lbCBzbyB0aGF0IGl0IGZvbGxvd3MgdGhlIG1vdXNlXHJcbiAgICovXHJcbiAgcGFuYWJsZShwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgZHJhZ2dhYmxlID0gcGFuZWwuaW1hZ2U7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IFswLCAwXTtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG5cclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZXZlbnQgPT4ge1xyXG4gICAgICBsZXQgbGVmdCA9IHBhcnNlRmxvYXQoZHJhZ2dhYmxlLnN0eWxlLmxlZnQgfHwgXCIwXCIpO1xyXG4gICAgICBsZXQgdG9wID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUudG9wIHx8IFwiMFwiKTtcclxuICAgICAgc3RhcnRQb3NpdGlvbiA9IFtsZWZ0IC0gZXZlbnQuc2NyZWVuWCwgdG9wIC0gZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHBvaW50ZXJtb3ZlKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBldmVudCA9PiB7XHJcbiAgICAgIGRyYWdnYWJsZS5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGxldCBib3ggPSBiYm94KGRyYWdnYWJsZSk7XHJcbiAgICAgIGxldCByZWN0ID0gZHJhZ2dhYmxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyAgICAgIFxyXG4gICAgICBsZXQgc2NhbGUgPSByZWN0LndpZHRoIC8gYm94LndpZHRoO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUudG9wID0gZHJhZ2dhYmxlLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG4gICAgICB0cmFuc2Zvcm0oZHJhZ2dhYmxlLCBgdHJhbnNsYXRlKCR7Ym94LmxlZnQgLyBzY2FsZX1weCwgJHtib3gudG9wIC8gc2NhbGV9cHgpYCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBvaW50ZXJtb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBbeCwgeV0gPSBbc3RhcnRQb3NpdGlvblswXSArIGV2ZW50LnNjcmVlblgsIHN0YXJ0UG9zaXRpb25bMV0gKyBldmVudC5zY3JlZW5ZXTtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLmxlZnQgPSBgJHt4fXB4YDtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IGAke3l9cHhgO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBtb3ZlYWJsZShkcmFnZ2FibGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IFswLCAwXTtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG5cclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZXZlbnQgPT4ge1xyXG4gICAgICBsZXQgdG9wID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUudG9wKTtcclxuICAgICAgbGV0IGxlZnQgPSBwYXJzZUZsb2F0KGRyYWdnYWJsZS5zdHlsZS5sZWZ0KTtcclxuICAgICAgc3RhcnRQb3NpdGlvbiA9IFtsZWZ0IC0gZXZlbnQuc2NyZWVuWCwgdG9wIC0gZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHBvaW50ZXJtb3ZlKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBldmVudCA9PiB7XHJcbiAgICAgIGRyYWdnYWJsZS5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBvaW50ZXJtb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBbbGVmdCwgdG9wXSA9IFtzdGFydFBvc2l0aW9uWzBdICsgZXZlbnQuc2NyZWVuWCwgc3RhcnRQb3NpdGlvblsxXSArIGV2ZW50LnNjcmVlblldO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUubGVmdCA9IGxlZnQgKyBcInB4XCI7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYW4gZWxlbWVudCBhIGRyYWcgc291cmNlXHJcbiAgICogQHBhcmFtIGRpdiBlbGVtZW50IHRvIG1ha2UgZHJhZ2dhYmxlXHJcbiAgICovXHJcbiAgZHJhZ2dhYmxlKGRyYWdnYWJsZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG4gICAgZHJhZ2dhYmxlLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBldmVudCA9PiB0aGlzLm9uZHJhZ3N0YXJ0KGRyYWdnYWJsZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbiBlbGVtZW50IGEgZHJvcCB0YXJnZXRcclxuICAgKiBAcGFyYW0gdGFyZ2V0IGVsZW1lbnQgdG8gbWFrZSBpbnRvIGEgZHJvcCB0YXJnZXQgKGRyYWdnYWJsZSBhcmUgZHJvcHBhYmxlLCBiYWQgbmFtZSlcclxuICAgKi9cclxuICBkcm9wcGFibGUodGFyZ2V0OiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnNvdXJjZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMub25kcmFnb3Zlcih0YXJnZXQsIHRoaXMuc291cmNlKTtcclxuICAgIH0pO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuc291cmNlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5vbmRyb3AodGFyZ2V0LCB0aGlzLnNvdXJjZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNvdXJjZSBsaXN0ZW4gZm9yIHdoZWVsIGV2ZW50c1xyXG4gICAqL1xyXG4gIHpvb21hYmxlKHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICB9XHJcbiAgb25kcmFnc3RhcnQoc291cmNlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgfVxyXG5cclxuICBvbmRyYWdvdmVyKHRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8vIG5vdGhpbmcgdG8gZG8/XHJcbiAgfVxyXG5cclxuICBvbmRyb3AodGFyZ2V0OiBIVE1MRWxlbWVudCwgc291cmNlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IGZyb20gPSBzb3VyY2UuaW5uZXJIVE1MO1xyXG4gICAgbGV0IHRvID0gdGFyZ2V0LmlubmVySFRNTDtcclxuICAgIGxldCBjb21tYW5kID0gYG1vdmUgJHtmcm9tfSAke3RvfWA7XHJcbiAgICB0aGlzLnJlcGwuZXhlY3V0ZUNvbW1hbmQoY29tbWFuZCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgQmVoYXZpb3I8VD4ge1xyXG4gIGV4dGVuZChjb250cm9sOiBUKTogdm9pZDtcclxufVxyXG4iLCJpbXBvcnQgeyB0YWlsIH0gZnJvbSBcIi4uL2Z1bi90YWlsXCI7XHJcbmltcG9ydCB7IENvbW1hbmRQYXJzZXIgfSBmcm9tIFwiLi9Db21tYW5kUGFyc2VyXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyBHb29nbGVDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9ucyB9IGZyb20gXCIuL0FuaW1hdGlvbnNcIjtcclxuaW1wb3J0IHsgQ29tbWFuZHMgfSBmcm9tIFwiLi9Db21tYW5kc1wiO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcCB9IGZyb20gXCIuL0RyYWdBbmREcm9wXCI7XHJcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4uL21vZGVscy9CZWhhdmlvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlcGwge1xyXG5cclxuICAvLyBleHRlbnNpb24gcG9pbnQgZm9yIGJlaGF2aW9yc1xyXG4gIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHVibGljIHNvIHNwbGl0IGNvbW1hbmQgY2FuIG9wZXJhdGUgb24gdGhlbVxyXG4gIHB1YmxpYyBwYW5lbHM6IEFycmF5PENvbGxhZ2VQYW5lbD4gPSBbXTtcclxuICAvLyBwdWJsaWMgc28gb3BlbkFsYnVtcyBjb21tYW5kIGNhbiBvcGVyYXRpb24gb24gdGhlbVxyXG4gIHB1YmxpYyBwaG90b3M6IEFycmF5PEdvb2dsZUNvbGxhZ2VQaG90bz4gPSBbXTtcclxuICBwcml2YXRlIGNvbW1hbmRIaXN0b3J5OiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgcHJpdmF0ZSBjb21tYW5kSGlzdG9yeUluZGV4ID0gLTE7XHJcbiAgcHVibGljIGRuZDogRHJhZ0FuZERyb3AgfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMgYW5pbWF0aW9ucyA9IG5ldyBBbmltYXRpb25zKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21tYW5kczogQ29tbWFuZHMpIHtcclxuICAgIC8vIGNhbm5vdCBzZXQgZG5kIGJlY2F1c2UgZG5kIG5lZWRzIHJlcGwgKGZvciBub3cpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXNlKGJlaGF2aW9yOiBCZWhhdmlvcjxSZXBsPikge1xyXG4gICAgYmVoYXZpb3IuZXh0ZW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZXZhbChjb21tYW5kOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKGBleGVjdXRpbmc6ICR7Y29tbWFuZH1gKTtcclxuICAgIGxldCBbdmVyYl0gPSBjb21tYW5kLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBoYW5kbGVyID0gdGhpcy5jb21tYW5kcy5nZXQodmVyYik7XHJcbiAgICBpZiAoaGFuZGxlcikge1xyXG4gICAgICBhd2FpdCBoYW5kbGVyLmV4ZWN1dGUodGhpcywgdGFpbChjb21tYW5kKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHN3aXRjaCAodmVyYikge1xyXG4gICAgICBjYXNlIFwiZXhwb3J0XCI6XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGF3YWl0IHRoaXMuYXNDYW52YXMoKTtcclxuICAgICAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImV4cG9ydC1yZXN1bHRcIik7XHJcbiAgICAgICAgaW1nLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShpbWcsIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIGEgY2FudmFzIG9mIHRoZSBlbnRpcmUgY29sbGFnZVxyXG4gIGFzeW5jIGFzQ2FudmFzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEhUTUxDYW52YXNFbGVtZW50PigoZ29vZCwgYmFkKSA9PiB7XHJcbiAgICAgIGxldCBpbWFnZUNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FudmFzXCIpPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgaWYgKCFpbWFnZUNhbnZhcykgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlQ2FudmFzLndpZHRoO1xyXG4gICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2VDYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgaWYgKCFjdHgpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgIGxldCBwYW5lbHMgPSB0aGlzLnBhbmVscy5maWx0ZXIocCA9PiAwID09PSBnZXRDb21wdXRlZFN0eWxlKHAucGFuZWwpLmJhY2tncm91bmRJbWFnZS5pbmRleE9mKGB1cmwoXCJgKSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibG9hZGluZ1wiLCBwYW5lbHMubGVuZ3RoKTtcclxuICAgICAgcGFuZWxzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHAucGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJhbm9ueW1vdXNcIjtcclxuICAgICAgICBpbWcud2lkdGggPSBwb3Mud2lkdGg7XHJcbiAgICAgICAgaW1nLmhlaWdodCA9IHBvcy5oZWlnaHQ7XHJcbiAgICAgICAgaW1nLnN0eWxlLnRyYW5zZm9ybSA9IHAucGFuZWwuc3R5bGUudHJhbnNmb3JtO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgcG9zLngsIHBvcy55KTtcclxuICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRlZDpcIiwgY291bnQpO1xyXG4gICAgICAgICAgaWYgKGNvdW50ID09PSBwYW5lbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGdvb2QoY2FudmFzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIHN0cmlwIHVybChcIlwiKTtcclxuICAgICAgICBsZXQgdXJsID0gZ2V0Q29tcHV0ZWRTdHlsZShwLnBhbmVsKS5iYWNrZ3JvdW5kSW1hZ2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmxcIiwgdXJsKTtcclxuICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDUsIHVybC5sZW5ndGggLSAyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVybFwiLCB1cmwpO1xyXG4gICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb2xsYWdlT3ZlcmxheXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucGFuZWxbZGF0YS1pZF0gLm92ZXJsYXlgKSkgYXMgSFRNTEVsZW1lbnRbXTtcclxuICB9XHJcblxyXG4gIGdldFBob3RvT3ZlcmxheXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucGhvdG9zIC5pbWcgLm92ZXJsYXlbZGF0YS1pZF1gKSkgYXMgSFRNTEVsZW1lbnRbXTtcclxuICB9XHJcblxyXG4gIHNlbGVjdChpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RQYW5lbChpZCk/LnBhbmVsO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UGFuZWwoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMucGFuZWxzLmZpbmQocCA9PiBwLm92ZXJsYXkuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UGhvdG8oaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMucGhvdG9zW3BhcnNlSW50KGlkKSAtIDFdO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUGFuZWwocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYW5lbHMuaW5kZXhPZihwYW5lbCk7XHJcbiAgICBpZiAoLTEgPT09IGluZGV4KSB0aHJvdyBcInBhbmVsIG5vdCBmb3VuZFwiO1xyXG4gICAgdGhpcy5wYW5lbHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHBhbmVsLnBhbmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVpbmRleCgpIHtcclxuICAgIHRoaXMucGFuZWxzLmZpbHRlcihwID0+ICEhcD8ucGFuZWw/LnBhcmVudEVsZW1lbnQpLmZvckVhY2goKHAsIGkpID0+IHAub3ZlcmxheS5kYXRhc2V0LmlkID0gcC5vdmVybGF5LmlubmVyVGV4dCA9IGkgKyAxICsgXCJcIik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIHpvb20gYW5kIGRyYWcgY2FwYWJpbGl0aWVzIHRvIGEgcGFuZWxcclxuICAgKiBAcGFyYW0gcGFuZWwgbWFrZSB0aGlzIHBhbmVsIGludGVyYWN0aXZlXHJcbiAgICovXHJcbiAgYWRkQmVoYXZpb3JzKHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGxldCBvdmVybGF5ID0gcGFuZWwub3ZlcmxheTtcclxuICAgIGxldCBkbmQgPSB0aGlzLmRuZDtcclxuICAgIGlmIChkbmQpIHtcclxuICAgICAgZG5kLnpvb21hYmxlKG92ZXJsYXkpO1xyXG4gICAgICBkbmQuZHJhZ2dhYmxlKG92ZXJsYXkpO1xyXG4gICAgICBkbmQucGFuYWJsZShwYW5lbCk7XHJcbiAgICAgIGRuZC5kcm9wcGFibGUob3ZlcmxheSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWluZGV4UGhvdG9zKCkge1xyXG4gICAgdGhpcy5waG90b3MuZm9yRWFjaCgocGhvdG8sIGkpID0+IHtcclxuICAgICAgbGV0IHAgPSBwaG90by5pbWc7XHJcbiAgICAgIGxldCBvdmVybGF5ID0gcC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIikgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGlmICghb3ZlcmxheSkge1xyXG4gICAgICAgIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XHJcbiAgICAgICAgb3ZlcmxheS5kYXRhc2V0LmlkID0gb3ZlcmxheS5pbm5lclRleHQgPSAxICsgaSArIFwiXCI7XHJcbiAgICAgICAgcC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgICAgICB0aGlzLmRuZD8uZHJhZ2dhYmxlKG92ZXJsYXkpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHJpb3JDb21tYW5kKCkge1xyXG4gICAgaWYgKHRoaXMuY29tbWFuZEhpc3RvcnlJbmRleCA+IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZEhpc3RvcnlbLS10aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBuZXh0Q29tbWFuZCgpIHtcclxuICAgIGlmICh0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXggPCB0aGlzLmNvbW1hbmRIaXN0b3J5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZEhpc3RvcnlbKyt0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzdGFydHVwKCkge1xyXG4gICAgbGV0IGNoaWxkUGFuZWxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBhbmVsXCIpKS5tYXAocCA9PiBuZXcgQ29sbGFnZVBhbmVsKDxIVE1MRGl2RWxlbWVudD5wKSk7XHJcbiAgICBjaGlsZFBhbmVscy5mb3JFYWNoKGMgPT4gdGhpcy5hZGRCZWhhdmlvcnMoYykpO1xyXG4gICAgdGhpcy5wYW5lbHMucHVzaCguLi5jaGlsZFBhbmVscyk7XHJcbiAgICBsZXQgY21kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb25zb2xlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBjbWQub25rZXlkb3duID0gZXZlbnQgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxyXG4gICAgICAgICAgdGhpcy5leGVjdXRlQ29tbWFuZChjbWQudmFsdWUpO1xyXG4gICAgICAgICAgY21kLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XHJcbiAgICAgICAgICBjbWQudmFsdWUgPSB0aGlzLnByaW9yQ29tbWFuZCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxyXG4gICAgICAgICAgY21kLnZhbHVlID0gdGhpcy5uZXh0Q29tbWFuZCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLnJlaW5kZXgoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBleGVjdXRlQ29tbWFuZChjbWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5ldmFsKGNtZCk7XHJcbiAgICB0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXggPSB0aGlzLmNvbW1hbmRIaXN0b3J5LnB1c2goY21kKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZUNvbW1hbmQoY29tbWFuZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgYWkgPSBuZXcgQ29tbWFuZFBhcnNlcigpO1xyXG4gICAgcmV0dXJuIGFpLnBhcnNlUGhyYXNlKGNvbW1hbmQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuaW1wb3J0IHtnbG9iYWxzfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhlbHBDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGNvbW1hbmRzID0gZ2xvYmFscy5yZXBsLmNvbW1hbmRzLmxpc3QoKS5qb2luKFwiLFwiKTtcclxuICAgIGNvbnN0IGtleWJvYXJkQ29tbWFuZHMgPSBnbG9iYWxzLmtleWJvYXJkSGFuZGxlcnMubGlzdCgpLmpvaW4oXCIsXCIpO1xyXG4gICAgY29uc29sZS5sb2coY29tbWFuZHMsIGtleWJvYXJkQ29tbWFuZHMpO1xyXG4gICAgd2luZG93LmFsZXJ0KGNvbW1hbmRzICsga2V5Ym9hcmRDb21tYW5kcyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuXHJcbi8qKlxyXG4gICAqIFNwbGl0cyB0aGUgY3VycmVudCBwYW5lbCBpbnRvIDQgZXF1YWwgc2l6ZSBwYW5lbHNcclxuICAgKiBUaGlzIHBhbmVsIHRoZW4gdGFrZXMgb24gdGhlIHJvbGUgb2YgYSBwYW5lbCBjb250YWluZXJcclxuICAgKi9cclxuICBmdW5jdGlvbiBzcGxpdChwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgW3RvcGxlZnQsIHRvcHJpZ2h0LCBib3R0b21sZWZ0LCBib3R0b21yaWdodF0gPSBbMSwgMiwgMywgNF0ubWFwKG4gPT4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICBsZXQgY2hpbGRyZW4gPSBbdG9wbGVmdCwgdG9wcmlnaHQsIGJvdHRvbWxlZnQsIGJvdHRvbXJpZ2h0XS5tYXAodiA9PiBuZXcgQ29sbGFnZVBhbmVsKHYpKTtcclxuICAgIHRvcGxlZnQuY2xhc3NMaXN0LmFkZChcInExXCIpO1xyXG4gICAgdG9wcmlnaHQuY2xhc3NMaXN0LmFkZChcInEyXCIpO1xyXG4gICAgYm90dG9tbGVmdC5jbGFzc0xpc3QuYWRkKFwicTNcIik7XHJcbiAgICBib3R0b21yaWdodC5jbGFzc0xpc3QuYWRkKFwicTRcIik7XHJcbiAgICAvLyBwaG90byBjb250YWlucyBubyBzdGF0ZSBzbyBub3QgY2xvbmluZ1xyXG4gICAgY29uc3QgcGhvdG8gPSBwYW5lbC5waG90bztcclxuICAgIGlmIChwaG90bykge1xyXG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKGMgPT4gYy5hZGRQaG90byhwaG90by5jbG9uZSgpKSk7XHJcbiAgICB9XHJcbiAgICBwYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWxcIik7XHJcbiAgICBwYW5lbC5vdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3JjID0gXCJcIjtcclxuICAgIHBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoXCJwYW5lbC1jb250YWluZXJcIik7XHJcbiAgICBwYW5lbC5wYW5lbC5kYXRhc2V0W1wiaWRcIl0gPSBcIlwiO1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjID0+IHBhbmVsLnBhbmVsLmFwcGVuZENoaWxkKGMucGFuZWwpKTtcclxuICAgIHJldHVybiBjaGlsZHJlbjtcclxuICB9XHJcblxyXG4vKipcclxuICogU3BsaXRzIHRoZSBwYW5lbCBpbnRvIDQgbmV3IGNoaWxkIHBhbmVsc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNwbGl0Q29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGNvbW1hbmRBcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGNvbW1hbmRBcmdzO1xyXG5cclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gbm9kZSBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYW5lbCA9IHJlcGwucGFuZWxzLmZpbmQocCA9PiBwLnBhbmVsID09PSBub2RlKTtcclxuICAgIGlmICghcGFuZWwpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBwYW5lbCBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvcmlnaW5hbEluZGV4ID0gcmVwbC5wYW5lbHMuaW5kZXhPZihwYW5lbCk7XHJcbiAgICBsZXQgY2hpbGRQYW5lbHMgPSBzcGxpdChwYW5lbCk7XHJcbiAgICAvLyByZW1vdmUgc2luY2UgaXQgaXMgbm8gbG9uZ2VyIGEgcGFuZWxcclxuICAgIHJlcGwucGFuZWxzLnNwbGljZShvcmlnaW5hbEluZGV4LCAxLCAuLi5jaGlsZFBhbmVscyk7XHJcbiAgICBjaGlsZFBhbmVscy5mb3JFYWNoKGMgPT4gcmVwbC5hZGRCZWhhdmlvcnMoYykpO1xyXG4gICAgcmVwbC5yZWluZGV4KCk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXNwZWN0UmF0aW9Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBbdywgaF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCB3aWR0aCA9IHBhcnNlRmxvYXQodyk7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcGFyc2VGbG9hdChoKTtcclxuICAgIGxldCB3aW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRvd1wiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjYW52YXMgPSB3aW5kb3cucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50V2lkdGggPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY2FudmFzKS53aWR0aCk7XHJcbiAgICBsZXQgY3VycmVudEhlaWdodCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLmhlaWdodCk7XHJcbiAgICAvLyBtdWx0aXBsZSB3aWR0aCBhbmQgaGVpZ2h0IGJ5IG1heGltdW0gc2NhbGUgc3VjaCB0aGF0XHJcbiAgICAvLyB3aWR0aCAqIHNjYWxlIDw9IGN1cnJlbnRXaWR0aCBhbmQgaGVpZ2h0ICogc2NhbGUgPD0gY3VycmVudEhlaWdodFxyXG4gICAgbGV0IHN4ID0gY3VycmVudFdpZHRoIC8gd2lkdGg7XHJcbiAgICBsZXQgc3kgPSBjdXJyZW50SGVpZ2h0IC8gaGVpZ2h0O1xyXG4gICAgbGV0IHNjYWxlID0gTWF0aC5taW4oc3gsIHN5KTtcclxuICAgIHdpbmRvdy5zdHlsZS53aWR0aCA9IGAke01hdGgucm91bmQod2lkdGggKiBzY2FsZSl9cHhgO1xyXG4gICAgd2luZG93LnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0ICogc2NhbGUpfXB4YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3JkZXJDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBbaWQsIHdpZHRoLCBjb2xvcl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIHJlcGwuc2VsZWN0UGFuZWwoaWQpPy5ib3JkZXIod2lkdGgsIGNvbG9yKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuY29uc3QgdW5pdHMgPSBcInB4IGVtXCIuc3BsaXQoXCIgXCIpO1xyXG5cclxuZnVuY3Rpb24gaGFzVW5pdHModmFsdWU6IHN0cmluZykge1xyXG4gIHJldHVybiB1bml0cy5zb21lKHYgPT4gdmFsdWUuZW5kc1dpdGgodikpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlU3R5bGVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgdGFyZ2V0OiBrZXlvZiBPbWl0PENTU1N0eWxlRGVjbGFyYXRpb24sIG51bWJlcj4sXHJcbiAgICBwdWJsaWMgb3B0aW9ucz86IHtcclxuICAgICAgdW5pdHM/OiBzdHJpbmc7XHJcbiAgICAgIGRlbHRhPzogbnVtYmVyO1xyXG4gICAgfVxyXG4gICkgeyB9XHJcblxyXG4gIHByaXZhdGUga2V5Ym9hcmRIYW5kbGVyKHJlcGw6IFJlcGwpIHtcclxuICAgIHJldHVybiByZXBsLnBhbmVsc1xyXG4gICAgICAuZmlsdGVyKHAgPT4gcC5wYW5lbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmb2N1c1wiKSlcclxuICAgICAgLnNvbWUocGFuZWwgPT4ge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBwYW5lbC5wYW5lbDtcclxuICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KVt0aGlzLnRhcmdldF0pICsgKHRoaXMub3B0aW9ucz8uZGVsdGEgPz8gMCk7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlWzxhbnk+dGhpcy50YXJnZXRdID0gdmFsdWUgKyAodGhpcy5vcHRpb25zPy51bml0cyA/PyBcIlwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCFhcmdzKSB7XHJcbiAgICAgIGlmICh0aGlzLmtleWJvYXJkSGFuZGxlcihyZXBsKSkgcmV0dXJuO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhbmVscyA9IHJlcGwucGFuZWxzO1xyXG4gICAgbGV0IFt2YWx1ZSwgaWRdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBpZiAoISFpZCkge1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgICAgaWYgKCFwYW5lbCkge1xyXG4gICAgICAgIHJlcGwubm90aWZ5KGBwYW5lbCBub3QgZm91bmQ6ICR7aWR9YCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9ICBcclxuICAgICAgcGFuZWxzID0gW3BhbmVsXTtcclxuICAgIH1cclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnM/LnVuaXRzICYmICFoYXNVbml0cyh2YWx1ZSkpIHtcclxuICAgICAgdmFsdWUgKz0gdGhpcy5vcHRpb25zLnVuaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgcGFuZWwucGFuZWwuc3R5bGVbPGFueT50aGlzLnRhcmdldF0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5mdW5jdGlvbiBoYXNGb2N1cyhub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR290b0NvbW1hbmRFZGl0b3JDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IGVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uc29sZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgaWYgKCFlZGl0b3IpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoXCJubyBjb21tYW5kIGVkaXRvciBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc0ZvY3VzKGVkaXRvcikpIHJldHVybiBmYWxzZTtcclxuICAgIGVkaXRvci5mb2N1cygpO1xyXG4gICAgZWRpdG9yLnNlbGVjdCgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2N1c1BhbmVscyhyZXBsOiBSZXBsKSB7XHJcbiAgcmV0dXJuIHJlcGwucGFuZWxzLmZpbHRlcihwID0+IHAucGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpO1xyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5cclxuLyoqXHJcbiAqIHN3YXAgaW1hZ2VzIG9mIHR3byBwYW5lbHNcclxuICovXHJcbmZ1bmN0aW9uIHN3YXBJbWFnZXMocGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IGltYWdlMSA9IHBhbmVsMS5pbWFnZTtcclxuICBsZXQgaW1hZ2UyID0gcGFuZWwyLmltYWdlO1xyXG4gIGxldCBwYXJlbnQxID0gaW1hZ2UxLnBhcmVudEVsZW1lbnQ7XHJcbiAgbGV0IHBhcmVudDIgPSBpbWFnZTIucGFyZW50RWxlbWVudDtcclxuICBpZiAoIXBhcmVudDEgfHwgIXBhcmVudDIpIHJldHVybiBmYWxzZTtcclxuICBsZXQgbmV4dDEgPSBpbWFnZTEubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gIGxldCBuZXh0MiA9IGltYWdlMi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgaW1hZ2UxLnJlbW92ZSgpO1xyXG4gIGltYWdlMi5yZW1vdmUoKTtcclxuICBwYXJlbnQyLmluc2VydEJlZm9yZShpbWFnZTEsIG5leHQyKTtcclxuICBwYXJlbnQxLmluc2VydEJlZm9yZShpbWFnZTIsIG5leHQxKTtcclxuICBsZXQgcGhvdG8xID0gcGFuZWwxLnBob3RvO1xyXG4gIGxldCBwaG90bzIgPSBwYW5lbDIucGhvdG87XHJcbiAgcGFuZWwxLmltYWdlID0gaW1hZ2UyO1xyXG4gIHBhbmVsMi5pbWFnZSA9IGltYWdlMTtcclxuICBwYW5lbDEucGhvdG8gPSBwaG90bzI7XHJcbiAgcGFuZWwyLnBob3RvID0gcGhvdG8xO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFN3YXBQYW5lbHNDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXIocmVwbDogUmVwbCkge1xyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAoMiAhPT0gcGFuZWxzLmxlbmd0aCkge1xyXG4gICAgICByZXBsLm5vdGlmeShcIkV4YWN0bHkgdHdvIHBhbmVscyBtdXN0IGJlIHNlbGVjdGVkIGJlZm9yZSB5b3UgY2FuIHBlcmZvcm0gYSBzd2FwLlwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc3dhcEltYWdlcyhwYW5lbHNbMF0sIHBhbmVsc1sxXSk7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiBmYWxzZSB8IHZvaWQgfCBQcm9taXNlPGZhbHNlIHwgdm9pZD4ge1xyXG4gICAgaWYgKCFhcmdzKVxyXG4gICAgICByZXR1cm4gdGhpcy5rZXlib2FyZEhhbmRsZXIocmVwbCk7XHJcblxyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwYW5lbDEgPSByZXBsLnNlbGVjdFBhbmVsKGlkMSk7XHJcbiAgICBsZXQgcGFuZWwyID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgaWYgKCFwYW5lbDEpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoYFBhbmVsIG5vdCBmb3VuZDogJHtpZDF9YCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICghcGFuZWwyKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KGBQYW5lbCBub3QgZm91bmQ6ICR7aWQyfWApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzd2FwSW1hZ2VzKHBhbmVsMSwgcGFuZWwyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIEdvdG9Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGFyZ3M7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgVGV4dENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgdmFsdWVdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuICAgIHBhbmVsLnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIFBhZENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgd2lkdGhdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5zdHlsZS5wYWRkaW5nID0gYCR7d2lkdGh9ZW1gO1xyXG5cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBub2RlLnN0eWxlLnZpc2liaWxpdHkgIT09IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgaXNWaXNpYmxlIH0gZnJvbSBcIi4uL2Z1bi9pc1Zpc2libGVcIjtcclxuZXhwb3J0IGNsYXNzIFRvZ2dsZVZpc2liaWxpdHlDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IHtcclxuICAgIHNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgfSkge1xyXG4gIH1cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IG92ZXJsYXlzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3RvcikpIGFzIEFycmF5PEhUTUxFbGVtZW50PjtcclxuICAgIGxldCBhbGxWaXNpYmxlID0gb3ZlcmxheXMuZXZlcnkodiA9PiBpc1Zpc2libGUodikpO1xyXG4gICAgaWYgKCFhbGxWaXNpYmxlKSB7XHJcbiAgICAgIG92ZXJsYXlzLmZvckVhY2godiA9PiB2LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgb3ZlcmxheXMuZm9yRWFjaCh2ID0+IHYuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBnZXRGb2N1c1BhbmVscyB9IGZyb20gXCIuL2dldEZvY3VzUGFuZWxzXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICAgKiBNb3ZlIHRoZSBpbWFnZSBpbnNpZGUgdGhlIGZyYW1lXHJcbiAgICogQHBhcmFtIHggaG9yaXpvbnRhbCBvZmZzZXQgaW4gcGl4ZWxzXHJcbiAgICogQHBhcmFtIHkgdmVydGljYWwgb2Zmc2V0IGluIHBpeGVsc1xyXG4gICAqL1xyXG5mdW5jdGlvbiBwYW4ocmVwbDogUmVwbCwgbm9kZTogSFRNTEVsZW1lbnQsIHg6IHN0cmluZywgeTogc3RyaW5nKSB7XHJcbiAgbGV0IFtkeCwgZHldID0gWzAsIDBdO1xyXG4gIGxldCBhbmltYXRlID0gdHJ1ZTtcclxuICBsZXQgcGl4ZWxTaXplID0gMTtcclxuICBzd2l0Y2ggKHgpIHtcclxuICAgIGNhc2UgXCJ1cFwiOlxyXG4gICAgICBkeSA9IC1waXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImRvd25cIjpcclxuICAgICAgZHkgPSBwaXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgZHggPSAtcGl4ZWxTaXplO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICBkeCA9IHBpeGVsU2l6ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbmltYXRlID0gZmFsc2U7XHJcbiAgICAgIGR4ID0gcGl4ZWxTaXplICogcGFyc2VGbG9hdCh4KTtcclxuICAgICAgZHkgPSBwaXhlbFNpemUgKiBwYXJzZUZsb2F0KHkpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgbGV0IG9wID0gKCkgPT4ge1xyXG4gICAgdHJhbnNmb3JtKG5vZGUsIGB0cmFuc2xhdGUoJHtkeH1weCwgJHtkeX1weClgKTtcclxuICB9O1xyXG4gIG9wKCk7XHJcbiAgbGV0IGFuaW1hdGlvbnMgPSByZXBsLmFuaW1hdGlvbnM7XHJcbiAgYW5pbWF0ZSAmJiBhbmltYXRpb25zLmFuaW1hdGUoXCJwYW5cIiwgb3ApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlSW1hZ2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IHtcclxuICAgIHg/OiBudW1iZXI7XHJcbiAgICB5PzogbnVtYmVyO1xyXG4gIH0pIHsgfVxyXG5cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCEhYXJncykge1xyXG4gICAgICBsZXQgW2lkLCB4LCB5XSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBwYW4ocmVwbCwgcGFuZWwuaW1hZ2UsIHgsIHkgfHwgXCIwXCIpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlbHRhKSB7XHJcbiAgICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgcGFuKHJlcGwsIHBhbmVsLmltYWdlLCAodGhpcy5kZWx0YSEueCB8fCAwKSArIFwiXCIsICh0aGlzLmRlbHRhIS55IHx8IDApICsgXCJcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbm90IGhhbmRsZWRcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgTWFyZ2luQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkLCB3aWR0aF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gICAgbm9kZS5zdHlsZS5tYXJnaW4gPSBgJHt3aWR0aH1lbWA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5cclxuZnVuY3Rpb24gbWVyZ2Vfbm9kZXMocmVwbDogUmVwbCwgcGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IG5vZGUxID0gcGFuZWwxLnBhbmVsO1xyXG4gIGxldCBub2RlMiA9IHBhbmVsMi5wYW5lbDtcclxuXHJcbiAgbm9kZTIuY2xhc3NMaXN0LmZvckVhY2goYyA9PiBub2RlMS5jbGFzc0xpc3QuYWRkKGMpKTtcclxuICByZXBsLnJlbW92ZVBhbmVsKHBhbmVsMik7XHJcblxyXG4gIC8vIGlmIG5vZGUxIGlzIHExLi4ucTQgYW5kIG9ubHkgY2hpbGQgdGhlbiBpdCBhc3N1bWVzIHRoZSBxIG9mIGl0J3MgY29udGFpbmVyIGFuZCByZXBsYWNlcyBpdHMgY29udGFpbmVyXHJcbiAgbGV0IHFzID0gWzEsIDIsIDMsIDRdLm1hcCh2ID0+IGBxJHt2fWApO1xyXG4gIGlmIChxcy5ldmVyeSh2ID0+IG5vZGUxLmNsYXNzTGlzdC5jb250YWlucyh2KSkpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IG5vZGUxLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWwtY29udGFpbmVyXCIpKSB7XHJcbiAgICAgIHFzLmZvckVhY2godiA9PiBub2RlMS5jbGFzc0xpc3QucmVtb3ZlKHYpKTtcclxuICAgICAgcXMuZm9yRWFjaCh2ID0+IHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnModikgJiYgbm9kZTEuY2xhc3NMaXN0LmFkZCh2KSk7XHJcbiAgICAgIHBhcmVudC5wYXJlbnRFbGVtZW50Py5pbnNlcnRCZWZvcmUobm9kZTEsIHBhcmVudCk7XHJcbiAgICAgIHBhcmVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVwbC5yZWluZGV4KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXJnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlMSA9IHJlcGwuc2VsZWN0UGFuZWwoaWQxKTtcclxuICAgIGxldCBub2RlMiA9IHJlcGwuc2VsZWN0UGFuZWwoaWQyKTtcclxuICAgIG5vZGUxICYmIG5vZGUyICYmIG1lcmdlX25vZGVzKHJlcGwsIG5vZGUxLCBub2RlMik7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgYmJveCB9IGZyb20gXCIuLi9mdW4vYmJveFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpUmVzQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG5cclxuICAvKipcclxuICAgKiByZXBsYWNlcyB0aGUgY3VycmVudCBwaG90byB3aXRoIG9uZSBvZiBoaWdoZXIgcXVhbGl0eVxyXG4gICAqL1xyXG4gIGFzeW5jIHVwZ3JhZGVSZXNvbHV0aW9uKHJlcGw6IFJlcGwsIHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGlmICghcGFuZWwucGhvdG8pXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAvLyBhdHRlbXB0cyB0byBpbmNyZWFzZSBhbiBpbWFnZSBzaXplIGFuZCBkZWNyZWFzZSB0aGUgdHJhbnNmb3JtIHNjYWxlIFxyXG4gICAgLy8gdG8gaGF2ZSBhIG5lZ2xpZ2FibGUgZWZmZWN0IG9uIHRoZSBpbWFnZSBidXQgYWxsb3cgZm9yIHN3YXBwaW5nIGluIFxyXG4gICAgLy8gYSBoaWdoZXIgcmVzb2x1dGlvbiB2ZXJzaW9uLlxyXG4gICAgLy8gdGhpcyBpcyBub3QgY29tcGVuc2F0aW5nIGZvciAgcGFkZGluZywgbWFyZ2luLCBib3JkZXIgd2lkdGgsIGV0Yy5cclxuICAgIC8vIGl0IGlzIG5vdCBwcmVzZXJ2aW5nIHJvdGF0aW9uXHJcbiAgICBsZXQgYm94ID0gYmJveChwYW5lbC5pbWFnZSk7XHJcbiAgICBsZXQgaW1hZ2VSZWN0ID0gcGFuZWwuaW1hZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgc2NhbGUgPSBpbWFnZVJlY3Qud2lkdGggLyBib3gud2lkdGg7XHJcbiAgICBpZiAoMSA+IHNjYWxlKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KFwidGhpcyB3b3VsZCBub3QgYmUgYW4gdXBncmFkZVwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHBhbmVsUmVjdCA9IHBhbmVsLnBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUud2lkdGggPSBpbWFnZVJlY3Qud2lkdGggKyBcInB4XCI7XHJcbiAgICBwYW5lbC5pbWFnZS5zdHlsZS5oZWlnaHQgPSBpbWFnZVJlY3QuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgbGV0IGR4ID0gaW1hZ2VSZWN0LmxlZnQgLSBwYW5lbFJlY3QubGVmdCAtIHBhcnNlRmxvYXQocGFuZWwucGFuZWwuc3R5bGUuYm9yZGVyTGVmdFdpZHRoKTtcclxuICAgIGxldCBkeSA9IGltYWdlUmVjdC50b3AgLSBwYW5lbFJlY3QudG9wIC0gcGFyc2VGbG9hdChwYW5lbC5wYW5lbC5zdHlsZS5ib3JkZXJUb3BXaWR0aCk7XHJcbiAgICBwYW5lbC5pbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7ZHh9cHgsJHtkeX1weClgO1xyXG4gICAgcGFuZWwuc2V0QmFja2dyb3VuZEltYWdlKGAke3BhbmVsLnBob3RvLm1lZGlhSW5mby5iYXNlVXJsfT13JHtNYXRoLmZsb29yKGltYWdlUmVjdC53aWR0aCl9YCk7XHJcbiAgICByZXBsLm5vdGlmeShgdXBncmFkZWQgYnkgJHtNYXRoLnJvdW5kKHNjYWxlICogMTAwKX0lYCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGFyZ3M7XHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuICAgIHRoaXMudXBncmFkZVJlc29sdXRpb24ocmVwbCwgcGFuZWwpO1xyXG5cclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmV4cG9ydCBjbGFzcyBNb3ZlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkMSwgaWQyXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IHBob3RvID0gcmVwbC5zZWxlY3RQaG90byhpZDEpO1xyXG4gICAgaWYgKCFwaG90bykgcmV0dXJuO1xyXG5cclxuXHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkMik7XHJcbiAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgcGFuZWwuYWRkUGhvdG8ocGhvdG8pO1xyXG5cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi4vZnVuL3RyYW5zZm9ybVwiO1xyXG5cclxuZnVuY3Rpb24gcm90YXRlSW1hZ2UocmVwbDogUmVwbCwgbm9kZTogSFRNTEVsZW1lbnQsIGFuZ2xlOiBzdHJpbmcpIHtcclxuICBpZiAoIW5vZGUpXHJcbiAgICByZXR1cm47XHJcblxyXG4gIGlmICghIWFuZ2xlKSB7XHJcbiAgICB0cmFuc2Zvcm0obm9kZSwgYHJvdGF0ZSgke2FuZ2xlfWRlZylgKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBsZXQgYW5nbGUgPSAwO1xyXG4gICAgbGV0IGFuaW1hdGlvbnMgPSByZXBsLmFuaW1hdGlvbnM7XHJcbiAgICBhbmltYXRpb25zLmFuaW1hdGUoXCJyb3RhdGVcIiwgKCkgPT4ge1xyXG4gICAgICBhbmdsZSArPSAxO1xyXG4gICAgICB0cmFuc2Zvcm0obm9kZSwgYHJvdGF0ZSgke2FuZ2xlfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUm90YXRlUGFuZWxDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRlbHRhOiBudW1iZXIpIHsgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLnBhbmVsO1xyXG4gICAgICB0cmFuc2Zvcm0obGFiZWxJbWFnZU9yUGFuZWwsIGByb3RhdGUoJHt0aGlzLmRlbHRhfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvdGF0ZUltYWdlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IG51bWJlcikgeyB9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGlmICghIWFyZ3MpIHtcclxuICAgICAgbGV0IFtub3VuLCBub3VuMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgICAgbGV0IHBhbmVsID0gcmVwbC5zZWxlY3RQYW5lbChub3VuKTtcclxuICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByb3RhdGVJbWFnZShyZXBsLCBwYW5lbC5pbWFnZSwgbm91bjIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgcGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBsZXQgbGFiZWxJbWFnZU9yUGFuZWwgPSBwYW5lbC5pbWFnZTtcclxuICAgICAgdHJhbnNmb3JtKGxhYmVsSW1hZ2VPclBhbmVsLCBgcm90YXRlKCR7dGhpcy5kZWx0YX1kZWcpYCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBnZXRGb2N1c1BhbmVscyB9IGZyb20gXCIuL2dldEZvY3VzUGFuZWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlUGFuZWxDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRlbHRhOiB7XHJcbiAgICB4PzogbnVtYmVyO1xyXG4gICAgeT86IG51bWJlcjtcclxuICB9KSB7IH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLnBhbmVsO1xyXG4gICAgICBsZXQgY29tcHV0ZWRUcmFuZm9ybSA9IGdldENvbXB1dGVkU3R5bGUobGFiZWxJbWFnZU9yUGFuZWwpLnRyYW5zZm9ybTtcclxuICAgICAgaWYgKGNvbXB1dGVkVHJhbmZvcm0gPT09IFwibm9uZVwiKSBjb21wdXRlZFRyYW5mb3JtID0gXCJcIjtcclxuICAgICAgbGFiZWxJbWFnZU9yUGFuZWwuc3R5bGUudHJhbnNmb3JtID0gY29tcHV0ZWRUcmFuZm9ybSArIGAgdHJhbnNsYXRlKCR7dGhpcy5kZWx0YS54IHx8IDB9cHgsICR7dGhpcy5kZWx0YS55IHx8IDB9cHgpYDtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3BDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCFyZXBsLmFuaW1hdGlvbnMuYW5pbWF0aW9ucy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgIHJlcGwuYW5pbWF0aW9ucy5zdG9wKGFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvZ2dsZUZvY3VzQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICBpZiAoIWFjdGl2ZVBhbmVsPy5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbFwiKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgYWN0aXZlUGFuZWwuY2xhc3NMaXN0LnRvZ2dsZShcImZvY3VzXCIpOyAgICBcclxuICAgIC8vIGhlcmUgaSBhbSAtIGlmIG5vdCBcInNoaWZ0XCIga2V5IHRoZW4gdW5mb2N1cyBhbGwgcGFuZWxzXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuZXhwb3J0IGNsYXNzIEVzY2FwZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBcclxuICBwcml2YXRlIGlzUGFuZWwoZWxlbWVudDogRWxlbWVudCB8IG51bGwpIHtcclxuICAgIGlmICghZWxlbWVudClcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWxcIikgfHwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbC1jb250YWluZXJcIik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNlbGVjdFBhcmVudFBhbmVsKCkge1xyXG4gICAgbGV0IGN1cnJlbnRQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFjdXJyZW50UGFuZWwpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHdoaWxlIChjdXJyZW50UGFuZWwpIHtcclxuICAgICAgY3VycmVudFBhbmVsID0gY3VycmVudFBhbmVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIGlmICghY3VycmVudFBhbmVsKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgaWYgKHRoaXMuaXNQYW5lbChjdXJyZW50UGFuZWwpKSB7XHJcbiAgICAgICAgY3VycmVudFBhbmVsLmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAvLyB1bmZvY3VzIGFsbCBwYW5lbHNcclxuICAgIHJlcGwucGFuZWxzLmZvckVhY2gocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJmb2N1c1wiKSk7XHJcbiAgICB0aGlzLnNlbGVjdFBhcmVudFBhbmVsKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlRm9udFNpemVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGRlbHRhOiBudW1iZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBpc0xhYmVsKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGFiZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgICAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICghdGhpcy5pc0xhYmVsKGxhYmVsKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShsYWJlbCkuZm9udFNpemUpO1xyXG4gICAgICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemUgKyB0aGlzLmRlbHRhfXB4YDtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgR29vZ2xlTWVkaWFJdGVtIH0gZnJvbSBcIi4vR29vZ2xlTWVkaWFJdGVtXCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlUGhvdG9BUEkge1xyXG4gIGF1dGgyOiB7XHJcbiAgICBnZXRBdXRoSW5zdGFuY2U6ICgpID0+IHtcclxuICAgICAgaXNTaWduZWRJbjoge1xyXG4gICAgICAgIGxpc3RlbjogKGNiOiAoaXNTaWduZWRJbjogYm9vbGVhbikgPT4gdm9pZCkgPT4gdm9pZDtcclxuICAgICAgICBnZXQ6ICgpID0+IGJvb2xlYW47XHJcbiAgICAgIH07XHJcbiAgICAgIHNpZ25JbjogKCkgPT4gdm9pZDtcclxuICAgICAgc2lnbk91dDogKCkgPT4gdm9pZDtcclxuICAgIH07XHJcbiAgfTtcclxuICBsb2FkOiAodHlwZTogc3RyaW5nLCBjYjogRnVuY3Rpb24pID0+IHZvaWQ7XHJcbiAgY2xpZW50OiB7XHJcbiAgICBpbml0OiAoYXJnczoge1xyXG4gICAgICBhcGlLZXk6IHN0cmluZztcclxuICAgICAgZGlzY292ZXJ5RG9jczogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgY2xpZW50SWQ6IHN0cmluZztcclxuICAgICAgc2NvcGU6IHN0cmluZztcclxuICAgIH0pID0+IFByb21pc2U8YW55PjtcclxuICAgIHBob3Rvc2xpYnJhcnk6IHtcclxuICAgICAgYWxidW1zOiB7XHJcbiAgICAgICAgbGlzdDogRnVuY3Rpb247XHJcbiAgICAgIH07XHJcbiAgICAgIG1lZGlhSXRlbXM6IHtcclxuICAgICAgICBzZWFyY2g6IChhcmdzOiB7XHJcbiAgICAgICAgICBhbGJ1bUlkOiBzdHJpbmc7XHJcbiAgICAgICAgICBwYWdlVG9rZW4/OiBzdHJpbmc7XHJcbiAgICAgICAgfSkgPT4gUHJvbWlzZTx7XHJcbiAgICAgICAgICByZXN1bHQ6IHtcclxuICAgICAgICAgICAgbmV4dFBhZ2VUb2tlbj86IHN0cmluZztcclxuICAgICAgICAgICAgbWVkaWFJdGVtczogQXJyYXk8R29vZ2xlTWVkaWFJdGVtPjtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfT47XHJcbiAgICAgICAgZ2V0OiAobWVkaWFJdGVtSWQ6IGFueSkgPT4gUHJvbWlzZTx7XHJcbiAgICAgICAgICByZXN1bHQ6IEdvb2dsZU1lZGlhSXRlbTtcclxuICAgICAgICB9PjtcclxuICAgICAgfTtcclxuICAgIH07XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVQaG90b0FQSSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlUGhvdG9BUElcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGdhcGk6IEdvb2dsZVBob3RvQVBJO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBob3RvU2lnbmluIHtcclxuICBwcml2YXRlIHBlb3BsZUFwaURpc2NvdmVyeSA9IFwiXCI7XHJcbiAgLy8gd2hlcmUgdG8gc3RvcmUgdGhlc2UgdmFsdWVzP1xyXG4gIHByaXZhdGUgc2NvcGVzID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3Bob3Rvc2xpYnJhcnkucmVhZG9ubHlcIjtcclxuICBwcml2YXRlIGF1dGhvcml6ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0aG9yaXplLWJ1dHRvblwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBwcml2YXRlIHNpZ25vdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25vdXQtYnV0dG9uXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZHkgPSAoKSA9PiB7IH07XHJcbiAgYXN5bmMgaGFuZGxlQ2xpZW50TG9hZCgpIHtcclxuICAgIC8vIExvYWQgdGhlIEFQSSBjbGllbnQgYW5kIGF1dGgyIGxpYnJhcnkuXHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGdhcGkubG9hZChcImNsaWVudDphdXRoMlwiLCByZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGNyZWRlbnRpYWxzUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi4vd2ViL2NyZWRlbnRpYWxzLmpzb25cIik7XHJcbiAgICBsZXQgY3JlZGVudGlhbHM6IHtcclxuICAgICAgYXBpS2V5OiBzdHJpbmc7XHJcbiAgICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICB9ID0gYXdhaXQgY3JlZGVudGlhbHNSZXNwb25zZS5qc29uKCk7XHJcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGZldGNoKFwiLi93ZWIvcGhvdG9zX3Jlc3RfdjEuanNvblwiKTtcclxuICAgIHRoaXMucGVvcGxlQXBpRGlzY292ZXJ5ID0gYXdhaXQgcmVzcC5qc29uKCk7XHJcbiAgICBhd2FpdCB0aGlzLmluaXRDbGllbnQoY3JlZGVudGlhbHMpO1xyXG4gIH1cclxuICBwcml2YXRlIGFzeW5jIGluaXRDbGllbnQoYXJnczoge1xyXG4gICAgYXBpS2V5OiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gIH0pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChnb29kLCBiYWQpID0+IHtcclxuICAgICAgdGhpcy5yZWFkeSA9ICgpID0+IGdvb2QoKTtcclxuICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7XHJcbiAgICAgICAgYXBpS2V5OiBhcmdzLmFwaUtleSxcclxuICAgICAgICBkaXNjb3ZlcnlEb2NzOiBbdGhpcy5wZW9wbGVBcGlEaXNjb3ZlcnldLFxyXG4gICAgICAgIGNsaWVudElkOiBhcmdzLmNsaWVudElkLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlcyxcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIExpc3RlbiBmb3Igc2lnbi1pbiBzdGF0ZSBjaGFuZ2VzLlxyXG4gICAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLmlzU2lnbmVkSW4ubGlzdGVuKHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKTtcclxuICAgICAgLy8gSGFuZGxlIHRoZSBpbml0aWFsIHNpZ24taW4gc3RhdGUuXHJcbiAgICAgIHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuaXNTaWduZWRJbi5nZXQoKSk7XHJcbiAgICAgIHRoaXMuYXV0aG9yaXplQnV0dG9uLm9uY2xpY2sgPSB0aGlzLmhhbmRsZUF1dGhDbGljaztcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uLm9uY2xpY2sgPSB0aGlzLmhhbmRsZVNpZ25vdXRDbGljaztcclxuICAgIH0pO1xyXG4gIH1cclxuICBwcml2YXRlIHVwZGF0ZVNpZ25pblN0YXR1cyhpc1NpZ25lZEluOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNTaWduZWRJbikge1xyXG4gICAgICB0aGlzLmF1dGhvcml6ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIHRoaXMuc2lnbm91dEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICB0aGlzLnJlYWR5KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRob3JpemVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBoYW5kbGVBdXRoQ2xpY2soKSB7XHJcbiAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLnNpZ25JbigpO1xyXG4gIH1cclxuICBwcml2YXRlIGhhbmRsZVNpZ25vdXRDbGljaygpIHtcclxuICAgIGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuc2lnbk91dCgpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEdvb2dsZUFsYnVtIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgY292ZXJQaG90b0Jhc2VVcmw6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVQaG90b1NpZ25pbiB9IGZyb20gXCIuL0dvb2dsZVBob3RvU2lnbmluXCI7XHJcbmltcG9ydCB7IEdvb2dsZU1lZGlhSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlTWVkaWFJdGVtXCI7XHJcbmltcG9ydCB7IEdvb2dsZUFsYnVtIH0gZnJvbSBcIi4uL21vZGVscy9Hb29nbGVBbGJ1bVwiO1xyXG5pbXBvcnQgeyBHb29nbGVQaG90b0FQSSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlUGhvdG9BUElcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGdhcGk6IEdvb2dsZVBob3RvQVBJO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBob3RvcyB7XHJcblxyXG4gIGFzeW5jIGdldEFsYnVtcygpIHtcclxuICAgIGxldCBzaWduaW4gPSBuZXcgR29vZ2xlUGhvdG9TaWduaW4oKTtcclxuICAgIGF3YWl0IHNpZ25pbi5oYW5kbGVDbGllbnRMb2FkKCk7XHJcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkuYWxidW1zLmxpc3QoKTtcclxuICAgIGlmIChyZXNwLnN0YXR1cyAhPT0gMjAwKVxyXG4gICAgICB0aHJvdyBgc3RhdHVzOiAke3Jlc3Auc3RhdHVzfWA7XHJcbiAgICBjb25zb2xlLmxvZyh7IHJlc3AgfSk7XHJcbiAgICBsZXQgYWxidW1zID0gcmVzcC5yZXN1bHQuYWxidW1zIGFzIEFycmF5PEdvb2dsZUFsYnVtPjtcclxuICAgIHdoaWxlIChyZXNwLnJlc3VsdC5uZXh0UGFnZVRva2VuKSB7XHJcbiAgICAgIHJlc3AgPSBhd2FpdCBnYXBpLmNsaWVudC5waG90b3NsaWJyYXJ5LmFsYnVtcy5saXN0KHtwYWdlVG9rZW46IHJlc3AucmVzdWx0Lm5leHRQYWdlVG9rZW59KTtcclxuICAgICAgaWYgKHJlc3Auc3RhdHVzICE9PSAyMDApXHJcbiAgICAgICAgdGhyb3cgYHN0YXR1czogJHtyZXNwLnN0YXR1c31gO1xyXG4gICAgICBjb25zb2xlLmxvZyh7IHJlc3AgfSk7XHJcbiAgICAgIGFsYnVtcyA9IGFsYnVtcy5jb25jYXQocmVzcC5yZXN1bHQuYWxidW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhbGJ1bXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGJ1bShhbGJ1bTogR29vZ2xlQWxidW0pIHtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5tZWRpYUl0ZW1zLnNlYXJjaCh7IGFsYnVtSWQ6IGFsYnVtLmlkIH0pO1xyXG4gICAgbGV0IHttZWRpYUl0ZW1zfSA9IGRhdGEucmVzdWx0O1xyXG4gICAgd2hpbGUgKGRhdGEucmVzdWx0Lm5leHRQYWdlVG9rZW4pIHtcclxuICAgICAgZGF0YSA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkubWVkaWFJdGVtcy5zZWFyY2goeyBhbGJ1bUlkOiBhbGJ1bS5pZCwgcGFnZVRva2VuOiBkYXRhLnJlc3VsdC5uZXh0UGFnZVRva2VuIH0pO1xyXG4gICAgICBtZWRpYUl0ZW1zLnB1c2goLi4uZGF0YS5yZXN1bHQubWVkaWFJdGVtcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVkaWFJdGVtcztcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFBob3RvKG1lZGlhSXRlbUlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5tZWRpYUl0ZW1zLmdldCh7IG1lZGlhSXRlbUlkIH0pO1xyXG4gICAgcmV0dXJuIChkYXRhLnJlc3VsdCkgYXMgR29vZ2xlTWVkaWFJdGVtO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBHb29nbGVQaG90b3MgfSBmcm9tIFwiLi4vY29udHJvbHMvR29vZ2xlUGhvdG9zXCI7XHJcbmltcG9ydCB7IEdvb2dsZUNvbGxhZ2VQaG90byB9IGZyb20gXCIuLi9jb250cm9scy9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcGVuQWxidW1zQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgYXN5bmMgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxmYWxzZSB8IHZvaWQ+IHtcclxuICAgICAgICBpZiAoIWFyZ3MpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuQWxidW1zKHJlcGwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbGJ1bU5hbWVzID0gYXJncy5zcGxpdChcIixcIik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5vcGVuQWxidW1zKHJlcGwsIGFsYnVtTmFtZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9wZW5BbGJ1bXMocmVwbDogUmVwbCwgYWxidW1OYW1lcz86IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgcGhvdG9zID0gbmV3IEdvb2dsZVBob3RvcygpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG9zXCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgbGV0IGFsYnVtcyA9IGF3YWl0IHBob3Rvcy5nZXRBbGJ1bXMoKTtcclxuICAgICAgICAgICAgaWYgKGFsYnVtTmFtZXMpIGFsYnVtcyA9IGFsYnVtcy5maWx0ZXIoYSA9PiAtMSA8IGFsYnVtTmFtZXMuaW5kZXhPZihhLnRpdGxlKSk7XHJcbiAgICAgICAgICAgIGFsYnVtcy5mb3JFYWNoKGFzeW5jIChhbGJ1bSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9wZW5pbmcgYWxidW06ICR7YWxidW0uaWR9ICgke2FsYnVtLnRpdGxlfSlgKTtcclxuICAgICAgICAgICAgICAgIGxldCBtZWRpYUl0ZW1zID0gYXdhaXQgcGhvdG9zLmdldEFsYnVtKGFsYnVtKTtcclxuICAgICAgICAgICAgICAgIG1lZGlhSXRlbXMuZm9yRWFjaChtZWRpYUl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaG90byA9IG5ldyBHb29nbGVDb2xsYWdlUGhvdG8obWVkaWFJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBsLnBob3Rvcy5wdXNoKHBob3RvKTtcclxuICAgICAgICAgICAgICAgICAgICBwaG90by5yZW5kZXJJbnRvKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbC5yZWluZGV4UGhvdG9zKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuLi9tb2RlbHMvQmVoYXZpb3JcIjtcclxuXHJcbi8qKlxyXG4gKiBXaGVuIHVzZXIgc2hpZnQtY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzc1xyXG4gKiBXaGVuIHVzZXIgY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzcywgcmVtb3ZlIFwiZm9jdXNcIiBmcm9tIGFsbCBvdGhlcnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdG9yIGltcGxlbWVudHMgQmVoYXZpb3I8UmVwbD5cclxue1xyXG4gICAgZXh0ZW5kKGNvbnRyb2w6IFJlcGwpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgY3VycmVudCBcImZvY3VzXCIgaWYgc2hpZnQgbm90IGNsaWNrZWRcclxuICAgICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC5wYW5lbHMuZm9yRWFjaChwID0+IHAucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGFuZWxzID0gZXZlbnQuY29tcG9zZWRQYXRoKCk7XHJcbiAgICAgICAgICAgIHBhbmVscyA9IHBhbmVscy5maWx0ZXIoKG5vZGU6IGFueSkgPT4gdHJ1ZSA9PT0gbm9kZT8uY2xhc3NMaXN0Py5jb250YWlucyhcInBhbmVsXCIpKSBhcyBBcnJheTxIVE1MRWxlbWVudD47ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhbmVscy5mb3JFYWNoKChub2RlOiBhbnkpID0+IG5vZGUuY2xhc3NMaXN0LnRvZ2dsZShcImZvY3VzXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi4vbW9kZWxzL0JlaGF2aW9yXCI7XHJcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tIFwiLi4vY29udHJvbHMvVG9hc3RlclwiO1xyXG5cclxuLyoqXHJcbiAqIFdoZW4gdXNlciBzaGlmdC1jbGlja3MgYSBwYW5lbCBhZGQgXCJmb2N1c1wiIGNsYXNzXHJcbiAqIFdoZW4gdXNlciBjbGlja3MgYSBwYW5lbCBhZGQgXCJmb2N1c1wiIGNsYXNzLCByZW1vdmUgXCJmb2N1c1wiIGZyb20gYWxsIG90aGVyc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkJlaGF2aW9yIGltcGxlbWVudHMgQmVoYXZpb3I8UmVwbD5cclxue1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRvYXN0ZXI6IFRvYXN0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBleHRlbmQoY29udHJvbDogUmVwbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBub3RpZnkgPSBjb250cm9sLm5vdGlmeTtcclxuICAgICAgICBjb250cm9sLm5vdGlmeSA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0ZXIudG9hc3QobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi4vY29udHJvbHMvQ29sbGFnZVBhbmVsXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICogU2NhbGUgdGhlIGltYWdlXHJcbiAqIEBwYXJhbSBzY2FsZSBwZXJjZW50YWdlIGRlbHRhIGZyb20gY3VycmVudCBzY2FsZVxyXG4gKi9cclxuZnVuY3Rpb24gc2NhbGVJbWFnZShyZXBsOiBSZXBsLCBwYW5lbDogQ29sbGFnZVBhbmVsLCBzY2FsZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IHBhbmVsLmltYWdlO1xyXG4gICAgaWYgKCFub2RlKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS53aWR0aDtcclxuICAgICAgICBsZXQgc2NhbGUgPSBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDtcclxuICAgICAgICByZXBsLmFuaW1hdGlvbnMuYW5pbWF0ZShcInpvb21cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBzY2FsZSAqPSAxLjAxO1xyXG4gICAgICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gYCR7MTAwICogc2NhbGV9JWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBjb21wdXRlIGZvY2FsIHBvaW50IHRvIHpvb20gYWJvdXRcclxuICAgICAgICAvLyBsZXQgaW1hZ2VCb3ggPSBiYm94KG5vZGUpO1xyXG4gICAgICAgIC8vIGxldCBwYW5lbEJveCA9IGJib3gocGFuZWwucGFuZWwpO1xyXG4gICAgICAgIC8vIGxldCBmb2NhbFBvaW50ID0gWy1pbWFnZUJveC5sZWZ0ICsgcGFuZWxCb3gud2lkdGggLyAyLCAtaW1hZ2VCb3gudG9wICsgcGFuZWxCb3guaGVpZ2h0IC8gMl07XHJcbiAgICAgICAgbGV0IGVmZmVjdGl2ZVNjYWxlID0gcGFyc2VGbG9hdChzY2FsZSk7XHJcbiAgICAgICAgLy9ub2RlLnN0eWxlLndpZHRoID0gYCR7MTAwICogZWZmZWN0aXZlU2NhbGV9JWA7XHJcbiAgICAgICAgLy8gdGhlIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQgY2hhbmdlZCwgdHJhbnNsYXRlIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gICAgICAgIC8vIGNlbnRlciBiYWNrIHRvIHRoZSBwYW5lbCBjZW50ZXJcclxuICAgICAgICB0cmFuc2Zvcm0obm9kZSwgYHNjYWxlKCR7ZWZmZWN0aXZlU2NhbGV9LCR7ZWZmZWN0aXZlU2NhbGV9KWApO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjYWxlUGFuZWxDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NhbGU/OiBudW1iZXIpIHtcclxuICAgIH1cclxuICAgIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICAgICAgaWYgKCEhYXJncykge1xyXG4gICAgICAgICAgICBsZXQgW25vdW4sIG5vdW4yXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKG5vdW4pO1xyXG4gICAgICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHBhbmVsLnNjYWxlRnJhbWUobm91bjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLnNjYWxlRnJhbWUodGhpcy5zY2FsZSArIFwiXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NhbGVJbWFnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzY2FsZT86IG51bWJlcikge1xyXG4gICAgfVxyXG4gICAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgICAgICBpZiAoISFhcmdzKSB7XHJcbiAgICAgICAgICAgIGxldCBbaWQsIHNjYWxlXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgICAgICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBzY2FsZUltYWdlKHJlcGwsIHBhbmVsLCBzY2FsZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5zY2FsZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgICAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgcGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICAgICAgICBzY2FsZUltYWdlKHJlcGwsIHBhbmVsLCB0aGlzLnNjYWxlICsgXCJcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tIFwiLi9jb250cm9scy9Ub2FzdGVyXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IERyYWdBbmREcm9wIH0gZnJvbSBcIi4vY29udHJvbHMvRHJhZ0FuZERyb3BcIjtcclxuaW1wb3J0IHsgQ29tbWFuZHMgfSBmcm9tIFwiLi9jb250cm9scy9Db21tYW5kc1wiO1xyXG5pbXBvcnQgeyBIZWxwQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0hlbHBcIjtcclxuaW1wb3J0IHsgU3BsaXRDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvU3BsaXRDb21tYW5kXCI7XHJcbmltcG9ydCB7IEFzcGVjdFJhdGlvQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0FzcGVjdFJhdGlvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBCb3JkZXJDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQm9yZGVyQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBDaGFuZ2VTdHlsZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9DaGFuZ2VTdHlsZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgR290b0NvbW1hbmRFZGl0b3JDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvR290b0NvbW1hbmRFZGl0b3JDb21tYW5kXCI7XHJcbmltcG9ydCB7IFN3YXBQYW5lbHNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvU3dhcFBhbmVsc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgR290b0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Hb3RvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUZXh0Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RleHRDb21tYW5kXCI7XHJcbmltcG9ydCB7IFBhZENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9QYWRDb21tYW5kXCI7XHJcbmltcG9ydCB7IFRvZ2dsZVZpc2liaWxpdHlDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvVG9nZ2xlVmlzaWJpbGl0eUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgVHJhbnNsYXRlSW1hZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvVHJhbnNsYXRlQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNYXJnaW5Db21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvTWFyZ2luQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNZXJnZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9NZXJnZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgSGlSZXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvSGlSZXNDb21tYW5kXCI7XHJcbmltcG9ydCB7IE1vdmVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvTW92ZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgUm90YXRlUGFuZWxDb21tYW5kLCBSb3RhdGVJbWFnZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9DaGFuZ2VSb3RhdGlvbkNvbW1hbmRcIjtcclxuaW1wb3J0IHsgVHJhbnNsYXRlUGFuZWxDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlUG9zaXRpb25Db21tYW5kXCI7XHJcbmltcG9ydCB7IFN0b3BDb21tYW5kLCBUb2dnbGVGb2N1c0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9TdG9wQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZEhhbmRsZXJzIH0gZnJvbSBcIi4vY29udHJvbHMvS2V5Ym9hcmRIYW5kbGVyc1wiO1xyXG5pbXBvcnQgeyBFc2NhcGVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvRXNjYXBlQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9DaGFuZ2VGb250U2l6ZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgT3BlbkFsYnVtc0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9PcGVuQWxidW1zQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdG9yIH0gZnJvbSBcIi4vYmVoYXZpb3IvTXVsdGlTZWxlY3RvclwiO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25CZWhhdmlvciB9IGZyb20gXCIuL2JlaGF2aW9yL05vdGlmaWNhdGlvbkJlaGF2aW9yXCI7XHJcbmltcG9ydCB7IFNjYWxlUGFuZWxDb21tYW5kLCBTY2FsZUltYWdlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0NoYW5nZVNjYWxlQ29tbWFuZFwiO1xyXG5cclxuLyoqIGdsb2JhbCB2YXJpYWJsZXMgKi9cclxuY29uc3QgdG9hc3RlciA9IG5ldyBUb2FzdGVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9hc3RlclwiKSBhcyBIVE1MRWxlbWVudCk7XHJcbmNvbnN0IGNvbW1hbmRzID0gbmV3IENvbW1hbmRzKCk7XHJcbmNvbnN0IHJlcGwgPSBuZXcgUmVwbChjb21tYW5kcyk7XHJcbmNvbnN0IGtleWJvYXJkSGFuZGxlcnMgPSBuZXcgS2V5Ym9hcmRIYW5kbGVycygpO1xyXG5yZXBsLnVzZShuZXcgTXVsdGlTZWxlY3RvcigpKTtcclxucmVwbC51c2UobmV3IE5vdGlmaWNhdGlvbkJlaGF2aW9yKHRvYXN0ZXIpKTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBIZWxwQ29tbWFuZCgpLCB7IGtleTogXCI/XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBFc2NhcGVDb21tYW5kKCksIHsga2V5OiBcIkVzY2FwZVwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlRm9udFNpemVDb21tYW5kKDEpLCB7IGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQoLTEpLCB7IGtleTogXCItXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU2NhbGVQYW5lbENvbW1hbmQoMS4wMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZVBhbmVsQ29tbWFuZCgxIC8gMS4wMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCItXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZUltYWdlQ29tbWFuZCgxLjAxKSwgeyBrZXk6IFwiK1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU2NhbGVJbWFnZUNvbW1hbmQoMSAvIDEuMDEpLCB7IGtleTogXCItXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgUm90YXRlSW1hZ2VDb21tYW5kKDEpLCB7IGtleTogXCIuXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoLTEpLCB7IGtleTogXCIsXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVQYW5lbENvbW1hbmQoMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCI+XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVQYW5lbENvbW1hbmQoLTEpLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiPFwiIH0pO1xyXG5cclxuLyoqIHZpbSBjb21tYW5kc1xyXG5UbyBtb3ZlIGxlZnQsIHByZXNzIGguXHJcblRvIG1vdmUgcmlnaHQsIHByZXNzIGwuXHJcblRvIG1vdmUgZG93biwgcHJlc3Mgai5cclxuVG8gbW92ZSB1cCwgcHJlc3Mgay5cclxuICovXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVQYW5lbENvbW1hbmQoeyB4OiAtMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93TGVmdFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeDogMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93UmlnaHRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHk6IDEgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJBcnJvd0Rvd25cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHk6IC0xIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dVcFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCh7IHg6IC0xIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93TGVmdFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeDogMSB9KSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCJBcnJvd1JpZ2h0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB5OiAxIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93RG93blwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeTogLTEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dVcFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcInRvcFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ0b3BcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJUXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJsZWZ0XCIsIHsgZGVsdGE6IDEsIHVuaXRzOiBcInB4XCIgfSksIHsga2V5OiBcImxcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImxlZnRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJMXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3R0b21cIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiYlwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm90dG9tXCIsIHsgZGVsdGE6IC0xLCB1bml0czogXCJweFwiIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQlwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwicmlnaHRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiclwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwicmlnaHRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJSXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwid2lkdGhcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwid1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwid2lkdGhcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJXXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiaFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiaGVpZ2h0XCIsIHsgZGVsdGE6IC0xLCB1bml0czogXCJweFwiIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiSFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFN3YXBQYW5lbHNDb21tYW5kKCksIHsgY3RybEtleTogdHJ1ZSwga2V5OiBcInNcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFN0b3BDb21tYW5kKCksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIgXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBHb3RvQ29tbWFuZEVkaXRvckNvbW1hbmQoKSwgeyBrZXk6IFwiY1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVG9nZ2xlRm9jdXNDb21tYW5kKCksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIgXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUb2dnbGVGb2N1c0NvbW1hbmQoKSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCIgXCIgfSk7XHJcblxyXG5jb25zdCBkbmQgPSBuZXcgRHJhZ0FuZERyb3AocmVwbCwga2V5Ym9hcmRIYW5kbGVycyk7XHJcbnJlcGwuZG5kID0gZG5kO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBIZWxwQ29tbWFuZCgpLCBcIj9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgT3BlbkFsYnVtc0NvbW1hbmQoKSwgXCJvcGVuXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBBc3BlY3RSYXRpb0NvbW1hbmQoKSwgXCJhc3BlY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQm9yZGVyQ29tbWFuZCgpLCBcImJvcmRlclwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBHb3RvQ29tbWFuZCgpLCBcImdvdG9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgSGlSZXNDb21tYW5kKCksIFwiaGlyZXNcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgTWFyZ2luQ29tbWFuZCgpLCBcIm1hcmdpblwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNZXJnZUNvbW1hbmQoKSwgXCJtZXJnZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNb3ZlQ29tbWFuZCgpLCBcIm1vdmVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgUGFkQ29tbWFuZCgpLCBcInBhZFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoKSwgXCJyb3RhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU2NhbGVQYW5lbENvbW1hbmQoKSwgXCJzY2FsZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBTd2FwUGFuZWxzQ29tbWFuZCgpLCBcInN3YXBcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3BsaXRDb21tYW5kKCksIFwic3BsaXRcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3RvcENvbW1hbmQoKSwgXCJzdG9wXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFRleHRDb21tYW5kKCksIFwidGV4dFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoKSwgXCJ0cmFuc2xhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKCksIFwicGFuXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFNjYWxlSW1hZ2VDb21tYW5kKCksIFwiem9vbVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJiYWNrZ3JvdW5kQ29sb3JcIiksIFwiYmdjXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCh7IHNlbGVjdG9yOiBcIi5jb2xsYWdlIC5wYW5lbC1jb250YWluZXIgLm92ZXJsYXlcIiB9KSwgXCJvdmVybGF5XCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJDb2xvclwiKSwgXCJiY1wiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BDb2xvclwiKSwgXCJiY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tQ29sb3JcIiksIFwiYmNiXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckxlZnRDb2xvclwiKSwgXCJiY2xcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmlnaHRDb2xvclwiKSwgXCJiY3JcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlcldpZHRoXCIpLCBcImJ3XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckJvdHRvbVdpZHRoXCIpLCBcImJ3YlwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BXaWR0aFwiKSwgXCJid3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyTGVmdFdpZHRoXCIpLCBcImJ3bFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJSaWdodFdpZHRoXCIpLCBcImJ3clwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwib3BhY2l0eVwiKSwgXCJvcGFjaXR5XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclJhZGl1c1wiKSwgXCJiclwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCIpLCBcImJydGxcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIiksIFwiYnJ0clwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJCb3R0b21MZWZ0UmFkaXVzXCIpLCBcImJyYmxcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tUmlnaHRSYWRpdXNcIiksIFwiYnJiclwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwid2lkdGhcIiwgeyB1bml0czogXCJlbVwiIH0pLCBcIndpZHRoXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImhlaWdodFwiLCB7IHVuaXRzOiBcInB4XCIgfSksIFwiaGVpZ2h0XCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ6SW5kZXhcIiksIFwielwiKTtcclxuXHJcbnRvYXN0ZXIudG9hc3QoXCJXZWxjb21lIVwiKTtcclxuZXhwb3J0IGxldCBnbG9iYWxzID0ge1xyXG4gICAgYWxsb3dTcGVlY2hSZWNvZ25pdGlvbjogZmFsc2UsXHJcbiAgICBkZWJ1ZzogdHJ1ZSxcclxuICAgIHJlcGwsXHJcbiAgICBkbmQsXHJcbiAgICBrZXlib2FyZEhhbmRsZXJzLFxyXG59XHJcbiIsImltcG9ydCB7IExpc3RlbmVyIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gIGxldCByZXBsID0gZ2xvYmFscy5yZXBsO1xyXG4gIGF3YWl0IHJlcGwuc3RhcnR1cCgpO1xyXG4gIGlmIChnbG9iYWxzLmFsbG93U3BlZWNoUmVjb2duaXRpb24pIHtcclxuICAgIGxldCBsaXN0ZW5lciA9IG5ldyBMaXN0ZW5lcigpO1xyXG4gICAgbGlzdGVuZXIubGlzdGVuKCk7XHJcbiAgICBsaXN0ZW5lci5vbihcInNwZWVjaC1kZXRlY3RlZFwiLCB2YWx1ZSA9PiB7IHJlcGwuZXhlY3V0ZUNvbW1hbmQocmVwbC5wYXJzZUNvbW1hbmQodmFsdWUucmVzdWx0KSk7IH0pO1xyXG4gIH1cclxuICByZXBsLmdldFBob3RvT3ZlcmxheXMoKS5mb3JFYWNoKG92ZXJsYXkgPT4ge1xyXG4gICAgZ2xvYmFscy5kbmQuZHJhZ2dhYmxlKG92ZXJsYXkpO1xyXG4gICAgY29uc29sZS5sb2coYCR7b3ZlcmxheS5pbm5lckhUTUx9IGlzIGRyYWdnYWJsZWApO1xyXG4gIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IHN0YXJ0IH0gZnJvbSBcIi4vY29sbGFnZS9mdW4vc3RhcnRcIjtcclxuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gXCIuL2NvbGxhZ2UvZ2xvYmFsc1wiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gcnVuKCkge1xyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICBjb25zdCByZXBsID0gZ2xvYmFscy5yZXBsO1xyXG5cclxuICAgIHJlcGwuZXZhbChcImFzcGVjdCA2IDZcIik7XHJcbiAgICBpZiAoZ2xvYmFscy5kZWJ1Zykge1xyXG4gICAgICByZXBsLmV2YWwoXCI/XCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcInNwbGl0IDFcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgNCAzXCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcInNwbGl0IDJcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgNCA1XCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcIm1lcmdlIDIgM1wiKTtcclxuICAgICAgICAvLy9yZXBsLmV2YWwoXCJzcGxpdCAxXCIpO1xyXG5cclxuICAgICAgICByZXBsLmV2YWwoXCJidyAxZW1cIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYmMgd2hpdGVcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYmdjIHNpbHZlclwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzY2FsZSAxIDAuNzVcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiYm9yZGVyIDEgMyBzaWx2ZXJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwicm90YXRlIDEgLTJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiem9vbSAyIDAuNVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzcGxpdCAxXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcIm1lcmdlIDEgMlwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzcGxpdCA2XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcIm1lcmdlIDggOVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJtZXJnZSA2IDdcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiZ290byAxXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInRleHQgMSBTdW1tZXIgMjAxOVwiKTtcclxuXHJcbiAgICAgICAgYXdhaXQgcmVwbC5ldmFsKFwib3BlbiBEYXRlIE5pZ2h0LDIwMTlcIik7IC8vIHByZXNlbnQgbGlzdCBvZiBnb29nbGUgcGhvdG8gYWxidW1zP1xyXG4gICAgICAgIC8vYXdhaXQgcmVwbC5ldmFsKFwib3BlbiBncCAxOTk5XCIpOyAvLyBvcGVuIGdvb2dsZSBwaG90byBhbGJ1bSBcIjE5OTlcIj9cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbENvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb2xsYWdlIC5wYW5lbFwiKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBwaG90b0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb2xsYWdlIC5waG90b3MgLmltZ1wiKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhbmVsQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVwbC5ldmFsKGBtb3ZlICR7MSArIChpIC0gMSkgJSBwaG90b0NvdW50fSAke2l9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVwbC5ldmFsKFwib3BlbiAxXCIpO1xyXG4gICAgICAgICAgICAvLyByZXBsLmV2YWwoXCJoaXJlcyA2XCIpO1xyXG4gICAgICAgICAgICAvLyByZXBsLmV2YWwoXCJleHBvcnRcIik7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbnJ1bigpO1xyXG4iXX0=
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
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
    const units = "px em".split(" ");
    function hasUnits(value) {
        return units.some(v => value.endsWith(v));
    }
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
            const units = hasUnits(width) ? "" : "em";
            this.panel.style.border = `${width}${units} solid ${color}`;
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
        nameOf(command) {
            const keys = Object.keys(this.commands);
            const i = keys.findIndex(k => this.commands[k].execute === command.execute);
            return -1 < i ? keys[i] : null;
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
                key: (_d = match.key) !== null && _d !== void 0 ? _d : "",
                about: match.about || command.about && command.about()
            };
            this.keyboardHandlers.push({ match: fullMatch, command });
        }
        list() {
            return this.keyboardHandlers.map(h => ({
                command: h.command,
                key: this.keysAsString(h.match),
                about: h.match.about,
            }));
        }
        keysAsString(match) {
            let result = match.key;
            switch (result) {
                case " ":
                    result = "space";
                    break;
            }
            if (match.ctrlKey)
                result = "ctrl + " + result;
            if (match.altKey)
                result = "alt + " + result;
            if (match.shiftKey)
                result = "shift + " + result;
            return result;
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
                let panels = this.panels.filter((p) => 0 === getComputedStyle(p.panel).backgroundImage.indexOf(`url("`));
                console.log("loading", panels.length);
                panels.forEach((p) => {
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
            return this.panels.find((p) => p.overlay.dataset.id === id);
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
            this.panels
                .filter((p) => { var _a; return !!((_a = p === null || p === void 0 ? void 0 : p.panel) === null || _a === void 0 ? void 0 : _a.parentElement); })
                .forEach((p, i) => (p.overlay.dataset.id = p.overlay.innerText = i + 1 + ""));
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
            let childPanels = Array.from(document.querySelectorAll(".panel")).map((p) => new CollagePanel_1.CollagePanel(p));
            childPanels.forEach((c) => this.addBehaviors(c));
            this.panels.push(...childPanels);
            let cmd = document.querySelector(".console");
            cmd.onkeydown = (event) => {
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
            this.commandHistoryIndex = this.commandHistory.push(cmd);
            try {
                this.eval(cmd);
            }
            catch (ex) {
                this.notify(ex);
            }
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
    const textarea = document.createElement("textarea");
    function escape(value) {
        textarea.innerText = value;
        return textarea.value;
    }
    class HelpCommand {
        execute(repl, args) {
            const commands = globals_2.globals.repl.commands.list().map(name => ({ command: globals_2.globals.repl.commands.get(name), name }));
            const keyboardCommands = globals_2.globals.keyboardHandlers.list();
            const markup1 = commands.map(c => `<option value="${c.name}">"${c.name}" - ${c.command.about ? c.command.about() : "command"}</option>`).sort().join("");
            const markup2 = keyboardCommands.map((c, i) => `<option value="${c.key}">"${c.key}" - ${(c.about)}</code></option>`).sort().join("");
            const target = document.createElement("select");
            target.classList.add("help");
            target.innerHTML = `${markup1}${markup2}`;
            document.body.appendChild(target);
            target.addEventListener("change", () => {
                document.querySelector(".console").value = target.value;
            });
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
        about() {
            return `set the aspect ratio to W H`;
        }
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
        about() {
            return "set the border WIDTH COLOR of ID1 ID2 ...";
        }
        execute(repl, args) {
            const [width, color, ...ids] = args.split(" ").filter((v) => !!v);
            if (!width)
                throw "width required";
            if (!color)
                throw "color required";
            const targets = ids.length ? ids.map((id) => repl.selectPanel(id)) : repl.panels;
            targets.forEach((p) => p === null || p === void 0 ? void 0 : p.border(width, color));
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
        about() {
            return `change ${this.target}`;
        }
        keyboardHandler(repl) {
            return repl.panels
                .filter(p => p.panel.classList.contains("focus"))
                .some(panel => {
                var _a, _b, _c, _d;
                const target = panel.panel;
                const style = getComputedStyle(target);
                const value = parseFloat(style[this.target]) + ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.delta) !== null && _b !== void 0 ? _b : 0);
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
            const panels = repl.panels;
            const [value, ...ids] = args.split(" ");
            if (!value)
                throw "size required";
            const targets = (!ids.length) ? panels : ids.map(id => repl.selectPanel(id)).filter(v => !!v);
            if (!targets.length)
                return false;
            const units = !hasUnits(value) ? ((_a = this.options) === null || _a === void 0 ? void 0 : _a.units) || "" : "";
            targets.forEach(panel => {
                if (!panel)
                    return;
                panel.panel.style[this.target] = `${value}${units}`;
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
        about() {
            return "Swap Panel A B";
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
        about() {
            var _a, _b;
            let result = [];
            let x = ((_a = this.delta) === null || _a === void 0 ? void 0 : _a.x) || 0;
            let y = ((_b = this.delta) === null || _b === void 0 ? void 0 : _b.y) || 0;
            if (x > 0)
                result.push(`${x} px right`);
            if (x < 0)
                result.push(`${-x} px left`);
            if (y > 0)
                result.push(`${y} px up`);
            if (y < 0)
                result.push(`${-y} px down`);
            return `move image ${result.join(" and ")}`;
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
            const [...ids] = args.split(" ").map(v => v.trim()).filter(v => v.length);
            const targets = !ids.length ? repl.panels : ids.map(id => repl.selectPanel(id));
            targets.forEach(p => p && this.upgradeResolution(repl, p));
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
        about() {
            return `rotate panel by ${this.delta} deg`;
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
        about() {
            return `rotate image by ${this.delta} deg`;
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
        about() {
            let result = [];
            let x = this.delta.x || 0;
            let y = this.delta.y || 0;
            if (x > 0)
                result.push(`${x} px right`);
            if (x < 0)
                result.push(`${-x} px left`);
            if (y > 0)
                result.push(`${y} px up`);
            if (y < 0)
                result.push(`${-y} px down`);
            return `move panel ${result.join(" and ")}`;
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
        about() { return "Stop Animations"; }
        execute(repl, args) {
            if (!repl.animations.animations.length)
                return false;
            repl.animations.stop(args);
        }
    }
    exports.StopCommand = StopCommand;
    class ToggleFocusCommand {
        about() { return "Toggle focus"; }
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
    var _units;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChangeFontSizeCommand = void 0;
    class ChangeFontSizeCommand {
        constructor(delta, options = {
            units: "px",
        }) {
            this.delta = delta;
            this.options = options;
            _units.set(this, void 0);
            __classPrivateFieldSet(this, _units, (options === null || options === void 0 ? void 0 : options.units) || "px");
        }
        about() {
            return this.delta > 0 ? `increase font by ${this.delta}${__classPrivateFieldGet(this, _units)}` : `decrease font by ${-this.delta}${__classPrivateFieldGet(this, _units)}`;
        }
        isLabel(element) {
            if (!element)
                return false;
            return element.classList.contains("label");
        }
        execute(repl, args) {
            const label = document.activeElement;
            if (!this.isLabel(label))
                return false;
            const fontSize = parseFloat(getComputedStyle(label).fontSize);
            label.style.fontSize = `${fontSize + this.delta}${__classPrivateFieldGet(this, _units)}`;
        }
    }
    exports.ChangeFontSizeCommand = ChangeFontSizeCommand;
    _units = new WeakMap();
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
        about() {
            return `scale panel by ${(this.scale || 0).toFixed(3)}`;
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
        about() {
            return `scale image by ${(this.scale || 0).toFixed(3)}`;
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
    keyboardHandlers.addEventHandler(new Help_1.HelpCommand(), { key: "?", about: "Help" });
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
    keyboardHandlers.addEventHandler(new GotoCommandEditorCommand_1.GotoCommandEditorCommand(), { key: "c", about: "goto commands" });
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
    commands.add(new ChangeStyleCommand_1.ChangeStyleCommand("borderWidth", { units: "px" }), "bw");
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
            return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xsYWdlL21vZGVscy9EaWN0aW9uYXJ5LnRzIiwiY29sbGFnZS9jb250cm9scy9MaXN0ZW5lci50cyIsImNvbGxhZ2UvY29udHJvbHMvVG9hc3Rlci50cyIsImNvbGxhZ2UvZnVuL3RhaWwudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRQYXJzZXIudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQaG90by50cyIsImNvbGxhZ2UvbW9kZWxzL0dvb2dsZU1lZGlhSXRlbS50cyIsImNvbGxhZ2UvY29udHJvbHMvR29vZ2xlQ29sbGFnZVBob3RvLnRzIiwiY29sbGFnZS9jb250cm9scy9TcHJpdGUudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbC50cyIsImNvbGxhZ2UvY29udHJvbHMvQW5pbWF0aW9ucy50cyIsImNvbGxhZ2UvbW9kZWxzL0NvbW1hbmQudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRzLnRzIiwiY29sbGFnZS9mdW4vZ2V0QWN0aXZlT3ZlcmxheS50cyIsImNvbGxhZ2UvbW9kZWxzL0tleWJvYXJkSGFuZGxlci50cyIsImNvbGxhZ2UvY29udHJvbHMvS2V5Ym9hcmRIYW5kbGVycy50cyIsImNvbGxhZ2UvZnVuL3RyYW5zZm9ybS50cyIsImNvbGxhZ2UvZnVuL2Jib3gudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0RyYWdBbmREcm9wLnRzIiwiY29sbGFnZS9tb2RlbHMvQmVoYXZpb3IudHMiLCJjb2xsYWdlL2NvbnRyb2xzL1JlcGwudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hlbHAudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1NwbGl0Q29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQXNwZWN0UmF0aW9Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Cb3JkZXJDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTdHlsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvZ2V0Rm9jdXNQYW5lbHMudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Hb3RvQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvVGV4dENvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1BhZENvbW1hbmQudHMiLCJjb2xsYWdlL2Z1bi9pc1Zpc2libGUudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9UcmFuc2xhdGVDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NYXJnaW5Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NZXJnZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hpUmVzQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvTW92ZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0NoYW5nZVJvdGF0aW9uQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlUG9zaXRpb25Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9TdG9wQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvRXNjYXBlQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlUGhvdG9BUEkudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3RvU2lnbmluLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlQWxidW0udHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3Rvcy50cyIsImNvbGxhZ2UvY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmQudHMiLCJjb2xsYWdlL2JlaGF2aW9yL011bHRpU2VsZWN0b3IudHMiLCJjb2xsYWdlL2JlaGF2aW9yL05vdGlmaWNhdGlvbkJlaGF2aW9yLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2dsb2JhbHMudHMiLCJjb2xsYWdlL2Z1bi9zdGFydC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0NBOztPQUVHO0lBQ0gsTUFBYSxRQUFRO1FBSW5CO1lBRkEsWUFBTyxHQUFZLElBQUksQ0FBQztZQUN4QixjQUFTLEdBQVksSUFBSSxDQUFDO1lBa0NsQixlQUFVLEdBR0gsRUFBRSxDQUFDO1lBbkNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQVUsTUFBTyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsQ0FBQztZQUNsRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ25DLFdBQVcsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQ25DLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQy9CLFdBQVcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQzNCLFdBQVcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVM7b0JBQ2hCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLEtBQUssSUFBSSxDQUFDLEdB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SUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRTNHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHdDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDOUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDOUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDN0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUU1RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDekcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxSCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzSCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDNUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM3SCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUs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QUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEIsNkJBQTZCO1lBQzdCLGtDQUFrQztZQUNsQyw0QkFBNEI7WUFDNUIsMkJBQTJCO1lBQzNCLHdCQUF3QjtZQUN4QiwwQkFBMEI7WUFDMUIsd0JBQXdCO1lBQ3hCLDBCQUEwQjtZQUMxQiwwQkFBMEI7WUFDMUIsdUJBQXVCO1lBQ3ZCLG1DQUFtQztZQUMzQyxPQUFPO1lBQ0MsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyx1Q0FBdUM7WUFDaEYscUVBQXFFO1lBRXJFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNyRSxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQzNFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3REO2dCQUNELHVCQUF1QjtnQkFDdkIsd0JBQXdCO2dCQUN4Qix1QkFBdUI7WUFDM0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1o7SUFDTCxDQUFDO0lBRUQsR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogT25lIGJpZyBoYXBweSBmYW1pbHkgb2YgY2xhc3NlcyB0byBhdm9pZCBsb2FkaW5nXHJcbiAqIGFuZCBjb25jYXRpbmF0aW9uXHJcbiAqL1xyXG4vKiogSW50ZXJmYWNlcyAgKi9cclxuZXhwb3J0IGludGVyZmFjZSBEaWN0aW9uYXJ5PFQ+IHtcclxuICBbS2V5OiBzdHJpbmddOiBUO1xyXG59XHJcbiIsImltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tIFwiLi4vbW9kZWxzL0RpY3Rpb25hcnlcIjtcclxuLyoqXHJcbiAqIEdvb2dsZSBzcGVlY2ggcmVjb2duaXRpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBMaXN0ZW5lciB7XHJcbiAgcmVjb2duaXRpb246IFNwZWVjaFJlY29nbml0aW9uO1xyXG4gIHN0b3BwZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGF1dG9zdGFydDogYm9vbGVhbiA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJlY29nbml0aW9uID0gbmV3ICg8YW55PndpbmRvdylbXCJ3ZWJraXRTcGVlY2hSZWNvZ25pdGlvblwiXSgpO1xyXG4gICAgbGV0IHJlY29nbml0aW9uID0gdGhpcy5yZWNvZ25pdGlvbjtcclxuICAgIHJlY29nbml0aW9uLmludGVyaW1SZXN1bHRzID0gZmFsc2U7XHJcbiAgICByZWNvZ25pdGlvbi5jb250aW51b3VzID0gZmFsc2U7XHJcbiAgICByZWNvZ25pdGlvbi5sYW5nID0gXCJlbi1QSFwiO1xyXG4gICAgcmVjb2duaXRpb24ubWF4QWx0ZXJuYXRpdmVzID0gNTtcclxuICAgIHJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJzdGFydFwiLCBlID0+IHtcclxuICAgICAgdGhpcy5zdG9wcGVkID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRcIiwgZSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5hdXRvc3RhcnQpXHJcbiAgICAgICAgcmVjb2duaXRpb24uc3RhcnQoKTtcclxuICAgIH0pO1xyXG4gICAgcmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcInJlc3VsdFwiLCBlID0+IHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlLnJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gZS5yZXN1bHRzW2ldO1xyXG4gICAgICAgIGlmIChyZXN1bHQuaXNGaW5hbCkge1xyXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zY3JpcHQgPSByZXN1bHRbal0udHJhbnNjcmlwdDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codHJhbnNjcmlwdCwgcmVzdWx0W2pdKTtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZGVuY2UgPSByZXN1bHRbal0uY29uZmlkZW5jZTtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwic3BlZWNoLWRldGVjdGVkXCIsIHtcclxuICAgICAgICAgICAgICByZXN1bHQ6IHRyYW5zY3JpcHQsXHJcbiAgICAgICAgICAgICAgcG93ZXI6IGNvbmZpZGVuY2UgKiAxMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBwcml2YXRlIF9jYWxsYmFja3M6IERpY3Rpb25hcnk8QXJyYXk8KHZhbHVlOiB7XHJcbiAgICByZXN1bHQ6IHN0cmluZztcclxuICAgIHBvd2VyOiBudW1iZXI7XHJcbiAgfSkgPT4gdm9pZD4+ID0ge307XHJcbiAgcHJpdmF0ZSBjYWxsYmFja3ModG9waWM6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1t0b3BpY10gPSB0aGlzLl9jYWxsYmFja3NbdG9waWNdID8/IFtdO1xyXG4gIH1cclxuICBvbih0b3BpYzogc3RyaW5nLCBjYjogKHZhbHVlOiB7XHJcbiAgICByZXN1bHQ6IHN0cmluZztcclxuICAgIHBvd2VyOiBudW1iZXI7XHJcbiAgfSkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5jYWxsYmFja3ModG9waWMpLnB1c2goY2IpO1xyXG4gIH1cclxuICB0cmlnZ2VyKHRvcGljOiBzdHJpbmcsIHZhbHVlOiB7XHJcbiAgICByZXN1bHQ6IHN0cmluZztcclxuICAgIHBvd2VyOiBudW1iZXI7XHJcbiAgfSkge1xyXG4gICAgdGhpcy5jYWxsYmFja3ModG9waWMpLmZvckVhY2goY2IgPT4gY2IodmFsdWUpKTtcclxuICB9XHJcbiAgbGlzdGVuKCkge1xyXG4gICAgaWYgKHRoaXMuc3RvcHBlZClcclxuICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCBtZXNzYWdlRHVyYXRpb24gPSA1MDAwO1xyXG5jb25zdCBmYWRlRGVsYXkgPSAxNTAwO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmFkZU91dChub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChnb29kLCBiYWQpID0+IHtcclxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoXCJmYWRlLW91dFwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGdvb2Qobm9kZSksIGZhZGVEZWxheSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvYXN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRhcmdldDogSFRNTEVsZW1lbnQpIHsgXHJcbiAgICAgICAgQXJyYXkuZnJvbSh0YXJnZXQucXVlcnlTZWxlY3RvckFsbChcIi50b2FzdFwiKSkubWFwKHQgPT4gdGhpcy5kZXN0cm95VG9hc3QodCBhcyBIVE1MRWxlbWVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0KG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlLW91dFwiKTtcclxuICAgICAgICBsZXQgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRvYXN0LmNsYXNzTGlzdC5hZGQoXCJ0b2FzdFwiKTtcclxuICAgICAgICB0b2FzdC5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0Lmluc2VydEJlZm9yZSh0b2FzdCwgdGhpcy50YXJnZXQuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kZXN0cm95VG9hc3QodG9hc3QpLCBtZXNzYWdlRHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRlc3Ryb3lUb2FzdCh0b2FzdDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBhd2FpdCBmYWRlT3V0KHRvYXN0KTtcclxuICAgICAgICB0b2FzdC5yZW1vdmUoKTtcclxuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIudG9hc3RcIikpIGZhZGVPdXQodGhpcy50YXJnZXQpO1xyXG4gICAgfVxyXG59IiwiLyoqIEdsb2JhbCBGdW5jdGlvbnMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRhaWwodmFsdWU6IHN0cmluZykge1xyXG4gIGxldCBsaXN0ID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xyXG4gIGxpc3Quc2hpZnQoKTtcclxuICByZXR1cm4gbGlzdC5qb2luKFwiIFwiKTtcclxufVxyXG4iLCIvKiogR2xvYmFsIENsYXNzZXMgKi9cclxuLyoqXHJcbiAqIFRyeSB0byB0dXJuIGEgc3Bva2VuIHBocmFzZSBpbnRvIGEgY29tbWFuZCBncmFtbWFyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tbWFuZFBhcnNlciB7XHJcbiAgcGFyc2VQaHJhc2UocGhyYXNlOiBzdHJpbmcpIHtcclxuICAgIHBocmFzZSA9IHBocmFzZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IG1hcCA9IDxhbnk+e1xyXG4gICAgICBcInpvb20gaW5cIjogXCJ6b29tXCIsXHJcbiAgICAgIFwiem9vbSBvdXRcIjogXCJ6b29tXCIsXHJcbiAgICAgIFwiZHJhZ1wiOiBcInBhblwiLFxyXG4gICAgICBcIm51bWJlciBmb3JcIjogXCI0XCIsXHJcbiAgICAgIFwibnVtYmVyXCI6IFwiXCIsXHJcbiAgICAgIFwiZnJhbWVcIjogXCJcIixcclxuICAgICAgXCJwaG90b1wiOiBcIlwiLFxyXG4gICAgICBcIm9uZVwiOiBcIjFcIixcclxuICAgICAgXCJ0d29cIjogXCIyXCIsXHJcbiAgICAgIFwidGhyZWVcIjogXCIzXCIsXHJcbiAgICAgIFwiZm91clwiOiBcIjRcIixcclxuICAgICAgXCJmaXZlXCI6IFwiNVwiLFxyXG4gICAgICBcInNpeFwiOiBcIjZcIixcclxuICAgICAgXCJzZXZlblwiOiBcIjdcIixcclxuICAgICAgXCJlaWdodFwiOiBcIjhcIixcclxuICAgICAgXCJuaW5lXCI6IFwiOVwiLFxyXG4gICAgICBcImludG9cIjogXCJcIixcclxuICAgICAgXCJvblwiOiBcIlwiLFxyXG4gICAgICBcImFuZFwiOiBcIlwiLFxyXG4gICAgICBcInBpY3R1cmVcIjogXCJcIixcclxuICAgICAgXCJnbyB0b1wiOiBcImdvdG9cIixcclxuICAgICAgXCItXCI6IFwiIFwiLFxyXG4gICAgfTtcclxuICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaCh2ID0+IHBocmFzZSA9IHBocmFzZS5yZXBsYWNlKHYsIG1hcFt2XSkpO1xyXG4gICAgbGV0IHRva2VucyA9IHBocmFzZS5zcGxpdChcIiBcIik7XHJcbiAgICB0b2tlbnMgPSB0b2tlbnMubWFwKHYgPT4gbWFwW3ZdID8/IHYpLmZpbHRlcih2ID0+ICEhdik7XHJcbiAgICByZXR1cm4gdG9rZW5zLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogS2VlcHMgdGhlIGdvb2dsZSBtZWRpYSBpbmZvIGFuZCBoYXMgaGVscGVyIGZ1bmN0aW9uc1xyXG4gKiB0byB1cGdyYWRlIHRoZSBsby1yZXMgdG8gaGktcmVzIHZlcnNpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2xsYWdlUGhvdG88VE1lZGlhSW5mbz4ge1xyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlTWVkaWFJdGVtIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgcHJvZHVjdFVybDogc3RyaW5nO1xyXG4gIGJhc2VVcmw6IHN0cmluZztcclxuICBtaW1lVHlwZTogc3RyaW5nO1xyXG4gIG1lZGlhTWV0YWRhdGE6IGFueTtcclxuICBjb250cmlidXRvckluZm86IGFueTtcclxuICBmaWxlbmFtZTogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IENvbGxhZ2VQaG90byB9IGZyb20gXCIuL0NvbGxhZ2VQaG90b1wiO1xyXG5pbXBvcnQgeyBHb29nbGVNZWRpYUl0ZW0gfSBmcm9tIFwiLi4vbW9kZWxzL0dvb2dsZU1lZGlhSXRlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUNvbGxhZ2VQaG90byBleHRlbmRzIENvbGxhZ2VQaG90bzxHb29nbGVNZWRpYUl0ZW0+IHtcclxuICBwdWJsaWMgaW1nOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhSW5mbzogR29vZ2xlTWVkaWFJdGVtKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgbGV0IGltZyA9IHRoaXMuaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiaW1nXCIpO1xyXG4gICAgaW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt0aGlzLm1lZGlhSW5mby5iYXNlVXJsfSlgO1xyXG4gICAgaW1nLnRpdGxlID0gbWVkaWFJbmZvLmZpbGVuYW1lO1xyXG4gIH1cclxuICBcclxuICByZW5kZXJJbnRvKHRhcmdldDogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmltZyk7XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBuZXcgR29vZ2xlQ29sbGFnZVBob3RvKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tZWRpYUluZm8pKSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBNYW5hZ2VzIGltYWdlIHN0eWxlLnRyYW5zZm9ybSBieSBwZXJzaXN0aW5nXHJcbiAqIHRoZSBzY2FsZSBhbmQgcm90YXRpb24gdG8gZmFjaWxpdGF0ZSBjb21wdXRpbmcgdHJhbnNmb3Jtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNwcml0ZSB7XHJcbiAgcHVibGljIHg6IG51bWJlcjtcclxuICBwdWJsaWMgeTogbnVtYmVyO1xyXG4gIHB1YmxpYyByOiBudW1iZXI7XHJcbiAgcHVibGljIHM6IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQpIHtcclxuICAgIHRoaXMueCA9IHRoaXMueSA9IHRoaXMuciA9IDA7XHJcbiAgICB0aGlzLnMgPSAxO1xyXG4gIH1cclxuICB0cmFuc2Zvcm0oYXJnczoge1xyXG4gICAgZHg/OiBudW1iZXI7XHJcbiAgICBkeT86IG51bWJlcjtcclxuICAgIHNjYWxlPzogbnVtYmVyO1xyXG4gICAgYW5nbGU/OiBudW1iZXI7XHJcbiAgfSkge1xyXG4gICAgdGhpcy54ICs9IChhcmdzLmR4IHx8IDApO1xyXG4gICAgdGhpcy55ICs9IChhcmdzLmR5IHx8IDApO1xyXG4gICAgdGhpcy5yICs9IChhcmdzLmFuZ2xlIHx8IDApO1xyXG4gICAgdGhpcy5zICo9IChhcmdzLnNjYWxlIHx8IDEuMCk7XHJcbiAgICB0aGlzLmltYWdlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLnh9cHgsJHt0aGlzLnl9cHgpIHJvdGF0ZSgke3RoaXMucn1kZWcpIHNjYWxlKCR7dGhpcy5zfSlgO1xyXG4gIH1cclxuICB0cmFuc2xhdGUoZHg6IG51bWJlciwgZHk6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgZHgsIGR5IH0pO1xyXG4gIH1cclxuICByb3RhdGUoYW5nbGU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgYW5nbGUgfSk7XHJcbiAgfVxyXG4gIHNjYWxlKHNjYWxlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IHNjYWxlIH0pO1xyXG4gIH1cclxuICAvLyBtb2RpZnkgdGhlIHBpeGVsIGRlbnNpdHkgb2YgdGhlIGltYWdlXHJcbiAgLy8gdXNlZnVsIHdoZW4gdXNpbmcgZ29vZ2xlIHBob3RvcyBBUEkgdG8gXHJcbiAgLy8gcmVxdWVzdCBoaWdoZXIgcmVzb2x1dGlvbiBwaG90b3NcclxuICB1cHNjYWxlKHNjYWxlOiBudW1iZXIpIHtcclxuICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5pbWFnZSk7XHJcbiAgICBsZXQgd2lkdGggPSBwYXJzZUZsb2F0KHN0eWxlLndpZHRoKTtcclxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUZsb2F0KHN0eWxlLmhlaWdodCk7XHJcbiAgICB0aGlzLnNjYWxlKDEgLyBzY2FsZSk7XHJcbiAgICB0aGlzLmltYWdlLnN0eWxlLndpZHRoID0gc2NhbGUgKiB3aWR0aCArIFwicHhcIjtcclxuICAgIHRoaXMuaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gc2NhbGUgKiBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZSh3aWR0aCAvIDIgLSB3aWR0aCAqIHNjYWxlIC8gMiwgaGVpZ2h0IC8gMiAtIGhlaWdodCAqIHNjYWxlIC8gMik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEdvb2dsZUNvbGxhZ2VQaG90byB9IGZyb20gXCIuL0dvb2dsZUNvbGxhZ2VQaG90b1wiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9TcHJpdGVcIjtcclxuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gXCIuLi9nbG9iYWxzXCI7XHJcblxyXG5jb25zdCB1bml0cyA9IFwicHggZW1cIi5zcGxpdChcIiBcIik7XHJcblxyXG5mdW5jdGlvbiBoYXNVbml0cyh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHVuaXRzLnNvbWUodiA9PiB2YWx1ZS5lbmRzV2l0aCh2KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2VzIGEgc2luZ2xlIGltYWdlIG9uIHRoZSBjb2xsYWdlLFxyXG4gKiBub3QgdG8gYmUgY29uZnVzZWQgd2l0aCBhbiBQaG90byBvbiB0aGUgYWxidW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2xsYWdlUGFuZWwge1xyXG5cclxuICAvKipcclxuICAgKiBBIHBhbmVsIGNvbnRhaW5zIGEgc2luZ2xlIHBob3RvICh0aGlzIG9uZSlcclxuICAgKi9cclxuICBwdWJsaWMgcGhvdG86IEdvb2dsZUNvbGxhZ2VQaG90byB8IG51bGw7XHJcblxyXG4gIC8vIHRoZSBhY3R1YWwgaW1hZ2UgcmVuZGVyZWQgb24gdGhlIHBhbmVsXHJcbiAgcHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHB1YmxpYyBzcHJpdGU6IFNwcml0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGFuZWwgZG9tIGVsZW1lbnQgdG8gY29udHJvbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYW5lbDogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgIHRoaXMucGhvdG8gPSBudWxsO1xyXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUodGhpcy5pbWFnZSk7XHJcbiAgICB0aGlzLmltYWdlLmNsYXNzTGlzdC5hZGQoXCJpbWdcIik7XHJcbiAgICB0aGlzLmltYWdlLmRyYWdnYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmltYWdlKTtcclxuICAgIHRoaXMuYXNQYW5lbCh0aGlzLnBhbmVsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBwaG90byByZW5kZXJzIHRoaXMgcGhvdG8gb250byB0aGUgcGFuZWxcclxuICAgKi9cclxuICBhZGRQaG90byhwaG90bzogR29vZ2xlQ29sbGFnZVBob3RvKSB7XHJcbiAgICB0aGlzLnBob3RvID0gcGhvdG87XHJcbiAgICB0aGlzLnNldEJhY2tncm91bmRJbWFnZShwaG90by5tZWRpYUluZm8uYmFzZVVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb21wdXRlcyB0aGUgd2lkdGggb2YgdGhlIHBob3RvIGRpc3BsYXkgYXJlYVxyXG4gICAqL1xyXG4gIGdldCBwaG90b1dpZHRoKCkge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuaW1hZ2UpLndpZHRoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbXB1dGVzIHRoZSBoZWlnaHQgb2YgdGhlIHBob3RvIGRpc3BsYXkgYXJlYVxyXG4gICAqL1xyXG4gIGdldCBwaG90b0hlaWdodCgpIHtcclxuICAgIHJldHVybiBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmltYWdlKS5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29tcHV0ZXMgdGhlIHNjYWxlIG9mIHRoZSBwaG90bywgYXNzdW1lcyBhc3BlY3QgcmF0aW8gaXMgcHJlc2VydmVkIChhdCBsZWFzdCB0aGUgd2lkdGggb3IgaGVpZ2h0IGlzICdhdXRvJylcclxuICAgKi9cclxuICBnZXQgcGhvdG9TY2FsZSgpIHtcclxuICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuaW1hZ2UpO1xyXG4gICAgbGV0IHNjYWxlID0gc3R5bGUuaGVpZ2h0O1xyXG4gICAgaWYgKHNjYWxlID09PSBcImF1dG9cIikgcmV0dXJuIDEuMDtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxlKSAvIDEwMC4wO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJuIHRoZSBwYW5lbCBvdmVybGF5IChkb2VzIG5vdCBiZWxvbmcgaGVyZSlcclxuICAgKi9cclxuICBnZXQgb3ZlcmxheSgpIHtcclxuICAgIHJldHVybiB0aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgdGV4dCBhcyBhbiBpbnB1dCBjb250cm9sIG9uIHRoZSBwYW5lbFxyXG4gICAqIExhYmVsIGlzIGFic29sdXRlbHkgcG9zaXRpb25lZCBhbmQgY2FuIG1vdmUgb3V0c2lkZSB0aGUgYm91bmRzIG9mIHRoaXMgcGFuZWxcclxuICAgKiBzbyBwcm9iYWJseSBkb2Vzbid0IGJlbG9uZyBoZXJlXHJcbiAgICovXHJcbiAgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG4gICAgbGFiZWwucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgbGFiZWwudGl0bGUgPSBcIjFcIjtcclxuICAgIGxhYmVsLnN0eWxlLnRvcCA9IGxhYmVsLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoXCJsYWJlbFwiKTtcclxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgbGFiZWwudmFsdWUgPSB2YWx1ZTtcclxuICAgIGdsb2JhbHMuZG5kLm1vdmVhYmxlKGxhYmVsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgcGFuZWwgZnJvbSB0aGUgZG9tXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMucGFuZWwucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICpcclxuICogQHBhcmFtIGJhY2tncm91bmRJbWFnZSB0aGUgdXJsIG9mIHRoZSBpbWFnZSB0byBkaXNwbGF5IGluIHRoaXMgcGFuZWxcclxuICovXHJcbiAgc2V0QmFja2dyb3VuZEltYWdlKGJhY2tncm91bmRJbWFnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmltYWdlLnNyYyA9IGJhY2tncm91bmRJbWFnZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0eWxlIHRoZSBmcmFtZVxyXG4gICAqIEBwYXJhbSB3aWR0aCBib3JkZXIgd2lkdGggaW4gXCJlbVwiXHJcbiAgICovXHJcbiAgYm9yZGVyKHdpZHRoOiBzdHJpbmcsIGNvbG9yID0gXCJ3aGl0ZVwiKSB7XHJcbiAgICBjb25zdCB1bml0cyA9IGhhc1VuaXRzKHdpZHRoKSA/IFwiXCIgOiBcImVtXCI7XHJcbiAgICB0aGlzLnBhbmVsLnN0eWxlLmJvcmRlciA9IGAke3dpZHRofSR7dW5pdHN9IHNvbGlkICR7Y29sb3J9YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUm90YXRlIHRoZSBhY3R1YWwgZnJhbWVcclxuICAqIEBwYXJhbSBhbmdsZSBhbmdsZSBpbiBkZWdyZWVzXHJcbiAgKi9cclxuICByb3RhdGVGcmFtZShhbmdsZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IHRoaXMucGFuZWw7XHJcbiAgICBpZiAoIW5vZGUpXHJcbiAgICAgIHJldHVybjtcclxuICAgIGlmICghIWFuZ2xlKSB7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtX25vZGUoYHJvdGF0ZSgke2FuZ2xlfWRlZylgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgYW5nbGUgPSAwO1xyXG4gICAgICBsZXQgdHJhbnNmb3JtID0gbm9kZS5zdHlsZS50cmFuc2Zvcm07XHJcbiAgICAgIGxldCBhbmltYXRpb25zID0gZ2xvYmFscy5yZXBsLmFuaW1hdGlvbnM7XHJcbiAgICAgIGFuaW1hdGlvbnMuYW5pbWF0ZShcInJvdGF0ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgYW5nbGUgKz0gMTtcclxuICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybSArIGAgcm90YXRlKCR7YW5nbGV9ZGVnKWA7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2NhbGVGcmFtZShzY2FsZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRyYW5zZm9ybV9ub2RlKGBzY2FsZSgke3NjYWxlfSwgJHtzY2FsZX0pYCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybV9ub2RlKHY6IHN0cmluZykge1xyXG4gICAgbGV0IG5vZGUgPSB0aGlzLnBhbmVsO1xyXG4gICAgbGV0IHRyYW5zZm9ybSA9IChub2RlLnN0eWxlLnRyYW5zZm9ybSB8fCBcIlwiKS5zcGxpdChcIiBcIik7XHJcbiAgICB0cmFuc2Zvcm0udW5zaGlmdCh2KTtcclxuICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuICBwcml2YXRlIGFzUGFuZWwoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBhbmVsXCIpO1xyXG4gICAgZWxlbWVudC50YWJJbmRleCA9IDE7XHJcbiAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBydW5zIGFuIGFuaW1hdGlvbiBvbiBhbiBpbnRlcnZhbCwgcmV0dXJucyBzdG9wKClcclxuICogVXNlZCBmb3IgcGFubmluZywgem9vbWluZywgcm90YXRpbmdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25zIHtcclxuICBhbmltYXRpb25zOiBBcnJheTx7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBoYW5kbGU6IG51bWJlcjtcclxuICB9PiA9IFtdO1xyXG4gIFxyXG4gIHN0b3AodHlwZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgYW5pbWF0aW9ucyA9IHRoaXMuYW5pbWF0aW9ucy5tYXAodiA9PiB2KTsgLy9jbG9uZVxyXG4gICAgYW5pbWF0aW9ucy5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcbiAgICAgIGlmICghdHlwZSB8fCB2LnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHYuaGFuZGxlKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFuaW1hdGUodHlwZTogc3RyaW5nLCBjYjogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5hbmltYXRpb25zLnB1c2goeyB0eXBlLCBoYW5kbGU6IHNldEludGVydmFsKGNiLCAxMDApIH0pO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmQge1xyXG4gIGFib3V0PygpOiBzdHJpbmc7XHJcbiAgLy8gcmV0dXJuIGZhbHNlIHRvIHNpZ25hbCB0aGUgY29tbWFuZCB3YXMgbm90IGhhbmRsZWRcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcpOiB2b2lkIHwgZmFsc2UgfCBQcm9taXNlPHZvaWQgfCBmYWxzZT47XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tIFwiLi4vbW9kZWxzL0RpY3Rpb25hcnlcIjtcclxuXHJcbi8qKlxyXG4gKiBLZWVwcyBoYXNoIG9mIGNvbW1hbmRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tbWFuZHMge1xyXG4gICAgbmFtZU9mKGNvbW1hbmQ6IENvbW1hbmQpIHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpO1xyXG4gICAgICBjb25zdCBpID0ga2V5cy5maW5kSW5kZXgoayA9PiB0aGlzLmNvbW1hbmRzW2tdLmV4ZWN1dGUgPT09IGNvbW1hbmQuZXhlY3V0ZSk7XHJcbiAgICAgIHJldHVybiAtMTxpID8ga2V5c1tpXTpudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29tbWFuZHM6IERpY3Rpb25hcnk8Q29tbWFuZD4gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIHRoZSBjb21tYW5kIGFzc29jaWF0ZWQgd2l0aCB0aGUgYWN0aW9uIGtleXdvcmRcclxuICAgICAqIEBwYXJhbSB2ZXJiIHRoZSBmdWxsIG5hbWUgb2YgdGhlIGFjdGlvbiBrZXl3b3JkIG9yIGEgcGFydGlhbCBtYXRjaFxyXG4gICAgICovXHJcbiAgICBnZXQodmVyYjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tbWFuZHNbdmVyYl0pIHJldHVybiB0aGlzLmNvbW1hbmRzW3ZlcmJdO1xyXG4gICAgICAgIHZhciBrZXkgPSBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKS5maW5kKHYgPT4gdi5zdGFydHNXaXRoKHZlcmIpKTtcclxuICAgICAgICByZXR1cm4ga2V5ICYmIHRoaXMuY29tbWFuZHNba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMvcmVwbGFjZXMgY29tbWFuZCBhc3NvY2lhdGVkIHdpdGggYW4gYWN0aW9uIGtleXdvcmRcclxuICAgICAqIEBwYXJhbSBjb21tYW5kIGNvbW1hbmQgdG8gcHJvY2VzcyB0aGUgYWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gdmVyYiBhY3Rpb24gdG8gYXNzb2NpYXRlIHdpdGggYSBjb21tYW5kXHJcbiAgICAgKi9cclxuICAgIGFkZChjb21tYW5kOiBDb21tYW5kLCB2ZXJiOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbW1hbmRzW3ZlcmJdID0gY29tbWFuZDtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0KCkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5jb21tYW5kcyk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVPdmVybGF5KCkge1xyXG4gIGxldCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgaWYgKCFhY3RpdmVQYW5lbCkge1xyXG4gICAgY29uc29sZS5sb2coXCJubyBhY3RpdmUgcGFuZWxcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHJldHVybiBhY3RpdmVQYW5lbC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIikgYXMgSFRNTEVsZW1lbnQ7XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBLZXlib2FyZEhhbmRsZXIge1xyXG4gIGFsdEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBjdHJsS2V5OiBib29sZWFuO1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIGFib3V0Pzogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVyIH0gZnJvbSBcIi4uL21vZGVscy9LZXlib2FyZEhhbmRsZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEhhbmRsZXJzIHtcclxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcnM6IEFycmF5PHttYXRjaDogS2V5Ym9hcmRIYW5kbGVyOyBjb21tYW5kOiBDb21tYW5kfT4gPSBbXTtcclxuXHJcbiAgZ2V0RXZlbnRIYW5kbGVycyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5maWx0ZXIoaGFuZGxlciA9PiB7XHJcbiAgICAgIGxldCBtYXRjaCA9IGhhbmRsZXIubWF0Y2g7XHJcbiAgICAgIGlmIChldmVudC5hbHRLZXkgIT09IG1hdGNoLmFsdEtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgIT09IG1hdGNoLnNoaWZ0S2V5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChldmVudC5jdHJsS2V5ICE9PSBtYXRjaC5jdHJsS2V5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmICghIW1hdGNoLmtleSAmJiBldmVudC5rZXkgIT09IG1hdGNoLmtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkRXZlbnRIYW5kbGVyKGNvbW1hbmQ6IENvbW1hbmQsIG1hdGNoOiBQYXJ0aWFsPEtleWJvYXJkSGFuZGxlcj4pIHtcclxuICAgIGxldCBmdWxsTWF0Y2g6IEtleWJvYXJkSGFuZGxlciA9IHtcclxuICAgICAgYWx0S2V5OiBtYXRjaC5hbHRLZXkgPz8gZmFsc2UsXHJcbiAgICAgIGN0cmxLZXk6IG1hdGNoLmN0cmxLZXkgPz8gZmFsc2UsXHJcbiAgICAgIHNoaWZ0S2V5OiBtYXRjaC5zaGlmdEtleSA/PyBmYWxzZSxcclxuICAgICAga2V5OiBtYXRjaC5rZXkgPz8gXCJcIixcclxuICAgICAgYWJvdXQ6IG1hdGNoLmFib3V0IHx8IGNvbW1hbmQuYWJvdXQgJiYgY29tbWFuZC5hYm91dCgpXHJcbiAgICB9O1xyXG4gICAgdGhpcy5rZXlib2FyZEhhbmRsZXJzLnB1c2goe21hdGNoOiBmdWxsTWF0Y2gsIGNvbW1hbmR9KTtcclxuICB9XHJcblxyXG4gIGxpc3QoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5rZXlib2FyZEhhbmRsZXJzLm1hcChoID0+ICh7XHJcbiAgICAgIGNvbW1hbmQ6aC5jb21tYW5kLFxyXG4gICAgICBrZXk6IHRoaXMua2V5c0FzU3RyaW5nKGgubWF0Y2gpLFxyXG4gICAgICBhYm91dDogaC5tYXRjaC5hYm91dCxcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIGtleXNBc1N0cmluZyhtYXRjaDogS2V5Ym9hcmRIYW5kbGVyKSB7XHJcbiAgIGxldCByZXN1bHQgPSBtYXRjaC5rZXk7XHJcbiAgIHN3aXRjaCAocmVzdWx0KXtcclxuICAgICBjYXNlIFwiIFwiOiByZXN1bHQgPSBcInNwYWNlXCI7IGJyZWFrO1xyXG4gICB9XHJcbiAgIGlmIChtYXRjaC5jdHJsS2V5KSByZXN1bHQgPSBcImN0cmwgKyBcIityZXN1bHQ7XHJcbiAgIGlmIChtYXRjaC5hbHRLZXkpIHJlc3VsdCA9IFwiYWx0ICsgXCIrcmVzdWx0O1xyXG4gICBpZiAobWF0Y2guc2hpZnRLZXkpIHJlc3VsdCA9IFwic2hpZnQgKyBcIityZXN1bHQ7XHJcbiAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtKG5vZGU6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgbGV0IHQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS50cmFuc2Zvcm07XHJcbiAgdCA9ICh0ID09PSBcIm5vbmVcIikgPyBcIlwiIDogdCArIFwiIFwiO1xyXG4gIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gdCArIHZhbHVlO1xyXG59XHJcblxyXG4iLCJleHBvcnQgZnVuY3Rpb24gYmJveChub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgcmV0dXJuIHsgdG9wOiBwYXJzZUZsb2F0KHRvcCksIGxlZnQ6IHBhcnNlRmxvYXQobGVmdCksIHdpZHRoOiBwYXJzZUZsb2F0KHdpZHRoKSwgaGVpZ2h0OiBwYXJzZUZsb2F0KGhlaWdodCkgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBnZXRBY3RpdmVPdmVybGF5IH0gZnJvbSBcIi4uL2Z1bi9nZXRBY3RpdmVPdmVybGF5XCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4vUmVwbFwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZEhhbmRsZXJzIH0gZnJvbSBcIi4vS2V5Ym9hcmRIYW5kbGVyc1wiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi4vZnVuL3RyYW5zZm9ybVwiO1xyXG5pbXBvcnQgeyBiYm94IH0gZnJvbSBcIi4uL2Z1bi9iYm94XCI7XHJcblxyXG4vKipcclxuICogbWFuYWdlcyB1c2VyIGludGVyYWN0aW9ucyBmb3Iga2V5Ym9hcmQgc2hvcnRjdXRzLCB3aGVlbCwgZHJhZywgY2xpY2sgZXZlbnRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3Age1xyXG4gIHByaXZhdGUgc291cmNlOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVwbDogUmVwbCwgcHVibGljIGtleWRvd25IYW5kbGVyczogS2V5Ym9hcmRIYW5kbGVycykge1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBzb3VyY2UgPSBnZXRBY3RpdmVPdmVybGF5KCk7XHJcbiAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJubyBhY3RpdmUgb3ZlcmxheSBmb3VuZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy8gVE9ETyB3b3VsZCBiZSBuaWNlIHRvIG9ubHkgcGVyZm9ybSB3aGVuIG1vdXNlIGlzIG92ZXIgdGhlIGVsZW1lbnRcclxuICAgICAgLy8gZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoZXZlbnQuc2NyZWVuWCwgZXZlbnQuc2NyZWVuWSk7XHJcbiAgICAgIGxldCBmcm9tID0gc291cmNlLmlubmVySFRNTDtcclxuICAgICAgLy8gLTE1MCA9PiAwLjksIDE1MCA9PiAxLjEsIHNvXHJcbiAgICAgIGxldCBkZWx0YSA9IDEgKyBldmVudC5kZWx0YVkgLyAxNTAwO1xyXG4gICAgICByZXBsLmV4ZWN1dGVDb21tYW5kKGB6b29tICR7ZnJvbX0gJHtkZWx0YX1gKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XHJcblxyXG4gICAgICBpZiAodGhpcy5rZXlkb3duSGFuZGxlcnMuZ2V0RXZlbnRIYW5kbGVycyhldmVudCkuc29tZShoYW5kbGVyID0+IHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgIT09IGhhbmRsZXIuY29tbWFuZC5leGVjdXRlKHJlcGwpO1xyXG4gICAgICB9KSkge1xyXG4gICAgICAgIC8vIGhhbmRsZWRcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlIHRoZSBiYWNrZ3JvdW5kIGltYWdlIG9uIHRoZSBwYW5lbFxyXG4gICAqIEBwYXJhbSBwYW5lbCBJbnZva2UgcGFuIG9uIHRoZSBwYW5lbCBzbyB0aGF0IGl0IGZvbGxvd3MgdGhlIG1vdXNlXHJcbiAgICovXHJcbiAgcGFuYWJsZShwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgZHJhZ2dhYmxlID0gcGFuZWwuaW1hZ2U7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IFswLCAwXTtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG5cclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZXZlbnQgPT4ge1xyXG4gICAgICBsZXQgbGVmdCA9IHBhcnNlRmxvYXQoZHJhZ2dhYmxlLnN0eWxlLmxlZnQgfHwgXCIwXCIpO1xyXG4gICAgICBsZXQgdG9wID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUudG9wIHx8IFwiMFwiKTtcclxuICAgICAgc3RhcnRQb3NpdGlvbiA9IFtsZWZ0IC0gZXZlbnQuc2NyZWVuWCwgdG9wIC0gZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHBvaW50ZXJtb3ZlKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBldmVudCA9PiB7XHJcbiAgICAgIGRyYWdnYWJsZS5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGxldCBib3ggPSBiYm94KGRyYWdnYWJsZSk7XHJcbiAgICAgIGxldCByZWN0ID0gZHJhZ2dhYmxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyAgICAgIFxyXG4gICAgICBsZXQgc2NhbGUgPSByZWN0LndpZHRoIC8gYm94LndpZHRoO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUudG9wID0gZHJhZ2dhYmxlLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG4gICAgICB0cmFuc2Zvcm0oZHJhZ2dhYmxlLCBgdHJhbnNsYXRlKCR7Ym94LmxlZnQgLyBzY2FsZX1weCwgJHtib3gudG9wIC8gc2NhbGV9cHgpYCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBvaW50ZXJtb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBbeCwgeV0gPSBbc3RhcnRQb3NpdGlvblswXSArIGV2ZW50LnNjcmVlblgsIHN0YXJ0UG9zaXRpb25bMV0gKyBldmVudC5zY3JlZW5ZXTtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLmxlZnQgPSBgJHt4fXB4YDtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IGAke3l9cHhgO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBtb3ZlYWJsZShkcmFnZ2FibGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IFswLCAwXTtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG5cclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZXZlbnQgPT4ge1xyXG4gICAgICBsZXQgdG9wID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUudG9wKTtcclxuICAgICAgbGV0IGxlZnQgPSBwYXJzZUZsb2F0KGRyYWdnYWJsZS5zdHlsZS5sZWZ0KTtcclxuICAgICAgc3RhcnRQb3NpdGlvbiA9IFtsZWZ0IC0gZXZlbnQuc2NyZWVuWCwgdG9wIC0gZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHBvaW50ZXJtb3ZlKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBldmVudCA9PiB7XHJcbiAgICAgIGRyYWdnYWJsZS5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBvaW50ZXJtb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBbbGVmdCwgdG9wXSA9IFtzdGFydFBvc2l0aW9uWzBdICsgZXZlbnQuc2NyZWVuWCwgc3RhcnRQb3NpdGlvblsxXSArIGV2ZW50LnNjcmVlblldO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUubGVmdCA9IGxlZnQgKyBcInB4XCI7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYW4gZWxlbWVudCBhIGRyYWcgc291cmNlXHJcbiAgICogQHBhcmFtIGRpdiBlbGVtZW50IHRvIG1ha2UgZHJhZ2dhYmxlXHJcbiAgICovXHJcbiAgZHJhZ2dhYmxlKGRyYWdnYWJsZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG4gICAgZHJhZ2dhYmxlLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBldmVudCA9PiB0aGlzLm9uZHJhZ3N0YXJ0KGRyYWdnYWJsZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbiBlbGVtZW50IGEgZHJvcCB0YXJnZXRcclxuICAgKiBAcGFyYW0gdGFyZ2V0IGVsZW1lbnQgdG8gbWFrZSBpbnRvIGEgZHJvcCB0YXJnZXQgKGRyYWdnYWJsZSBhcmUgZHJvcHBhYmxlLCBiYWQgbmFtZSlcclxuICAgKi9cclxuICBkcm9wcGFibGUodGFyZ2V0OiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnNvdXJjZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMub25kcmFnb3Zlcih0YXJnZXQsIHRoaXMuc291cmNlKTtcclxuICAgIH0pO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuc291cmNlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5vbmRyb3AodGFyZ2V0LCB0aGlzLnNvdXJjZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNvdXJjZSBsaXN0ZW4gZm9yIHdoZWVsIGV2ZW50c1xyXG4gICAqL1xyXG4gIHpvb21hYmxlKHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICB9XHJcbiAgb25kcmFnc3RhcnQoc291cmNlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgfVxyXG5cclxuICBvbmRyYWdvdmVyKHRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8vIG5vdGhpbmcgdG8gZG8/XHJcbiAgfVxyXG5cclxuICBvbmRyb3AodGFyZ2V0OiBIVE1MRWxlbWVudCwgc291cmNlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IGZyb20gPSBzb3VyY2UuaW5uZXJIVE1MO1xyXG4gICAgbGV0IHRvID0gdGFyZ2V0LmlubmVySFRNTDtcclxuICAgIGxldCBjb21tYW5kID0gYG1vdmUgJHtmcm9tfSAke3RvfWA7XHJcbiAgICB0aGlzLnJlcGwuZXhlY3V0ZUNvbW1hbmQoY29tbWFuZCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgQmVoYXZpb3I8VD4ge1xyXG4gIGV4dGVuZChjb250cm9sOiBUKTogdm9pZDtcclxufVxyXG4iLCJpbXBvcnQgeyB0YWlsIH0gZnJvbSBcIi4uL2Z1bi90YWlsXCI7XHJcbmltcG9ydCB7IENvbW1hbmRQYXJzZXIgfSBmcm9tIFwiLi9Db21tYW5kUGFyc2VyXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyBHb29nbGVDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9ucyB9IGZyb20gXCIuL0FuaW1hdGlvbnNcIjtcclxuaW1wb3J0IHsgQ29tbWFuZHMgfSBmcm9tIFwiLi9Db21tYW5kc1wiO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcCB9IGZyb20gXCIuL0RyYWdBbmREcm9wXCI7XHJcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4uL21vZGVscy9CZWhhdmlvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlcGwge1xyXG4gIC8vIGV4dGVuc2lvbiBwb2ludCBmb3IgYmVoYXZpb3JzXHJcbiAgbm90aWZ5KG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvLyBwdWJsaWMgc28gc3BsaXQgY29tbWFuZCBjYW4gb3BlcmF0ZSBvbiB0aGVtXHJcbiAgcHVibGljIHBhbmVsczogQXJyYXk8Q29sbGFnZVBhbmVsPiA9IFtdO1xyXG4gIC8vIHB1YmxpYyBzbyBvcGVuQWxidW1zIGNvbW1hbmQgY2FuIG9wZXJhdGlvbiBvbiB0aGVtXHJcbiAgcHVibGljIHBob3RvczogQXJyYXk8R29vZ2xlQ29sbGFnZVBob3RvPiA9IFtdO1xyXG4gIHByaXZhdGUgY29tbWFuZEhpc3Rvcnk6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBwcml2YXRlIGNvbW1hbmRIaXN0b3J5SW5kZXggPSAtMTtcclxuICBwdWJsaWMgZG5kOiBEcmFnQW5kRHJvcCB8IG51bGwgPSBudWxsO1xyXG4gIHB1YmxpYyBhbmltYXRpb25zID0gbmV3IEFuaW1hdGlvbnMoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGNvbW1hbmRzOiBDb21tYW5kcykge1xyXG4gICAgLy8gY2Fubm90IHNldCBkbmQgYmVjYXVzZSBkbmQgbmVlZHMgcmVwbCAoZm9yIG5vdylcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1c2UoYmVoYXZpb3I6IEJlaGF2aW9yPFJlcGw+KSB7XHJcbiAgICBiZWhhdmlvci5leHRlbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBldmFsKGNvbW1hbmQ6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2coYGV4ZWN1dGluZzogJHtjb21tYW5kfWApO1xyXG4gICAgbGV0IFt2ZXJiXSA9IGNvbW1hbmQuc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IGhhbmRsZXIgPSB0aGlzLmNvbW1hbmRzLmdldCh2ZXJiKTtcclxuICAgIGlmIChoYW5kbGVyKSB7XHJcbiAgICAgIGF3YWl0IGhhbmRsZXIuZXhlY3V0ZSh0aGlzLCB0YWlsKGNvbW1hbmQpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoICh2ZXJiKSB7XHJcbiAgICAgIGNhc2UgXCJleHBvcnRcIjpcclxuICAgICAgICBsZXQgY2FudmFzID0gYXdhaXQgdGhpcy5hc0NhbnZhcygpO1xyXG4gICAgICAgIGlmICghY2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiZXhwb3J0LXJlc3VsdFwiKTtcclxuICAgICAgICBpbWcuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGltZywgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBjcmVhdGUgYSBjYW52YXMgb2YgdGhlIGVudGlyZSBjb2xsYWdlXHJcbiAgYXN5bmMgYXNDYW52YXMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SFRNTENhbnZhc0VsZW1lbnQ+KChnb29kLCBiYWQpID0+IHtcclxuICAgICAgbGV0IGltYWdlQ2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW52YXNcIik/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBpZiAoIWltYWdlQ2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2VDYW52YXMud2lkdGg7XHJcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZUNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgbGV0IHBhbmVscyA9IHRoaXMucGFuZWxzLmZpbHRlcigocCkgPT4gMCA9PT0gZ2V0Q29tcHV0ZWRTdHlsZShwLnBhbmVsKS5iYWNrZ3JvdW5kSW1hZ2UuaW5kZXhPZihgdXJsKFwiYCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImxvYWRpbmdcIiwgcGFuZWxzLmxlbmd0aCk7XHJcbiAgICAgIHBhbmVscy5mb3JFYWNoKChwKSA9PiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHAucGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJhbm9ueW1vdXNcIjtcclxuICAgICAgICBpbWcud2lkdGggPSBwb3Mud2lkdGg7XHJcbiAgICAgICAgaW1nLmhlaWdodCA9IHBvcy5oZWlnaHQ7XHJcbiAgICAgICAgaW1nLnN0eWxlLnRyYW5zZm9ybSA9IHAucGFuZWwuc3R5bGUudHJhbnNmb3JtO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgcG9zLngsIHBvcy55KTtcclxuICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRlZDpcIiwgY291bnQpO1xyXG4gICAgICAgICAgaWYgKGNvdW50ID09PSBwYW5lbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGdvb2QoY2FudmFzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIHN0cmlwIHVybChcIlwiKTtcclxuICAgICAgICBsZXQgdXJsID0gZ2V0Q29tcHV0ZWRTdHlsZShwLnBhbmVsKS5iYWNrZ3JvdW5kSW1hZ2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmxcIiwgdXJsKTtcclxuICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDUsIHVybC5sZW5ndGggLSAyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVybFwiLCB1cmwpO1xyXG4gICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb2xsYWdlT3ZlcmxheXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucGFuZWxbZGF0YS1pZF0gLm92ZXJsYXlgKSkgYXMgSFRNTEVsZW1lbnRbXTtcclxuICB9XHJcblxyXG4gIGdldFBob3RvT3ZlcmxheXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucGhvdG9zIC5pbWcgLm92ZXJsYXlbZGF0YS1pZF1gKSkgYXMgSFRNTEVsZW1lbnRbXTtcclxuICB9XHJcblxyXG4gIHNlbGVjdChpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RQYW5lbChpZCk/LnBhbmVsO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UGFuZWwoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMucGFuZWxzLmZpbmQoKHApID0+IHAub3ZlcmxheS5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RQaG90byhpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5waG90b3NbcGFyc2VJbnQoaWQpIC0gMV07XHJcbiAgfVxyXG5cclxuICByZW1vdmVQYW5lbChwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnBhbmVscy5pbmRleE9mKHBhbmVsKTtcclxuICAgIGlmICgtMSA9PT0gaW5kZXgpIHRocm93IFwicGFuZWwgbm90IGZvdW5kXCI7XHJcbiAgICB0aGlzLnBhbmVscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgcGFuZWwucGFuZWwucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICByZWluZGV4KCkge1xyXG4gICAgdGhpcy5wYW5lbHNcclxuICAgICAgLmZpbHRlcigocCkgPT4gISFwPy5wYW5lbD8ucGFyZW50RWxlbWVudClcclxuICAgICAgLmZvckVhY2goKHAsIGkpID0+IChwLm92ZXJsYXkuZGF0YXNldC5pZCA9IHAub3ZlcmxheS5pbm5lclRleHQgPSBpICsgMSArIFwiXCIpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgem9vbSBhbmQgZHJhZyBjYXBhYmlsaXRpZXMgdG8gYSBwYW5lbFxyXG4gICAqIEBwYXJhbSBwYW5lbCBtYWtlIHRoaXMgcGFuZWwgaW50ZXJhY3RpdmVcclxuICAgKi9cclxuICBhZGRCZWhhdmlvcnMocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IG92ZXJsYXkgPSBwYW5lbC5vdmVybGF5O1xyXG4gICAgbGV0IGRuZCA9IHRoaXMuZG5kO1xyXG4gICAgaWYgKGRuZCkge1xyXG4gICAgICBkbmQuem9vbWFibGUob3ZlcmxheSk7XHJcbiAgICAgIGRuZC5kcmFnZ2FibGUob3ZlcmxheSk7XHJcbiAgICAgIGRuZC5wYW5hYmxlKHBhbmVsKTtcclxuICAgICAgZG5kLmRyb3BwYWJsZShvdmVybGF5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlaW5kZXhQaG90b3MoKSB7XHJcbiAgICB0aGlzLnBob3Rvcy5mb3JFYWNoKChwaG90bywgaSkgPT4ge1xyXG4gICAgICBsZXQgcCA9IHBob3RvLmltZztcclxuICAgICAgbGV0IG92ZXJsYXkgPSBwLnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgaWYgKCFvdmVybGF5KSB7XHJcbiAgICAgICAgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcclxuICAgICAgICBvdmVybGF5LmRhdGFzZXQuaWQgPSBvdmVybGF5LmlubmVyVGV4dCA9IDEgKyBpICsgXCJcIjtcclxuICAgICAgICBwLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG4gICAgICAgIHRoaXMuZG5kPy5kcmFnZ2FibGUob3ZlcmxheSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpb3JDb21tYW5kKCkge1xyXG4gICAgaWYgKHRoaXMuY29tbWFuZEhpc3RvcnlJbmRleCA+IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZEhpc3RvcnlbLS10aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBuZXh0Q29tbWFuZCgpIHtcclxuICAgIGlmICh0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXggPCB0aGlzLmNvbW1hbmRIaXN0b3J5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZEhpc3RvcnlbKyt0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzdGFydHVwKCkge1xyXG4gICAgbGV0IGNoaWxkUGFuZWxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBhbmVsXCIpKS5tYXAoKHApID0+IG5ldyBDb2xsYWdlUGFuZWwoPEhUTUxEaXZFbGVtZW50PnApKTtcclxuICAgIGNoaWxkUGFuZWxzLmZvckVhY2goKGMpID0+IHRoaXMuYWRkQmVoYXZpb3JzKGMpKTtcclxuICAgIHRoaXMucGFuZWxzLnB1c2goLi4uY2hpbGRQYW5lbHMpO1xyXG4gICAgbGV0IGNtZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uc29sZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY21kLm9ua2V5ZG93biA9IChldmVudCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxyXG4gICAgICAgICAgdGhpcy5leGVjdXRlQ29tbWFuZChjbWQudmFsdWUpO1xyXG4gICAgICAgICAgY21kLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XHJcbiAgICAgICAgICBjbWQudmFsdWUgPSB0aGlzLnByaW9yQ29tbWFuZCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxyXG4gICAgICAgICAgY21kLnZhbHVlID0gdGhpcy5uZXh0Q29tbWFuZCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLnJlaW5kZXgoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBleGVjdXRlQ29tbWFuZChjbWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5jb21tYW5kSGlzdG9yeUluZGV4ID0gdGhpcy5jb21tYW5kSGlzdG9yeS5wdXNoKGNtZCk7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLmV2YWwoY21kKTtcclxuICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgIHRoaXMubm90aWZ5KGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZUNvbW1hbmQoY29tbWFuZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgYWkgPSBuZXcgQ29tbWFuZFBhcnNlcigpO1xyXG4gICAgcmV0dXJuIGFpLnBhcnNlUGhyYXNlKGNvbW1hbmQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuaW1wb3J0IHtnbG9iYWxzfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xyXG5cclxuY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbmZ1bmN0aW9uIGVzY2FwZSh2YWx1ZTogc3RyaW5nKXtcclxuICB0ZXh0YXJlYS5pbm5lclRleHQgPSB2YWx1ZTtcclxuICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIZWxwQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBjb21tYW5kcyA9IGdsb2JhbHMucmVwbC5jb21tYW5kcy5saXN0KCkubWFwKG5hbWUgPT4gKHtjb21tYW5kOiAoZ2xvYmFscy5yZXBsLmNvbW1hbmRzLmdldChuYW1lKSBhcyBDb21tYW5kKSwgbmFtZX0pKTtcclxuICAgIGNvbnN0IGtleWJvYXJkQ29tbWFuZHMgPSBnbG9iYWxzLmtleWJvYXJkSGFuZGxlcnMubGlzdCgpO1xyXG4gICAgY29uc3QgbWFya3VwMSA9IGNvbW1hbmRzLm1hcChjID0+IGA8b3B0aW9uIHZhbHVlPVwiJHtjLm5hbWV9XCI+XCIke2MubmFtZX1cIiAtICR7Yy5jb21tYW5kLmFib3V0ID8gYy5jb21tYW5kLmFib3V0KCkgOiBcImNvbW1hbmRcIn08L29wdGlvbj5gKS5zb3J0KCkuam9pbihcIlwiKTtcclxuICAgIGNvbnN0IG1hcmt1cDIgPSBrZXlib2FyZENvbW1hbmRzLm1hcCgoYyxpKSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7Yy5rZXl9XCI+XCIke2Mua2V5fVwiIC0gJHsoYy5hYm91dCEpfTwvY29kZT48L29wdGlvbj5gKS5zb3J0KCkuam9pbihcIlwiKTtcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImhlbHBcIik7XHJcbiAgICB0YXJnZXQuaW5uZXJIVE1MID0gYCR7bWFya3VwMX0ke21hcmt1cDJ9YDtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFyZ2V0KTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MVGV4dEFyZWFFbGVtZW50PihcIi5jb25zb2xlXCIpIS52YWx1ZSA9IHRhcmdldC52YWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi4vY29udHJvbHMvQ29sbGFnZVBhbmVsXCI7XHJcblxyXG4vKipcclxuICAgKiBTcGxpdHMgdGhlIGN1cnJlbnQgcGFuZWwgaW50byA0IGVxdWFsIHNpemUgcGFuZWxzXHJcbiAgICogVGhpcyBwYW5lbCB0aGVuIHRha2VzIG9uIHRoZSByb2xlIG9mIGEgcGFuZWwgY29udGFpbmVyXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gc3BsaXQocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IFt0b3BsZWZ0LCB0b3ByaWdodCwgYm90dG9tbGVmdCwgYm90dG9tcmlnaHRdID0gWzEsIDIsIDMsIDRdLm1hcChuID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgbGV0IGNoaWxkcmVuID0gW3RvcGxlZnQsIHRvcHJpZ2h0LCBib3R0b21sZWZ0LCBib3R0b21yaWdodF0ubWFwKHYgPT4gbmV3IENvbGxhZ2VQYW5lbCh2KSk7XHJcbiAgICB0b3BsZWZ0LmNsYXNzTGlzdC5hZGQoXCJxMVwiKTtcclxuICAgIHRvcHJpZ2h0LmNsYXNzTGlzdC5hZGQoXCJxMlwiKTtcclxuICAgIGJvdHRvbWxlZnQuY2xhc3NMaXN0LmFkZChcInEzXCIpO1xyXG4gICAgYm90dG9tcmlnaHQuY2xhc3NMaXN0LmFkZChcInE0XCIpO1xyXG4gICAgLy8gcGhvdG8gY29udGFpbnMgbm8gc3RhdGUgc28gbm90IGNsb25pbmdcclxuICAgIGNvbnN0IHBob3RvID0gcGFuZWwucGhvdG87XHJcbiAgICBpZiAocGhvdG8pIHtcclxuICAgICAgY2hpbGRyZW4uZm9yRWFjaChjID0+IGMuYWRkUGhvdG8ocGhvdG8uY2xvbmUoKSkpO1xyXG4gICAgfVxyXG4gICAgcGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcInBhbmVsXCIpO1xyXG4gICAgcGFuZWwub3ZlcmxheS5yZW1vdmUoKTtcclxuICAgIHBhbmVsLmltYWdlLnNyYyA9IFwiXCI7XHJcbiAgICBwYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKFwicGFuZWwtY29udGFpbmVyXCIpO1xyXG4gICAgcGFuZWwucGFuZWwuZGF0YXNldFtcImlkXCJdID0gXCJcIjtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goYyA9PiBwYW5lbC5wYW5lbC5hcHBlbmRDaGlsZChjLnBhbmVsKSk7XHJcbiAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuLyoqXHJcbiAqIFNwbGl0cyB0aGUgcGFuZWwgaW50byA0IG5ldyBjaGlsZCBwYW5lbHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTcGxpdENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBjb21tYW5kQXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgaWQgPSBjb21tYW5kQXJncztcclxuXHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIG5vZGUgZm91bmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnBhbmVscy5maW5kKHAgPT4gcC5wYW5lbCA9PT0gbm9kZSk7XHJcbiAgICBpZiAoIXBhbmVsKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gcGFuZWwgZm91bmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb3JpZ2luYWxJbmRleCA9IHJlcGwucGFuZWxzLmluZGV4T2YocGFuZWwpO1xyXG4gICAgbGV0IGNoaWxkUGFuZWxzID0gc3BsaXQocGFuZWwpO1xyXG4gICAgLy8gcmVtb3ZlIHNpbmNlIGl0IGlzIG5vIGxvbmdlciBhIHBhbmVsXHJcbiAgICByZXBsLnBhbmVscy5zcGxpY2Uob3JpZ2luYWxJbmRleCwgMSwgLi4uY2hpbGRQYW5lbHMpO1xyXG4gICAgY2hpbGRQYW5lbHMuZm9yRWFjaChjID0+IHJlcGwuYWRkQmVoYXZpb3JzKGMpKTtcclxuICAgIHJlcGwucmVpbmRleCgpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFzcGVjdFJhdGlvQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIGBzZXQgdGhlIGFzcGVjdCByYXRpbyB0byBXIEhgO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBbdywgaF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCB3aWR0aCA9IHBhcnNlRmxvYXQodyk7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcGFyc2VGbG9hdChoKTtcclxuICAgIGxldCB3aW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRvd1wiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjYW52YXMgPSB3aW5kb3cucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50V2lkdGggPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY2FudmFzKS53aWR0aCk7XHJcbiAgICBsZXQgY3VycmVudEhlaWdodCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLmhlaWdodCk7XHJcbiAgICAvLyBtdWx0aXBsZSB3aWR0aCBhbmQgaGVpZ2h0IGJ5IG1heGltdW0gc2NhbGUgc3VjaCB0aGF0XHJcbiAgICAvLyB3aWR0aCAqIHNjYWxlIDw9IGN1cnJlbnRXaWR0aCBhbmQgaGVpZ2h0ICogc2NhbGUgPD0gY3VycmVudEhlaWdodFxyXG4gICAgbGV0IHN4ID0gY3VycmVudFdpZHRoIC8gd2lkdGg7XHJcbiAgICBsZXQgc3kgPSBjdXJyZW50SGVpZ2h0IC8gaGVpZ2h0O1xyXG4gICAgbGV0IHNjYWxlID0gTWF0aC5taW4oc3gsIHN5KTtcclxuICAgIHdpbmRvdy5zdHlsZS53aWR0aCA9IGAke01hdGgucm91bmQod2lkdGggKiBzY2FsZSl9cHhgO1xyXG4gICAgd2luZG93LnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0ICogc2NhbGUpfXB4YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3JkZXJDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gXCJzZXQgdGhlIGJvcmRlciBXSURUSCBDT0xPUiBvZiBJRDEgSUQyIC4uLlwiO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IFt3aWR0aCwgY29sb3IsIC4uLmlkc10gPSBhcmdzLnNwbGl0KFwiIFwiKS5maWx0ZXIoKHYpID0+ICEhdik7XHJcbiAgICBpZiAoIXdpZHRoKSB0aHJvdyBcIndpZHRoIHJlcXVpcmVkXCI7XHJcbiAgICBpZiAoIWNvbG9yKSB0aHJvdyBcImNvbG9yIHJlcXVpcmVkXCI7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gaWRzLmxlbmd0aCA/IGlkcy5tYXAoKGlkKSA9PiByZXBsLnNlbGVjdFBhbmVsKGlkKSkgOiByZXBsLnBhbmVscztcclxuICAgIHRhcmdldHMuZm9yRWFjaCgocCkgPT4gcD8uYm9yZGVyKHdpZHRoLCBjb2xvcikpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuY29uc3QgdW5pdHMgPSBcInB4IGVtXCIuc3BsaXQoXCIgXCIpO1xyXG5cclxuZnVuY3Rpb24gaGFzVW5pdHModmFsdWU6IHN0cmluZykge1xyXG4gIHJldHVybiB1bml0cy5zb21lKHYgPT4gdmFsdWUuZW5kc1dpdGgodikpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlU3R5bGVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgdGFyZ2V0OiBrZXlvZiBPbWl0PENTU1N0eWxlRGVjbGFyYXRpb24sIG51bWJlcj4sXHJcbiAgICBwdWJsaWMgb3B0aW9ucz86IHtcclxuICAgICAgdW5pdHM/OiBzdHJpbmc7XHJcbiAgICAgIGRlbHRhPzogbnVtYmVyO1xyXG4gICAgfVxyXG4gICkgeyB9XHJcblxyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIGBjaGFuZ2UgJHt0aGlzLnRhcmdldH1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXIocmVwbDogUmVwbCkge1xyXG4gICAgcmV0dXJuIHJlcGwucGFuZWxzXHJcbiAgICAgIC5maWx0ZXIocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5jb250YWlucyhcImZvY3VzXCIpKVxyXG4gICAgICAuc29tZShwYW5lbCA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gcGFuZWwucGFuZWw7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHN0eWxlWzxhbnk+dGhpcy50YXJnZXRdKSArICh0aGlzLm9wdGlvbnM/LmRlbHRhID8/IDApO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZVs8YW55PnRoaXMudGFyZ2V0XSA9IHZhbHVlICsgKHRoaXMub3B0aW9ucz8udW5pdHMgPz8gXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGlmICghYXJncykge1xyXG4gICAgICBpZiAodGhpcy5rZXlib2FyZEhhbmRsZXIocmVwbCkpIHJldHVybjtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhbmVscyA9IHJlcGwucGFuZWxzO1xyXG4gICAgY29uc3QgW3ZhbHVlLCAuLi5pZHNdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBpZiAoIXZhbHVlKSB0aHJvdyBcInNpemUgcmVxdWlyZWRcIjtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRzID0gKCFpZHMubGVuZ3RoKSA/IHBhbmVscyA6IGlkcy5tYXAoaWQgPT4gcmVwbC5zZWxlY3RQYW5lbChpZCkpLmZpbHRlcih2ID0+ICEhdik7XHJcbiAgICBpZiAoIXRhcmdldHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdW5pdHMgPSAhaGFzVW5pdHModmFsdWUpID8gdGhpcy5vcHRpb25zPy51bml0cyB8fCBcIlwiIDogXCJcIjtcclxuXHJcbiAgICB0YXJnZXRzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcbiAgICAgIHBhbmVsLnBhbmVsLnN0eWxlWzxhbnk+dGhpcy50YXJnZXRdID0gYCR7dmFsdWV9JHt1bml0c31gO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5mdW5jdGlvbiBoYXNGb2N1cyhub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR290b0NvbW1hbmRFZGl0b3JDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IGVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uc29sZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgaWYgKCFlZGl0b3IpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoXCJubyBjb21tYW5kIGVkaXRvciBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc0ZvY3VzKGVkaXRvcikpIHJldHVybiBmYWxzZTtcclxuICAgIGVkaXRvci5mb2N1cygpO1xyXG4gICAgZWRpdG9yLnNlbGVjdCgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2N1c1BhbmVscyhyZXBsOiBSZXBsKSB7XHJcbiAgcmV0dXJuIHJlcGwucGFuZWxzLmZpbHRlcihwID0+IHAucGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpO1xyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5cclxuLyoqXHJcbiAqIHN3YXAgaW1hZ2VzIG9mIHR3byBwYW5lbHNcclxuICovXHJcbmZ1bmN0aW9uIHN3YXBJbWFnZXMocGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IGltYWdlMSA9IHBhbmVsMS5pbWFnZTtcclxuICBsZXQgaW1hZ2UyID0gcGFuZWwyLmltYWdlO1xyXG4gIGxldCBwYXJlbnQxID0gaW1hZ2UxLnBhcmVudEVsZW1lbnQ7XHJcbiAgbGV0IHBhcmVudDIgPSBpbWFnZTIucGFyZW50RWxlbWVudDtcclxuICBpZiAoIXBhcmVudDEgfHwgIXBhcmVudDIpIHJldHVybiBmYWxzZTtcclxuICBsZXQgbmV4dDEgPSBpbWFnZTEubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gIGxldCBuZXh0MiA9IGltYWdlMi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgaW1hZ2UxLnJlbW92ZSgpO1xyXG4gIGltYWdlMi5yZW1vdmUoKTtcclxuICBwYXJlbnQyLmluc2VydEJlZm9yZShpbWFnZTEsIG5leHQyKTtcclxuICBwYXJlbnQxLmluc2VydEJlZm9yZShpbWFnZTIsIG5leHQxKTtcclxuICBsZXQgcGhvdG8xID0gcGFuZWwxLnBob3RvO1xyXG4gIGxldCBwaG90bzIgPSBwYW5lbDIucGhvdG87XHJcbiAgcGFuZWwxLmltYWdlID0gaW1hZ2UyO1xyXG4gIHBhbmVsMi5pbWFnZSA9IGltYWdlMTtcclxuICBwYW5lbDEucGhvdG8gPSBwaG90bzI7XHJcbiAgcGFuZWwyLnBob3RvID0gcGhvdG8xO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFN3YXBQYW5lbHNDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXIocmVwbDogUmVwbCkge1xyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAoMiAhPT0gcGFuZWxzLmxlbmd0aCkge1xyXG4gICAgICByZXBsLm5vdGlmeShcIkV4YWN0bHkgdHdvIHBhbmVscyBtdXN0IGJlIHNlbGVjdGVkIGJlZm9yZSB5b3UgY2FuIHBlcmZvcm0gYSBzd2FwLlwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc3dhcEltYWdlcyhwYW5lbHNbMF0sIHBhbmVsc1sxXSk7XHJcbiAgfVxyXG5cclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiBcIlN3YXAgUGFuZWwgQSBCXCI7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiBmYWxzZSB8IHZvaWQgfCBQcm9taXNlPGZhbHNlIHwgdm9pZD4ge1xyXG4gICAgaWYgKCFhcmdzKVxyXG4gICAgICByZXR1cm4gdGhpcy5rZXlib2FyZEhhbmRsZXIocmVwbCk7XHJcblxyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwYW5lbDEgPSByZXBsLnNlbGVjdFBhbmVsKGlkMSk7XHJcbiAgICBsZXQgcGFuZWwyID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgaWYgKCFwYW5lbDEpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoYFBhbmVsIG5vdCBmb3VuZDogJHtpZDF9YCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICghcGFuZWwyKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KGBQYW5lbCBub3QgZm91bmQ6ICR7aWQyfWApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzd2FwSW1hZ2VzKHBhbmVsMSwgcGFuZWwyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIEdvdG9Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGFyZ3M7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgVGV4dENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgdmFsdWVdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuICAgIHBhbmVsLnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIFBhZENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgd2lkdGhdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5zdHlsZS5wYWRkaW5nID0gYCR7d2lkdGh9ZW1gO1xyXG5cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBub2RlLnN0eWxlLnZpc2liaWxpdHkgIT09IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgaXNWaXNpYmxlIH0gZnJvbSBcIi4uL2Z1bi9pc1Zpc2libGVcIjtcclxuZXhwb3J0IGNsYXNzIFRvZ2dsZVZpc2liaWxpdHlDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IHtcclxuICAgIHNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgfSkge1xyXG4gIH1cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IG92ZXJsYXlzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3RvcikpIGFzIEFycmF5PEhUTUxFbGVtZW50PjtcclxuICAgIGxldCBhbGxWaXNpYmxlID0gb3ZlcmxheXMuZXZlcnkodiA9PiBpc1Zpc2libGUodikpO1xyXG4gICAgaWYgKCFhbGxWaXNpYmxlKSB7XHJcbiAgICAgIG92ZXJsYXlzLmZvckVhY2godiA9PiB2LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgb3ZlcmxheXMuZm9yRWFjaCh2ID0+IHYuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBnZXRGb2N1c1BhbmVscyB9IGZyb20gXCIuL2dldEZvY3VzUGFuZWxzXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICAgKiBNb3ZlIHRoZSBpbWFnZSBpbnNpZGUgdGhlIGZyYW1lXHJcbiAgICogQHBhcmFtIHggaG9yaXpvbnRhbCBvZmZzZXQgaW4gcGl4ZWxzXHJcbiAgICogQHBhcmFtIHkgdmVydGljYWwgb2Zmc2V0IGluIHBpeGVsc1xyXG4gICAqL1xyXG5mdW5jdGlvbiBwYW4ocmVwbDogUmVwbCwgbm9kZTogSFRNTEVsZW1lbnQsIHg6IHN0cmluZywgeTogc3RyaW5nKSB7XHJcbiAgbGV0IFtkeCwgZHldID0gWzAsIDBdO1xyXG4gIGxldCBhbmltYXRlID0gdHJ1ZTtcclxuICBsZXQgcGl4ZWxTaXplID0gMTtcclxuICBzd2l0Y2ggKHgpIHtcclxuICAgIGNhc2UgXCJ1cFwiOlxyXG4gICAgICBkeSA9IC1waXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImRvd25cIjpcclxuICAgICAgZHkgPSBwaXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgZHggPSAtcGl4ZWxTaXplO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICBkeCA9IHBpeGVsU2l6ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbmltYXRlID0gZmFsc2U7XHJcbiAgICAgIGR4ID0gcGl4ZWxTaXplICogcGFyc2VGbG9hdCh4KTtcclxuICAgICAgZHkgPSBwaXhlbFNpemUgKiBwYXJzZUZsb2F0KHkpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgbGV0IG9wID0gKCkgPT4ge1xyXG4gICAgdHJhbnNmb3JtKG5vZGUsIGB0cmFuc2xhdGUoJHtkeH1weCwgJHtkeX1weClgKTtcclxuICB9O1xyXG4gIG9wKCk7XHJcbiAgbGV0IGFuaW1hdGlvbnMgPSByZXBsLmFuaW1hdGlvbnM7XHJcbiAgYW5pbWF0ZSAmJiBhbmltYXRpb25zLmFuaW1hdGUoXCJwYW5cIiwgb3ApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlSW1hZ2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IHtcclxuICAgIHg/OiBudW1iZXI7XHJcbiAgICB5PzogbnVtYmVyO1xyXG4gIH0pIHsgfVxyXG5cclxuICBhYm91dCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IDxzdHJpbmdbXT5bXTtcclxuICAgIGxldCB4ID0gdGhpcy5kZWx0YT8ueCB8fCAwO1xyXG4gICAgbGV0IHkgPSB0aGlzLmRlbHRhPy55IHx8IDA7XHJcblxyXG4gICAgaWYgKHggPiAwKSByZXN1bHQucHVzaChgJHt4fSBweCByaWdodGApO1xyXG4gICAgaWYgKHggPCAwKSByZXN1bHQucHVzaChgJHsteH0gcHggbGVmdGApO1xyXG4gICAgaWYgKHkgPiAwKSByZXN1bHQucHVzaChgJHt5fSBweCB1cGApO1xyXG4gICAgaWYgKHkgPCAwKSByZXN1bHQucHVzaChgJHsteX0gcHggZG93bmApO1xyXG4gICAgcmV0dXJuIGBtb3ZlIGltYWdlICR7cmVzdWx0LmpvaW4oXCIgYW5kIFwiKX1gO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCEhYXJncykge1xyXG4gICAgICBsZXQgW2lkLCB4LCB5XSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBwYW4ocmVwbCwgcGFuZWwuaW1hZ2UsIHgsIHkgfHwgXCIwXCIpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlbHRhKSB7XHJcbiAgICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgcGFuKHJlcGwsIHBhbmVsLmltYWdlLCAodGhpcy5kZWx0YSEueCB8fCAwKSArIFwiXCIsICh0aGlzLmRlbHRhIS55IHx8IDApICsgXCJcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbm90IGhhbmRsZWRcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgTWFyZ2luQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkLCB3aWR0aF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gICAgbm9kZS5zdHlsZS5tYXJnaW4gPSBgJHt3aWR0aH1lbWA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5cclxuZnVuY3Rpb24gbWVyZ2Vfbm9kZXMocmVwbDogUmVwbCwgcGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IG5vZGUxID0gcGFuZWwxLnBhbmVsO1xyXG4gIGxldCBub2RlMiA9IHBhbmVsMi5wYW5lbDtcclxuXHJcbiAgbm9kZTIuY2xhc3NMaXN0LmZvckVhY2goYyA9PiBub2RlMS5jbGFzc0xpc3QuYWRkKGMpKTtcclxuICByZXBsLnJlbW92ZVBhbmVsKHBhbmVsMik7XHJcblxyXG4gIC8vIGlmIG5vZGUxIGlzIHExLi4ucTQgYW5kIG9ubHkgY2hpbGQgdGhlbiBpdCBhc3N1bWVzIHRoZSBxIG9mIGl0J3MgY29udGFpbmVyIGFuZCByZXBsYWNlcyBpdHMgY29udGFpbmVyXHJcbiAgbGV0IHFzID0gWzEsIDIsIDMsIDRdLm1hcCh2ID0+IGBxJHt2fWApO1xyXG4gIGlmIChxcy5ldmVyeSh2ID0+IG5vZGUxLmNsYXNzTGlzdC5jb250YWlucyh2KSkpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IG5vZGUxLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWwtY29udGFpbmVyXCIpKSB7XHJcbiAgICAgIHFzLmZvckVhY2godiA9PiBub2RlMS5jbGFzc0xpc3QucmVtb3ZlKHYpKTtcclxuICAgICAgcXMuZm9yRWFjaCh2ID0+IHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnModikgJiYgbm9kZTEuY2xhc3NMaXN0LmFkZCh2KSk7XHJcbiAgICAgIHBhcmVudC5wYXJlbnRFbGVtZW50Py5pbnNlcnRCZWZvcmUobm9kZTEsIHBhcmVudCk7XHJcbiAgICAgIHBhcmVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVwbC5yZWluZGV4KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXJnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlMSA9IHJlcGwuc2VsZWN0UGFuZWwoaWQxKTtcclxuICAgIGxldCBub2RlMiA9IHJlcGwuc2VsZWN0UGFuZWwoaWQyKTtcclxuICAgIG5vZGUxICYmIG5vZGUyICYmIG1lcmdlX25vZGVzKHJlcGwsIG5vZGUxLCBub2RlMik7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgYmJveCB9IGZyb20gXCIuLi9mdW4vYmJveFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpUmVzQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG5cclxuICAvKipcclxuICAgKiByZXBsYWNlcyB0aGUgY3VycmVudCBwaG90byB3aXRoIG9uZSBvZiBoaWdoZXIgcXVhbGl0eVxyXG4gICAqL1xyXG4gIGFzeW5jIHVwZ3JhZGVSZXNvbHV0aW9uKHJlcGw6IFJlcGwsIHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGlmICghcGFuZWwucGhvdG8pXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAvLyBhdHRlbXB0cyB0byBpbmNyZWFzZSBhbiBpbWFnZSBzaXplIGFuZCBkZWNyZWFzZSB0aGUgdHJhbnNmb3JtIHNjYWxlXHJcbiAgICAvLyB0byBoYXZlIGEgbmVnbGlnYWJsZSBlZmZlY3Qgb24gdGhlIGltYWdlIGJ1dCBhbGxvdyBmb3Igc3dhcHBpbmcgaW5cclxuICAgIC8vIGEgaGlnaGVyIHJlc29sdXRpb24gdmVyc2lvbi5cclxuICAgIC8vIHRoaXMgaXMgbm90IGNvbXBlbnNhdGluZyBmb3IgIHBhZGRpbmcsIG1hcmdpbiwgYm9yZGVyIHdpZHRoLCBldGMuXHJcbiAgICAvLyBpdCBpcyBub3QgcHJlc2VydmluZyByb3RhdGlvblxyXG4gICAgbGV0IGJveCA9IGJib3gocGFuZWwuaW1hZ2UpO1xyXG4gICAgbGV0IGltYWdlUmVjdCA9IHBhbmVsLmltYWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IHNjYWxlID0gaW1hZ2VSZWN0LndpZHRoIC8gYm94LndpZHRoO1xyXG4gICAgaWYgKDEgPiBzY2FsZSkge1xyXG4gICAgICByZXBsLm5vdGlmeShcInRoaXMgd291bGQgbm90IGJlIGFuIHVwZ3JhZGVcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBwYW5lbFJlY3QgPSBwYW5lbC5wYW5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHBhbmVsLmltYWdlLnN0eWxlLndpZHRoID0gaW1hZ2VSZWN0LndpZHRoICsgXCJweFwiO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gaW1hZ2VSZWN0LmhlaWdodCArIFwicHhcIjtcclxuICAgIGxldCBkeCA9IGltYWdlUmVjdC5sZWZ0IC0gcGFuZWxSZWN0LmxlZnQgLSBwYXJzZUZsb2F0KHBhbmVsLnBhbmVsLnN0eWxlLmJvcmRlckxlZnRXaWR0aCk7XHJcbiAgICBsZXQgZHkgPSBpbWFnZVJlY3QudG9wIC0gcGFuZWxSZWN0LnRvcCAtIHBhcnNlRmxvYXQocGFuZWwucGFuZWwuc3R5bGUuYm9yZGVyVG9wV2lkdGgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2R4fXB4LCR7ZHl9cHgpYDtcclxuICAgIHBhbmVsLnNldEJhY2tncm91bmRJbWFnZShgJHtwYW5lbC5waG90by5tZWRpYUluZm8uYmFzZVVybH09dyR7TWF0aC5mbG9vcihpbWFnZVJlY3Qud2lkdGgpfWApO1xyXG4gICAgcmVwbC5ub3RpZnkoYHVwZ3JhZGVkIGJ5ICR7TWF0aC5yb3VuZChzY2FsZSAqIDEwMCl9JWApO1xyXG4gIH1cclxuXHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBbLi4uaWRzXSA9IGFyZ3Muc3BsaXQoXCIgXCIpLm1hcCh2ID0+IHYudHJpbSgpKS5maWx0ZXIodiA9PiB2Lmxlbmd0aCk7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gIWlkcy5sZW5ndGggPyByZXBsLnBhbmVscyA6IGlkcy5tYXAoaWQgPT4gcmVwbC5zZWxlY3RQYW5lbChpZCkpO1xyXG4gICAgdGFyZ2V0cy5mb3JFYWNoKHAgPT4gcCAmJiB0aGlzLnVwZ3JhZGVSZXNvbHV0aW9uKHJlcGwsIHApKTtcclxuXHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgTW92ZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwaG90byA9IHJlcGwuc2VsZWN0UGhvdG8oaWQxKTtcclxuICAgIGlmICghcGhvdG8pIHJldHVybjtcclxuXHJcblxyXG4gICAgbGV0IHBhbmVsID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgIHBhbmVsLmFkZFBob3RvKHBob3RvKTtcclxuXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuaW1wb3J0IHsgdHJhbnNmb3JtIH0gZnJvbSBcIi4uL2Z1bi90cmFuc2Zvcm1cIjtcclxuXHJcbmZ1bmN0aW9uIHJvdGF0ZUltYWdlKHJlcGw6IFJlcGwsIG5vZGU6IEhUTUxFbGVtZW50LCBhbmdsZTogc3RyaW5nKSB7XHJcbiAgaWYgKCFub2RlKVxyXG4gICAgcmV0dXJuO1xyXG5cclxuICBpZiAoISFhbmdsZSkge1xyXG4gICAgdHJhbnNmb3JtKG5vZGUsIGByb3RhdGUoJHthbmdsZX1kZWcpYCk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgbGV0IGFuZ2xlID0gMDtcclxuICAgIGxldCBhbmltYXRpb25zID0gcmVwbC5hbmltYXRpb25zO1xyXG4gICAgYW5pbWF0aW9ucy5hbmltYXRlKFwicm90YXRlXCIsICgpID0+IHtcclxuICAgICAgYW5nbGUgKz0gMTtcclxuICAgICAgdHJhbnNmb3JtKG5vZGUsIGByb3RhdGUoJHthbmdsZX1kZWcpYCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJvdGF0ZVBhbmVsQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YTogbnVtYmVyKSB7IH1cclxuXHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gYHJvdGF0ZSBwYW5lbCBieSAke3RoaXMuZGVsdGF9IGRlZ2A7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLnBhbmVsO1xyXG4gICAgICB0cmFuc2Zvcm0obGFiZWxJbWFnZU9yUGFuZWwsIGByb3RhdGUoJHt0aGlzLmRlbHRhfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvdGF0ZUltYWdlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IG51bWJlcikgeyB9XHJcblxyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIGByb3RhdGUgaW1hZ2UgYnkgJHt0aGlzLmRlbHRhfSBkZWdgO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCEhYXJncykge1xyXG4gICAgICBsZXQgW25vdW4sIG5vdW4yXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKG5vdW4pO1xyXG4gICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJvdGF0ZUltYWdlKHJlcGwsIHBhbmVsLmltYWdlLCBub3VuMik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLmltYWdlO1xyXG4gICAgICB0cmFuc2Zvcm0obGFiZWxJbWFnZU9yUGFuZWwsIGByb3RhdGUoJHt0aGlzLmRlbHRhfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVQYW5lbENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGVsdGE6IHtcclxuICAgIHg/OiBudW1iZXI7XHJcbiAgICB5PzogbnVtYmVyO1xyXG4gIH0pIHsgfVxyXG5cclxuICBhYm91dCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IDxzdHJpbmdbXT5bXTtcclxuICAgIGxldCB4ID0gdGhpcy5kZWx0YS54IHx8IDA7XHJcbiAgICBsZXQgeSA9IHRoaXMuZGVsdGEueSB8fCAwO1xyXG5cclxuICAgIGlmICh4ID4gMCkgcmVzdWx0LnB1c2goYCR7eH0gcHggcmlnaHRgKTtcclxuICAgIGlmICh4IDwgMCkgcmVzdWx0LnB1c2goYCR7LXh9IHB4IGxlZnRgKTtcclxuICAgIGlmICh5ID4gMCkgcmVzdWx0LnB1c2goYCR7eX0gcHggdXBgKTtcclxuICAgIGlmICh5IDwgMCkgcmVzdWx0LnB1c2goYCR7LXl9IHB4IGRvd25gKTtcclxuICAgIHJldHVybiBgbW92ZSBwYW5lbCAke3Jlc3VsdC5qb2luKFwiIGFuZCBcIil9YDtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBsZXQgbGFiZWxJbWFnZU9yUGFuZWwgPSBwYW5lbC5wYW5lbDtcclxuICAgICAgbGV0IGNvbXB1dGVkVHJhbmZvcm0gPSBnZXRDb21wdXRlZFN0eWxlKGxhYmVsSW1hZ2VPclBhbmVsKS50cmFuc2Zvcm07XHJcbiAgICAgIGlmIChjb21wdXRlZFRyYW5mb3JtID09PSBcIm5vbmVcIikgY29tcHV0ZWRUcmFuZm9ybSA9IFwiXCI7XHJcbiAgICAgIGxhYmVsSW1hZ2VPclBhbmVsLnN0eWxlLnRyYW5zZm9ybSA9IGNvbXB1dGVkVHJhbmZvcm0gKyBgIHRyYW5zbGF0ZSgke3RoaXMuZGVsdGEueCB8fCAwfXB4LCAke3RoaXMuZGVsdGEueSB8fCAwfXB4KWA7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9wQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGFib3V0KCkgeyByZXR1cm4gXCJTdG9wIEFuaW1hdGlvbnNcIjt9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGlmICghcmVwbC5hbmltYXRpb25zLmFuaW1hdGlvbnMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXBsLmFuaW1hdGlvbnMuc3RvcChhcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb2dnbGVGb2N1c0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBhYm91dCgpIHsgcmV0dXJuIFwiVG9nZ2xlIGZvY3VzXCI7fVxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICBpZiAoIWFjdGl2ZVBhbmVsPy5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbFwiKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgYWN0aXZlUGFuZWwuY2xhc3NMaXN0LnRvZ2dsZShcImZvY3VzXCIpO1xyXG4gICAgLy8gaGVyZSBpIGFtIC0gaWYgbm90IFwic2hpZnRcIiBrZXkgdGhlbiB1bmZvY3VzIGFsbCBwYW5lbHNcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuZXhwb3J0IGNsYXNzIEVzY2FwZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBcclxuICBwcml2YXRlIGlzUGFuZWwoZWxlbWVudDogRWxlbWVudCB8IG51bGwpIHtcclxuICAgIGlmICghZWxlbWVudClcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWxcIikgfHwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbC1jb250YWluZXJcIik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNlbGVjdFBhcmVudFBhbmVsKCkge1xyXG4gICAgbGV0IGN1cnJlbnRQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFjdXJyZW50UGFuZWwpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHdoaWxlIChjdXJyZW50UGFuZWwpIHtcclxuICAgICAgY3VycmVudFBhbmVsID0gY3VycmVudFBhbmVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIGlmICghY3VycmVudFBhbmVsKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgaWYgKHRoaXMuaXNQYW5lbChjdXJyZW50UGFuZWwpKSB7XHJcbiAgICAgICAgY3VycmVudFBhbmVsLmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAvLyB1bmZvY3VzIGFsbCBwYW5lbHNcclxuICAgIHJlcGwucGFuZWxzLmZvckVhY2gocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJmb2N1c1wiKSk7XHJcbiAgICB0aGlzLnNlbGVjdFBhcmVudFBhbmVsKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlRm9udFNpemVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgcmVhZG9ubHkgI3VuaXRzOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGRlbHRhOiBudW1iZXIsXHJcbiAgICBwdWJsaWMgb3B0aW9ucyA9IHtcclxuICAgICAgdW5pdHM6IFwicHhcIixcclxuICAgIH1cclxuICApIHtcclxuICAgIHRoaXMuI3VuaXRzID0gb3B0aW9ucz8udW5pdHMgfHwgXCJweFwiO1xyXG4gIH1cclxuXHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWx0YSA+IDAgPyBgaW5jcmVhc2UgZm9udCBieSAke3RoaXMuZGVsdGF9JHt0aGlzLiN1bml0c31gIDogYGRlY3JlYXNlIGZvbnQgYnkgJHstdGhpcy5kZWx0YX0ke3RoaXMuI3VuaXRzfWA7XHJcbiAgfVxyXG5cclxuICBpc0xhYmVsKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XHJcbiAgICBpZiAoIWVsZW1lbnQpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImxhYmVsXCIpO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGlmICghdGhpcy5pc0xhYmVsKGxhYmVsKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgZm9udFNpemUgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUobGFiZWwpLmZvbnRTaXplKTtcclxuICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemUgKyB0aGlzLmRlbHRhfSR7dGhpcy4jdW5pdHN9YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgR29vZ2xlTWVkaWFJdGVtIH0gZnJvbSBcIi4vR29vZ2xlTWVkaWFJdGVtXCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlUGhvdG9BUEkge1xyXG4gIGF1dGgyOiB7XHJcbiAgICBnZXRBdXRoSW5zdGFuY2U6ICgpID0+IHtcclxuICAgICAgaXNTaWduZWRJbjoge1xyXG4gICAgICAgIGxpc3RlbjogKGNiOiAoaXNTaWduZWRJbjogYm9vbGVhbikgPT4gdm9pZCkgPT4gdm9pZDtcclxuICAgICAgICBnZXQ6ICgpID0+IGJvb2xlYW47XHJcbiAgICAgIH07XHJcbiAgICAgIHNpZ25JbjogKCkgPT4gdm9pZDtcclxuICAgICAgc2lnbk91dDogKCkgPT4gdm9pZDtcclxuICAgIH07XHJcbiAgfTtcclxuICBsb2FkOiAodHlwZTogc3RyaW5nLCBjYjogRnVuY3Rpb24pID0+IHZvaWQ7XHJcbiAgY2xpZW50OiB7XHJcbiAgICBpbml0OiAoYXJnczoge1xyXG4gICAgICBhcGlLZXk6IHN0cmluZztcclxuICAgICAgZGlzY292ZXJ5RG9jczogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgY2xpZW50SWQ6IHN0cmluZztcclxuICAgICAgc2NvcGU6IHN0cmluZztcclxuICAgIH0pID0+IFByb21pc2U8YW55PjtcclxuICAgIHBob3Rvc2xpYnJhcnk6IHtcclxuICAgICAgYWxidW1zOiB7XHJcbiAgICAgICAgbGlzdDogRnVuY3Rpb247XHJcbiAgICAgIH07XHJcbiAgICAgIG1lZGlhSXRlbXM6IHtcclxuICAgICAgICBzZWFyY2g6IChhcmdzOiB7XHJcbiAgICAgICAgICBhbGJ1bUlkOiBzdHJpbmc7XHJcbiAgICAgICAgICBwYWdlVG9rZW4/OiBzdHJpbmc7XHJcbiAgICAgICAgfSkgPT4gUHJvbWlzZTx7XHJcbiAgICAgICAgICByZXN1bHQ6IHtcclxuICAgICAgICAgICAgbmV4dFBhZ2VUb2tlbj86IHN0cmluZztcclxuICAgICAgICAgICAgbWVkaWFJdGVtczogQXJyYXk8R29vZ2xlTWVkaWFJdGVtPjtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfT47XHJcbiAgICAgICAgZ2V0OiAobWVkaWFJdGVtSWQ6IGFueSkgPT4gUHJvbWlzZTx7XHJcbiAgICAgICAgICByZXN1bHQ6IEdvb2dsZU1lZGlhSXRlbTtcclxuICAgICAgICB9PjtcclxuICAgICAgfTtcclxuICAgIH07XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVQaG90b0FQSSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlUGhvdG9BUElcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGdhcGk6IEdvb2dsZVBob3RvQVBJO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBob3RvU2lnbmluIHtcclxuICBwcml2YXRlIHBlb3BsZUFwaURpc2NvdmVyeSA9IFwiXCI7XHJcbiAgLy8gd2hlcmUgdG8gc3RvcmUgdGhlc2UgdmFsdWVzP1xyXG4gIHByaXZhdGUgc2NvcGVzID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3Bob3Rvc2xpYnJhcnkucmVhZG9ubHlcIjtcclxuICBwcml2YXRlIGF1dGhvcml6ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0aG9yaXplLWJ1dHRvblwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBwcml2YXRlIHNpZ25vdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25vdXQtYnV0dG9uXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZHkgPSAoKSA9PiB7IH07XHJcbiAgYXN5bmMgaGFuZGxlQ2xpZW50TG9hZCgpIHtcclxuICAgIC8vIExvYWQgdGhlIEFQSSBjbGllbnQgYW5kIGF1dGgyIGxpYnJhcnkuXHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGdhcGkubG9hZChcImNsaWVudDphdXRoMlwiLCByZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGNyZWRlbnRpYWxzUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi4vd2ViL2NyZWRlbnRpYWxzLmpzb25cIik7XHJcbiAgICBsZXQgY3JlZGVudGlhbHM6IHtcclxuICAgICAgYXBpS2V5OiBzdHJpbmc7XHJcbiAgICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICB9ID0gYXdhaXQgY3JlZGVudGlhbHNSZXNwb25zZS5qc29uKCk7XHJcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGZldGNoKFwiLi93ZWIvcGhvdG9zX3Jlc3RfdjEuanNvblwiKTtcclxuICAgIHRoaXMucGVvcGxlQXBpRGlzY292ZXJ5ID0gYXdhaXQgcmVzcC5qc29uKCk7XHJcbiAgICBhd2FpdCB0aGlzLmluaXRDbGllbnQoY3JlZGVudGlhbHMpO1xyXG4gIH1cclxuICBwcml2YXRlIGFzeW5jIGluaXRDbGllbnQoYXJnczoge1xyXG4gICAgYXBpS2V5OiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gIH0pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChnb29kLCBiYWQpID0+IHtcclxuICAgICAgdGhpcy5yZWFkeSA9ICgpID0+IGdvb2QoKTtcclxuICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7XHJcbiAgICAgICAgYXBpS2V5OiBhcmdzLmFwaUtleSxcclxuICAgICAgICBkaXNjb3ZlcnlEb2NzOiBbdGhpcy5wZW9wbGVBcGlEaXNjb3ZlcnldLFxyXG4gICAgICAgIGNsaWVudElkOiBhcmdzLmNsaWVudElkLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlcyxcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIExpc3RlbiBmb3Igc2lnbi1pbiBzdGF0ZSBjaGFuZ2VzLlxyXG4gICAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLmlzU2lnbmVkSW4ubGlzdGVuKHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKTtcclxuICAgICAgLy8gSGFuZGxlIHRoZSBpbml0aWFsIHNpZ24taW4gc3RhdGUuXHJcbiAgICAgIHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuaXNTaWduZWRJbi5nZXQoKSk7XHJcbiAgICAgIHRoaXMuYXV0aG9yaXplQnV0dG9uLm9uY2xpY2sgPSB0aGlzLmhhbmRsZUF1dGhDbGljaztcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uLm9uY2xpY2sgPSB0aGlzLmhhbmRsZVNpZ25vdXRDbGljaztcclxuICAgIH0pO1xyXG4gIH1cclxuICBwcml2YXRlIHVwZGF0ZVNpZ25pblN0YXR1cyhpc1NpZ25lZEluOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNTaWduZWRJbikge1xyXG4gICAgICB0aGlzLmF1dGhvcml6ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIHRoaXMuc2lnbm91dEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICB0aGlzLnJlYWR5KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRob3JpemVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBoYW5kbGVBdXRoQ2xpY2soKSB7XHJcbiAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLnNpZ25JbigpO1xyXG4gIH1cclxuICBwcml2YXRlIGhhbmRsZVNpZ25vdXRDbGljaygpIHtcclxuICAgIGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuc2lnbk91dCgpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEdvb2dsZUFsYnVtIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgY292ZXJQaG90b0Jhc2VVcmw6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVQaG90b1NpZ25pbiB9IGZyb20gXCIuL0dvb2dsZVBob3RvU2lnbmluXCI7XHJcbmltcG9ydCB7IEdvb2dsZU1lZGlhSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlTWVkaWFJdGVtXCI7XHJcbmltcG9ydCB7IEdvb2dsZUFsYnVtIH0gZnJvbSBcIi4uL21vZGVscy9Hb29nbGVBbGJ1bVwiO1xyXG5pbXBvcnQgeyBHb29nbGVQaG90b0FQSSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlUGhvdG9BUElcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGdhcGk6IEdvb2dsZVBob3RvQVBJO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBob3RvcyB7XHJcblxyXG4gIGFzeW5jIGdldEFsYnVtcygpIHtcclxuICAgIGxldCBzaWduaW4gPSBuZXcgR29vZ2xlUGhvdG9TaWduaW4oKTtcclxuICAgIGF3YWl0IHNpZ25pbi5oYW5kbGVDbGllbnRMb2FkKCk7XHJcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkuYWxidW1zLmxpc3QoKTtcclxuICAgIGlmIChyZXNwLnN0YXR1cyAhPT0gMjAwKVxyXG4gICAgICB0aHJvdyBgc3RhdHVzOiAke3Jlc3Auc3RhdHVzfWA7XHJcbiAgICBjb25zb2xlLmxvZyh7IHJlc3AgfSk7XHJcbiAgICBsZXQgYWxidW1zID0gcmVzcC5yZXN1bHQuYWxidW1zIGFzIEFycmF5PEdvb2dsZUFsYnVtPjtcclxuICAgIHdoaWxlIChyZXNwLnJlc3VsdC5uZXh0UGFnZVRva2VuKSB7XHJcbiAgICAgIHJlc3AgPSBhd2FpdCBnYXBpLmNsaWVudC5waG90b3NsaWJyYXJ5LmFsYnVtcy5saXN0KHtwYWdlVG9rZW46IHJlc3AucmVzdWx0Lm5leHRQYWdlVG9rZW59KTtcclxuICAgICAgaWYgKHJlc3Auc3RhdHVzICE9PSAyMDApXHJcbiAgICAgICAgdGhyb3cgYHN0YXR1czogJHtyZXNwLnN0YXR1c31gO1xyXG4gICAgICBjb25zb2xlLmxvZyh7IHJlc3AgfSk7XHJcbiAgICAgIGFsYnVtcyA9IGFsYnVtcy5jb25jYXQocmVzcC5yZXN1bHQuYWxidW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhbGJ1bXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGJ1bShhbGJ1bTogR29vZ2xlQWxidW0pIHtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5tZWRpYUl0ZW1zLnNlYXJjaCh7IGFsYnVtSWQ6IGFsYnVtLmlkIH0pO1xyXG4gICAgbGV0IHttZWRpYUl0ZW1zfSA9IGRhdGEucmVzdWx0O1xyXG4gICAgd2hpbGUgKGRhdGEucmVzdWx0Lm5leHRQYWdlVG9rZW4pIHtcclxuICAgICAgZGF0YSA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkubWVkaWFJdGVtcy5zZWFyY2goeyBhbGJ1bUlkOiBhbGJ1bS5pZCwgcGFnZVRva2VuOiBkYXRhLnJlc3VsdC5uZXh0UGFnZVRva2VuIH0pO1xyXG4gICAgICBtZWRpYUl0ZW1zLnB1c2goLi4uZGF0YS5yZXN1bHQubWVkaWFJdGVtcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVkaWFJdGVtcztcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFBob3RvKG1lZGlhSXRlbUlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5tZWRpYUl0ZW1zLmdldCh7IG1lZGlhSXRlbUlkIH0pO1xyXG4gICAgcmV0dXJuIChkYXRhLnJlc3VsdCkgYXMgR29vZ2xlTWVkaWFJdGVtO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBHb29nbGVQaG90b3MgfSBmcm9tIFwiLi4vY29udHJvbHMvR29vZ2xlUGhvdG9zXCI7XHJcbmltcG9ydCB7IEdvb2dsZUNvbGxhZ2VQaG90byB9IGZyb20gXCIuLi9jb250cm9scy9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcGVuQWxidW1zQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgYXN5bmMgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxmYWxzZSB8IHZvaWQ+IHtcclxuICAgICAgICBpZiAoIWFyZ3MpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuQWxidW1zKHJlcGwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbGJ1bU5hbWVzID0gYXJncy5zcGxpdChcIixcIik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5vcGVuQWxidW1zKHJlcGwsIGFsYnVtTmFtZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9wZW5BbGJ1bXMocmVwbDogUmVwbCwgYWxidW1OYW1lcz86IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgcGhvdG9zID0gbmV3IEdvb2dsZVBob3RvcygpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG9zXCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgbGV0IGFsYnVtcyA9IGF3YWl0IHBob3Rvcy5nZXRBbGJ1bXMoKTtcclxuICAgICAgICAgICAgaWYgKGFsYnVtTmFtZXMpIGFsYnVtcyA9IGFsYnVtcy5maWx0ZXIoYSA9PiAtMSA8IGFsYnVtTmFtZXMuaW5kZXhPZihhLnRpdGxlKSk7XHJcbiAgICAgICAgICAgIGFsYnVtcy5mb3JFYWNoKGFzeW5jIChhbGJ1bSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9wZW5pbmcgYWxidW06ICR7YWxidW0uaWR9ICgke2FsYnVtLnRpdGxlfSlgKTtcclxuICAgICAgICAgICAgICAgIGxldCBtZWRpYUl0ZW1zID0gYXdhaXQgcGhvdG9zLmdldEFsYnVtKGFsYnVtKTtcclxuICAgICAgICAgICAgICAgIG1lZGlhSXRlbXMuZm9yRWFjaChtZWRpYUl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaG90byA9IG5ldyBHb29nbGVDb2xsYWdlUGhvdG8obWVkaWFJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBsLnBob3Rvcy5wdXNoKHBob3RvKTtcclxuICAgICAgICAgICAgICAgICAgICBwaG90by5yZW5kZXJJbnRvKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbC5yZWluZGV4UGhvdG9zKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuLi9tb2RlbHMvQmVoYXZpb3JcIjtcclxuXHJcbi8qKlxyXG4gKiBXaGVuIHVzZXIgc2hpZnQtY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzc1xyXG4gKiBXaGVuIHVzZXIgY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzcywgcmVtb3ZlIFwiZm9jdXNcIiBmcm9tIGFsbCBvdGhlcnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdG9yIGltcGxlbWVudHMgQmVoYXZpb3I8UmVwbD5cclxue1xyXG4gICAgZXh0ZW5kKGNvbnRyb2w6IFJlcGwpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgY3VycmVudCBcImZvY3VzXCIgaWYgc2hpZnQgbm90IGNsaWNrZWRcclxuICAgICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC5wYW5lbHMuZm9yRWFjaChwID0+IHAucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGFuZWxzID0gZXZlbnQuY29tcG9zZWRQYXRoKCk7XHJcbiAgICAgICAgICAgIHBhbmVscyA9IHBhbmVscy5maWx0ZXIoKG5vZGU6IGFueSkgPT4gdHJ1ZSA9PT0gbm9kZT8uY2xhc3NMaXN0Py5jb250YWlucyhcInBhbmVsXCIpKSBhcyBBcnJheTxIVE1MRWxlbWVudD47ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhbmVscy5mb3JFYWNoKChub2RlOiBhbnkpID0+IG5vZGUuY2xhc3NMaXN0LnRvZ2dsZShcImZvY3VzXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi4vbW9kZWxzL0JlaGF2aW9yXCI7XHJcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tIFwiLi4vY29udHJvbHMvVG9hc3RlclwiO1xyXG5cclxuLyoqXHJcbiAqIFdoZW4gdXNlciBzaGlmdC1jbGlja3MgYSBwYW5lbCBhZGQgXCJmb2N1c1wiIGNsYXNzXHJcbiAqIFdoZW4gdXNlciBjbGlja3MgYSBwYW5lbCBhZGQgXCJmb2N1c1wiIGNsYXNzLCByZW1vdmUgXCJmb2N1c1wiIGZyb20gYWxsIG90aGVyc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkJlaGF2aW9yIGltcGxlbWVudHMgQmVoYXZpb3I8UmVwbD5cclxue1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRvYXN0ZXI6IFRvYXN0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBleHRlbmQoY29udHJvbDogUmVwbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBub3RpZnkgPSBjb250cm9sLm5vdGlmeTtcclxuICAgICAgICBjb250cm9sLm5vdGlmeSA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0ZXIudG9hc3QobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi4vY29udHJvbHMvQ29sbGFnZVBhbmVsXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICogU2NhbGUgdGhlIGltYWdlXHJcbiAqIEBwYXJhbSBzY2FsZSBwZXJjZW50YWdlIGRlbHRhIGZyb20gY3VycmVudCBzY2FsZVxyXG4gKi9cclxuZnVuY3Rpb24gc2NhbGVJbWFnZShyZXBsOiBSZXBsLCBwYW5lbDogQ29sbGFnZVBhbmVsLCBzY2FsZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IHBhbmVsLmltYWdlO1xyXG4gICAgaWYgKCFub2RlKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS53aWR0aDtcclxuICAgICAgICBsZXQgc2NhbGUgPSBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDtcclxuICAgICAgICByZXBsLmFuaW1hdGlvbnMuYW5pbWF0ZShcInpvb21cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBzY2FsZSAqPSAxLjAxO1xyXG4gICAgICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gYCR7MTAwICogc2NhbGV9JWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBjb21wdXRlIGZvY2FsIHBvaW50IHRvIHpvb20gYWJvdXRcclxuICAgICAgICAvLyBsZXQgaW1hZ2VCb3ggPSBiYm94KG5vZGUpO1xyXG4gICAgICAgIC8vIGxldCBwYW5lbEJveCA9IGJib3gocGFuZWwucGFuZWwpO1xyXG4gICAgICAgIC8vIGxldCBmb2NhbFBvaW50ID0gWy1pbWFnZUJveC5sZWZ0ICsgcGFuZWxCb3gud2lkdGggLyAyLCAtaW1hZ2VCb3gudG9wICsgcGFuZWxCb3guaGVpZ2h0IC8gMl07XHJcbiAgICAgICAgbGV0IGVmZmVjdGl2ZVNjYWxlID0gcGFyc2VGbG9hdChzY2FsZSk7XHJcbiAgICAgICAgLy9ub2RlLnN0eWxlLndpZHRoID0gYCR7MTAwICogZWZmZWN0aXZlU2NhbGV9JWA7XHJcbiAgICAgICAgLy8gdGhlIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQgY2hhbmdlZCwgdHJhbnNsYXRlIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gICAgICAgIC8vIGNlbnRlciBiYWNrIHRvIHRoZSBwYW5lbCBjZW50ZXJcclxuICAgICAgICB0cmFuc2Zvcm0obm9kZSwgYHNjYWxlKCR7ZWZmZWN0aXZlU2NhbGV9LCR7ZWZmZWN0aXZlU2NhbGV9KWApO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjYWxlUGFuZWxDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NhbGU/OiBudW1iZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBhYm91dCgpIHtcclxuICAgICAgcmV0dXJuIGBzY2FsZSBwYW5lbCBieSAkeyh0aGlzLnNjYWxlfHwwKS50b0ZpeGVkKDMpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgICAgICBpZiAoISFhcmdzKSB7XHJcbiAgICAgICAgICAgIGxldCBbbm91biwgbm91bjJdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwobm91bik7XHJcbiAgICAgICAgICAgIGlmICghcGFuZWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcGFuZWwuc2NhbGVGcmFtZShub3VuMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgICAgICAgcGFuZWwuc2NhbGVGcmFtZSh0aGlzLnNjYWxlICsgXCJcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2FsZUltYWdlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHNjYWxlPzogbnVtYmVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgYWJvdXQoKSB7XHJcbiAgICAgIHJldHVybiBgc2NhbGUgaW1hZ2UgYnkgJHsodGhpcy5zY2FsZXx8MCkudG9GaXhlZCgzKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICAgICAgaWYgKCEhYXJncykge1xyXG4gICAgICAgICAgICBsZXQgW2lkLCBzY2FsZV0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gcmVwbC5zZWxlY3RQYW5lbChpZCk7XHJcbiAgICAgICAgICAgIGlmICghcGFuZWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgc2NhbGVJbWFnZShyZXBsLCBwYW5lbCwgc2NhbGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc2NhbGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgICAgICAgc2NhbGVJbWFnZShyZXBsLCBwYW5lbCwgdGhpcy5zY2FsZSArIFwiXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSBcIi4vY29udHJvbHMvVG9hc3RlclwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcCB9IGZyb20gXCIuL2NvbnRyb2xzL0RyYWdBbmREcm9wXCI7XHJcbmltcG9ydCB7IENvbW1hbmRzIH0gZnJvbSBcIi4vY29udHJvbHMvQ29tbWFuZHNcIjtcclxuaW1wb3J0IHsgSGVscENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9IZWxwXCI7XHJcbmltcG9ydCB7IFNwbGl0Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1NwbGl0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBBc3BlY3RSYXRpb0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Bc3BlY3RSYXRpb0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgQm9yZGVyQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0JvcmRlckNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhbmdlU3R5bGVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlU3R5bGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IEdvdG9Db21tYW5kRWRpdG9yQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTd2FwUGFuZWxzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kXCI7XHJcbmltcG9ydCB7IEdvdG9Db21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvR290b0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgVGV4dENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9UZXh0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBQYWRDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvUGFkQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RyYW5zbGF0ZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWFyZ2luQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01hcmdpbkNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWVyZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvTWVyZ2VDb21tYW5kXCI7XHJcbmltcG9ydCB7IEhpUmVzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0hpUmVzQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNb3ZlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01vdmVDb21tYW5kXCI7XHJcbmltcG9ydCB7IFJvdGF0ZVBhbmVsQ29tbWFuZCwgUm90YXRlSW1hZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlUm90YXRpb25Db21tYW5kXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0NoYW5nZVBvc2l0aW9uQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTdG9wQ29tbWFuZCwgVG9nZ2xlRm9jdXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvU3RvcENvbW1hbmRcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVycyB9IGZyb20gXCIuL2NvbnRyb2xzL0tleWJvYXJkSGFuZGxlcnNcIjtcclxuaW1wb3J0IHsgRXNjYXBlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0VzY2FwZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhbmdlRm9udFNpemVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kXCI7XHJcbmltcG9ydCB7IE9wZW5BbGJ1bXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RvciB9IGZyb20gXCIuL2JlaGF2aW9yL011bHRpU2VsZWN0b3JcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uQmVoYXZpb3IgfSBmcm9tIFwiLi9iZWhhdmlvci9Ob3RpZmljYXRpb25CZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBTY2FsZVBhbmVsQ29tbWFuZCwgU2NhbGVJbWFnZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmRcIjtcclxuXHJcbi8qKiBnbG9iYWwgdmFyaWFibGVzICovXHJcbmNvbnN0IHRvYXN0ZXIgPSBuZXcgVG9hc3Rlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0ZXJcIikgYXMgSFRNTEVsZW1lbnQpO1xyXG5jb25zdCBjb21tYW5kcyA9IG5ldyBDb21tYW5kcygpO1xyXG5jb25zdCByZXBsID0gbmV3IFJlcGwoY29tbWFuZHMpO1xyXG5jb25zdCBrZXlib2FyZEhhbmRsZXJzID0gbmV3IEtleWJvYXJkSGFuZGxlcnMoKTtcclxucmVwbC51c2UobmV3IE11bHRpU2VsZWN0b3IoKSk7XHJcbnJlcGwudXNlKG5ldyBOb3RpZmljYXRpb25CZWhhdmlvcih0b2FzdGVyKSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgSGVscENvbW1hbmQoKSwgeyBrZXk6IFwiP1wiLCBhYm91dDpcIkhlbHBcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IEVzY2FwZUNvbW1hbmQoKSwgeyBrZXk6IFwiRXNjYXBlXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQoMSksIHsga2V5OiBcIitcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZUZvbnRTaXplQ29tbWFuZCgtMSksIHsga2V5OiBcIi1cIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZVBhbmVsQ29tbWFuZCgxLjAxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIitcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFNjYWxlUGFuZWxDb21tYW5kKDEgLyAxLjAxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIi1cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFNjYWxlSW1hZ2VDb21tYW5kKDEuMDEpLCB7IGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZUltYWdlQ29tbWFuZCgxIC8gMS4wMSksIHsga2V5OiBcIi1cIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoMSksIHsga2V5OiBcIi5cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZUltYWdlQ29tbWFuZCgtMSksIHsga2V5OiBcIixcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZVBhbmVsQ29tbWFuZCgxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIj5cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZVBhbmVsQ29tbWFuZCgtMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCI8XCIgfSk7XHJcblxyXG4vKiogdmltIGNvbW1hbmRzXHJcblRvIG1vdmUgbGVmdCwgcHJlc3MgaC5cclxuVG8gbW92ZSByaWdodCwgcHJlc3MgbC5cclxuVG8gbW92ZSBkb3duLCBwcmVzcyBqLlxyXG5UbyBtb3ZlIHVwLCBwcmVzcyBrLlxyXG4gKi9cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHg6IC0xIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dMZWZ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVQYW5lbENvbW1hbmQoeyB4OiAxIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dSaWdodFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeTogMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93RG93blwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeTogLTEgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJBcnJvd1VwXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeDogLTEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dMZWZ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB4OiAxIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93UmlnaHRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCh7IHk6IDEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dEb3duXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB5OiAtMSB9KSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCJBcnJvd1VwXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwidG9wXCIsIHsgZGVsdGE6IDEsIHVuaXRzOiBcInB4XCIgfSksIHsga2V5OiBcInRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcInRvcFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIlRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImxlZnRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwibFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwibGVmdFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkxcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvdHRvbVwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJiXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3R0b21cIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJCXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJyaWdodFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJyXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJyaWdodFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIlJcIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ3aWR0aFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJ3XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ3aWR0aFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIldcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImhlaWdodFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJoXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJIXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU3dhcFBhbmVsc0NvbW1hbmQoKSwgeyBjdHJsS2V5OiB0cnVlLCBrZXk6IFwic1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU3RvcENvbW1hbmQoKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIiBcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IEdvdG9Db21tYW5kRWRpdG9yQ29tbWFuZCgpLCB7IGtleTogXCJjXCIsIGFib3V0OlwiZ290byBjb21tYW5kc1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVG9nZ2xlRm9jdXNDb21tYW5kKCksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIgXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUb2dnbGVGb2N1c0NvbW1hbmQoKSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCIgXCIgfSk7XHJcblxyXG5jb25zdCBkbmQgPSBuZXcgRHJhZ0FuZERyb3AocmVwbCwga2V5Ym9hcmRIYW5kbGVycyk7XHJcbnJlcGwuZG5kID0gZG5kO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBIZWxwQ29tbWFuZCgpLCBcIj9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgT3BlbkFsYnVtc0NvbW1hbmQoKSwgXCJvcGVuXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBBc3BlY3RSYXRpb0NvbW1hbmQoKSwgXCJhc3BlY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQm9yZGVyQ29tbWFuZCgpLCBcImJvcmRlclwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBHb3RvQ29tbWFuZCgpLCBcImdvdG9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgSGlSZXNDb21tYW5kKCksIFwiaGlyZXNcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgTWFyZ2luQ29tbWFuZCgpLCBcIm1hcmdpblwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNZXJnZUNvbW1hbmQoKSwgXCJtZXJnZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNb3ZlQ29tbWFuZCgpLCBcIm1vdmVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgUGFkQ29tbWFuZCgpLCBcInBhZFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoKSwgXCJyb3RhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU2NhbGVQYW5lbENvbW1hbmQoKSwgXCJzY2FsZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBTd2FwUGFuZWxzQ29tbWFuZCgpLCBcInN3YXBcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3BsaXRDb21tYW5kKCksIFwic3BsaXRcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3RvcENvbW1hbmQoKSwgXCJzdG9wXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFRleHRDb21tYW5kKCksIFwidGV4dFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoKSwgXCJ0cmFuc2xhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKCksIFwicGFuXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFNjYWxlSW1hZ2VDb21tYW5kKCksIFwiem9vbVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJiYWNrZ3JvdW5kQ29sb3JcIiksIFwiYmdjXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCh7IHNlbGVjdG9yOiBcIi5jb2xsYWdlIC5wYW5lbC1jb250YWluZXIgLm92ZXJsYXlcIiB9KSwgXCJvdmVybGF5XCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJDb2xvclwiKSwgXCJiY1wiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BDb2xvclwiKSwgXCJiY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tQ29sb3JcIiksIFwiYmNiXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckxlZnRDb2xvclwiKSwgXCJiY2xcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmlnaHRDb2xvclwiKSwgXCJiY3JcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlcldpZHRoXCIsIHt1bml0czpcInB4XCJ9KSwgXCJid1wiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJCb3R0b21XaWR0aFwiKSwgXCJid2JcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wV2lkdGhcIiksIFwiYnd0XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckxlZnRXaWR0aFwiKSwgXCJid2xcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmlnaHRXaWR0aFwiKSwgXCJid3JcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcIm9wYWNpdHlcIiksIFwib3BhY2l0eVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJSYWRpdXNcIiksIFwiYnJcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiKSwgXCJicnRsXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCIpLCBcImJydHJcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiKSwgXCJicmJsXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCIpLCBcImJyYnJcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcIndpZHRoXCIsIHsgdW5pdHM6IFwiZW1cIiB9KSwgXCJ3aWR0aFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyB1bml0czogXCJweFwiIH0pLCBcImhlaWdodFwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiekluZGV4XCIpLCBcInpcIik7XHJcblxyXG50b2FzdGVyLnRvYXN0KFwiV2VsY29tZSFcIik7XHJcbmV4cG9ydCBsZXQgZ2xvYmFscyA9IHtcclxuICAgIGFsbG93U3BlZWNoUmVjb2duaXRpb246IGZhbHNlLFxyXG4gICAgZGVidWc6IHRydWUsXHJcbiAgICByZXBsLFxyXG4gICAgZG5kLFxyXG4gICAga2V5Ym9hcmRIYW5kbGVycyxcclxufVxyXG4iLCJpbXBvcnQgeyBMaXN0ZW5lciB9IGZyb20gXCIuLi9jb250cm9scy9MaXN0ZW5lclwiO1xyXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSBcIi4uL2dsb2JhbHNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydCgpIHtcclxuICBsZXQgcmVwbCA9IGdsb2JhbHMucmVwbDtcclxuICBhd2FpdCByZXBsLnN0YXJ0dXAoKTtcclxuICBpZiAoZ2xvYmFscy5hbGxvd1NwZWVjaFJlY29nbml0aW9uKSB7XHJcbiAgICBsZXQgbGlzdGVuZXIgPSBuZXcgTGlzdGVuZXIoKTtcclxuICAgIGxpc3RlbmVyLmxpc3RlbigpO1xyXG4gICAgbGlzdGVuZXIub24oXCJzcGVlY2gtZGV0ZWN0ZWRcIiwgdmFsdWUgPT4geyByZXBsLmV4ZWN1dGVDb21tYW5kKHJlcGwucGFyc2VDb21tYW5kKHZhbHVlLnJlc3VsdCkpOyB9KTtcclxuICB9XHJcbiAgcmVwbC5nZXRQaG90b092ZXJsYXlzKCkuZm9yRWFjaChvdmVybGF5ID0+IHtcclxuICAgIGdsb2JhbHMuZG5kLmRyYWdnYWJsZShvdmVybGF5KTtcclxuICAgIGNvbnNvbGUubG9nKGAke292ZXJsYXkuaW5uZXJIVE1MfSBpcyBkcmFnZ2FibGVgKTtcclxuICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBzdGFydCB9IGZyb20gXCIuL2NvbGxhZ2UvZnVuL3N0YXJ0XCI7XHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi9jb2xsYWdlL2dsb2JhbHNcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgY29uc3QgcmVwbCA9IGdsb2JhbHMucmVwbDtcclxuXHJcbiAgICByZXBsLmV2YWwoXCJhc3BlY3QgNiA2XCIpO1xyXG4gICAgaWYgKGdsb2JhbHMuZGVidWcpIHtcclxuICAgICAgcmVwbC5ldmFsKFwiP1wiKTtcclxuICAgICAgICByZXBsLmV2YWwoXCJzcGxpdCAxXCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcIm1lcmdlIDQgM1wiKTtcclxuICAgICAgICByZXBsLmV2YWwoXCJzcGxpdCAyXCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcIm1lcmdlIDQgNVwiKTtcclxuICAgICAgICByZXBsLmV2YWwoXCJtZXJnZSAyIDNcIik7XHJcbiAgICAgICAgLy8vcmVwbC5ldmFsKFwic3BsaXQgMVwiKTtcclxuXHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYncgMWVtXCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcImJjIHdoaXRlXCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcImJnYyBzaWx2ZXJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwic2NhbGUgMSAwLjc1XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcImJvcmRlciAxIDMgc2lsdmVyXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInJvdGF0ZSAxIC0yXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInpvb20gMiAwLjVcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwic3BsaXQgMVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJtZXJnZSAxIDJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwic3BsaXQgNlwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJtZXJnZSA4IDlcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwibWVyZ2UgNiA3XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcImdvdG8gMVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJ0ZXh0IDEgU3VtbWVyIDIwMTlcIik7XHJcbnJldHVybjtcclxuICAgICAgICBhd2FpdCByZXBsLmV2YWwoXCJvcGVuIERhdGUgTmlnaHQsMjAxOVwiKTsgLy8gcHJlc2VudCBsaXN0IG9mIGdvb2dsZSBwaG90byBhbGJ1bXM/XHJcbiAgICAgICAgLy9hd2FpdCByZXBsLmV2YWwoXCJvcGVuIGdwIDE5OTlcIik7IC8vIG9wZW4gZ29vZ2xlIHBob3RvIGFsYnVtIFwiMTk5OVwiP1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhbmVsQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbGxhZ2UgLnBhbmVsXCIpLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IHBob3RvQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbGxhZ2UgLnBob3RvcyAuaW1nXCIpLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcGFuZWxDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXBsLmV2YWwoYG1vdmUgJHsxICsgKGkgLSAxKSAlIHBob3RvQ291bnR9ICR7aX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyByZXBsLmV2YWwoXCJvcGVuIDFcIik7XHJcbiAgICAgICAgICAgIC8vIHJlcGwuZXZhbChcImhpcmVzIDZcIik7XHJcbiAgICAgICAgICAgIC8vIHJlcGwuZXZhbChcImV4cG9ydFwiKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxufVxyXG5cclxucnVuKCk7XHJcbiJdfQ==
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
        constructor() {
            this.initialized = false;
        }
        execute(repl, args) {
            const target = document.querySelector(".help");
            if (!target)
                throw "cannot show help unless a HTMLSelectElement is defined with a className of 'help'";
            if (!this.initialized) {
                const commands = globals_2.globals.repl.commands.list().map(name => ({ command: globals_2.globals.repl.commands.get(name), name }));
                const keyboardCommands = globals_2.globals.keyboardHandlers.list();
                const markup1 = commands.map(c => `<option value="${c.name}">"${c.name}" - ${c.command.about ? c.command.about() : "command"}</option>`).sort().join("");
                const markup2 = keyboardCommands.map((c, i) => `<option value="${c.key}">"${c.key}" - ${(c.about)}</code></option>`).sort().join("");
                target.innerHTML = `${markup1}${markup2}`;
                target.addEventListener("change", () => {
                    document.querySelector(".console").value = target.value;
                });
            }
            target.toggleAttribute("hidden");
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
            this.authorizeButton = null;
            this.signoutButton = null;
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
            this.authorizeButton = document.getElementById("authorize-button");
            if (!this.authorizeButton)
                throw "a clickable element must exist with id of 'authorize-button'";
            this.signoutButton = document.getElementById("signout-button");
            if (!this.signoutButton)
                throw "a clickable element must exist with id of 'signout-button'";
            return new Promise(async (good, bad) => {
                this.ready = () => good();
                await gapi.client.init({
                    apiKey: args.apiKey,
                    discoveryDocs: [this.peopleApiDiscovery],
                    clientId: args.clientId,
                    scope: this.scopes,
                });
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(status => this.updateSigninStatus(status));
                // Handle the initial sign-in state.
                this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                this.authorizeButton.onclick = () => this.handleAuthClick();
                this.signoutButton.onclick = () => this.handleSignoutClick();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xsYWdlL21vZGVscy9EaWN0aW9uYXJ5LnRzIiwiY29sbGFnZS9jb250cm9scy9MaXN0ZW5lci50cyIsImNvbGxhZ2UvY29udHJvbHMvVG9hc3Rlci50cyIsImNvbGxhZ2UvZnVuL3RhaWwudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRQYXJzZXIudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQaG90by50cyIsImNvbGxhZ2UvbW9kZWxzL0dvb2dsZU1lZGlhSXRlbS50cyIsImNvbGxhZ2UvY29udHJvbHMvR29vZ2xlQ29sbGFnZVBob3RvLnRzIiwiY29sbGFnZS9jb250cm9scy9TcHJpdGUudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbC50cyIsImNvbGxhZ2UvY29udHJvbHMvQW5pbWF0aW9ucy50cyIsImNvbGxhZ2UvbW9kZWxzL0NvbW1hbmQudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRzLnRzIiwiY29sbGFnZS9mdW4vZ2V0QWN0aXZlT3ZlcmxheS50cyIsImNvbGxhZ2UvbW9kZWxzL0tleWJvYXJkSGFuZGxlci50cyIsImNvbGxhZ2UvY29udHJvbHMvS2V5Ym9hcmRIYW5kbGVycy50cyIsImNvbGxhZ2UvZnVuL3RyYW5zZm9ybS50cyIsImNvbGxhZ2UvZnVuL2Jib3gudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0RyYWdBbmREcm9wLnRzIiwiY29sbGFnZS9tb2RlbHMvQmVoYXZpb3IudHMiLCJjb2xsYWdlL2NvbnRyb2xzL1JlcGwudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hlbHAudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1NwbGl0Q29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQXNwZWN0UmF0aW9Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Cb3JkZXJDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTdHlsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvZ2V0Rm9jdXNQYW5lbHMudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Hb3RvQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvVGV4dENvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1BhZENvbW1hbmQudHMiLCJjb2xsYWdlL2Z1bi9pc1Zpc2libGUudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9UcmFuc2xhdGVDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NYXJnaW5Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NZXJnZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hpUmVzQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvTW92ZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0NoYW5nZVJvdGF0aW9uQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlUG9zaXRpb25Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9TdG9wQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvRXNjYXBlQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlUGhvdG9BUEkudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3RvU2lnbmluLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlQWxidW0udHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3Rvcy50cyIsImNvbGxhZ2UvY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmQudHMiLCJjb2xsYWdlL2JlaGF2aW9yL011bHRpU2VsZWN0b3IudHMiLCJjb2xsYWdlL2JlaGF2aW9yL05vdGlmaWNhdGlvbkJlaGF2aW9yLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2dsb2JhbHMudHMiLCJjb2xsYWdlL2Z1bi9zdGFydC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0NBOztPQUVHO0lBQ0gsTUFBYSxRQUFRO1FBSW5CO1lBRkEsWUFBTyxHQUFZLElBQUksQ0FBQztZQUN4QixjQUFTLEdBQVksSUFBSSxDQUFDO1lBa0NsQixlQUFVLEdBR0gsRUFBRSxDQUFDO1lBbkNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQVUsTUFBTyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsQ0FBQztZQUNsRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ25DLFdBQVcsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQ25DLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQy9CLFdBQVcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQzNCLFdBQVcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVM7b0JBQ2hCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLEtBQUssSUFBSSxDQUFDLEdB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LDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzdHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzVHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFFM0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM5RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx3Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM5RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx3Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM3RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx3Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRTVHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN6RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRTVILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxRQUFRLEVB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QVUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RDtnQkFDRCx1QkFBdUI7Z0JBQ3ZCLHdCQUF3QjtnQkFDeEIsdUJBQXVCO1lBQzNCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNaO0lBQ0wsQ0FBQztJQUVELEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIE9uZSBiaWcgaGFwcHkgZmFtaWx5IG9mIGNsYXNzZXMgdG8gYXZvaWQgbG9hZGluZ1xyXG4gKiBhbmQgY29uY2F0aW5hdGlvblxyXG4gKi9cclxuLyoqIEludGVyZmFjZXMgICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGljdGlvbmFyeTxUPiB7XHJcbiAgW0tleTogc3RyaW5nXTogVDtcclxufVxyXG4iLCJpbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL21vZGVscy9EaWN0aW9uYXJ5XCI7XHJcbi8qKlxyXG4gKiBHb29nbGUgc3BlZWNoIHJlY29nbml0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTGlzdGVuZXIge1xyXG4gIHJlY29nbml0aW9uOiBTcGVlY2hSZWNvZ25pdGlvbjtcclxuICBzdG9wcGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICBhdXRvc3RhcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyAoPGFueT53aW5kb3cpW1wid2Via2l0U3BlZWNoUmVjb2duaXRpb25cIl0oKTtcclxuICAgIGxldCByZWNvZ25pdGlvbiA9IHRoaXMucmVjb2duaXRpb247XHJcbiAgICByZWNvZ25pdGlvbi5pbnRlcmltUmVzdWx0cyA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXRpb24uY29udGludW91cyA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXRpb24ubGFuZyA9IFwiZW4tUEhcIjtcclxuICAgIHJlY29nbml0aW9uLm1heEFsdGVybmF0aXZlcyA9IDU7XHJcbiAgICByZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKFwic3RhcnRcIiwgZSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICByZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZW5kXCIsIGUgPT4ge1xyXG4gICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMuYXV0b3N0YXJ0KVxyXG4gICAgICAgIHJlY29nbml0aW9uLnN0YXJ0KCk7XHJcbiAgICB9KTtcclxuICAgIHJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXN1bHRcIiwgZSA9PiB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZS5yZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGUucmVzdWx0c1tpXTtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRmluYWwpIHtcclxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2NyaXB0ID0gcmVzdWx0W2pdLnRyYW5zY3JpcHQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyYW5zY3JpcHQsIHJlc3VsdFtqXSk7XHJcbiAgICAgICAgICAgIGxldCBjb25maWRlbmNlID0gcmVzdWx0W2pdLmNvbmZpZGVuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInNwZWVjaC1kZXRlY3RlZFwiLCB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0OiB0cmFuc2NyaXB0LFxyXG4gICAgICAgICAgICAgIHBvd2VyOiBjb25maWRlbmNlICogMTAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzOiBEaWN0aW9uYXJ5PEFycmF5PCh2YWx1ZToge1xyXG4gICAgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICBwb3dlcjogbnVtYmVyO1xyXG4gIH0pID0+IHZvaWQ+PiA9IHt9O1xyXG4gIHByaXZhdGUgY2FsbGJhY2tzKHRvcGljOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLl9jYWxsYmFja3NbdG9waWNdID0gdGhpcy5fY2FsbGJhY2tzW3RvcGljXSA/PyBbXTtcclxuICB9XHJcbiAgb24odG9waWM6IHN0cmluZywgY2I6ICh2YWx1ZToge1xyXG4gICAgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICBwb3dlcjogbnVtYmVyO1xyXG4gIH0pID0+IHZvaWQpIHtcclxuICAgIHRoaXMuY2FsbGJhY2tzKHRvcGljKS5wdXNoKGNiKTtcclxuICB9XHJcbiAgdHJpZ2dlcih0b3BpYzogc3RyaW5nLCB2YWx1ZToge1xyXG4gICAgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICBwb3dlcjogbnVtYmVyO1xyXG4gIH0pIHtcclxuICAgIHRoaXMuY2FsbGJhY2tzKHRvcGljKS5mb3JFYWNoKGNiID0+IGNiKHZhbHVlKSk7XHJcbiAgfVxyXG4gIGxpc3RlbigpIHtcclxuICAgIGlmICh0aGlzLnN0b3BwZWQpXHJcbiAgICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnQoKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgbWVzc2FnZUR1cmF0aW9uID0gNTAwMDtcclxuY29uc3QgZmFkZURlbGF5ID0gMTUwMDtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZhZGVPdXQobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZ29vZCwgYmFkKSA9PiB7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKFwiZmFkZS1vdXRcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBnb29kKG5vZGUpLCBmYWRlRGVsYXkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb2FzdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0YXJnZXQ6IEhUTUxFbGVtZW50KSB7IFxyXG4gICAgICAgIEFycmF5LmZyb20odGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9hc3RcIikpLm1hcCh0ID0+IHRoaXMuZGVzdHJveVRvYXN0KHQgYXMgSFRNTEVsZW1lbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdChtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZS1vdXRcIik7XHJcbiAgICAgICAgbGV0IHRvYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0b2FzdC5jbGFzc0xpc3QuYWRkKFwidG9hc3RcIik7XHJcbiAgICAgICAgdG9hc3QuaW5uZXJUZXh0ID0gbWVzc2FnZTtcclxuICAgICAgICB0aGlzLnRhcmdldC5pbnNlcnRCZWZvcmUodG9hc3QsIHRoaXMudGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGVzdHJveVRvYXN0KHRvYXN0KSwgbWVzc2FnZUR1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZXN0cm95VG9hc3QodG9hc3Q6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgYXdhaXQgZmFkZU91dCh0b2FzdCk7XHJcbiAgICAgICAgdG9hc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0XCIpKSBmYWRlT3V0KHRoaXMudGFyZ2V0KTtcclxuICAgIH1cclxufSIsIi8qKiBHbG9iYWwgRnVuY3Rpb25zICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0YWlsKHZhbHVlOiBzdHJpbmcpIHtcclxuICBsZXQgbGlzdCA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcclxuICBsaXN0LnNoaWZ0KCk7XHJcbiAgcmV0dXJuIGxpc3Quam9pbihcIiBcIik7XHJcbn1cclxuIiwiLyoqIEdsb2JhbCBDbGFzc2VzICovXHJcbi8qKlxyXG4gKiBUcnkgdG8gdHVybiBhIHNwb2tlbiBwaHJhc2UgaW50byBhIGNvbW1hbmQgZ3JhbW1hclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbW1hbmRQYXJzZXIge1xyXG4gIHBhcnNlUGhyYXNlKHBocmFzZTogc3RyaW5nKSB7XHJcbiAgICBwaHJhc2UgPSBwaHJhc2UudG9Mb3dlckNhc2UoKTtcclxuICAgIGxldCBtYXAgPSA8YW55PntcclxuICAgICAgXCJ6b29tIGluXCI6IFwiem9vbVwiLFxyXG4gICAgICBcInpvb20gb3V0XCI6IFwiem9vbVwiLFxyXG4gICAgICBcImRyYWdcIjogXCJwYW5cIixcclxuICAgICAgXCJudW1iZXIgZm9yXCI6IFwiNFwiLFxyXG4gICAgICBcIm51bWJlclwiOiBcIlwiLFxyXG4gICAgICBcImZyYW1lXCI6IFwiXCIsXHJcbiAgICAgIFwicGhvdG9cIjogXCJcIixcclxuICAgICAgXCJvbmVcIjogXCIxXCIsXHJcbiAgICAgIFwidHdvXCI6IFwiMlwiLFxyXG4gICAgICBcInRocmVlXCI6IFwiM1wiLFxyXG4gICAgICBcImZvdXJcIjogXCI0XCIsXHJcbiAgICAgIFwiZml2ZVwiOiBcIjVcIixcclxuICAgICAgXCJzaXhcIjogXCI2XCIsXHJcbiAgICAgIFwic2V2ZW5cIjogXCI3XCIsXHJcbiAgICAgIFwiZWlnaHRcIjogXCI4XCIsXHJcbiAgICAgIFwibmluZVwiOiBcIjlcIixcclxuICAgICAgXCJpbnRvXCI6IFwiXCIsXHJcbiAgICAgIFwib25cIjogXCJcIixcclxuICAgICAgXCJhbmRcIjogXCJcIixcclxuICAgICAgXCJwaWN0dXJlXCI6IFwiXCIsXHJcbiAgICAgIFwiZ28gdG9cIjogXCJnb3RvXCIsXHJcbiAgICAgIFwiLVwiOiBcIiBcIixcclxuICAgIH07XHJcbiAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2godiA9PiBwaHJhc2UgPSBwaHJhc2UucmVwbGFjZSh2LCBtYXBbdl0pKTtcclxuICAgIGxldCB0b2tlbnMgPSBwaHJhc2Uuc3BsaXQoXCIgXCIpO1xyXG4gICAgdG9rZW5zID0gdG9rZW5zLm1hcCh2ID0+IG1hcFt2XSA/PyB2KS5maWx0ZXIodiA9PiAhIXYpO1xyXG4gICAgcmV0dXJuIHRva2Vucy5qb2luKFwiIFwiKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEtlZXBzIHRoZSBnb29nbGUgbWVkaWEgaW5mbyBhbmQgaGFzIGhlbHBlciBmdW5jdGlvbnNcclxuICogdG8gdXBncmFkZSB0aGUgbG8tcmVzIHRvIGhpLXJlcyB2ZXJzaW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29sbGFnZVBob3RvPFRNZWRpYUluZm8+IHtcclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEdvb2dsZU1lZGlhSXRlbSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHByb2R1Y3RVcmw6IHN0cmluZztcclxuICBiYXNlVXJsOiBzdHJpbmc7XHJcbiAgbWltZVR5cGU6IHN0cmluZztcclxuICBtZWRpYU1ldGFkYXRhOiBhbnk7XHJcbiAgY29udHJpYnV0b3JJbmZvOiBhbnk7XHJcbiAgZmlsZW5hbWU6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi9Db2xsYWdlUGhvdG9cIjtcclxuaW1wb3J0IHsgR29vZ2xlTWVkaWFJdGVtIH0gZnJvbSBcIi4uL21vZGVscy9Hb29nbGVNZWRpYUl0ZW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVDb2xsYWdlUGhvdG8gZXh0ZW5kcyBDb2xsYWdlUGhvdG88R29vZ2xlTWVkaWFJdGVtPiB7XHJcbiAgcHVibGljIGltZzogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZWRpYUluZm86IEdvb2dsZU1lZGlhSXRlbSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGxldCBpbWcgPSB0aGlzLmltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpbWcuY2xhc3NMaXN0LmFkZChcImltZ1wiKTtcclxuICAgIGltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7dGhpcy5tZWRpYUluZm8uYmFzZVVybH0pYDtcclxuICAgIGltZy50aXRsZSA9IG1lZGlhSW5mby5maWxlbmFtZTtcclxuICB9XHJcbiAgXHJcbiAgcmVuZGVySW50byh0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5pbWcpO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gbmV3IEdvb2dsZUNvbGxhZ2VQaG90byhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubWVkaWFJbmZvKSkpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogTWFuYWdlcyBpbWFnZSBzdHlsZS50cmFuc2Zvcm0gYnkgcGVyc2lzdGluZ1xyXG4gKiB0aGUgc2NhbGUgYW5kIHJvdGF0aW9uIHRvIGZhY2lsaXRhdGUgY29tcHV0aW5nIHRyYW5zZm9ybXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGUge1xyXG4gIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgcHVibGljIHk6IG51bWJlcjtcclxuICBwdWJsaWMgcjogbnVtYmVyO1xyXG4gIHB1YmxpYyBzOiBudW1iZXI7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcbiAgICB0aGlzLnggPSB0aGlzLnkgPSB0aGlzLnIgPSAwO1xyXG4gICAgdGhpcy5zID0gMTtcclxuICB9XHJcbiAgdHJhbnNmb3JtKGFyZ3M6IHtcclxuICAgIGR4PzogbnVtYmVyO1xyXG4gICAgZHk/OiBudW1iZXI7XHJcbiAgICBzY2FsZT86IG51bWJlcjtcclxuICAgIGFuZ2xlPzogbnVtYmVyO1xyXG4gIH0pIHtcclxuICAgIHRoaXMueCArPSAoYXJncy5keCB8fCAwKTtcclxuICAgIHRoaXMueSArPSAoYXJncy5keSB8fCAwKTtcclxuICAgIHRoaXMuciArPSAoYXJncy5hbmdsZSB8fCAwKTtcclxuICAgIHRoaXMucyAqPSAoYXJncy5zY2FsZSB8fCAxLjApO1xyXG4gICAgdGhpcy5pbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54fXB4LCR7dGhpcy55fXB4KSByb3RhdGUoJHt0aGlzLnJ9ZGVnKSBzY2FsZSgke3RoaXMuc30pYDtcclxuICB9XHJcbiAgdHJhbnNsYXRlKGR4OiBudW1iZXIsIGR5OiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IGR4LCBkeSB9KTtcclxuICB9XHJcbiAgcm90YXRlKGFuZ2xlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IGFuZ2xlIH0pO1xyXG4gIH1cclxuICBzY2FsZShzY2FsZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyBzY2FsZSB9KTtcclxuICB9XHJcbiAgLy8gbW9kaWZ5IHRoZSBwaXhlbCBkZW5zaXR5IG9mIHRoZSBpbWFnZVxyXG4gIC8vIHVzZWZ1bCB3aGVuIHVzaW5nIGdvb2dsZSBwaG90b3MgQVBJIHRvIFxyXG4gIC8vIHJlcXVlc3QgaGlnaGVyIHJlc29sdXRpb24gcGhvdG9zXHJcbiAgdXBzY2FsZShzY2FsZTogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuaW1hZ2UpO1xyXG4gICAgbGV0IHdpZHRoID0gcGFyc2VGbG9hdChzdHlsZS53aWR0aCk7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcGFyc2VGbG9hdChzdHlsZS5oZWlnaHQpO1xyXG4gICAgdGhpcy5zY2FsZSgxIC8gc2NhbGUpO1xyXG4gICAgdGhpcy5pbWFnZS5zdHlsZS53aWR0aCA9IHNjYWxlICogd2lkdGggKyBcInB4XCI7XHJcbiAgICB0aGlzLmltYWdlLnN0eWxlLmhlaWdodCA9IHNjYWxlICogaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgdGhpcy50cmFuc2xhdGUod2lkdGggLyAyIC0gd2lkdGggKiBzY2FsZSAvIDIsIGhlaWdodCAvIDIgLSBoZWlnaHQgKiBzY2FsZSAvIDIpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSBcIi4vU3ByaXRlXCI7XHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xyXG5cclxuY29uc3QgdW5pdHMgPSBcInB4IGVtXCIuc3BsaXQoXCIgXCIpO1xyXG5cclxuZnVuY3Rpb24gaGFzVW5pdHModmFsdWU6IHN0cmluZykge1xyXG4gIHJldHVybiB1bml0cy5zb21lKHYgPT4gdmFsdWUuZW5kc1dpdGgodikpO1xyXG59XHJcblxyXG4vKipcclxuICogTWFuYWdlcyBhIHNpbmdsZSBpbWFnZSBvbiB0aGUgY29sbGFnZSxcclxuICogbm90IHRvIGJlIGNvbmZ1c2VkIHdpdGggYW4gUGhvdG8gb24gdGhlIGFsYnVtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29sbGFnZVBhbmVsIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBwYW5lbCBjb250YWlucyBhIHNpbmdsZSBwaG90byAodGhpcyBvbmUpXHJcbiAgICovXHJcbiAgcHVibGljIHBob3RvOiBHb29nbGVDb2xsYWdlUGhvdG8gfCBudWxsO1xyXG5cclxuICAvLyB0aGUgYWN0dWFsIGltYWdlIHJlbmRlcmVkIG9uIHRoZSBwYW5lbFxyXG4gIHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcclxuICBwdWJsaWMgc3ByaXRlOiBTcHJpdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHBhbmVsIGRvbSBlbGVtZW50IHRvIGNvbnRyb2xcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFuZWw6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICB0aGlzLnBob3RvID0gbnVsbDtcclxuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKHRoaXMuaW1hZ2UpO1xyXG4gICAgdGhpcy5pbWFnZS5jbGFzc0xpc3QuYWRkKFwiaW1nXCIpO1xyXG4gICAgdGhpcy5pbWFnZS5kcmFnZ2FibGUgPSBmYWxzZTtcclxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XHJcbiAgICB0aGlzLmFzUGFuZWwodGhpcy5wYW5lbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gcGhvdG8gcmVuZGVycyB0aGlzIHBob3RvIG9udG8gdGhlIHBhbmVsXHJcbiAgICovXHJcbiAgYWRkUGhvdG8ocGhvdG86IEdvb2dsZUNvbGxhZ2VQaG90bykge1xyXG4gICAgdGhpcy5waG90byA9IHBob3RvO1xyXG4gICAgdGhpcy5zZXRCYWNrZ3JvdW5kSW1hZ2UocGhvdG8ubWVkaWFJbmZvLmJhc2VVcmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29tcHV0ZXMgdGhlIHdpZHRoIG9mIHRoZSBwaG90byBkaXNwbGF5IGFyZWFcclxuICAgKi9cclxuICBnZXQgcGhvdG9XaWR0aCgpIHtcclxuICAgIHJldHVybiBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmltYWdlKS53aWR0aCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb21wdXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBwaG90byBkaXNwbGF5IGFyZWFcclxuICAgKi9cclxuICBnZXQgcGhvdG9IZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5pbWFnZSkuaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbXB1dGVzIHRoZSBzY2FsZSBvZiB0aGUgcGhvdG8sIGFzc3VtZXMgYXNwZWN0IHJhdGlvIGlzIHByZXNlcnZlZCAoYXQgbGVhc3QgdGhlIHdpZHRoIG9yIGhlaWdodCBpcyAnYXV0bycpXHJcbiAgICovXHJcbiAgZ2V0IHBob3RvU2NhbGUoKSB7XHJcbiAgICBsZXQgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmltYWdlKTtcclxuICAgIGxldCBzY2FsZSA9IHN0eWxlLmhlaWdodDtcclxuICAgIGlmIChzY2FsZSA9PT0gXCJhdXRvXCIpIHJldHVybiAxLjA7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzY2FsZSkgLyAxMDAuMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybiB0aGUgcGFuZWwgb3ZlcmxheSAoZG9lcyBub3QgYmVsb25nIGhlcmUpXHJcbiAgICovXHJcbiAgZ2V0IG92ZXJsYXkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIHRleHQgYXMgYW4gaW5wdXQgY29udHJvbCBvbiB0aGUgcGFuZWxcclxuICAgKiBMYWJlbCBpcyBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgYW5kIGNhbiBtb3ZlIG91dHNpZGUgdGhlIGJvdW5kcyBvZiB0aGlzIHBhbmVsXHJcbiAgICogc28gcHJvYmFibHkgZG9lc24ndCBiZWxvbmcgaGVyZVxyXG4gICAqL1xyXG4gIHNldCB0ZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGxldCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgIGxhYmVsLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgIGxhYmVsLnRpdGxlID0gXCIxXCI7XHJcbiAgICBsYWJlbC5zdHlsZS50b3AgPSBsYWJlbC5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcbiAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKFwibGFiZWxcIik7XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIGxhYmVsLnZhbHVlID0gdmFsdWU7XHJcbiAgICBnbG9iYWxzLmRuZC5tb3ZlYWJsZShsYWJlbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIHBhbmVsIGZyb20gdGhlIGRvbVxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnBhbmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kSW1hZ2UgdGhlIHVybCBvZiB0aGUgaW1hZ2UgdG8gZGlzcGxheSBpbiB0aGlzIHBhbmVsXHJcbiAqL1xyXG4gIHNldEJhY2tncm91bmRJbWFnZShiYWNrZ3JvdW5kSW1hZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5pbWFnZS5zcmMgPSBiYWNrZ3JvdW5kSW1hZ2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdHlsZSB0aGUgZnJhbWVcclxuICAgKiBAcGFyYW0gd2lkdGggYm9yZGVyIHdpZHRoIGluIFwiZW1cIlxyXG4gICAqL1xyXG4gIGJvcmRlcih3aWR0aDogc3RyaW5nLCBjb2xvciA9IFwid2hpdGVcIikge1xyXG4gICAgY29uc3QgdW5pdHMgPSBoYXNVbml0cyh3aWR0aCkgPyBcIlwiIDogXCJlbVwiO1xyXG4gICAgdGhpcy5wYW5lbC5zdHlsZS5ib3JkZXIgPSBgJHt3aWR0aH0ke3VuaXRzfSBzb2xpZCAke2NvbG9yfWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJvdGF0ZSB0aGUgYWN0dWFsIGZyYW1lXHJcbiAgKiBAcGFyYW0gYW5nbGUgYW5nbGUgaW4gZGVncmVlc1xyXG4gICovXHJcbiAgcm90YXRlRnJhbWUoYW5nbGU6IHN0cmluZykge1xyXG4gICAgbGV0IG5vZGUgPSB0aGlzLnBhbmVsO1xyXG4gICAgaWYgKCFub2RlKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBpZiAoISFhbmdsZSkge1xyXG4gICAgICB0aGlzLnRyYW5zZm9ybV9ub2RlKGByb3RhdGUoJHthbmdsZX1kZWcpYCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbGV0IGFuZ2xlID0gMDtcclxuICAgICAgbGV0IHRyYW5zZm9ybSA9IG5vZGUuc3R5bGUudHJhbnNmb3JtO1xyXG4gICAgICBsZXQgYW5pbWF0aW9ucyA9IGdsb2JhbHMucmVwbC5hbmltYXRpb25zO1xyXG4gICAgICBhbmltYXRpb25zLmFuaW1hdGUoXCJyb3RhdGVcIiwgKCkgPT4ge1xyXG4gICAgICAgIGFuZ2xlICs9IDE7XHJcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm0gKyBgIHJvdGF0ZSgke2FuZ2xlfWRlZylgO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNjYWxlRnJhbWUoc2NhbGU6IHN0cmluZykge1xyXG4gICAgdGhpcy50cmFuc2Zvcm1fbm9kZShgc2NhbGUoJHtzY2FsZX0sICR7c2NhbGV9KWApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1fbm9kZSh2OiBzdHJpbmcpIHtcclxuICAgIGxldCBub2RlID0gdGhpcy5wYW5lbDtcclxuICAgIGxldCB0cmFuc2Zvcm0gPSAobm9kZS5zdHlsZS50cmFuc2Zvcm0gfHwgXCJcIikuc3BsaXQoXCIgXCIpO1xyXG4gICAgdHJhbnNmb3JtLnVuc2hpZnQodik7XHJcbiAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybS5qb2luKFwiIFwiKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBhc1BhbmVsKGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwYW5lbFwiKTtcclxuICAgIGVsZW1lbnQudGFiSW5kZXggPSAxO1xyXG4gICAgbGV0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcclxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICogcnVucyBhbiBhbmltYXRpb24gb24gYW4gaW50ZXJ2YWwsIHJldHVybnMgc3RvcCgpXHJcbiAqIFVzZWQgZm9yIHBhbm5pbmcsIHpvb21pbmcsIHJvdGF0aW5nXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9ucyB7XHJcbiAgYW5pbWF0aW9uczogQXJyYXk8e1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgaGFuZGxlOiBudW1iZXI7XHJcbiAgfT4gPSBbXTtcclxuICBcclxuICBzdG9wKHR5cGU6IHN0cmluZykge1xyXG4gICAgbGV0IGFuaW1hdGlvbnMgPSB0aGlzLmFuaW1hdGlvbnMubWFwKHYgPT4gdik7IC8vY2xvbmVcclxuICAgIGFuaW1hdGlvbnMuZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICBpZiAoIXR5cGUgfHwgdi50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh2LmhhbmRsZSk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnNwbGljZShpLCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlKHR5cGU6IHN0cmluZywgY2I6ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKHsgdHlwZSwgaGFuZGxlOiBzZXRJbnRlcnZhbChjYiwgMTAwKSB9KTtcclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kIHtcclxuICBhYm91dD8oKTogc3RyaW5nO1xyXG4gIC8vIHJldHVybiBmYWxzZSB0byBzaWduYWwgdGhlIGNvbW1hbmQgd2FzIG5vdCBoYW5kbGVkXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHwgUHJvbWlzZTx2b2lkIHwgZmFsc2U+O1xyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL21vZGVscy9EaWN0aW9uYXJ5XCI7XHJcblxyXG4vKipcclxuICogS2VlcHMgaGFzaCBvZiBjb21tYW5kc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbW1hbmRzIHtcclxuICAgIG5hbWVPZihjb21tYW5kOiBDb21tYW5kKSB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKTtcclxuICAgICAgY29uc3QgaSA9IGtleXMuZmluZEluZGV4KGsgPT4gdGhpcy5jb21tYW5kc1trXS5leGVjdXRlID09PSBjb21tYW5kLmV4ZWN1dGUpO1xyXG4gICAgICByZXR1cm4gLTE8aSA/IGtleXNbaV06bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbW1hbmRzOiBEaWN0aW9uYXJ5PENvbW1hbmQ+ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyB0aGUgY29tbWFuZCBhc3NvY2lhdGVkIHdpdGggdGhlIGFjdGlvbiBrZXl3b3JkXHJcbiAgICAgKiBAcGFyYW0gdmVyYiB0aGUgZnVsbCBuYW1lIG9mIHRoZSBhY3Rpb24ga2V5d29yZCBvciBhIHBhcnRpYWwgbWF0Y2hcclxuICAgICAqL1xyXG4gICAgZ2V0KHZlcmI6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbW1hbmRzW3ZlcmJdKSByZXR1cm4gdGhpcy5jb21tYW5kc1t2ZXJiXTtcclxuICAgICAgICB2YXIga2V5ID0gT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykuZmluZCh2ID0+IHYuc3RhcnRzV2l0aCh2ZXJiKSk7XHJcbiAgICAgICAgcmV0dXJuIGtleSAmJiB0aGlzLmNvbW1hbmRzW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzL3JlcGxhY2VzIGNvbW1hbmQgYXNzb2NpYXRlZCB3aXRoIGFuIGFjdGlvbiBrZXl3b3JkXHJcbiAgICAgKiBAcGFyYW0gY29tbWFuZCBjb21tYW5kIHRvIHByb2Nlc3MgdGhlIGFjdGlvblxyXG4gICAgICogQHBhcmFtIHZlcmIgYWN0aW9uIHRvIGFzc29jaWF0ZSB3aXRoIGEgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBhZGQoY29tbWFuZDogQ29tbWFuZCwgdmVyYjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kc1t2ZXJiXSA9IGNvbW1hbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdCgpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlT3ZlcmxheSgpIHtcclxuICBsZXQgYWN0aXZlUGFuZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gIGlmICghYWN0aXZlUGFuZWwpIHtcclxuICAgIGNvbnNvbGUubG9nKFwibm8gYWN0aXZlIHBhbmVsXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICByZXR1cm4gYWN0aXZlUGFuZWwucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpIGFzIEhUTUxFbGVtZW50O1xyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgS2V5Ym9hcmRIYW5kbGVyIHtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgc2hpZnRLZXk6IGJvb2xlYW47XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBrZXk6IHN0cmluZztcclxuICBhYm91dD86IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkSGFuZGxlciB9IGZyb20gXCIuLi9tb2RlbHMvS2V5Ym9hcmRIYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRIYW5kbGVycyB7XHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXJzOiBBcnJheTx7bWF0Y2g6IEtleWJvYXJkSGFuZGxlcjsgY29tbWFuZDogQ29tbWFuZH0+ID0gW107XHJcblxyXG4gIGdldEV2ZW50SGFuZGxlcnMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIHJldHVybiB0aGlzLmtleWJvYXJkSGFuZGxlcnMuZmlsdGVyKGhhbmRsZXIgPT4ge1xyXG4gICAgICBsZXQgbWF0Y2ggPSBoYW5kbGVyLm1hdGNoO1xyXG4gICAgICBpZiAoZXZlbnQuYWx0S2V5ICE9PSBtYXRjaC5hbHRLZXkpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICE9PSBtYXRjaC5zaGlmdEtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoZXZlbnQuY3RybEtleSAhPT0gbWF0Y2guY3RybEtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoISFtYXRjaC5rZXkgJiYgZXZlbnQua2V5ICE9PSBtYXRjaC5rZXkpIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZEV2ZW50SGFuZGxlcihjb21tYW5kOiBDb21tYW5kLCBtYXRjaDogUGFydGlhbDxLZXlib2FyZEhhbmRsZXI+KSB7XHJcbiAgICBsZXQgZnVsbE1hdGNoOiBLZXlib2FyZEhhbmRsZXIgPSB7XHJcbiAgICAgIGFsdEtleTogbWF0Y2guYWx0S2V5ID8/IGZhbHNlLFxyXG4gICAgICBjdHJsS2V5OiBtYXRjaC5jdHJsS2V5ID8/IGZhbHNlLFxyXG4gICAgICBzaGlmdEtleTogbWF0Y2guc2hpZnRLZXkgPz8gZmFsc2UsXHJcbiAgICAgIGtleTogbWF0Y2gua2V5ID8/IFwiXCIsXHJcbiAgICAgIGFib3V0OiBtYXRjaC5hYm91dCB8fCBjb21tYW5kLmFib3V0ICYmIGNvbW1hbmQuYWJvdXQoKVxyXG4gICAgfTtcclxuICAgIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5wdXNoKHttYXRjaDogZnVsbE1hdGNoLCBjb21tYW5kfSk7XHJcbiAgfVxyXG5cclxuICBsaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5tYXAoaCA9PiAoe1xyXG4gICAgICBjb21tYW5kOmguY29tbWFuZCxcclxuICAgICAga2V5OiB0aGlzLmtleXNBc1N0cmluZyhoLm1hdGNoKSxcclxuICAgICAgYWJvdXQ6IGgubWF0Y2guYWJvdXQsXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBrZXlzQXNTdHJpbmcobWF0Y2g6IEtleWJvYXJkSGFuZGxlcikge1xyXG4gICBsZXQgcmVzdWx0ID0gbWF0Y2gua2V5O1xyXG4gICBzd2l0Y2ggKHJlc3VsdCl7XHJcbiAgICAgY2FzZSBcIiBcIjogcmVzdWx0ID0gXCJzcGFjZVwiOyBicmVhaztcclxuICAgfVxyXG4gICBpZiAobWF0Y2guY3RybEtleSkgcmVzdWx0ID0gXCJjdHJsICsgXCIrcmVzdWx0O1xyXG4gICBpZiAobWF0Y2guYWx0S2V5KSByZXN1bHQgPSBcImFsdCArIFwiK3Jlc3VsdDtcclxuICAgaWYgKG1hdGNoLnNoaWZ0S2V5KSByZXN1bHQgPSBcInNoaWZ0ICsgXCIrcmVzdWx0O1xyXG4gICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG4iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybShub2RlOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xyXG4gIGxldCB0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkudHJhbnNmb3JtO1xyXG4gIHQgPSAodCA9PT0gXCJub25lXCIpID8gXCJcIiA6IHQgKyBcIiBcIjtcclxuICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IHQgKyB2YWx1ZTtcclxufVxyXG5cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJib3gobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGxldCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcclxuICAgIHJldHVybiB7IHRvcDogcGFyc2VGbG9hdCh0b3ApLCBsZWZ0OiBwYXJzZUZsb2F0KGxlZnQpLCB3aWR0aDogcGFyc2VGbG9hdCh3aWR0aCksIGhlaWdodDogcGFyc2VGbG9hdChoZWlnaHQpIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2V0QWN0aXZlT3ZlcmxheSB9IGZyb20gXCIuLi9mdW4vZ2V0QWN0aXZlT3ZlcmxheVwiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuL1JlcGxcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVycyB9IGZyb20gXCIuL0tleWJvYXJkSGFuZGxlcnNcIjtcclxuaW1wb3J0IHsgdHJhbnNmb3JtIH0gZnJvbSBcIi4uL2Z1bi90cmFuc2Zvcm1cIjtcclxuaW1wb3J0IHsgYmJveCB9IGZyb20gXCIuLi9mdW4vYmJveFwiO1xyXG5cclxuLyoqXHJcbiAqIG1hbmFnZXMgdXNlciBpbnRlcmFjdGlvbnMgZm9yIGtleWJvYXJkIHNob3J0Y3V0cywgd2hlZWwsIGRyYWcsIGNsaWNrIGV2ZW50c1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wIHtcclxuICBwcml2YXRlIHNvdXJjZTogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHJlcGw6IFJlcGwsIHB1YmxpYyBrZXlkb3duSGFuZGxlcnM6IEtleWJvYXJkSGFuZGxlcnMpIHtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBsZXQgc291cmNlID0gZ2V0QWN0aXZlT3ZlcmxheSgpO1xyXG4gICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm8gYWN0aXZlIG92ZXJsYXkgZm91bmRcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFRPRE8gd291bGQgYmUgbmljZSB0byBvbmx5IHBlcmZvcm0gd2hlbiBtb3VzZSBpcyBvdmVyIHRoZSBlbGVtZW50XHJcbiAgICAgIC8vIGRvY3VtZW50LmVsZW1lbnRzRnJvbVBvaW50KGV2ZW50LnNjcmVlblgsIGV2ZW50LnNjcmVlblkpO1xyXG4gICAgICBsZXQgZnJvbSA9IHNvdXJjZS5pbm5lckhUTUw7XHJcbiAgICAgIC8vIC0xNTAgPT4gMC45LCAxNTAgPT4gMS4xLCBzb1xyXG4gICAgICBsZXQgZGVsdGEgPSAxICsgZXZlbnQuZGVsdGFZIC8gMTUwMDtcclxuICAgICAgcmVwbC5leGVjdXRlQ29tbWFuZChgem9vbSAke2Zyb219ICR7ZGVsdGF9YCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4ge1xyXG5cclxuICAgICAgaWYgKHRoaXMua2V5ZG93bkhhbmRsZXJzLmdldEV2ZW50SGFuZGxlcnMoZXZlbnQpLnNvbWUoaGFuZGxlciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlICE9PSBoYW5kbGVyLmNvbW1hbmQuZXhlY3V0ZShyZXBsKTtcclxuICAgICAgfSkpIHtcclxuICAgICAgICAvLyBoYW5kbGVkXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0aGUgYmFja2dyb3VuZCBpbWFnZSBvbiB0aGUgcGFuZWxcclxuICAgKiBAcGFyYW0gcGFuZWwgSW52b2tlIHBhbiBvbiB0aGUgcGFuZWwgc28gdGhhdCBpdCBmb2xsb3dzIHRoZSBtb3VzZVxyXG4gICAqL1xyXG4gIHBhbmFibGUocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IGRyYWdnYWJsZSA9IHBhbmVsLmltYWdlO1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBbMCwgMF07XHJcbiAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LmFkZChcImRyYWdnYWJsZVwiKTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGV2ZW50ID0+IHtcclxuICAgICAgbGV0IGxlZnQgPSBwYXJzZUZsb2F0KGRyYWdnYWJsZS5zdHlsZS5sZWZ0IHx8IFwiMFwiKTtcclxuICAgICAgbGV0IHRvcCA9IHBhcnNlRmxvYXQoZHJhZ2dhYmxlLnN0eWxlLnRvcCB8fCBcIjBcIik7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb24gPSBbbGVmdCAtIGV2ZW50LnNjcmVlblgsIHRvcCAtIGV2ZW50LnNjcmVlblldO1xyXG4gICAgICBkcmFnZ2FibGUuc2V0UG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgZXZlbnQgPT4ge1xyXG4gICAgICBkcmFnZ2FibGUucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgIGRyYWdnYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgcG9pbnRlcm1vdmUpO1xyXG4gICAgICBsZXQgYm94ID0gYmJveChkcmFnZ2FibGUpO1xyXG4gICAgICBsZXQgcmVjdCA9IGRyYWdnYWJsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgICAgICBcclxuICAgICAgbGV0IHNjYWxlID0gcmVjdC53aWR0aCAvIGJveC53aWR0aDtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IGRyYWdnYWJsZS5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcclxuICAgICAgdHJhbnNmb3JtKGRyYWdnYWJsZSwgYHRyYW5zbGF0ZSgke2JveC5sZWZ0IC8gc2NhbGV9cHgsICR7Ym94LnRvcCAvIHNjYWxlfXB4KWApO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBwb2ludGVybW92ZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBsZXQgW3gsIHldID0gW3N0YXJ0UG9zaXRpb25bMF0gKyBldmVudC5zY3JlZW5YLCBzdGFydFBvc2l0aW9uWzFdICsgZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zdHlsZS5sZWZ0ID0gYCR7eH1weGA7XHJcbiAgICAgIGRyYWdnYWJsZS5zdHlsZS50b3AgPSBgJHt5fXB4YDtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbW92ZWFibGUoZHJhZ2dhYmxlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBbMCwgMF07XHJcbiAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LmFkZChcImRyYWdnYWJsZVwiKTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGV2ZW50ID0+IHtcclxuICAgICAgbGV0IHRvcCA9IHBhcnNlRmxvYXQoZHJhZ2dhYmxlLnN0eWxlLnRvcCk7XHJcbiAgICAgIGxldCBsZWZ0ID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUubGVmdCk7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb24gPSBbbGVmdCAtIGV2ZW50LnNjcmVlblgsIHRvcCAtIGV2ZW50LnNjcmVlblldO1xyXG4gICAgICBkcmFnZ2FibGUuc2V0UG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgZXZlbnQgPT4ge1xyXG4gICAgICBkcmFnZ2FibGUucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgIGRyYWdnYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgcG9pbnRlcm1vdmUpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBwb2ludGVybW92ZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBsZXQgW2xlZnQsIHRvcF0gPSBbc3RhcnRQb3NpdGlvblswXSArIGV2ZW50LnNjcmVlblgsIHN0YXJ0UG9zaXRpb25bMV0gKyBldmVudC5zY3JlZW5ZXTtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IHRvcCArIFwicHhcIjtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLmxlZnQgPSBsZWZ0ICsgXCJweFwiO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYWtlIGFuIGVsZW1lbnQgYSBkcmFnIHNvdXJjZVxyXG4gICAqIEBwYXJhbSBkaXYgZWxlbWVudCB0byBtYWtlIGRyYWdnYWJsZVxyXG4gICAqL1xyXG4gIGRyYWdnYWJsZShkcmFnZ2FibGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LmFkZChcImRyYWdnYWJsZVwiKTtcclxuICAgIGRyYWdnYWJsZS5kcmFnZ2FibGUgPSB0cnVlO1xyXG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZXZlbnQgPT4gdGhpcy5vbmRyYWdzdGFydChkcmFnZ2FibGUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYW4gZWxlbWVudCBhIGRyb3AgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHRhcmdldCBlbGVtZW50IHRvIG1ha2UgaW50byBhIGRyb3AgdGFyZ2V0IChkcmFnZ2FibGUgYXJlIGRyb3BwYWJsZSwgYmFkIG5hbWUpXHJcbiAgICovXHJcbiAgZHJvcHBhYmxlKHRhcmdldDogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5zb3VyY2UpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLm9uZHJhZ292ZXIodGFyZ2V0LCB0aGlzLnNvdXJjZSk7XHJcbiAgICB9KTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnNvdXJjZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMub25kcm9wKHRhcmdldCwgdGhpcy5zb3VyY2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBzb3VyY2UgbGlzdGVuIGZvciB3aGVlbCBldmVudHNcclxuICAgKi9cclxuICB6b29tYWJsZShzb3VyY2U6IEhUTUxFbGVtZW50KSB7XHJcbiAgfVxyXG4gIG9uZHJhZ3N0YXJ0KHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gIH1cclxuXHJcbiAgb25kcmFnb3Zlcih0YXJnZXQ6IEhUTUxFbGVtZW50LCBzb3VyY2U6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvLyBub3RoaW5nIHRvIGRvP1xyXG4gIH1cclxuXHJcbiAgb25kcm9wKHRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGxldCBmcm9tID0gc291cmNlLmlubmVySFRNTDtcclxuICAgIGxldCB0byA9IHRhcmdldC5pbm5lckhUTUw7XHJcbiAgICBsZXQgY29tbWFuZCA9IGBtb3ZlICR7ZnJvbX0gJHt0b31gO1xyXG4gICAgdGhpcy5yZXBsLmV4ZWN1dGVDb21tYW5kKGNvbW1hbmQpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEJlaGF2aW9yPFQ+IHtcclxuICBleHRlbmQoY29udHJvbDogVCk6IHZvaWQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgdGFpbCB9IGZyb20gXCIuLi9mdW4vdGFpbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kUGFyc2VyIH0gZnJvbSBcIi4vQ29tbWFuZFBhcnNlclwiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgR29vZ2xlQ29sbGFnZVBob3RvIH0gZnJvbSBcIi4vR29vZ2xlQ29sbGFnZVBob3RvXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbnMgfSBmcm9tIFwiLi9BbmltYXRpb25zXCI7XHJcbmltcG9ydCB7IENvbW1hbmRzIH0gZnJvbSBcIi4vQ29tbWFuZHNcIjtcclxuaW1wb3J0IHsgRHJhZ0FuZERyb3AgfSBmcm9tIFwiLi9EcmFnQW5kRHJvcFwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuLi9tb2RlbHMvQmVoYXZpb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBsIHtcclxuICAvLyBleHRlbnNpb24gcG9pbnQgZm9yIGJlaGF2aW9yc1xyXG4gIG5vdGlmeShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHVibGljIHNvIHNwbGl0IGNvbW1hbmQgY2FuIG9wZXJhdGUgb24gdGhlbVxyXG4gIHB1YmxpYyBwYW5lbHM6IEFycmF5PENvbGxhZ2VQYW5lbD4gPSBbXTtcclxuICAvLyBwdWJsaWMgc28gb3BlbkFsYnVtcyBjb21tYW5kIGNhbiBvcGVyYXRpb24gb24gdGhlbVxyXG4gIHB1YmxpYyBwaG90b3M6IEFycmF5PEdvb2dsZUNvbGxhZ2VQaG90bz4gPSBbXTtcclxuICBwcml2YXRlIGNvbW1hbmRIaXN0b3J5OiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgcHJpdmF0ZSBjb21tYW5kSGlzdG9yeUluZGV4ID0gLTE7XHJcbiAgcHVibGljIGRuZDogRHJhZ0FuZERyb3AgfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMgYW5pbWF0aW9ucyA9IG5ldyBBbmltYXRpb25zKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21tYW5kczogQ29tbWFuZHMpIHtcclxuICAgIC8vIGNhbm5vdCBzZXQgZG5kIGJlY2F1c2UgZG5kIG5lZWRzIHJlcGwgKGZvciBub3cpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXNlKGJlaGF2aW9yOiBCZWhhdmlvcjxSZXBsPikge1xyXG4gICAgYmVoYXZpb3IuZXh0ZW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZXZhbChjb21tYW5kOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKGBleGVjdXRpbmc6ICR7Y29tbWFuZH1gKTtcclxuICAgIGxldCBbdmVyYl0gPSBjb21tYW5kLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBoYW5kbGVyID0gdGhpcy5jb21tYW5kcy5nZXQodmVyYik7XHJcbiAgICBpZiAoaGFuZGxlcikge1xyXG4gICAgICBhd2FpdCBoYW5kbGVyLmV4ZWN1dGUodGhpcywgdGFpbChjb21tYW5kKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHN3aXRjaCAodmVyYikge1xyXG4gICAgICBjYXNlIFwiZXhwb3J0XCI6XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGF3YWl0IHRoaXMuYXNDYW52YXMoKTtcclxuICAgICAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImV4cG9ydC1yZXN1bHRcIik7XHJcbiAgICAgICAgaW1nLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShpbWcsIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIGEgY2FudmFzIG9mIHRoZSBlbnRpcmUgY29sbGFnZVxyXG4gIGFzeW5jIGFzQ2FudmFzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEhUTUxDYW52YXNFbGVtZW50PigoZ29vZCwgYmFkKSA9PiB7XHJcbiAgICAgIGxldCBpbWFnZUNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FudmFzXCIpPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgaWYgKCFpbWFnZUNhbnZhcykgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlQ2FudmFzLndpZHRoO1xyXG4gICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2VDYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgaWYgKCFjdHgpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgIGxldCBwYW5lbHMgPSB0aGlzLnBhbmVscy5maWx0ZXIoKHApID0+IDAgPT09IGdldENvbXB1dGVkU3R5bGUocC5wYW5lbCkuYmFja2dyb3VuZEltYWdlLmluZGV4T2YoYHVybChcImApKTtcclxuICAgICAgY29uc29sZS5sb2coXCJsb2FkaW5nXCIsIHBhbmVscy5sZW5ndGgpO1xyXG4gICAgICBwYW5lbHMuZm9yRWFjaCgocCkgPT4ge1xyXG4gICAgICAgIGxldCBwb3MgPSBwLnBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCI7XHJcbiAgICAgICAgaW1nLndpZHRoID0gcG9zLndpZHRoO1xyXG4gICAgICAgIGltZy5oZWlnaHQgPSBwb3MuaGVpZ2h0O1xyXG4gICAgICAgIGltZy5zdHlsZS50cmFuc2Zvcm0gPSBwLnBhbmVsLnN0eWxlLnRyYW5zZm9ybTtcclxuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIHBvcy54LCBwb3MueSk7XHJcbiAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkZWQ6XCIsIGNvdW50KTtcclxuICAgICAgICAgIGlmIChjb3VudCA9PT0gcGFuZWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBnb29kKGNhbnZhcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBzdHJpcCB1cmwoXCJcIik7XHJcbiAgICAgICAgbGV0IHVybCA9IGdldENvbXB1dGVkU3R5bGUocC5wYW5lbCkuYmFja2dyb3VuZEltYWdlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXJsXCIsIHVybCk7XHJcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZyg1LCB1cmwubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmxcIiwgdXJsKTtcclxuICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sbGFnZU92ZXJsYXlzKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnBhbmVsW2RhdGEtaWRdIC5vdmVybGF5YCkpIGFzIEhUTUxFbGVtZW50W107XHJcbiAgfVxyXG5cclxuICBnZXRQaG90b092ZXJsYXlzKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnBob3RvcyAuaW1nIC5vdmVybGF5W2RhdGEtaWRdYCkpIGFzIEhUTUxFbGVtZW50W107XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0UGFuZWwoaWQpPy5wYW5lbDtcclxuICB9XHJcblxyXG4gIHNlbGVjdFBhbmVsKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnBhbmVscy5maW5kKChwKSA9PiBwLm92ZXJsYXkuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UGhvdG8oaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMucGhvdG9zW3BhcnNlSW50KGlkKSAtIDFdO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUGFuZWwocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYW5lbHMuaW5kZXhPZihwYW5lbCk7XHJcbiAgICBpZiAoLTEgPT09IGluZGV4KSB0aHJvdyBcInBhbmVsIG5vdCBmb3VuZFwiO1xyXG4gICAgdGhpcy5wYW5lbHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHBhbmVsLnBhbmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVpbmRleCgpIHtcclxuICAgIHRoaXMucGFuZWxzXHJcbiAgICAgIC5maWx0ZXIoKHApID0+ICEhcD8ucGFuZWw/LnBhcmVudEVsZW1lbnQpXHJcbiAgICAgIC5mb3JFYWNoKChwLCBpKSA9PiAocC5vdmVybGF5LmRhdGFzZXQuaWQgPSBwLm92ZXJsYXkuaW5uZXJUZXh0ID0gaSArIDEgKyBcIlwiKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIHpvb20gYW5kIGRyYWcgY2FwYWJpbGl0aWVzIHRvIGEgcGFuZWxcclxuICAgKiBAcGFyYW0gcGFuZWwgbWFrZSB0aGlzIHBhbmVsIGludGVyYWN0aXZlXHJcbiAgICovXHJcbiAgYWRkQmVoYXZpb3JzKHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGxldCBvdmVybGF5ID0gcGFuZWwub3ZlcmxheTtcclxuICAgIGxldCBkbmQgPSB0aGlzLmRuZDtcclxuICAgIGlmIChkbmQpIHtcclxuICAgICAgZG5kLnpvb21hYmxlKG92ZXJsYXkpO1xyXG4gICAgICBkbmQuZHJhZ2dhYmxlKG92ZXJsYXkpO1xyXG4gICAgICBkbmQucGFuYWJsZShwYW5lbCk7XHJcbiAgICAgIGRuZC5kcm9wcGFibGUob3ZlcmxheSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWluZGV4UGhvdG9zKCkge1xyXG4gICAgdGhpcy5waG90b3MuZm9yRWFjaCgocGhvdG8sIGkpID0+IHtcclxuICAgICAgbGV0IHAgPSBwaG90by5pbWc7XHJcbiAgICAgIGxldCBvdmVybGF5ID0gcC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIikgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGlmICghb3ZlcmxheSkge1xyXG4gICAgICAgIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XHJcbiAgICAgICAgb3ZlcmxheS5kYXRhc2V0LmlkID0gb3ZlcmxheS5pbm5lclRleHQgPSAxICsgaSArIFwiXCI7XHJcbiAgICAgICAgcC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgICAgICB0aGlzLmRuZD8uZHJhZ2dhYmxlKG92ZXJsYXkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaW9yQ29tbWFuZCgpIHtcclxuICAgIGlmICh0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRIaXN0b3J5Wy0tdGhpcy5jb21tYW5kSGlzdG9yeUluZGV4XTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgbmV4dENvbW1hbmQoKSB7XHJcbiAgICBpZiAodGhpcy5jb21tYW5kSGlzdG9yeUluZGV4IDwgdGhpcy5jb21tYW5kSGlzdG9yeS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRIaXN0b3J5WysrdGhpcy5jb21tYW5kSGlzdG9yeUluZGV4XTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc3RhcnR1cCgpIHtcclxuICAgIGxldCBjaGlsZFBhbmVscyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYW5lbFwiKSkubWFwKChwKSA9PiBuZXcgQ29sbGFnZVBhbmVsKDxIVE1MRGl2RWxlbWVudD5wKSk7XHJcbiAgICBjaGlsZFBhbmVscy5mb3JFYWNoKChjKSA9PiB0aGlzLmFkZEJlaGF2aW9ycyhjKSk7XHJcbiAgICB0aGlzLnBhbmVscy5wdXNoKC4uLmNoaWxkUGFuZWxzKTtcclxuICAgIGxldCBjbWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnNvbGVcIikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGNtZC5vbmtleWRvd24gPSAoZXZlbnQpID0+IHtcclxuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcclxuICAgICAgICAgIHRoaXMuZXhlY3V0ZUNvbW1hbmQoY21kLnZhbHVlKTtcclxuICAgICAgICAgIGNtZC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxyXG4gICAgICAgICAgY21kLnZhbHVlID0gdGhpcy5wcmlvckNvbW1hbmQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcclxuICAgICAgICAgIGNtZC52YWx1ZSA9IHRoaXMubmV4dENvbW1hbmQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZWluZGV4KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXhlY3V0ZUNvbW1hbmQoY21kOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY29tbWFuZEhpc3RvcnlJbmRleCA9IHRoaXMuY29tbWFuZEhpc3RvcnkucHVzaChjbWQpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5ldmFsKGNtZCk7XHJcbiAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICB0aGlzLm5vdGlmeShleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGFyc2VDb21tYW5kKGNvbW1hbmQ6IHN0cmluZykge1xyXG4gICAgbGV0IGFpID0gbmV3IENvbW1hbmRQYXJzZXIoKTtcclxuICAgIHJldHVybiBhaS5wYXJzZVBocmFzZShjb21tYW5kKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xyXG5cclxuY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbmZ1bmN0aW9uIGVzY2FwZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgdGV4dGFyZWEuaW5uZXJUZXh0ID0gdmFsdWU7XHJcbiAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVscENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlbHBcIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBpZiAoIXRhcmdldCkgdGhyb3cgXCJjYW5ub3Qgc2hvdyBoZWxwIHVubGVzcyBhIEhUTUxTZWxlY3RFbGVtZW50IGlzIGRlZmluZWQgd2l0aCBhIGNsYXNzTmFtZSBvZiAnaGVscCdcIjtcclxuXHJcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgY29uc3QgY29tbWFuZHMgPSBnbG9iYWxzLnJlcGwuY29tbWFuZHMubGlzdCgpLm1hcChuYW1lID0+ICh7IGNvbW1hbmQ6IChnbG9iYWxzLnJlcGwuY29tbWFuZHMuZ2V0KG5hbWUpIGFzIENvbW1hbmQpLCBuYW1lIH0pKTtcclxuICAgICAgY29uc3Qga2V5Ym9hcmRDb21tYW5kcyA9IGdsb2JhbHMua2V5Ym9hcmRIYW5kbGVycy5saXN0KCk7XHJcbiAgICAgIGNvbnN0IG1hcmt1cDEgPSBjb21tYW5kcy5tYXAoYyA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7Yy5uYW1lfVwiPlwiJHtjLm5hbWV9XCIgLSAke2MuY29tbWFuZC5hYm91dCA/IGMuY29tbWFuZC5hYm91dCgpIDogXCJjb21tYW5kXCJ9PC9vcHRpb24+YCkuc29ydCgpLmpvaW4oXCJcIik7XHJcbiAgICAgIGNvbnN0IG1hcmt1cDIgPSBrZXlib2FyZENvbW1hbmRzLm1hcCgoYywgaSkgPT4gYDxvcHRpb24gdmFsdWU9XCIke2Mua2V5fVwiPlwiJHtjLmtleX1cIiAtICR7KGMuYWJvdXQhKX08L2NvZGU+PC9vcHRpb24+YCkuc29ydCgpLmpvaW4oXCJcIik7XHJcblxyXG5cclxuICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IGAke21hcmt1cDF9JHttYXJrdXAyfWA7XHJcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KFwiLmNvbnNvbGVcIikhLnZhbHVlID0gdGFyZ2V0LnZhbHVlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRhcmdldC50b2dnbGVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuXHJcbi8qKlxyXG4gICAqIFNwbGl0cyB0aGUgY3VycmVudCBwYW5lbCBpbnRvIDQgZXF1YWwgc2l6ZSBwYW5lbHNcclxuICAgKiBUaGlzIHBhbmVsIHRoZW4gdGFrZXMgb24gdGhlIHJvbGUgb2YgYSBwYW5lbCBjb250YWluZXJcclxuICAgKi9cclxuICBmdW5jdGlvbiBzcGxpdChwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgW3RvcGxlZnQsIHRvcHJpZ2h0LCBib3R0b21sZWZ0LCBib3R0b21yaWdodF0gPSBbMSwgMiwgMywgNF0ubWFwKG4gPT4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICBsZXQgY2hpbGRyZW4gPSBbdG9wbGVmdCwgdG9wcmlnaHQsIGJvdHRvbWxlZnQsIGJvdHRvbXJpZ2h0XS5tYXAodiA9PiBuZXcgQ29sbGFnZVBhbmVsKHYpKTtcclxuICAgIHRvcGxlZnQuY2xhc3NMaXN0LmFkZChcInExXCIpO1xyXG4gICAgdG9wcmlnaHQuY2xhc3NMaXN0LmFkZChcInEyXCIpO1xyXG4gICAgYm90dG9tbGVmdC5jbGFzc0xpc3QuYWRkKFwicTNcIik7XHJcbiAgICBib3R0b21yaWdodC5jbGFzc0xpc3QuYWRkKFwicTRcIik7XHJcbiAgICAvLyBwaG90byBjb250YWlucyBubyBzdGF0ZSBzbyBub3QgY2xvbmluZ1xyXG4gICAgY29uc3QgcGhvdG8gPSBwYW5lbC5waG90bztcclxuICAgIGlmIChwaG90bykge1xyXG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKGMgPT4gYy5hZGRQaG90byhwaG90by5jbG9uZSgpKSk7XHJcbiAgICB9XHJcbiAgICBwYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWxcIik7XHJcbiAgICBwYW5lbC5vdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3JjID0gXCJcIjtcclxuICAgIHBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoXCJwYW5lbC1jb250YWluZXJcIik7XHJcbiAgICBwYW5lbC5wYW5lbC5kYXRhc2V0W1wiaWRcIl0gPSBcIlwiO1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjID0+IHBhbmVsLnBhbmVsLmFwcGVuZENoaWxkKGMucGFuZWwpKTtcclxuICAgIHJldHVybiBjaGlsZHJlbjtcclxuICB9XHJcblxyXG4vKipcclxuICogU3BsaXRzIHRoZSBwYW5lbCBpbnRvIDQgbmV3IGNoaWxkIHBhbmVsc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNwbGl0Q29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGNvbW1hbmRBcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGNvbW1hbmRBcmdzO1xyXG5cclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gbm9kZSBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYW5lbCA9IHJlcGwucGFuZWxzLmZpbmQocCA9PiBwLnBhbmVsID09PSBub2RlKTtcclxuICAgIGlmICghcGFuZWwpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBwYW5lbCBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvcmlnaW5hbEluZGV4ID0gcmVwbC5wYW5lbHMuaW5kZXhPZihwYW5lbCk7XHJcbiAgICBsZXQgY2hpbGRQYW5lbHMgPSBzcGxpdChwYW5lbCk7XHJcbiAgICAvLyByZW1vdmUgc2luY2UgaXQgaXMgbm8gbG9uZ2VyIGEgcGFuZWxcclxuICAgIHJlcGwucGFuZWxzLnNwbGljZShvcmlnaW5hbEluZGV4LCAxLCAuLi5jaGlsZFBhbmVscyk7XHJcbiAgICBjaGlsZFBhbmVscy5mb3JFYWNoKGMgPT4gcmVwbC5hZGRCZWhhdmlvcnMoYykpO1xyXG4gICAgcmVwbC5yZWluZGV4KCk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXNwZWN0UmF0aW9Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gYHNldCB0aGUgYXNwZWN0IHJhdGlvIHRvIFcgSGA7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFt3LCBoXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IHdpZHRoID0gcGFyc2VGbG9hdCh3KTtcclxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUZsb2F0KGgpO1xyXG4gICAgbGV0IHdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZG93XCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IGNhbnZhcyA9IHdpbmRvdy5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IGN1cnJlbnRXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLndpZHRoKTtcclxuICAgIGxldCBjdXJyZW50SGVpZ2h0ID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGNhbnZhcykuaGVpZ2h0KTtcclxuICAgIC8vIG11bHRpcGxlIHdpZHRoIGFuZCBoZWlnaHQgYnkgbWF4aW11bSBzY2FsZSBzdWNoIHRoYXRcclxuICAgIC8vIHdpZHRoICogc2NhbGUgPD0gY3VycmVudFdpZHRoIGFuZCBoZWlnaHQgKiBzY2FsZSA8PSBjdXJyZW50SGVpZ2h0XHJcbiAgICBsZXQgc3ggPSBjdXJyZW50V2lkdGggLyB3aWR0aDtcclxuICAgIGxldCBzeSA9IGN1cnJlbnRIZWlnaHQgLyBoZWlnaHQ7XHJcbiAgICBsZXQgc2NhbGUgPSBNYXRoLm1pbihzeCwgc3kpO1xyXG4gICAgd2luZG93LnN0eWxlLndpZHRoID0gYCR7TWF0aC5yb3VuZCh3aWR0aCAqIHNjYWxlKX1weGA7XHJcbiAgICB3aW5kb3cuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChoZWlnaHQgKiBzY2FsZSl9cHhgO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvcmRlckNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiBcInNldCB0aGUgYm9yZGVyIFdJRFRIIENPTE9SIG9mIElEMSBJRDIgLi4uXCI7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgW3dpZHRoLCBjb2xvciwgLi4uaWRzXSA9IGFyZ3Muc3BsaXQoXCIgXCIpLmZpbHRlcigodikgPT4gISF2KTtcclxuICAgIGlmICghd2lkdGgpIHRocm93IFwid2lkdGggcmVxdWlyZWRcIjtcclxuICAgIGlmICghY29sb3IpIHRocm93IFwiY29sb3IgcmVxdWlyZWRcIjtcclxuICAgIGNvbnN0IHRhcmdldHMgPSBpZHMubGVuZ3RoID8gaWRzLm1hcCgoaWQpID0+IHJlcGwuc2VsZWN0UGFuZWwoaWQpKSA6IHJlcGwucGFuZWxzO1xyXG4gICAgdGFyZ2V0cy5mb3JFYWNoKChwKSA9PiBwPy5ib3JkZXIod2lkdGgsIGNvbG9yKSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5jb25zdCB1bml0cyA9IFwicHggZW1cIi5zcGxpdChcIiBcIik7XHJcblxyXG5mdW5jdGlvbiBoYXNVbml0cyh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHVuaXRzLnNvbWUodiA9PiB2YWx1ZS5lbmRzV2l0aCh2KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VTdHlsZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyB0YXJnZXQ6IGtleW9mIE9taXQ8Q1NTU3R5bGVEZWNsYXJhdGlvbiwgbnVtYmVyPixcclxuICAgIHB1YmxpYyBvcHRpb25zPzoge1xyXG4gICAgICB1bml0cz86IHN0cmluZztcclxuICAgICAgZGVsdGE/OiBudW1iZXI7XHJcbiAgICB9XHJcbiAgKSB7IH1cclxuXHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gYGNoYW5nZSAke3RoaXMudGFyZ2V0fWA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcihyZXBsOiBSZXBsKSB7XHJcbiAgICByZXR1cm4gcmVwbC5wYW5lbHNcclxuICAgICAgLmZpbHRlcihwID0+IHAucGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpXHJcbiAgICAgIC5zb21lKHBhbmVsID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBwYW5lbC5wYW5lbDtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQoc3R5bGVbPGFueT50aGlzLnRhcmdldF0pICsgKHRoaXMub3B0aW9ucz8uZGVsdGEgPz8gMCk7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlWzxhbnk+dGhpcy50YXJnZXRdID0gdmFsdWUgKyAodGhpcy5vcHRpb25zPy51bml0cyA/PyBcIlwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCFhcmdzKSB7XHJcbiAgICAgIGlmICh0aGlzLmtleWJvYXJkSGFuZGxlcihyZXBsKSkgcmV0dXJuO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFuZWxzID0gcmVwbC5wYW5lbHM7XHJcbiAgICBjb25zdCBbdmFsdWUsIC4uLmlkc10gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGlmICghdmFsdWUpIHRocm93IFwic2l6ZSByZXF1aXJlZFwiO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldHMgPSAoIWlkcy5sZW5ndGgpID8gcGFuZWxzIDogaWRzLm1hcChpZCA9PiByZXBsLnNlbGVjdFBhbmVsKGlkKSkuZmlsdGVyKHYgPT4gISF2KTtcclxuICAgIGlmICghdGFyZ2V0cy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB1bml0cyA9ICFoYXNVbml0cyh2YWx1ZSkgPyB0aGlzLm9wdGlvbnM/LnVuaXRzIHx8IFwiXCIgOiBcIlwiO1xyXG5cclxuICAgIHRhcmdldHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuICAgICAgcGFuZWwucGFuZWwuc3R5bGVbPGFueT50aGlzLnRhcmdldF0gPSBgJHt2YWx1ZX0ke3VuaXRzfWA7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmZ1bmN0aW9uIGhhc0ZvY3VzKG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IG5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHb3RvQ29tbWFuZEVkaXRvckNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBsZXQgZWRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb25zb2xlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBpZiAoIWVkaXRvcikge1xyXG4gICAgICByZXBsLm5vdGlmeShcIm5vIGNvbW1hbmQgZWRpdG9yIGZvdW5kXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoaGFzRm9jdXMoZWRpdG9yKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgZWRpdG9yLmZvY3VzKCk7XHJcbiAgICBlZGl0b3Iuc2VsZWN0KCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvY3VzUGFuZWxzKHJlcGw6IFJlcGwpIHtcclxuICByZXR1cm4gcmVwbC5wYW5lbHMuZmlsdGVyKHAgPT4gcC5wYW5lbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmb2N1c1wiKSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyBnZXRGb2N1c1BhbmVscyB9IGZyb20gXCIuL2dldEZvY3VzUGFuZWxzXCI7XHJcblxyXG4vKipcclxuICogc3dhcCBpbWFnZXMgb2YgdHdvIHBhbmVsc1xyXG4gKi9cclxuZnVuY3Rpb24gc3dhcEltYWdlcyhwYW5lbDE6IENvbGxhZ2VQYW5lbCwgcGFuZWwyOiBDb2xsYWdlUGFuZWwpIHtcclxuICBsZXQgaW1hZ2UxID0gcGFuZWwxLmltYWdlO1xyXG4gIGxldCBpbWFnZTIgPSBwYW5lbDIuaW1hZ2U7XHJcbiAgbGV0IHBhcmVudDEgPSBpbWFnZTEucGFyZW50RWxlbWVudDtcclxuICBsZXQgcGFyZW50MiA9IGltYWdlMi5wYXJlbnRFbGVtZW50O1xyXG4gIGlmICghcGFyZW50MSB8fCAhcGFyZW50MikgcmV0dXJuIGZhbHNlO1xyXG4gIGxldCBuZXh0MSA9IGltYWdlMS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgbGV0IG5leHQyID0gaW1hZ2UyLm5leHRFbGVtZW50U2libGluZztcclxuICBpbWFnZTEucmVtb3ZlKCk7XHJcbiAgaW1hZ2UyLnJlbW92ZSgpO1xyXG4gIHBhcmVudDIuaW5zZXJ0QmVmb3JlKGltYWdlMSwgbmV4dDIpO1xyXG4gIHBhcmVudDEuaW5zZXJ0QmVmb3JlKGltYWdlMiwgbmV4dDEpO1xyXG4gIGxldCBwaG90bzEgPSBwYW5lbDEucGhvdG87XHJcbiAgbGV0IHBob3RvMiA9IHBhbmVsMi5waG90bztcclxuICBwYW5lbDEuaW1hZ2UgPSBpbWFnZTI7XHJcbiAgcGFuZWwyLmltYWdlID0gaW1hZ2UxO1xyXG4gIHBhbmVsMS5waG90byA9IHBob3RvMjtcclxuICBwYW5lbDIucGhvdG8gPSBwaG90bzE7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3dhcFBhbmVsc0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcihyZXBsOiBSZXBsKSB7XHJcbiAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybjtcclxuICAgIGlmICgyICE9PSBwYW5lbHMubGVuZ3RoKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KFwiRXhhY3RseSB0d28gcGFuZWxzIG11c3QgYmUgc2VsZWN0ZWQgYmVmb3JlIHlvdSBjYW4gcGVyZm9ybSBhIHN3YXAuXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzd2FwSW1hZ2VzKHBhbmVsc1swXSwgcGFuZWxzWzFdKTtcclxuICB9XHJcblxyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIFwiU3dhcCBQYW5lbCBBIEJcIjtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IGZhbHNlIHwgdm9pZCB8IFByb21pc2U8ZmFsc2UgfCB2b2lkPiB7XHJcbiAgICBpZiAoIWFyZ3MpXHJcbiAgICAgIHJldHVybiB0aGlzLmtleWJvYXJkSGFuZGxlcihyZXBsKTtcclxuXHJcbiAgICBsZXQgW2lkMSwgaWQyXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IHBhbmVsMSA9IHJlcGwuc2VsZWN0UGFuZWwoaWQxKTtcclxuICAgIGxldCBwYW5lbDIgPSByZXBsLnNlbGVjdFBhbmVsKGlkMik7XHJcbiAgICBpZiAoIXBhbmVsMSkge1xyXG4gICAgICByZXBsLm5vdGlmeShgUGFuZWwgbm90IGZvdW5kOiAke2lkMX1gKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCFwYW5lbDIpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoYFBhbmVsIG5vdCBmb3VuZDogJHtpZDJ9YCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHN3YXBJbWFnZXMocGFuZWwxLCBwYW5lbDIpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgR290b0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IGlkID0gYXJncztcclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcbiAgICBub2RlLmZvY3VzKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmV4cG9ydCBjbGFzcyBUZXh0Q29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkLCB2YWx1ZV0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwoaWQpO1xyXG4gICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG4gICAgcGFuZWwudGV4dCA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgUGFkQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkLCB3aWR0aF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcbiAgICBub2RlLnN0eWxlLnBhZGRpbmcgPSBgJHt3aWR0aH1lbWA7XHJcblxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gaXNWaXNpYmxlKG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgcmV0dXJuIG5vZGUuc3R5bGUudmlzaWJpbGl0eSAhPT0gXCJoaWRkZW5cIjtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBpc1Zpc2libGUgfSBmcm9tIFwiLi4vZnVuL2lzVmlzaWJsZVwiO1xyXG5leHBvcnQgY2xhc3MgVG9nZ2xlVmlzaWJpbGl0eUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczoge1xyXG4gICAgc2VsZWN0b3I6IHN0cmluZztcclxuICB9KSB7XHJcbiAgfVxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgb3ZlcmxheXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vcHRpb25zLnNlbGVjdG9yKSkgYXMgQXJyYXk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgbGV0IGFsbFZpc2libGUgPSBvdmVybGF5cy5ldmVyeSh2ID0+IGlzVmlzaWJsZSh2KSk7XHJcbiAgICBpZiAoIWFsbFZpc2libGUpIHtcclxuICAgICAgb3ZlcmxheXMuZm9yRWFjaCh2ID0+IHYuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBvdmVybGF5cy5mb3JFYWNoKHYgPT4gdi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuaW1wb3J0IHsgdHJhbnNmb3JtIH0gZnJvbSBcIi4uL2Z1bi90cmFuc2Zvcm1cIjtcclxuXHJcbi8qKlxyXG4gICAqIE1vdmUgdGhlIGltYWdlIGluc2lkZSB0aGUgZnJhbWVcclxuICAgKiBAcGFyYW0geCBob3Jpem9udGFsIG9mZnNldCBpbiBwaXhlbHNcclxuICAgKiBAcGFyYW0geSB2ZXJ0aWNhbCBvZmZzZXQgaW4gcGl4ZWxzXHJcbiAgICovXHJcbmZ1bmN0aW9uIHBhbihyZXBsOiBSZXBsLCBub2RlOiBIVE1MRWxlbWVudCwgeDogc3RyaW5nLCB5OiBzdHJpbmcpIHtcclxuICBsZXQgW2R4LCBkeV0gPSBbMCwgMF07XHJcbiAgbGV0IGFuaW1hdGUgPSB0cnVlO1xyXG4gIGxldCBwaXhlbFNpemUgPSAxO1xyXG4gIHN3aXRjaCAoeCkge1xyXG4gICAgY2FzZSBcInVwXCI6XHJcbiAgICAgIGR5ID0gLXBpeGVsU2l6ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiZG93blwiOlxyXG4gICAgICBkeSA9IHBpeGVsU2l6ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwibGVmdFwiOlxyXG4gICAgICBkeCA9IC1waXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInJpZ2h0XCI6XHJcbiAgICAgIGR4ID0gcGl4ZWxTaXplO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGFuaW1hdGUgPSBmYWxzZTtcclxuICAgICAgZHggPSBwaXhlbFNpemUgKiBwYXJzZUZsb2F0KHgpO1xyXG4gICAgICBkeSA9IHBpeGVsU2l6ZSAqIHBhcnNlRmxvYXQoeSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICBsZXQgb3AgPSAoKSA9PiB7XHJcbiAgICB0cmFuc2Zvcm0obm9kZSwgYHRyYW5zbGF0ZSgke2R4fXB4LCAke2R5fXB4KWApO1xyXG4gIH07XHJcbiAgb3AoKTtcclxuICBsZXQgYW5pbWF0aW9ucyA9IHJlcGwuYW5pbWF0aW9ucztcclxuICBhbmltYXRlICYmIGFuaW1hdGlvbnMuYW5pbWF0ZShcInBhblwiLCBvcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGRlbHRhPzoge1xyXG4gICAgeD86IG51bWJlcjtcclxuICAgIHk/OiBudW1iZXI7XHJcbiAgfSkgeyB9XHJcblxyXG4gIGFib3V0KCl7XHJcbiAgICBsZXQgcmVzdWx0ID0gPHN0cmluZ1tdPltdO1xyXG4gICAgbGV0IHggPSB0aGlzLmRlbHRhPy54IHx8IDA7XHJcbiAgICBsZXQgeSA9IHRoaXMuZGVsdGE/LnkgfHwgMDtcclxuXHJcbiAgICBpZiAoeCA+IDApIHJlc3VsdC5wdXNoKGAke3h9IHB4IHJpZ2h0YCk7XHJcbiAgICBpZiAoeCA8IDApIHJlc3VsdC5wdXNoKGAkey14fSBweCBsZWZ0YCk7XHJcbiAgICBpZiAoeSA+IDApIHJlc3VsdC5wdXNoKGAke3l9IHB4IHVwYCk7XHJcbiAgICBpZiAoeSA8IDApIHJlc3VsdC5wdXNoKGAkey15fSBweCBkb3duYCk7XHJcbiAgICByZXR1cm4gYG1vdmUgaW1hZ2UgJHtyZXN1bHQuam9pbihcIiBhbmQgXCIpfWA7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBpZiAoISFhcmdzKSB7XHJcbiAgICAgIGxldCBbaWQsIHgsIHldID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwoaWQpO1xyXG4gICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHBhbihyZXBsLCBwYW5lbC5pbWFnZSwgeCwgeSB8fCBcIjBcIik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGVsdGEpIHtcclxuICAgICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgICBwYW4ocmVwbCwgcGFuZWwuaW1hZ2UsICh0aGlzLmRlbHRhIS54IHx8IDApICsgXCJcIiwgKHRoaXMuZGVsdGEhLnkgfHwgMCkgKyBcIlwiKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBub3QgaGFuZGxlZFxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmV4cG9ydCBjbGFzcyBNYXJnaW5Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBbaWQsIHdpZHRoXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IG5vZGUgPSByZXBsLnNlbGVjdChpZCk7XHJcbiAgICBpZiAoIW5vZGUpIHJldHVybjtcclxuXHJcbiAgICBub2RlLnN0eWxlLm1hcmdpbiA9IGAke3dpZHRofWVtYDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi4vY29udHJvbHMvQ29sbGFnZVBhbmVsXCI7XHJcblxyXG5mdW5jdGlvbiBtZXJnZV9ub2RlcyhyZXBsOiBSZXBsLCBwYW5lbDE6IENvbGxhZ2VQYW5lbCwgcGFuZWwyOiBDb2xsYWdlUGFuZWwpIHtcclxuICBsZXQgbm9kZTEgPSBwYW5lbDEucGFuZWw7XHJcbiAgbGV0IG5vZGUyID0gcGFuZWwyLnBhbmVsO1xyXG5cclxuICBub2RlMi5jbGFzc0xpc3QuZm9yRWFjaChjID0+IG5vZGUxLmNsYXNzTGlzdC5hZGQoYykpO1xyXG4gIHJlcGwucmVtb3ZlUGFuZWwocGFuZWwyKTtcclxuXHJcbiAgLy8gaWYgbm9kZTEgaXMgcTEuLi5xNCBhbmQgb25seSBjaGlsZCB0aGVuIGl0IGFzc3VtZXMgdGhlIHEgb2YgaXQncyBjb250YWluZXIgYW5kIHJlcGxhY2VzIGl0cyBjb250YWluZXJcclxuICBsZXQgcXMgPSBbMSwgMiwgMywgNF0ubWFwKHYgPT4gYHEke3Z9YCk7XHJcbiAgaWYgKHFzLmV2ZXJ5KHYgPT4gbm9kZTEuY2xhc3NMaXN0LmNvbnRhaW5zKHYpKSkge1xyXG4gICAgY29uc3QgcGFyZW50ID0gbm9kZTEucGFyZW50RWxlbWVudDtcclxuICAgIGlmICghcGFyZW50KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbC1jb250YWluZXJcIikpIHtcclxuICAgICAgcXMuZm9yRWFjaCh2ID0+IG5vZGUxLmNsYXNzTGlzdC5yZW1vdmUodikpO1xyXG4gICAgICBxcy5mb3JFYWNoKHYgPT4gcGFyZW50LmNsYXNzTGlzdC5jb250YWlucyh2KSAmJiBub2RlMS5jbGFzc0xpc3QuYWRkKHYpKTtcclxuICAgICAgcGFyZW50LnBhcmVudEVsZW1lbnQ/Lmluc2VydEJlZm9yZShub2RlMSwgcGFyZW50KTtcclxuICAgICAgcGFyZW50LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXBsLnJlaW5kZXgoKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lcmdlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkMSwgaWQyXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IG5vZGUxID0gcmVwbC5zZWxlY3RQYW5lbChpZDEpO1xyXG4gICAgbGV0IG5vZGUyID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgbm9kZTEgJiYgbm9kZTIgJiYgbWVyZ2Vfbm9kZXMocmVwbCwgbm9kZTEsIG5vZGUyKTtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyBiYm94IH0gZnJvbSBcIi4uL2Z1bi9iYm94XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSGlSZXNDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlcGxhY2VzIHRoZSBjdXJyZW50IHBob3RvIHdpdGggb25lIG9mIGhpZ2hlciBxdWFsaXR5XHJcbiAgICovXHJcbiAgYXN5bmMgdXBncmFkZVJlc29sdXRpb24ocmVwbDogUmVwbCwgcGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgaWYgKCFwYW5lbC5waG90bylcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8vIGF0dGVtcHRzIHRvIGluY3JlYXNlIGFuIGltYWdlIHNpemUgYW5kIGRlY3JlYXNlIHRoZSB0cmFuc2Zvcm0gc2NhbGVcclxuICAgIC8vIHRvIGhhdmUgYSBuZWdsaWdhYmxlIGVmZmVjdCBvbiB0aGUgaW1hZ2UgYnV0IGFsbG93IGZvciBzd2FwcGluZyBpblxyXG4gICAgLy8gYSBoaWdoZXIgcmVzb2x1dGlvbiB2ZXJzaW9uLlxyXG4gICAgLy8gdGhpcyBpcyBub3QgY29tcGVuc2F0aW5nIGZvciAgcGFkZGluZywgbWFyZ2luLCBib3JkZXIgd2lkdGgsIGV0Yy5cclxuICAgIC8vIGl0IGlzIG5vdCBwcmVzZXJ2aW5nIHJvdGF0aW9uXHJcbiAgICBsZXQgYm94ID0gYmJveChwYW5lbC5pbWFnZSk7XHJcbiAgICBsZXQgaW1hZ2VSZWN0ID0gcGFuZWwuaW1hZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgc2NhbGUgPSBpbWFnZVJlY3Qud2lkdGggLyBib3gud2lkdGg7XHJcbiAgICBpZiAoMSA+IHNjYWxlKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KFwidGhpcyB3b3VsZCBub3QgYmUgYW4gdXBncmFkZVwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHBhbmVsUmVjdCA9IHBhbmVsLnBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUud2lkdGggPSBpbWFnZVJlY3Qud2lkdGggKyBcInB4XCI7XHJcbiAgICBwYW5lbC5pbWFnZS5zdHlsZS5oZWlnaHQgPSBpbWFnZVJlY3QuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgbGV0IGR4ID0gaW1hZ2VSZWN0LmxlZnQgLSBwYW5lbFJlY3QubGVmdCAtIHBhcnNlRmxvYXQocGFuZWwucGFuZWwuc3R5bGUuYm9yZGVyTGVmdFdpZHRoKTtcclxuICAgIGxldCBkeSA9IGltYWdlUmVjdC50b3AgLSBwYW5lbFJlY3QudG9wIC0gcGFyc2VGbG9hdChwYW5lbC5wYW5lbC5zdHlsZS5ib3JkZXJUb3BXaWR0aCk7XHJcbiAgICBwYW5lbC5pbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7ZHh9cHgsJHtkeX1weClgO1xyXG4gICAgcGFuZWwuc2V0QmFja2dyb3VuZEltYWdlKGAke3BhbmVsLnBob3RvLm1lZGlhSW5mby5iYXNlVXJsfT13JHtNYXRoLmZsb29yKGltYWdlUmVjdC53aWR0aCl9YCk7XHJcbiAgICByZXBsLm5vdGlmeShgdXBncmFkZWQgYnkgJHtNYXRoLnJvdW5kKHNjYWxlICogMTAwKX0lYCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IFsuLi5pZHNdID0gYXJncy5zcGxpdChcIiBcIikubWFwKHYgPT4gdi50cmltKCkpLmZpbHRlcih2ID0+IHYubGVuZ3RoKTtcclxuICAgIGNvbnN0IHRhcmdldHMgPSAhaWRzLmxlbmd0aCA/IHJlcGwucGFuZWxzIDogaWRzLm1hcChpZCA9PiByZXBsLnNlbGVjdFBhbmVsKGlkKSk7XHJcbiAgICB0YXJnZXRzLmZvckVhY2gocCA9PiBwICYmIHRoaXMudXBncmFkZVJlc29sdXRpb24ocmVwbCwgcCkpO1xyXG5cclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmV4cG9ydCBjbGFzcyBNb3ZlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkMSwgaWQyXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IHBob3RvID0gcmVwbC5zZWxlY3RQaG90byhpZDEpO1xyXG4gICAgaWYgKCFwaG90bykgcmV0dXJuO1xyXG5cclxuXHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkMik7XHJcbiAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgcGFuZWwuYWRkUGhvdG8ocGhvdG8pO1xyXG5cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi4vZnVuL3RyYW5zZm9ybVwiO1xyXG5cclxuZnVuY3Rpb24gcm90YXRlSW1hZ2UocmVwbDogUmVwbCwgbm9kZTogSFRNTEVsZW1lbnQsIGFuZ2xlOiBzdHJpbmcpIHtcclxuICBpZiAoIW5vZGUpXHJcbiAgICByZXR1cm47XHJcblxyXG4gIGlmICghIWFuZ2xlKSB7XHJcbiAgICB0cmFuc2Zvcm0obm9kZSwgYHJvdGF0ZSgke2FuZ2xlfWRlZylgKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBsZXQgYW5nbGUgPSAwO1xyXG4gICAgbGV0IGFuaW1hdGlvbnMgPSByZXBsLmFuaW1hdGlvbnM7XHJcbiAgICBhbmltYXRpb25zLmFuaW1hdGUoXCJyb3RhdGVcIiwgKCkgPT4ge1xyXG4gICAgICBhbmdsZSArPSAxO1xyXG4gICAgICB0cmFuc2Zvcm0obm9kZSwgYHJvdGF0ZSgke2FuZ2xlfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUm90YXRlUGFuZWxDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRlbHRhOiBudW1iZXIpIHsgfVxyXG5cclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiBgcm90YXRlIHBhbmVsIGJ5ICR7dGhpcy5kZWx0YX0gZGVnYDtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgbGV0IGxhYmVsSW1hZ2VPclBhbmVsID0gcGFuZWwucGFuZWw7XHJcbiAgICAgIHRyYW5zZm9ybShsYWJlbEltYWdlT3JQYW5lbCwgYHJvdGF0ZSgke3RoaXMuZGVsdGF9ZGVnKWApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUm90YXRlSW1hZ2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRlbHRhPzogbnVtYmVyKSB7IH1cclxuXHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gYHJvdGF0ZSBpbWFnZSBieSAke3RoaXMuZGVsdGF9IGRlZ2A7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBpZiAoISFhcmdzKSB7XHJcbiAgICAgIGxldCBbbm91biwgbm91bjJdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwobm91bik7XHJcbiAgICAgIGlmICghcGFuZWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgcm90YXRlSW1hZ2UocmVwbCwgcGFuZWwuaW1hZ2UsIG5vdW4yKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgbGV0IGxhYmVsSW1hZ2VPclBhbmVsID0gcGFuZWwuaW1hZ2U7XHJcbiAgICAgIHRyYW5zZm9ybShsYWJlbEltYWdlT3JQYW5lbCwgYHJvdGF0ZSgke3RoaXMuZGVsdGF9ZGVnKWApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YToge1xyXG4gICAgeD86IG51bWJlcjtcclxuICAgIHk/OiBudW1iZXI7XHJcbiAgfSkgeyB9XHJcblxyXG4gIGFib3V0KCl7XHJcbiAgICBsZXQgcmVzdWx0ID0gPHN0cmluZ1tdPltdO1xyXG4gICAgbGV0IHggPSB0aGlzLmRlbHRhLnggfHwgMDtcclxuICAgIGxldCB5ID0gdGhpcy5kZWx0YS55IHx8IDA7XHJcblxyXG4gICAgaWYgKHggPiAwKSByZXN1bHQucHVzaChgJHt4fSBweCByaWdodGApO1xyXG4gICAgaWYgKHggPCAwKSByZXN1bHQucHVzaChgJHsteH0gcHggbGVmdGApO1xyXG4gICAgaWYgKHkgPiAwKSByZXN1bHQucHVzaChgJHt5fSBweCB1cGApO1xyXG4gICAgaWYgKHkgPCAwKSByZXN1bHQucHVzaChgJHsteX0gcHggZG93bmApO1xyXG4gICAgcmV0dXJuIGBtb3ZlIHBhbmVsICR7cmVzdWx0LmpvaW4oXCIgYW5kIFwiKX1gO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLnBhbmVsO1xyXG4gICAgICBsZXQgY29tcHV0ZWRUcmFuZm9ybSA9IGdldENvbXB1dGVkU3R5bGUobGFiZWxJbWFnZU9yUGFuZWwpLnRyYW5zZm9ybTtcclxuICAgICAgaWYgKGNvbXB1dGVkVHJhbmZvcm0gPT09IFwibm9uZVwiKSBjb21wdXRlZFRyYW5mb3JtID0gXCJcIjtcclxuICAgICAgbGFiZWxJbWFnZU9yUGFuZWwuc3R5bGUudHJhbnNmb3JtID0gY29tcHV0ZWRUcmFuZm9ybSArIGAgdHJhbnNsYXRlKCR7dGhpcy5kZWx0YS54IHx8IDB9cHgsICR7dGhpcy5kZWx0YS55IHx8IDB9cHgpYDtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3BDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgYWJvdXQoKSB7IHJldHVybiBcIlN0b3AgQW5pbWF0aW9uc1wiO31cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCFyZXBsLmFuaW1hdGlvbnMuYW5pbWF0aW9ucy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgIHJlcGwuYW5pbWF0aW9ucy5zdG9wKGFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvZ2dsZUZvY3VzQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGFib3V0KCkgeyByZXR1cm4gXCJUb2dnbGUgZm9jdXNcIjt9XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IGFjdGl2ZVBhbmVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgIGlmICghYWN0aXZlUGFuZWw/LmNsYXNzTGlzdC5jb250YWlucyhcInBhbmVsXCIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBhY3RpdmVQYW5lbC5jbGFzc0xpc3QudG9nZ2xlKFwiZm9jdXNcIik7XHJcbiAgICAvLyBoZXJlIGkgYW0gLSBpZiBub3QgXCJzaGlmdFwiIGtleSB0aGVuIHVuZm9jdXMgYWxsIHBhbmVsc1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5leHBvcnQgY2xhc3MgRXNjYXBlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIFxyXG4gIHByaXZhdGUgaXNQYW5lbChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gICAgaWYgKCFlbGVtZW50KVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbFwiKSB8fCBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInBhbmVsLWNvbnRhaW5lclwiKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2VsZWN0UGFyZW50UGFuZWwoKSB7XHJcbiAgICBsZXQgY3VycmVudFBhbmVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIWN1cnJlbnRQYW5lbClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRQYW5lbCkge1xyXG4gICAgICBjdXJyZW50UGFuZWwgPSBjdXJyZW50UGFuZWwucGFyZW50RWxlbWVudDtcclxuICAgICAgaWYgKCFjdXJyZW50UGFuZWwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBpZiAodGhpcy5pc1BhbmVsKGN1cnJlbnRQYW5lbCkpIHtcclxuICAgICAgICBjdXJyZW50UGFuZWwuZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIC8vIHVuZm9jdXMgYWxsIHBhbmVsc1xyXG4gICAgcmVwbC5wYW5lbHMuZm9yRWFjaChwID0+IHAucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzXCIpKTtcclxuICAgIHRoaXMuc2VsZWN0UGFyZW50UGFuZWwoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICByZWFkb25seSAjdW5pdHM6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgZGVsdGE6IG51bWJlcixcclxuICAgIHB1YmxpYyBvcHRpb25zID0ge1xyXG4gICAgICB1bml0czogXCJweFwiLFxyXG4gICAgfVxyXG4gICkge1xyXG4gICAgdGhpcy4jdW5pdHMgPSBvcHRpb25zPy51bml0cyB8fCBcInB4XCI7XHJcbiAgfVxyXG5cclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbHRhID4gMCA/IGBpbmNyZWFzZSBmb250IGJ5ICR7dGhpcy5kZWx0YX0ke3RoaXMuI3VuaXRzfWAgOiBgZGVjcmVhc2UgZm9udCBieSAkey10aGlzLmRlbHRhfSR7dGhpcy4jdW5pdHN9YDtcclxuICB9XHJcblxyXG4gIGlzTGFiZWwoZWxlbWVudDogRWxlbWVudCB8IG51bGwpIHtcclxuICAgIGlmICghZWxlbWVudCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGFiZWxcIik7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgaWYgKCF0aGlzLmlzTGFiZWwobGFiZWwpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBmb250U2l6ZSA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShsYWJlbCkuZm9udFNpemUpO1xyXG4gICAgbGFiZWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZSArIHRoaXMuZGVsdGF9JHt0aGlzLiN1bml0c31gO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVNZWRpYUl0ZW0gfSBmcm9tIFwiLi9Hb29nbGVNZWRpYUl0ZW1cIjtcclxuZXhwb3J0IGludGVyZmFjZSBHb29nbGVQaG90b0FQSSB7XHJcbiAgYXV0aDI6IHtcclxuICAgIGdldEF1dGhJbnN0YW5jZTogKCkgPT4ge1xyXG4gICAgICBpc1NpZ25lZEluOiB7XHJcbiAgICAgICAgbGlzdGVuOiAoY2I6IChpc1NpZ25lZEluOiBib29sZWFuKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG4gICAgICAgIGdldDogKCkgPT4gYm9vbGVhbjtcclxuICAgICAgfTtcclxuICAgICAgc2lnbkluOiAoKSA9PiB2b2lkO1xyXG4gICAgICBzaWduT3V0OiAoKSA9PiB2b2lkO1xyXG4gICAgfTtcclxuICB9O1xyXG4gIGxvYWQ6ICh0eXBlOiBzdHJpbmcsIGNiOiBGdW5jdGlvbikgPT4gdm9pZDtcclxuICBjbGllbnQ6IHtcclxuICAgIGluaXQ6IChhcmdzOiB7XHJcbiAgICAgIGFwaUtleTogc3RyaW5nO1xyXG4gICAgICBkaXNjb3ZlcnlEb2NzOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gICAgICBzY29wZTogc3RyaW5nO1xyXG4gICAgfSkgPT4gUHJvbWlzZTxhbnk+O1xyXG4gICAgcGhvdG9zbGlicmFyeToge1xyXG4gICAgICBhbGJ1bXM6IHtcclxuICAgICAgICBsaXN0OiBGdW5jdGlvbjtcclxuICAgICAgfTtcclxuICAgICAgbWVkaWFJdGVtczoge1xyXG4gICAgICAgIHNlYXJjaDogKGFyZ3M6IHtcclxuICAgICAgICAgIGFsYnVtSWQ6IHN0cmluZztcclxuICAgICAgICAgIHBhZ2VUb2tlbj86IHN0cmluZztcclxuICAgICAgICB9KSA9PiBQcm9taXNlPHtcclxuICAgICAgICAgIHJlc3VsdDoge1xyXG4gICAgICAgICAgICBuZXh0UGFnZVRva2VuPzogc3RyaW5nO1xyXG4gICAgICAgICAgICBtZWRpYUl0ZW1zOiBBcnJheTxHb29nbGVNZWRpYUl0ZW0+O1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9PjtcclxuICAgICAgICBnZXQ6IChtZWRpYUl0ZW1JZDogYW55KSA9PiBQcm9taXNlPHtcclxuICAgICAgICAgIHJlc3VsdDogR29vZ2xlTWVkaWFJdGVtO1xyXG4gICAgICAgIH0+O1xyXG4gICAgICB9O1xyXG4gICAgfTtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IEdvb2dsZVBob3RvQVBJIH0gZnJvbSBcIi4uL21vZGVscy9Hb29nbGVQaG90b0FQSVwiO1xyXG5cclxuZGVjbGFyZSB2YXIgZ2FwaTogR29vZ2xlUGhvdG9BUEk7XHJcblxyXG5leHBvcnQgY2xhc3MgR29vZ2xlUGhvdG9TaWduaW4ge1xyXG4gIHByaXZhdGUgcGVvcGxlQXBpRGlzY292ZXJ5ID0gXCJcIjtcclxuICAvLyB3aGVyZSB0byBzdG9yZSB0aGVzZSB2YWx1ZXM/XHJcbiAgcHJpdmF0ZSBzY29wZXMgPSBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvcGhvdG9zbGlicmFyeS5yZWFkb25seVwiO1xyXG5cclxuICBwcml2YXRlIGF1dGhvcml6ZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnR8bnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBzaWdub3V0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudHxudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSByZWFkeSA9ICgpID0+IHsgfTtcclxuXHJcbiAgYXN5bmMgaGFuZGxlQ2xpZW50TG9hZCgpIHtcclxuICAgIC8vIExvYWQgdGhlIEFQSSBjbGllbnQgYW5kIGF1dGgyIGxpYnJhcnkuXHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGdhcGkubG9hZChcImNsaWVudDphdXRoMlwiLCByZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGNyZWRlbnRpYWxzUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi4vd2ViL2NyZWRlbnRpYWxzLmpzb25cIik7XHJcbiAgICBsZXQgY3JlZGVudGlhbHM6IHtcclxuICAgICAgYXBpS2V5OiBzdHJpbmc7XHJcbiAgICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICB9ID0gYXdhaXQgY3JlZGVudGlhbHNSZXNwb25zZS5qc29uKCk7XHJcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGZldGNoKFwiLi93ZWIvcGhvdG9zX3Jlc3RfdjEuanNvblwiKTtcclxuICAgIHRoaXMucGVvcGxlQXBpRGlzY292ZXJ5ID0gYXdhaXQgcmVzcC5qc29uKCk7XHJcbiAgICBhd2FpdCB0aGlzLmluaXRDbGllbnQoY3JlZGVudGlhbHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBpbml0Q2xpZW50KGFyZ3M6IHtcclxuICAgIGFwaUtleTogc3RyaW5nO1xyXG4gICAgY2xpZW50SWQ6IHN0cmluZztcclxuICB9KSB7XHJcblxyXG4gICAgdGhpcy5hdXRob3JpemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dGhvcml6ZS1idXR0b25cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBpZiAoIXRoaXMuYXV0aG9yaXplQnV0dG9uKSB0aHJvdyBcImEgY2xpY2thYmxlIGVsZW1lbnQgbXVzdCBleGlzdCB3aXRoIGlkIG9mICdhdXRob3JpemUtYnV0dG9uJ1wiO1xyXG5cclxuICAgIHRoaXMuc2lnbm91dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbm91dC1idXR0b25cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBpZiAoIXRoaXMuc2lnbm91dEJ1dHRvbikgdGhyb3cgXCJhIGNsaWNrYWJsZSBlbGVtZW50IG11c3QgZXhpc3Qgd2l0aCBpZCBvZiAnc2lnbm91dC1idXR0b24nXCI7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKGdvb2QsIGJhZCkgPT4ge1xyXG4gICAgICB0aGlzLnJlYWR5ID0gKCkgPT4gZ29vZCgpO1xyXG4gICAgICBhd2FpdCBnYXBpLmNsaWVudC5pbml0KHtcclxuICAgICAgICBhcGlLZXk6IGFyZ3MuYXBpS2V5LFxyXG4gICAgICAgIGRpc2NvdmVyeURvY3M6IFt0aGlzLnBlb3BsZUFwaURpc2NvdmVyeV0sXHJcbiAgICAgICAgY2xpZW50SWQ6IGFyZ3MuY2xpZW50SWQsXHJcbiAgICAgICAgc2NvcGU6IHRoaXMuc2NvcGVzLFxyXG4gICAgICB9KTtcclxuICAgICAgLy8gTGlzdGVuIGZvciBzaWduLWluIHN0YXRlIGNoYW5nZXMuXHJcbiAgICAgIGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuaXNTaWduZWRJbi5saXN0ZW4oc3RhdHVzID0+IHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKHN0YXR1cykpO1xyXG4gICAgICAvLyBIYW5kbGUgdGhlIGluaXRpYWwgc2lnbi1pbiBzdGF0ZS5cclxuICAgICAgdGhpcy51cGRhdGVTaWduaW5TdGF0dXMoZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKS5pc1NpZ25lZEluLmdldCgpKTtcclxuICAgICAgdGhpcy5hdXRob3JpemVCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB0aGlzLmhhbmRsZUF1dGhDbGljaygpO1xyXG4gICAgICB0aGlzLnNpZ25vdXRCdXR0b24hLm9uY2xpY2sgPSAoKSA9PiB0aGlzLmhhbmRsZVNpZ25vdXRDbGljaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVNpZ25pblN0YXR1cyhpc1NpZ25lZEluOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNTaWduZWRJbikge1xyXG4gICAgICB0aGlzLmF1dGhvcml6ZUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICB0aGlzLnNpZ25vdXRCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgIHRoaXMucmVhZHkoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmF1dGhvcml6ZUJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUF1dGhDbGljaygpIHtcclxuICAgIGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuc2lnbkluKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVNpZ25vdXRDbGljaygpIHtcclxuICAgIGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuc2lnbk91dCgpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEdvb2dsZUFsYnVtIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgY292ZXJQaG90b0Jhc2VVcmw6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVQaG90b1NpZ25pbiB9IGZyb20gXCIuL0dvb2dsZVBob3RvU2lnbmluXCI7XHJcbmltcG9ydCB7IEdvb2dsZU1lZGlhSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlTWVkaWFJdGVtXCI7XHJcbmltcG9ydCB7IEdvb2dsZUFsYnVtIH0gZnJvbSBcIi4uL21vZGVscy9Hb29nbGVBbGJ1bVwiO1xyXG5pbXBvcnQgeyBHb29nbGVQaG90b0FQSSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlUGhvdG9BUElcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGdhcGk6IEdvb2dsZVBob3RvQVBJO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBob3RvcyB7XHJcblxyXG4gIGFzeW5jIGdldEFsYnVtcygpIHtcclxuICAgIGxldCBzaWduaW4gPSBuZXcgR29vZ2xlUGhvdG9TaWduaW4oKTtcclxuICAgIGF3YWl0IHNpZ25pbi5oYW5kbGVDbGllbnRMb2FkKCk7XHJcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkuYWxidW1zLmxpc3QoKTtcclxuICAgIGlmIChyZXNwLnN0YXR1cyAhPT0gMjAwKVxyXG4gICAgICB0aHJvdyBgc3RhdHVzOiAke3Jlc3Auc3RhdHVzfWA7XHJcbiAgICBjb25zb2xlLmxvZyh7IHJlc3AgfSk7XHJcbiAgICBsZXQgYWxidW1zID0gcmVzcC5yZXN1bHQuYWxidW1zIGFzIEFycmF5PEdvb2dsZUFsYnVtPjtcclxuICAgIHdoaWxlIChyZXNwLnJlc3VsdC5uZXh0UGFnZVRva2VuKSB7XHJcbiAgICAgIHJlc3AgPSBhd2FpdCBnYXBpLmNsaWVudC5waG90b3NsaWJyYXJ5LmFsYnVtcy5saXN0KHtwYWdlVG9rZW46IHJlc3AucmVzdWx0Lm5leHRQYWdlVG9rZW59KTtcclxuICAgICAgaWYgKHJlc3Auc3RhdHVzICE9PSAyMDApXHJcbiAgICAgICAgdGhyb3cgYHN0YXR1czogJHtyZXNwLnN0YXR1c31gO1xyXG4gICAgICBjb25zb2xlLmxvZyh7IHJlc3AgfSk7XHJcbiAgICAgIGFsYnVtcyA9IGFsYnVtcy5jb25jYXQocmVzcC5yZXN1bHQuYWxidW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhbGJ1bXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGJ1bShhbGJ1bTogR29vZ2xlQWxidW0pIHtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5tZWRpYUl0ZW1zLnNlYXJjaCh7IGFsYnVtSWQ6IGFsYnVtLmlkIH0pO1xyXG4gICAgbGV0IHttZWRpYUl0ZW1zfSA9IGRhdGEucmVzdWx0O1xyXG4gICAgd2hpbGUgKGRhdGEucmVzdWx0Lm5leHRQYWdlVG9rZW4pIHtcclxuICAgICAgZGF0YSA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkubWVkaWFJdGVtcy5zZWFyY2goeyBhbGJ1bUlkOiBhbGJ1bS5pZCwgcGFnZVRva2VuOiBkYXRhLnJlc3VsdC5uZXh0UGFnZVRva2VuIH0pO1xyXG4gICAgICBtZWRpYUl0ZW1zLnB1c2goLi4uZGF0YS5yZXN1bHQubWVkaWFJdGVtcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVkaWFJdGVtcztcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFBob3RvKG1lZGlhSXRlbUlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5tZWRpYUl0ZW1zLmdldCh7IG1lZGlhSXRlbUlkIH0pO1xyXG4gICAgcmV0dXJuIChkYXRhLnJlc3VsdCkgYXMgR29vZ2xlTWVkaWFJdGVtO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBHb29nbGVQaG90b3MgfSBmcm9tIFwiLi4vY29udHJvbHMvR29vZ2xlUGhvdG9zXCI7XHJcbmltcG9ydCB7IEdvb2dsZUNvbGxhZ2VQaG90byB9IGZyb20gXCIuLi9jb250cm9scy9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcGVuQWxidW1zQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgYXN5bmMgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxmYWxzZSB8IHZvaWQ+IHtcclxuICAgICAgICBpZiAoIWFyZ3MpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuQWxidW1zKHJlcGwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbGJ1bU5hbWVzID0gYXJncy5zcGxpdChcIixcIik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5vcGVuQWxidW1zKHJlcGwsIGFsYnVtTmFtZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9wZW5BbGJ1bXMocmVwbDogUmVwbCwgYWxidW1OYW1lcz86IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgcGhvdG9zID0gbmV3IEdvb2dsZVBob3RvcygpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG9zXCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgbGV0IGFsYnVtcyA9IGF3YWl0IHBob3Rvcy5nZXRBbGJ1bXMoKTtcclxuICAgICAgICAgICAgaWYgKGFsYnVtTmFtZXMpIGFsYnVtcyA9IGFsYnVtcy5maWx0ZXIoYSA9PiAtMSA8IGFsYnVtTmFtZXMuaW5kZXhPZihhLnRpdGxlKSk7XHJcbiAgICAgICAgICAgIGFsYnVtcy5mb3JFYWNoKGFzeW5jIChhbGJ1bSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9wZW5pbmcgYWxidW06ICR7YWxidW0uaWR9ICgke2FsYnVtLnRpdGxlfSlgKTtcclxuICAgICAgICAgICAgICAgIGxldCBtZWRpYUl0ZW1zID0gYXdhaXQgcGhvdG9zLmdldEFsYnVtKGFsYnVtKTtcclxuICAgICAgICAgICAgICAgIG1lZGlhSXRlbXMuZm9yRWFjaChtZWRpYUl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaG90byA9IG5ldyBHb29nbGVDb2xsYWdlUGhvdG8obWVkaWFJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBsLnBob3Rvcy5wdXNoKHBob3RvKTtcclxuICAgICAgICAgICAgICAgICAgICBwaG90by5yZW5kZXJJbnRvKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbC5yZWluZGV4UGhvdG9zKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuLi9tb2RlbHMvQmVoYXZpb3JcIjtcclxuXHJcbi8qKlxyXG4gKiBXaGVuIHVzZXIgc2hpZnQtY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzc1xyXG4gKiBXaGVuIHVzZXIgY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzcywgcmVtb3ZlIFwiZm9jdXNcIiBmcm9tIGFsbCBvdGhlcnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdG9yIGltcGxlbWVudHMgQmVoYXZpb3I8UmVwbD5cclxue1xyXG4gICAgZXh0ZW5kKGNvbnRyb2w6IFJlcGwpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgY3VycmVudCBcImZvY3VzXCIgaWYgc2hpZnQgbm90IGNsaWNrZWRcclxuICAgICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC5wYW5lbHMuZm9yRWFjaChwID0+IHAucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGFuZWxzID0gZXZlbnQuY29tcG9zZWRQYXRoKCk7XHJcbiAgICAgICAgICAgIHBhbmVscyA9IHBhbmVscy5maWx0ZXIoKG5vZGU6IGFueSkgPT4gdHJ1ZSA9PT0gbm9kZT8uY2xhc3NMaXN0Py5jb250YWlucyhcInBhbmVsXCIpKSBhcyBBcnJheTxIVE1MRWxlbWVudD47ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhbmVscy5mb3JFYWNoKChub2RlOiBhbnkpID0+IG5vZGUuY2xhc3NMaXN0LnRvZ2dsZShcImZvY3VzXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi4vbW9kZWxzL0JlaGF2aW9yXCI7XHJcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tIFwiLi4vY29udHJvbHMvVG9hc3RlclwiO1xyXG5cclxuLyoqXHJcbiAqIFdoZW4gdXNlciBzaGlmdC1jbGlja3MgYSBwYW5lbCBhZGQgXCJmb2N1c1wiIGNsYXNzXHJcbiAqIFdoZW4gdXNlciBjbGlja3MgYSBwYW5lbCBhZGQgXCJmb2N1c1wiIGNsYXNzLCByZW1vdmUgXCJmb2N1c1wiIGZyb20gYWxsIG90aGVyc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkJlaGF2aW9yIGltcGxlbWVudHMgQmVoYXZpb3I8UmVwbD5cclxue1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRvYXN0ZXI6IFRvYXN0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBleHRlbmQoY29udHJvbDogUmVwbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBub3RpZnkgPSBjb250cm9sLm5vdGlmeTtcclxuICAgICAgICBjb250cm9sLm5vdGlmeSA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0ZXIudG9hc3QobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi4vY29udHJvbHMvQ29sbGFnZVBhbmVsXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICogU2NhbGUgdGhlIGltYWdlXHJcbiAqIEBwYXJhbSBzY2FsZSBwZXJjZW50YWdlIGRlbHRhIGZyb20gY3VycmVudCBzY2FsZVxyXG4gKi9cclxuZnVuY3Rpb24gc2NhbGVJbWFnZShyZXBsOiBSZXBsLCBwYW5lbDogQ29sbGFnZVBhbmVsLCBzY2FsZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IHBhbmVsLmltYWdlO1xyXG4gICAgaWYgKCFub2RlKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS53aWR0aDtcclxuICAgICAgICBsZXQgc2NhbGUgPSBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDtcclxuICAgICAgICByZXBsLmFuaW1hdGlvbnMuYW5pbWF0ZShcInpvb21cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBzY2FsZSAqPSAxLjAxO1xyXG4gICAgICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gYCR7MTAwICogc2NhbGV9JWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBjb21wdXRlIGZvY2FsIHBvaW50IHRvIHpvb20gYWJvdXRcclxuICAgICAgICAvLyBsZXQgaW1hZ2VCb3ggPSBiYm94KG5vZGUpO1xyXG4gICAgICAgIC8vIGxldCBwYW5lbEJveCA9IGJib3gocGFuZWwucGFuZWwpO1xyXG4gICAgICAgIC8vIGxldCBmb2NhbFBvaW50ID0gWy1pbWFnZUJveC5sZWZ0ICsgcGFuZWxCb3gud2lkdGggLyAyLCAtaW1hZ2VCb3gudG9wICsgcGFuZWxCb3guaGVpZ2h0IC8gMl07XHJcbiAgICAgICAgbGV0IGVmZmVjdGl2ZVNjYWxlID0gcGFyc2VGbG9hdChzY2FsZSk7XHJcbiAgICAgICAgLy9ub2RlLnN0eWxlLndpZHRoID0gYCR7MTAwICogZWZmZWN0aXZlU2NhbGV9JWA7XHJcbiAgICAgICAgLy8gdGhlIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQgY2hhbmdlZCwgdHJhbnNsYXRlIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gICAgICAgIC8vIGNlbnRlciBiYWNrIHRvIHRoZSBwYW5lbCBjZW50ZXJcclxuICAgICAgICB0cmFuc2Zvcm0obm9kZSwgYHNjYWxlKCR7ZWZmZWN0aXZlU2NhbGV9LCR7ZWZmZWN0aXZlU2NhbGV9KWApO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjYWxlUGFuZWxDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NhbGU/OiBudW1iZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBhYm91dCgpIHtcclxuICAgICAgcmV0dXJuIGBzY2FsZSBwYW5lbCBieSAkeyh0aGlzLnNjYWxlfHwwKS50b0ZpeGVkKDMpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgICAgICBpZiAoISFhcmdzKSB7XHJcbiAgICAgICAgICAgIGxldCBbbm91biwgbm91bjJdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwobm91bik7XHJcbiAgICAgICAgICAgIGlmICghcGFuZWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcGFuZWwuc2NhbGVGcmFtZShub3VuMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgICAgICAgcGFuZWwuc2NhbGVGcmFtZSh0aGlzLnNjYWxlICsgXCJcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2FsZUltYWdlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHNjYWxlPzogbnVtYmVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgYWJvdXQoKSB7XHJcbiAgICAgIHJldHVybiBgc2NhbGUgaW1hZ2UgYnkgJHsodGhpcy5zY2FsZXx8MCkudG9GaXhlZCgzKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICAgICAgaWYgKCEhYXJncykge1xyXG4gICAgICAgICAgICBsZXQgW2lkLCBzY2FsZV0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gcmVwbC5zZWxlY3RQYW5lbChpZCk7XHJcbiAgICAgICAgICAgIGlmICghcGFuZWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgc2NhbGVJbWFnZShyZXBsLCBwYW5lbCwgc2NhbGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc2NhbGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgICAgICAgc2NhbGVJbWFnZShyZXBsLCBwYW5lbCwgdGhpcy5zY2FsZSArIFwiXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSBcIi4vY29udHJvbHMvVG9hc3RlclwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcCB9IGZyb20gXCIuL2NvbnRyb2xzL0RyYWdBbmREcm9wXCI7XHJcbmltcG9ydCB7IENvbW1hbmRzIH0gZnJvbSBcIi4vY29udHJvbHMvQ29tbWFuZHNcIjtcclxuaW1wb3J0IHsgSGVscENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9IZWxwXCI7XHJcbmltcG9ydCB7IFNwbGl0Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1NwbGl0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBBc3BlY3RSYXRpb0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Bc3BlY3RSYXRpb0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgQm9yZGVyQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0JvcmRlckNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhbmdlU3R5bGVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlU3R5bGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IEdvdG9Db21tYW5kRWRpdG9yQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTd2FwUGFuZWxzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kXCI7XHJcbmltcG9ydCB7IEdvdG9Db21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvR290b0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgVGV4dENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9UZXh0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBQYWRDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvUGFkQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RyYW5zbGF0ZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWFyZ2luQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01hcmdpbkNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWVyZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvTWVyZ2VDb21tYW5kXCI7XHJcbmltcG9ydCB7IEhpUmVzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0hpUmVzQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNb3ZlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01vdmVDb21tYW5kXCI7XHJcbmltcG9ydCB7IFJvdGF0ZVBhbmVsQ29tbWFuZCwgUm90YXRlSW1hZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlUm90YXRpb25Db21tYW5kXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0NoYW5nZVBvc2l0aW9uQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTdG9wQ29tbWFuZCwgVG9nZ2xlRm9jdXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvU3RvcENvbW1hbmRcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVycyB9IGZyb20gXCIuL2NvbnRyb2xzL0tleWJvYXJkSGFuZGxlcnNcIjtcclxuaW1wb3J0IHsgRXNjYXBlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0VzY2FwZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhbmdlRm9udFNpemVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kXCI7XHJcbmltcG9ydCB7IE9wZW5BbGJ1bXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RvciB9IGZyb20gXCIuL2JlaGF2aW9yL011bHRpU2VsZWN0b3JcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uQmVoYXZpb3IgfSBmcm9tIFwiLi9iZWhhdmlvci9Ob3RpZmljYXRpb25CZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBTY2FsZVBhbmVsQ29tbWFuZCwgU2NhbGVJbWFnZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmRcIjtcclxuXHJcbi8qKiBnbG9iYWwgdmFyaWFibGVzICovXHJcbmNvbnN0IHRvYXN0ZXIgPSBuZXcgVG9hc3Rlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0ZXJcIikgYXMgSFRNTEVsZW1lbnQpO1xyXG5jb25zdCBjb21tYW5kcyA9IG5ldyBDb21tYW5kcygpO1xyXG5jb25zdCByZXBsID0gbmV3IFJlcGwoY29tbWFuZHMpO1xyXG5jb25zdCBrZXlib2FyZEhhbmRsZXJzID0gbmV3IEtleWJvYXJkSGFuZGxlcnMoKTtcclxucmVwbC51c2UobmV3IE11bHRpU2VsZWN0b3IoKSk7XHJcbnJlcGwudXNlKG5ldyBOb3RpZmljYXRpb25CZWhhdmlvcih0b2FzdGVyKSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgSGVscENvbW1hbmQoKSwgeyBrZXk6IFwiP1wiLCBhYm91dDpcIkhlbHBcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IEVzY2FwZUNvbW1hbmQoKSwgeyBrZXk6IFwiRXNjYXBlXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQoMSksIHsga2V5OiBcIitcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZUZvbnRTaXplQ29tbWFuZCgtMSksIHsga2V5OiBcIi1cIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZVBhbmVsQ29tbWFuZCgxLjAxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIitcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFNjYWxlUGFuZWxDb21tYW5kKDEgLyAxLjAxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIi1cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFNjYWxlSW1hZ2VDb21tYW5kKDEuMDEpLCB7IGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZUltYWdlQ29tbWFuZCgxIC8gMS4wMSksIHsga2V5OiBcIi1cIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoMSksIHsga2V5OiBcIi5cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZUltYWdlQ29tbWFuZCgtMSksIHsga2V5OiBcIixcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZVBhbmVsQ29tbWFuZCgxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIj5cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZVBhbmVsQ29tbWFuZCgtMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCI8XCIgfSk7XHJcblxyXG4vKiogdmltIGNvbW1hbmRzXHJcblRvIG1vdmUgbGVmdCwgcHJlc3MgaC5cclxuVG8gbW92ZSByaWdodCwgcHJlc3MgbC5cclxuVG8gbW92ZSBkb3duLCBwcmVzcyBqLlxyXG5UbyBtb3ZlIHVwLCBwcmVzcyBrLlxyXG4gKi9cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHg6IC0xIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dMZWZ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVQYW5lbENvbW1hbmQoeyB4OiAxIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dSaWdodFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeTogMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93RG93blwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeTogLTEgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJBcnJvd1VwXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeDogLTEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dMZWZ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB4OiAxIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93UmlnaHRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCh7IHk6IDEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dEb3duXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB5OiAtMSB9KSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCJBcnJvd1VwXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwidG9wXCIsIHsgZGVsdGE6IDEsIHVuaXRzOiBcInB4XCIgfSksIHsga2V5OiBcInRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcInRvcFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIlRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImxlZnRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwibFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwibGVmdFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkxcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvdHRvbVwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJiXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3R0b21cIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJCXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJyaWdodFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJyXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJyaWdodFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIlJcIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ3aWR0aFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJ3XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ3aWR0aFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIldcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImhlaWdodFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJoXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJIXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU3dhcFBhbmVsc0NvbW1hbmQoKSwgeyBjdHJsS2V5OiB0cnVlLCBrZXk6IFwic1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU3RvcENvbW1hbmQoKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIiBcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IEdvdG9Db21tYW5kRWRpdG9yQ29tbWFuZCgpLCB7IGtleTogXCJjXCIsIGFib3V0OlwiZ290byBjb21tYW5kc1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVG9nZ2xlRm9jdXNDb21tYW5kKCksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIgXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUb2dnbGVGb2N1c0NvbW1hbmQoKSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCIgXCIgfSk7XHJcblxyXG5jb25zdCBkbmQgPSBuZXcgRHJhZ0FuZERyb3AocmVwbCwga2V5Ym9hcmRIYW5kbGVycyk7XHJcbnJlcGwuZG5kID0gZG5kO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBIZWxwQ29tbWFuZCgpLCBcIj9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgT3BlbkFsYnVtc0NvbW1hbmQoKSwgXCJvcGVuXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBBc3BlY3RSYXRpb0NvbW1hbmQoKSwgXCJhc3BlY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQm9yZGVyQ29tbWFuZCgpLCBcImJvcmRlclwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBHb3RvQ29tbWFuZCgpLCBcImdvdG9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgSGlSZXNDb21tYW5kKCksIFwiaGlyZXNcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgTWFyZ2luQ29tbWFuZCgpLCBcIm1hcmdpblwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNZXJnZUNvbW1hbmQoKSwgXCJtZXJnZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNb3ZlQ29tbWFuZCgpLCBcIm1vdmVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgUGFkQ29tbWFuZCgpLCBcInBhZFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoKSwgXCJyb3RhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU2NhbGVQYW5lbENvbW1hbmQoKSwgXCJzY2FsZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBTd2FwUGFuZWxzQ29tbWFuZCgpLCBcInN3YXBcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3BsaXRDb21tYW5kKCksIFwic3BsaXRcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3RvcENvbW1hbmQoKSwgXCJzdG9wXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFRleHRDb21tYW5kKCksIFwidGV4dFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoKSwgXCJ0cmFuc2xhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKCksIFwicGFuXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFNjYWxlSW1hZ2VDb21tYW5kKCksIFwiem9vbVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJiYWNrZ3JvdW5kQ29sb3JcIiksIFwiYmdjXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCh7IHNlbGVjdG9yOiBcIi5jb2xsYWdlIC5wYW5lbC1jb250YWluZXIgLm92ZXJsYXlcIiB9KSwgXCJvdmVybGF5XCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJDb2xvclwiKSwgXCJiY1wiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BDb2xvclwiKSwgXCJiY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tQ29sb3JcIiksIFwiYmNiXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckxlZnRDb2xvclwiKSwgXCJiY2xcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmlnaHRDb2xvclwiKSwgXCJiY3JcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlcldpZHRoXCIsIHt1bml0czpcInB4XCJ9KSwgXCJid1wiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJCb3R0b21XaWR0aFwiKSwgXCJid2JcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wV2lkdGhcIiksIFwiYnd0XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckxlZnRXaWR0aFwiKSwgXCJid2xcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmlnaHRXaWR0aFwiKSwgXCJid3JcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcIm9wYWNpdHlcIiksIFwib3BhY2l0eVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJSYWRpdXNcIiksIFwiYnJcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiKSwgXCJicnRsXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCIpLCBcImJydHJcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiKSwgXCJicmJsXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCIpLCBcImJyYnJcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcIndpZHRoXCIsIHsgdW5pdHM6IFwiZW1cIiB9KSwgXCJ3aWR0aFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyB1bml0czogXCJweFwiIH0pLCBcImhlaWdodFwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiekluZGV4XCIpLCBcInpcIik7XHJcblxyXG50b2FzdGVyLnRvYXN0KFwiV2VsY29tZSFcIik7XHJcbmV4cG9ydCBsZXQgZ2xvYmFscyA9IHtcclxuICAgIGFsbG93U3BlZWNoUmVjb2duaXRpb246IGZhbHNlLFxyXG4gICAgZGVidWc6IHRydWUsXHJcbiAgICByZXBsLFxyXG4gICAgZG5kLFxyXG4gICAga2V5Ym9hcmRIYW5kbGVycyxcclxufVxyXG4iLCJpbXBvcnQgeyBMaXN0ZW5lciB9IGZyb20gXCIuLi9jb250cm9scy9MaXN0ZW5lclwiO1xyXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSBcIi4uL2dsb2JhbHNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydCgpIHtcclxuICBsZXQgcmVwbCA9IGdsb2JhbHMucmVwbDtcclxuICBhd2FpdCByZXBsLnN0YXJ0dXAoKTtcclxuICBpZiAoZ2xvYmFscy5hbGxvd1NwZWVjaFJlY29nbml0aW9uKSB7XHJcbiAgICBsZXQgbGlzdGVuZXIgPSBuZXcgTGlzdGVuZXIoKTtcclxuICAgIGxpc3RlbmVyLmxpc3RlbigpO1xyXG4gICAgbGlzdGVuZXIub24oXCJzcGVlY2gtZGV0ZWN0ZWRcIiwgdmFsdWUgPT4geyByZXBsLmV4ZWN1dGVDb21tYW5kKHJlcGwucGFyc2VDb21tYW5kKHZhbHVlLnJlc3VsdCkpOyB9KTtcclxuICB9XHJcbiAgcmVwbC5nZXRQaG90b092ZXJsYXlzKCkuZm9yRWFjaChvdmVybGF5ID0+IHtcclxuICAgIGdsb2JhbHMuZG5kLmRyYWdnYWJsZShvdmVybGF5KTtcclxuICAgIGNvbnNvbGUubG9nKGAke292ZXJsYXkuaW5uZXJIVE1MfSBpcyBkcmFnZ2FibGVgKTtcclxuICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBzdGFydCB9IGZyb20gXCIuL2NvbGxhZ2UvZnVuL3N0YXJ0XCI7XHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi9jb2xsYWdlL2dsb2JhbHNcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgY29uc3QgcmVwbCA9IGdsb2JhbHMucmVwbDtcclxuXHJcbiAgICByZXBsLmV2YWwoXCJhc3BlY3QgNiA2XCIpO1xyXG4gICAgaWYgKGdsb2JhbHMuZGVidWcpIHtcclxuICAgICAgICByZXBsLmV2YWwoXCI/XCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcInNwbGl0IDFcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgNCAzXCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcInNwbGl0IDJcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgNCA1XCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcIm1lcmdlIDIgM1wiKTtcclxuICAgICAgICAvLy9yZXBsLmV2YWwoXCJzcGxpdCAxXCIpO1xyXG5cclxuICAgICAgICByZXBsLmV2YWwoXCJidyAxZW1cIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYmMgd2hpdGVcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYmdjIHNpbHZlclwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzY2FsZSAxIDAuNzVcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiYm9yZGVyIDEgMyBzaWx2ZXJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwicm90YXRlIDEgLTJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiem9vbSAyIDAuNVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzcGxpdCAxXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcIm1lcmdlIDEgMlwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzcGxpdCA2XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcIm1lcmdlIDggOVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJtZXJnZSA2IDdcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiZ290byAxXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInRleHQgMSBTdW1tZXIgMjAxOVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgYXdhaXQgcmVwbC5ldmFsKFwib3BlbiBEYXRlIE5pZ2h0LDIwMTlcIik7IC8vIHByZXNlbnQgbGlzdCBvZiBnb29nbGUgcGhvdG8gYWxidW1zP1xyXG4gICAgICAgIC8vYXdhaXQgcmVwbC5ldmFsKFwib3BlbiBncCAxOTk5XCIpOyAvLyBvcGVuIGdvb2dsZSBwaG90byBhbGJ1bSBcIjE5OTlcIj9cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbENvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb2xsYWdlIC5wYW5lbFwiKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBwaG90b0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb2xsYWdlIC5waG90b3MgLmltZ1wiKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhbmVsQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVwbC5ldmFsKGBtb3ZlICR7MSArIChpIC0gMSkgJSBwaG90b0NvdW50fSAke2l9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVwbC5ldmFsKFwib3BlbiAxXCIpO1xyXG4gICAgICAgICAgICAvLyByZXBsLmV2YWwoXCJoaXJlcyA2XCIpO1xyXG4gICAgICAgICAgICAvLyByZXBsLmV2YWwoXCJleHBvcnRcIik7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbnJ1bigpO1xyXG4iXX0=
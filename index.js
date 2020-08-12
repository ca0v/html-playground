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
define("collage/commands/CropToState", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CropToStateCommand = void 0;
    const paths = {
        "sc": "M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z"
    };
    const svgHash = {};
    function getSvgPath(key) {
        let result = svgHash[key];
        if (!result) {
            result = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            result.id = key;
            result.setAttribute("d", paths[key]);
            svgHash[key] = result;
        }
        return result;
    }
    class CropToStateCommand {
        about() {
            return `applies an SVG filter to an image`;
        }
        execute(repl, args) {
            let [usStateCode, ...ids] = args.split(" ").filter((v) => !!v);
            const targets = ids.length ? ids.map((id) => repl.selectPanel(id)) : repl.panels;
            const path = getSvgPath("sc");
            targets.forEach((p) => {
                p.panel.style.clipPath = `url(#heart)`;
            });
        }
    }
    exports.CropToStateCommand = CropToStateCommand;
});
define("collage/globals", ["require", "exports", "collage/controls/Toaster", "collage/controls/Repl", "collage/controls/DragAndDrop", "collage/controls/Commands", "collage/commands/Help", "collage/commands/SplitCommand", "collage/commands/AspectRatioCommand", "collage/commands/BorderCommand", "collage/commands/ChangeStyleCommand", "collage/commands/GotoCommandEditorCommand", "collage/commands/SwapPanelsCommand", "collage/commands/GotoCommand", "collage/commands/TextCommand", "collage/commands/PadCommand", "collage/commands/ToggleVisibilityCommand", "collage/commands/TranslateCommand", "collage/commands/MarginCommand", "collage/commands/MergeCommand", "collage/commands/HiResCommand", "collage/commands/MoveCommand", "collage/commands/ChangeRotationCommand", "collage/commands/ChangePositionCommand", "collage/commands/StopCommand", "collage/controls/KeyboardHandlers", "collage/commands/EscapeCommand", "collage/commands/ChangeFontSizeCommand", "collage/commands/OpenAlbumsCommand", "collage/behavior/MultiSelector", "collage/behavior/NotificationBehavior", "collage/commands/ChangeScaleCommand", "collage/commands/CropToState"], function (require, exports, Toaster_1, Repl_1, DragAndDrop_1, Commands_1, Help_1, SplitCommand_1, AspectRatioCommand_1, BorderCommand_1, ChangeStyleCommand_1, GotoCommandEditorCommand_1, SwapPanelsCommand_1, GotoCommand_1, TextCommand_1, PadCommand_1, ToggleVisibilityCommand_1, TranslateCommand_1, MarginCommand_1, MergeCommand_1, HiResCommand_1, MoveCommand_1, ChangeRotationCommand_1, ChangePositionCommand_1, StopCommand_1, KeyboardHandlers_1, EscapeCommand_1, ChangeFontSizeCommand_1, OpenAlbumsCommand_1, MultiSelector_1, NotificationBehavior_1, ChangeScaleCommand_1, CropToState_1) {
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
    commands.add(new CropToState_1.CropToStateCommand(), "clip");
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
            repl.eval("clip heart 1");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xsYWdlL21vZGVscy9EaWN0aW9uYXJ5LnRzIiwiY29sbGFnZS9jb250cm9scy9MaXN0ZW5lci50cyIsImNvbGxhZ2UvY29udHJvbHMvVG9hc3Rlci50cyIsImNvbGxhZ2UvZnVuL3RhaWwudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRQYXJzZXIudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQaG90by50cyIsImNvbGxhZ2UvbW9kZWxzL0dvb2dsZU1lZGlhSXRlbS50cyIsImNvbGxhZ2UvY29udHJvbHMvR29vZ2xlQ29sbGFnZVBob3RvLnRzIiwiY29sbGFnZS9jb250cm9scy9TcHJpdGUudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbC50cyIsImNvbGxhZ2UvY29udHJvbHMvQW5pbWF0aW9ucy50cyIsImNvbGxhZ2UvbW9kZWxzL0NvbW1hbmQudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRzLnRzIiwiY29sbGFnZS9mdW4vZ2V0QWN0aXZlT3ZlcmxheS50cyIsImNvbGxhZ2UvbW9kZWxzL0tleWJvYXJkSGFuZGxlci50cyIsImNvbGxhZ2UvY29udHJvbHMvS2V5Ym9hcmRIYW5kbGVycy50cyIsImNvbGxhZ2UvZnVuL3RyYW5zZm9ybS50cyIsImNvbGxhZ2UvZnVuL2Jib3gudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0RyYWdBbmREcm9wLnRzIiwiY29sbGFnZS9tb2RlbHMvQmVoYXZpb3IudHMiLCJjb2xsYWdlL2NvbnRyb2xzL1JlcGwudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hlbHAudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1NwbGl0Q29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQXNwZWN0UmF0aW9Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Cb3JkZXJDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTdHlsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvZ2V0Rm9jdXNQYW5lbHMudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Hb3RvQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvVGV4dENvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1BhZENvbW1hbmQudHMiLCJjb2xsYWdlL2Z1bi9pc1Zpc2libGUudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9UcmFuc2xhdGVDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NYXJnaW5Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NZXJnZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hpUmVzQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvTW92ZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0NoYW5nZVJvdGF0aW9uQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlUG9zaXRpb25Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9TdG9wQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvRXNjYXBlQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlUGhvdG9BUEkudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3RvU2lnbmluLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlQWxidW0udHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3Rvcy50cyIsImNvbGxhZ2UvY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmQudHMiLCJjb2xsYWdlL2JlaGF2aW9yL011bHRpU2VsZWN0b3IudHMiLCJjb2xsYWdlL2JlaGF2aW9yL05vdGlmaWNhdGlvbkJlaGF2aW9yLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0Nyb3BUb1N0YXRlLnRzIiwiY29sbGFnZS9nbG9iYWxzLnRzIiwiY29sbGFnZS9mdW4vc3RhcnQudHMiLCJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNDQTs7T0FFRztJQUNILE1BQWEsUUFBUTtRQUluQjtZQUZBLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFDeEIsY0FBUyxHQUFZLElBQUksQ0FBQztZQWtDbEIsZUFBVSxHQUdILEVBQUUsQ0FBQztZQW5DaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFVLE1BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLENBQUM7WUFDbEUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNuQyxXQUFXLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUNuQyxXQUFXLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUMvQixXQUFXLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUMzQixXQUFXLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUNoQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixJQUFJLElBQUksQ0FBQyxTQUFTO29CQUNoQixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMs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QUFDLGVBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDN0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksNkNBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksNkNBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDNUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksNkNBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUUzRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx3Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzlHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHdDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzlHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHdDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzdHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHdDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFFNUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3pHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUgsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0gsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0gsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFNUgsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDNUgsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtC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LENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JFLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDM0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdEQ7Z0JBQ0QsdUJBQXVCO2dCQUN2Qix3QkFBd0I7Z0JBQ3hCLHVCQUF1QjtZQUMzQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDWjtJQUNMLENBQUM7SUFFRCxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBPbmUgYmlnIGhhcHB5IGZhbWlseSBvZiBjbGFzc2VzIHRvIGF2b2lkIGxvYWRpbmdcclxuICogYW5kIGNvbmNhdGluYXRpb25cclxuICovXHJcbi8qKiBJbnRlcmZhY2VzICAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIERpY3Rpb25hcnk8VD4ge1xyXG4gIFtLZXk6IHN0cmluZ106IFQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gXCIuLi9tb2RlbHMvRGljdGlvbmFyeVwiO1xyXG4vKipcclxuICogR29vZ2xlIHNwZWVjaCByZWNvZ25pdGlvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExpc3RlbmVyIHtcclxuICByZWNvZ25pdGlvbjogU3BlZWNoUmVjb2duaXRpb247XHJcbiAgc3RvcHBlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgYXV0b3N0YXJ0OiBib29sZWFuID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucmVjb2duaXRpb24gPSBuZXcgKDxhbnk+d2luZG93KVtcIndlYmtpdFNwZWVjaFJlY29nbml0aW9uXCJdKCk7XHJcbiAgICBsZXQgcmVjb2duaXRpb24gPSB0aGlzLnJlY29nbml0aW9uO1xyXG4gICAgcmVjb2duaXRpb24uaW50ZXJpbVJlc3VsdHMgPSBmYWxzZTtcclxuICAgIHJlY29nbml0aW9uLmNvbnRpbnVvdXMgPSBmYWxzZTtcclxuICAgIHJlY29nbml0aW9uLmxhbmcgPSBcImVuLVBIXCI7XHJcbiAgICByZWNvZ25pdGlvbi5tYXhBbHRlcm5hdGl2ZXMgPSA1O1xyXG4gICAgcmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcInN0YXJ0XCIsIGUgPT4ge1xyXG4gICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImVuZFwiLCBlID0+IHtcclxuICAgICAgdGhpcy5zdG9wcGVkID0gZmFsc2U7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9zdGFydClcclxuICAgICAgICByZWNvZ25pdGlvbi5zdGFydCgpO1xyXG4gICAgfSk7XHJcbiAgICByZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKFwicmVzdWx0XCIsIGUgPT4ge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGUucmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBlLnJlc3VsdHNbaV07XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0ZpbmFsKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNjcmlwdCA9IHJlc3VsdFtqXS50cmFuc2NyaXB0O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0cmFuc2NyaXB0LCByZXN1bHRbal0pO1xyXG4gICAgICAgICAgICBsZXQgY29uZmlkZW5jZSA9IHJlc3VsdFtqXS5jb25maWRlbmNlO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJzcGVlY2gtZGV0ZWN0ZWRcIiwge1xyXG4gICAgICAgICAgICAgIHJlc3VsdDogdHJhbnNjcmlwdCxcclxuICAgICAgICAgICAgICBwb3dlcjogY29uZmlkZW5jZSAqIDEwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NhbGxiYWNrczogRGljdGlvbmFyeTxBcnJheTwodmFsdWU6IHtcclxuICAgIHJlc3VsdDogc3RyaW5nO1xyXG4gICAgcG93ZXI6IG51bWJlcjtcclxuICB9KSA9PiB2b2lkPj4gPSB7fTtcclxuICBwcml2YXRlIGNhbGxiYWNrcyh0b3BpYzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW3RvcGljXSA9IHRoaXMuX2NhbGxiYWNrc1t0b3BpY10gPz8gW107XHJcbiAgfVxyXG4gIG9uKHRvcGljOiBzdHJpbmcsIGNiOiAodmFsdWU6IHtcclxuICAgIHJlc3VsdDogc3RyaW5nO1xyXG4gICAgcG93ZXI6IG51bWJlcjtcclxuICB9KSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLmNhbGxiYWNrcyh0b3BpYykucHVzaChjYik7XHJcbiAgfVxyXG4gIHRyaWdnZXIodG9waWM6IHN0cmluZywgdmFsdWU6IHtcclxuICAgIHJlc3VsdDogc3RyaW5nO1xyXG4gICAgcG93ZXI6IG51bWJlcjtcclxuICB9KSB7XHJcbiAgICB0aGlzLmNhbGxiYWNrcyh0b3BpYykuZm9yRWFjaChjYiA9PiBjYih2YWx1ZSkpO1xyXG4gIH1cclxuICBsaXN0ZW4oKSB7XHJcbiAgICBpZiAodGhpcy5zdG9wcGVkKVxyXG4gICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0KCk7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IG1lc3NhZ2VEdXJhdGlvbiA9IDUwMDA7XHJcbmNvbnN0IGZhZGVEZWxheSA9IDE1MDA7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmYWRlT3V0KG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGdvb2QsIGJhZCkgPT4ge1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChcImZhZGUtb3V0XCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZ29vZChub2RlKSwgZmFkZURlbGF5KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG9hc3RlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFyZ2V0OiBIVE1MRWxlbWVudCkgeyBcclxuICAgICAgICBBcnJheS5mcm9tKHRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvYXN0XCIpKS5tYXAodCA9PiB0aGlzLmRlc3Ryb3lUb2FzdCh0IGFzIEhUTUxFbGVtZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImZhZGUtb3V0XCIpO1xyXG4gICAgICAgIGxldCB0b2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdG9hc3QuY2xhc3NMaXN0LmFkZChcInRvYXN0XCIpO1xyXG4gICAgICAgIHRvYXN0LmlubmVyVGV4dCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuaW5zZXJ0QmVmb3JlKHRvYXN0LCB0aGlzLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRlc3Ryb3lUb2FzdCh0b2FzdCksIG1lc3NhZ2VEdXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGVzdHJveVRvYXN0KHRvYXN0OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGF3YWl0IGZhZGVPdXQodG9hc3QpO1xyXG4gICAgICAgIHRvYXN0LnJlbW92ZSgpO1xyXG4gICAgICAgIGlmICghdGhpcy50YXJnZXQucXVlcnlTZWxlY3RvcihcIi50b2FzdFwiKSkgZmFkZU91dCh0aGlzLnRhcmdldCk7XHJcbiAgICB9XHJcbn0iLCIvKiogR2xvYmFsIEZ1bmN0aW9ucyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGFpbCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgbGV0IGxpc3QgPSB2YWx1ZS5zcGxpdChcIiBcIik7XHJcbiAgbGlzdC5zaGlmdCgpO1xyXG4gIHJldHVybiBsaXN0LmpvaW4oXCIgXCIpO1xyXG59XHJcbiIsIi8qKiBHbG9iYWwgQ2xhc3NlcyAqL1xyXG4vKipcclxuICogVHJ5IHRvIHR1cm4gYSBzcG9rZW4gcGhyYXNlIGludG8gYSBjb21tYW5kIGdyYW1tYXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21tYW5kUGFyc2VyIHtcclxuICBwYXJzZVBocmFzZShwaHJhc2U6IHN0cmluZykge1xyXG4gICAgcGhyYXNlID0gcGhyYXNlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgbWFwID0gPGFueT57XHJcbiAgICAgIFwiem9vbSBpblwiOiBcInpvb21cIixcclxuICAgICAgXCJ6b29tIG91dFwiOiBcInpvb21cIixcclxuICAgICAgXCJkcmFnXCI6IFwicGFuXCIsXHJcbiAgICAgIFwibnVtYmVyIGZvclwiOiBcIjRcIixcclxuICAgICAgXCJudW1iZXJcIjogXCJcIixcclxuICAgICAgXCJmcmFtZVwiOiBcIlwiLFxyXG4gICAgICBcInBob3RvXCI6IFwiXCIsXHJcbiAgICAgIFwib25lXCI6IFwiMVwiLFxyXG4gICAgICBcInR3b1wiOiBcIjJcIixcclxuICAgICAgXCJ0aHJlZVwiOiBcIjNcIixcclxuICAgICAgXCJmb3VyXCI6IFwiNFwiLFxyXG4gICAgICBcImZpdmVcIjogXCI1XCIsXHJcbiAgICAgIFwic2l4XCI6IFwiNlwiLFxyXG4gICAgICBcInNldmVuXCI6IFwiN1wiLFxyXG4gICAgICBcImVpZ2h0XCI6IFwiOFwiLFxyXG4gICAgICBcIm5pbmVcIjogXCI5XCIsXHJcbiAgICAgIFwiaW50b1wiOiBcIlwiLFxyXG4gICAgICBcIm9uXCI6IFwiXCIsXHJcbiAgICAgIFwiYW5kXCI6IFwiXCIsXHJcbiAgICAgIFwicGljdHVyZVwiOiBcIlwiLFxyXG4gICAgICBcImdvIHRvXCI6IFwiZ290b1wiLFxyXG4gICAgICBcIi1cIjogXCIgXCIsXHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKHYgPT4gcGhyYXNlID0gcGhyYXNlLnJlcGxhY2UodiwgbWFwW3ZdKSk7XHJcbiAgICBsZXQgdG9rZW5zID0gcGhyYXNlLnNwbGl0KFwiIFwiKTtcclxuICAgIHRva2VucyA9IHRva2Vucy5tYXAodiA9PiBtYXBbdl0gPz8gdikuZmlsdGVyKHYgPT4gISF2KTtcclxuICAgIHJldHVybiB0b2tlbnMuam9pbihcIiBcIik7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBLZWVwcyB0aGUgZ29vZ2xlIG1lZGlhIGluZm8gYW5kIGhhcyBoZWxwZXIgZnVuY3Rpb25zXHJcbiAqIHRvIHVwZ3JhZGUgdGhlIGxvLXJlcyB0byBoaS1yZXMgdmVyc2lvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbGxhZ2VQaG90bzxUTWVkaWFJbmZvPiB7XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBHb29nbGVNZWRpYUl0ZW0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBwcm9kdWN0VXJsOiBzdHJpbmc7XHJcbiAgYmFzZVVybDogc3RyaW5nO1xyXG4gIG1pbWVUeXBlOiBzdHJpbmc7XHJcbiAgbWVkaWFNZXRhZGF0YTogYW55O1xyXG4gIGNvbnRyaWJ1dG9ySW5mbzogYW55O1xyXG4gIGZpbGVuYW1lOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29sbGFnZVBob3RvIH0gZnJvbSBcIi4vQ29sbGFnZVBob3RvXCI7XHJcbmltcG9ydCB7IEdvb2dsZU1lZGlhSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlTWVkaWFJdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR29vZ2xlQ29sbGFnZVBob3RvIGV4dGVuZHMgQ29sbGFnZVBob3RvPEdvb2dsZU1lZGlhSXRlbT4ge1xyXG4gIHB1YmxpYyBpbWc6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVkaWFJbmZvOiBHb29nbGVNZWRpYUl0ZW0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBsZXQgaW1nID0gdGhpcy5pbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdcIik7XHJcbiAgICBpbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3RoaXMubWVkaWFJbmZvLmJhc2VVcmx9KWA7XHJcbiAgICBpbWcudGl0bGUgPSBtZWRpYUluZm8uZmlsZW5hbWU7XHJcbiAgfVxyXG4gIFxyXG4gIHJlbmRlckludG8odGFyZ2V0OiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuaW1nKTtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIG5ldyBHb29nbGVDb2xsYWdlUGhvdG8oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1lZGlhSW5mbykpKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIE1hbmFnZXMgaW1hZ2Ugc3R5bGUudHJhbnNmb3JtIGJ5IHBlcnNpc3RpbmdcclxuICogdGhlIHNjYWxlIGFuZCByb3RhdGlvbiB0byBmYWNpbGl0YXRlIGNvbXB1dGluZyB0cmFuc2Zvcm1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3ByaXRlIHtcclxuICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgcHVibGljIHI6IG51bWJlcjtcclxuICBwdWJsaWMgczogbnVtYmVyO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgdGhpcy54ID0gdGhpcy55ID0gdGhpcy5yID0gMDtcclxuICAgIHRoaXMucyA9IDE7XHJcbiAgfVxyXG4gIHRyYW5zZm9ybShhcmdzOiB7XHJcbiAgICBkeD86IG51bWJlcjtcclxuICAgIGR5PzogbnVtYmVyO1xyXG4gICAgc2NhbGU/OiBudW1iZXI7XHJcbiAgICBhbmdsZT86IG51bWJlcjtcclxuICB9KSB7XHJcbiAgICB0aGlzLnggKz0gKGFyZ3MuZHggfHwgMCk7XHJcbiAgICB0aGlzLnkgKz0gKGFyZ3MuZHkgfHwgMCk7XHJcbiAgICB0aGlzLnIgKz0gKGFyZ3MuYW5nbGUgfHwgMCk7XHJcbiAgICB0aGlzLnMgKj0gKGFyZ3Muc2NhbGUgfHwgMS4wKTtcclxuICAgIHRoaXMuaW1hZ2Uuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMueH1weCwke3RoaXMueX1weCkgcm90YXRlKCR7dGhpcy5yfWRlZykgc2NhbGUoJHt0aGlzLnN9KWA7XHJcbiAgfVxyXG4gIHRyYW5zbGF0ZShkeDogbnVtYmVyLCBkeTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyBkeCwgZHkgfSk7XHJcbiAgfVxyXG4gIHJvdGF0ZShhbmdsZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyBhbmdsZSB9KTtcclxuICB9XHJcbiAgc2NhbGUoc2NhbGU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgc2NhbGUgfSk7XHJcbiAgfVxyXG4gIC8vIG1vZGlmeSB0aGUgcGl4ZWwgZGVuc2l0eSBvZiB0aGUgaW1hZ2VcclxuICAvLyB1c2VmdWwgd2hlbiB1c2luZyBnb29nbGUgcGhvdG9zIEFQSSB0byBcclxuICAvLyByZXF1ZXN0IGhpZ2hlciByZXNvbHV0aW9uIHBob3Rvc1xyXG4gIHVwc2NhbGUoc2NhbGU6IG51bWJlcikge1xyXG4gICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmltYWdlKTtcclxuICAgIGxldCB3aWR0aCA9IHBhcnNlRmxvYXQoc3R5bGUud2lkdGgpO1xyXG4gICAgbGV0IGhlaWdodCA9IHBhcnNlRmxvYXQoc3R5bGUuaGVpZ2h0KTtcclxuICAgIHRoaXMuc2NhbGUoMSAvIHNjYWxlKTtcclxuICAgIHRoaXMuaW1hZ2Uuc3R5bGUud2lkdGggPSBzY2FsZSAqIHdpZHRoICsgXCJweFwiO1xyXG4gICAgdGhpcy5pbWFnZS5zdHlsZS5oZWlnaHQgPSBzY2FsZSAqIGhlaWdodCArIFwicHhcIjtcclxuICAgIHRoaXMudHJhbnNsYXRlKHdpZHRoIC8gMiAtIHdpZHRoICogc2NhbGUgLyAyLCBoZWlnaHQgLyAyIC0gaGVpZ2h0ICogc2NhbGUgLyAyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgR29vZ2xlQ29sbGFnZVBob3RvIH0gZnJvbSBcIi4vR29vZ2xlQ29sbGFnZVBob3RvXCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSBcIi4uL2dsb2JhbHNcIjtcclxuXHJcbmNvbnN0IHVuaXRzID0gXCJweCBlbVwiLnNwbGl0KFwiIFwiKTtcclxuXHJcbmZ1bmN0aW9uIGhhc1VuaXRzKHZhbHVlOiBzdHJpbmcpIHtcclxuICByZXR1cm4gdW5pdHMuc29tZSh2ID0+IHZhbHVlLmVuZHNXaXRoKHYpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgYSBzaW5nbGUgaW1hZ2Ugb24gdGhlIGNvbGxhZ2UsXHJcbiAqIG5vdCB0byBiZSBjb25mdXNlZCB3aXRoIGFuIFBob3RvIG9uIHRoZSBhbGJ1bVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbGxhZ2VQYW5lbCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcGFuZWwgY29udGFpbnMgYSBzaW5nbGUgcGhvdG8gKHRoaXMgb25lKVxyXG4gICAqL1xyXG4gIHB1YmxpYyBwaG90bzogR29vZ2xlQ29sbGFnZVBob3RvIHwgbnVsbDtcclxuXHJcbiAgLy8gdGhlIGFjdHVhbCBpbWFnZSByZW5kZXJlZCBvbiB0aGUgcGFuZWxcclxuICBwdWJsaWMgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgcHVibGljIHNwcml0ZTogU3ByaXRlO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYW5lbCBkb20gZWxlbWVudCB0byBjb250cm9sXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocHVibGljIHBhbmVsOiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgdGhpcy5waG90byA9IG51bGw7XHJcbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgIHRoaXMuc3ByaXRlID0gbmV3IFNwcml0ZSh0aGlzLmltYWdlKTtcclxuICAgIHRoaXMuaW1hZ2UuY2xhc3NMaXN0LmFkZChcImltZ1wiKTtcclxuICAgIHRoaXMuaW1hZ2UuZHJhZ2dhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuaW1hZ2UpO1xyXG4gICAgdGhpcy5hc1BhbmVsKHRoaXMucGFuZWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHBob3RvIHJlbmRlcnMgdGhpcyBwaG90byBvbnRvIHRoZSBwYW5lbFxyXG4gICAqL1xyXG4gIGFkZFBob3RvKHBob3RvOiBHb29nbGVDb2xsYWdlUGhvdG8pIHtcclxuICAgIHRoaXMucGhvdG8gPSBwaG90bztcclxuICAgIHRoaXMuc2V0QmFja2dyb3VuZEltYWdlKHBob3RvLm1lZGlhSW5mby5iYXNlVXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbXB1dGVzIHRoZSB3aWR0aCBvZiB0aGUgcGhvdG8gZGlzcGxheSBhcmVhXHJcbiAgICovXHJcbiAgZ2V0IHBob3RvV2lkdGgoKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5pbWFnZSkud2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29tcHV0ZXMgdGhlIGhlaWdodCBvZiB0aGUgcGhvdG8gZGlzcGxheSBhcmVhXHJcbiAgICovXHJcbiAgZ2V0IHBob3RvSGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuaW1hZ2UpLmhlaWdodCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb21wdXRlcyB0aGUgc2NhbGUgb2YgdGhlIHBob3RvLCBhc3N1bWVzIGFzcGVjdCByYXRpbyBpcyBwcmVzZXJ2ZWQgKGF0IGxlYXN0IHRoZSB3aWR0aCBvciBoZWlnaHQgaXMgJ2F1dG8nKVxyXG4gICAqL1xyXG4gIGdldCBwaG90b1NjYWxlKCkge1xyXG4gICAgbGV0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5pbWFnZSk7XHJcbiAgICBsZXQgc2NhbGUgPSBzdHlsZS5oZWlnaHQ7XHJcbiAgICBpZiAoc2NhbGUgPT09IFwiYXV0b1wiKSByZXR1cm4gMS4wO1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc2NhbGUpIC8gMTAwLjA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm4gdGhlIHBhbmVsIG92ZXJsYXkgKGRvZXMgbm90IGJlbG9uZyBoZXJlKVxyXG4gICAqL1xyXG4gIGdldCBvdmVybGF5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFuZWwucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0ZXh0IGFzIGFuIGlucHV0IGNvbnRyb2wgb24gdGhlIHBhbmVsXHJcbiAgICogTGFiZWwgaXMgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGFuZCBjYW4gbW92ZSBvdXRzaWRlIHRoZSBib3VuZHMgb2YgdGhpcyBwYW5lbFxyXG4gICAqIHNvIHByb2JhYmx5IGRvZXNuJ3QgYmVsb25nIGhlcmVcclxuICAgKi9cclxuICBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbiAgICBsYWJlbC5yZWFkT25seSA9IHRydWU7XHJcbiAgICBsYWJlbC50aXRsZSA9IFwiMVwiO1xyXG4gICAgbGFiZWwuc3R5bGUudG9wID0gbGFiZWwuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG4gICAgbGFiZWwuY2xhc3NMaXN0LmFkZChcImxhYmVsXCIpO1xyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICBsYWJlbC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgZ2xvYmFscy5kbmQubW92ZWFibGUobGFiZWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBwYW5lbCBmcm9tIHRoZSBkb21cclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5wYW5lbC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gYmFja2dyb3VuZEltYWdlIHRoZSB1cmwgb2YgdGhlIGltYWdlIHRvIGRpc3BsYXkgaW4gdGhpcyBwYW5lbFxyXG4gKi9cclxuICBzZXRCYWNrZ3JvdW5kSW1hZ2UoYmFja2dyb3VuZEltYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuaW1hZ2Uuc3JjID0gYmFja2dyb3VuZEltYWdlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3R5bGUgdGhlIGZyYW1lXHJcbiAgICogQHBhcmFtIHdpZHRoIGJvcmRlciB3aWR0aCBpbiBcImVtXCJcclxuICAgKi9cclxuICBib3JkZXIod2lkdGg6IHN0cmluZywgY29sb3IgPSBcIndoaXRlXCIpIHtcclxuICAgIGNvbnN0IHVuaXRzID0gaGFzVW5pdHMod2lkdGgpID8gXCJcIiA6IFwiZW1cIjtcclxuICAgIHRoaXMucGFuZWwuc3R5bGUuYm9yZGVyID0gYCR7d2lkdGh9JHt1bml0c30gc29saWQgJHtjb2xvcn1gO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBSb3RhdGUgdGhlIGFjdHVhbCBmcmFtZVxyXG4gICogQHBhcmFtIGFuZ2xlIGFuZ2xlIGluIGRlZ3JlZXNcclxuICAqL1xyXG4gIHJvdGF0ZUZyYW1lKGFuZ2xlOiBzdHJpbmcpIHtcclxuICAgIGxldCBub2RlID0gdGhpcy5wYW5lbDtcclxuICAgIGlmICghbm9kZSlcclxuICAgICAgcmV0dXJuO1xyXG4gICAgaWYgKCEhYW5nbGUpIHtcclxuICAgICAgdGhpcy50cmFuc2Zvcm1fbm9kZShgcm90YXRlKCR7YW5nbGV9ZGVnKWApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBhbmdsZSA9IDA7XHJcbiAgICAgIGxldCB0cmFuc2Zvcm0gPSBub2RlLnN0eWxlLnRyYW5zZm9ybTtcclxuICAgICAgbGV0IGFuaW1hdGlvbnMgPSBnbG9iYWxzLnJlcGwuYW5pbWF0aW9ucztcclxuICAgICAgYW5pbWF0aW9ucy5hbmltYXRlKFwicm90YXRlXCIsICgpID0+IHtcclxuICAgICAgICBhbmdsZSArPSAxO1xyXG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtICsgYCByb3RhdGUoJHthbmdsZX1kZWcpYDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzY2FsZUZyYW1lKHNjYWxlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudHJhbnNmb3JtX25vZGUoYHNjYWxlKCR7c2NhbGV9LCAke3NjYWxlfSlgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmb3JtX25vZGUodjogc3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IHRoaXMucGFuZWw7XHJcbiAgICBsZXQgdHJhbnNmb3JtID0gKG5vZGUuc3R5bGUudHJhbnNmb3JtIHx8IFwiXCIpLnNwbGl0KFwiIFwiKTtcclxuICAgIHRyYW5zZm9ybS51bnNoaWZ0KHYpO1xyXG4gICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm0uam9pbihcIiBcIik7XHJcbiAgfVxyXG4gIHByaXZhdGUgYXNQYW5lbChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGFuZWxcIik7XHJcbiAgICBlbGVtZW50LnRhYkluZGV4ID0gMTtcclxuICAgIGxldCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm92ZXJsYXlcIik7XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIHJ1bnMgYW4gYW5pbWF0aW9uIG9uIGFuIGludGVydmFsLCByZXR1cm5zIHN0b3AoKVxyXG4gKiBVc2VkIGZvciBwYW5uaW5nLCB6b29taW5nLCByb3RhdGluZ1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbnMge1xyXG4gIGFuaW1hdGlvbnM6IEFycmF5PHtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIGhhbmRsZTogbnVtYmVyO1xyXG4gIH0+ID0gW107XHJcbiAgXHJcbiAgc3RvcCh0eXBlOiBzdHJpbmcpIHtcclxuICAgIGxldCBhbmltYXRpb25zID0gdGhpcy5hbmltYXRpb25zLm1hcCh2ID0+IHYpOyAvL2Nsb25lXHJcbiAgICBhbmltYXRpb25zLmZvckVhY2goKHYsIGkpID0+IHtcclxuICAgICAgaWYgKCF0eXBlIHx8IHYudHlwZSA9PT0gdHlwZSkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodi5oYW5kbGUpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYW5pbWF0ZSh0eXBlOiBzdHJpbmcsIGNiOiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLmFuaW1hdGlvbnMucHVzaCh7IHR5cGUsIGhhbmRsZTogc2V0SW50ZXJ2YWwoY2IsIDEwMCkgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZCB7XHJcbiAgYWJvdXQ/KCk6IHN0cmluZztcclxuICAvLyByZXR1cm4gZmFsc2UgdG8gc2lnbmFsIHRoZSBjb21tYW5kIHdhcyBub3QgaGFuZGxlZFxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB8IFByb21pc2U8dm9pZCB8IGZhbHNlPjtcclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gXCIuLi9tb2RlbHMvRGljdGlvbmFyeVwiO1xyXG5cclxuLyoqXHJcbiAqIEtlZXBzIGhhc2ggb2YgY29tbWFuZHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21tYW5kcyB7XHJcbiAgICBuYW1lT2YoY29tbWFuZDogQ29tbWFuZCkge1xyXG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jb21tYW5kcyk7XHJcbiAgICAgIGNvbnN0IGkgPSBrZXlzLmZpbmRJbmRleChrID0+IHRoaXMuY29tbWFuZHNba10uZXhlY3V0ZSA9PT0gY29tbWFuZC5leGVjdXRlKTtcclxuICAgICAgcmV0dXJuIC0xPGkgPyBrZXlzW2ldOm51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21tYW5kczogRGljdGlvbmFyeTxDb21tYW5kPiA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgdGhlIGNvbW1hbmQgYXNzb2NpYXRlZCB3aXRoIHRoZSBhY3Rpb24ga2V5d29yZFxyXG4gICAgICogQHBhcmFtIHZlcmIgdGhlIGZ1bGwgbmFtZSBvZiB0aGUgYWN0aW9uIGtleXdvcmQgb3IgYSBwYXJ0aWFsIG1hdGNoXHJcbiAgICAgKi9cclxuICAgIGdldCh2ZXJiOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb21tYW5kc1t2ZXJiXSkgcmV0dXJuIHRoaXMuY29tbWFuZHNbdmVyYl07XHJcbiAgICAgICAgdmFyIGtleSA9IE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpLmZpbmQodiA9PiB2LnN0YXJ0c1dpdGgodmVyYikpO1xyXG4gICAgICAgIHJldHVybiBrZXkgJiYgdGhpcy5jb21tYW5kc1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcy9yZXBsYWNlcyBjb21tYW5kIGFzc29jaWF0ZWQgd2l0aCBhbiBhY3Rpb24ga2V5d29yZFxyXG4gICAgICogQHBhcmFtIGNvbW1hbmQgY29tbWFuZCB0byBwcm9jZXNzIHRoZSBhY3Rpb25cclxuICAgICAqIEBwYXJhbSB2ZXJiIGFjdGlvbiB0byBhc3NvY2lhdGUgd2l0aCBhIGNvbW1hbmRcclxuICAgICAqL1xyXG4gICAgYWRkKGNvbW1hbmQ6IENvbW1hbmQsIHZlcmI6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY29tbWFuZHNbdmVyYl0gPSBjb21tYW5kO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3QoKSB7XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZU92ZXJsYXkoKSB7XHJcbiAgbGV0IGFjdGl2ZVBhbmVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICBpZiAoIWFjdGl2ZVBhbmVsKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm5vIGFjdGl2ZSBwYW5lbFwiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgcmV0dXJuIGFjdGl2ZVBhbmVsLnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKSBhcyBIVE1MRWxlbWVudDtcclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEtleWJvYXJkSGFuZGxlciB7XHJcbiAgYWx0S2V5OiBib29sZWFuO1xyXG4gIHNoaWZ0S2V5OiBib29sZWFuO1xyXG4gIGN0cmxLZXk6IGJvb2xlYW47XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgYWJvdXQ/OiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZEhhbmRsZXIgfSBmcm9tIFwiLi4vbW9kZWxzL0tleWJvYXJkSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEtleWJvYXJkSGFuZGxlcnMge1xyXG4gIHByaXZhdGUga2V5Ym9hcmRIYW5kbGVyczogQXJyYXk8e21hdGNoOiBLZXlib2FyZEhhbmRsZXI7IGNvbW1hbmQ6IENvbW1hbmR9PiA9IFtdO1xyXG5cclxuICBnZXRFdmVudEhhbmRsZXJzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICByZXR1cm4gdGhpcy5rZXlib2FyZEhhbmRsZXJzLmZpbHRlcihoYW5kbGVyID0+IHtcclxuICAgICAgbGV0IG1hdGNoID0gaGFuZGxlci5tYXRjaDtcclxuICAgICAgaWYgKGV2ZW50LmFsdEtleSAhPT0gbWF0Y2guYWx0S2V5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChldmVudC5zaGlmdEtleSAhPT0gbWF0Y2guc2hpZnRLZXkpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgIT09IG1hdGNoLmN0cmxLZXkpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCEhbWF0Y2gua2V5ICYmIGV2ZW50LmtleSAhPT0gbWF0Y2gua2V5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRFdmVudEhhbmRsZXIoY29tbWFuZDogQ29tbWFuZCwgbWF0Y2g6IFBhcnRpYWw8S2V5Ym9hcmRIYW5kbGVyPikge1xyXG4gICAgbGV0IGZ1bGxNYXRjaDogS2V5Ym9hcmRIYW5kbGVyID0ge1xyXG4gICAgICBhbHRLZXk6IG1hdGNoLmFsdEtleSA/PyBmYWxzZSxcclxuICAgICAgY3RybEtleTogbWF0Y2guY3RybEtleSA/PyBmYWxzZSxcclxuICAgICAgc2hpZnRLZXk6IG1hdGNoLnNoaWZ0S2V5ID8/IGZhbHNlLFxyXG4gICAgICBrZXk6IG1hdGNoLmtleSA/PyBcIlwiLFxyXG4gICAgICBhYm91dDogbWF0Y2guYWJvdXQgfHwgY29tbWFuZC5hYm91dCAmJiBjb21tYW5kLmFib3V0KClcclxuICAgIH07XHJcbiAgICB0aGlzLmtleWJvYXJkSGFuZGxlcnMucHVzaCh7bWF0Y2g6IGZ1bGxNYXRjaCwgY29tbWFuZH0pO1xyXG4gIH1cclxuXHJcbiAgbGlzdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmtleWJvYXJkSGFuZGxlcnMubWFwKGggPT4gKHtcclxuICAgICAgY29tbWFuZDpoLmNvbW1hbmQsXHJcbiAgICAgIGtleTogdGhpcy5rZXlzQXNTdHJpbmcoaC5tYXRjaCksXHJcbiAgICAgIGFib3V0OiBoLm1hdGNoLmFib3V0LFxyXG4gICAgfSkpO1xyXG4gIH1cclxuXHJcbiAga2V5c0FzU3RyaW5nKG1hdGNoOiBLZXlib2FyZEhhbmRsZXIpIHtcclxuICAgbGV0IHJlc3VsdCA9IG1hdGNoLmtleTtcclxuICAgc3dpdGNoIChyZXN1bHQpe1xyXG4gICAgIGNhc2UgXCIgXCI6IHJlc3VsdCA9IFwic3BhY2VcIjsgYnJlYWs7XHJcbiAgIH1cclxuICAgaWYgKG1hdGNoLmN0cmxLZXkpIHJlc3VsdCA9IFwiY3RybCArIFwiK3Jlc3VsdDtcclxuICAgaWYgKG1hdGNoLmFsdEtleSkgcmVzdWx0ID0gXCJhbHQgKyBcIityZXN1bHQ7XHJcbiAgIGlmIChtYXRjaC5zaGlmdEtleSkgcmVzdWx0ID0gXCJzaGlmdCArIFwiK3Jlc3VsdDtcclxuICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIiwiXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm0obm9kZTogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHtcclxuICBsZXQgdCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLnRyYW5zZm9ybTtcclxuICB0ID0gKHQgPT09IFwibm9uZVwiKSA/IFwiXCIgOiB0ICsgXCIgXCI7XHJcbiAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSB0ICsgdmFsdWU7XHJcbn1cclxuXHJcbiIsImV4cG9ydCBmdW5jdGlvbiBiYm94KG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcbiAgICByZXR1cm4geyB0b3A6IHBhcnNlRmxvYXQodG9wKSwgbGVmdDogcGFyc2VGbG9hdChsZWZ0KSwgd2lkdGg6IHBhcnNlRmxvYXQod2lkdGgpLCBoZWlnaHQ6IHBhcnNlRmxvYXQoaGVpZ2h0KSB9O1xyXG59XHJcbiIsImltcG9ydCB7IGdldEFjdGl2ZU92ZXJsYXkgfSBmcm9tIFwiLi4vZnVuL2dldEFjdGl2ZU92ZXJsYXlcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4vQ29sbGFnZVBhbmVsXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi9SZXBsXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkSGFuZGxlcnMgfSBmcm9tIFwiLi9LZXlib2FyZEhhbmRsZXJzXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IGJib3ggfSBmcm9tIFwiLi4vZnVuL2Jib3hcIjtcclxuXHJcbi8qKlxyXG4gKiBtYW5hZ2VzIHVzZXIgaW50ZXJhY3Rpb25zIGZvciBrZXlib2FyZCBzaG9ydGN1dHMsIHdoZWVsLCBkcmFnLCBjbGljayBldmVudHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEcmFnQW5kRHJvcCB7XHJcbiAgcHJpdmF0ZSBzb3VyY2U6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZXBsOiBSZXBsLCBwdWJsaWMga2V5ZG93bkhhbmRsZXJzOiBLZXlib2FyZEhhbmRsZXJzKSB7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgbGV0IHNvdXJjZSA9IGdldEFjdGl2ZU92ZXJsYXkoKTtcclxuICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5vIGFjdGl2ZSBvdmVybGF5IGZvdW5kXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICAvLyBUT0RPIHdvdWxkIGJlIG5pY2UgdG8gb25seSBwZXJmb3JtIHdoZW4gbW91c2UgaXMgb3ZlciB0aGUgZWxlbWVudFxyXG4gICAgICAvLyBkb2N1bWVudC5lbGVtZW50c0Zyb21Qb2ludChldmVudC5zY3JlZW5YLCBldmVudC5zY3JlZW5ZKTtcclxuICAgICAgbGV0IGZyb20gPSBzb3VyY2UuaW5uZXJIVE1MO1xyXG4gICAgICAvLyAtMTUwID0+IDAuOSwgMTUwID0+IDEuMSwgc29cclxuICAgICAgbGV0IGRlbHRhID0gMSArIGV2ZW50LmRlbHRhWSAvIDE1MDA7XHJcbiAgICAgIHJlcGwuZXhlY3V0ZUNvbW1hbmQoYHpvb20gJHtmcm9tfSAke2RlbHRhfWApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmtleWRvd25IYW5kbGVycy5nZXRFdmVudEhhbmRsZXJzKGV2ZW50KS5zb21lKGhhbmRsZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZSAhPT0gaGFuZGxlci5jb21tYW5kLmV4ZWN1dGUocmVwbCk7XHJcbiAgICAgIH0pKSB7XHJcbiAgICAgICAgLy8gaGFuZGxlZFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmUgdGhlIGJhY2tncm91bmQgaW1hZ2Ugb24gdGhlIHBhbmVsXHJcbiAgICogQHBhcmFtIHBhbmVsIEludm9rZSBwYW4gb24gdGhlIHBhbmVsIHNvIHRoYXQgaXQgZm9sbG93cyB0aGUgbW91c2VcclxuICAgKi9cclxuICBwYW5hYmxlKHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGxldCBkcmFnZ2FibGUgPSBwYW5lbC5pbWFnZTtcclxuICAgIGxldCBzdGFydFBvc2l0aW9uID0gWzAsIDBdO1xyXG4gICAgZHJhZ2dhYmxlLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2FibGVcIik7XHJcblxyXG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBldmVudCA9PiB7XHJcbiAgICAgIGxldCBsZWZ0ID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUubGVmdCB8fCBcIjBcIik7XHJcbiAgICAgIGxldCB0b3AgPSBwYXJzZUZsb2F0KGRyYWdnYWJsZS5zdHlsZS50b3AgfHwgXCIwXCIpO1xyXG4gICAgICBzdGFydFBvc2l0aW9uID0gW2xlZnQgLSBldmVudC5zY3JlZW5YLCB0b3AgLSBldmVudC5zY3JlZW5ZXTtcclxuICAgICAgZHJhZ2dhYmxlLnNldFBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgcG9pbnRlcm1vdmUpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIGV2ZW50ID0+IHtcclxuICAgICAgZHJhZ2dhYmxlLnJlbGVhc2VQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBkcmFnZ2FibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHBvaW50ZXJtb3ZlKTtcclxuICAgICAgbGV0IGJveCA9IGJib3goZHJhZ2dhYmxlKTtcclxuICAgICAgbGV0IHJlY3QgPSBkcmFnZ2FibGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7ICAgICAgXHJcbiAgICAgIGxldCBzY2FsZSA9IHJlY3Qud2lkdGggLyBib3gud2lkdGg7XHJcbiAgICAgIGRyYWdnYWJsZS5zdHlsZS50b3AgPSBkcmFnZ2FibGUuc3R5bGUubGVmdCA9IFwiMHB4XCI7XHJcbiAgICAgIHRyYW5zZm9ybShkcmFnZ2FibGUsIGB0cmFuc2xhdGUoJHtib3gubGVmdCAvIHNjYWxlfXB4LCAke2JveC50b3AgLyBzY2FsZX1weClgKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgcG9pbnRlcm1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgbGV0IFt4LCB5XSA9IFtzdGFydFBvc2l0aW9uWzBdICsgZXZlbnQuc2NyZWVuWCwgc3RhcnRQb3NpdGlvblsxXSArIGV2ZW50LnNjcmVlblldO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUubGVmdCA9IGAke3h9cHhgO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUudG9wID0gYCR7eX1weGA7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG1vdmVhYmxlKGRyYWdnYWJsZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGxldCBzdGFydFBvc2l0aW9uID0gWzAsIDBdO1xyXG4gICAgZHJhZ2dhYmxlLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2FibGVcIik7XHJcblxyXG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBldmVudCA9PiB7XHJcbiAgICAgIGxldCB0b3AgPSBwYXJzZUZsb2F0KGRyYWdnYWJsZS5zdHlsZS50b3ApO1xyXG4gICAgICBsZXQgbGVmdCA9IHBhcnNlRmxvYXQoZHJhZ2dhYmxlLnN0eWxlLmxlZnQpO1xyXG4gICAgICBzdGFydFBvc2l0aW9uID0gW2xlZnQgLSBldmVudC5zY3JlZW5YLCB0b3AgLSBldmVudC5zY3JlZW5ZXTtcclxuICAgICAgZHJhZ2dhYmxlLnNldFBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgcG9pbnRlcm1vdmUpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIGV2ZW50ID0+IHtcclxuICAgICAgZHJhZ2dhYmxlLnJlbGVhc2VQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBkcmFnZ2FibGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHBvaW50ZXJtb3ZlKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgcG9pbnRlcm1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgbGV0IFtsZWZ0LCB0b3BdID0gW3N0YXJ0UG9zaXRpb25bMF0gKyBldmVudC5zY3JlZW5YLCBzdGFydFBvc2l0aW9uWzFdICsgZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zdHlsZS50b3AgPSB0b3AgKyBcInB4XCI7XHJcbiAgICAgIGRyYWdnYWJsZS5zdHlsZS5sZWZ0ID0gbGVmdCArIFwicHhcIjtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbiBlbGVtZW50IGEgZHJhZyBzb3VyY2VcclxuICAgKiBAcGFyYW0gZGl2IGVsZW1lbnQgdG8gbWFrZSBkcmFnZ2FibGVcclxuICAgKi9cclxuICBkcmFnZ2FibGUoZHJhZ2dhYmxlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgZHJhZ2dhYmxlLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2FibGVcIik7XHJcbiAgICBkcmFnZ2FibGUuZHJhZ2dhYmxlID0gdHJ1ZTtcclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGV2ZW50ID0+IHRoaXMub25kcmFnc3RhcnQoZHJhZ2dhYmxlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYWtlIGFuIGVsZW1lbnQgYSBkcm9wIHRhcmdldFxyXG4gICAqIEBwYXJhbSB0YXJnZXQgZWxlbWVudCB0byBtYWtlIGludG8gYSBkcm9wIHRhcmdldCAoZHJhZ2dhYmxlIGFyZSBkcm9wcGFibGUsIGJhZCBuYW1lKVxyXG4gICAqL1xyXG4gIGRyb3BwYWJsZSh0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuc291cmNlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5vbmRyYWdvdmVyKHRhcmdldCwgdGhpcy5zb3VyY2UpO1xyXG4gICAgfSk7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5zb3VyY2UpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLm9uZHJvcCh0YXJnZXQsIHRoaXMuc291cmNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc291cmNlIGxpc3RlbiBmb3Igd2hlZWwgZXZlbnRzXHJcbiAgICovXHJcbiAgem9vbWFibGUoc291cmNlOiBIVE1MRWxlbWVudCkge1xyXG4gIH1cclxuICBvbmRyYWdzdGFydChzb3VyY2U6IEhUTUxFbGVtZW50KSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICB9XHJcblxyXG4gIG9uZHJhZ292ZXIodGFyZ2V0OiBIVE1MRWxlbWVudCwgc291cmNlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgLy8gbm90aGluZyB0byBkbz9cclxuICB9XHJcblxyXG4gIG9uZHJvcCh0YXJnZXQ6IEhUTUxFbGVtZW50LCBzb3VyY2U6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgZnJvbSA9IHNvdXJjZS5pbm5lckhUTUw7XHJcbiAgICBsZXQgdG8gPSB0YXJnZXQuaW5uZXJIVE1MO1xyXG4gICAgbGV0IGNvbW1hbmQgPSBgbW92ZSAke2Zyb219ICR7dG99YDtcclxuICAgIHRoaXMucmVwbC5leGVjdXRlQ29tbWFuZChjb21tYW5kKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBCZWhhdmlvcjxUPiB7XHJcbiAgZXh0ZW5kKGNvbnRyb2w6IFQpOiB2b2lkO1xyXG59XHJcbiIsImltcG9ydCB7IHRhaWwgfSBmcm9tIFwiLi4vZnVuL3RhaWxcIjtcclxuaW1wb3J0IHsgQ29tbWFuZFBhcnNlciB9IGZyb20gXCIuL0NvbW1hbmRQYXJzZXJcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4vQ29sbGFnZVBhbmVsXCI7XHJcbmltcG9ydCB7IEdvb2dsZUNvbGxhZ2VQaG90byB9IGZyb20gXCIuL0dvb2dsZUNvbGxhZ2VQaG90b1wiO1xyXG5pbXBvcnQgeyBBbmltYXRpb25zIH0gZnJvbSBcIi4vQW5pbWF0aW9uc1wiO1xyXG5pbXBvcnQgeyBDb21tYW5kcyB9IGZyb20gXCIuL0NvbW1hbmRzXCI7XHJcbmltcG9ydCB7IERyYWdBbmREcm9wIH0gZnJvbSBcIi4vRHJhZ0FuZERyb3BcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi4vbW9kZWxzL0JlaGF2aW9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVwbCB7XHJcbiAgLy8gZXh0ZW5zaW9uIHBvaW50IGZvciBiZWhhdmlvcnNcclxuICBub3RpZnkobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIC8vIHB1YmxpYyBzbyBzcGxpdCBjb21tYW5kIGNhbiBvcGVyYXRlIG9uIHRoZW1cclxuICBwdWJsaWMgcGFuZWxzOiBBcnJheTxDb2xsYWdlUGFuZWw+ID0gW107XHJcbiAgLy8gcHVibGljIHNvIG9wZW5BbGJ1bXMgY29tbWFuZCBjYW4gb3BlcmF0aW9uIG9uIHRoZW1cclxuICBwdWJsaWMgcGhvdG9zOiBBcnJheTxHb29nbGVDb2xsYWdlUGhvdG8+ID0gW107XHJcbiAgcHJpdmF0ZSBjb21tYW5kSGlzdG9yeTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHByaXZhdGUgY29tbWFuZEhpc3RvcnlJbmRleCA9IC0xO1xyXG4gIHB1YmxpYyBkbmQ6IERyYWdBbmREcm9wIHwgbnVsbCA9IG51bGw7XHJcbiAgcHVibGljIGFuaW1hdGlvbnMgPSBuZXcgQW5pbWF0aW9ucygpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tbWFuZHM6IENvbW1hbmRzKSB7XHJcbiAgICAvLyBjYW5ub3Qgc2V0IGRuZCBiZWNhdXNlIGRuZCBuZWVkcyByZXBsIChmb3Igbm93KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVzZShiZWhhdmlvcjogQmVoYXZpb3I8UmVwbD4pIHtcclxuICAgIGJlaGF2aW9yLmV4dGVuZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGV2YWwoY29tbWFuZDogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgZXhlY3V0aW5nOiAke2NvbW1hbmR9YCk7XHJcbiAgICBsZXQgW3ZlcmJdID0gY29tbWFuZC5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgaGFuZGxlciA9IHRoaXMuY29tbWFuZHMuZ2V0KHZlcmIpO1xyXG4gICAgaWYgKGhhbmRsZXIpIHtcclxuICAgICAgYXdhaXQgaGFuZGxlci5leGVjdXRlKHRoaXMsIHRhaWwoY29tbWFuZCkpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKHZlcmIpIHtcclxuICAgICAgY2FzZSBcImV4cG9ydFwiOlxyXG4gICAgICAgIGxldCBjYW52YXMgPSBhd2FpdCB0aGlzLmFzQ2FudmFzKCk7XHJcbiAgICAgICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJleHBvcnQtcmVzdWx0XCIpO1xyXG4gICAgICAgIGltZy5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoaW1nLCBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGNyZWF0ZSBhIGNhbnZhcyBvZiB0aGUgZW50aXJlIGNvbGxhZ2VcclxuICBhc3luYyBhc0NhbnZhcygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MQ2FudmFzRWxlbWVudD4oKGdvb2QsIGJhZCkgPT4ge1xyXG4gICAgICBsZXQgaW1hZ2VDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbnZhc1wiKT8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGlmICghaW1hZ2VDYW52YXMpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICBjYW52YXMud2lkdGggPSBpbWFnZUNhbnZhcy53aWR0aDtcclxuICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlQ2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgIGlmICghY3R4KSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICBsZXQgcGFuZWxzID0gdGhpcy5wYW5lbHMuZmlsdGVyKChwKSA9PiAwID09PSBnZXRDb21wdXRlZFN0eWxlKHAucGFuZWwpLmJhY2tncm91bmRJbWFnZS5pbmRleE9mKGB1cmwoXCJgKSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibG9hZGluZ1wiLCBwYW5lbHMubGVuZ3RoKTtcclxuICAgICAgcGFuZWxzLmZvckVhY2goKHApID0+IHtcclxuICAgICAgICBsZXQgcG9zID0gcC5wYW5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSBcImFub255bW91c1wiO1xyXG4gICAgICAgIGltZy53aWR0aCA9IHBvcy53aWR0aDtcclxuICAgICAgICBpbWcuaGVpZ2h0ID0gcG9zLmhlaWdodDtcclxuICAgICAgICBpbWcuc3R5bGUudHJhbnNmb3JtID0gcC5wYW5lbC5zdHlsZS50cmFuc2Zvcm07XHJcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCBwb3MueCwgcG9zLnkpO1xyXG4gICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZGVkOlwiLCBjb3VudCk7XHJcbiAgICAgICAgICBpZiAoY291bnQgPT09IHBhbmVscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZ29vZChjYW52YXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gc3RyaXAgdXJsKFwiXCIpO1xyXG4gICAgICAgIGxldCB1cmwgPSBnZXRDb21wdXRlZFN0eWxlKHAucGFuZWwpLmJhY2tncm91bmRJbWFnZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVybFwiLCB1cmwpO1xyXG4gICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoNSwgdXJsLmxlbmd0aCAtIDIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXJsXCIsIHVybCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENvbGxhZ2VPdmVybGF5cygpIHtcclxuICAgIHJldHVybiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wYW5lbFtkYXRhLWlkXSAub3ZlcmxheWApKSBhcyBIVE1MRWxlbWVudFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGhvdG9PdmVybGF5cygpIHtcclxuICAgIHJldHVybiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5waG90b3MgLmltZyAub3ZlcmxheVtkYXRhLWlkXWApKSBhcyBIVE1MRWxlbWVudFtdO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0KGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdFBhbmVsKGlkKT8ucGFuZWw7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RQYW5lbChpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbHMuZmluZCgocCkgPT4gcC5vdmVybGF5LmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdFBob3RvKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnBob3Rvc1twYXJzZUludChpZCkgLSAxXTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVBhbmVsKHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGxldCBpbmRleCA9IHRoaXMucGFuZWxzLmluZGV4T2YocGFuZWwpO1xyXG4gICAgaWYgKC0xID09PSBpbmRleCkgdGhyb3cgXCJwYW5lbCBub3QgZm91bmRcIjtcclxuICAgIHRoaXMucGFuZWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICBwYW5lbC5wYW5lbC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIHJlaW5kZXgoKSB7XHJcbiAgICB0aGlzLnBhbmVsc1xyXG4gICAgICAuZmlsdGVyKChwKSA9PiAhIXA/LnBhbmVsPy5wYXJlbnRFbGVtZW50KVxyXG4gICAgICAuZm9yRWFjaCgocCwgaSkgPT4gKHAub3ZlcmxheS5kYXRhc2V0LmlkID0gcC5vdmVybGF5LmlubmVyVGV4dCA9IGkgKyAxICsgXCJcIikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB6b29tIGFuZCBkcmFnIGNhcGFiaWxpdGllcyB0byBhIHBhbmVsXHJcbiAgICogQHBhcmFtIHBhbmVsIG1ha2UgdGhpcyBwYW5lbCBpbnRlcmFjdGl2ZVxyXG4gICAqL1xyXG4gIGFkZEJlaGF2aW9ycyhwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgb3ZlcmxheSA9IHBhbmVsLm92ZXJsYXk7XHJcbiAgICBsZXQgZG5kID0gdGhpcy5kbmQ7XHJcbiAgICBpZiAoZG5kKSB7XHJcbiAgICAgIGRuZC56b29tYWJsZShvdmVybGF5KTtcclxuICAgICAgZG5kLmRyYWdnYWJsZShvdmVybGF5KTtcclxuICAgICAgZG5kLnBhbmFibGUocGFuZWwpO1xyXG4gICAgICBkbmQuZHJvcHBhYmxlKG92ZXJsYXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVpbmRleFBob3RvcygpIHtcclxuICAgIHRoaXMucGhvdG9zLmZvckVhY2goKHBob3RvLCBpKSA9PiB7XHJcbiAgICAgIGxldCBwID0gcGhvdG8uaW1nO1xyXG4gICAgICBsZXQgb3ZlcmxheSA9IHAucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBpZiAoIW92ZXJsYXkpIHtcclxuICAgICAgICBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xyXG4gICAgICAgIG92ZXJsYXkuZGF0YXNldC5pZCA9IG92ZXJsYXkuaW5uZXJUZXh0ID0gMSArIGkgKyBcIlwiO1xyXG4gICAgICAgIHAuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgICAgICAgdGhpcy5kbmQ/LmRyYWdnYWJsZShvdmVybGF5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcmlvckNvbW1hbmQoKSB7XHJcbiAgICBpZiAodGhpcy5jb21tYW5kSGlzdG9yeUluZGV4ID4gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb21tYW5kSGlzdG9yeVstLXRoaXMuY29tbWFuZEhpc3RvcnlJbmRleF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcblxyXG4gIG5leHRDb21tYW5kKCkge1xyXG4gICAgaWYgKHRoaXMuY29tbWFuZEhpc3RvcnlJbmRleCA8IHRoaXMuY29tbWFuZEhpc3RvcnkubGVuZ3RoIC0gMSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb21tYW5kSGlzdG9yeVsrK3RoaXMuY29tbWFuZEhpc3RvcnlJbmRleF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcblxyXG4gIGFzeW5jIHN0YXJ0dXAoKSB7XHJcbiAgICBsZXQgY2hpbGRQYW5lbHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGFuZWxcIikpLm1hcCgocCkgPT4gbmV3IENvbGxhZ2VQYW5lbCg8SFRNTERpdkVsZW1lbnQ+cCkpO1xyXG4gICAgY2hpbGRQYW5lbHMuZm9yRWFjaCgoYykgPT4gdGhpcy5hZGRCZWhhdmlvcnMoYykpO1xyXG4gICAgdGhpcy5wYW5lbHMucHVzaCguLi5jaGlsZFBhbmVscyk7XHJcbiAgICBsZXQgY21kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb25zb2xlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBjbWQub25rZXlkb3duID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XHJcbiAgICAgICAgY2FzZSBcIkVudGVyXCI6XHJcbiAgICAgICAgICB0aGlzLmV4ZWN1dGVDb21tYW5kKGNtZC52YWx1ZSk7XHJcbiAgICAgICAgICBjbWQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcclxuICAgICAgICAgIGNtZC52YWx1ZSA9IHRoaXMucHJpb3JDb21tYW5kKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XHJcbiAgICAgICAgICBjbWQudmFsdWUgPSB0aGlzLm5leHRDb21tYW5kKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMucmVpbmRleCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGV4ZWN1dGVDb21tYW5kKGNtZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXggPSB0aGlzLmNvbW1hbmRIaXN0b3J5LnB1c2goY21kKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuZXZhbChjbWQpO1xyXG4gICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgdGhpcy5ub3RpZnkoZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHBhcnNlQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcclxuICAgIGxldCBhaSA9IG5ldyBDb21tYW5kUGFyc2VyKCk7XHJcbiAgICByZXR1cm4gYWkucGFyc2VQaHJhc2UoY29tbWFuZCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSBcIi4uL2dsb2JhbHNcIjtcclxuXHJcbmNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG5mdW5jdGlvbiBlc2NhcGUodmFsdWU6IHN0cmluZykge1xyXG4gIHRleHRhcmVhLmlubmVyVGV4dCA9IHZhbHVlO1xyXG4gIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlbHBDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZykge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWxwXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgaWYgKCF0YXJnZXQpIHRocm93IFwiY2Fubm90IHNob3cgaGVscCB1bmxlc3MgYSBIVE1MU2VsZWN0RWxlbWVudCBpcyBkZWZpbmVkIHdpdGggYSBjbGFzc05hbWUgb2YgJ2hlbHAnXCI7XHJcblxyXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIGNvbnN0IGNvbW1hbmRzID0gZ2xvYmFscy5yZXBsLmNvbW1hbmRzLmxpc3QoKS5tYXAobmFtZSA9PiAoeyBjb21tYW5kOiAoZ2xvYmFscy5yZXBsLmNvbW1hbmRzLmdldChuYW1lKSBhcyBDb21tYW5kKSwgbmFtZSB9KSk7XHJcbiAgICAgIGNvbnN0IGtleWJvYXJkQ29tbWFuZHMgPSBnbG9iYWxzLmtleWJvYXJkSGFuZGxlcnMubGlzdCgpO1xyXG4gICAgICBjb25zdCBtYXJrdXAxID0gY29tbWFuZHMubWFwKGMgPT4gYDxvcHRpb24gdmFsdWU9XCIke2MubmFtZX1cIj5cIiR7Yy5uYW1lfVwiIC0gJHtjLmNvbW1hbmQuYWJvdXQgPyBjLmNvbW1hbmQuYWJvdXQoKSA6IFwiY29tbWFuZFwifTwvb3B0aW9uPmApLnNvcnQoKS5qb2luKFwiXCIpO1xyXG4gICAgICBjb25zdCBtYXJrdXAyID0ga2V5Ym9hcmRDb21tYW5kcy5tYXAoKGMsIGkpID0+IGA8b3B0aW9uIHZhbHVlPVwiJHtjLmtleX1cIj5cIiR7Yy5rZXl9XCIgLSAkeyhjLmFib3V0ISl9PC9jb2RlPjwvb3B0aW9uPmApLnNvcnQoKS5qb2luKFwiXCIpO1xyXG5cclxuXHJcbiAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBgJHttYXJrdXAxfSR7bWFya3VwMn1gO1xyXG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MVGV4dEFyZWFFbGVtZW50PihcIi5jb25zb2xlXCIpIS52YWx1ZSA9IHRhcmdldC52YWx1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0YXJnZXQudG9nZ2xlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi4vY29udHJvbHMvQ29sbGFnZVBhbmVsXCI7XHJcblxyXG4vKipcclxuICAgKiBTcGxpdHMgdGhlIGN1cnJlbnQgcGFuZWwgaW50byA0IGVxdWFsIHNpemUgcGFuZWxzXHJcbiAgICogVGhpcyBwYW5lbCB0aGVuIHRha2VzIG9uIHRoZSByb2xlIG9mIGEgcGFuZWwgY29udGFpbmVyXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gc3BsaXQocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IFt0b3BsZWZ0LCB0b3ByaWdodCwgYm90dG9tbGVmdCwgYm90dG9tcmlnaHRdID0gWzEsIDIsIDMsIDRdLm1hcChuID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgbGV0IGNoaWxkcmVuID0gW3RvcGxlZnQsIHRvcHJpZ2h0LCBib3R0b21sZWZ0LCBib3R0b21yaWdodF0ubWFwKHYgPT4gbmV3IENvbGxhZ2VQYW5lbCh2KSk7XHJcbiAgICB0b3BsZWZ0LmNsYXNzTGlzdC5hZGQoXCJxMVwiKTtcclxuICAgIHRvcHJpZ2h0LmNsYXNzTGlzdC5hZGQoXCJxMlwiKTtcclxuICAgIGJvdHRvbWxlZnQuY2xhc3NMaXN0LmFkZChcInEzXCIpO1xyXG4gICAgYm90dG9tcmlnaHQuY2xhc3NMaXN0LmFkZChcInE0XCIpO1xyXG4gICAgLy8gcGhvdG8gY29udGFpbnMgbm8gc3RhdGUgc28gbm90IGNsb25pbmdcclxuICAgIGNvbnN0IHBob3RvID0gcGFuZWwucGhvdG87XHJcbiAgICBpZiAocGhvdG8pIHtcclxuICAgICAgY2hpbGRyZW4uZm9yRWFjaChjID0+IGMuYWRkUGhvdG8ocGhvdG8uY2xvbmUoKSkpO1xyXG4gICAgfVxyXG4gICAgcGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcInBhbmVsXCIpO1xyXG4gICAgcGFuZWwub3ZlcmxheS5yZW1vdmUoKTtcclxuICAgIHBhbmVsLmltYWdlLnNyYyA9IFwiXCI7XHJcbiAgICBwYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKFwicGFuZWwtY29udGFpbmVyXCIpO1xyXG4gICAgcGFuZWwucGFuZWwuZGF0YXNldFtcImlkXCJdID0gXCJcIjtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goYyA9PiBwYW5lbC5wYW5lbC5hcHBlbmRDaGlsZChjLnBhbmVsKSk7XHJcbiAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuLyoqXHJcbiAqIFNwbGl0cyB0aGUgcGFuZWwgaW50byA0IG5ldyBjaGlsZCBwYW5lbHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTcGxpdENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBjb21tYW5kQXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgaWQgPSBjb21tYW5kQXJncztcclxuXHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIG5vZGUgZm91bmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnBhbmVscy5maW5kKHAgPT4gcC5wYW5lbCA9PT0gbm9kZSk7XHJcbiAgICBpZiAoIXBhbmVsKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gcGFuZWwgZm91bmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb3JpZ2luYWxJbmRleCA9IHJlcGwucGFuZWxzLmluZGV4T2YocGFuZWwpO1xyXG4gICAgbGV0IGNoaWxkUGFuZWxzID0gc3BsaXQocGFuZWwpO1xyXG4gICAgLy8gcmVtb3ZlIHNpbmNlIGl0IGlzIG5vIGxvbmdlciBhIHBhbmVsXHJcbiAgICByZXBsLnBhbmVscy5zcGxpY2Uob3JpZ2luYWxJbmRleCwgMSwgLi4uY2hpbGRQYW5lbHMpO1xyXG4gICAgY2hpbGRQYW5lbHMuZm9yRWFjaChjID0+IHJlcGwuYWRkQmVoYXZpb3JzKGMpKTtcclxuICAgIHJlcGwucmVpbmRleCgpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFzcGVjdFJhdGlvQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIGBzZXQgdGhlIGFzcGVjdCByYXRpbyB0byBXIEhgO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBbdywgaF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCB3aWR0aCA9IHBhcnNlRmxvYXQodyk7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcGFyc2VGbG9hdChoKTtcclxuICAgIGxldCB3aW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRvd1wiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjYW52YXMgPSB3aW5kb3cucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50V2lkdGggPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY2FudmFzKS53aWR0aCk7XHJcbiAgICBsZXQgY3VycmVudEhlaWdodCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLmhlaWdodCk7XHJcbiAgICAvLyBtdWx0aXBsZSB3aWR0aCBhbmQgaGVpZ2h0IGJ5IG1heGltdW0gc2NhbGUgc3VjaCB0aGF0XHJcbiAgICAvLyB3aWR0aCAqIHNjYWxlIDw9IGN1cnJlbnRXaWR0aCBhbmQgaGVpZ2h0ICogc2NhbGUgPD0gY3VycmVudEhlaWdodFxyXG4gICAgbGV0IHN4ID0gY3VycmVudFdpZHRoIC8gd2lkdGg7XHJcbiAgICBsZXQgc3kgPSBjdXJyZW50SGVpZ2h0IC8gaGVpZ2h0O1xyXG4gICAgbGV0IHNjYWxlID0gTWF0aC5taW4oc3gsIHN5KTtcclxuICAgIHdpbmRvdy5zdHlsZS53aWR0aCA9IGAke01hdGgucm91bmQod2lkdGggKiBzY2FsZSl9cHhgO1xyXG4gICAgd2luZG93LnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0ICogc2NhbGUpfXB4YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3JkZXJDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gXCJzZXQgdGhlIGJvcmRlciBXSURUSCBDT0xPUiBvZiBJRDEgSUQyIC4uLlwiO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IFt3aWR0aCwgY29sb3IsIC4uLmlkc10gPSBhcmdzLnNwbGl0KFwiIFwiKS5maWx0ZXIoKHYpID0+ICEhdik7XHJcbiAgICBpZiAoIXdpZHRoKSB0aHJvdyBcIndpZHRoIHJlcXVpcmVkXCI7XHJcbiAgICBpZiAoIWNvbG9yKSB0aHJvdyBcImNvbG9yIHJlcXVpcmVkXCI7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gaWRzLmxlbmd0aCA/IGlkcy5tYXAoKGlkKSA9PiByZXBsLnNlbGVjdFBhbmVsKGlkKSkgOiByZXBsLnBhbmVscztcclxuICAgIHRhcmdldHMuZm9yRWFjaCgocCkgPT4gcD8uYm9yZGVyKHdpZHRoLCBjb2xvcikpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuY29uc3QgdW5pdHMgPSBcInB4IGVtXCIuc3BsaXQoXCIgXCIpO1xyXG5cclxuZnVuY3Rpb24gaGFzVW5pdHModmFsdWU6IHN0cmluZykge1xyXG4gIHJldHVybiB1bml0cy5zb21lKHYgPT4gdmFsdWUuZW5kc1dpdGgodikpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlU3R5bGVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgdGFyZ2V0OiBrZXlvZiBPbWl0PENTU1N0eWxlRGVjbGFyYXRpb24sIG51bWJlcj4sXHJcbiAgICBwdWJsaWMgb3B0aW9ucz86IHtcclxuICAgICAgdW5pdHM/OiBzdHJpbmc7XHJcbiAgICAgIGRlbHRhPzogbnVtYmVyO1xyXG4gICAgfVxyXG4gICkgeyB9XHJcblxyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIGBjaGFuZ2UgJHt0aGlzLnRhcmdldH1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXIocmVwbDogUmVwbCkge1xyXG4gICAgcmV0dXJuIHJlcGwucGFuZWxzXHJcbiAgICAgIC5maWx0ZXIocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5jb250YWlucyhcImZvY3VzXCIpKVxyXG4gICAgICAuc29tZShwYW5lbCA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gcGFuZWwucGFuZWw7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHN0eWxlWzxhbnk+dGhpcy50YXJnZXRdKSArICh0aGlzLm9wdGlvbnM/LmRlbHRhID8/IDApO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZVs8YW55PnRoaXMudGFyZ2V0XSA9IHZhbHVlICsgKHRoaXMub3B0aW9ucz8udW5pdHMgPz8gXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGlmICghYXJncykge1xyXG4gICAgICBpZiAodGhpcy5rZXlib2FyZEhhbmRsZXIocmVwbCkpIHJldHVybjtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhbmVscyA9IHJlcGwucGFuZWxzO1xyXG4gICAgY29uc3QgW3ZhbHVlLCAuLi5pZHNdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBpZiAoIXZhbHVlKSB0aHJvdyBcInNpemUgcmVxdWlyZWRcIjtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRzID0gKCFpZHMubGVuZ3RoKSA/IHBhbmVscyA6IGlkcy5tYXAoaWQgPT4gcmVwbC5zZWxlY3RQYW5lbChpZCkpLmZpbHRlcih2ID0+ICEhdik7XHJcbiAgICBpZiAoIXRhcmdldHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdW5pdHMgPSAhaGFzVW5pdHModmFsdWUpID8gdGhpcy5vcHRpb25zPy51bml0cyB8fCBcIlwiIDogXCJcIjtcclxuXHJcbiAgICB0YXJnZXRzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcbiAgICAgIHBhbmVsLnBhbmVsLnN0eWxlWzxhbnk+dGhpcy50YXJnZXRdID0gYCR7dmFsdWV9JHt1bml0c31gO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5mdW5jdGlvbiBoYXNGb2N1cyhub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR290b0NvbW1hbmRFZGl0b3JDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IGVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uc29sZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgaWYgKCFlZGl0b3IpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoXCJubyBjb21tYW5kIGVkaXRvciBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc0ZvY3VzKGVkaXRvcikpIHJldHVybiBmYWxzZTtcclxuICAgIGVkaXRvci5mb2N1cygpO1xyXG4gICAgZWRpdG9yLnNlbGVjdCgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2N1c1BhbmVscyhyZXBsOiBSZXBsKSB7XHJcbiAgcmV0dXJuIHJlcGwucGFuZWxzLmZpbHRlcihwID0+IHAucGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpO1xyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5cclxuLyoqXHJcbiAqIHN3YXAgaW1hZ2VzIG9mIHR3byBwYW5lbHNcclxuICovXHJcbmZ1bmN0aW9uIHN3YXBJbWFnZXMocGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IGltYWdlMSA9IHBhbmVsMS5pbWFnZTtcclxuICBsZXQgaW1hZ2UyID0gcGFuZWwyLmltYWdlO1xyXG4gIGxldCBwYXJlbnQxID0gaW1hZ2UxLnBhcmVudEVsZW1lbnQ7XHJcbiAgbGV0IHBhcmVudDIgPSBpbWFnZTIucGFyZW50RWxlbWVudDtcclxuICBpZiAoIXBhcmVudDEgfHwgIXBhcmVudDIpIHJldHVybiBmYWxzZTtcclxuICBsZXQgbmV4dDEgPSBpbWFnZTEubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gIGxldCBuZXh0MiA9IGltYWdlMi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgaW1hZ2UxLnJlbW92ZSgpO1xyXG4gIGltYWdlMi5yZW1vdmUoKTtcclxuICBwYXJlbnQyLmluc2VydEJlZm9yZShpbWFnZTEsIG5leHQyKTtcclxuICBwYXJlbnQxLmluc2VydEJlZm9yZShpbWFnZTIsIG5leHQxKTtcclxuICBsZXQgcGhvdG8xID0gcGFuZWwxLnBob3RvO1xyXG4gIGxldCBwaG90bzIgPSBwYW5lbDIucGhvdG87XHJcbiAgcGFuZWwxLmltYWdlID0gaW1hZ2UyO1xyXG4gIHBhbmVsMi5pbWFnZSA9IGltYWdlMTtcclxuICBwYW5lbDEucGhvdG8gPSBwaG90bzI7XHJcbiAgcGFuZWwyLnBob3RvID0gcGhvdG8xO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFN3YXBQYW5lbHNDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXIocmVwbDogUmVwbCkge1xyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAoMiAhPT0gcGFuZWxzLmxlbmd0aCkge1xyXG4gICAgICByZXBsLm5vdGlmeShcIkV4YWN0bHkgdHdvIHBhbmVscyBtdXN0IGJlIHNlbGVjdGVkIGJlZm9yZSB5b3UgY2FuIHBlcmZvcm0gYSBzd2FwLlwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc3dhcEltYWdlcyhwYW5lbHNbMF0sIHBhbmVsc1sxXSk7XHJcbiAgfVxyXG5cclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiBcIlN3YXAgUGFuZWwgQSBCXCI7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiBmYWxzZSB8IHZvaWQgfCBQcm9taXNlPGZhbHNlIHwgdm9pZD4ge1xyXG4gICAgaWYgKCFhcmdzKVxyXG4gICAgICByZXR1cm4gdGhpcy5rZXlib2FyZEhhbmRsZXIocmVwbCk7XHJcblxyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwYW5lbDEgPSByZXBsLnNlbGVjdFBhbmVsKGlkMSk7XHJcbiAgICBsZXQgcGFuZWwyID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgaWYgKCFwYW5lbDEpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoYFBhbmVsIG5vdCBmb3VuZDogJHtpZDF9YCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICghcGFuZWwyKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KGBQYW5lbCBub3QgZm91bmQ6ICR7aWQyfWApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzd2FwSW1hZ2VzKHBhbmVsMSwgcGFuZWwyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIEdvdG9Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGFyZ3M7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgVGV4dENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgdmFsdWVdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuICAgIHBhbmVsLnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIFBhZENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgd2lkdGhdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5zdHlsZS5wYWRkaW5nID0gYCR7d2lkdGh9ZW1gO1xyXG5cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBub2RlLnN0eWxlLnZpc2liaWxpdHkgIT09IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgaXNWaXNpYmxlIH0gZnJvbSBcIi4uL2Z1bi9pc1Zpc2libGVcIjtcclxuZXhwb3J0IGNsYXNzIFRvZ2dsZVZpc2liaWxpdHlDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IHtcclxuICAgIHNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgfSkge1xyXG4gIH1cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IG92ZXJsYXlzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3RvcikpIGFzIEFycmF5PEhUTUxFbGVtZW50PjtcclxuICAgIGxldCBhbGxWaXNpYmxlID0gb3ZlcmxheXMuZXZlcnkodiA9PiBpc1Zpc2libGUodikpO1xyXG4gICAgaWYgKCFhbGxWaXNpYmxlKSB7XHJcbiAgICAgIG92ZXJsYXlzLmZvckVhY2godiA9PiB2LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgb3ZlcmxheXMuZm9yRWFjaCh2ID0+IHYuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBnZXRGb2N1c1BhbmVscyB9IGZyb20gXCIuL2dldEZvY3VzUGFuZWxzXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICAgKiBNb3ZlIHRoZSBpbWFnZSBpbnNpZGUgdGhlIGZyYW1lXHJcbiAgICogQHBhcmFtIHggaG9yaXpvbnRhbCBvZmZzZXQgaW4gcGl4ZWxzXHJcbiAgICogQHBhcmFtIHkgdmVydGljYWwgb2Zmc2V0IGluIHBpeGVsc1xyXG4gICAqL1xyXG5mdW5jdGlvbiBwYW4ocmVwbDogUmVwbCwgbm9kZTogSFRNTEVsZW1lbnQsIHg6IHN0cmluZywgeTogc3RyaW5nKSB7XHJcbiAgbGV0IFtkeCwgZHldID0gWzAsIDBdO1xyXG4gIGxldCBhbmltYXRlID0gdHJ1ZTtcclxuICBsZXQgcGl4ZWxTaXplID0gMTtcclxuICBzd2l0Y2ggKHgpIHtcclxuICAgIGNhc2UgXCJ1cFwiOlxyXG4gICAgICBkeSA9IC1waXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImRvd25cIjpcclxuICAgICAgZHkgPSBwaXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgZHggPSAtcGl4ZWxTaXplO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICBkeCA9IHBpeGVsU2l6ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbmltYXRlID0gZmFsc2U7XHJcbiAgICAgIGR4ID0gcGl4ZWxTaXplICogcGFyc2VGbG9hdCh4KTtcclxuICAgICAgZHkgPSBwaXhlbFNpemUgKiBwYXJzZUZsb2F0KHkpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgbGV0IG9wID0gKCkgPT4ge1xyXG4gICAgdHJhbnNmb3JtKG5vZGUsIGB0cmFuc2xhdGUoJHtkeH1weCwgJHtkeX1weClgKTtcclxuICB9O1xyXG4gIG9wKCk7XHJcbiAgbGV0IGFuaW1hdGlvbnMgPSByZXBsLmFuaW1hdGlvbnM7XHJcbiAgYW5pbWF0ZSAmJiBhbmltYXRpb25zLmFuaW1hdGUoXCJwYW5cIiwgb3ApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlSW1hZ2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IHtcclxuICAgIHg/OiBudW1iZXI7XHJcbiAgICB5PzogbnVtYmVyO1xyXG4gIH0pIHsgfVxyXG5cclxuICBhYm91dCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IDxzdHJpbmdbXT5bXTtcclxuICAgIGxldCB4ID0gdGhpcy5kZWx0YT8ueCB8fCAwO1xyXG4gICAgbGV0IHkgPSB0aGlzLmRlbHRhPy55IHx8IDA7XHJcblxyXG4gICAgaWYgKHggPiAwKSByZXN1bHQucHVzaChgJHt4fSBweCByaWdodGApO1xyXG4gICAgaWYgKHggPCAwKSByZXN1bHQucHVzaChgJHsteH0gcHggbGVmdGApO1xyXG4gICAgaWYgKHkgPiAwKSByZXN1bHQucHVzaChgJHt5fSBweCB1cGApO1xyXG4gICAgaWYgKHkgPCAwKSByZXN1bHQucHVzaChgJHsteX0gcHggZG93bmApO1xyXG4gICAgcmV0dXJuIGBtb3ZlIGltYWdlICR7cmVzdWx0LmpvaW4oXCIgYW5kIFwiKX1gO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCEhYXJncykge1xyXG4gICAgICBsZXQgW2lkLCB4LCB5XSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBwYW4ocmVwbCwgcGFuZWwuaW1hZ2UsIHgsIHkgfHwgXCIwXCIpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlbHRhKSB7XHJcbiAgICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgcGFuKHJlcGwsIHBhbmVsLmltYWdlLCAodGhpcy5kZWx0YSEueCB8fCAwKSArIFwiXCIsICh0aGlzLmRlbHRhIS55IHx8IDApICsgXCJcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbm90IGhhbmRsZWRcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgTWFyZ2luQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkLCB3aWR0aF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gICAgbm9kZS5zdHlsZS5tYXJnaW4gPSBgJHt3aWR0aH1lbWA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5cclxuZnVuY3Rpb24gbWVyZ2Vfbm9kZXMocmVwbDogUmVwbCwgcGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IG5vZGUxID0gcGFuZWwxLnBhbmVsO1xyXG4gIGxldCBub2RlMiA9IHBhbmVsMi5wYW5lbDtcclxuXHJcbiAgbm9kZTIuY2xhc3NMaXN0LmZvckVhY2goYyA9PiBub2RlMS5jbGFzc0xpc3QuYWRkKGMpKTtcclxuICByZXBsLnJlbW92ZVBhbmVsKHBhbmVsMik7XHJcblxyXG4gIC8vIGlmIG5vZGUxIGlzIHExLi4ucTQgYW5kIG9ubHkgY2hpbGQgdGhlbiBpdCBhc3N1bWVzIHRoZSBxIG9mIGl0J3MgY29udGFpbmVyIGFuZCByZXBsYWNlcyBpdHMgY29udGFpbmVyXHJcbiAgbGV0IHFzID0gWzEsIDIsIDMsIDRdLm1hcCh2ID0+IGBxJHt2fWApO1xyXG4gIGlmIChxcy5ldmVyeSh2ID0+IG5vZGUxLmNsYXNzTGlzdC5jb250YWlucyh2KSkpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IG5vZGUxLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWwtY29udGFpbmVyXCIpKSB7XHJcbiAgICAgIHFzLmZvckVhY2godiA9PiBub2RlMS5jbGFzc0xpc3QucmVtb3ZlKHYpKTtcclxuICAgICAgcXMuZm9yRWFjaCh2ID0+IHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnModikgJiYgbm9kZTEuY2xhc3NMaXN0LmFkZCh2KSk7XHJcbiAgICAgIHBhcmVudC5wYXJlbnRFbGVtZW50Py5pbnNlcnRCZWZvcmUobm9kZTEsIHBhcmVudCk7XHJcbiAgICAgIHBhcmVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVwbC5yZWluZGV4KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXJnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlMSA9IHJlcGwuc2VsZWN0UGFuZWwoaWQxKTtcclxuICAgIGxldCBub2RlMiA9IHJlcGwuc2VsZWN0UGFuZWwoaWQyKTtcclxuICAgIG5vZGUxICYmIG5vZGUyICYmIG1lcmdlX25vZGVzKHJlcGwsIG5vZGUxLCBub2RlMik7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgYmJveCB9IGZyb20gXCIuLi9mdW4vYmJveFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpUmVzQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG5cclxuICAvKipcclxuICAgKiByZXBsYWNlcyB0aGUgY3VycmVudCBwaG90byB3aXRoIG9uZSBvZiBoaWdoZXIgcXVhbGl0eVxyXG4gICAqL1xyXG4gIGFzeW5jIHVwZ3JhZGVSZXNvbHV0aW9uKHJlcGw6IFJlcGwsIHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGlmICghcGFuZWwucGhvdG8pXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAvLyBhdHRlbXB0cyB0byBpbmNyZWFzZSBhbiBpbWFnZSBzaXplIGFuZCBkZWNyZWFzZSB0aGUgdHJhbnNmb3JtIHNjYWxlXHJcbiAgICAvLyB0byBoYXZlIGEgbmVnbGlnYWJsZSBlZmZlY3Qgb24gdGhlIGltYWdlIGJ1dCBhbGxvdyBmb3Igc3dhcHBpbmcgaW5cclxuICAgIC8vIGEgaGlnaGVyIHJlc29sdXRpb24gdmVyc2lvbi5cclxuICAgIC8vIHRoaXMgaXMgbm90IGNvbXBlbnNhdGluZyBmb3IgIHBhZGRpbmcsIG1hcmdpbiwgYm9yZGVyIHdpZHRoLCBldGMuXHJcbiAgICAvLyBpdCBpcyBub3QgcHJlc2VydmluZyByb3RhdGlvblxyXG4gICAgbGV0IGJveCA9IGJib3gocGFuZWwuaW1hZ2UpO1xyXG4gICAgbGV0IGltYWdlUmVjdCA9IHBhbmVsLmltYWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IHNjYWxlID0gaW1hZ2VSZWN0LndpZHRoIC8gYm94LndpZHRoO1xyXG4gICAgaWYgKDEgPiBzY2FsZSkge1xyXG4gICAgICByZXBsLm5vdGlmeShcInRoaXMgd291bGQgbm90IGJlIGFuIHVwZ3JhZGVcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBwYW5lbFJlY3QgPSBwYW5lbC5wYW5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHBhbmVsLmltYWdlLnN0eWxlLndpZHRoID0gaW1hZ2VSZWN0LndpZHRoICsgXCJweFwiO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gaW1hZ2VSZWN0LmhlaWdodCArIFwicHhcIjtcclxuICAgIGxldCBkeCA9IGltYWdlUmVjdC5sZWZ0IC0gcGFuZWxSZWN0LmxlZnQgLSBwYXJzZUZsb2F0KHBhbmVsLnBhbmVsLnN0eWxlLmJvcmRlckxlZnRXaWR0aCk7XHJcbiAgICBsZXQgZHkgPSBpbWFnZVJlY3QudG9wIC0gcGFuZWxSZWN0LnRvcCAtIHBhcnNlRmxvYXQocGFuZWwucGFuZWwuc3R5bGUuYm9yZGVyVG9wV2lkdGgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2R4fXB4LCR7ZHl9cHgpYDtcclxuICAgIHBhbmVsLnNldEJhY2tncm91bmRJbWFnZShgJHtwYW5lbC5waG90by5tZWRpYUluZm8uYmFzZVVybH09dyR7TWF0aC5mbG9vcihpbWFnZVJlY3Qud2lkdGgpfWApO1xyXG4gICAgcmVwbC5ub3RpZnkoYHVwZ3JhZGVkIGJ5ICR7TWF0aC5yb3VuZChzY2FsZSAqIDEwMCl9JWApO1xyXG4gIH1cclxuXHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBbLi4uaWRzXSA9IGFyZ3Muc3BsaXQoXCIgXCIpLm1hcCh2ID0+IHYudHJpbSgpKS5maWx0ZXIodiA9PiB2Lmxlbmd0aCk7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gIWlkcy5sZW5ndGggPyByZXBsLnBhbmVscyA6IGlkcy5tYXAoaWQgPT4gcmVwbC5zZWxlY3RQYW5lbChpZCkpO1xyXG4gICAgdGFyZ2V0cy5mb3JFYWNoKHAgPT4gcCAmJiB0aGlzLnVwZ3JhZGVSZXNvbHV0aW9uKHJlcGwsIHApKTtcclxuXHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgTW92ZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwaG90byA9IHJlcGwuc2VsZWN0UGhvdG8oaWQxKTtcclxuICAgIGlmICghcGhvdG8pIHJldHVybjtcclxuXHJcblxyXG4gICAgbGV0IHBhbmVsID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgIHBhbmVsLmFkZFBob3RvKHBob3RvKTtcclxuXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuaW1wb3J0IHsgdHJhbnNmb3JtIH0gZnJvbSBcIi4uL2Z1bi90cmFuc2Zvcm1cIjtcclxuXHJcbmZ1bmN0aW9uIHJvdGF0ZUltYWdlKHJlcGw6IFJlcGwsIG5vZGU6IEhUTUxFbGVtZW50LCBhbmdsZTogc3RyaW5nKSB7XHJcbiAgaWYgKCFub2RlKVxyXG4gICAgcmV0dXJuO1xyXG5cclxuICBpZiAoISFhbmdsZSkge1xyXG4gICAgdHJhbnNmb3JtKG5vZGUsIGByb3RhdGUoJHthbmdsZX1kZWcpYCk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgbGV0IGFuZ2xlID0gMDtcclxuICAgIGxldCBhbmltYXRpb25zID0gcmVwbC5hbmltYXRpb25zO1xyXG4gICAgYW5pbWF0aW9ucy5hbmltYXRlKFwicm90YXRlXCIsICgpID0+IHtcclxuICAgICAgYW5nbGUgKz0gMTtcclxuICAgICAgdHJhbnNmb3JtKG5vZGUsIGByb3RhdGUoJHthbmdsZX1kZWcpYCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJvdGF0ZVBhbmVsQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YTogbnVtYmVyKSB7IH1cclxuXHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gYHJvdGF0ZSBwYW5lbCBieSAke3RoaXMuZGVsdGF9IGRlZ2A7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLnBhbmVsO1xyXG4gICAgICB0cmFuc2Zvcm0obGFiZWxJbWFnZU9yUGFuZWwsIGByb3RhdGUoJHt0aGlzLmRlbHRhfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvdGF0ZUltYWdlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IG51bWJlcikgeyB9XHJcblxyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIGByb3RhdGUgaW1hZ2UgYnkgJHt0aGlzLmRlbHRhfSBkZWdgO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCEhYXJncykge1xyXG4gICAgICBsZXQgW25vdW4sIG5vdW4yXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKG5vdW4pO1xyXG4gICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJvdGF0ZUltYWdlKHJlcGwsIHBhbmVsLmltYWdlLCBub3VuMik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLmltYWdlO1xyXG4gICAgICB0cmFuc2Zvcm0obGFiZWxJbWFnZU9yUGFuZWwsIGByb3RhdGUoJHt0aGlzLmRlbHRhfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVQYW5lbENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGVsdGE6IHtcclxuICAgIHg/OiBudW1iZXI7XHJcbiAgICB5PzogbnVtYmVyO1xyXG4gIH0pIHsgfVxyXG5cclxuICBhYm91dCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IDxzdHJpbmdbXT5bXTtcclxuICAgIGxldCB4ID0gdGhpcy5kZWx0YS54IHx8IDA7XHJcbiAgICBsZXQgeSA9IHRoaXMuZGVsdGEueSB8fCAwO1xyXG5cclxuICAgIGlmICh4ID4gMCkgcmVzdWx0LnB1c2goYCR7eH0gcHggcmlnaHRgKTtcclxuICAgIGlmICh4IDwgMCkgcmVzdWx0LnB1c2goYCR7LXh9IHB4IGxlZnRgKTtcclxuICAgIGlmICh5ID4gMCkgcmVzdWx0LnB1c2goYCR7eX0gcHggdXBgKTtcclxuICAgIGlmICh5IDwgMCkgcmVzdWx0LnB1c2goYCR7LXl9IHB4IGRvd25gKTtcclxuICAgIHJldHVybiBgbW92ZSBwYW5lbCAke3Jlc3VsdC5qb2luKFwiIGFuZCBcIil9YDtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBsZXQgbGFiZWxJbWFnZU9yUGFuZWwgPSBwYW5lbC5wYW5lbDtcclxuICAgICAgbGV0IGNvbXB1dGVkVHJhbmZvcm0gPSBnZXRDb21wdXRlZFN0eWxlKGxhYmVsSW1hZ2VPclBhbmVsKS50cmFuc2Zvcm07XHJcbiAgICAgIGlmIChjb21wdXRlZFRyYW5mb3JtID09PSBcIm5vbmVcIikgY29tcHV0ZWRUcmFuZm9ybSA9IFwiXCI7XHJcbiAgICAgIGxhYmVsSW1hZ2VPclBhbmVsLnN0eWxlLnRyYW5zZm9ybSA9IGNvbXB1dGVkVHJhbmZvcm0gKyBgIHRyYW5zbGF0ZSgke3RoaXMuZGVsdGEueCB8fCAwfXB4LCAke3RoaXMuZGVsdGEueSB8fCAwfXB4KWA7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9wQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGFib3V0KCkgeyByZXR1cm4gXCJTdG9wIEFuaW1hdGlvbnNcIjt9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGlmICghcmVwbC5hbmltYXRpb25zLmFuaW1hdGlvbnMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXBsLmFuaW1hdGlvbnMuc3RvcChhcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb2dnbGVGb2N1c0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBhYm91dCgpIHsgcmV0dXJuIFwiVG9nZ2xlIGZvY3VzXCI7fVxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICBpZiAoIWFjdGl2ZVBhbmVsPy5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbFwiKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgYWN0aXZlUGFuZWwuY2xhc3NMaXN0LnRvZ2dsZShcImZvY3VzXCIpO1xyXG4gICAgLy8gaGVyZSBpIGFtIC0gaWYgbm90IFwic2hpZnRcIiBrZXkgdGhlbiB1bmZvY3VzIGFsbCBwYW5lbHNcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuZXhwb3J0IGNsYXNzIEVzY2FwZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBcclxuICBwcml2YXRlIGlzUGFuZWwoZWxlbWVudDogRWxlbWVudCB8IG51bGwpIHtcclxuICAgIGlmICghZWxlbWVudClcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWxcIikgfHwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbC1jb250YWluZXJcIik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNlbGVjdFBhcmVudFBhbmVsKCkge1xyXG4gICAgbGV0IGN1cnJlbnRQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFjdXJyZW50UGFuZWwpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHdoaWxlIChjdXJyZW50UGFuZWwpIHtcclxuICAgICAgY3VycmVudFBhbmVsID0gY3VycmVudFBhbmVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIGlmICghY3VycmVudFBhbmVsKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgaWYgKHRoaXMuaXNQYW5lbChjdXJyZW50UGFuZWwpKSB7XHJcbiAgICAgICAgY3VycmVudFBhbmVsLmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAvLyB1bmZvY3VzIGFsbCBwYW5lbHNcclxuICAgIHJlcGwucGFuZWxzLmZvckVhY2gocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJmb2N1c1wiKSk7XHJcbiAgICB0aGlzLnNlbGVjdFBhcmVudFBhbmVsKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlRm9udFNpemVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgcmVhZG9ubHkgI3VuaXRzOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGRlbHRhOiBudW1iZXIsXHJcbiAgICBwdWJsaWMgb3B0aW9ucyA9IHtcclxuICAgICAgdW5pdHM6IFwicHhcIixcclxuICAgIH1cclxuICApIHtcclxuICAgIHRoaXMuI3VuaXRzID0gb3B0aW9ucz8udW5pdHMgfHwgXCJweFwiO1xyXG4gIH1cclxuXHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWx0YSA+IDAgPyBgaW5jcmVhc2UgZm9udCBieSAke3RoaXMuZGVsdGF9JHt0aGlzLiN1bml0c31gIDogYGRlY3JlYXNlIGZvbnQgYnkgJHstdGhpcy5kZWx0YX0ke3RoaXMuI3VuaXRzfWA7XHJcbiAgfVxyXG5cclxuICBpc0xhYmVsKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XHJcbiAgICBpZiAoIWVsZW1lbnQpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImxhYmVsXCIpO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGlmICghdGhpcy5pc0xhYmVsKGxhYmVsKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgZm9udFNpemUgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUobGFiZWwpLmZvbnRTaXplKTtcclxuICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemUgKyB0aGlzLmRlbHRhfSR7dGhpcy4jdW5pdHN9YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgR29vZ2xlTWVkaWFJdGVtIH0gZnJvbSBcIi4vR29vZ2xlTWVkaWFJdGVtXCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlUGhvdG9BUEkge1xyXG4gIGF1dGgyOiB7XHJcbiAgICBnZXRBdXRoSW5zdGFuY2U6ICgpID0+IHtcclxuICAgICAgaXNTaWduZWRJbjoge1xyXG4gICAgICAgIGxpc3RlbjogKGNiOiAoaXNTaWduZWRJbjogYm9vbGVhbikgPT4gdm9pZCkgPT4gdm9pZDtcclxuICAgICAgICBnZXQ6ICgpID0+IGJvb2xlYW47XHJcbiAgICAgIH07XHJcbiAgICAgIHNpZ25JbjogKCkgPT4gdm9pZDtcclxuICAgICAgc2lnbk91dDogKCkgPT4gdm9pZDtcclxuICAgIH07XHJcbiAgfTtcclxuICBsb2FkOiAodHlwZTogc3RyaW5nLCBjYjogRnVuY3Rpb24pID0+IHZvaWQ7XHJcbiAgY2xpZW50OiB7XHJcbiAgICBpbml0OiAoYXJnczoge1xyXG4gICAgICBhcGlLZXk6IHN0cmluZztcclxuICAgICAgZGlzY292ZXJ5RG9jczogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgY2xpZW50SWQ6IHN0cmluZztcclxuICAgICAgc2NvcGU6IHN0cmluZztcclxuICAgIH0pID0+IFByb21pc2U8YW55PjtcclxuICAgIHBob3Rvc2xpYnJhcnk6IHtcclxuICAgICAgYWxidW1zOiB7XHJcbiAgICAgICAgbGlzdDogRnVuY3Rpb247XHJcbiAgICAgIH07XHJcbiAgICAgIG1lZGlhSXRlbXM6IHtcclxuICAgICAgICBzZWFyY2g6IChhcmdzOiB7XHJcbiAgICAgICAgICBhbGJ1bUlkOiBzdHJpbmc7XHJcbiAgICAgICAgICBwYWdlVG9rZW4/OiBzdHJpbmc7XHJcbiAgICAgICAgfSkgPT4gUHJvbWlzZTx7XHJcbiAgICAgICAgICByZXN1bHQ6IHtcclxuICAgICAgICAgICAgbmV4dFBhZ2VUb2tlbj86IHN0cmluZztcclxuICAgICAgICAgICAgbWVkaWFJdGVtczogQXJyYXk8R29vZ2xlTWVkaWFJdGVtPjtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfT47XHJcbiAgICAgICAgZ2V0OiAobWVkaWFJdGVtSWQ6IGFueSkgPT4gUHJvbWlzZTx7XHJcbiAgICAgICAgICByZXN1bHQ6IEdvb2dsZU1lZGlhSXRlbTtcclxuICAgICAgICB9PjtcclxuICAgICAgfTtcclxuICAgIH07XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVQaG90b0FQSSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlUGhvdG9BUElcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGdhcGk6IEdvb2dsZVBob3RvQVBJO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBob3RvU2lnbmluIHtcclxuICBwcml2YXRlIHBlb3BsZUFwaURpc2NvdmVyeSA9IFwiXCI7XHJcbiAgLy8gd2hlcmUgdG8gc3RvcmUgdGhlc2UgdmFsdWVzP1xyXG4gIHByaXZhdGUgc2NvcGVzID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3Bob3Rvc2xpYnJhcnkucmVhZG9ubHlcIjtcclxuXHJcbiAgcHJpdmF0ZSBhdXRob3JpemVCdXR0b246IEhUTUxCdXR0b25FbGVtZW50fG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgc2lnbm91dEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnR8bnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgcmVhZHkgPSAoKSA9PiB7IH07XHJcblxyXG4gIGFzeW5jIGhhbmRsZUNsaWVudExvYWQoKSB7XHJcbiAgICAvLyBMb2FkIHRoZSBBUEkgY2xpZW50IGFuZCBhdXRoMiBsaWJyYXJ5LlxyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBnYXBpLmxvYWQoXCJjbGllbnQ6YXV0aDJcIiwgcmVzb2x2ZSk7XHJcbiAgICB9KTtcclxuICAgIGxldCBjcmVkZW50aWFsc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIuL3dlYi9jcmVkZW50aWFscy5qc29uXCIpO1xyXG4gICAgbGV0IGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgIGFwaUtleTogc3RyaW5nO1xyXG4gICAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gICAgfSA9IGF3YWl0IGNyZWRlbnRpYWxzUmVzcG9uc2UuanNvbigpO1xyXG4gICAgbGV0IHJlc3AgPSBhd2FpdCBmZXRjaChcIi4vd2ViL3Bob3Rvc19yZXN0X3YxLmpzb25cIik7XHJcbiAgICB0aGlzLnBlb3BsZUFwaURpc2NvdmVyeSA9IGF3YWl0IHJlc3AuanNvbigpO1xyXG4gICAgYXdhaXQgdGhpcy5pbml0Q2xpZW50KGNyZWRlbnRpYWxzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgaW5pdENsaWVudChhcmdzOiB7XHJcbiAgICBhcGlLZXk6IHN0cmluZztcclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgfSkge1xyXG5cclxuICAgIHRoaXMuYXV0aG9yaXplQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdXRob3JpemUtYnV0dG9uXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgaWYgKCF0aGlzLmF1dGhvcml6ZUJ1dHRvbikgdGhyb3cgXCJhIGNsaWNrYWJsZSBlbGVtZW50IG11c3QgZXhpc3Qgd2l0aCBpZCBvZiAnYXV0aG9yaXplLWJ1dHRvbidcIjtcclxuXHJcbiAgICB0aGlzLnNpZ25vdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25vdXQtYnV0dG9uXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgaWYgKCF0aGlzLnNpZ25vdXRCdXR0b24pIHRocm93IFwiYSBjbGlja2FibGUgZWxlbWVudCBtdXN0IGV4aXN0IHdpdGggaWQgb2YgJ3NpZ25vdXQtYnV0dG9uJ1wiO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChnb29kLCBiYWQpID0+IHtcclxuICAgICAgdGhpcy5yZWFkeSA9ICgpID0+IGdvb2QoKTtcclxuICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7XHJcbiAgICAgICAgYXBpS2V5OiBhcmdzLmFwaUtleSxcclxuICAgICAgICBkaXNjb3ZlcnlEb2NzOiBbdGhpcy5wZW9wbGVBcGlEaXNjb3ZlcnldLFxyXG4gICAgICAgIGNsaWVudElkOiBhcmdzLmNsaWVudElkLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlcyxcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIExpc3RlbiBmb3Igc2lnbi1pbiBzdGF0ZSBjaGFuZ2VzLlxyXG4gICAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLmlzU2lnbmVkSW4ubGlzdGVuKHN0YXR1cyA9PiB0aGlzLnVwZGF0ZVNpZ25pblN0YXR1cyhzdGF0dXMpKTtcclxuICAgICAgLy8gSGFuZGxlIHRoZSBpbml0aWFsIHNpZ24taW4gc3RhdGUuXHJcbiAgICAgIHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuaXNTaWduZWRJbi5nZXQoKSk7XHJcbiAgICAgIHRoaXMuYXV0aG9yaXplQnV0dG9uIS5vbmNsaWNrID0gKCkgPT4gdGhpcy5oYW5kbGVBdXRoQ2xpY2soKTtcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uIS5vbmNsaWNrID0gKCkgPT4gdGhpcy5oYW5kbGVTaWdub3V0Q2xpY2soKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVTaWduaW5TdGF0dXMoaXNTaWduZWRJbjogYm9vbGVhbikge1xyXG4gICAgaWYgKGlzU2lnbmVkSW4pIHtcclxuICAgICAgdGhpcy5hdXRob3JpemVCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uIS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICB0aGlzLnJlYWR5KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRob3JpemVCdXR0b24hLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgIHRoaXMuc2lnbm91dEJ1dHRvbiEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVBdXRoQ2xpY2soKSB7XHJcbiAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLnNpZ25JbigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVTaWdub3V0Q2xpY2soKSB7XHJcbiAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLnNpZ25PdXQoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBHb29nbGVBbGJ1bSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGNvdmVyUGhvdG9CYXNlVXJsOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgR29vZ2xlUGhvdG9TaWduaW4gfSBmcm9tIFwiLi9Hb29nbGVQaG90b1NpZ25pblwiO1xyXG5pbXBvcnQgeyBHb29nbGVNZWRpYUl0ZW0gfSBmcm9tIFwiLi4vbW9kZWxzL0dvb2dsZU1lZGlhSXRlbVwiO1xyXG5pbXBvcnQgeyBHb29nbGVBbGJ1bSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlQWxidW1cIjtcclxuaW1wb3J0IHsgR29vZ2xlUGhvdG9BUEkgfSBmcm9tIFwiLi4vbW9kZWxzL0dvb2dsZVBob3RvQVBJXCI7XHJcblxyXG5kZWNsYXJlIHZhciBnYXBpOiBHb29nbGVQaG90b0FQSTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVQaG90b3Mge1xyXG5cclxuICBhc3luYyBnZXRBbGJ1bXMoKSB7XHJcbiAgICBsZXQgc2lnbmluID0gbmV3IEdvb2dsZVBob3RvU2lnbmluKCk7XHJcbiAgICBhd2FpdCBzaWduaW4uaGFuZGxlQ2xpZW50TG9hZCgpO1xyXG4gICAgbGV0IHJlc3AgPSBhd2FpdCBnYXBpLmNsaWVudC5waG90b3NsaWJyYXJ5LmFsYnVtcy5saXN0KCk7XHJcbiAgICBpZiAocmVzcC5zdGF0dXMgIT09IDIwMClcclxuICAgICAgdGhyb3cgYHN0YXR1czogJHtyZXNwLnN0YXR1c31gO1xyXG4gICAgY29uc29sZS5sb2coeyByZXNwIH0pO1xyXG4gICAgbGV0IGFsYnVtcyA9IHJlc3AucmVzdWx0LmFsYnVtcyBhcyBBcnJheTxHb29nbGVBbGJ1bT47XHJcbiAgICB3aGlsZSAocmVzcC5yZXN1bHQubmV4dFBhZ2VUb2tlbikge1xyXG4gICAgICByZXNwID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5hbGJ1bXMubGlzdCh7cGFnZVRva2VuOiByZXNwLnJlc3VsdC5uZXh0UGFnZVRva2VufSk7XHJcbiAgICAgIGlmIChyZXNwLnN0YXR1cyAhPT0gMjAwKVxyXG4gICAgICAgIHRocm93IGBzdGF0dXM6ICR7cmVzcC5zdGF0dXN9YDtcclxuICAgICAgY29uc29sZS5sb2coeyByZXNwIH0pO1xyXG4gICAgICBhbGJ1bXMgPSBhbGJ1bXMuY29uY2F0KHJlc3AucmVzdWx0LmFsYnVtcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWxidW1zO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxidW0oYWxidW06IEdvb2dsZUFsYnVtKSB7XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkubWVkaWFJdGVtcy5zZWFyY2goeyBhbGJ1bUlkOiBhbGJ1bS5pZCB9KTtcclxuICAgIGxldCB7bWVkaWFJdGVtc30gPSBkYXRhLnJlc3VsdDtcclxuICAgIHdoaWxlIChkYXRhLnJlc3VsdC5uZXh0UGFnZVRva2VuKSB7XHJcbiAgICAgIGRhdGEgPSBhd2FpdCBnYXBpLmNsaWVudC5waG90b3NsaWJyYXJ5Lm1lZGlhSXRlbXMuc2VhcmNoKHsgYWxidW1JZDogYWxidW0uaWQsIHBhZ2VUb2tlbjogZGF0YS5yZXN1bHQubmV4dFBhZ2VUb2tlbiB9KTtcclxuICAgICAgbWVkaWFJdGVtcy5wdXNoKC4uLmRhdGEucmVzdWx0Lm1lZGlhSXRlbXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lZGlhSXRlbXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQaG90byhtZWRpYUl0ZW1JZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkubWVkaWFJdGVtcy5nZXQoeyBtZWRpYUl0ZW1JZCB9KTtcclxuICAgIHJldHVybiAoZGF0YS5yZXN1bHQpIGFzIEdvb2dsZU1lZGlhSXRlbTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgR29vZ2xlUGhvdG9zIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0dvb2dsZVBob3Rvc1wiO1xyXG5pbXBvcnQgeyBHb29nbGVDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi4vY29udHJvbHMvR29vZ2xlQ29sbGFnZVBob3RvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3BlbkFsYnVtc0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICAgIGFzeW5jIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IFByb21pc2U8ZmFsc2UgfCB2b2lkPiB7XHJcbiAgICAgICAgaWYgKCFhcmdzKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub3BlbkFsYnVtcyhyZXBsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWxidW1OYW1lcyA9IGFyZ3Muc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMub3BlbkFsYnVtcyhyZXBsLCBhbGJ1bU5hbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvcGVuQWxidW1zKHJlcGw6IFJlcGwsIGFsYnVtTmFtZXM/OiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgbGV0IHBob3RvcyA9IG5ldyBHb29nbGVQaG90b3MoKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBob3Rvc1wiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBhbGJ1bXMgPSBhd2FpdCBwaG90b3MuZ2V0QWxidW1zKCk7XHJcbiAgICAgICAgICAgIGlmIChhbGJ1bU5hbWVzKSBhbGJ1bXMgPSBhbGJ1bXMuZmlsdGVyKGEgPT4gLTEgPCBhbGJ1bU5hbWVzLmluZGV4T2YoYS50aXRsZSkpO1xyXG4gICAgICAgICAgICBhbGJ1bXMuZm9yRWFjaChhc3luYyAoYWxidW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBvcGVuaW5nIGFsYnVtOiAke2FsYnVtLmlkfSAoJHthbGJ1bS50aXRsZX0pYCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVkaWFJdGVtcyA9IGF3YWl0IHBob3Rvcy5nZXRBbGJ1bShhbGJ1bSk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUl0ZW1zLmZvckVhY2gobWVkaWFJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGhvdG8gPSBuZXcgR29vZ2xlQ29sbGFnZVBob3RvKG1lZGlhSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbC5waG90b3MucHVzaChwaG90byk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGhvdG8ucmVuZGVySW50byh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcGwucmVpbmRleFBob3RvcygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi4vbW9kZWxzL0JlaGF2aW9yXCI7XHJcblxyXG4vKipcclxuICogV2hlbiB1c2VyIHNoaWZ0LWNsaWNrcyBhIHBhbmVsIGFkZCBcImZvY3VzXCIgY2xhc3NcclxuICogV2hlbiB1c2VyIGNsaWNrcyBhIHBhbmVsIGFkZCBcImZvY3VzXCIgY2xhc3MsIHJlbW92ZSBcImZvY3VzXCIgZnJvbSBhbGwgb3RoZXJzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RvciBpbXBsZW1lbnRzIEJlaGF2aW9yPFJlcGw+XHJcbntcclxuICAgIGV4dGVuZChjb250cm9sOiBSZXBsKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIGN1cnJlbnQgXCJmb2N1c1wiIGlmIHNoaWZ0IG5vdCBjbGlja2VkXHJcbiAgICAgICAgICAgIGlmICghZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wucGFuZWxzLmZvckVhY2gocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJmb2N1c1wiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBhbmVscyA9IGV2ZW50LmNvbXBvc2VkUGF0aCgpO1xyXG4gICAgICAgICAgICBwYW5lbHMgPSBwYW5lbHMuZmlsdGVyKChub2RlOiBhbnkpID0+IHRydWUgPT09IG5vZGU/LmNsYXNzTGlzdD8uY29udGFpbnMoXCJwYW5lbFwiKSkgYXMgQXJyYXk8SFRNTEVsZW1lbnQ+OyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYW5lbHMuZm9yRWFjaCgobm9kZTogYW55KSA9PiBub2RlLmNsYXNzTGlzdC50b2dnbGUoXCJmb2N1c1wiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4uL21vZGVscy9CZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1RvYXN0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBXaGVuIHVzZXIgc2hpZnQtY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzc1xyXG4gKiBXaGVuIHVzZXIgY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzcywgcmVtb3ZlIFwiZm9jdXNcIiBmcm9tIGFsbCBvdGhlcnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25CZWhhdmlvciBpbXBsZW1lbnRzIEJlaGF2aW9yPFJlcGw+XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0b2FzdGVyOiBUb2FzdGVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZW5kKGNvbnRyb2w6IFJlcGwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbm90aWZ5ID0gY29udHJvbC5ub3RpZnk7XHJcbiAgICAgICAgY29udHJvbC5ub3RpZnkgPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIG5vdGlmeShtZXNzYWdlKTtcclxuICAgICAgICAgICAgdGhpcy50b2FzdGVyLnRvYXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi4vZnVuL3RyYW5zZm9ybVwiO1xyXG5cclxuLyoqXHJcbiAqIFNjYWxlIHRoZSBpbWFnZVxyXG4gKiBAcGFyYW0gc2NhbGUgcGVyY2VudGFnZSBkZWx0YSBmcm9tIGN1cnJlbnQgc2NhbGVcclxuICovXHJcbmZ1bmN0aW9uIHNjYWxlSW1hZ2UocmVwbDogUmVwbCwgcGFuZWw6IENvbGxhZ2VQYW5lbCwgc2NhbGU6IHN0cmluZykge1xyXG4gICAgbGV0IG5vZGUgPSBwYW5lbC5pbWFnZTtcclxuICAgIGlmICghbm9kZSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgaWYgKCFzY2FsZSkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGdldENvbXB1dGVkU3R5bGUobm9kZSkud2lkdGg7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gcGFyc2VGbG9hdCh3aWR0aCkgLyAxMDA7XHJcbiAgICAgICAgcmVwbC5hbmltYXRpb25zLmFuaW1hdGUoXCJ6b29tXCIsICgpID0+IHtcclxuICAgICAgICAgICAgc2NhbGUgKj0gMS4wMTtcclxuICAgICAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IGAkezEwMCAqIHNjYWxlfSVgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gY29tcHV0ZSBmb2NhbCBwb2ludCB0byB6b29tIGFib3V0XHJcbiAgICAgICAgLy8gbGV0IGltYWdlQm94ID0gYmJveChub2RlKTtcclxuICAgICAgICAvLyBsZXQgcGFuZWxCb3ggPSBiYm94KHBhbmVsLnBhbmVsKTtcclxuICAgICAgICAvLyBsZXQgZm9jYWxQb2ludCA9IFstaW1hZ2VCb3gubGVmdCArIHBhbmVsQm94LndpZHRoIC8gMiwgLWltYWdlQm94LnRvcCArIHBhbmVsQm94LmhlaWdodCAvIDJdO1xyXG4gICAgICAgIGxldCBlZmZlY3RpdmVTY2FsZSA9IHBhcnNlRmxvYXQoc2NhbGUpO1xyXG4gICAgICAgIC8vbm9kZS5zdHlsZS53aWR0aCA9IGAkezEwMCAqIGVmZmVjdGl2ZVNjYWxlfSVgO1xyXG4gICAgICAgIC8vIHRoZSBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0IGNoYW5nZWQsIHRyYW5zbGF0ZSB0aGUgb3JpZ2luYWwgaW1hZ2VcclxuICAgICAgICAvLyBjZW50ZXIgYmFjayB0byB0aGUgcGFuZWwgY2VudGVyXHJcbiAgICAgICAgdHJhbnNmb3JtKG5vZGUsIGBzY2FsZSgke2VmZmVjdGl2ZVNjYWxlfSwke2VmZmVjdGl2ZVNjYWxlfSlgKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2FsZVBhbmVsQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHNjYWxlPzogbnVtYmVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgYWJvdXQoKSB7XHJcbiAgICAgIHJldHVybiBgc2NhbGUgcGFuZWwgYnkgJHsodGhpcy5zY2FsZXx8MCkudG9GaXhlZCgzKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICAgICAgaWYgKCEhYXJncykge1xyXG4gICAgICAgICAgICBsZXQgW25vdW4sIG5vdW4yXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKG5vdW4pO1xyXG4gICAgICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHBhbmVsLnNjYWxlRnJhbWUobm91bjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLnNjYWxlRnJhbWUodGhpcy5zY2FsZSArIFwiXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NhbGVJbWFnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzY2FsZT86IG51bWJlcikge1xyXG4gICAgfVxyXG5cclxuICAgIGFib3V0KCkge1xyXG4gICAgICByZXR1cm4gYHNjYWxlIGltYWdlIGJ5ICR7KHRoaXMuc2NhbGV8fDApLnRvRml4ZWQoMyl9YDtcclxuICAgIH1cclxuXHJcbiAgICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgICAgIGlmICghIWFyZ3MpIHtcclxuICAgICAgICAgICAgbGV0IFtpZCwgc2NhbGVdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwoaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHNjYWxlSW1hZ2UocmVwbCwgcGFuZWwsIHNjYWxlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnNjYWxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgIHNjYWxlSW1hZ2UocmVwbCwgcGFuZWwsIHRoaXMuc2NhbGUgKyBcIlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gXCIuLi9tb2RlbHMvRGljdGlvbmFyeVwiO1xyXG5cclxuY29uc3QgcGF0aHMgPSB7XHJcbiAgICBcInNjXCI6IFwiTTEwLDMwIEEyMCwyMCwwLDAsMSw1MCwzMCBBMjAsMjAsMCwwLDEsOTAsMzAgUTkwLDYwLDUwLDkwIFExMCw2MCwxMCwzMCBaXCJcclxufVxyXG5cclxuY29uc3Qgc3ZnSGFzaCA9IDxEaWN0aW9uYXJ5PFNWR1BhdGhFbGVtZW50Pj57fTtcclxuXHJcbmZ1bmN0aW9uIGdldFN2Z1BhdGgoa2V5OiBrZXlvZiAodHlwZW9mIHBhdGhzKSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHN2Z0hhc2hba2V5XTtcclxuICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdwYXRoJyk7XHJcbiAgICAgICAgcmVzdWx0LmlkID0ga2V5O1xyXG4gICAgICAgIHJlc3VsdC5zZXRBdHRyaWJ1dGUoXCJkXCIsIHBhdGhzW2tleV0pO1xyXG4gICAgICAgIHN2Z0hhc2hba2V5XSA9IHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDcm9wVG9TdGF0ZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICAgIGFib3V0KCkge1xyXG4gICAgICAgIHJldHVybiBgYXBwbGllcyBhbiBTVkcgZmlsdGVyIHRvIGFuIGltYWdlYDtcclxuICAgIH1cclxuXHJcbiAgICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBbdXNTdGF0ZUNvZGUsIC4uLmlkc10gPSBhcmdzLnNwbGl0KFwiIFwiKS5maWx0ZXIoKHYpID0+ICEhdik7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0cyA9IGlkcy5sZW5ndGggPyBpZHMubWFwKChpZCkgPT4gcmVwbC5zZWxlY3RQYW5lbChpZCkpIDogcmVwbC5wYW5lbHM7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IGdldFN2Z1BhdGgoXCJzY1wiKTtcclxuXHJcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKChwKSA9PiB7XHJcbiAgICAgICAgICAgIHAhLnBhbmVsLnN0eWxlLmNsaXBQYXRoID0gYHVybCgjaGVhcnQpYDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSBcIi4vY29udHJvbHMvVG9hc3RlclwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcCB9IGZyb20gXCIuL2NvbnRyb2xzL0RyYWdBbmREcm9wXCI7XHJcbmltcG9ydCB7IENvbW1hbmRzIH0gZnJvbSBcIi4vY29udHJvbHMvQ29tbWFuZHNcIjtcclxuaW1wb3J0IHsgSGVscENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9IZWxwXCI7XHJcbmltcG9ydCB7IFNwbGl0Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1NwbGl0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBBc3BlY3RSYXRpb0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Bc3BlY3RSYXRpb0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgQm9yZGVyQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0JvcmRlckNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhbmdlU3R5bGVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlU3R5bGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IEdvdG9Db21tYW5kRWRpdG9yQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTd2FwUGFuZWxzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kXCI7XHJcbmltcG9ydCB7IEdvdG9Db21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvR290b0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgVGV4dENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9UZXh0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBQYWRDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvUGFkQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RyYW5zbGF0ZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWFyZ2luQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01hcmdpbkNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWVyZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvTWVyZ2VDb21tYW5kXCI7XHJcbmltcG9ydCB7IEhpUmVzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0hpUmVzQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNb3ZlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01vdmVDb21tYW5kXCI7XHJcbmltcG9ydCB7IFJvdGF0ZVBhbmVsQ29tbWFuZCwgUm90YXRlSW1hZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlUm90YXRpb25Db21tYW5kXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0NoYW5nZVBvc2l0aW9uQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTdG9wQ29tbWFuZCwgVG9nZ2xlRm9jdXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvU3RvcENvbW1hbmRcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVycyB9IGZyb20gXCIuL2NvbnRyb2xzL0tleWJvYXJkSGFuZGxlcnNcIjtcclxuaW1wb3J0IHsgRXNjYXBlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0VzY2FwZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhbmdlRm9udFNpemVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kXCI7XHJcbmltcG9ydCB7IE9wZW5BbGJ1bXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RvciB9IGZyb20gXCIuL2JlaGF2aW9yL011bHRpU2VsZWN0b3JcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uQmVoYXZpb3IgfSBmcm9tIFwiLi9iZWhhdmlvci9Ob3RpZmljYXRpb25CZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBTY2FsZVBhbmVsQ29tbWFuZCwgU2NhbGVJbWFnZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmRcIjtcclxuaW1wb3J0IHtDcm9wVG9TdGF0ZUNvbW1hbmR9IGZyb20gXCIuL2NvbW1hbmRzL0Nyb3BUb1N0YXRlXCI7XHJcblxyXG4vKiogZ2xvYmFsIHZhcmlhYmxlcyAqL1xyXG5jb25zdCB0b2FzdGVyID0gbmV3IFRvYXN0ZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdGVyXCIpIGFzIEhUTUxFbGVtZW50KTtcclxuY29uc3QgY29tbWFuZHMgPSBuZXcgQ29tbWFuZHMoKTtcclxuY29uc3QgcmVwbCA9IG5ldyBSZXBsKGNvbW1hbmRzKTtcclxuY29uc3Qga2V5Ym9hcmRIYW5kbGVycyA9IG5ldyBLZXlib2FyZEhhbmRsZXJzKCk7XHJcbnJlcGwudXNlKG5ldyBNdWx0aVNlbGVjdG9yKCkpO1xyXG5yZXBsLnVzZShuZXcgTm90aWZpY2F0aW9uQmVoYXZpb3IodG9hc3RlcikpO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IEhlbHBDb21tYW5kKCksIHsga2V5OiBcIj9cIiwgYWJvdXQ6XCJIZWxwXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBFc2NhcGVDb21tYW5kKCksIHsga2V5OiBcIkVzY2FwZVwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlRm9udFNpemVDb21tYW5kKDEpLCB7IGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQoLTEpLCB7IGtleTogXCItXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU2NhbGVQYW5lbENvbW1hbmQoMS4wMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZVBhbmVsQ29tbWFuZCgxIC8gMS4wMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCItXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZUltYWdlQ29tbWFuZCgxLjAxKSwgeyBrZXk6IFwiK1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU2NhbGVJbWFnZUNvbW1hbmQoMSAvIDEuMDEpLCB7IGtleTogXCItXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgUm90YXRlSW1hZ2VDb21tYW5kKDEpLCB7IGtleTogXCIuXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoLTEpLCB7IGtleTogXCIsXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVQYW5lbENvbW1hbmQoMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCI+XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVQYW5lbENvbW1hbmQoLTEpLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiPFwiIH0pO1xyXG5cclxuLyoqIHZpbSBjb21tYW5kc1xyXG5UbyBtb3ZlIGxlZnQsIHByZXNzIGguXHJcblRvIG1vdmUgcmlnaHQsIHByZXNzIGwuXHJcblRvIG1vdmUgZG93biwgcHJlc3Mgai5cclxuVG8gbW92ZSB1cCwgcHJlc3Mgay5cclxuICovXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVQYW5lbENvbW1hbmQoeyB4OiAtMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93TGVmdFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeDogMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93UmlnaHRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHk6IDEgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJBcnJvd0Rvd25cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHk6IC0xIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dVcFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCh7IHg6IC0xIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93TGVmdFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeDogMSB9KSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCJBcnJvd1JpZ2h0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB5OiAxIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93RG93blwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeTogLTEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dVcFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcInRvcFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ0b3BcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJUXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJsZWZ0XCIsIHsgZGVsdGE6IDEsIHVuaXRzOiBcInB4XCIgfSksIHsga2V5OiBcImxcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImxlZnRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJMXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3R0b21cIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiYlwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm90dG9tXCIsIHsgZGVsdGE6IC0xLCB1bml0czogXCJweFwiIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQlwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwicmlnaHRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiclwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwicmlnaHRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJSXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwid2lkdGhcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwid1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwid2lkdGhcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJXXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiaFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiaGVpZ2h0XCIsIHsgZGVsdGE6IC0xLCB1bml0czogXCJweFwiIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiSFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFN3YXBQYW5lbHNDb21tYW5kKCksIHsgY3RybEtleTogdHJ1ZSwga2V5OiBcInNcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFN0b3BDb21tYW5kKCksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIgXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBHb3RvQ29tbWFuZEVkaXRvckNvbW1hbmQoKSwgeyBrZXk6IFwiY1wiLCBhYm91dDpcImdvdG8gY29tbWFuZHNcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRvZ2dsZUZvY3VzQ29tbWFuZCgpLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiIFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVG9nZ2xlRm9jdXNDb21tYW5kKCksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiIFwiIH0pO1xyXG5cclxuY29uc3QgZG5kID0gbmV3IERyYWdBbmREcm9wKHJlcGwsIGtleWJvYXJkSGFuZGxlcnMpO1xyXG5yZXBsLmRuZCA9IGRuZDtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgSGVscENvbW1hbmQoKSwgXCI/XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IE9wZW5BbGJ1bXNDb21tYW5kKCksIFwib3BlblwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQXNwZWN0UmF0aW9Db21tYW5kKCksIFwiYXNwZWN0XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IEJvcmRlckNvbW1hbmQoKSwgXCJib3JkZXJcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ3JvcFRvU3RhdGVDb21tYW5kKCksIFwiY2xpcFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBHb3RvQ29tbWFuZCgpLCBcImdvdG9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgSGlSZXNDb21tYW5kKCksIFwiaGlyZXNcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgTWFyZ2luQ29tbWFuZCgpLCBcIm1hcmdpblwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNZXJnZUNvbW1hbmQoKSwgXCJtZXJnZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNb3ZlQ29tbWFuZCgpLCBcIm1vdmVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgUGFkQ29tbWFuZCgpLCBcInBhZFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoKSwgXCJyb3RhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU2NhbGVQYW5lbENvbW1hbmQoKSwgXCJzY2FsZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBTd2FwUGFuZWxzQ29tbWFuZCgpLCBcInN3YXBcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3BsaXRDb21tYW5kKCksIFwic3BsaXRcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3RvcENvbW1hbmQoKSwgXCJzdG9wXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFRleHRDb21tYW5kKCksIFwidGV4dFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoKSwgXCJ0cmFuc2xhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKCksIFwicGFuXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFNjYWxlSW1hZ2VDb21tYW5kKCksIFwiem9vbVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJiYWNrZ3JvdW5kQ29sb3JcIiksIFwiYmdjXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCh7IHNlbGVjdG9yOiBcIi5jb2xsYWdlIC5wYW5lbC1jb250YWluZXIgLm92ZXJsYXlcIiB9KSwgXCJvdmVybGF5XCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJDb2xvclwiKSwgXCJiY1wiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BDb2xvclwiKSwgXCJiY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tQ29sb3JcIiksIFwiYmNiXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckxlZnRDb2xvclwiKSwgXCJiY2xcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmlnaHRDb2xvclwiKSwgXCJiY3JcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlcldpZHRoXCIsIHt1bml0czpcInB4XCJ9KSwgXCJid1wiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJCb3R0b21XaWR0aFwiKSwgXCJid2JcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wV2lkdGhcIiksIFwiYnd0XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckxlZnRXaWR0aFwiKSwgXCJid2xcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmlnaHRXaWR0aFwiKSwgXCJid3JcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcIm9wYWNpdHlcIiksIFwib3BhY2l0eVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJSYWRpdXNcIiksIFwiYnJcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wTGVmdFJhZGl1c1wiKSwgXCJicnRsXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCIpLCBcImJydHJcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiKSwgXCJicmJsXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzXCIpLCBcImJyYnJcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcIndpZHRoXCIsIHsgdW5pdHM6IFwiZW1cIiB9KSwgXCJ3aWR0aFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyB1bml0czogXCJweFwiIH0pLCBcImhlaWdodFwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiekluZGV4XCIpLCBcInpcIik7XHJcblxyXG50b2FzdGVyLnRvYXN0KFwiV2VsY29tZSFcIik7XHJcbmV4cG9ydCBsZXQgZ2xvYmFscyA9IHtcclxuICAgIGFsbG93U3BlZWNoUmVjb2duaXRpb246IGZhbHNlLFxyXG4gICAgZGVidWc6IHRydWUsXHJcbiAgICByZXBsLFxyXG4gICAgZG5kLFxyXG4gICAga2V5Ym9hcmRIYW5kbGVycyxcclxufVxyXG4iLCJpbXBvcnQgeyBMaXN0ZW5lciB9IGZyb20gXCIuLi9jb250cm9scy9MaXN0ZW5lclwiO1xyXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSBcIi4uL2dsb2JhbHNcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydCgpIHtcclxuICBsZXQgcmVwbCA9IGdsb2JhbHMucmVwbDtcclxuICBhd2FpdCByZXBsLnN0YXJ0dXAoKTtcclxuICBpZiAoZ2xvYmFscy5hbGxvd1NwZWVjaFJlY29nbml0aW9uKSB7XHJcbiAgICBsZXQgbGlzdGVuZXIgPSBuZXcgTGlzdGVuZXIoKTtcclxuICAgIGxpc3RlbmVyLmxpc3RlbigpO1xyXG4gICAgbGlzdGVuZXIub24oXCJzcGVlY2gtZGV0ZWN0ZWRcIiwgdmFsdWUgPT4geyByZXBsLmV4ZWN1dGVDb21tYW5kKHJlcGwucGFyc2VDb21tYW5kKHZhbHVlLnJlc3VsdCkpOyB9KTtcclxuICB9XHJcbiAgcmVwbC5nZXRQaG90b092ZXJsYXlzKCkuZm9yRWFjaChvdmVybGF5ID0+IHtcclxuICAgIGdsb2JhbHMuZG5kLmRyYWdnYWJsZShvdmVybGF5KTtcclxuICAgIGNvbnNvbGUubG9nKGAke292ZXJsYXkuaW5uZXJIVE1MfSBpcyBkcmFnZ2FibGVgKTtcclxuICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBzdGFydCB9IGZyb20gXCIuL2NvbGxhZ2UvZnVuL3N0YXJ0XCI7XHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi9jb2xsYWdlL2dsb2JhbHNcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcclxuICAgIHN0YXJ0KCk7XHJcblxyXG4gICAgY29uc3QgcmVwbCA9IGdsb2JhbHMucmVwbDtcclxuXHJcbiAgICByZXBsLmV2YWwoXCJhc3BlY3QgNiA2XCIpO1xyXG4gICAgaWYgKGdsb2JhbHMuZGVidWcpIHtcclxuICAgICAgICByZXBsLmV2YWwoXCI/XCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcInNwbGl0IDFcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgNCAzXCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcInNwbGl0IDJcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgNCA1XCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcIm1lcmdlIDIgM1wiKTtcclxuICAgICAgICAvLy9yZXBsLmV2YWwoXCJzcGxpdCAxXCIpO1xyXG5cclxuICAgICAgICByZXBsLmV2YWwoXCJidyAxZW1cIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYmMgd2hpdGVcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYmdjIHNpbHZlclwiKTtcclxuICAgICAgICByZXBsLmV2YWwoXCJjbGlwIGhlYXJ0IDFcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwic2NhbGUgMSAwLjc1XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcImJvcmRlciAxIDMgc2lsdmVyXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInJvdGF0ZSAxIC0yXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInpvb20gMiAwLjVcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwic3BsaXQgMVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJtZXJnZSAxIDJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwic3BsaXQgNlwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJtZXJnZSA4IDlcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwibWVyZ2UgNiA3XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcImdvdG8gMVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJ0ZXh0IDEgU3VtbWVyIDIwMTlcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGF3YWl0IHJlcGwuZXZhbChcIm9wZW4gRGF0ZSBOaWdodCwyMDE5XCIpOyAvLyBwcmVzZW50IGxpc3Qgb2YgZ29vZ2xlIHBob3RvIGFsYnVtcz9cclxuICAgICAgICAvL2F3YWl0IHJlcGwuZXZhbChcIm9wZW4gZ3AgMTk5OVwiKTsgLy8gb3BlbiBnb29nbGUgcGhvdG8gYWxidW0gXCIxOTk5XCI/XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWxDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29sbGFnZSAucGFuZWxcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgcGhvdG9Db3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29sbGFnZSAucGhvdG9zIC5pbWdcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYW5lbENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlcGwuZXZhbChgbW92ZSAkezEgKyAoaSAtIDEpICUgcGhvdG9Db3VudH0gJHtpfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHJlcGwuZXZhbChcIm9wZW4gMVwiKTtcclxuICAgICAgICAgICAgLy8gcmVwbC5ldmFsKFwiaGlyZXMgNlwiKTtcclxuICAgICAgICAgICAgLy8gcmVwbC5ldmFsKFwiZXhwb3J0XCIpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5ydW4oKTtcclxuIl19
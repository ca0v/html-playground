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
    const textarea = document.createElement("textarea");
    function escape(value) {
        textarea.innerText = value;
        return textarea.value;
    }
    class HelpCommand {
        execute(repl, args) {
            const commands = globals_2.globals.repl.commands.list().map(name => ({ command: globals_2.globals.repl.commands.get(name), name }));
            const keyboardCommands = globals_2.globals.keyboardHandlers.list();
            const markup1 = commands.map(c => `<option value="${c.name}">"${c.name}" - ${c.command.about && c.command.about()}</option>`).sort().join("");
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
        about() {
            var _a, _b;
            return `change style ${this.target} by ${(_a = this.options) === null || _a === void 0 ? void 0 : _a.delta} ${(_b = this.options) === null || _b === void 0 ? void 0 : _b.units}`;
        }
        keyboardHandler(repl) {
            return repl.panels
                .filter(p => p.panel.classList.contains("focus"))
                .some(panel => {
                var _a, _b, _c, _d;
                let target = panel.panel;
                const style = getComputedStyle(target);
                let value = parseFloat(style[this.target]) + ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.delta) !== null && _b !== void 0 ? _b : 0);
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChangeFontSizeCommand = void 0;
    class ChangeFontSizeCommand {
        constructor(delta) {
            this.delta = delta;
        }
        about() {
            return `increase font by ${this.delta}px`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xsYWdlL21vZGVscy9EaWN0aW9uYXJ5LnRzIiwiY29sbGFnZS9jb250cm9scy9MaXN0ZW5lci50cyIsImNvbGxhZ2UvY29udHJvbHMvVG9hc3Rlci50cyIsImNvbGxhZ2UvZnVuL3RhaWwudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRQYXJzZXIudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQaG90by50cyIsImNvbGxhZ2UvbW9kZWxzL0dvb2dsZU1lZGlhSXRlbS50cyIsImNvbGxhZ2UvY29udHJvbHMvR29vZ2xlQ29sbGFnZVBob3RvLnRzIiwiY29sbGFnZS9jb250cm9scy9TcHJpdGUudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbC50cyIsImNvbGxhZ2UvY29udHJvbHMvQW5pbWF0aW9ucy50cyIsImNvbGxhZ2UvbW9kZWxzL0NvbW1hbmQudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRzLnRzIiwiY29sbGFnZS9mdW4vZ2V0QWN0aXZlT3ZlcmxheS50cyIsImNvbGxhZ2UvbW9kZWxzL0tleWJvYXJkSGFuZGxlci50cyIsImNvbGxhZ2UvY29udHJvbHMvS2V5Ym9hcmRIYW5kbGVycy50cyIsImNvbGxhZ2UvZnVuL3RyYW5zZm9ybS50cyIsImNvbGxhZ2UvZnVuL2Jib3gudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0RyYWdBbmREcm9wLnRzIiwiY29sbGFnZS9tb2RlbHMvQmVoYXZpb3IudHMiLCJjb2xsYWdlL2NvbnRyb2xzL1JlcGwudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hlbHAudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1NwbGl0Q29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQXNwZWN0UmF0aW9Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Cb3JkZXJDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTdHlsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvZ2V0Rm9jdXNQYW5lbHMudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Hb3RvQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvVGV4dENvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1BhZENvbW1hbmQudHMiLCJjb2xsYWdlL2Z1bi9pc1Zpc2libGUudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9UcmFuc2xhdGVDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NYXJnaW5Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NZXJnZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hpUmVzQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvTW92ZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0NoYW5nZVJvdGF0aW9uQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlUG9zaXRpb25Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9TdG9wQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvRXNjYXBlQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlUGhvdG9BUEkudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3RvU2lnbmluLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlQWxidW0udHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3Rvcy50cyIsImNvbGxhZ2UvY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmQudHMiLCJjb2xsYWdlL2JlaGF2aW9yL011bHRpU2VsZWN0b3IudHMiLCJjb2xsYWdlL2JlaGF2aW9yL05vdGlmaWNhdGlvbkJlaGF2aW9yLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2dsb2JhbHMudHMiLCJjb2xsYWdlL2Z1bi9zdGFydC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lDQ0E7O09BRUc7SUFDSCxNQUFhLFFBQVE7UUFJbkI7WUFGQSxZQUFPLEdBQVksSUFBSSxDQUFDO1lBQ3hCLGNBQVMsR0FBWSxJQUFJLENBQUM7WUFrQ2xCLGVBQVUsR0FHSCxFQUFFLENBQUM7WUFuQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBVSxNQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRSxDQUFDO1lBQ2xFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbkMsV0FBVyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDbkMsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDL0IsV0FBVyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDM0IsV0FBVyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDaEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxJQUFJLENBQUMsU0FBUztvQkFDaEIsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUs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Q0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM3RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM1RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRTNHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHdDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDOUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDOUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDN0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUU1RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDekcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxSCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzSCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDNUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM3SCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUU1SCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1SCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDNUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksdUNBQWtCLENBQUMsUUFBUSxFQUFFLEVBQUUs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QUNELHVCQUF1QjtnQkFDdkIsd0JBQXdCO2dCQUN4Qix1QkFBdUI7WUFDM0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1o7SUFDTCxDQUFDO0lBRUQsR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogT25lIGJpZyBoYXBweSBmYW1pbHkgb2YgY2xhc3NlcyB0byBhdm9pZCBsb2FkaW5nXHJcbiAqIGFuZCBjb25jYXRpbmF0aW9uXHJcbiAqL1xyXG4vKiogSW50ZXJmYWNlcyAgKi9cclxuZXhwb3J0IGludGVyZmFjZSBEaWN0aW9uYXJ5PFQ+IHtcclxuICBbS2V5OiBzdHJpbmddOiBUO1xyXG59XHJcbiIsImltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tIFwiLi4vbW9kZWxzL0RpY3Rpb25hcnlcIjtcclxuLyoqXHJcbiAqIEdvb2dsZSBzcGVlY2ggcmVjb2duaXRpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBMaXN0ZW5lciB7XHJcbiAgcmVjb2duaXRpb246IFNwZWVjaFJlY29nbml0aW9uO1xyXG4gIHN0b3BwZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGF1dG9zdGFydDogYm9vbGVhbiA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJlY29nbml0aW9uID0gbmV3ICg8YW55PndpbmRvdylbXCJ3ZWJraXRTcGVlY2hSZWNvZ25pdGlvblwiXSgpO1xyXG4gICAgbGV0IHJlY29nbml0aW9uID0gdGhpcy5yZWNvZ25pdGlvbjtcclxuICAgIHJlY29nbml0aW9uLmludGVyaW1SZXN1bHRzID0gZmFsc2U7XHJcbiAgICByZWNvZ25pdGlvbi5jb250aW51b3VzID0gZmFsc2U7XHJcbiAgICByZWNvZ25pdGlvbi5sYW5nID0gXCJlbi1QSFwiO1xyXG4gICAgcmVjb2duaXRpb24ubWF4QWx0ZXJuYXRpdmVzID0gNTtcclxuICAgIHJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJzdGFydFwiLCBlID0+IHtcclxuICAgICAgdGhpcy5zdG9wcGVkID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRcIiwgZSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5hdXRvc3RhcnQpXHJcbiAgICAgICAgcmVjb2duaXRpb24uc3RhcnQoKTtcclxuICAgIH0pO1xyXG4gICAgcmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcInJlc3VsdFwiLCBlID0+IHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlLnJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gZS5yZXN1bHRzW2ldO1xyXG4gICAgICAgIGlmIChyZXN1bHQuaXNGaW5hbCkge1xyXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zY3JpcHQgPSByZXN1bHRbal0udHJhbnNjcmlwdDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codHJhbnNjcmlwdCwgcmVzdWx0W2pdKTtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZGVuY2UgPSByZXN1bHRbal0uY29uZmlkZW5jZTtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwic3BlZWNoLWRldGVjdGVkXCIsIHtcclxuICAgICAgICAgICAgICByZXN1bHQ6IHRyYW5zY3JpcHQsXHJcbiAgICAgICAgICAgICAgcG93ZXI6IGNvbmZpZGVuY2UgKiAxMDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBwcml2YXRlIF9jYWxsYmFja3M6IERpY3Rpb25hcnk8QXJyYXk8KHZhbHVlOiB7XHJcbiAgICByZXN1bHQ6IHN0cmluZztcclxuICAgIHBvd2VyOiBudW1iZXI7XHJcbiAgfSkgPT4gdm9pZD4+ID0ge307XHJcbiAgcHJpdmF0ZSBjYWxsYmFja3ModG9waWM6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1t0b3BpY10gPSB0aGlzLl9jYWxsYmFja3NbdG9waWNdID8/IFtdO1xyXG4gIH1cclxuICBvbih0b3BpYzogc3RyaW5nLCBjYjogKHZhbHVlOiB7XHJcbiAgICByZXN1bHQ6IHN0cmluZztcclxuICAgIHBvd2VyOiBudW1iZXI7XHJcbiAgfSkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5jYWxsYmFja3ModG9waWMpLnB1c2goY2IpO1xyXG4gIH1cclxuICB0cmlnZ2VyKHRvcGljOiBzdHJpbmcsIHZhbHVlOiB7XHJcbiAgICByZXN1bHQ6IHN0cmluZztcclxuICAgIHBvd2VyOiBudW1iZXI7XHJcbiAgfSkge1xyXG4gICAgdGhpcy5jYWxsYmFja3ModG9waWMpLmZvckVhY2goY2IgPT4gY2IodmFsdWUpKTtcclxuICB9XHJcbiAgbGlzdGVuKCkge1xyXG4gICAgaWYgKHRoaXMuc3RvcHBlZClcclxuICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCBtZXNzYWdlRHVyYXRpb24gPSA1MDAwO1xyXG5jb25zdCBmYWRlRGVsYXkgPSAxNTAwO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmFkZU91dChub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChnb29kLCBiYWQpID0+IHtcclxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoXCJmYWRlLW91dFwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGdvb2Qobm9kZSksIGZhZGVEZWxheSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvYXN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRhcmdldDogSFRNTEVsZW1lbnQpIHsgXHJcbiAgICAgICAgQXJyYXkuZnJvbSh0YXJnZXQucXVlcnlTZWxlY3RvckFsbChcIi50b2FzdFwiKSkubWFwKHQgPT4gdGhpcy5kZXN0cm95VG9hc3QodCBhcyBIVE1MRWxlbWVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0KG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlLW91dFwiKTtcclxuICAgICAgICBsZXQgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRvYXN0LmNsYXNzTGlzdC5hZGQoXCJ0b2FzdFwiKTtcclxuICAgICAgICB0b2FzdC5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0Lmluc2VydEJlZm9yZSh0b2FzdCwgdGhpcy50YXJnZXQuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kZXN0cm95VG9hc3QodG9hc3QpLCBtZXNzYWdlRHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRlc3Ryb3lUb2FzdCh0b2FzdDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBhd2FpdCBmYWRlT3V0KHRvYXN0KTtcclxuICAgICAgICB0b2FzdC5yZW1vdmUoKTtcclxuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIudG9hc3RcIikpIGZhZGVPdXQodGhpcy50YXJnZXQpO1xyXG4gICAgfVxyXG59IiwiLyoqIEdsb2JhbCBGdW5jdGlvbnMgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRhaWwodmFsdWU6IHN0cmluZykge1xyXG4gIGxldCBsaXN0ID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xyXG4gIGxpc3Quc2hpZnQoKTtcclxuICByZXR1cm4gbGlzdC5qb2luKFwiIFwiKTtcclxufVxyXG4iLCIvKiogR2xvYmFsIENsYXNzZXMgKi9cclxuLyoqXHJcbiAqIFRyeSB0byB0dXJuIGEgc3Bva2VuIHBocmFzZSBpbnRvIGEgY29tbWFuZCBncmFtbWFyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tbWFuZFBhcnNlciB7XHJcbiAgcGFyc2VQaHJhc2UocGhyYXNlOiBzdHJpbmcpIHtcclxuICAgIHBocmFzZSA9IHBocmFzZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IG1hcCA9IDxhbnk+e1xyXG4gICAgICBcInpvb20gaW5cIjogXCJ6b29tXCIsXHJcbiAgICAgIFwiem9vbSBvdXRcIjogXCJ6b29tXCIsXHJcbiAgICAgIFwiZHJhZ1wiOiBcInBhblwiLFxyXG4gICAgICBcIm51bWJlciBmb3JcIjogXCI0XCIsXHJcbiAgICAgIFwibnVtYmVyXCI6IFwiXCIsXHJcbiAgICAgIFwiZnJhbWVcIjogXCJcIixcclxuICAgICAgXCJwaG90b1wiOiBcIlwiLFxyXG4gICAgICBcIm9uZVwiOiBcIjFcIixcclxuICAgICAgXCJ0d29cIjogXCIyXCIsXHJcbiAgICAgIFwidGhyZWVcIjogXCIzXCIsXHJcbiAgICAgIFwiZm91clwiOiBcIjRcIixcclxuICAgICAgXCJmaXZlXCI6IFwiNVwiLFxyXG4gICAgICBcInNpeFwiOiBcIjZcIixcclxuICAgICAgXCJzZXZlblwiOiBcIjdcIixcclxuICAgICAgXCJlaWdodFwiOiBcIjhcIixcclxuICAgICAgXCJuaW5lXCI6IFwiOVwiLFxyXG4gICAgICBcImludG9cIjogXCJcIixcclxuICAgICAgXCJvblwiOiBcIlwiLFxyXG4gICAgICBcImFuZFwiOiBcIlwiLFxyXG4gICAgICBcInBpY3R1cmVcIjogXCJcIixcclxuICAgICAgXCJnbyB0b1wiOiBcImdvdG9cIixcclxuICAgICAgXCItXCI6IFwiIFwiLFxyXG4gICAgfTtcclxuICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaCh2ID0+IHBocmFzZSA9IHBocmFzZS5yZXBsYWNlKHYsIG1hcFt2XSkpO1xyXG4gICAgbGV0IHRva2VucyA9IHBocmFzZS5zcGxpdChcIiBcIik7XHJcbiAgICB0b2tlbnMgPSB0b2tlbnMubWFwKHYgPT4gbWFwW3ZdID8/IHYpLmZpbHRlcih2ID0+ICEhdik7XHJcbiAgICByZXR1cm4gdG9rZW5zLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogS2VlcHMgdGhlIGdvb2dsZSBtZWRpYSBpbmZvIGFuZCBoYXMgaGVscGVyIGZ1bmN0aW9uc1xyXG4gKiB0byB1cGdyYWRlIHRoZSBsby1yZXMgdG8gaGktcmVzIHZlcnNpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2xsYWdlUGhvdG88VE1lZGlhSW5mbz4ge1xyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlTWVkaWFJdGVtIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgcHJvZHVjdFVybDogc3RyaW5nO1xyXG4gIGJhc2VVcmw6IHN0cmluZztcclxuICBtaW1lVHlwZTogc3RyaW5nO1xyXG4gIG1lZGlhTWV0YWRhdGE6IGFueTtcclxuICBjb250cmlidXRvckluZm86IGFueTtcclxuICBmaWxlbmFtZTogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IENvbGxhZ2VQaG90byB9IGZyb20gXCIuL0NvbGxhZ2VQaG90b1wiO1xyXG5pbXBvcnQgeyBHb29nbGVNZWRpYUl0ZW0gfSBmcm9tIFwiLi4vbW9kZWxzL0dvb2dsZU1lZGlhSXRlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUNvbGxhZ2VQaG90byBleHRlbmRzIENvbGxhZ2VQaG90bzxHb29nbGVNZWRpYUl0ZW0+IHtcclxuICBwdWJsaWMgaW1nOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhSW5mbzogR29vZ2xlTWVkaWFJdGVtKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgbGV0IGltZyA9IHRoaXMuaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiaW1nXCIpO1xyXG4gICAgaW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt0aGlzLm1lZGlhSW5mby5iYXNlVXJsfSlgO1xyXG4gICAgaW1nLnRpdGxlID0gbWVkaWFJbmZvLmZpbGVuYW1lO1xyXG4gIH1cclxuICBcclxuICByZW5kZXJJbnRvKHRhcmdldDogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmltZyk7XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBuZXcgR29vZ2xlQ29sbGFnZVBob3RvKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tZWRpYUluZm8pKSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBNYW5hZ2VzIGltYWdlIHN0eWxlLnRyYW5zZm9ybSBieSBwZXJzaXN0aW5nXHJcbiAqIHRoZSBzY2FsZSBhbmQgcm90YXRpb24gdG8gZmFjaWxpdGF0ZSBjb21wdXRpbmcgdHJhbnNmb3Jtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNwcml0ZSB7XHJcbiAgcHVibGljIHg6IG51bWJlcjtcclxuICBwdWJsaWMgeTogbnVtYmVyO1xyXG4gIHB1YmxpYyByOiBudW1iZXI7XHJcbiAgcHVibGljIHM6IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQpIHtcclxuICAgIHRoaXMueCA9IHRoaXMueSA9IHRoaXMuciA9IDA7XHJcbiAgICB0aGlzLnMgPSAxO1xyXG4gIH1cclxuICB0cmFuc2Zvcm0oYXJnczoge1xyXG4gICAgZHg/OiBudW1iZXI7XHJcbiAgICBkeT86IG51bWJlcjtcclxuICAgIHNjYWxlPzogbnVtYmVyO1xyXG4gICAgYW5nbGU/OiBudW1iZXI7XHJcbiAgfSkge1xyXG4gICAgdGhpcy54ICs9IChhcmdzLmR4IHx8IDApO1xyXG4gICAgdGhpcy55ICs9IChhcmdzLmR5IHx8IDApO1xyXG4gICAgdGhpcy5yICs9IChhcmdzLmFuZ2xlIHx8IDApO1xyXG4gICAgdGhpcy5zICo9IChhcmdzLnNjYWxlIHx8IDEuMCk7XHJcbiAgICB0aGlzLmltYWdlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLnh9cHgsJHt0aGlzLnl9cHgpIHJvdGF0ZSgke3RoaXMucn1kZWcpIHNjYWxlKCR7dGhpcy5zfSlgO1xyXG4gIH1cclxuICB0cmFuc2xhdGUoZHg6IG51bWJlciwgZHk6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgZHgsIGR5IH0pO1xyXG4gIH1cclxuICByb3RhdGUoYW5nbGU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgYW5nbGUgfSk7XHJcbiAgfVxyXG4gIHNjYWxlKHNjYWxlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSh7IHNjYWxlIH0pO1xyXG4gIH1cclxuICAvLyBtb2RpZnkgdGhlIHBpeGVsIGRlbnNpdHkgb2YgdGhlIGltYWdlXHJcbiAgLy8gdXNlZnVsIHdoZW4gdXNpbmcgZ29vZ2xlIHBob3RvcyBBUEkgdG8gXHJcbiAgLy8gcmVxdWVzdCBoaWdoZXIgcmVzb2x1dGlvbiBwaG90b3NcclxuICB1cHNjYWxlKHNjYWxlOiBudW1iZXIpIHtcclxuICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5pbWFnZSk7XHJcbiAgICBsZXQgd2lkdGggPSBwYXJzZUZsb2F0KHN0eWxlLndpZHRoKTtcclxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUZsb2F0KHN0eWxlLmhlaWdodCk7XHJcbiAgICB0aGlzLnNjYWxlKDEgLyBzY2FsZSk7XHJcbiAgICB0aGlzLmltYWdlLnN0eWxlLndpZHRoID0gc2NhbGUgKiB3aWR0aCArIFwicHhcIjtcclxuICAgIHRoaXMuaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gc2NhbGUgKiBoZWlnaHQgKyBcInB4XCI7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZSh3aWR0aCAvIDIgLSB3aWR0aCAqIHNjYWxlIC8gMiwgaGVpZ2h0IC8gMiAtIGhlaWdodCAqIHNjYWxlIC8gMik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEdvb2dsZUNvbGxhZ2VQaG90byB9IGZyb20gXCIuL0dvb2dsZUNvbGxhZ2VQaG90b1wiO1xyXG5pbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi9TcHJpdGVcIjtcclxuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gXCIuLi9nbG9iYWxzXCI7XHJcblxyXG4vKipcclxuICogTWFuYWdlcyBhIHNpbmdsZSBpbWFnZSBvbiB0aGUgY29sbGFnZSwgXHJcbiAqIG5vdCB0byBiZSBjb25mdXNlZCB3aXRoIGFuIFBob3RvIG9uIHRoZSBhbGJ1bVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbGxhZ2VQYW5lbCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcGFuZWwgY29udGFpbnMgYSBzaW5nbGUgcGhvdG8gKHRoaXMgb25lKVxyXG4gICAqL1xyXG4gIHB1YmxpYyBwaG90bzogR29vZ2xlQ29sbGFnZVBob3RvIHwgbnVsbDtcclxuXHJcbiAgLy8gdGhlIGFjdHVhbCBpbWFnZSByZW5kZXJlZCBvbiB0aGUgcGFuZWxcclxuICBwdWJsaWMgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgcHVibGljIHNwcml0ZTogU3ByaXRlO1xyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gcGFuZWwgZG9tIGVsZW1lbnQgdG8gY29udHJvbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYW5lbDogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgIHRoaXMucGhvdG8gPSBudWxsO1xyXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUodGhpcy5pbWFnZSk7XHJcbiAgICB0aGlzLmltYWdlLmNsYXNzTGlzdC5hZGQoXCJpbWdcIik7XHJcbiAgICB0aGlzLmltYWdlLmRyYWdnYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmltYWdlKTtcclxuICAgIHRoaXMuYXNQYW5lbCh0aGlzLnBhbmVsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBwaG90byByZW5kZXJzIHRoaXMgcGhvdG8gb250byB0aGUgcGFuZWxcclxuICAgKi9cclxuICBhZGRQaG90byhwaG90bzogR29vZ2xlQ29sbGFnZVBob3RvKSB7XHJcbiAgICB0aGlzLnBob3RvID0gcGhvdG87XHJcbiAgICB0aGlzLnNldEJhY2tncm91bmRJbWFnZShwaG90by5tZWRpYUluZm8uYmFzZVVybCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb21wdXRlcyB0aGUgd2lkdGggb2YgdGhlIHBob3RvIGRpc3BsYXkgYXJlYVxyXG4gICAqL1xyXG4gIGdldCBwaG90b1dpZHRoKCkge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuaW1hZ2UpLndpZHRoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbXB1dGVzIHRoZSBoZWlnaHQgb2YgdGhlIHBob3RvIGRpc3BsYXkgYXJlYVxyXG4gICAqL1xyXG4gIGdldCBwaG90b0hlaWdodCgpIHtcclxuICAgIHJldHVybiBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmltYWdlKS5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29tcHV0ZXMgdGhlIHNjYWxlIG9mIHRoZSBwaG90bywgYXNzdW1lcyBhc3BlY3QgcmF0aW8gaXMgcHJlc2VydmVkIChhdCBsZWFzdCB0aGUgd2lkdGggb3IgaGVpZ2h0IGlzICdhdXRvJylcclxuICAgKi9cclxuICBnZXQgcGhvdG9TY2FsZSgpIHtcclxuICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuaW1hZ2UpO1xyXG4gICAgbGV0IHNjYWxlID0gc3R5bGUuaGVpZ2h0O1xyXG4gICAgaWYgKHNjYWxlID09PSBcImF1dG9cIikgcmV0dXJuIDEuMDtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxlKSAvIDEwMC4wO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmV0dXJuIHRoZSBwYW5lbCBvdmVybGF5IChkb2VzIG5vdCBiZWxvbmcgaGVyZSlcclxuICAgKi9cclxuICBnZXQgb3ZlcmxheSgpIHtcclxuICAgIHJldHVybiB0aGlzLnBhbmVsLnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgdGV4dCBhcyBhbiBpbnB1dCBjb250cm9sIG9uIHRoZSBwYW5lbFxyXG4gICAqIExhYmVsIGlzIGFic29sdXRlbHkgcG9zaXRpb25lZCBhbmQgY2FuIG1vdmUgb3V0c2lkZSB0aGUgYm91bmRzIG9mIHRoaXMgcGFuZWxcclxuICAgKiBzbyBwcm9iYWJseSBkb2Vzbid0IGJlbG9uZyBoZXJlXHJcbiAgICovXHJcbiAgc2V0IHRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG4gICAgbGFiZWwucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgbGFiZWwudGl0bGUgPSBcIjFcIjtcclxuICAgIGxhYmVsLnN0eWxlLnRvcCA9IGxhYmVsLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoXCJsYWJlbFwiKTtcclxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgbGFiZWwudmFsdWUgPSB2YWx1ZTtcclxuICAgIGdsb2JhbHMuZG5kLm1vdmVhYmxlKGxhYmVsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgcGFuZWwgZnJvbSB0aGUgZG9tXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMucGFuZWwucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICogXHJcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kSW1hZ2UgdGhlIHVybCBvZiB0aGUgaW1hZ2UgdG8gZGlzcGxheSBpbiB0aGlzIHBhbmVsXHJcbiAqL1xyXG4gIHNldEJhY2tncm91bmRJbWFnZShiYWNrZ3JvdW5kSW1hZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5pbWFnZS5zcmMgPSBiYWNrZ3JvdW5kSW1hZ2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdHlsZSB0aGUgZnJhbWVcclxuICAgKiBAcGFyYW0gd2lkdGggYm9yZGVyIHdpZHRoIGluIFwiZW1cIlxyXG4gICAqL1xyXG4gIGJvcmRlcih3aWR0aDogc3RyaW5nLCBjb2xvciA9IFwid2hpdGVcIikge1xyXG4gICAgdGhpcy5wYW5lbC5zdHlsZS5ib3JkZXIgPSBgJHt3aWR0aH1lbSBzb2xpZCAke2NvbG9yfWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIFJvdGF0ZSB0aGUgYWN0dWFsIGZyYW1lXHJcbiAgKiBAcGFyYW0gYW5nbGUgYW5nbGUgaW4gZGVncmVlc1xyXG4gICovXHJcbiAgcm90YXRlRnJhbWUoYW5nbGU6IHN0cmluZykge1xyXG4gICAgbGV0IG5vZGUgPSB0aGlzLnBhbmVsO1xyXG4gICAgaWYgKCFub2RlKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBpZiAoISFhbmdsZSkge1xyXG4gICAgICB0aGlzLnRyYW5zZm9ybV9ub2RlKGByb3RhdGUoJHthbmdsZX1kZWcpYCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbGV0IGFuZ2xlID0gMDtcclxuICAgICAgbGV0IHRyYW5zZm9ybSA9IG5vZGUuc3R5bGUudHJhbnNmb3JtO1xyXG4gICAgICBsZXQgYW5pbWF0aW9ucyA9IGdsb2JhbHMucmVwbC5hbmltYXRpb25zO1xyXG4gICAgICBhbmltYXRpb25zLmFuaW1hdGUoXCJyb3RhdGVcIiwgKCkgPT4ge1xyXG4gICAgICAgIGFuZ2xlICs9IDE7XHJcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm0gKyBgIHJvdGF0ZSgke2FuZ2xlfWRlZylgO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNjYWxlRnJhbWUoc2NhbGU6IHN0cmluZykge1xyXG4gICAgdGhpcy50cmFuc2Zvcm1fbm9kZShgc2NhbGUoJHtzY2FsZX0sICR7c2NhbGV9KWApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFuc2Zvcm1fbm9kZSh2OiBzdHJpbmcpIHtcclxuICAgIGxldCBub2RlID0gdGhpcy5wYW5lbDtcclxuICAgIGxldCB0cmFuc2Zvcm0gPSAobm9kZS5zdHlsZS50cmFuc2Zvcm0gfHwgXCJcIikuc3BsaXQoXCIgXCIpO1xyXG4gICAgdHJhbnNmb3JtLnVuc2hpZnQodik7XHJcbiAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybS5qb2luKFwiIFwiKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBhc1BhbmVsKGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwYW5lbFwiKTtcclxuICAgIGVsZW1lbnQudGFiSW5kZXggPSAxO1xyXG4gICAgbGV0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcclxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICogcnVucyBhbiBhbmltYXRpb24gb24gYW4gaW50ZXJ2YWwsIHJldHVybnMgc3RvcCgpXHJcbiAqIFVzZWQgZm9yIHBhbm5pbmcsIHpvb21pbmcsIHJvdGF0aW5nXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9ucyB7XHJcbiAgYW5pbWF0aW9uczogQXJyYXk8e1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgaGFuZGxlOiBudW1iZXI7XHJcbiAgfT4gPSBbXTtcclxuICBcclxuICBzdG9wKHR5cGU6IHN0cmluZykge1xyXG4gICAgbGV0IGFuaW1hdGlvbnMgPSB0aGlzLmFuaW1hdGlvbnMubWFwKHYgPT4gdik7IC8vY2xvbmVcclxuICAgIGFuaW1hdGlvbnMuZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICBpZiAoIXR5cGUgfHwgdi50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh2LmhhbmRsZSk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnNwbGljZShpLCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlKHR5cGU6IHN0cmluZywgY2I6ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKHsgdHlwZSwgaGFuZGxlOiBzZXRJbnRlcnZhbChjYiwgMTAwKSB9KTtcclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kIHtcclxuICBhYm91dD8oKTogc3RyaW5nO1xyXG4gIC8vIHJldHVybiBmYWxzZSB0byBzaWduYWwgdGhlIGNvbW1hbmQgd2FzIG5vdCBoYW5kbGVkXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHwgUHJvbWlzZTx2b2lkIHwgZmFsc2U+O1xyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSBcIi4uL21vZGVscy9EaWN0aW9uYXJ5XCI7XHJcblxyXG4vKipcclxuICogS2VlcHMgaGFzaCBvZiBjb21tYW5kc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbW1hbmRzIHtcclxuICAgIG5hbWVPZihjb21tYW5kOiBDb21tYW5kKSB7XHJcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKTtcclxuICAgICAgY29uc3QgaSA9IGtleXMuZmluZEluZGV4KGsgPT4gdGhpcy5jb21tYW5kc1trXS5leGVjdXRlID09PSBjb21tYW5kLmV4ZWN1dGUpO1xyXG4gICAgICByZXR1cm4gLTE8aSA/IGtleXNbaV06bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbW1hbmRzOiBEaWN0aW9uYXJ5PENvbW1hbmQ+ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyB0aGUgY29tbWFuZCBhc3NvY2lhdGVkIHdpdGggdGhlIGFjdGlvbiBrZXl3b3JkXHJcbiAgICAgKiBAcGFyYW0gdmVyYiB0aGUgZnVsbCBuYW1lIG9mIHRoZSBhY3Rpb24ga2V5d29yZCBvciBhIHBhcnRpYWwgbWF0Y2hcclxuICAgICAqL1xyXG4gICAgZ2V0KHZlcmI6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbW1hbmRzW3ZlcmJdKSByZXR1cm4gdGhpcy5jb21tYW5kc1t2ZXJiXTtcclxuICAgICAgICB2YXIga2V5ID0gT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykuZmluZCh2ID0+IHYuc3RhcnRzV2l0aCh2ZXJiKSk7XHJcbiAgICAgICAgcmV0dXJuIGtleSAmJiB0aGlzLmNvbW1hbmRzW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzL3JlcGxhY2VzIGNvbW1hbmQgYXNzb2NpYXRlZCB3aXRoIGFuIGFjdGlvbiBrZXl3b3JkXHJcbiAgICAgKiBAcGFyYW0gY29tbWFuZCBjb21tYW5kIHRvIHByb2Nlc3MgdGhlIGFjdGlvblxyXG4gICAgICogQHBhcmFtIHZlcmIgYWN0aW9uIHRvIGFzc29jaWF0ZSB3aXRoIGEgY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBhZGQoY29tbWFuZDogQ29tbWFuZCwgdmVyYjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kc1t2ZXJiXSA9IGNvbW1hbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdCgpIHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlT3ZlcmxheSgpIHtcclxuICBsZXQgYWN0aXZlUGFuZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gIGlmICghYWN0aXZlUGFuZWwpIHtcclxuICAgIGNvbnNvbGUubG9nKFwibm8gYWN0aXZlIHBhbmVsXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICByZXR1cm4gYWN0aXZlUGFuZWwucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpIGFzIEhUTUxFbGVtZW50O1xyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgS2V5Ym9hcmRIYW5kbGVyIHtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgc2hpZnRLZXk6IGJvb2xlYW47XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBrZXk6IHN0cmluZztcclxuICBhYm91dD86IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkSGFuZGxlciB9IGZyb20gXCIuLi9tb2RlbHMvS2V5Ym9hcmRIYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRIYW5kbGVycyB7XHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXJzOiBBcnJheTx7bWF0Y2g6IEtleWJvYXJkSGFuZGxlcjsgY29tbWFuZDogQ29tbWFuZH0+ID0gW107XHJcblxyXG4gIGdldEV2ZW50SGFuZGxlcnMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIHJldHVybiB0aGlzLmtleWJvYXJkSGFuZGxlcnMuZmlsdGVyKGhhbmRsZXIgPT4ge1xyXG4gICAgICBsZXQgbWF0Y2ggPSBoYW5kbGVyLm1hdGNoO1xyXG4gICAgICBpZiAoZXZlbnQuYWx0S2V5ICE9PSBtYXRjaC5hbHRLZXkpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICE9PSBtYXRjaC5zaGlmdEtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoZXZlbnQuY3RybEtleSAhPT0gbWF0Y2guY3RybEtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoISFtYXRjaC5rZXkgJiYgZXZlbnQua2V5ICE9PSBtYXRjaC5rZXkpIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZEV2ZW50SGFuZGxlcihjb21tYW5kOiBDb21tYW5kLCBtYXRjaDogUGFydGlhbDxLZXlib2FyZEhhbmRsZXI+KSB7XHJcbiAgICBsZXQgZnVsbE1hdGNoOiBLZXlib2FyZEhhbmRsZXIgPSB7XHJcbiAgICAgIGFsdEtleTogbWF0Y2guYWx0S2V5ID8/IGZhbHNlLFxyXG4gICAgICBjdHJsS2V5OiBtYXRjaC5jdHJsS2V5ID8/IGZhbHNlLFxyXG4gICAgICBzaGlmdEtleTogbWF0Y2guc2hpZnRLZXkgPz8gZmFsc2UsXHJcbiAgICAgIGtleTogbWF0Y2gua2V5ID8/IFwiXCIsXHJcbiAgICAgIGFib3V0OiBtYXRjaC5hYm91dCB8fCBjb21tYW5kLmFib3V0ICYmIGNvbW1hbmQuYWJvdXQoKVxyXG4gICAgfTtcclxuICAgIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5wdXNoKHttYXRjaDogZnVsbE1hdGNoLCBjb21tYW5kfSk7XHJcbiAgfVxyXG5cclxuICBsaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5tYXAoaCA9PiAoe1xyXG4gICAgICBjb21tYW5kOmguY29tbWFuZCxcclxuICAgICAga2V5OiB0aGlzLmtleXNBc1N0cmluZyhoLm1hdGNoKSxcclxuICAgICAgYWJvdXQ6IGgubWF0Y2guYWJvdXQsXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBrZXlzQXNTdHJpbmcobWF0Y2g6IEtleWJvYXJkSGFuZGxlcikge1xyXG4gICBsZXQgcmVzdWx0ID0gbWF0Y2gua2V5O1xyXG4gICBzd2l0Y2ggKHJlc3VsdCl7XHJcbiAgICAgY2FzZSBcIiBcIjogcmVzdWx0ID0gXCJzcGFjZVwiOyBicmVhaztcclxuICAgfVxyXG4gICBpZiAobWF0Y2guY3RybEtleSkgcmVzdWx0ID0gXCJjdHJsICsgXCIrcmVzdWx0O1xyXG4gICBpZiAobWF0Y2guYWx0S2V5KSByZXN1bHQgPSBcImFsdCArIFwiK3Jlc3VsdDtcclxuICAgaWYgKG1hdGNoLnNoaWZ0S2V5KSByZXN1bHQgPSBcInNoaWZ0ICsgXCIrcmVzdWx0O1xyXG4gICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufVxyXG4iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybShub2RlOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xyXG4gIGxldCB0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkudHJhbnNmb3JtO1xyXG4gIHQgPSAodCA9PT0gXCJub25lXCIpID8gXCJcIiA6IHQgKyBcIiBcIjtcclxuICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IHQgKyB2YWx1ZTtcclxufVxyXG5cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJib3gobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGxldCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcclxuICAgIHJldHVybiB7IHRvcDogcGFyc2VGbG9hdCh0b3ApLCBsZWZ0OiBwYXJzZUZsb2F0KGxlZnQpLCB3aWR0aDogcGFyc2VGbG9hdCh3aWR0aCksIGhlaWdodDogcGFyc2VGbG9hdChoZWlnaHQpIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2V0QWN0aXZlT3ZlcmxheSB9IGZyb20gXCIuLi9mdW4vZ2V0QWN0aXZlT3ZlcmxheVwiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuL1JlcGxcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVycyB9IGZyb20gXCIuL0tleWJvYXJkSGFuZGxlcnNcIjtcclxuaW1wb3J0IHsgdHJhbnNmb3JtIH0gZnJvbSBcIi4uL2Z1bi90cmFuc2Zvcm1cIjtcclxuaW1wb3J0IHsgYmJveCB9IGZyb20gXCIuLi9mdW4vYmJveFwiO1xyXG5cclxuLyoqXHJcbiAqIG1hbmFnZXMgdXNlciBpbnRlcmFjdGlvbnMgZm9yIGtleWJvYXJkIHNob3J0Y3V0cywgd2hlZWwsIGRyYWcsIGNsaWNrIGV2ZW50c1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERyYWdBbmREcm9wIHtcclxuICBwcml2YXRlIHNvdXJjZTogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHJlcGw6IFJlcGwsIHB1YmxpYyBrZXlkb3duSGFuZGxlcnM6IEtleWJvYXJkSGFuZGxlcnMpIHtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBsZXQgc291cmNlID0gZ2V0QWN0aXZlT3ZlcmxheSgpO1xyXG4gICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibm8gYWN0aXZlIG92ZXJsYXkgZm91bmRcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFRPRE8gd291bGQgYmUgbmljZSB0byBvbmx5IHBlcmZvcm0gd2hlbiBtb3VzZSBpcyBvdmVyIHRoZSBlbGVtZW50XHJcbiAgICAgIC8vIGRvY3VtZW50LmVsZW1lbnRzRnJvbVBvaW50KGV2ZW50LnNjcmVlblgsIGV2ZW50LnNjcmVlblkpO1xyXG4gICAgICBsZXQgZnJvbSA9IHNvdXJjZS5pbm5lckhUTUw7XHJcbiAgICAgIC8vIC0xNTAgPT4gMC45LCAxNTAgPT4gMS4xLCBzb1xyXG4gICAgICBsZXQgZGVsdGEgPSAxICsgZXZlbnQuZGVsdGFZIC8gMTUwMDtcclxuICAgICAgcmVwbC5leGVjdXRlQ29tbWFuZChgem9vbSAke2Zyb219ICR7ZGVsdGF9YCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4ge1xyXG5cclxuICAgICAgaWYgKHRoaXMua2V5ZG93bkhhbmRsZXJzLmdldEV2ZW50SGFuZGxlcnMoZXZlbnQpLnNvbWUoaGFuZGxlciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlICE9PSBoYW5kbGVyLmNvbW1hbmQuZXhlY3V0ZShyZXBsKTtcclxuICAgICAgfSkpIHtcclxuICAgICAgICAvLyBoYW5kbGVkXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0aGUgYmFja2dyb3VuZCBpbWFnZSBvbiB0aGUgcGFuZWxcclxuICAgKiBAcGFyYW0gcGFuZWwgSW52b2tlIHBhbiBvbiB0aGUgcGFuZWwgc28gdGhhdCBpdCBmb2xsb3dzIHRoZSBtb3VzZVxyXG4gICAqL1xyXG4gIHBhbmFibGUocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IGRyYWdnYWJsZSA9IHBhbmVsLmltYWdlO1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBbMCwgMF07XHJcbiAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LmFkZChcImRyYWdnYWJsZVwiKTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGV2ZW50ID0+IHtcclxuICAgICAgbGV0IGxlZnQgPSBwYXJzZUZsb2F0KGRyYWdnYWJsZS5zdHlsZS5sZWZ0IHx8IFwiMFwiKTtcclxuICAgICAgbGV0IHRvcCA9IHBhcnNlRmxvYXQoZHJhZ2dhYmxlLnN0eWxlLnRvcCB8fCBcIjBcIik7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb24gPSBbbGVmdCAtIGV2ZW50LnNjcmVlblgsIHRvcCAtIGV2ZW50LnNjcmVlblldO1xyXG4gICAgICBkcmFnZ2FibGUuc2V0UG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgZXZlbnQgPT4ge1xyXG4gICAgICBkcmFnZ2FibGUucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgIGRyYWdnYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgcG9pbnRlcm1vdmUpO1xyXG4gICAgICBsZXQgYm94ID0gYmJveChkcmFnZ2FibGUpO1xyXG4gICAgICBsZXQgcmVjdCA9IGRyYWdnYWJsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgICAgICBcclxuICAgICAgbGV0IHNjYWxlID0gcmVjdC53aWR0aCAvIGJveC53aWR0aDtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IGRyYWdnYWJsZS5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcclxuICAgICAgdHJhbnNmb3JtKGRyYWdnYWJsZSwgYHRyYW5zbGF0ZSgke2JveC5sZWZ0IC8gc2NhbGV9cHgsICR7Ym94LnRvcCAvIHNjYWxlfXB4KWApO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBwb2ludGVybW92ZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBsZXQgW3gsIHldID0gW3N0YXJ0UG9zaXRpb25bMF0gKyBldmVudC5zY3JlZW5YLCBzdGFydFBvc2l0aW9uWzFdICsgZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zdHlsZS5sZWZ0ID0gYCR7eH1weGA7XHJcbiAgICAgIGRyYWdnYWJsZS5zdHlsZS50b3AgPSBgJHt5fXB4YDtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbW92ZWFibGUoZHJhZ2dhYmxlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBbMCwgMF07XHJcbiAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LmFkZChcImRyYWdnYWJsZVwiKTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGV2ZW50ID0+IHtcclxuICAgICAgbGV0IHRvcCA9IHBhcnNlRmxvYXQoZHJhZ2dhYmxlLnN0eWxlLnRvcCk7XHJcbiAgICAgIGxldCBsZWZ0ID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUubGVmdCk7XHJcbiAgICAgIHN0YXJ0UG9zaXRpb24gPSBbbGVmdCAtIGV2ZW50LnNjcmVlblgsIHRvcCAtIGV2ZW50LnNjcmVlblldO1xyXG4gICAgICBkcmFnZ2FibGUuc2V0UG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgZXZlbnQgPT4ge1xyXG4gICAgICBkcmFnZ2FibGUucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgIGRyYWdnYWJsZS5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgcG9pbnRlcm1vdmUpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBwb2ludGVybW92ZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBsZXQgW2xlZnQsIHRvcF0gPSBbc3RhcnRQb3NpdGlvblswXSArIGV2ZW50LnNjcmVlblgsIHN0YXJ0UG9zaXRpb25bMV0gKyBldmVudC5zY3JlZW5ZXTtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IHRvcCArIFwicHhcIjtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLmxlZnQgPSBsZWZ0ICsgXCJweFwiO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYWtlIGFuIGVsZW1lbnQgYSBkcmFnIHNvdXJjZVxyXG4gICAqIEBwYXJhbSBkaXYgZWxlbWVudCB0byBtYWtlIGRyYWdnYWJsZVxyXG4gICAqL1xyXG4gIGRyYWdnYWJsZShkcmFnZ2FibGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LmFkZChcImRyYWdnYWJsZVwiKTtcclxuICAgIGRyYWdnYWJsZS5kcmFnZ2FibGUgPSB0cnVlO1xyXG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZXZlbnQgPT4gdGhpcy5vbmRyYWdzdGFydChkcmFnZ2FibGUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYW4gZWxlbWVudCBhIGRyb3AgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHRhcmdldCBlbGVtZW50IHRvIG1ha2UgaW50byBhIGRyb3AgdGFyZ2V0IChkcmFnZ2FibGUgYXJlIGRyb3BwYWJsZSwgYmFkIG5hbWUpXHJcbiAgICovXHJcbiAgZHJvcHBhYmxlKHRhcmdldDogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5zb3VyY2UpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLm9uZHJhZ292ZXIodGFyZ2V0LCB0aGlzLnNvdXJjZSk7XHJcbiAgICB9KTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnNvdXJjZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMub25kcm9wKHRhcmdldCwgdGhpcy5zb3VyY2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBzb3VyY2UgbGlzdGVuIGZvciB3aGVlbCBldmVudHNcclxuICAgKi9cclxuICB6b29tYWJsZShzb3VyY2U6IEhUTUxFbGVtZW50KSB7XHJcbiAgfVxyXG4gIG9uZHJhZ3N0YXJ0KHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gIH1cclxuXHJcbiAgb25kcmFnb3Zlcih0YXJnZXQ6IEhUTUxFbGVtZW50LCBzb3VyY2U6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvLyBub3RoaW5nIHRvIGRvP1xyXG4gIH1cclxuXHJcbiAgb25kcm9wKHRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGxldCBmcm9tID0gc291cmNlLmlubmVySFRNTDtcclxuICAgIGxldCB0byA9IHRhcmdldC5pbm5lckhUTUw7XHJcbiAgICBsZXQgY29tbWFuZCA9IGBtb3ZlICR7ZnJvbX0gJHt0b31gO1xyXG4gICAgdGhpcy5yZXBsLmV4ZWN1dGVDb21tYW5kKGNvbW1hbmQpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEJlaGF2aW9yPFQ+IHtcclxuICBleHRlbmQoY29udHJvbDogVCk6IHZvaWQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgdGFpbCB9IGZyb20gXCIuLi9mdW4vdGFpbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kUGFyc2VyIH0gZnJvbSBcIi4vQ29tbWFuZFBhcnNlclwiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgR29vZ2xlQ29sbGFnZVBob3RvIH0gZnJvbSBcIi4vR29vZ2xlQ29sbGFnZVBob3RvXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbnMgfSBmcm9tIFwiLi9BbmltYXRpb25zXCI7XHJcbmltcG9ydCB7IENvbW1hbmRzIH0gZnJvbSBcIi4vQ29tbWFuZHNcIjtcclxuaW1wb3J0IHsgRHJhZ0FuZERyb3AgfSBmcm9tIFwiLi9EcmFnQW5kRHJvcFwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuLi9tb2RlbHMvQmVoYXZpb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBsIHtcclxuXHJcbiAgLy8gZXh0ZW5zaW9uIHBvaW50IGZvciBiZWhhdmlvcnNcclxuICBub3RpZnkobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIC8vIHB1YmxpYyBzbyBzcGxpdCBjb21tYW5kIGNhbiBvcGVyYXRlIG9uIHRoZW1cclxuICBwdWJsaWMgcGFuZWxzOiBBcnJheTxDb2xsYWdlUGFuZWw+ID0gW107XHJcbiAgLy8gcHVibGljIHNvIG9wZW5BbGJ1bXMgY29tbWFuZCBjYW4gb3BlcmF0aW9uIG9uIHRoZW1cclxuICBwdWJsaWMgcGhvdG9zOiBBcnJheTxHb29nbGVDb2xsYWdlUGhvdG8+ID0gW107XHJcbiAgcHJpdmF0ZSBjb21tYW5kSGlzdG9yeTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHByaXZhdGUgY29tbWFuZEhpc3RvcnlJbmRleCA9IC0xO1xyXG4gIHB1YmxpYyBkbmQ6IERyYWdBbmREcm9wIHwgbnVsbCA9IG51bGw7XHJcbiAgcHVibGljIGFuaW1hdGlvbnMgPSBuZXcgQW5pbWF0aW9ucygpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tbWFuZHM6IENvbW1hbmRzKSB7XHJcbiAgICAvLyBjYW5ub3Qgc2V0IGRuZCBiZWNhdXNlIGRuZCBuZWVkcyByZXBsIChmb3Igbm93KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVzZShiZWhhdmlvcjogQmVoYXZpb3I8UmVwbD4pIHtcclxuICAgIGJlaGF2aW9yLmV4dGVuZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGV2YWwoY29tbWFuZDogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgZXhlY3V0aW5nOiAke2NvbW1hbmR9YCk7XHJcbiAgICBsZXQgW3ZlcmJdID0gY29tbWFuZC5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgaGFuZGxlciA9IHRoaXMuY29tbWFuZHMuZ2V0KHZlcmIpO1xyXG4gICAgaWYgKGhhbmRsZXIpIHtcclxuICAgICAgYXdhaXQgaGFuZGxlci5leGVjdXRlKHRoaXMsIHRhaWwoY29tbWFuZCkpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKHZlcmIpIHtcclxuICAgICAgY2FzZSBcImV4cG9ydFwiOlxyXG4gICAgICAgIGxldCBjYW52YXMgPSBhd2FpdCB0aGlzLmFzQ2FudmFzKCk7XHJcbiAgICAgICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJleHBvcnQtcmVzdWx0XCIpO1xyXG4gICAgICAgIGltZy5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoaW1nLCBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGNyZWF0ZSBhIGNhbnZhcyBvZiB0aGUgZW50aXJlIGNvbGxhZ2VcclxuICBhc3luYyBhc0NhbnZhcygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MQ2FudmFzRWxlbWVudD4oKGdvb2QsIGJhZCkgPT4ge1xyXG4gICAgICBsZXQgaW1hZ2VDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbnZhc1wiKT8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGlmICghaW1hZ2VDYW52YXMpIHJldHVybjtcclxuXHJcbiAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICBjYW52YXMud2lkdGggPSBpbWFnZUNhbnZhcy53aWR0aDtcclxuICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlQ2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgIGlmICghY3R4KSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICBsZXQgcGFuZWxzID0gdGhpcy5wYW5lbHMuZmlsdGVyKHAgPT4gMCA9PT0gZ2V0Q29tcHV0ZWRTdHlsZShwLnBhbmVsKS5iYWNrZ3JvdW5kSW1hZ2UuaW5kZXhPZihgdXJsKFwiYCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImxvYWRpbmdcIiwgcGFuZWxzLmxlbmd0aCk7XHJcbiAgICAgIHBhbmVscy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgIGxldCBwb3MgPSBwLnBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCI7XHJcbiAgICAgICAgaW1nLndpZHRoID0gcG9zLndpZHRoO1xyXG4gICAgICAgIGltZy5oZWlnaHQgPSBwb3MuaGVpZ2h0O1xyXG4gICAgICAgIGltZy5zdHlsZS50cmFuc2Zvcm0gPSBwLnBhbmVsLnN0eWxlLnRyYW5zZm9ybTtcclxuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIHBvcy54LCBwb3MueSk7XHJcbiAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkZWQ6XCIsIGNvdW50KTtcclxuICAgICAgICAgIGlmIChjb3VudCA9PT0gcGFuZWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBnb29kKGNhbnZhcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBzdHJpcCB1cmwoXCJcIik7XHJcbiAgICAgICAgbGV0IHVybCA9IGdldENvbXB1dGVkU3R5bGUocC5wYW5lbCkuYmFja2dyb3VuZEltYWdlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXJsXCIsIHVybCk7XHJcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZyg1LCB1cmwubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmxcIiwgdXJsKTtcclxuICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sbGFnZU92ZXJsYXlzKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnBhbmVsW2RhdGEtaWRdIC5vdmVybGF5YCkpIGFzIEhUTUxFbGVtZW50W107XHJcbiAgfVxyXG5cclxuICBnZXRQaG90b092ZXJsYXlzKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnBob3RvcyAuaW1nIC5vdmVybGF5W2RhdGEtaWRdYCkpIGFzIEhUTUxFbGVtZW50W107XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0UGFuZWwoaWQpPy5wYW5lbDtcclxuICB9XHJcblxyXG4gIHNlbGVjdFBhbmVsKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnBhbmVscy5maW5kKHAgPT4gcC5vdmVybGF5LmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdFBob3RvKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnBob3Rvc1twYXJzZUludChpZCkgLSAxXTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVBhbmVsKHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGxldCBpbmRleCA9IHRoaXMucGFuZWxzLmluZGV4T2YocGFuZWwpO1xyXG4gICAgaWYgKC0xID09PSBpbmRleCkgdGhyb3cgXCJwYW5lbCBub3QgZm91bmRcIjtcclxuICAgIHRoaXMucGFuZWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICBwYW5lbC5wYW5lbC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIHJlaW5kZXgoKSB7XHJcbiAgICB0aGlzLnBhbmVscy5maWx0ZXIocCA9PiAhIXA/LnBhbmVsPy5wYXJlbnRFbGVtZW50KS5mb3JFYWNoKChwLCBpKSA9PiBwLm92ZXJsYXkuZGF0YXNldC5pZCA9IHAub3ZlcmxheS5pbm5lclRleHQgPSBpICsgMSArIFwiXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB6b29tIGFuZCBkcmFnIGNhcGFiaWxpdGllcyB0byBhIHBhbmVsXHJcbiAgICogQHBhcmFtIHBhbmVsIG1ha2UgdGhpcyBwYW5lbCBpbnRlcmFjdGl2ZVxyXG4gICAqL1xyXG4gIGFkZEJlaGF2aW9ycyhwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgb3ZlcmxheSA9IHBhbmVsLm92ZXJsYXk7XHJcbiAgICBsZXQgZG5kID0gdGhpcy5kbmQ7XHJcbiAgICBpZiAoZG5kKSB7XHJcbiAgICAgIGRuZC56b29tYWJsZShvdmVybGF5KTtcclxuICAgICAgZG5kLmRyYWdnYWJsZShvdmVybGF5KTtcclxuICAgICAgZG5kLnBhbmFibGUocGFuZWwpO1xyXG4gICAgICBkbmQuZHJvcHBhYmxlKG92ZXJsYXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVpbmRleFBob3RvcygpIHtcclxuICAgIHRoaXMucGhvdG9zLmZvckVhY2goKHBob3RvLCBpKSA9PiB7XHJcbiAgICAgIGxldCBwID0gcGhvdG8uaW1nO1xyXG4gICAgICBsZXQgb3ZlcmxheSA9IHAucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBpZiAoIW92ZXJsYXkpIHtcclxuICAgICAgICBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xyXG4gICAgICAgIG92ZXJsYXkuZGF0YXNldC5pZCA9IG92ZXJsYXkuaW5uZXJUZXh0ID0gMSArIGkgKyBcIlwiO1xyXG4gICAgICAgIHAuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgICAgICAgdGhpcy5kbmQ/LmRyYWdnYWJsZShvdmVybGF5KTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHByaW9yQ29tbWFuZCgpIHtcclxuICAgIGlmICh0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRIaXN0b3J5Wy0tdGhpcy5jb21tYW5kSGlzdG9yeUluZGV4XTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgbmV4dENvbW1hbmQoKSB7XHJcbiAgICBpZiAodGhpcy5jb21tYW5kSGlzdG9yeUluZGV4IDwgdGhpcy5jb21tYW5kSGlzdG9yeS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRIaXN0b3J5WysrdGhpcy5jb21tYW5kSGlzdG9yeUluZGV4XTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc3RhcnR1cCgpIHtcclxuICAgIGxldCBjaGlsZFBhbmVscyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wYW5lbFwiKSkubWFwKHAgPT4gbmV3IENvbGxhZ2VQYW5lbCg8SFRNTERpdkVsZW1lbnQ+cCkpO1xyXG4gICAgY2hpbGRQYW5lbHMuZm9yRWFjaChjID0+IHRoaXMuYWRkQmVoYXZpb3JzKGMpKTtcclxuICAgIHRoaXMucGFuZWxzLnB1c2goLi4uY2hpbGRQYW5lbHMpO1xyXG4gICAgbGV0IGNtZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uc29sZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY21kLm9ua2V5ZG93biA9IGV2ZW50ID0+IHtcclxuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcclxuICAgICAgICAgIHRoaXMuZXhlY3V0ZUNvbW1hbmQoY21kLnZhbHVlKTtcclxuICAgICAgICAgIGNtZC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxyXG4gICAgICAgICAgY21kLnZhbHVlID0gdGhpcy5wcmlvckNvbW1hbmQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcclxuICAgICAgICAgIGNtZC52YWx1ZSA9IHRoaXMubmV4dENvbW1hbmQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZWluZGV4KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXhlY3V0ZUNvbW1hbmQoY21kOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuZXZhbChjbWQpO1xyXG4gICAgdGhpcy5jb21tYW5kSGlzdG9yeUluZGV4ID0gdGhpcy5jb21tYW5kSGlzdG9yeS5wdXNoKGNtZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGFyc2VDb21tYW5kKGNvbW1hbmQ6IHN0cmluZykge1xyXG4gICAgbGV0IGFpID0gbmV3IENvbW1hbmRQYXJzZXIoKTtcclxuICAgIHJldHVybiBhaS5wYXJzZVBocmFzZShjb21tYW5kKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmltcG9ydCB7Z2xvYmFsc30gZnJvbSBcIi4uL2dsb2JhbHNcIjtcclxuXHJcbmNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG5mdW5jdGlvbiBlc2NhcGUodmFsdWU6IHN0cmluZyl7XHJcbiAgdGV4dGFyZWEuaW5uZXJUZXh0ID0gdmFsdWU7XHJcbiAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVscENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZykge1xyXG4gICAgY29uc3QgY29tbWFuZHMgPSBnbG9iYWxzLnJlcGwuY29tbWFuZHMubGlzdCgpLm1hcChuYW1lID0+ICh7Y29tbWFuZDogKGdsb2JhbHMucmVwbC5jb21tYW5kcy5nZXQobmFtZSkgYXMgQ29tbWFuZCksIG5hbWV9KSk7XHJcbiAgICBjb25zdCBrZXlib2FyZENvbW1hbmRzID0gZ2xvYmFscy5rZXlib2FyZEhhbmRsZXJzLmxpc3QoKTtcclxuICAgIGNvbnN0IG1hcmt1cDEgPSBjb21tYW5kcy5tYXAoYyA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7Yy5uYW1lfVwiPlwiJHtjLm5hbWV9XCIgLSAke2MuY29tbWFuZC5hYm91dCAmJiBjLmNvbW1hbmQuYWJvdXQoKX08L29wdGlvbj5gKS5zb3J0KCkuam9pbihcIlwiKTtcclxuICAgIGNvbnN0IG1hcmt1cDIgPSBrZXlib2FyZENvbW1hbmRzLm1hcCgoYyxpKSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7Yy5rZXl9XCI+XCIke2Mua2V5fVwiIC0gJHsoYy5hYm91dCEpfTwvY29kZT48L29wdGlvbj5gKS5zb3J0KCkuam9pbihcIlwiKTtcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImhlbHBcIik7XHJcbiAgICB0YXJnZXQuaW5uZXJIVE1MID0gYCR7bWFya3VwMX0ke21hcmt1cDJ9YDtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFyZ2V0KTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MVGV4dEFyZWFFbGVtZW50PihcIi5jb25zb2xlXCIpIS52YWx1ZSA9IHRhcmdldC52YWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi4vY29udHJvbHMvQ29sbGFnZVBhbmVsXCI7XHJcblxyXG4vKipcclxuICAgKiBTcGxpdHMgdGhlIGN1cnJlbnQgcGFuZWwgaW50byA0IGVxdWFsIHNpemUgcGFuZWxzXHJcbiAgICogVGhpcyBwYW5lbCB0aGVuIHRha2VzIG9uIHRoZSByb2xlIG9mIGEgcGFuZWwgY29udGFpbmVyXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gc3BsaXQocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IFt0b3BsZWZ0LCB0b3ByaWdodCwgYm90dG9tbGVmdCwgYm90dG9tcmlnaHRdID0gWzEsIDIsIDMsIDRdLm1hcChuID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gICAgbGV0IGNoaWxkcmVuID0gW3RvcGxlZnQsIHRvcHJpZ2h0LCBib3R0b21sZWZ0LCBib3R0b21yaWdodF0ubWFwKHYgPT4gbmV3IENvbGxhZ2VQYW5lbCh2KSk7XHJcbiAgICB0b3BsZWZ0LmNsYXNzTGlzdC5hZGQoXCJxMVwiKTtcclxuICAgIHRvcHJpZ2h0LmNsYXNzTGlzdC5hZGQoXCJxMlwiKTtcclxuICAgIGJvdHRvbWxlZnQuY2xhc3NMaXN0LmFkZChcInEzXCIpO1xyXG4gICAgYm90dG9tcmlnaHQuY2xhc3NMaXN0LmFkZChcInE0XCIpO1xyXG4gICAgLy8gcGhvdG8gY29udGFpbnMgbm8gc3RhdGUgc28gbm90IGNsb25pbmdcclxuICAgIGNvbnN0IHBob3RvID0gcGFuZWwucGhvdG87XHJcbiAgICBpZiAocGhvdG8pIHtcclxuICAgICAgY2hpbGRyZW4uZm9yRWFjaChjID0+IGMuYWRkUGhvdG8ocGhvdG8uY2xvbmUoKSkpO1xyXG4gICAgfVxyXG4gICAgcGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcInBhbmVsXCIpO1xyXG4gICAgcGFuZWwub3ZlcmxheS5yZW1vdmUoKTtcclxuICAgIHBhbmVsLmltYWdlLnNyYyA9IFwiXCI7XHJcbiAgICBwYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKFwicGFuZWwtY29udGFpbmVyXCIpO1xyXG4gICAgcGFuZWwucGFuZWwuZGF0YXNldFtcImlkXCJdID0gXCJcIjtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goYyA9PiBwYW5lbC5wYW5lbC5hcHBlbmRDaGlsZChjLnBhbmVsKSk7XHJcbiAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgfVxyXG5cclxuLyoqXHJcbiAqIFNwbGl0cyB0aGUgcGFuZWwgaW50byA0IG5ldyBjaGlsZCBwYW5lbHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTcGxpdENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBjb21tYW5kQXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgaWQgPSBjb21tYW5kQXJncztcclxuXHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vIG5vZGUgZm91bmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnBhbmVscy5maW5kKHAgPT4gcC5wYW5lbCA9PT0gbm9kZSk7XHJcbiAgICBpZiAoIXBhbmVsKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gcGFuZWwgZm91bmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb3JpZ2luYWxJbmRleCA9IHJlcGwucGFuZWxzLmluZGV4T2YocGFuZWwpO1xyXG4gICAgbGV0IGNoaWxkUGFuZWxzID0gc3BsaXQocGFuZWwpO1xyXG4gICAgLy8gcmVtb3ZlIHNpbmNlIGl0IGlzIG5vIGxvbmdlciBhIHBhbmVsXHJcbiAgICByZXBsLnBhbmVscy5zcGxpY2Uob3JpZ2luYWxJbmRleCwgMSwgLi4uY2hpbGRQYW5lbHMpO1xyXG4gICAgY2hpbGRQYW5lbHMuZm9yRWFjaChjID0+IHJlcGwuYWRkQmVoYXZpb3JzKGMpKTtcclxuICAgIHJlcGwucmVpbmRleCgpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFzcGVjdFJhdGlvQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW3csIGhdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgd2lkdGggPSBwYXJzZUZsb2F0KHcpO1xyXG4gICAgbGV0IGhlaWdodCA9IHBhcnNlRmxvYXQoaCk7XHJcbiAgICBsZXQgd2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kb3dcIikgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBsZXQgY2FudmFzID0gd2luZG93LnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBsZXQgY3VycmVudFdpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGNhbnZhcykud2lkdGgpO1xyXG4gICAgbGV0IGN1cnJlbnRIZWlnaHQgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY2FudmFzKS5oZWlnaHQpO1xyXG4gICAgLy8gbXVsdGlwbGUgd2lkdGggYW5kIGhlaWdodCBieSBtYXhpbXVtIHNjYWxlIHN1Y2ggdGhhdFxyXG4gICAgLy8gd2lkdGggKiBzY2FsZSA8PSBjdXJyZW50V2lkdGggYW5kIGhlaWdodCAqIHNjYWxlIDw9IGN1cnJlbnRIZWlnaHRcclxuICAgIGxldCBzeCA9IGN1cnJlbnRXaWR0aCAvIHdpZHRoO1xyXG4gICAgbGV0IHN5ID0gY3VycmVudEhlaWdodCAvIGhlaWdodDtcclxuICAgIGxldCBzY2FsZSA9IE1hdGgubWluKHN4LCBzeSk7XHJcbiAgICB3aW5kb3cuc3R5bGUud2lkdGggPSBgJHtNYXRoLnJvdW5kKHdpZHRoICogc2NhbGUpfXB4YDtcclxuICAgIHdpbmRvdy5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGhlaWdodCAqIHNjYWxlKX1weGA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9yZGVyQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkLCB3aWR0aCwgY29sb3JdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICByZXBsLnNlbGVjdFBhbmVsKGlkKT8uYm9yZGVyKHdpZHRoLCBjb2xvcik7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmNvbnN0IHVuaXRzID0gXCJweCBlbVwiLnNwbGl0KFwiIFwiKTtcclxuXHJcbmZ1bmN0aW9uIGhhc1VuaXRzKHZhbHVlOiBzdHJpbmcpIHtcclxuICByZXR1cm4gdW5pdHMuc29tZSh2ID0+IHZhbHVlLmVuZHNXaXRoKHYpKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYW5nZVN0eWxlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHRhcmdldDoga2V5b2YgT21pdDxDU1NTdHlsZURlY2xhcmF0aW9uLCBudW1iZXI+LFxyXG4gICAgcHVibGljIG9wdGlvbnM/OiB7XHJcbiAgICAgIHVuaXRzPzogc3RyaW5nO1xyXG4gICAgICBkZWx0YT86IG51bWJlcjtcclxuICAgIH1cclxuICApIHsgfVxyXG5cclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiBgY2hhbmdlIHN0eWxlICR7dGhpcy50YXJnZXR9IGJ5ICR7dGhpcy5vcHRpb25zPy5kZWx0YX0gJHt0aGlzLm9wdGlvbnM/LnVuaXRzfWA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcihyZXBsOiBSZXBsKSB7XHJcbiAgICByZXR1cm4gcmVwbC5wYW5lbHNcclxuICAgICAgLmZpbHRlcihwID0+IHAucGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpXHJcbiAgICAgIC5zb21lKHBhbmVsID0+IHtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gcGFuZWwucGFuZWw7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VGbG9hdChzdHlsZVs8YW55PnRoaXMudGFyZ2V0XSkgKyAodGhpcy5vcHRpb25zPy5kZWx0YSA/PyAwKTtcclxuICAgICAgICB0YXJnZXQuc3R5bGVbPGFueT50aGlzLnRhcmdldF0gPSB2YWx1ZSArICh0aGlzLm9wdGlvbnM/LnVuaXRzID8/IFwiXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBpZiAoIWFyZ3MpIHtcclxuICAgICAgaWYgKHRoaXMua2V5Ym9hcmRIYW5kbGVyKHJlcGwpKSByZXR1cm47XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFuZWxzID0gcmVwbC5wYW5lbHM7XHJcbiAgICBsZXQgW3ZhbHVlLCBpZF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGlmICghIWlkKSB7XHJcbiAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwoaWQpO1xyXG4gICAgICBpZiAoIXBhbmVsKSB7XHJcbiAgICAgICAgcmVwbC5ub3RpZnkoYHBhbmVsIG5vdCBmb3VuZDogJHtpZH1gKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgcGFuZWxzID0gW3BhbmVsXTtcclxuICAgIH1cclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnM/LnVuaXRzICYmICFoYXNVbml0cyh2YWx1ZSkpIHtcclxuICAgICAgdmFsdWUgKz0gdGhpcy5vcHRpb25zLnVuaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgcGFuZWwucGFuZWwuc3R5bGVbPGFueT50aGlzLnRhcmdldF0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5mdW5jdGlvbiBoYXNGb2N1cyhub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR290b0NvbW1hbmRFZGl0b3JDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IGVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uc29sZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgaWYgKCFlZGl0b3IpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoXCJubyBjb21tYW5kIGVkaXRvciBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc0ZvY3VzKGVkaXRvcikpIHJldHVybiBmYWxzZTtcclxuICAgIGVkaXRvci5mb2N1cygpO1xyXG4gICAgZWRpdG9yLnNlbGVjdCgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2N1c1BhbmVscyhyZXBsOiBSZXBsKSB7XHJcbiAgcmV0dXJuIHJlcGwucGFuZWxzLmZpbHRlcihwID0+IHAucGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpO1xyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5cclxuLyoqXHJcbiAqIHN3YXAgaW1hZ2VzIG9mIHR3byBwYW5lbHNcclxuICovXHJcbmZ1bmN0aW9uIHN3YXBJbWFnZXMocGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IGltYWdlMSA9IHBhbmVsMS5pbWFnZTtcclxuICBsZXQgaW1hZ2UyID0gcGFuZWwyLmltYWdlO1xyXG4gIGxldCBwYXJlbnQxID0gaW1hZ2UxLnBhcmVudEVsZW1lbnQ7XHJcbiAgbGV0IHBhcmVudDIgPSBpbWFnZTIucGFyZW50RWxlbWVudDtcclxuICBpZiAoIXBhcmVudDEgfHwgIXBhcmVudDIpIHJldHVybiBmYWxzZTtcclxuICBsZXQgbmV4dDEgPSBpbWFnZTEubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gIGxldCBuZXh0MiA9IGltYWdlMi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgaW1hZ2UxLnJlbW92ZSgpO1xyXG4gIGltYWdlMi5yZW1vdmUoKTtcclxuICBwYXJlbnQyLmluc2VydEJlZm9yZShpbWFnZTEsIG5leHQyKTtcclxuICBwYXJlbnQxLmluc2VydEJlZm9yZShpbWFnZTIsIG5leHQxKTtcclxuICBsZXQgcGhvdG8xID0gcGFuZWwxLnBob3RvO1xyXG4gIGxldCBwaG90bzIgPSBwYW5lbDIucGhvdG87XHJcbiAgcGFuZWwxLmltYWdlID0gaW1hZ2UyO1xyXG4gIHBhbmVsMi5pbWFnZSA9IGltYWdlMTtcclxuICBwYW5lbDEucGhvdG8gPSBwaG90bzI7XHJcbiAgcGFuZWwyLnBob3RvID0gcGhvdG8xO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFN3YXBQYW5lbHNDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXIocmVwbDogUmVwbCkge1xyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAoMiAhPT0gcGFuZWxzLmxlbmd0aCkge1xyXG4gICAgICByZXBsLm5vdGlmeShcIkV4YWN0bHkgdHdvIHBhbmVscyBtdXN0IGJlIHNlbGVjdGVkIGJlZm9yZSB5b3UgY2FuIHBlcmZvcm0gYSBzd2FwLlwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc3dhcEltYWdlcyhwYW5lbHNbMF0sIHBhbmVsc1sxXSk7XHJcbiAgfVxyXG5cclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiBcIlN3YXAgUGFuZWwgQSBCXCI7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiBmYWxzZSB8IHZvaWQgfCBQcm9taXNlPGZhbHNlIHwgdm9pZD4ge1xyXG4gICAgaWYgKCFhcmdzKVxyXG4gICAgICByZXR1cm4gdGhpcy5rZXlib2FyZEhhbmRsZXIocmVwbCk7XHJcblxyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwYW5lbDEgPSByZXBsLnNlbGVjdFBhbmVsKGlkMSk7XHJcbiAgICBsZXQgcGFuZWwyID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgaWYgKCFwYW5lbDEpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoYFBhbmVsIG5vdCBmb3VuZDogJHtpZDF9YCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICghcGFuZWwyKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KGBQYW5lbCBub3QgZm91bmQ6ICR7aWQyfWApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzd2FwSW1hZ2VzKHBhbmVsMSwgcGFuZWwyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIEdvdG9Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGFyZ3M7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgVGV4dENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgdmFsdWVdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuICAgIHBhbmVsLnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIFBhZENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgd2lkdGhdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5zdHlsZS5wYWRkaW5nID0gYCR7d2lkdGh9ZW1gO1xyXG5cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBub2RlLnN0eWxlLnZpc2liaWxpdHkgIT09IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgaXNWaXNpYmxlIH0gZnJvbSBcIi4uL2Z1bi9pc1Zpc2libGVcIjtcclxuZXhwb3J0IGNsYXNzIFRvZ2dsZVZpc2liaWxpdHlDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IHtcclxuICAgIHNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgfSkge1xyXG4gIH1cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IG92ZXJsYXlzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3RvcikpIGFzIEFycmF5PEhUTUxFbGVtZW50PjtcclxuICAgIGxldCBhbGxWaXNpYmxlID0gb3ZlcmxheXMuZXZlcnkodiA9PiBpc1Zpc2libGUodikpO1xyXG4gICAgaWYgKCFhbGxWaXNpYmxlKSB7XHJcbiAgICAgIG92ZXJsYXlzLmZvckVhY2godiA9PiB2LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgb3ZlcmxheXMuZm9yRWFjaCh2ID0+IHYuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBnZXRGb2N1c1BhbmVscyB9IGZyb20gXCIuL2dldEZvY3VzUGFuZWxzXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICAgKiBNb3ZlIHRoZSBpbWFnZSBpbnNpZGUgdGhlIGZyYW1lXHJcbiAgICogQHBhcmFtIHggaG9yaXpvbnRhbCBvZmZzZXQgaW4gcGl4ZWxzXHJcbiAgICogQHBhcmFtIHkgdmVydGljYWwgb2Zmc2V0IGluIHBpeGVsc1xyXG4gICAqL1xyXG5mdW5jdGlvbiBwYW4ocmVwbDogUmVwbCwgbm9kZTogSFRNTEVsZW1lbnQsIHg6IHN0cmluZywgeTogc3RyaW5nKSB7XHJcbiAgbGV0IFtkeCwgZHldID0gWzAsIDBdO1xyXG4gIGxldCBhbmltYXRlID0gdHJ1ZTtcclxuICBsZXQgcGl4ZWxTaXplID0gMTtcclxuICBzd2l0Y2ggKHgpIHtcclxuICAgIGNhc2UgXCJ1cFwiOlxyXG4gICAgICBkeSA9IC1waXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImRvd25cIjpcclxuICAgICAgZHkgPSBwaXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgZHggPSAtcGl4ZWxTaXplO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICBkeCA9IHBpeGVsU2l6ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbmltYXRlID0gZmFsc2U7XHJcbiAgICAgIGR4ID0gcGl4ZWxTaXplICogcGFyc2VGbG9hdCh4KTtcclxuICAgICAgZHkgPSBwaXhlbFNpemUgKiBwYXJzZUZsb2F0KHkpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgbGV0IG9wID0gKCkgPT4ge1xyXG4gICAgdHJhbnNmb3JtKG5vZGUsIGB0cmFuc2xhdGUoJHtkeH1weCwgJHtkeX1weClgKTtcclxuICB9O1xyXG4gIG9wKCk7XHJcbiAgbGV0IGFuaW1hdGlvbnMgPSByZXBsLmFuaW1hdGlvbnM7XHJcbiAgYW5pbWF0ZSAmJiBhbmltYXRpb25zLmFuaW1hdGUoXCJwYW5cIiwgb3ApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlSW1hZ2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IHtcclxuICAgIHg/OiBudW1iZXI7XHJcbiAgICB5PzogbnVtYmVyO1xyXG4gIH0pIHsgfVxyXG5cclxuICBhYm91dCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IDxzdHJpbmdbXT5bXTtcclxuICAgIGxldCB4ID0gdGhpcy5kZWx0YT8ueCB8fCAwO1xyXG4gICAgbGV0IHkgPSB0aGlzLmRlbHRhPy55IHx8IDA7XHJcblxyXG4gICAgaWYgKHggPiAwKSByZXN1bHQucHVzaChgJHt4fSBweCByaWdodGApO1xyXG4gICAgaWYgKHggPCAwKSByZXN1bHQucHVzaChgJHsteH0gcHggbGVmdGApO1xyXG4gICAgaWYgKHkgPiAwKSByZXN1bHQucHVzaChgJHt5fSBweCB1cGApO1xyXG4gICAgaWYgKHkgPCAwKSByZXN1bHQucHVzaChgJHsteX0gcHggZG93bmApO1xyXG4gICAgcmV0dXJuIGBtb3ZlIGltYWdlICR7cmVzdWx0LmpvaW4oXCIgYW5kIFwiKX1gO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCEhYXJncykge1xyXG4gICAgICBsZXQgW2lkLCB4LCB5XSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBwYW4ocmVwbCwgcGFuZWwuaW1hZ2UsIHgsIHkgfHwgXCIwXCIpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlbHRhKSB7XHJcbiAgICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgcGFuKHJlcGwsIHBhbmVsLmltYWdlLCAodGhpcy5kZWx0YSEueCB8fCAwKSArIFwiXCIsICh0aGlzLmRlbHRhIS55IHx8IDApICsgXCJcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbm90IGhhbmRsZWRcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgTWFyZ2luQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkLCB3aWR0aF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gICAgbm9kZS5zdHlsZS5tYXJnaW4gPSBgJHt3aWR0aH1lbWA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5cclxuZnVuY3Rpb24gbWVyZ2Vfbm9kZXMocmVwbDogUmVwbCwgcGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IG5vZGUxID0gcGFuZWwxLnBhbmVsO1xyXG4gIGxldCBub2RlMiA9IHBhbmVsMi5wYW5lbDtcclxuXHJcbiAgbm9kZTIuY2xhc3NMaXN0LmZvckVhY2goYyA9PiBub2RlMS5jbGFzc0xpc3QuYWRkKGMpKTtcclxuICByZXBsLnJlbW92ZVBhbmVsKHBhbmVsMik7XHJcblxyXG4gIC8vIGlmIG5vZGUxIGlzIHExLi4ucTQgYW5kIG9ubHkgY2hpbGQgdGhlbiBpdCBhc3N1bWVzIHRoZSBxIG9mIGl0J3MgY29udGFpbmVyIGFuZCByZXBsYWNlcyBpdHMgY29udGFpbmVyXHJcbiAgbGV0IHFzID0gWzEsIDIsIDMsIDRdLm1hcCh2ID0+IGBxJHt2fWApO1xyXG4gIGlmIChxcy5ldmVyeSh2ID0+IG5vZGUxLmNsYXNzTGlzdC5jb250YWlucyh2KSkpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IG5vZGUxLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWwtY29udGFpbmVyXCIpKSB7XHJcbiAgICAgIHFzLmZvckVhY2godiA9PiBub2RlMS5jbGFzc0xpc3QucmVtb3ZlKHYpKTtcclxuICAgICAgcXMuZm9yRWFjaCh2ID0+IHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnModikgJiYgbm9kZTEuY2xhc3NMaXN0LmFkZCh2KSk7XHJcbiAgICAgIHBhcmVudC5wYXJlbnRFbGVtZW50Py5pbnNlcnRCZWZvcmUobm9kZTEsIHBhcmVudCk7XHJcbiAgICAgIHBhcmVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVwbC5yZWluZGV4KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXJnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlMSA9IHJlcGwuc2VsZWN0UGFuZWwoaWQxKTtcclxuICAgIGxldCBub2RlMiA9IHJlcGwuc2VsZWN0UGFuZWwoaWQyKTtcclxuICAgIG5vZGUxICYmIG5vZGUyICYmIG1lcmdlX25vZGVzKHJlcGwsIG5vZGUxLCBub2RlMik7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgYmJveCB9IGZyb20gXCIuLi9mdW4vYmJveFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpUmVzQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG5cclxuICAvKipcclxuICAgKiByZXBsYWNlcyB0aGUgY3VycmVudCBwaG90byB3aXRoIG9uZSBvZiBoaWdoZXIgcXVhbGl0eVxyXG4gICAqL1xyXG4gIGFzeW5jIHVwZ3JhZGVSZXNvbHV0aW9uKHJlcGw6IFJlcGwsIHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGlmICghcGFuZWwucGhvdG8pXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAvLyBhdHRlbXB0cyB0byBpbmNyZWFzZSBhbiBpbWFnZSBzaXplIGFuZCBkZWNyZWFzZSB0aGUgdHJhbnNmb3JtIHNjYWxlIFxyXG4gICAgLy8gdG8gaGF2ZSBhIG5lZ2xpZ2FibGUgZWZmZWN0IG9uIHRoZSBpbWFnZSBidXQgYWxsb3cgZm9yIHN3YXBwaW5nIGluIFxyXG4gICAgLy8gYSBoaWdoZXIgcmVzb2x1dGlvbiB2ZXJzaW9uLlxyXG4gICAgLy8gdGhpcyBpcyBub3QgY29tcGVuc2F0aW5nIGZvciAgcGFkZGluZywgbWFyZ2luLCBib3JkZXIgd2lkdGgsIGV0Yy5cclxuICAgIC8vIGl0IGlzIG5vdCBwcmVzZXJ2aW5nIHJvdGF0aW9uXHJcbiAgICBsZXQgYm94ID0gYmJveChwYW5lbC5pbWFnZSk7XHJcbiAgICBsZXQgaW1hZ2VSZWN0ID0gcGFuZWwuaW1hZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgc2NhbGUgPSBpbWFnZVJlY3Qud2lkdGggLyBib3gud2lkdGg7XHJcbiAgICBpZiAoMSA+IHNjYWxlKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KFwidGhpcyB3b3VsZCBub3QgYmUgYW4gdXBncmFkZVwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHBhbmVsUmVjdCA9IHBhbmVsLnBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUud2lkdGggPSBpbWFnZVJlY3Qud2lkdGggKyBcInB4XCI7XHJcbiAgICBwYW5lbC5pbWFnZS5zdHlsZS5oZWlnaHQgPSBpbWFnZVJlY3QuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgbGV0IGR4ID0gaW1hZ2VSZWN0LmxlZnQgLSBwYW5lbFJlY3QubGVmdCAtIHBhcnNlRmxvYXQocGFuZWwucGFuZWwuc3R5bGUuYm9yZGVyTGVmdFdpZHRoKTtcclxuICAgIGxldCBkeSA9IGltYWdlUmVjdC50b3AgLSBwYW5lbFJlY3QudG9wIC0gcGFyc2VGbG9hdChwYW5lbC5wYW5lbC5zdHlsZS5ib3JkZXJUb3BXaWR0aCk7XHJcbiAgICBwYW5lbC5pbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7ZHh9cHgsJHtkeX1weClgO1xyXG4gICAgcGFuZWwuc2V0QmFja2dyb3VuZEltYWdlKGAke3BhbmVsLnBob3RvLm1lZGlhSW5mby5iYXNlVXJsfT13JHtNYXRoLmZsb29yKGltYWdlUmVjdC53aWR0aCl9YCk7XHJcbiAgICByZXBsLm5vdGlmeShgdXBncmFkZWQgYnkgJHtNYXRoLnJvdW5kKHNjYWxlICogMTAwKX0lYCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGFyZ3M7XHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuICAgIHRoaXMudXBncmFkZVJlc29sdXRpb24ocmVwbCwgcGFuZWwpO1xyXG5cclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmV4cG9ydCBjbGFzcyBNb3ZlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkMSwgaWQyXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IHBob3RvID0gcmVwbC5zZWxlY3RQaG90byhpZDEpO1xyXG4gICAgaWYgKCFwaG90bykgcmV0dXJuO1xyXG5cclxuXHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkMik7XHJcbiAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgcGFuZWwuYWRkUGhvdG8ocGhvdG8pO1xyXG5cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi4vZnVuL3RyYW5zZm9ybVwiO1xyXG5cclxuZnVuY3Rpb24gcm90YXRlSW1hZ2UocmVwbDogUmVwbCwgbm9kZTogSFRNTEVsZW1lbnQsIGFuZ2xlOiBzdHJpbmcpIHtcclxuICBpZiAoIW5vZGUpXHJcbiAgICByZXR1cm47XHJcblxyXG4gIGlmICghIWFuZ2xlKSB7XHJcbiAgICB0cmFuc2Zvcm0obm9kZSwgYHJvdGF0ZSgke2FuZ2xlfWRlZylgKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBsZXQgYW5nbGUgPSAwO1xyXG4gICAgbGV0IGFuaW1hdGlvbnMgPSByZXBsLmFuaW1hdGlvbnM7XHJcbiAgICBhbmltYXRpb25zLmFuaW1hdGUoXCJyb3RhdGVcIiwgKCkgPT4ge1xyXG4gICAgICBhbmdsZSArPSAxO1xyXG4gICAgICB0cmFuc2Zvcm0obm9kZSwgYHJvdGF0ZSgke2FuZ2xlfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUm90YXRlUGFuZWxDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRlbHRhOiBudW1iZXIpIHsgfVxyXG5cclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiBgcm90YXRlIHBhbmVsIGJ5ICR7dGhpcy5kZWx0YX0gZGVnYDtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgbGV0IGxhYmVsSW1hZ2VPclBhbmVsID0gcGFuZWwucGFuZWw7XHJcbiAgICAgIHRyYW5zZm9ybShsYWJlbEltYWdlT3JQYW5lbCwgYHJvdGF0ZSgke3RoaXMuZGVsdGF9ZGVnKWApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUm90YXRlSW1hZ2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGRlbHRhPzogbnVtYmVyKSB7IH1cclxuXHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gYHJvdGF0ZSBpbWFnZSBieSAke3RoaXMuZGVsdGF9IGRlZ2A7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBpZiAoISFhcmdzKSB7XHJcbiAgICAgIGxldCBbbm91biwgbm91bjJdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwobm91bik7XHJcbiAgICAgIGlmICghcGFuZWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgcm90YXRlSW1hZ2UocmVwbCwgcGFuZWwuaW1hZ2UsIG5vdW4yKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgbGV0IGxhYmVsSW1hZ2VPclBhbmVsID0gcGFuZWwuaW1hZ2U7XHJcbiAgICAgIHRyYW5zZm9ybShsYWJlbEltYWdlT3JQYW5lbCwgYHJvdGF0ZSgke3RoaXMuZGVsdGF9ZGVnKWApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YToge1xyXG4gICAgeD86IG51bWJlcjtcclxuICAgIHk/OiBudW1iZXI7XHJcbiAgfSkgeyB9XHJcblxyXG4gIGFib3V0KCl7XHJcbiAgICBsZXQgcmVzdWx0ID0gPHN0cmluZ1tdPltdO1xyXG4gICAgbGV0IHggPSB0aGlzLmRlbHRhLnggfHwgMDtcclxuICAgIGxldCB5ID0gdGhpcy5kZWx0YS55IHx8IDA7XHJcblxyXG4gICAgaWYgKHggPiAwKSByZXN1bHQucHVzaChgJHt4fSBweCByaWdodGApO1xyXG4gICAgaWYgKHggPCAwKSByZXN1bHQucHVzaChgJHsteH0gcHggbGVmdGApO1xyXG4gICAgaWYgKHkgPiAwKSByZXN1bHQucHVzaChgJHt5fSBweCB1cGApO1xyXG4gICAgaWYgKHkgPCAwKSByZXN1bHQucHVzaChgJHsteX0gcHggZG93bmApO1xyXG4gICAgcmV0dXJuIGBtb3ZlIHBhbmVsICR7cmVzdWx0LmpvaW4oXCIgYW5kIFwiKX1gO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLnBhbmVsO1xyXG4gICAgICBsZXQgY29tcHV0ZWRUcmFuZm9ybSA9IGdldENvbXB1dGVkU3R5bGUobGFiZWxJbWFnZU9yUGFuZWwpLnRyYW5zZm9ybTtcclxuICAgICAgaWYgKGNvbXB1dGVkVHJhbmZvcm0gPT09IFwibm9uZVwiKSBjb21wdXRlZFRyYW5mb3JtID0gXCJcIjtcclxuICAgICAgbGFiZWxJbWFnZU9yUGFuZWwuc3R5bGUudHJhbnNmb3JtID0gY29tcHV0ZWRUcmFuZm9ybSArIGAgdHJhbnNsYXRlKCR7dGhpcy5kZWx0YS54IHx8IDB9cHgsICR7dGhpcy5kZWx0YS55IHx8IDB9cHgpYDtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3BDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgYWJvdXQoKSB7IHJldHVybiBcIlN0b3AgQW5pbWF0aW9uc1wiO31cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCFyZXBsLmFuaW1hdGlvbnMuYW5pbWF0aW9ucy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgIHJlcGwuYW5pbWF0aW9ucy5zdG9wKGFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvZ2dsZUZvY3VzQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGFib3V0KCkgeyByZXR1cm4gXCJUb2dnbGUgZm9jdXNcIjt9XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IGFjdGl2ZVBhbmVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgIGlmICghYWN0aXZlUGFuZWw/LmNsYXNzTGlzdC5jb250YWlucyhcInBhbmVsXCIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBhY3RpdmVQYW5lbC5jbGFzc0xpc3QudG9nZ2xlKFwiZm9jdXNcIik7XHJcbiAgICAvLyBoZXJlIGkgYW0gLSBpZiBub3QgXCJzaGlmdFwiIGtleSB0aGVuIHVuZm9jdXMgYWxsIHBhbmVsc1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5leHBvcnQgY2xhc3MgRXNjYXBlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIFxyXG4gIHByaXZhdGUgaXNQYW5lbChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gICAgaWYgKCFlbGVtZW50KVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbFwiKSB8fCBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInBhbmVsLWNvbnRhaW5lclwiKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2VsZWN0UGFyZW50UGFuZWwoKSB7XHJcbiAgICBsZXQgY3VycmVudFBhbmVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIWN1cnJlbnRQYW5lbClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRQYW5lbCkge1xyXG4gICAgICBjdXJyZW50UGFuZWwgPSBjdXJyZW50UGFuZWwucGFyZW50RWxlbWVudDtcclxuICAgICAgaWYgKCFjdXJyZW50UGFuZWwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBpZiAodGhpcy5pc1BhbmVsKGN1cnJlbnRQYW5lbCkpIHtcclxuICAgICAgICBjdXJyZW50UGFuZWwuZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIC8vIHVuZm9jdXMgYWxsIHBhbmVsc1xyXG4gICAgcmVwbC5wYW5lbHMuZm9yRWFjaChwID0+IHAucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzXCIpKTtcclxuICAgIHRoaXMuc2VsZWN0UGFyZW50UGFuZWwoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGVsdGE6IG51bWJlcikge1xyXG4gICAgfVxyXG5cclxuICAgIGFib3V0KCkge1xyXG4gICAgICByZXR1cm4gYGluY3JlYXNlIGZvbnQgYnkgJHt0aGlzLmRlbHRhfXB4YDtcclxuICAgIH1cclxuXHJcbiAgICBpc0xhYmVsKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGFiZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgICAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICghdGhpcy5pc0xhYmVsKGxhYmVsKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCBmb250U2l6ZSA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShsYWJlbCkuZm9udFNpemUpO1xyXG4gICAgICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemUgKyB0aGlzLmRlbHRhfXB4YDtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgR29vZ2xlTWVkaWFJdGVtIH0gZnJvbSBcIi4vR29vZ2xlTWVkaWFJdGVtXCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlUGhvdG9BUEkge1xyXG4gIGF1dGgyOiB7XHJcbiAgICBnZXRBdXRoSW5zdGFuY2U6ICgpID0+IHtcclxuICAgICAgaXNTaWduZWRJbjoge1xyXG4gICAgICAgIGxpc3RlbjogKGNiOiAoaXNTaWduZWRJbjogYm9vbGVhbikgPT4gdm9pZCkgPT4gdm9pZDtcclxuICAgICAgICBnZXQ6ICgpID0+IGJvb2xlYW47XHJcbiAgICAgIH07XHJcbiAgICAgIHNpZ25JbjogKCkgPT4gdm9pZDtcclxuICAgICAgc2lnbk91dDogKCkgPT4gdm9pZDtcclxuICAgIH07XHJcbiAgfTtcclxuICBsb2FkOiAodHlwZTogc3RyaW5nLCBjYjogRnVuY3Rpb24pID0+IHZvaWQ7XHJcbiAgY2xpZW50OiB7XHJcbiAgICBpbml0OiAoYXJnczoge1xyXG4gICAgICBhcGlLZXk6IHN0cmluZztcclxuICAgICAgZGlzY292ZXJ5RG9jczogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgY2xpZW50SWQ6IHN0cmluZztcclxuICAgICAgc2NvcGU6IHN0cmluZztcclxuICAgIH0pID0+IFByb21pc2U8YW55PjtcclxuICAgIHBob3Rvc2xpYnJhcnk6IHtcclxuICAgICAgYWxidW1zOiB7XHJcbiAgICAgICAgbGlzdDogRnVuY3Rpb247XHJcbiAgICAgIH07XHJcbiAgICAgIG1lZGlhSXRlbXM6IHtcclxuICAgICAgICBzZWFyY2g6IChhcmdzOiB7XHJcbiAgICAgICAgICBhbGJ1bUlkOiBzdHJpbmc7XHJcbiAgICAgICAgICBwYWdlVG9rZW4/OiBzdHJpbmc7XHJcbiAgICAgICAgfSkgPT4gUHJvbWlzZTx7XHJcbiAgICAgICAgICByZXN1bHQ6IHtcclxuICAgICAgICAgICAgbmV4dFBhZ2VUb2tlbj86IHN0cmluZztcclxuICAgICAgICAgICAgbWVkaWFJdGVtczogQXJyYXk8R29vZ2xlTWVkaWFJdGVtPjtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfT47XHJcbiAgICAgICAgZ2V0OiAobWVkaWFJdGVtSWQ6IGFueSkgPT4gUHJvbWlzZTx7XHJcbiAgICAgICAgICByZXN1bHQ6IEdvb2dsZU1lZGlhSXRlbTtcclxuICAgICAgICB9PjtcclxuICAgICAgfTtcclxuICAgIH07XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVQaG90b0FQSSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlUGhvdG9BUElcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGdhcGk6IEdvb2dsZVBob3RvQVBJO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBob3RvU2lnbmluIHtcclxuICBwcml2YXRlIHBlb3BsZUFwaURpc2NvdmVyeSA9IFwiXCI7XHJcbiAgLy8gd2hlcmUgdG8gc3RvcmUgdGhlc2UgdmFsdWVzP1xyXG4gIHByaXZhdGUgc2NvcGVzID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3Bob3Rvc2xpYnJhcnkucmVhZG9ubHlcIjtcclxuICBwcml2YXRlIGF1dGhvcml6ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0aG9yaXplLWJ1dHRvblwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBwcml2YXRlIHNpZ25vdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25vdXQtYnV0dG9uXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIHByaXZhdGUgcmVhZHkgPSAoKSA9PiB7IH07XHJcbiAgYXN5bmMgaGFuZGxlQ2xpZW50TG9hZCgpIHtcclxuICAgIC8vIExvYWQgdGhlIEFQSSBjbGllbnQgYW5kIGF1dGgyIGxpYnJhcnkuXHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGdhcGkubG9hZChcImNsaWVudDphdXRoMlwiLCByZXNvbHZlKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGNyZWRlbnRpYWxzUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi4vd2ViL2NyZWRlbnRpYWxzLmpzb25cIik7XHJcbiAgICBsZXQgY3JlZGVudGlhbHM6IHtcclxuICAgICAgYXBpS2V5OiBzdHJpbmc7XHJcbiAgICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICB9ID0gYXdhaXQgY3JlZGVudGlhbHNSZXNwb25zZS5qc29uKCk7XHJcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGZldGNoKFwiLi93ZWIvcGhvdG9zX3Jlc3RfdjEuanNvblwiKTtcclxuICAgIHRoaXMucGVvcGxlQXBpRGlzY292ZXJ5ID0gYXdhaXQgcmVzcC5qc29uKCk7XHJcbiAgICBhd2FpdCB0aGlzLmluaXRDbGllbnQoY3JlZGVudGlhbHMpO1xyXG4gIH1cclxuICBwcml2YXRlIGFzeW5jIGluaXRDbGllbnQoYXJnczoge1xyXG4gICAgYXBpS2V5OiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gIH0pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChnb29kLCBiYWQpID0+IHtcclxuICAgICAgdGhpcy5yZWFkeSA9ICgpID0+IGdvb2QoKTtcclxuICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7XHJcbiAgICAgICAgYXBpS2V5OiBhcmdzLmFwaUtleSxcclxuICAgICAgICBkaXNjb3ZlcnlEb2NzOiBbdGhpcy5wZW9wbGVBcGlEaXNjb3ZlcnldLFxyXG4gICAgICAgIGNsaWVudElkOiBhcmdzLmNsaWVudElkLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlcyxcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIExpc3RlbiBmb3Igc2lnbi1pbiBzdGF0ZSBjaGFuZ2VzLlxyXG4gICAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLmlzU2lnbmVkSW4ubGlzdGVuKHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKTtcclxuICAgICAgLy8gSGFuZGxlIHRoZSBpbml0aWFsIHNpZ24taW4gc3RhdGUuXHJcbiAgICAgIHRoaXMudXBkYXRlU2lnbmluU3RhdHVzKGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuaXNTaWduZWRJbi5nZXQoKSk7XHJcbiAgICAgIHRoaXMuYXV0aG9yaXplQnV0dG9uLm9uY2xpY2sgPSB0aGlzLmhhbmRsZUF1dGhDbGljaztcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uLm9uY2xpY2sgPSB0aGlzLmhhbmRsZVNpZ25vdXRDbGljaztcclxuICAgIH0pO1xyXG4gIH1cclxuICBwcml2YXRlIHVwZGF0ZVNpZ25pblN0YXR1cyhpc1NpZ25lZEluOiBib29sZWFuKSB7XHJcbiAgICBpZiAoaXNTaWduZWRJbikge1xyXG4gICAgICB0aGlzLmF1dGhvcml6ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIHRoaXMuc2lnbm91dEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICB0aGlzLnJlYWR5KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRob3JpemVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgdGhpcy5zaWdub3V0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBoYW5kbGVBdXRoQ2xpY2soKSB7XHJcbiAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLnNpZ25JbigpO1xyXG4gIH1cclxuICBwcml2YXRlIGhhbmRsZVNpZ25vdXRDbGljaygpIHtcclxuICAgIGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCkuc2lnbk91dCgpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEdvb2dsZUFsYnVtIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgY292ZXJQaG90b0Jhc2VVcmw6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBHb29nbGVQaG90b1NpZ25pbiB9IGZyb20gXCIuL0dvb2dsZVBob3RvU2lnbmluXCI7XHJcbmltcG9ydCB7IEdvb2dsZU1lZGlhSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlTWVkaWFJdGVtXCI7XHJcbmltcG9ydCB7IEdvb2dsZUFsYnVtIH0gZnJvbSBcIi4uL21vZGVscy9Hb29nbGVBbGJ1bVwiO1xyXG5pbXBvcnQgeyBHb29nbGVQaG90b0FQSSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlUGhvdG9BUElcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGdhcGk6IEdvb2dsZVBob3RvQVBJO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBob3RvcyB7XHJcblxyXG4gIGFzeW5jIGdldEFsYnVtcygpIHtcclxuICAgIGxldCBzaWduaW4gPSBuZXcgR29vZ2xlUGhvdG9TaWduaW4oKTtcclxuICAgIGF3YWl0IHNpZ25pbi5oYW5kbGVDbGllbnRMb2FkKCk7XHJcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkuYWxidW1zLmxpc3QoKTtcclxuICAgIGlmIChyZXNwLnN0YXR1cyAhPT0gMjAwKVxyXG4gICAgICB0aHJvdyBgc3RhdHVzOiAke3Jlc3Auc3RhdHVzfWA7XHJcbiAgICBjb25zb2xlLmxvZyh7IHJlc3AgfSk7XHJcbiAgICBsZXQgYWxidW1zID0gcmVzcC5yZXN1bHQuYWxidW1zIGFzIEFycmF5PEdvb2dsZUFsYnVtPjtcclxuICAgIHdoaWxlIChyZXNwLnJlc3VsdC5uZXh0UGFnZVRva2VuKSB7XHJcbiAgICAgIHJlc3AgPSBhd2FpdCBnYXBpLmNsaWVudC5waG90b3NsaWJyYXJ5LmFsYnVtcy5saXN0KHtwYWdlVG9rZW46IHJlc3AucmVzdWx0Lm5leHRQYWdlVG9rZW59KTtcclxuICAgICAgaWYgKHJlc3Auc3RhdHVzICE9PSAyMDApXHJcbiAgICAgICAgdGhyb3cgYHN0YXR1czogJHtyZXNwLnN0YXR1c31gO1xyXG4gICAgICBjb25zb2xlLmxvZyh7IHJlc3AgfSk7XHJcbiAgICAgIGFsYnVtcyA9IGFsYnVtcy5jb25jYXQocmVzcC5yZXN1bHQuYWxidW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhbGJ1bXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGJ1bShhbGJ1bTogR29vZ2xlQWxidW0pIHtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5tZWRpYUl0ZW1zLnNlYXJjaCh7IGFsYnVtSWQ6IGFsYnVtLmlkIH0pO1xyXG4gICAgbGV0IHttZWRpYUl0ZW1zfSA9IGRhdGEucmVzdWx0O1xyXG4gICAgd2hpbGUgKGRhdGEucmVzdWx0Lm5leHRQYWdlVG9rZW4pIHtcclxuICAgICAgZGF0YSA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkubWVkaWFJdGVtcy5zZWFyY2goeyBhbGJ1bUlkOiBhbGJ1bS5pZCwgcGFnZVRva2VuOiBkYXRhLnJlc3VsdC5uZXh0UGFnZVRva2VuIH0pO1xyXG4gICAgICBtZWRpYUl0ZW1zLnB1c2goLi4uZGF0YS5yZXN1bHQubWVkaWFJdGVtcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVkaWFJdGVtcztcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFBob3RvKG1lZGlhSXRlbUlkOiBzdHJpbmcpIHtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5tZWRpYUl0ZW1zLmdldCh7IG1lZGlhSXRlbUlkIH0pO1xyXG4gICAgcmV0dXJuIChkYXRhLnJlc3VsdCkgYXMgR29vZ2xlTWVkaWFJdGVtO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBHb29nbGVQaG90b3MgfSBmcm9tIFwiLi4vY29udHJvbHMvR29vZ2xlUGhvdG9zXCI7XHJcbmltcG9ydCB7IEdvb2dsZUNvbGxhZ2VQaG90byB9IGZyb20gXCIuLi9jb250cm9scy9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBPcGVuQWxidW1zQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgYXN5bmMgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxmYWxzZSB8IHZvaWQ+IHtcclxuICAgICAgICBpZiAoIWFyZ3MpIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuQWxidW1zKHJlcGwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbGJ1bU5hbWVzID0gYXJncy5zcGxpdChcIixcIik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5vcGVuQWxidW1zKHJlcGwsIGFsYnVtTmFtZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9wZW5BbGJ1bXMocmVwbDogUmVwbCwgYWxidW1OYW1lcz86IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgcGhvdG9zID0gbmV3IEdvb2dsZVBob3RvcygpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG9zXCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgbGV0IGFsYnVtcyA9IGF3YWl0IHBob3Rvcy5nZXRBbGJ1bXMoKTtcclxuICAgICAgICAgICAgaWYgKGFsYnVtTmFtZXMpIGFsYnVtcyA9IGFsYnVtcy5maWx0ZXIoYSA9PiAtMSA8IGFsYnVtTmFtZXMuaW5kZXhPZihhLnRpdGxlKSk7XHJcbiAgICAgICAgICAgIGFsYnVtcy5mb3JFYWNoKGFzeW5jIChhbGJ1bSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9wZW5pbmcgYWxidW06ICR7YWxidW0uaWR9ICgke2FsYnVtLnRpdGxlfSlgKTtcclxuICAgICAgICAgICAgICAgIGxldCBtZWRpYUl0ZW1zID0gYXdhaXQgcGhvdG9zLmdldEFsYnVtKGFsYnVtKTtcclxuICAgICAgICAgICAgICAgIG1lZGlhSXRlbXMuZm9yRWFjaChtZWRpYUl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaG90byA9IG5ldyBHb29nbGVDb2xsYWdlUGhvdG8obWVkaWFJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBsLnBob3Rvcy5wdXNoKHBob3RvKTtcclxuICAgICAgICAgICAgICAgICAgICBwaG90by5yZW5kZXJJbnRvKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbC5yZWluZGV4UGhvdG9zKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvciB9IGZyb20gXCIuLi9tb2RlbHMvQmVoYXZpb3JcIjtcclxuXHJcbi8qKlxyXG4gKiBXaGVuIHVzZXIgc2hpZnQtY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzc1xyXG4gKiBXaGVuIHVzZXIgY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzcywgcmVtb3ZlIFwiZm9jdXNcIiBmcm9tIGFsbCBvdGhlcnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdG9yIGltcGxlbWVudHMgQmVoYXZpb3I8UmVwbD5cclxue1xyXG4gICAgZXh0ZW5kKGNvbnRyb2w6IFJlcGwpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgY3VycmVudCBcImZvY3VzXCIgaWYgc2hpZnQgbm90IGNsaWNrZWRcclxuICAgICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbC5wYW5lbHMuZm9yRWFjaChwID0+IHAucGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGFuZWxzID0gZXZlbnQuY29tcG9zZWRQYXRoKCk7XHJcbiAgICAgICAgICAgIHBhbmVscyA9IHBhbmVscy5maWx0ZXIoKG5vZGU6IGFueSkgPT4gdHJ1ZSA9PT0gbm9kZT8uY2xhc3NMaXN0Py5jb250YWlucyhcInBhbmVsXCIpKSBhcyBBcnJheTxIVE1MRWxlbWVudD47ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhbmVscy5mb3JFYWNoKChub2RlOiBhbnkpID0+IG5vZGUuY2xhc3NMaXN0LnRvZ2dsZShcImZvY3VzXCIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi4vbW9kZWxzL0JlaGF2aW9yXCI7XHJcbmltcG9ydCB7IFRvYXN0ZXIgfSBmcm9tIFwiLi4vY29udHJvbHMvVG9hc3RlclwiO1xyXG5cclxuLyoqXHJcbiAqIFdoZW4gdXNlciBzaGlmdC1jbGlja3MgYSBwYW5lbCBhZGQgXCJmb2N1c1wiIGNsYXNzXHJcbiAqIFdoZW4gdXNlciBjbGlja3MgYSBwYW5lbCBhZGQgXCJmb2N1c1wiIGNsYXNzLCByZW1vdmUgXCJmb2N1c1wiIGZyb20gYWxsIG90aGVyc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkJlaGF2aW9yIGltcGxlbWVudHMgQmVoYXZpb3I8UmVwbD5cclxue1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRvYXN0ZXI6IFRvYXN0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBleHRlbmQoY29udHJvbDogUmVwbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBub3RpZnkgPSBjb250cm9sLm5vdGlmeTtcclxuICAgICAgICBjb250cm9sLm5vdGlmeSA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbm90aWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0ZXIudG9hc3QobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5pbXBvcnQgeyBDb2xsYWdlUGFuZWwgfSBmcm9tIFwiLi4vY29udHJvbHMvQ29sbGFnZVBhbmVsXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICogU2NhbGUgdGhlIGltYWdlXHJcbiAqIEBwYXJhbSBzY2FsZSBwZXJjZW50YWdlIGRlbHRhIGZyb20gY3VycmVudCBzY2FsZVxyXG4gKi9cclxuZnVuY3Rpb24gc2NhbGVJbWFnZShyZXBsOiBSZXBsLCBwYW5lbDogQ29sbGFnZVBhbmVsLCBzY2FsZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IHBhbmVsLmltYWdlO1xyXG4gICAgaWYgKCFub2RlKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBpZiAoIXNjYWxlKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS53aWR0aDtcclxuICAgICAgICBsZXQgc2NhbGUgPSBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDtcclxuICAgICAgICByZXBsLmFuaW1hdGlvbnMuYW5pbWF0ZShcInpvb21cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBzY2FsZSAqPSAxLjAxO1xyXG4gICAgICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gYCR7MTAwICogc2NhbGV9JWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBjb21wdXRlIGZvY2FsIHBvaW50IHRvIHpvb20gYWJvdXRcclxuICAgICAgICAvLyBsZXQgaW1hZ2VCb3ggPSBiYm94KG5vZGUpO1xyXG4gICAgICAgIC8vIGxldCBwYW5lbEJveCA9IGJib3gocGFuZWwucGFuZWwpO1xyXG4gICAgICAgIC8vIGxldCBmb2NhbFBvaW50ID0gWy1pbWFnZUJveC5sZWZ0ICsgcGFuZWxCb3gud2lkdGggLyAyLCAtaW1hZ2VCb3gudG9wICsgcGFuZWxCb3guaGVpZ2h0IC8gMl07XHJcbiAgICAgICAgbGV0IGVmZmVjdGl2ZVNjYWxlID0gcGFyc2VGbG9hdChzY2FsZSk7XHJcbiAgICAgICAgLy9ub2RlLnN0eWxlLndpZHRoID0gYCR7MTAwICogZWZmZWN0aXZlU2NhbGV9JWA7XHJcbiAgICAgICAgLy8gdGhlIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQgY2hhbmdlZCwgdHJhbnNsYXRlIHRoZSBvcmlnaW5hbCBpbWFnZVxyXG4gICAgICAgIC8vIGNlbnRlciBiYWNrIHRvIHRoZSBwYW5lbCBjZW50ZXJcclxuICAgICAgICB0cmFuc2Zvcm0obm9kZSwgYHNjYWxlKCR7ZWZmZWN0aXZlU2NhbGV9LCR7ZWZmZWN0aXZlU2NhbGV9KWApO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjYWxlUGFuZWxDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NhbGU/OiBudW1iZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBhYm91dCgpIHtcclxuICAgICAgcmV0dXJuIGBzY2FsZSBwYW5lbCBieSAkeyh0aGlzLnNjYWxlfHwwKS50b0ZpeGVkKDMpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgICAgICBpZiAoISFhcmdzKSB7XHJcbiAgICAgICAgICAgIGxldCBbbm91biwgbm91bjJdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwobm91bik7XHJcbiAgICAgICAgICAgIGlmICghcGFuZWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcGFuZWwuc2NhbGVGcmFtZShub3VuMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgICAgICAgcGFuZWwuc2NhbGVGcmFtZSh0aGlzLnNjYWxlICsgXCJcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2FsZUltYWdlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHNjYWxlPzogbnVtYmVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgYWJvdXQoKSB7XHJcbiAgICAgIHJldHVybiBgc2NhbGUgaW1hZ2UgYnkgJHsodGhpcy5zY2FsZXx8MCkudG9GaXhlZCgzKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICAgICAgaWYgKCEhYXJncykge1xyXG4gICAgICAgICAgICBsZXQgW2lkLCBzY2FsZV0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgbGV0IHBhbmVsID0gcmVwbC5zZWxlY3RQYW5lbChpZCk7XHJcbiAgICAgICAgICAgIGlmICghcGFuZWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgc2NhbGVJbWFnZShyZXBsLCBwYW5lbCwgc2NhbGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc2NhbGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcclxuICAgICAgICAgICAgc2NhbGVJbWFnZShyZXBsLCBwYW5lbCwgdGhpcy5zY2FsZSArIFwiXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSBcIi4vY29udHJvbHMvVG9hc3RlclwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcCB9IGZyb20gXCIuL2NvbnRyb2xzL0RyYWdBbmREcm9wXCI7XHJcbmltcG9ydCB7IENvbW1hbmRzIH0gZnJvbSBcIi4vY29udHJvbHMvQ29tbWFuZHNcIjtcclxuaW1wb3J0IHsgSGVscENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9IZWxwXCI7XHJcbmltcG9ydCB7IFNwbGl0Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1NwbGl0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBBc3BlY3RSYXRpb0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Bc3BlY3RSYXRpb0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgQm9yZGVyQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0JvcmRlckNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhbmdlU3R5bGVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlU3R5bGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IEdvdG9Db21tYW5kRWRpdG9yQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTd2FwUGFuZWxzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kXCI7XHJcbmltcG9ydCB7IEdvdG9Db21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvR290b0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgVGV4dENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9UZXh0Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBQYWRDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvUGFkQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1RyYW5zbGF0ZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWFyZ2luQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01hcmdpbkNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWVyZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvTWVyZ2VDb21tYW5kXCI7XHJcbmltcG9ydCB7IEhpUmVzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0hpUmVzQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNb3ZlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01vdmVDb21tYW5kXCI7XHJcbmltcG9ydCB7IFJvdGF0ZVBhbmVsQ29tbWFuZCwgUm90YXRlSW1hZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlUm90YXRpb25Db21tYW5kXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0NoYW5nZVBvc2l0aW9uQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBTdG9wQ29tbWFuZCwgVG9nZ2xlRm9jdXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvU3RvcENvbW1hbmRcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVycyB9IGZyb20gXCIuL2NvbnRyb2xzL0tleWJvYXJkSGFuZGxlcnNcIjtcclxuaW1wb3J0IHsgRXNjYXBlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0VzY2FwZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgQ2hhbmdlRm9udFNpemVDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kXCI7XHJcbmltcG9ydCB7IE9wZW5BbGJ1bXNDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RvciB9IGZyb20gXCIuL2JlaGF2aW9yL011bHRpU2VsZWN0b3JcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uQmVoYXZpb3IgfSBmcm9tIFwiLi9iZWhhdmlvci9Ob3RpZmljYXRpb25CZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBTY2FsZVBhbmVsQ29tbWFuZCwgU2NhbGVJbWFnZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmRcIjtcclxuXHJcbi8qKiBnbG9iYWwgdmFyaWFibGVzICovXHJcbmNvbnN0IHRvYXN0ZXIgPSBuZXcgVG9hc3Rlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0ZXJcIikgYXMgSFRNTEVsZW1lbnQpO1xyXG5jb25zdCBjb21tYW5kcyA9IG5ldyBDb21tYW5kcygpO1xyXG5jb25zdCByZXBsID0gbmV3IFJlcGwoY29tbWFuZHMpO1xyXG5jb25zdCBrZXlib2FyZEhhbmRsZXJzID0gbmV3IEtleWJvYXJkSGFuZGxlcnMoKTtcclxucmVwbC51c2UobmV3IE11bHRpU2VsZWN0b3IoKSk7XHJcbnJlcGwudXNlKG5ldyBOb3RpZmljYXRpb25CZWhhdmlvcih0b2FzdGVyKSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgSGVscENvbW1hbmQoKSwgeyBrZXk6IFwiP1wiLCBhYm91dDpcIkhlbHBcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IEVzY2FwZUNvbW1hbmQoKSwgeyBrZXk6IFwiRXNjYXBlXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQoMSksIHsga2V5OiBcIitcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZUZvbnRTaXplQ29tbWFuZCgtMSksIHsga2V5OiBcIi1cIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZVBhbmVsQ29tbWFuZCgxLjAxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIitcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFNjYWxlUGFuZWxDb21tYW5kKDEgLyAxLjAxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIi1cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFNjYWxlSW1hZ2VDb21tYW5kKDEuMDEpLCB7IGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZUltYWdlQ29tbWFuZCgxIC8gMS4wMSksIHsga2V5OiBcIi1cIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoMSksIHsga2V5OiBcIi5cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZUltYWdlQ29tbWFuZCgtMSksIHsga2V5OiBcIixcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZVBhbmVsQ29tbWFuZCgxKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIj5cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFJvdGF0ZVBhbmVsQ29tbWFuZCgtMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCI8XCIgfSk7XHJcblxyXG4vKiogdmltIGNvbW1hbmRzXHJcblRvIG1vdmUgbGVmdCwgcHJlc3MgaC5cclxuVG8gbW92ZSByaWdodCwgcHJlc3MgbC5cclxuVG8gbW92ZSBkb3duLCBwcmVzcyBqLlxyXG5UbyBtb3ZlIHVwLCBwcmVzcyBrLlxyXG4gKi9cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHg6IC0xIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dMZWZ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVQYW5lbENvbW1hbmQoeyB4OiAxIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dSaWdodFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeTogMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93RG93blwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeTogLTEgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJBcnJvd1VwXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeDogLTEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dMZWZ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB4OiAxIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93UmlnaHRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCh7IHk6IDEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dEb3duXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB5OiAtMSB9KSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCJBcnJvd1VwXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwidG9wXCIsIHsgZGVsdGE6IDEsIHVuaXRzOiBcInB4XCIgfSksIHsga2V5OiBcInRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcInRvcFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIlRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImxlZnRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwibFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwibGVmdFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkxcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvdHRvbVwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJiXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3R0b21cIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJCXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJyaWdodFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJyXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJyaWdodFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIlJcIiB9KTtcclxuXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ3aWR0aFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJ3XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ3aWR0aFwiLCB7IGRlbHRhOiAtMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIldcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImhlaWdodFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJoXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJIXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU3dhcFBhbmVsc0NvbW1hbmQoKSwgeyBjdHJsS2V5OiB0cnVlLCBrZXk6IFwic1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU3RvcENvbW1hbmQoKSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIiBcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IEdvdG9Db21tYW5kRWRpdG9yQ29tbWFuZCgpLCB7IGtleTogXCJjXCIsIGFib3V0OlwiZ290byBjb21tYW5kc1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVG9nZ2xlRm9jdXNDb21tYW5kKCksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIgXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUb2dnbGVGb2N1c0NvbW1hbmQoKSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCIgXCIgfSk7XHJcblxyXG5jb25zdCBkbmQgPSBuZXcgRHJhZ0FuZERyb3AocmVwbCwga2V5Ym9hcmRIYW5kbGVycyk7XHJcbnJlcGwuZG5kID0gZG5kO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBIZWxwQ29tbWFuZCgpLCBcIj9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgT3BlbkFsYnVtc0NvbW1hbmQoKSwgXCJvcGVuXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBBc3BlY3RSYXRpb0NvbW1hbmQoKSwgXCJhc3BlY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQm9yZGVyQ29tbWFuZCgpLCBcImJvcmRlclwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBHb3RvQ29tbWFuZCgpLCBcImdvdG9cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgSGlSZXNDb21tYW5kKCksIFwiaGlyZXNcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgTWFyZ2luQ29tbWFuZCgpLCBcIm1hcmdpblwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNZXJnZUNvbW1hbmQoKSwgXCJtZXJnZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBNb3ZlQ29tbWFuZCgpLCBcIm1vdmVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgUGFkQ29tbWFuZCgpLCBcInBhZFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoKSwgXCJyb3RhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU2NhbGVQYW5lbENvbW1hbmQoKSwgXCJzY2FsZVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBTd2FwUGFuZWxzQ29tbWFuZCgpLCBcInN3YXBcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3BsaXRDb21tYW5kKCksIFwic3BsaXRcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3RvcENvbW1hbmQoKSwgXCJzdG9wXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFRleHRDb21tYW5kKCksIFwidGV4dFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoKSwgXCJ0cmFuc2xhdGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKCksIFwicGFuXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFNjYWxlSW1hZ2VDb21tYW5kKCksIFwiem9vbVwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJiYWNrZ3JvdW5kQ29sb3JcIiksIFwiYmdjXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBUb2dnbGVWaXNpYmlsaXR5Q29tbWFuZCh7IHNlbGVjdG9yOiBcIi5jb2xsYWdlIC5wYW5lbC1jb250YWluZXIgLm92ZXJsYXlcIiB9KSwgXCJvdmVybGF5XCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJDb2xvclwiKSwgXCJiY1wiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BDb2xvclwiKSwgXCJiY3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tQ29sb3JcIiksIFwiYmNiXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckxlZnRDb2xvclwiKSwgXCJiY2xcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmlnaHRDb2xvclwiKSwgXCJiY3JcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlcldpZHRoXCIpLCBcImJ3XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckJvdHRvbVdpZHRoXCIpLCBcImJ3YlwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BXaWR0aFwiKSwgXCJid3RcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyTGVmdFdpZHRoXCIpLCBcImJ3bFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJSaWdodFdpZHRoXCIpLCBcImJ3clwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwib3BhY2l0eVwiKSwgXCJvcGFjaXR5XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclJhZGl1c1wiKSwgXCJiclwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BMZWZ0UmFkaXVzXCIpLCBcImJydGxcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wUmlnaHRSYWRpdXNcIiksIFwiYnJ0clwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJCb3R0b21MZWZ0UmFkaXVzXCIpLCBcImJyYmxcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tUmlnaHRSYWRpdXNcIiksIFwiYnJiclwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwid2lkdGhcIiwgeyB1bml0czogXCJlbVwiIH0pLCBcIndpZHRoXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImhlaWdodFwiLCB7IHVuaXRzOiBcInB4XCIgfSksIFwiaGVpZ2h0XCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ6SW5kZXhcIiksIFwielwiKTtcclxuXHJcbnRvYXN0ZXIudG9hc3QoXCJXZWxjb21lIVwiKTtcclxuZXhwb3J0IGxldCBnbG9iYWxzID0ge1xyXG4gICAgYWxsb3dTcGVlY2hSZWNvZ25pdGlvbjogZmFsc2UsXHJcbiAgICBkZWJ1ZzogdHJ1ZSxcclxuICAgIHJlcGwsXHJcbiAgICBkbmQsXHJcbiAgICBrZXlib2FyZEhhbmRsZXJzLFxyXG59XHJcbiIsImltcG9ydCB7IExpc3RlbmVyIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0KCkge1xyXG4gIGxldCByZXBsID0gZ2xvYmFscy5yZXBsO1xyXG4gIGF3YWl0IHJlcGwuc3RhcnR1cCgpO1xyXG4gIGlmIChnbG9iYWxzLmFsbG93U3BlZWNoUmVjb2duaXRpb24pIHtcclxuICAgIGxldCBsaXN0ZW5lciA9IG5ldyBMaXN0ZW5lcigpO1xyXG4gICAgbGlzdGVuZXIubGlzdGVuKCk7XHJcbiAgICBsaXN0ZW5lci5vbihcInNwZWVjaC1kZXRlY3RlZFwiLCB2YWx1ZSA9PiB7IHJlcGwuZXhlY3V0ZUNvbW1hbmQocmVwbC5wYXJzZUNvbW1hbmQodmFsdWUucmVzdWx0KSk7IH0pO1xyXG4gIH1cclxuICByZXBsLmdldFBob3RvT3ZlcmxheXMoKS5mb3JFYWNoKG92ZXJsYXkgPT4ge1xyXG4gICAgZ2xvYmFscy5kbmQuZHJhZ2dhYmxlKG92ZXJsYXkpO1xyXG4gICAgY29uc29sZS5sb2coYCR7b3ZlcmxheS5pbm5lckhUTUx9IGlzIGRyYWdnYWJsZWApO1xyXG4gIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IHN0YXJ0IH0gZnJvbSBcIi4vY29sbGFnZS9mdW4vc3RhcnRcIjtcclxuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gXCIuL2NvbGxhZ2UvZ2xvYmFsc1wiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gcnVuKCkge1xyXG4gICAgc3RhcnQoKTtcclxuXHJcbiAgICBjb25zdCByZXBsID0gZ2xvYmFscy5yZXBsO1xyXG5cclxuICAgIHJlcGwuZXZhbChcImFzcGVjdCA2IDZcIik7XHJcbiAgICBpZiAoZ2xvYmFscy5kZWJ1Zykge1xyXG4gICAgICByZXBsLmV2YWwoXCI/XCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcInNwbGl0IDFcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgNCAzXCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcInNwbGl0IDJcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgNCA1XCIpO1xyXG4gICAgICAgIHJlcGwuZXZhbChcIm1lcmdlIDIgM1wiKTtcclxuICAgICAgICAvLy9yZXBsLmV2YWwoXCJzcGxpdCAxXCIpO1xyXG5cclxuICAgICAgICByZXBsLmV2YWwoXCJidyAxZW1cIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYmMgd2hpdGVcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwiYmdjIHNpbHZlclwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzY2FsZSAxIDAuNzVcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiYm9yZGVyIDEgMyBzaWx2ZXJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwicm90YXRlIDEgLTJcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiem9vbSAyIDAuNVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzcGxpdCAxXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcIm1lcmdlIDEgMlwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJzcGxpdCA2XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcIm1lcmdlIDggOVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJtZXJnZSA2IDdcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwiZ290byAxXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInRleHQgMSBTdW1tZXIgMjAxOVwiKTtcclxucmV0dXJuO1xyXG4gICAgICAgIGF3YWl0IHJlcGwuZXZhbChcIm9wZW4gRGF0ZSBOaWdodCwyMDE5XCIpOyAvLyBwcmVzZW50IGxpc3Qgb2YgZ29vZ2xlIHBob3RvIGFsYnVtcz9cclxuICAgICAgICAvL2F3YWl0IHJlcGwuZXZhbChcIm9wZW4gZ3AgMTk5OVwiKTsgLy8gb3BlbiBnb29nbGUgcGhvdG8gYWxidW0gXCIxOTk5XCI/XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFuZWxDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29sbGFnZSAucGFuZWxcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgcGhvdG9Db3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29sbGFnZSAucGhvdG9zIC5pbWdcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBwYW5lbENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlcGwuZXZhbChgbW92ZSAkezEgKyAoaSAtIDEpICUgcGhvdG9Db3VudH0gJHtpfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHJlcGwuZXZhbChcIm9wZW4gMVwiKTtcclxuICAgICAgICAgICAgLy8gcmVwbC5ldmFsKFwiaGlyZXMgNlwiKTtcclxuICAgICAgICAgICAgLy8gcmVwbC5ldmFsKFwiZXhwb3J0XCIpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5ydW4oKTtcclxuIl19
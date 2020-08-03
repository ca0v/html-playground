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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xsYWdlL21vZGVscy9EaWN0aW9uYXJ5LnRzIiwiY29sbGFnZS9jb250cm9scy9MaXN0ZW5lci50cyIsImNvbGxhZ2UvY29udHJvbHMvVG9hc3Rlci50cyIsImNvbGxhZ2UvZnVuL3RhaWwudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRQYXJzZXIudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQaG90by50cyIsImNvbGxhZ2UvbW9kZWxzL0dvb2dsZU1lZGlhSXRlbS50cyIsImNvbGxhZ2UvY29udHJvbHMvR29vZ2xlQ29sbGFnZVBob3RvLnRzIiwiY29sbGFnZS9jb250cm9scy9TcHJpdGUudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbC50cyIsImNvbGxhZ2UvY29udHJvbHMvQW5pbWF0aW9ucy50cyIsImNvbGxhZ2UvbW9kZWxzL0NvbW1hbmQudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0NvbW1hbmRzLnRzIiwiY29sbGFnZS9mdW4vZ2V0QWN0aXZlT3ZlcmxheS50cyIsImNvbGxhZ2UvbW9kZWxzL0tleWJvYXJkSGFuZGxlci50cyIsImNvbGxhZ2UvY29udHJvbHMvS2V5Ym9hcmRIYW5kbGVycy50cyIsImNvbGxhZ2UvZnVuL3RyYW5zZm9ybS50cyIsImNvbGxhZ2UvZnVuL2Jib3gudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0RyYWdBbmREcm9wLnRzIiwiY29sbGFnZS9tb2RlbHMvQmVoYXZpb3IudHMiLCJjb2xsYWdlL2NvbnRyb2xzL1JlcGwudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hlbHAudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1NwbGl0Q29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQXNwZWN0UmF0aW9Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Cb3JkZXJDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTdHlsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0dvdG9Db21tYW5kRWRpdG9yQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvZ2V0Rm9jdXNQYW5lbHMudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1N3YXBQYW5lbHNDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9Hb3RvQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvVGV4dENvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1BhZENvbW1hbmQudHMiLCJjb2xsYWdlL2Z1bi9pc1Zpc2libGUudHMiLCJjb2xsYWdlL2NvbW1hbmRzL1RvZ2dsZVZpc2liaWxpdHlDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9UcmFuc2xhdGVDb21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NYXJnaW5Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9NZXJnZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0hpUmVzQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvTW92ZUNvbW1hbmQudHMiLCJjb2xsYWdlL2NvbW1hbmRzL0NoYW5nZVJvdGF0aW9uQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlUG9zaXRpb25Db21tYW5kLnRzIiwiY29sbGFnZS9jb21tYW5kcy9TdG9wQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvRXNjYXBlQ29tbWFuZC50cyIsImNvbGxhZ2UvY29tbWFuZHMvQ2hhbmdlRm9udFNpemVDb21tYW5kLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlUGhvdG9BUEkudHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3RvU2lnbmluLnRzIiwiY29sbGFnZS9tb2RlbHMvR29vZ2xlQWxidW0udHMiLCJjb2xsYWdlL2NvbnRyb2xzL0dvb2dsZVBob3Rvcy50cyIsImNvbGxhZ2UvY29tbWFuZHMvT3BlbkFsYnVtc0NvbW1hbmQudHMiLCJjb2xsYWdlL2JlaGF2aW9yL011bHRpU2VsZWN0b3IudHMiLCJjb2xsYWdlL2JlaGF2aW9yL05vdGlmaWNhdGlvbkJlaGF2aW9yLnRzIiwiY29sbGFnZS9jb21tYW5kcy9DaGFuZ2VTY2FsZUNvbW1hbmQudHMiLCJjb2xsYWdlL2dsb2JhbHMudHMiLCJjb2xsYWdlL2Z1bi9zdGFydC50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lDQ0E7O09BRUc7SUFDSCxNQUFhLFFBQVE7UUFJbkI7WUFGQSxZQUFPLEdBQVksSUFBSSxDQUFDO1lBQ3hCLGNBQVMsR0FBWSxJQUFJLENBQUM7WUFrQ2xCLGVBQVUsR0FHSCxFQUFFLENBQUM7WUFuQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBVSxNQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRSxDQUFDO1lBQ2xFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbkMsV0FBVyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDbkMsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDL0IsV0FBVyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDM0IsV0FBVyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDaEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxJQUFJLENBQUMsU0FBUztvQkFDaEIsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUs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QUMzRSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSwwQ0FBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUYsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksMENBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFM0Y7Ozs7O09BS0c7SUFDSCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSw2Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzdHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzdHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzVHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLDZDQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFFM0csZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksd0NBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM5RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx3Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM5RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx3Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM3RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx3Q0FBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRTVHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN6RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1RyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSx1Q0FBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRTVILGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElB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QUMxQix1QkFBdUI7WUFDdkIsbUNBQW1DO1lBQzNDLE9BQU87WUFDQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLHVDQUF1QztZQUNoRixxRUFBcUU7WUFFckUsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JFLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDM0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdEQ7Z0JBQ0QsdUJBQXVCO2dCQUN2Qix3QkFBd0I7Z0JBQ3hCLHVCQUF1QjtZQUMzQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDWjtJQUNMLENBQUM7SUFFRCxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBPbmUgYmlnIGhhcHB5IGZhbWlseSBvZiBjbGFzc2VzIHRvIGF2b2lkIGxvYWRpbmdcclxuICogYW5kIGNvbmNhdGluYXRpb25cclxuICovXHJcbi8qKiBJbnRlcmZhY2VzICAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIERpY3Rpb25hcnk8VD4ge1xyXG4gIFtLZXk6IHN0cmluZ106IFQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gXCIuLi9tb2RlbHMvRGljdGlvbmFyeVwiO1xyXG4vKipcclxuICogR29vZ2xlIHNwZWVjaCByZWNvZ25pdGlvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExpc3RlbmVyIHtcclxuICByZWNvZ25pdGlvbjogU3BlZWNoUmVjb2duaXRpb247XHJcbiAgc3RvcHBlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgYXV0b3N0YXJ0OiBib29sZWFuID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucmVjb2duaXRpb24gPSBuZXcgKDxhbnk+d2luZG93KVtcIndlYmtpdFNwZWVjaFJlY29nbml0aW9uXCJdKCk7XHJcbiAgICBsZXQgcmVjb2duaXRpb24gPSB0aGlzLnJlY29nbml0aW9uO1xyXG4gICAgcmVjb2duaXRpb24uaW50ZXJpbVJlc3VsdHMgPSBmYWxzZTtcclxuICAgIHJlY29nbml0aW9uLmNvbnRpbnVvdXMgPSBmYWxzZTtcclxuICAgIHJlY29nbml0aW9uLmxhbmcgPSBcImVuLVBIXCI7XHJcbiAgICByZWNvZ25pdGlvbi5tYXhBbHRlcm5hdGl2ZXMgPSA1O1xyXG4gICAgcmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcInN0YXJ0XCIsIGUgPT4ge1xyXG4gICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImVuZFwiLCBlID0+IHtcclxuICAgICAgdGhpcy5zdG9wcGVkID0gZmFsc2U7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9zdGFydClcclxuICAgICAgICByZWNvZ25pdGlvbi5zdGFydCgpO1xyXG4gICAgfSk7XHJcbiAgICByZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKFwicmVzdWx0XCIsIGUgPT4ge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGUucmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBlLnJlc3VsdHNbaV07XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0ZpbmFsKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNjcmlwdCA9IHJlc3VsdFtqXS50cmFuc2NyaXB0O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0cmFuc2NyaXB0LCByZXN1bHRbal0pO1xyXG4gICAgICAgICAgICBsZXQgY29uZmlkZW5jZSA9IHJlc3VsdFtqXS5jb25maWRlbmNlO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJzcGVlY2gtZGV0ZWN0ZWRcIiwge1xyXG4gICAgICAgICAgICAgIHJlc3VsdDogdHJhbnNjcmlwdCxcclxuICAgICAgICAgICAgICBwb3dlcjogY29uZmlkZW5jZSAqIDEwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NhbGxiYWNrczogRGljdGlvbmFyeTxBcnJheTwodmFsdWU6IHtcclxuICAgIHJlc3VsdDogc3RyaW5nO1xyXG4gICAgcG93ZXI6IG51bWJlcjtcclxuICB9KSA9PiB2b2lkPj4gPSB7fTtcclxuICBwcml2YXRlIGNhbGxiYWNrcyh0b3BpYzogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW3RvcGljXSA9IHRoaXMuX2NhbGxiYWNrc1t0b3BpY10gPz8gW107XHJcbiAgfVxyXG4gIG9uKHRvcGljOiBzdHJpbmcsIGNiOiAodmFsdWU6IHtcclxuICAgIHJlc3VsdDogc3RyaW5nO1xyXG4gICAgcG93ZXI6IG51bWJlcjtcclxuICB9KSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLmNhbGxiYWNrcyh0b3BpYykucHVzaChjYik7XHJcbiAgfVxyXG4gIHRyaWdnZXIodG9waWM6IHN0cmluZywgdmFsdWU6IHtcclxuICAgIHJlc3VsdDogc3RyaW5nO1xyXG4gICAgcG93ZXI6IG51bWJlcjtcclxuICB9KSB7XHJcbiAgICB0aGlzLmNhbGxiYWNrcyh0b3BpYykuZm9yRWFjaChjYiA9PiBjYih2YWx1ZSkpO1xyXG4gIH1cclxuICBsaXN0ZW4oKSB7XHJcbiAgICBpZiAodGhpcy5zdG9wcGVkKVxyXG4gICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0KCk7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IG1lc3NhZ2VEdXJhdGlvbiA9IDUwMDA7XHJcbmNvbnN0IGZhZGVEZWxheSA9IDE1MDA7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmYWRlT3V0KG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGdvb2QsIGJhZCkgPT4ge1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChcImZhZGUtb3V0XCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZ29vZChub2RlKSwgZmFkZURlbGF5KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG9hc3RlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFyZ2V0OiBIVE1MRWxlbWVudCkgeyBcclxuICAgICAgICBBcnJheS5mcm9tKHRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvYXN0XCIpKS5tYXAodCA9PiB0aGlzLmRlc3Ryb3lUb2FzdCh0IGFzIEhUTUxFbGVtZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImZhZGUtb3V0XCIpO1xyXG4gICAgICAgIGxldCB0b2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdG9hc3QuY2xhc3NMaXN0LmFkZChcInRvYXN0XCIpO1xyXG4gICAgICAgIHRvYXN0LmlubmVyVGV4dCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuaW5zZXJ0QmVmb3JlKHRvYXN0LCB0aGlzLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRlc3Ryb3lUb2FzdCh0b2FzdCksIG1lc3NhZ2VEdXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGVzdHJveVRvYXN0KHRvYXN0OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGF3YWl0IGZhZGVPdXQodG9hc3QpO1xyXG4gICAgICAgIHRvYXN0LnJlbW92ZSgpO1xyXG4gICAgICAgIGlmICghdGhpcy50YXJnZXQucXVlcnlTZWxlY3RvcihcIi50b2FzdFwiKSkgZmFkZU91dCh0aGlzLnRhcmdldCk7XHJcbiAgICB9XHJcbn0iLCIvKiogR2xvYmFsIEZ1bmN0aW9ucyAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGFpbCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgbGV0IGxpc3QgPSB2YWx1ZS5zcGxpdChcIiBcIik7XHJcbiAgbGlzdC5zaGlmdCgpO1xyXG4gIHJldHVybiBsaXN0LmpvaW4oXCIgXCIpO1xyXG59XHJcbiIsIi8qKiBHbG9iYWwgQ2xhc3NlcyAqL1xyXG4vKipcclxuICogVHJ5IHRvIHR1cm4gYSBzcG9rZW4gcGhyYXNlIGludG8gYSBjb21tYW5kIGdyYW1tYXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21tYW5kUGFyc2VyIHtcclxuICBwYXJzZVBocmFzZShwaHJhc2U6IHN0cmluZykge1xyXG4gICAgcGhyYXNlID0gcGhyYXNlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgbWFwID0gPGFueT57XHJcbiAgICAgIFwiem9vbSBpblwiOiBcInpvb21cIixcclxuICAgICAgXCJ6b29tIG91dFwiOiBcInpvb21cIixcclxuICAgICAgXCJkcmFnXCI6IFwicGFuXCIsXHJcbiAgICAgIFwibnVtYmVyIGZvclwiOiBcIjRcIixcclxuICAgICAgXCJudW1iZXJcIjogXCJcIixcclxuICAgICAgXCJmcmFtZVwiOiBcIlwiLFxyXG4gICAgICBcInBob3RvXCI6IFwiXCIsXHJcbiAgICAgIFwib25lXCI6IFwiMVwiLFxyXG4gICAgICBcInR3b1wiOiBcIjJcIixcclxuICAgICAgXCJ0aHJlZVwiOiBcIjNcIixcclxuICAgICAgXCJmb3VyXCI6IFwiNFwiLFxyXG4gICAgICBcImZpdmVcIjogXCI1XCIsXHJcbiAgICAgIFwic2l4XCI6IFwiNlwiLFxyXG4gICAgICBcInNldmVuXCI6IFwiN1wiLFxyXG4gICAgICBcImVpZ2h0XCI6IFwiOFwiLFxyXG4gICAgICBcIm5pbmVcIjogXCI5XCIsXHJcbiAgICAgIFwiaW50b1wiOiBcIlwiLFxyXG4gICAgICBcIm9uXCI6IFwiXCIsXHJcbiAgICAgIFwiYW5kXCI6IFwiXCIsXHJcbiAgICAgIFwicGljdHVyZVwiOiBcIlwiLFxyXG4gICAgICBcImdvIHRvXCI6IFwiZ290b1wiLFxyXG4gICAgICBcIi1cIjogXCIgXCIsXHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKHYgPT4gcGhyYXNlID0gcGhyYXNlLnJlcGxhY2UodiwgbWFwW3ZdKSk7XHJcbiAgICBsZXQgdG9rZW5zID0gcGhyYXNlLnNwbGl0KFwiIFwiKTtcclxuICAgIHRva2VucyA9IHRva2Vucy5tYXAodiA9PiBtYXBbdl0gPz8gdikuZmlsdGVyKHYgPT4gISF2KTtcclxuICAgIHJldHVybiB0b2tlbnMuam9pbihcIiBcIik7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBLZWVwcyB0aGUgZ29vZ2xlIG1lZGlhIGluZm8gYW5kIGhhcyBoZWxwZXIgZnVuY3Rpb25zXHJcbiAqIHRvIHVwZ3JhZGUgdGhlIGxvLXJlcyB0byBoaS1yZXMgdmVyc2lvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbGxhZ2VQaG90bzxUTWVkaWFJbmZvPiB7XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBHb29nbGVNZWRpYUl0ZW0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBwcm9kdWN0VXJsOiBzdHJpbmc7XHJcbiAgYmFzZVVybDogc3RyaW5nO1xyXG4gIG1pbWVUeXBlOiBzdHJpbmc7XHJcbiAgbWVkaWFNZXRhZGF0YTogYW55O1xyXG4gIGNvbnRyaWJ1dG9ySW5mbzogYW55O1xyXG4gIGZpbGVuYW1lOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29sbGFnZVBob3RvIH0gZnJvbSBcIi4vQ29sbGFnZVBob3RvXCI7XHJcbmltcG9ydCB7IEdvb2dsZU1lZGlhSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlTWVkaWFJdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR29vZ2xlQ29sbGFnZVBob3RvIGV4dGVuZHMgQ29sbGFnZVBob3RvPEdvb2dsZU1lZGlhSXRlbT4ge1xyXG4gIHB1YmxpYyBpbWc6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVkaWFJbmZvOiBHb29nbGVNZWRpYUl0ZW0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBsZXQgaW1nID0gdGhpcy5pbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJpbWdcIik7XHJcbiAgICBpbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3RoaXMubWVkaWFJbmZvLmJhc2VVcmx9KWA7XHJcbiAgICBpbWcudGl0bGUgPSBtZWRpYUluZm8uZmlsZW5hbWU7XHJcbiAgfVxyXG4gIFxyXG4gIHJlbmRlckludG8odGFyZ2V0OiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuaW1nKTtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIG5ldyBHb29nbGVDb2xsYWdlUGhvdG8oSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1lZGlhSW5mbykpKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIE1hbmFnZXMgaW1hZ2Ugc3R5bGUudHJhbnNmb3JtIGJ5IHBlcnNpc3RpbmdcclxuICogdGhlIHNjYWxlIGFuZCByb3RhdGlvbiB0byBmYWNpbGl0YXRlIGNvbXB1dGluZyB0cmFuc2Zvcm1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3ByaXRlIHtcclxuICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgcHVibGljIHI6IG51bWJlcjtcclxuICBwdWJsaWMgczogbnVtYmVyO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgdGhpcy54ID0gdGhpcy55ID0gdGhpcy5yID0gMDtcclxuICAgIHRoaXMucyA9IDE7XHJcbiAgfVxyXG4gIHRyYW5zZm9ybShhcmdzOiB7XHJcbiAgICBkeD86IG51bWJlcjtcclxuICAgIGR5PzogbnVtYmVyO1xyXG4gICAgc2NhbGU/OiBudW1iZXI7XHJcbiAgICBhbmdsZT86IG51bWJlcjtcclxuICB9KSB7XHJcbiAgICB0aGlzLnggKz0gKGFyZ3MuZHggfHwgMCk7XHJcbiAgICB0aGlzLnkgKz0gKGFyZ3MuZHkgfHwgMCk7XHJcbiAgICB0aGlzLnIgKz0gKGFyZ3MuYW5nbGUgfHwgMCk7XHJcbiAgICB0aGlzLnMgKj0gKGFyZ3Muc2NhbGUgfHwgMS4wKTtcclxuICAgIHRoaXMuaW1hZ2Uuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMueH1weCwke3RoaXMueX1weCkgcm90YXRlKCR7dGhpcy5yfWRlZykgc2NhbGUoJHt0aGlzLnN9KWA7XHJcbiAgfVxyXG4gIHRyYW5zbGF0ZShkeDogbnVtYmVyLCBkeTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyBkeCwgZHkgfSk7XHJcbiAgfVxyXG4gIHJvdGF0ZShhbmdsZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oeyBhbmdsZSB9KTtcclxuICB9XHJcbiAgc2NhbGUoc2NhbGU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKHsgc2NhbGUgfSk7XHJcbiAgfVxyXG4gIC8vIG1vZGlmeSB0aGUgcGl4ZWwgZGVuc2l0eSBvZiB0aGUgaW1hZ2VcclxuICAvLyB1c2VmdWwgd2hlbiB1c2luZyBnb29nbGUgcGhvdG9zIEFQSSB0byBcclxuICAvLyByZXF1ZXN0IGhpZ2hlciByZXNvbHV0aW9uIHBob3Rvc1xyXG4gIHVwc2NhbGUoc2NhbGU6IG51bWJlcikge1xyXG4gICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmltYWdlKTtcclxuICAgIGxldCB3aWR0aCA9IHBhcnNlRmxvYXQoc3R5bGUud2lkdGgpO1xyXG4gICAgbGV0IGhlaWdodCA9IHBhcnNlRmxvYXQoc3R5bGUuaGVpZ2h0KTtcclxuICAgIHRoaXMuc2NhbGUoMSAvIHNjYWxlKTtcclxuICAgIHRoaXMuaW1hZ2Uuc3R5bGUud2lkdGggPSBzY2FsZSAqIHdpZHRoICsgXCJweFwiO1xyXG4gICAgdGhpcy5pbWFnZS5zdHlsZS5oZWlnaHQgPSBzY2FsZSAqIGhlaWdodCArIFwicHhcIjtcclxuICAgIHRoaXMudHJhbnNsYXRlKHdpZHRoIC8gMiAtIHdpZHRoICogc2NhbGUgLyAyLCBoZWlnaHQgLyAyIC0gaGVpZ2h0ICogc2NhbGUgLyAyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgR29vZ2xlQ29sbGFnZVBob3RvIH0gZnJvbSBcIi4vR29vZ2xlQ29sbGFnZVBob3RvXCI7XHJcbmltcG9ydCB7IFNwcml0ZSB9IGZyb20gXCIuL1Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSBcIi4uL2dsb2JhbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2VzIGEgc2luZ2xlIGltYWdlIG9uIHRoZSBjb2xsYWdlLCBcclxuICogbm90IHRvIGJlIGNvbmZ1c2VkIHdpdGggYW4gUGhvdG8gb24gdGhlIGFsYnVtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29sbGFnZVBhbmVsIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBwYW5lbCBjb250YWlucyBhIHNpbmdsZSBwaG90byAodGhpcyBvbmUpXHJcbiAgICovXHJcbiAgcHVibGljIHBob3RvOiBHb29nbGVDb2xsYWdlUGhvdG8gfCBudWxsO1xyXG5cclxuICAvLyB0aGUgYWN0dWFsIGltYWdlIHJlbmRlcmVkIG9uIHRoZSBwYW5lbFxyXG4gIHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcclxuICBwdWJsaWMgc3ByaXRlOiBTcHJpdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBwYW5lbCBkb20gZWxlbWVudCB0byBjb250cm9sXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocHVibGljIHBhbmVsOiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgdGhpcy5waG90byA9IG51bGw7XHJcbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgIHRoaXMuc3ByaXRlID0gbmV3IFNwcml0ZSh0aGlzLmltYWdlKTtcclxuICAgIHRoaXMuaW1hZ2UuY2xhc3NMaXN0LmFkZChcImltZ1wiKTtcclxuICAgIHRoaXMuaW1hZ2UuZHJhZ2dhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuaW1hZ2UpO1xyXG4gICAgdGhpcy5hc1BhbmVsKHRoaXMucGFuZWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHBob3RvIHJlbmRlcnMgdGhpcyBwaG90byBvbnRvIHRoZSBwYW5lbFxyXG4gICAqL1xyXG4gIGFkZFBob3RvKHBob3RvOiBHb29nbGVDb2xsYWdlUGhvdG8pIHtcclxuICAgIHRoaXMucGhvdG8gPSBwaG90bztcclxuICAgIHRoaXMuc2V0QmFja2dyb3VuZEltYWdlKHBob3RvLm1lZGlhSW5mby5iYXNlVXJsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbXB1dGVzIHRoZSB3aWR0aCBvZiB0aGUgcGhvdG8gZGlzcGxheSBhcmVhXHJcbiAgICovXHJcbiAgZ2V0IHBob3RvV2lkdGgoKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5pbWFnZSkud2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29tcHV0ZXMgdGhlIGhlaWdodCBvZiB0aGUgcGhvdG8gZGlzcGxheSBhcmVhXHJcbiAgICovXHJcbiAgZ2V0IHBob3RvSGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuaW1hZ2UpLmhlaWdodCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb21wdXRlcyB0aGUgc2NhbGUgb2YgdGhlIHBob3RvLCBhc3N1bWVzIGFzcGVjdCByYXRpbyBpcyBwcmVzZXJ2ZWQgKGF0IGxlYXN0IHRoZSB3aWR0aCBvciBoZWlnaHQgaXMgJ2F1dG8nKVxyXG4gICAqL1xyXG4gIGdldCBwaG90b1NjYWxlKCkge1xyXG4gICAgbGV0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5pbWFnZSk7XHJcbiAgICBsZXQgc2NhbGUgPSBzdHlsZS5oZWlnaHQ7XHJcbiAgICBpZiAoc2NhbGUgPT09IFwiYXV0b1wiKSByZXR1cm4gMS4wO1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc2NhbGUpIC8gMTAwLjA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXR1cm4gdGhlIHBhbmVsIG92ZXJsYXkgKGRvZXMgbm90IGJlbG9uZyBoZXJlKVxyXG4gICAqL1xyXG4gIGdldCBvdmVybGF5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGFuZWwucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0ZXh0IGFzIGFuIGlucHV0IGNvbnRyb2wgb24gdGhlIHBhbmVsXHJcbiAgICogTGFiZWwgaXMgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGFuZCBjYW4gbW92ZSBvdXRzaWRlIHRoZSBib3VuZHMgb2YgdGhpcyBwYW5lbFxyXG4gICAqIHNvIHByb2JhYmx5IGRvZXNuJ3QgYmVsb25nIGhlcmVcclxuICAgKi9cclxuICBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbiAgICBsYWJlbC5yZWFkT25seSA9IHRydWU7XHJcbiAgICBsYWJlbC50aXRsZSA9IFwiMVwiO1xyXG4gICAgbGFiZWwuc3R5bGUudG9wID0gbGFiZWwuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG4gICAgbGFiZWwuY2xhc3NMaXN0LmFkZChcImxhYmVsXCIpO1xyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICBsYWJlbC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgZ2xvYmFscy5kbmQubW92ZWFibGUobGFiZWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBwYW5lbCBmcm9tIHRoZSBkb21cclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5wYW5lbC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gKiBcclxuICogQHBhcmFtIGJhY2tncm91bmRJbWFnZSB0aGUgdXJsIG9mIHRoZSBpbWFnZSB0byBkaXNwbGF5IGluIHRoaXMgcGFuZWxcclxuICovXHJcbiAgc2V0QmFja2dyb3VuZEltYWdlKGJhY2tncm91bmRJbWFnZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmltYWdlLnNyYyA9IGJhY2tncm91bmRJbWFnZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0eWxlIHRoZSBmcmFtZVxyXG4gICAqIEBwYXJhbSB3aWR0aCBib3JkZXIgd2lkdGggaW4gXCJlbVwiXHJcbiAgICovXHJcbiAgYm9yZGVyKHdpZHRoOiBzdHJpbmcsIGNvbG9yID0gXCJ3aGl0ZVwiKSB7XHJcbiAgICB0aGlzLnBhbmVsLnN0eWxlLmJvcmRlciA9IGAke3dpZHRofWVtIHNvbGlkICR7Y29sb3J9YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogUm90YXRlIHRoZSBhY3R1YWwgZnJhbWVcclxuICAqIEBwYXJhbSBhbmdsZSBhbmdsZSBpbiBkZWdyZWVzXHJcbiAgKi9cclxuICByb3RhdGVGcmFtZShhbmdsZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgbm9kZSA9IHRoaXMucGFuZWw7XHJcbiAgICBpZiAoIW5vZGUpXHJcbiAgICAgIHJldHVybjtcclxuICAgIGlmICghIWFuZ2xlKSB7XHJcbiAgICAgIHRoaXMudHJhbnNmb3JtX25vZGUoYHJvdGF0ZSgke2FuZ2xlfWRlZylgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgYW5nbGUgPSAwO1xyXG4gICAgICBsZXQgdHJhbnNmb3JtID0gbm9kZS5zdHlsZS50cmFuc2Zvcm07XHJcbiAgICAgIGxldCBhbmltYXRpb25zID0gZ2xvYmFscy5yZXBsLmFuaW1hdGlvbnM7XHJcbiAgICAgIGFuaW1hdGlvbnMuYW5pbWF0ZShcInJvdGF0ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgYW5nbGUgKz0gMTtcclxuICAgICAgICBub2RlLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybSArIGAgcm90YXRlKCR7YW5nbGV9ZGVnKWA7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2NhbGVGcmFtZShzY2FsZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRyYW5zZm9ybV9ub2RlKGBzY2FsZSgke3NjYWxlfSwgJHtzY2FsZX0pYCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZm9ybV9ub2RlKHY6IHN0cmluZykge1xyXG4gICAgbGV0IG5vZGUgPSB0aGlzLnBhbmVsO1xyXG4gICAgbGV0IHRyYW5zZm9ybSA9IChub2RlLnN0eWxlLnRyYW5zZm9ybSB8fCBcIlwiKS5zcGxpdChcIiBcIik7XHJcbiAgICB0cmFuc2Zvcm0udW5zaGlmdCh2KTtcclxuICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuICBwcml2YXRlIGFzUGFuZWwoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBhbmVsXCIpO1xyXG4gICAgZWxlbWVudC50YWJJbmRleCA9IDE7XHJcbiAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJvdmVybGF5XCIpO1xyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBydW5zIGFuIGFuaW1hdGlvbiBvbiBhbiBpbnRlcnZhbCwgcmV0dXJucyBzdG9wKClcclxuICogVXNlZCBmb3IgcGFubmluZywgem9vbWluZywgcm90YXRpbmdcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25zIHtcclxuICBhbmltYXRpb25zOiBBcnJheTx7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBoYW5kbGU6IG51bWJlcjtcclxuICB9PiA9IFtdO1xyXG4gIFxyXG4gIHN0b3AodHlwZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgYW5pbWF0aW9ucyA9IHRoaXMuYW5pbWF0aW9ucy5tYXAodiA9PiB2KTsgLy9jbG9uZVxyXG4gICAgYW5pbWF0aW9ucy5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcbiAgICAgIGlmICghdHlwZSB8fCB2LnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHYuaGFuZGxlKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFuaW1hdGUodHlwZTogc3RyaW5nLCBjYjogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5hbmltYXRpb25zLnB1c2goeyB0eXBlLCBoYW5kbGU6IHNldEludGVydmFsKGNiLCAxMDApIH0pO1xyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmQge1xyXG4gIGFib3V0PygpOiBzdHJpbmc7XHJcbiAgLy8gcmV0dXJuIGZhbHNlIHRvIHNpZ25hbCB0aGUgY29tbWFuZCB3YXMgbm90IGhhbmRsZWRcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcpOiB2b2lkIHwgZmFsc2UgfCBQcm9taXNlPHZvaWQgfCBmYWxzZT47XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tIFwiLi4vbW9kZWxzL0RpY3Rpb25hcnlcIjtcclxuXHJcbi8qKlxyXG4gKiBLZWVwcyBoYXNoIG9mIGNvbW1hbmRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tbWFuZHMge1xyXG4gICAgbmFtZU9mKGNvbW1hbmQ6IENvbW1hbmQpIHtcclxuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpO1xyXG4gICAgICBjb25zdCBpID0ga2V5cy5maW5kSW5kZXgoayA9PiB0aGlzLmNvbW1hbmRzW2tdLmV4ZWN1dGUgPT09IGNvbW1hbmQuZXhlY3V0ZSk7XHJcbiAgICAgIHJldHVybiAtMTxpID8ga2V5c1tpXTpudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29tbWFuZHM6IERpY3Rpb25hcnk8Q29tbWFuZD4gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIHRoZSBjb21tYW5kIGFzc29jaWF0ZWQgd2l0aCB0aGUgYWN0aW9uIGtleXdvcmRcclxuICAgICAqIEBwYXJhbSB2ZXJiIHRoZSBmdWxsIG5hbWUgb2YgdGhlIGFjdGlvbiBrZXl3b3JkIG9yIGEgcGFydGlhbCBtYXRjaFxyXG4gICAgICovXHJcbiAgICBnZXQodmVyYjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tbWFuZHNbdmVyYl0pIHJldHVybiB0aGlzLmNvbW1hbmRzW3ZlcmJdO1xyXG4gICAgICAgIHZhciBrZXkgPSBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKS5maW5kKHYgPT4gdi5zdGFydHNXaXRoKHZlcmIpKTtcclxuICAgICAgICByZXR1cm4ga2V5ICYmIHRoaXMuY29tbWFuZHNba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMvcmVwbGFjZXMgY29tbWFuZCBhc3NvY2lhdGVkIHdpdGggYW4gYWN0aW9uIGtleXdvcmRcclxuICAgICAqIEBwYXJhbSBjb21tYW5kIGNvbW1hbmQgdG8gcHJvY2VzcyB0aGUgYWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gdmVyYiBhY3Rpb24gdG8gYXNzb2NpYXRlIHdpdGggYSBjb21tYW5kXHJcbiAgICAgKi9cclxuICAgIGFkZChjb21tYW5kOiBDb21tYW5kLCB2ZXJiOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbW1hbmRzW3ZlcmJdID0gY29tbWFuZDtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0KCkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5jb21tYW5kcyk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVPdmVybGF5KCkge1xyXG4gIGxldCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgaWYgKCFhY3RpdmVQYW5lbCkge1xyXG4gICAgY29uc29sZS5sb2coXCJubyBhY3RpdmUgcGFuZWxcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHJldHVybiBhY3RpdmVQYW5lbC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIikgYXMgSFRNTEVsZW1lbnQ7XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBLZXlib2FyZEhhbmRsZXIge1xyXG4gIGFsdEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBjdHJsS2V5OiBib29sZWFuO1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIGFib3V0Pzogc3RyaW5nO1xyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgS2V5Ym9hcmRIYW5kbGVyIH0gZnJvbSBcIi4uL21vZGVscy9LZXlib2FyZEhhbmRsZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEhhbmRsZXJzIHtcclxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcnM6IEFycmF5PHttYXRjaDogS2V5Ym9hcmRIYW5kbGVyOyBjb21tYW5kOiBDb21tYW5kfT4gPSBbXTtcclxuXHJcbiAgZ2V0RXZlbnRIYW5kbGVycyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMua2V5Ym9hcmRIYW5kbGVycy5maWx0ZXIoaGFuZGxlciA9PiB7XHJcbiAgICAgIGxldCBtYXRjaCA9IGhhbmRsZXIubWF0Y2g7XHJcbiAgICAgIGlmIChldmVudC5hbHRLZXkgIT09IG1hdGNoLmFsdEtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgIT09IG1hdGNoLnNoaWZ0S2V5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChldmVudC5jdHJsS2V5ICE9PSBtYXRjaC5jdHJsS2V5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmICghIW1hdGNoLmtleSAmJiBldmVudC5rZXkgIT09IG1hdGNoLmtleSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkRXZlbnRIYW5kbGVyKGNvbW1hbmQ6IENvbW1hbmQsIG1hdGNoOiBQYXJ0aWFsPEtleWJvYXJkSGFuZGxlcj4pIHtcclxuICAgIGxldCBmdWxsTWF0Y2g6IEtleWJvYXJkSGFuZGxlciA9IHtcclxuICAgICAgYWx0S2V5OiBtYXRjaC5hbHRLZXkgPz8gZmFsc2UsXHJcbiAgICAgIGN0cmxLZXk6IG1hdGNoLmN0cmxLZXkgPz8gZmFsc2UsXHJcbiAgICAgIHNoaWZ0S2V5OiBtYXRjaC5zaGlmdEtleSA/PyBmYWxzZSxcclxuICAgICAga2V5OiBtYXRjaC5rZXkgPz8gXCJcIixcclxuICAgICAgYWJvdXQ6IG1hdGNoLmFib3V0IHx8IGNvbW1hbmQuYWJvdXQgJiYgY29tbWFuZC5hYm91dCgpXHJcbiAgICB9O1xyXG4gICAgdGhpcy5rZXlib2FyZEhhbmRsZXJzLnB1c2goe21hdGNoOiBmdWxsTWF0Y2gsIGNvbW1hbmR9KTtcclxuICB9XHJcblxyXG4gIGxpc3QoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5rZXlib2FyZEhhbmRsZXJzLm1hcChoID0+ICh7XHJcbiAgICAgIGNvbW1hbmQ6aC5jb21tYW5kLFxyXG4gICAgICBrZXk6IHRoaXMua2V5c0FzU3RyaW5nKGgubWF0Y2gpLFxyXG4gICAgICBhYm91dDogaC5tYXRjaC5hYm91dCxcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIGtleXNBc1N0cmluZyhtYXRjaDogS2V5Ym9hcmRIYW5kbGVyKSB7XHJcbiAgIGxldCByZXN1bHQgPSBtYXRjaC5rZXk7XHJcbiAgIHN3aXRjaCAocmVzdWx0KXtcclxuICAgICBjYXNlIFwiIFwiOiByZXN1bHQgPSBcInNwYWNlXCI7IGJyZWFrO1xyXG4gICB9XHJcbiAgIGlmIChtYXRjaC5jdHJsS2V5KSByZXN1bHQgPSBcImN0cmwgKyBcIityZXN1bHQ7XHJcbiAgIGlmIChtYXRjaC5hbHRLZXkpIHJlc3VsdCA9IFwiYWx0ICsgXCIrcmVzdWx0O1xyXG4gICBpZiAobWF0Y2guc2hpZnRLZXkpIHJlc3VsdCA9IFwic2hpZnQgKyBcIityZXN1bHQ7XHJcbiAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtKG5vZGU6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgbGV0IHQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS50cmFuc2Zvcm07XHJcbiAgdCA9ICh0ID09PSBcIm5vbmVcIikgPyBcIlwiIDogdCArIFwiIFwiO1xyXG4gIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gdCArIHZhbHVlO1xyXG59XHJcblxyXG4iLCJleHBvcnQgZnVuY3Rpb24gYmJveChub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgcmV0dXJuIHsgdG9wOiBwYXJzZUZsb2F0KHRvcCksIGxlZnQ6IHBhcnNlRmxvYXQobGVmdCksIHdpZHRoOiBwYXJzZUZsb2F0KHdpZHRoKSwgaGVpZ2h0OiBwYXJzZUZsb2F0KGhlaWdodCkgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBnZXRBY3RpdmVPdmVybGF5IH0gZnJvbSBcIi4uL2Z1bi9nZXRBY3RpdmVPdmVybGF5XCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4vUmVwbFwiO1xyXG5pbXBvcnQgeyBLZXlib2FyZEhhbmRsZXJzIH0gZnJvbSBcIi4vS2V5Ym9hcmRIYW5kbGVyc1wiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi4vZnVuL3RyYW5zZm9ybVwiO1xyXG5pbXBvcnQgeyBiYm94IH0gZnJvbSBcIi4uL2Z1bi9iYm94XCI7XHJcblxyXG4vKipcclxuICogbWFuYWdlcyB1c2VyIGludGVyYWN0aW9ucyBmb3Iga2V5Ym9hcmQgc2hvcnRjdXRzLCB3aGVlbCwgZHJhZywgY2xpY2sgZXZlbnRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3Age1xyXG4gIHByaXZhdGUgc291cmNlOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVwbDogUmVwbCwgcHVibGljIGtleWRvd25IYW5kbGVyczogS2V5Ym9hcmRIYW5kbGVycykge1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBzb3VyY2UgPSBnZXRBY3RpdmVPdmVybGF5KCk7XHJcbiAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJubyBhY3RpdmUgb3ZlcmxheSBmb3VuZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy8gVE9ETyB3b3VsZCBiZSBuaWNlIHRvIG9ubHkgcGVyZm9ybSB3aGVuIG1vdXNlIGlzIG92ZXIgdGhlIGVsZW1lbnRcclxuICAgICAgLy8gZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoZXZlbnQuc2NyZWVuWCwgZXZlbnQuc2NyZWVuWSk7XHJcbiAgICAgIGxldCBmcm9tID0gc291cmNlLmlubmVySFRNTDtcclxuICAgICAgLy8gLTE1MCA9PiAwLjksIDE1MCA9PiAxLjEsIHNvXHJcbiAgICAgIGxldCBkZWx0YSA9IDEgKyBldmVudC5kZWx0YVkgLyAxNTAwO1xyXG4gICAgICByZXBsLmV4ZWN1dGVDb21tYW5kKGB6b29tICR7ZnJvbX0gJHtkZWx0YX1gKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XHJcblxyXG4gICAgICBpZiAodGhpcy5rZXlkb3duSGFuZGxlcnMuZ2V0RXZlbnRIYW5kbGVycyhldmVudCkuc29tZShoYW5kbGVyID0+IHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgIT09IGhhbmRsZXIuY29tbWFuZC5leGVjdXRlKHJlcGwpO1xyXG4gICAgICB9KSkge1xyXG4gICAgICAgIC8vIGhhbmRsZWRcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlIHRoZSBiYWNrZ3JvdW5kIGltYWdlIG9uIHRoZSBwYW5lbFxyXG4gICAqIEBwYXJhbSBwYW5lbCBJbnZva2UgcGFuIG9uIHRoZSBwYW5lbCBzbyB0aGF0IGl0IGZvbGxvd3MgdGhlIG1vdXNlXHJcbiAgICovXHJcbiAgcGFuYWJsZShwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgZHJhZ2dhYmxlID0gcGFuZWwuaW1hZ2U7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IFswLCAwXTtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG5cclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZXZlbnQgPT4ge1xyXG4gICAgICBsZXQgbGVmdCA9IHBhcnNlRmxvYXQoZHJhZ2dhYmxlLnN0eWxlLmxlZnQgfHwgXCIwXCIpO1xyXG4gICAgICBsZXQgdG9wID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUudG9wIHx8IFwiMFwiKTtcclxuICAgICAgc3RhcnRQb3NpdGlvbiA9IFtsZWZ0IC0gZXZlbnQuc2NyZWVuWCwgdG9wIC0gZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHBvaW50ZXJtb3ZlKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBldmVudCA9PiB7XHJcbiAgICAgIGRyYWdnYWJsZS5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGxldCBib3ggPSBiYm94KGRyYWdnYWJsZSk7XHJcbiAgICAgIGxldCByZWN0ID0gZHJhZ2dhYmxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyAgICAgIFxyXG4gICAgICBsZXQgc2NhbGUgPSByZWN0LndpZHRoIC8gYm94LndpZHRoO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUudG9wID0gZHJhZ2dhYmxlLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG4gICAgICB0cmFuc2Zvcm0oZHJhZ2dhYmxlLCBgdHJhbnNsYXRlKCR7Ym94LmxlZnQgLyBzY2FsZX1weCwgJHtib3gudG9wIC8gc2NhbGV9cHgpYCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBvaW50ZXJtb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBbeCwgeV0gPSBbc3RhcnRQb3NpdGlvblswXSArIGV2ZW50LnNjcmVlblgsIHN0YXJ0UG9zaXRpb25bMV0gKyBldmVudC5zY3JlZW5ZXTtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLmxlZnQgPSBgJHt4fXB4YDtcclxuICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IGAke3l9cHhgO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBtb3ZlYWJsZShkcmFnZ2FibGU6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IFswLCAwXTtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG5cclxuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZXZlbnQgPT4ge1xyXG4gICAgICBsZXQgdG9wID0gcGFyc2VGbG9hdChkcmFnZ2FibGUuc3R5bGUudG9wKTtcclxuICAgICAgbGV0IGxlZnQgPSBwYXJzZUZsb2F0KGRyYWdnYWJsZS5zdHlsZS5sZWZ0KTtcclxuICAgICAgc3RhcnRQb3NpdGlvbiA9IFtsZWZ0IC0gZXZlbnQuc2NyZWVuWCwgdG9wIC0gZXZlbnQuc2NyZWVuWV07XHJcbiAgICAgIGRyYWdnYWJsZS5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIHBvaW50ZXJtb3ZlKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBldmVudCA9PiB7XHJcbiAgICAgIGRyYWdnYWJsZS5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgZHJhZ2dhYmxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBwb2ludGVybW92ZSk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBvaW50ZXJtb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGxldCBbbGVmdCwgdG9wXSA9IFtzdGFydFBvc2l0aW9uWzBdICsgZXZlbnQuc2NyZWVuWCwgc3RhcnRQb3NpdGlvblsxXSArIGV2ZW50LnNjcmVlblldO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xyXG4gICAgICBkcmFnZ2FibGUuc3R5bGUubGVmdCA9IGxlZnQgKyBcInB4XCI7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYW4gZWxlbWVudCBhIGRyYWcgc291cmNlXHJcbiAgICogQHBhcmFtIGRpdiBlbGVtZW50IHRvIG1ha2UgZHJhZ2dhYmxlXHJcbiAgICovXHJcbiAgZHJhZ2dhYmxlKGRyYWdnYWJsZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xyXG4gICAgZHJhZ2dhYmxlLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBldmVudCA9PiB0aGlzLm9uZHJhZ3N0YXJ0KGRyYWdnYWJsZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbiBlbGVtZW50IGEgZHJvcCB0YXJnZXRcclxuICAgKiBAcGFyYW0gdGFyZ2V0IGVsZW1lbnQgdG8gbWFrZSBpbnRvIGEgZHJvcCB0YXJnZXQgKGRyYWdnYWJsZSBhcmUgZHJvcHBhYmxlLCBiYWQgbmFtZSlcclxuICAgKi9cclxuICBkcm9wcGFibGUodGFyZ2V0OiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnNvdXJjZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMub25kcmFnb3Zlcih0YXJnZXQsIHRoaXMuc291cmNlKTtcclxuICAgIH0pO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuc291cmNlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5vbmRyb3AodGFyZ2V0LCB0aGlzLnNvdXJjZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNvdXJjZSBsaXN0ZW4gZm9yIHdoZWVsIGV2ZW50c1xyXG4gICAqL1xyXG4gIHpvb21hYmxlKHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICB9XHJcbiAgb25kcmFnc3RhcnQoc291cmNlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgfVxyXG5cclxuICBvbmRyYWdvdmVyKHRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8vIG5vdGhpbmcgdG8gZG8/XHJcbiAgfVxyXG5cclxuICBvbmRyb3AodGFyZ2V0OiBIVE1MRWxlbWVudCwgc291cmNlOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGV0IGZyb20gPSBzb3VyY2UuaW5uZXJIVE1MO1xyXG4gICAgbGV0IHRvID0gdGFyZ2V0LmlubmVySFRNTDtcclxuICAgIGxldCBjb21tYW5kID0gYG1vdmUgJHtmcm9tfSAke3RvfWA7XHJcbiAgICB0aGlzLnJlcGwuZXhlY3V0ZUNvbW1hbmQoY29tbWFuZCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgQmVoYXZpb3I8VD4ge1xyXG4gIGV4dGVuZChjb250cm9sOiBUKTogdm9pZDtcclxufVxyXG4iLCJpbXBvcnQgeyB0YWlsIH0gZnJvbSBcIi4uL2Z1bi90YWlsXCI7XHJcbmltcG9ydCB7IENvbW1hbmRQYXJzZXIgfSBmcm9tIFwiLi9Db21tYW5kUGFyc2VyXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyBHb29nbGVDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi9Hb29nbGVDb2xsYWdlUGhvdG9cIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9ucyB9IGZyb20gXCIuL0FuaW1hdGlvbnNcIjtcclxuaW1wb3J0IHsgQ29tbWFuZHMgfSBmcm9tIFwiLi9Db21tYW5kc1wiO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcCB9IGZyb20gXCIuL0RyYWdBbmREcm9wXCI7XHJcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4uL21vZGVscy9CZWhhdmlvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlcGwge1xyXG4gIC8vIGV4dGVuc2lvbiBwb2ludCBmb3IgYmVoYXZpb3JzXHJcbiAgbm90aWZ5KG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvLyBwdWJsaWMgc28gc3BsaXQgY29tbWFuZCBjYW4gb3BlcmF0ZSBvbiB0aGVtXHJcbiAgcHVibGljIHBhbmVsczogQXJyYXk8Q29sbGFnZVBhbmVsPiA9IFtdO1xyXG4gIC8vIHB1YmxpYyBzbyBvcGVuQWxidW1zIGNvbW1hbmQgY2FuIG9wZXJhdGlvbiBvbiB0aGVtXHJcbiAgcHVibGljIHBob3RvczogQXJyYXk8R29vZ2xlQ29sbGFnZVBob3RvPiA9IFtdO1xyXG4gIHByaXZhdGUgY29tbWFuZEhpc3Rvcnk6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBwcml2YXRlIGNvbW1hbmRIaXN0b3J5SW5kZXggPSAtMTtcclxuICBwdWJsaWMgZG5kOiBEcmFnQW5kRHJvcCB8IG51bGwgPSBudWxsO1xyXG4gIHB1YmxpYyBhbmltYXRpb25zID0gbmV3IEFuaW1hdGlvbnMoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGNvbW1hbmRzOiBDb21tYW5kcykge1xyXG4gICAgLy8gY2Fubm90IHNldCBkbmQgYmVjYXVzZSBkbmQgbmVlZHMgcmVwbCAoZm9yIG5vdylcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1c2UoYmVoYXZpb3I6IEJlaGF2aW9yPFJlcGw+KSB7XHJcbiAgICBiZWhhdmlvci5leHRlbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBldmFsKGNvbW1hbmQ6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2coYGV4ZWN1dGluZzogJHtjb21tYW5kfWApO1xyXG4gICAgbGV0IFt2ZXJiXSA9IGNvbW1hbmQuc3BsaXQoXCIgXCIpO1xyXG4gICAgbGV0IGhhbmRsZXIgPSB0aGlzLmNvbW1hbmRzLmdldCh2ZXJiKTtcclxuICAgIGlmIChoYW5kbGVyKSB7XHJcbiAgICAgIGF3YWl0IGhhbmRsZXIuZXhlY3V0ZSh0aGlzLCB0YWlsKGNvbW1hbmQpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoICh2ZXJiKSB7XHJcbiAgICAgIGNhc2UgXCJleHBvcnRcIjpcclxuICAgICAgICBsZXQgY2FudmFzID0gYXdhaXQgdGhpcy5hc0NhbnZhcygpO1xyXG4gICAgICAgIGlmICghY2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiZXhwb3J0LXJlc3VsdFwiKTtcclxuICAgICAgICBpbWcuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGltZywgZG9jdW1lbnQuYm9keS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBjcmVhdGUgYSBjYW52YXMgb2YgdGhlIGVudGlyZSBjb2xsYWdlXHJcbiAgYXN5bmMgYXNDYW52YXMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SFRNTENhbnZhc0VsZW1lbnQ+KChnb29kLCBiYWQpID0+IHtcclxuICAgICAgbGV0IGltYWdlQ2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW52YXNcIik/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBpZiAoIWltYWdlQ2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2VDYW52YXMud2lkdGg7XHJcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZUNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgbGV0IHBhbmVscyA9IHRoaXMucGFuZWxzLmZpbHRlcigocCkgPT4gMCA9PT0gZ2V0Q29tcHV0ZWRTdHlsZShwLnBhbmVsKS5iYWNrZ3JvdW5kSW1hZ2UuaW5kZXhPZihgdXJsKFwiYCkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImxvYWRpbmdcIiwgcGFuZWxzLmxlbmd0aCk7XHJcbiAgICAgIHBhbmVscy5mb3JFYWNoKChwKSA9PiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHAucGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJhbm9ueW1vdXNcIjtcclxuICAgICAgICBpbWcud2lkdGggPSBwb3Mud2lkdGg7XHJcbiAgICAgICAgaW1nLmhlaWdodCA9IHBvcy5oZWlnaHQ7XHJcbiAgICAgICAgaW1nLnN0eWxlLnRyYW5zZm9ybSA9IHAucGFuZWwuc3R5bGUudHJhbnNmb3JtO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgcG9zLngsIHBvcy55KTtcclxuICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRlZDpcIiwgY291bnQpO1xyXG4gICAgICAgICAgaWYgKGNvdW50ID09PSBwYW5lbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGdvb2QoY2FudmFzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIHN0cmlwIHVybChcIlwiKTtcclxuICAgICAgICBsZXQgdXJsID0gZ2V0Q29tcHV0ZWRTdHlsZShwLnBhbmVsKS5iYWNrZ3JvdW5kSW1hZ2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmxcIiwgdXJsKTtcclxuICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDUsIHVybC5sZW5ndGggLSAyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVybFwiLCB1cmwpO1xyXG4gICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb2xsYWdlT3ZlcmxheXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucGFuZWxbZGF0YS1pZF0gLm92ZXJsYXlgKSkgYXMgSFRNTEVsZW1lbnRbXTtcclxuICB9XHJcblxyXG4gIGdldFBob3RvT3ZlcmxheXMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucGhvdG9zIC5pbWcgLm92ZXJsYXlbZGF0YS1pZF1gKSkgYXMgSFRNTEVsZW1lbnRbXTtcclxuICB9XHJcblxyXG4gIHNlbGVjdChpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RQYW5lbChpZCk/LnBhbmVsO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UGFuZWwoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMucGFuZWxzLmZpbmQoKHApID0+IHAub3ZlcmxheS5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RQaG90byhpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5waG90b3NbcGFyc2VJbnQoaWQpIC0gMV07XHJcbiAgfVxyXG5cclxuICByZW1vdmVQYW5lbChwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnBhbmVscy5pbmRleE9mKHBhbmVsKTtcclxuICAgIGlmICgtMSA9PT0gaW5kZXgpIHRocm93IFwicGFuZWwgbm90IGZvdW5kXCI7XHJcbiAgICB0aGlzLnBhbmVscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgcGFuZWwucGFuZWwucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICByZWluZGV4KCkge1xyXG4gICAgdGhpcy5wYW5lbHNcclxuICAgICAgLmZpbHRlcigocCkgPT4gISFwPy5wYW5lbD8ucGFyZW50RWxlbWVudClcclxuICAgICAgLmZvckVhY2goKHAsIGkpID0+IChwLm92ZXJsYXkuZGF0YXNldC5pZCA9IHAub3ZlcmxheS5pbm5lclRleHQgPSBpICsgMSArIFwiXCIpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgem9vbSBhbmQgZHJhZyBjYXBhYmlsaXRpZXMgdG8gYSBwYW5lbFxyXG4gICAqIEBwYXJhbSBwYW5lbCBtYWtlIHRoaXMgcGFuZWwgaW50ZXJhY3RpdmVcclxuICAgKi9cclxuICBhZGRCZWhhdmlvcnMocGFuZWw6IENvbGxhZ2VQYW5lbCkge1xyXG4gICAgbGV0IG92ZXJsYXkgPSBwYW5lbC5vdmVybGF5O1xyXG4gICAgbGV0IGRuZCA9IHRoaXMuZG5kO1xyXG4gICAgaWYgKGRuZCkge1xyXG4gICAgICBkbmQuem9vbWFibGUob3ZlcmxheSk7XHJcbiAgICAgIGRuZC5kcmFnZ2FibGUob3ZlcmxheSk7XHJcbiAgICAgIGRuZC5wYW5hYmxlKHBhbmVsKTtcclxuICAgICAgZG5kLmRyb3BwYWJsZShvdmVybGF5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlaW5kZXhQaG90b3MoKSB7XHJcbiAgICB0aGlzLnBob3Rvcy5mb3JFYWNoKChwaG90bywgaSkgPT4ge1xyXG4gICAgICBsZXQgcCA9IHBob3RvLmltZztcclxuICAgICAgbGV0IG92ZXJsYXkgPSBwLnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgaWYgKCFvdmVybGF5KSB7XHJcbiAgICAgICAgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwib3ZlcmxheVwiKTtcclxuICAgICAgICBvdmVybGF5LmRhdGFzZXQuaWQgPSBvdmVybGF5LmlubmVyVGV4dCA9IDEgKyBpICsgXCJcIjtcclxuICAgICAgICBwLmFwcGVuZENoaWxkKG92ZXJsYXkpO1xyXG4gICAgICAgIHRoaXMuZG5kPy5kcmFnZ2FibGUob3ZlcmxheSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpb3JDb21tYW5kKCkge1xyXG4gICAgaWYgKHRoaXMuY29tbWFuZEhpc3RvcnlJbmRleCA+IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZEhpc3RvcnlbLS10aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBuZXh0Q29tbWFuZCgpIHtcclxuICAgIGlmICh0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXggPCB0aGlzLmNvbW1hbmRIaXN0b3J5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZEhpc3RvcnlbKyt0aGlzLmNvbW1hbmRIaXN0b3J5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzdGFydHVwKCkge1xyXG4gICAgbGV0IGNoaWxkUGFuZWxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBhbmVsXCIpKS5tYXAoKHApID0+IG5ldyBDb2xsYWdlUGFuZWwoPEhUTUxEaXZFbGVtZW50PnApKTtcclxuICAgIGNoaWxkUGFuZWxzLmZvckVhY2goKGMpID0+IHRoaXMuYWRkQmVoYXZpb3JzKGMpKTtcclxuICAgIHRoaXMucGFuZWxzLnB1c2goLi4uY2hpbGRQYW5lbHMpO1xyXG4gICAgbGV0IGNtZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uc29sZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY21kLm9ua2V5ZG93biA9IChldmVudCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxyXG4gICAgICAgICAgdGhpcy5leGVjdXRlQ29tbWFuZChjbWQudmFsdWUpO1xyXG4gICAgICAgICAgY21kLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XHJcbiAgICAgICAgICBjbWQudmFsdWUgPSB0aGlzLnByaW9yQ29tbWFuZCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxyXG4gICAgICAgICAgY21kLnZhbHVlID0gdGhpcy5uZXh0Q29tbWFuZCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLnJlaW5kZXgoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBleGVjdXRlQ29tbWFuZChjbWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5jb21tYW5kSGlzdG9yeUluZGV4ID0gdGhpcy5jb21tYW5kSGlzdG9yeS5wdXNoKGNtZCk7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLmV2YWwoY21kKTtcclxuICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgIHRoaXMubm90aWZ5KGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZUNvbW1hbmQoY29tbWFuZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgYWkgPSBuZXcgQ29tbWFuZFBhcnNlcigpO1xyXG4gICAgcmV0dXJuIGFpLnBhcnNlUGhyYXNlKGNvbW1hbmQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuaW1wb3J0IHtnbG9iYWxzfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xyXG5cclxuY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbmZ1bmN0aW9uIGVzY2FwZSh2YWx1ZTogc3RyaW5nKXtcclxuICB0ZXh0YXJlYS5pbm5lclRleHQgPSB2YWx1ZTtcclxuICByZXR1cm4gdGV4dGFyZWEudmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIZWxwQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBjb21tYW5kcyA9IGdsb2JhbHMucmVwbC5jb21tYW5kcy5saXN0KCkubWFwKG5hbWUgPT4gKHtjb21tYW5kOiAoZ2xvYmFscy5yZXBsLmNvbW1hbmRzLmdldChuYW1lKSBhcyBDb21tYW5kKSwgbmFtZX0pKTtcclxuICAgIGNvbnN0IGtleWJvYXJkQ29tbWFuZHMgPSBnbG9iYWxzLmtleWJvYXJkSGFuZGxlcnMubGlzdCgpO1xyXG4gICAgY29uc3QgbWFya3VwMSA9IGNvbW1hbmRzLm1hcChjID0+IGA8b3B0aW9uIHZhbHVlPVwiJHtjLm5hbWV9XCI+XCIke2MubmFtZX1cIiAtICR7Yy5jb21tYW5kLmFib3V0ICYmIGMuY29tbWFuZC5hYm91dCgpfTwvb3B0aW9uPmApLnNvcnQoKS5qb2luKFwiXCIpO1xyXG4gICAgY29uc3QgbWFya3VwMiA9IGtleWJvYXJkQ29tbWFuZHMubWFwKChjLGkpID0+IGA8b3B0aW9uIHZhbHVlPVwiJHtjLmtleX1cIj5cIiR7Yy5rZXl9XCIgLSAkeyhjLmFib3V0ISl9PC9jb2RlPjwvb3B0aW9uPmApLnNvcnQoKS5qb2luKFwiXCIpO1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGVscFwiKTtcclxuICAgIHRhcmdldC5pbm5lckhUTUwgPSBgJHttYXJrdXAxfSR7bWFya3VwMn1gO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0YXJnZXQpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KFwiLmNvbnNvbGVcIikhLnZhbHVlID0gdGFyZ2V0LnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuXHJcbi8qKlxyXG4gICAqIFNwbGl0cyB0aGUgY3VycmVudCBwYW5lbCBpbnRvIDQgZXF1YWwgc2l6ZSBwYW5lbHNcclxuICAgKiBUaGlzIHBhbmVsIHRoZW4gdGFrZXMgb24gdGhlIHJvbGUgb2YgYSBwYW5lbCBjb250YWluZXJcclxuICAgKi9cclxuICBmdW5jdGlvbiBzcGxpdChwYW5lbDogQ29sbGFnZVBhbmVsKSB7XHJcbiAgICBsZXQgW3RvcGxlZnQsIHRvcHJpZ2h0LCBib3R0b21sZWZ0LCBib3R0b21yaWdodF0gPSBbMSwgMiwgMywgNF0ubWFwKG4gPT4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgICBsZXQgY2hpbGRyZW4gPSBbdG9wbGVmdCwgdG9wcmlnaHQsIGJvdHRvbWxlZnQsIGJvdHRvbXJpZ2h0XS5tYXAodiA9PiBuZXcgQ29sbGFnZVBhbmVsKHYpKTtcclxuICAgIHRvcGxlZnQuY2xhc3NMaXN0LmFkZChcInExXCIpO1xyXG4gICAgdG9wcmlnaHQuY2xhc3NMaXN0LmFkZChcInEyXCIpO1xyXG4gICAgYm90dG9tbGVmdC5jbGFzc0xpc3QuYWRkKFwicTNcIik7XHJcbiAgICBib3R0b21yaWdodC5jbGFzc0xpc3QuYWRkKFwicTRcIik7XHJcbiAgICAvLyBwaG90byBjb250YWlucyBubyBzdGF0ZSBzbyBub3QgY2xvbmluZ1xyXG4gICAgY29uc3QgcGhvdG8gPSBwYW5lbC5waG90bztcclxuICAgIGlmIChwaG90bykge1xyXG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKGMgPT4gYy5hZGRQaG90byhwaG90by5jbG9uZSgpKSk7XHJcbiAgICB9XHJcbiAgICBwYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWxcIik7XHJcbiAgICBwYW5lbC5vdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3JjID0gXCJcIjtcclxuICAgIHBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoXCJwYW5lbC1jb250YWluZXJcIik7XHJcbiAgICBwYW5lbC5wYW5lbC5kYXRhc2V0W1wiaWRcIl0gPSBcIlwiO1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjID0+IHBhbmVsLnBhbmVsLmFwcGVuZENoaWxkKGMucGFuZWwpKTtcclxuICAgIHJldHVybiBjaGlsZHJlbjtcclxuICB9XHJcblxyXG4vKipcclxuICogU3BsaXRzIHRoZSBwYW5lbCBpbnRvIDQgbmV3IGNoaWxkIHBhbmVsc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNwbGl0Q29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGNvbW1hbmRBcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGNvbW1hbmRBcmdzO1xyXG5cclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gbm9kZSBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYW5lbCA9IHJlcGwucGFuZWxzLmZpbmQocCA9PiBwLnBhbmVsID09PSBub2RlKTtcclxuICAgIGlmICghcGFuZWwpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJubyBwYW5lbCBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvcmlnaW5hbEluZGV4ID0gcmVwbC5wYW5lbHMuaW5kZXhPZihwYW5lbCk7XHJcbiAgICBsZXQgY2hpbGRQYW5lbHMgPSBzcGxpdChwYW5lbCk7XHJcbiAgICAvLyByZW1vdmUgc2luY2UgaXQgaXMgbm8gbG9uZ2VyIGEgcGFuZWxcclxuICAgIHJlcGwucGFuZWxzLnNwbGljZShvcmlnaW5hbEluZGV4LCAxLCAuLi5jaGlsZFBhbmVscyk7XHJcbiAgICBjaGlsZFBhbmVscy5mb3JFYWNoKGMgPT4gcmVwbC5hZGRCZWhhdmlvcnMoYykpO1xyXG4gICAgcmVwbC5yZWluZGV4KCk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXNwZWN0UmF0aW9Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBbdywgaF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCB3aWR0aCA9IHBhcnNlRmxvYXQodyk7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcGFyc2VGbG9hdChoKTtcclxuICAgIGxldCB3aW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRvd1wiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjYW52YXMgPSB3aW5kb3cucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50V2lkdGggPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoY2FudmFzKS53aWR0aCk7XHJcbiAgICBsZXQgY3VycmVudEhlaWdodCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpLmhlaWdodCk7XHJcbiAgICAvLyBtdWx0aXBsZSB3aWR0aCBhbmQgaGVpZ2h0IGJ5IG1heGltdW0gc2NhbGUgc3VjaCB0aGF0XHJcbiAgICAvLyB3aWR0aCAqIHNjYWxlIDw9IGN1cnJlbnRXaWR0aCBhbmQgaGVpZ2h0ICogc2NhbGUgPD0gY3VycmVudEhlaWdodFxyXG4gICAgbGV0IHN4ID0gY3VycmVudFdpZHRoIC8gd2lkdGg7XHJcbiAgICBsZXQgc3kgPSBjdXJyZW50SGVpZ2h0IC8gaGVpZ2h0O1xyXG4gICAgbGV0IHNjYWxlID0gTWF0aC5taW4oc3gsIHN5KTtcclxuICAgIHdpbmRvdy5zdHlsZS53aWR0aCA9IGAke01hdGgucm91bmQod2lkdGggKiBzY2FsZSl9cHhgO1xyXG4gICAgd2luZG93LnN0eWxlLmhlaWdodCA9IGAke01hdGgucm91bmQoaGVpZ2h0ICogc2NhbGUpfXB4YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3JkZXJDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBbaWQsIHdpZHRoLCBjb2xvcl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIHJlcGwuc2VsZWN0UGFuZWwoaWQpPy5ib3JkZXIod2lkdGgsIGNvbG9yKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5cclxuY29uc3QgdW5pdHMgPSBcInB4IGVtXCIuc3BsaXQoXCIgXCIpO1xyXG5cclxuZnVuY3Rpb24gaGFzVW5pdHModmFsdWU6IHN0cmluZykge1xyXG4gIHJldHVybiB1bml0cy5zb21lKHYgPT4gdmFsdWUuZW5kc1dpdGgodikpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlU3R5bGVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgdGFyZ2V0OiBrZXlvZiBPbWl0PENTU1N0eWxlRGVjbGFyYXRpb24sIG51bWJlcj4sXHJcbiAgICBwdWJsaWMgb3B0aW9ucz86IHtcclxuICAgICAgdW5pdHM/OiBzdHJpbmc7XHJcbiAgICAgIGRlbHRhPzogbnVtYmVyO1xyXG4gICAgfVxyXG4gICkgeyB9XHJcblxyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIGBjaGFuZ2UgJHt0aGlzLnRhcmdldH1gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXIocmVwbDogUmVwbCkge1xyXG4gICAgcmV0dXJuIHJlcGwucGFuZWxzXHJcbiAgICAgIC5maWx0ZXIocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5jb250YWlucyhcImZvY3VzXCIpKVxyXG4gICAgICAuc29tZShwYW5lbCA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gcGFuZWwucGFuZWw7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KHN0eWxlWzxhbnk+dGhpcy50YXJnZXRdKSArICh0aGlzLm9wdGlvbnM/LmRlbHRhID8/IDApO1xyXG4gICAgICAgIHRhcmdldC5zdHlsZVs8YW55PnRoaXMudGFyZ2V0XSA9IHZhbHVlICsgKHRoaXMub3B0aW9ucz8udW5pdHMgPz8gXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGlmICghYXJncykge1xyXG4gICAgICBpZiAodGhpcy5rZXlib2FyZEhhbmRsZXIocmVwbCkpIHJldHVybjtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhbmVscyA9IHJlcGwucGFuZWxzO1xyXG4gICAgY29uc3QgW3ZhbHVlLCAuLi5pZHNdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBpZiAoIXZhbHVlKSB0aHJvdyBcInNpemUgcmVxdWlyZWRcIjtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRzID0gKCFpZHMubGVuZ3RoKSA/IHBhbmVscyA6IGlkcy5tYXAoaWQgPT4gcmVwbC5zZWxlY3RQYW5lbChpZCkpLmZpbHRlcih2ID0+ICEhdik7XHJcbiAgICBpZiAoIXRhcmdldHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdW5pdHMgPSAhaGFzVW5pdHModmFsdWUpID8gdGhpcy5vcHRpb25zPy51bml0cyB8fCBcIlwiIDogXCJcIjtcclxuXHJcbiAgICB0YXJnZXRzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcbiAgICAgIHBhbmVsLnBhbmVsLnN0eWxlWzxhbnk+dGhpcy50YXJnZXRdID0gYCR7dmFsdWV9JHt1bml0c31gO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcblxyXG5mdW5jdGlvbiBoYXNGb2N1cyhub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR290b0NvbW1hbmRFZGl0b3JDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgbGV0IGVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uc29sZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgaWYgKCFlZGl0b3IpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoXCJubyBjb21tYW5kIGVkaXRvciBmb3VuZFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc0ZvY3VzKGVkaXRvcikpIHJldHVybiBmYWxzZTtcclxuICAgIGVkaXRvci5mb2N1cygpO1xyXG4gICAgZWRpdG9yLnNlbGVjdCgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2N1c1BhbmVscyhyZXBsOiBSZXBsKSB7XHJcbiAgcmV0dXJuIHJlcGwucGFuZWxzLmZpbHRlcihwID0+IHAucGFuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpO1xyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgZ2V0Rm9jdXNQYW5lbHMgfSBmcm9tIFwiLi9nZXRGb2N1c1BhbmVsc1wiO1xyXG5cclxuLyoqXHJcbiAqIHN3YXAgaW1hZ2VzIG9mIHR3byBwYW5lbHNcclxuICovXHJcbmZ1bmN0aW9uIHN3YXBJbWFnZXMocGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IGltYWdlMSA9IHBhbmVsMS5pbWFnZTtcclxuICBsZXQgaW1hZ2UyID0gcGFuZWwyLmltYWdlO1xyXG4gIGxldCBwYXJlbnQxID0gaW1hZ2UxLnBhcmVudEVsZW1lbnQ7XHJcbiAgbGV0IHBhcmVudDIgPSBpbWFnZTIucGFyZW50RWxlbWVudDtcclxuICBpZiAoIXBhcmVudDEgfHwgIXBhcmVudDIpIHJldHVybiBmYWxzZTtcclxuICBsZXQgbmV4dDEgPSBpbWFnZTEubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gIGxldCBuZXh0MiA9IGltYWdlMi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgaW1hZ2UxLnJlbW92ZSgpO1xyXG4gIGltYWdlMi5yZW1vdmUoKTtcclxuICBwYXJlbnQyLmluc2VydEJlZm9yZShpbWFnZTEsIG5leHQyKTtcclxuICBwYXJlbnQxLmluc2VydEJlZm9yZShpbWFnZTIsIG5leHQxKTtcclxuICBsZXQgcGhvdG8xID0gcGFuZWwxLnBob3RvO1xyXG4gIGxldCBwaG90bzIgPSBwYW5lbDIucGhvdG87XHJcbiAgcGFuZWwxLmltYWdlID0gaW1hZ2UyO1xyXG4gIHBhbmVsMi5pbWFnZSA9IGltYWdlMTtcclxuICBwYW5lbDEucGhvdG8gPSBwaG90bzI7XHJcbiAgcGFuZWwyLnBob3RvID0gcGhvdG8xO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFN3YXBQYW5lbHNDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgcHJpdmF0ZSBrZXlib2FyZEhhbmRsZXIocmVwbDogUmVwbCkge1xyXG4gICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAoMiAhPT0gcGFuZWxzLmxlbmd0aCkge1xyXG4gICAgICByZXBsLm5vdGlmeShcIkV4YWN0bHkgdHdvIHBhbmVscyBtdXN0IGJlIHNlbGVjdGVkIGJlZm9yZSB5b3UgY2FuIHBlcmZvcm0gYSBzd2FwLlwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc3dhcEltYWdlcyhwYW5lbHNbMF0sIHBhbmVsc1sxXSk7XHJcbiAgfVxyXG5cclxuICBhYm91dCgpIHtcclxuICAgIHJldHVybiBcIlN3YXAgUGFuZWwgQSBCXCI7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiBmYWxzZSB8IHZvaWQgfCBQcm9taXNlPGZhbHNlIHwgdm9pZD4ge1xyXG4gICAgaWYgKCFhcmdzKVxyXG4gICAgICByZXR1cm4gdGhpcy5rZXlib2FyZEhhbmRsZXIocmVwbCk7XHJcblxyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwYW5lbDEgPSByZXBsLnNlbGVjdFBhbmVsKGlkMSk7XHJcbiAgICBsZXQgcGFuZWwyID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgaWYgKCFwYW5lbDEpIHtcclxuICAgICAgcmVwbC5ub3RpZnkoYFBhbmVsIG5vdCBmb3VuZDogJHtpZDF9YCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICghcGFuZWwyKSB7XHJcbiAgICAgIHJlcGwubm90aWZ5KGBQYW5lbCBub3QgZm91bmQ6ICR7aWQyfWApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBzd2FwSW1hZ2VzKHBhbmVsMSwgcGFuZWwyKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIEdvdG9Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGxldCBpZCA9IGFyZ3M7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5mb2N1cygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgVGV4dENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgdmFsdWVdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuICAgIHBhbmVsLnRleHQgPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuZXhwb3J0IGNsYXNzIFBhZENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZCwgd2lkdGhdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgbm9kZSA9IHJlcGwuc2VsZWN0KGlkKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgbm9kZS5zdHlsZS5wYWRkaW5nID0gYCR7d2lkdGh9ZW1gO1xyXG5cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlOiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBub2RlLnN0eWxlLnZpc2liaWxpdHkgIT09IFwiaGlkZGVuXCI7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgaXNWaXNpYmxlIH0gZnJvbSBcIi4uL2Z1bi9pc1Zpc2libGVcIjtcclxuZXhwb3J0IGNsYXNzIFRvZ2dsZVZpc2liaWxpdHlDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IHtcclxuICAgIHNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgfSkge1xyXG4gIH1cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IG92ZXJsYXlzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3RvcikpIGFzIEFycmF5PEhUTUxFbGVtZW50PjtcclxuICAgIGxldCBhbGxWaXNpYmxlID0gb3ZlcmxheXMuZXZlcnkodiA9PiBpc1Zpc2libGUodikpO1xyXG4gICAgaWYgKCFhbGxWaXNpYmxlKSB7XHJcbiAgICAgIG92ZXJsYXlzLmZvckVhY2godiA9PiB2LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgb3ZlcmxheXMuZm9yRWFjaCh2ID0+IHYuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBnZXRGb2N1c1BhbmVscyB9IGZyb20gXCIuL2dldEZvY3VzUGFuZWxzXCI7XHJcbmltcG9ydCB7IHRyYW5zZm9ybSB9IGZyb20gXCIuLi9mdW4vdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICAgKiBNb3ZlIHRoZSBpbWFnZSBpbnNpZGUgdGhlIGZyYW1lXHJcbiAgICogQHBhcmFtIHggaG9yaXpvbnRhbCBvZmZzZXQgaW4gcGl4ZWxzXHJcbiAgICogQHBhcmFtIHkgdmVydGljYWwgb2Zmc2V0IGluIHBpeGVsc1xyXG4gICAqL1xyXG5mdW5jdGlvbiBwYW4ocmVwbDogUmVwbCwgbm9kZTogSFRNTEVsZW1lbnQsIHg6IHN0cmluZywgeTogc3RyaW5nKSB7XHJcbiAgbGV0IFtkeCwgZHldID0gWzAsIDBdO1xyXG4gIGxldCBhbmltYXRlID0gdHJ1ZTtcclxuICBsZXQgcGl4ZWxTaXplID0gMTtcclxuICBzd2l0Y2ggKHgpIHtcclxuICAgIGNhc2UgXCJ1cFwiOlxyXG4gICAgICBkeSA9IC1waXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImRvd25cIjpcclxuICAgICAgZHkgPSBwaXhlbFNpemU7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgZHggPSAtcGl4ZWxTaXplO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICBkeCA9IHBpeGVsU2l6ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbmltYXRlID0gZmFsc2U7XHJcbiAgICAgIGR4ID0gcGl4ZWxTaXplICogcGFyc2VGbG9hdCh4KTtcclxuICAgICAgZHkgPSBwaXhlbFNpemUgKiBwYXJzZUZsb2F0KHkpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgbGV0IG9wID0gKCkgPT4ge1xyXG4gICAgdHJhbnNmb3JtKG5vZGUsIGB0cmFuc2xhdGUoJHtkeH1weCwgJHtkeX1weClgKTtcclxuICB9O1xyXG4gIG9wKCk7XHJcbiAgbGV0IGFuaW1hdGlvbnMgPSByZXBsLmFuaW1hdGlvbnM7XHJcbiAgYW5pbWF0ZSAmJiBhbmltYXRpb25zLmFuaW1hdGUoXCJwYW5cIiwgb3ApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlSW1hZ2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IHtcclxuICAgIHg/OiBudW1iZXI7XHJcbiAgICB5PzogbnVtYmVyO1xyXG4gIH0pIHsgfVxyXG5cclxuICBhYm91dCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IDxzdHJpbmdbXT5bXTtcclxuICAgIGxldCB4ID0gdGhpcy5kZWx0YT8ueCB8fCAwO1xyXG4gICAgbGV0IHkgPSB0aGlzLmRlbHRhPy55IHx8IDA7XHJcblxyXG4gICAgaWYgKHggPiAwKSByZXN1bHQucHVzaChgJHt4fSBweCByaWdodGApO1xyXG4gICAgaWYgKHggPCAwKSByZXN1bHQucHVzaChgJHsteH0gcHggbGVmdGApO1xyXG4gICAgaWYgKHkgPiAwKSByZXN1bHQucHVzaChgJHt5fSBweCB1cGApO1xyXG4gICAgaWYgKHkgPCAwKSByZXN1bHQucHVzaChgJHsteX0gcHggZG93bmApO1xyXG4gICAgcmV0dXJuIGBtb3ZlIGltYWdlICR7cmVzdWx0LmpvaW4oXCIgYW5kIFwiKX1gO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCEhYXJncykge1xyXG4gICAgICBsZXQgW2lkLCB4LCB5XSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKGlkKTtcclxuICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBwYW4ocmVwbCwgcGFuZWwuaW1hZ2UsIHgsIHkgfHwgXCIwXCIpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlbHRhKSB7XHJcbiAgICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgICAgaWYgKCFwYW5lbHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgcGFuKHJlcGwsIHBhbmVsLmltYWdlLCAodGhpcy5kZWx0YSEueCB8fCAwKSArIFwiXCIsICh0aGlzLmRlbHRhIS55IHx8IDApICsgXCJcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbm90IGhhbmRsZWRcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgTWFyZ2luQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBsZXQgW2lkLCB3aWR0aF0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlID0gcmVwbC5zZWxlY3QoaWQpO1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gICAgbm9kZS5zdHlsZS5tYXJnaW4gPSBgJHt3aWR0aH1lbWA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5cclxuZnVuY3Rpb24gbWVyZ2Vfbm9kZXMocmVwbDogUmVwbCwgcGFuZWwxOiBDb2xsYWdlUGFuZWwsIHBhbmVsMjogQ29sbGFnZVBhbmVsKSB7XHJcbiAgbGV0IG5vZGUxID0gcGFuZWwxLnBhbmVsO1xyXG4gIGxldCBub2RlMiA9IHBhbmVsMi5wYW5lbDtcclxuXHJcbiAgbm9kZTIuY2xhc3NMaXN0LmZvckVhY2goYyA9PiBub2RlMS5jbGFzc0xpc3QuYWRkKGMpKTtcclxuICByZXBsLnJlbW92ZVBhbmVsKHBhbmVsMik7XHJcblxyXG4gIC8vIGlmIG5vZGUxIGlzIHExLi4ucTQgYW5kIG9ubHkgY2hpbGQgdGhlbiBpdCBhc3N1bWVzIHRoZSBxIG9mIGl0J3MgY29udGFpbmVyIGFuZCByZXBsYWNlcyBpdHMgY29udGFpbmVyXHJcbiAgbGV0IHFzID0gWzEsIDIsIDMsIDRdLm1hcCh2ID0+IGBxJHt2fWApO1xyXG4gIGlmIChxcy5ldmVyeSh2ID0+IG5vZGUxLmNsYXNzTGlzdC5jb250YWlucyh2KSkpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IG5vZGUxLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAoIXBhcmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWwtY29udGFpbmVyXCIpKSB7XHJcbiAgICAgIHFzLmZvckVhY2godiA9PiBub2RlMS5jbGFzc0xpc3QucmVtb3ZlKHYpKTtcclxuICAgICAgcXMuZm9yRWFjaCh2ID0+IHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnModikgJiYgbm9kZTEuY2xhc3NMaXN0LmFkZCh2KSk7XHJcbiAgICAgIHBhcmVudC5wYXJlbnRFbGVtZW50Py5pbnNlcnRCZWZvcmUobm9kZTEsIHBhcmVudCk7XHJcbiAgICAgIHBhcmVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVwbC5yZWluZGV4KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXJnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBub2RlMSA9IHJlcGwuc2VsZWN0UGFuZWwoaWQxKTtcclxuICAgIGxldCBub2RlMiA9IHJlcGwuc2VsZWN0UGFuZWwoaWQyKTtcclxuICAgIG5vZGUxICYmIG5vZGUyICYmIG1lcmdlX25vZGVzKHJlcGwsIG5vZGUxLCBub2RlMik7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbGxhZ2VQYW5lbCB9IGZyb20gXCIuLi9jb250cm9scy9Db2xsYWdlUGFuZWxcIjtcclxuaW1wb3J0IHsgYmJveCB9IGZyb20gXCIuLi9mdW4vYmJveFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpUmVzQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG5cclxuICAvKipcclxuICAgKiByZXBsYWNlcyB0aGUgY3VycmVudCBwaG90byB3aXRoIG9uZSBvZiBoaWdoZXIgcXVhbGl0eVxyXG4gICAqL1xyXG4gIGFzeW5jIHVwZ3JhZGVSZXNvbHV0aW9uKHJlcGw6IFJlcGwsIHBhbmVsOiBDb2xsYWdlUGFuZWwpIHtcclxuICAgIGlmICghcGFuZWwucGhvdG8pXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAvLyBhdHRlbXB0cyB0byBpbmNyZWFzZSBhbiBpbWFnZSBzaXplIGFuZCBkZWNyZWFzZSB0aGUgdHJhbnNmb3JtIHNjYWxlXHJcbiAgICAvLyB0byBoYXZlIGEgbmVnbGlnYWJsZSBlZmZlY3Qgb24gdGhlIGltYWdlIGJ1dCBhbGxvdyBmb3Igc3dhcHBpbmcgaW5cclxuICAgIC8vIGEgaGlnaGVyIHJlc29sdXRpb24gdmVyc2lvbi5cclxuICAgIC8vIHRoaXMgaXMgbm90IGNvbXBlbnNhdGluZyBmb3IgIHBhZGRpbmcsIG1hcmdpbiwgYm9yZGVyIHdpZHRoLCBldGMuXHJcbiAgICAvLyBpdCBpcyBub3QgcHJlc2VydmluZyByb3RhdGlvblxyXG4gICAgbGV0IGJveCA9IGJib3gocGFuZWwuaW1hZ2UpO1xyXG4gICAgbGV0IGltYWdlUmVjdCA9IHBhbmVsLmltYWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IHNjYWxlID0gaW1hZ2VSZWN0LndpZHRoIC8gYm94LndpZHRoO1xyXG4gICAgaWYgKDEgPiBzY2FsZSkge1xyXG4gICAgICByZXBsLm5vdGlmeShcInRoaXMgd291bGQgbm90IGJlIGFuIHVwZ3JhZGVcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBwYW5lbFJlY3QgPSBwYW5lbC5wYW5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHBhbmVsLmltYWdlLnN0eWxlLndpZHRoID0gaW1hZ2VSZWN0LndpZHRoICsgXCJweFwiO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gaW1hZ2VSZWN0LmhlaWdodCArIFwicHhcIjtcclxuICAgIGxldCBkeCA9IGltYWdlUmVjdC5sZWZ0IC0gcGFuZWxSZWN0LmxlZnQgLSBwYXJzZUZsb2F0KHBhbmVsLnBhbmVsLnN0eWxlLmJvcmRlckxlZnRXaWR0aCk7XHJcbiAgICBsZXQgZHkgPSBpbWFnZVJlY3QudG9wIC0gcGFuZWxSZWN0LnRvcCAtIHBhcnNlRmxvYXQocGFuZWwucGFuZWwuc3R5bGUuYm9yZGVyVG9wV2lkdGgpO1xyXG4gICAgcGFuZWwuaW1hZ2Uuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2R4fXB4LCR7ZHl9cHgpYDtcclxuICAgIHBhbmVsLnNldEJhY2tncm91bmRJbWFnZShgJHtwYW5lbC5waG90by5tZWRpYUluZm8uYmFzZVVybH09dyR7TWF0aC5mbG9vcihpbWFnZVJlY3Qud2lkdGgpfWApO1xyXG4gICAgcmVwbC5ub3RpZnkoYHVwZ3JhZGVkIGJ5ICR7TWF0aC5yb3VuZChzY2FsZSAqIDEwMCl9JWApO1xyXG4gIH1cclxuXHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBbLi4uaWRzXSA9IGFyZ3Muc3BsaXQoXCIgXCIpLm1hcCh2ID0+IHYudHJpbSgpKS5maWx0ZXIodiA9PiB2Lmxlbmd0aCk7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gIWlkcy5sZW5ndGggPyByZXBsLnBhbmVscyA6IGlkcy5tYXAoaWQgPT4gcmVwbC5zZWxlY3RQYW5lbChpZCkpO1xyXG4gICAgdGFyZ2V0cy5mb3JFYWNoKHAgPT4gcCAmJiB0aGlzLnVwZ3JhZGVSZXNvbHV0aW9uKHJlcGwsIHApKTtcclxuXHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5leHBvcnQgY2xhc3MgTW92ZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IFtpZDEsIGlkMl0gPSBhcmdzLnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCBwaG90byA9IHJlcGwuc2VsZWN0UGhvdG8oaWQxKTtcclxuICAgIGlmICghcGhvdG8pIHJldHVybjtcclxuXHJcblxyXG4gICAgbGV0IHBhbmVsID0gcmVwbC5zZWxlY3RQYW5lbChpZDIpO1xyXG4gICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgIHBhbmVsLmFkZFBob3RvKHBob3RvKTtcclxuXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuaW1wb3J0IHsgdHJhbnNmb3JtIH0gZnJvbSBcIi4uL2Z1bi90cmFuc2Zvcm1cIjtcclxuXHJcbmZ1bmN0aW9uIHJvdGF0ZUltYWdlKHJlcGw6IFJlcGwsIG5vZGU6IEhUTUxFbGVtZW50LCBhbmdsZTogc3RyaW5nKSB7XHJcbiAgaWYgKCFub2RlKVxyXG4gICAgcmV0dXJuO1xyXG5cclxuICBpZiAoISFhbmdsZSkge1xyXG4gICAgdHJhbnNmb3JtKG5vZGUsIGByb3RhdGUoJHthbmdsZX1kZWcpYCk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgbGV0IGFuZ2xlID0gMDtcclxuICAgIGxldCBhbmltYXRpb25zID0gcmVwbC5hbmltYXRpb25zO1xyXG4gICAgYW5pbWF0aW9ucy5hbmltYXRlKFwicm90YXRlXCIsICgpID0+IHtcclxuICAgICAgYW5nbGUgKz0gMTtcclxuICAgICAgdHJhbnNmb3JtKG5vZGUsIGByb3RhdGUoJHthbmdsZX1kZWcpYCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJvdGF0ZVBhbmVsQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YTogbnVtYmVyKSB7IH1cclxuXHJcbiAgYWJvdXQoKSB7XHJcbiAgICByZXR1cm4gYHJvdGF0ZSBwYW5lbCBieSAke3RoaXMuZGVsdGF9IGRlZ2A7XHJcbiAgfVxyXG5cclxuICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M6IHN0cmluZyk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLnBhbmVsO1xyXG4gICAgICB0cmFuc2Zvcm0obGFiZWxJbWFnZU9yUGFuZWwsIGByb3RhdGUoJHt0aGlzLmRlbHRhfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvdGF0ZUltYWdlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWx0YT86IG51bWJlcikgeyB9XHJcblxyXG4gIGFib3V0KCkge1xyXG4gICAgcmV0dXJuIGByb3RhdGUgaW1hZ2UgYnkgJHt0aGlzLmRlbHRhfSBkZWdgO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShyZXBsOiBSZXBsLCBhcmdzOiBzdHJpbmcpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgaWYgKCEhYXJncykge1xyXG4gICAgICBsZXQgW25vdW4sIG5vdW4yXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKG5vdW4pO1xyXG4gICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIHJvdGF0ZUltYWdlKHJlcGwsIHBhbmVsLmltYWdlLCBub3VuMik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcGFuZWxzID0gZ2V0Rm9jdXNQYW5lbHMocmVwbCk7XHJcbiAgICBpZiAoIXBhbmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgIGxldCBsYWJlbEltYWdlT3JQYW5lbCA9IHBhbmVsLmltYWdlO1xyXG4gICAgICB0cmFuc2Zvcm0obGFiZWxJbWFnZU9yUGFuZWwsIGByb3RhdGUoJHt0aGlzLmRlbHRhfWRlZylgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVQYW5lbENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGVsdGE6IHtcclxuICAgIHg/OiBudW1iZXI7XHJcbiAgICB5PzogbnVtYmVyO1xyXG4gIH0pIHsgfVxyXG5cclxuICBhYm91dCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IDxzdHJpbmdbXT5bXTtcclxuICAgIGxldCB4ID0gdGhpcy5kZWx0YS54IHx8IDA7XHJcbiAgICBsZXQgeSA9IHRoaXMuZGVsdGEueSB8fCAwO1xyXG5cclxuICAgIGlmICh4ID4gMCkgcmVzdWx0LnB1c2goYCR7eH0gcHggcmlnaHRgKTtcclxuICAgIGlmICh4IDwgMCkgcmVzdWx0LnB1c2goYCR7LXh9IHB4IGxlZnRgKTtcclxuICAgIGlmICh5ID4gMCkgcmVzdWx0LnB1c2goYCR7eX0gcHggdXBgKTtcclxuICAgIGlmICh5IDwgMCkgcmVzdWx0LnB1c2goYCR7LXl9IHB4IGRvd25gKTtcclxuICAgIHJldHVybiBgbW92ZSBwYW5lbCAke3Jlc3VsdC5qb2luKFwiIGFuZCBcIil9YDtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBwYW5lbHMgPSBnZXRGb2N1c1BhbmVscyhyZXBsKTtcclxuICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xyXG4gICAgICBsZXQgbGFiZWxJbWFnZU9yUGFuZWwgPSBwYW5lbC5wYW5lbDtcclxuICAgICAgbGV0IGNvbXB1dGVkVHJhbmZvcm0gPSBnZXRDb21wdXRlZFN0eWxlKGxhYmVsSW1hZ2VPclBhbmVsKS50cmFuc2Zvcm07XHJcbiAgICAgIGlmIChjb21wdXRlZFRyYW5mb3JtID09PSBcIm5vbmVcIikgY29tcHV0ZWRUcmFuZm9ybSA9IFwiXCI7XHJcbiAgICAgIGxhYmVsSW1hZ2VPclBhbmVsLnN0eWxlLnRyYW5zZm9ybSA9IGNvbXB1dGVkVHJhbmZvcm0gKyBgIHRyYW5zbGF0ZSgke3RoaXMuZGVsdGEueCB8fCAwfXB4LCAke3RoaXMuZGVsdGEueSB8fCAwfXB4KWA7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9wQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gIGFib3V0KCkgeyByZXR1cm4gXCJTdG9wIEFuaW1hdGlvbnNcIjt9XHJcblxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGlmICghcmVwbC5hbmltYXRpb25zLmFuaW1hdGlvbnMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXBsLmFuaW1hdGlvbnMuc3RvcChhcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb2dnbGVGb2N1c0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBhYm91dCgpIHsgcmV0dXJuIFwiVG9nZ2xlIGZvY3VzXCI7fVxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB8IGZhbHNlIHtcclxuICAgIGxldCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICBpZiAoIWFjdGl2ZVBhbmVsPy5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbFwiKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgYWN0aXZlUGFuZWwuY2xhc3NMaXN0LnRvZ2dsZShcImZvY3VzXCIpO1xyXG4gICAgLy8gaGVyZSBpIGFtIC0gaWYgbm90IFwic2hpZnRcIiBrZXkgdGhlbiB1bmZvY3VzIGFsbCBwYW5lbHNcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0NvbW1hbmRcIjtcclxuZXhwb3J0IGNsYXNzIEVzY2FwZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICBcclxuICBwcml2YXRlIGlzUGFuZWwoZWxlbWVudDogRWxlbWVudCB8IG51bGwpIHtcclxuICAgIGlmICghZWxlbWVudClcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFuZWxcIikgfHwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwYW5lbC1jb250YWluZXJcIik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNlbGVjdFBhcmVudFBhbmVsKCkge1xyXG4gICAgbGV0IGN1cnJlbnRQYW5lbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFjdXJyZW50UGFuZWwpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHdoaWxlIChjdXJyZW50UGFuZWwpIHtcclxuICAgICAgY3VycmVudFBhbmVsID0gY3VycmVudFBhbmVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIGlmICghY3VycmVudFBhbmVsKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgaWYgKHRoaXMuaXNQYW5lbChjdXJyZW50UGFuZWwpKSB7XHJcbiAgICAgICAgY3VycmVudFBhbmVsLmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJnczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAvLyB1bmZvY3VzIGFsbCBwYW5lbHNcclxuICAgIHJlcGwucGFuZWxzLmZvckVhY2gocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJmb2N1c1wiKSk7XHJcbiAgICB0aGlzLnNlbGVjdFBhcmVudFBhbmVsKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlRm9udFNpemVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGRlbHRhOiBudW1iZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBhYm91dCgpIHtcclxuICAgICAgcmV0dXJuIGBpbmNyZWFzZSBmb250IGJ5ICR7dGhpcy5kZWx0YX1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgaXNMYWJlbChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gICAgICAgIGlmICghZWxlbWVudClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImxhYmVsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAoIXRoaXMuaXNMYWJlbChsYWJlbCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgZm9udFNpemUgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUobGFiZWwpLmZvbnRTaXplKTtcclxuICAgICAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplICsgdGhpcy5kZWx0YX1weGA7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IEdvb2dsZU1lZGlhSXRlbSB9IGZyb20gXCIuL0dvb2dsZU1lZGlhSXRlbVwiO1xyXG5leHBvcnQgaW50ZXJmYWNlIEdvb2dsZVBob3RvQVBJIHtcclxuICBhdXRoMjoge1xyXG4gICAgZ2V0QXV0aEluc3RhbmNlOiAoKSA9PiB7XHJcbiAgICAgIGlzU2lnbmVkSW46IHtcclxuICAgICAgICBsaXN0ZW46IChjYjogKGlzU2lnbmVkSW46IGJvb2xlYW4pID0+IHZvaWQpID0+IHZvaWQ7XHJcbiAgICAgICAgZ2V0OiAoKSA9PiBib29sZWFuO1xyXG4gICAgICB9O1xyXG4gICAgICBzaWduSW46ICgpID0+IHZvaWQ7XHJcbiAgICAgIHNpZ25PdXQ6ICgpID0+IHZvaWQ7XHJcbiAgICB9O1xyXG4gIH07XHJcbiAgbG9hZDogKHR5cGU6IHN0cmluZywgY2I6IEZ1bmN0aW9uKSA9PiB2b2lkO1xyXG4gIGNsaWVudDoge1xyXG4gICAgaW5pdDogKGFyZ3M6IHtcclxuICAgICAgYXBpS2V5OiBzdHJpbmc7XHJcbiAgICAgIGRpc2NvdmVyeURvY3M6IEFycmF5PHN0cmluZz47XHJcbiAgICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICAgIHNjb3BlOiBzdHJpbmc7XHJcbiAgICB9KSA9PiBQcm9taXNlPGFueT47XHJcbiAgICBwaG90b3NsaWJyYXJ5OiB7XHJcbiAgICAgIGFsYnVtczoge1xyXG4gICAgICAgIGxpc3Q6IEZ1bmN0aW9uO1xyXG4gICAgICB9O1xyXG4gICAgICBtZWRpYUl0ZW1zOiB7XHJcbiAgICAgICAgc2VhcmNoOiAoYXJnczoge1xyXG4gICAgICAgICAgYWxidW1JZDogc3RyaW5nO1xyXG4gICAgICAgICAgcGFnZVRva2VuPzogc3RyaW5nO1xyXG4gICAgICAgIH0pID0+IFByb21pc2U8e1xyXG4gICAgICAgICAgcmVzdWx0OiB7XHJcbiAgICAgICAgICAgIG5leHRQYWdlVG9rZW4/OiBzdHJpbmc7XHJcbiAgICAgICAgICAgIG1lZGlhSXRlbXM6IEFycmF5PEdvb2dsZU1lZGlhSXRlbT47XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0+O1xyXG4gICAgICAgIGdldDogKG1lZGlhSXRlbUlkOiBhbnkpID0+IFByb21pc2U8e1xyXG4gICAgICAgICAgcmVzdWx0OiBHb29nbGVNZWRpYUl0ZW07XHJcbiAgICAgICAgfT47XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgR29vZ2xlUGhvdG9BUEkgfSBmcm9tIFwiLi4vbW9kZWxzL0dvb2dsZVBob3RvQVBJXCI7XHJcblxyXG5kZWNsYXJlIHZhciBnYXBpOiBHb29nbGVQaG90b0FQSTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVQaG90b1NpZ25pbiB7XHJcbiAgcHJpdmF0ZSBwZW9wbGVBcGlEaXNjb3ZlcnkgPSBcIlwiO1xyXG4gIC8vIHdoZXJlIHRvIHN0b3JlIHRoZXNlIHZhbHVlcz9cclxuICBwcml2YXRlIHNjb3BlcyA9IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9waG90b3NsaWJyYXJ5LnJlYWRvbmx5XCI7XHJcbiAgcHJpdmF0ZSBhdXRob3JpemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dGhvcml6ZS1idXR0b25cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBzaWdub3V0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWdub3V0LWJ1dHRvblwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBwcml2YXRlIHJlYWR5ID0gKCkgPT4geyB9O1xyXG4gIGFzeW5jIGhhbmRsZUNsaWVudExvYWQoKSB7XHJcbiAgICAvLyBMb2FkIHRoZSBBUEkgY2xpZW50IGFuZCBhdXRoMiBsaWJyYXJ5LlxyXG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBnYXBpLmxvYWQoXCJjbGllbnQ6YXV0aDJcIiwgcmVzb2x2ZSk7XHJcbiAgICB9KTtcclxuICAgIGxldCBjcmVkZW50aWFsc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIuL3dlYi9jcmVkZW50aWFscy5qc29uXCIpO1xyXG4gICAgbGV0IGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgIGFwaUtleTogc3RyaW5nO1xyXG4gICAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gICAgfSA9IGF3YWl0IGNyZWRlbnRpYWxzUmVzcG9uc2UuanNvbigpO1xyXG4gICAgbGV0IHJlc3AgPSBhd2FpdCBmZXRjaChcIi4vd2ViL3Bob3Rvc19yZXN0X3YxLmpzb25cIik7XHJcbiAgICB0aGlzLnBlb3BsZUFwaURpc2NvdmVyeSA9IGF3YWl0IHJlc3AuanNvbigpO1xyXG4gICAgYXdhaXQgdGhpcy5pbml0Q2xpZW50KGNyZWRlbnRpYWxzKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBhc3luYyBpbml0Q2xpZW50KGFyZ3M6IHtcclxuICAgIGFwaUtleTogc3RyaW5nO1xyXG4gICAgY2xpZW50SWQ6IHN0cmluZztcclxuICB9KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAoZ29vZCwgYmFkKSA9PiB7XHJcbiAgICAgIHRoaXMucmVhZHkgPSAoKSA9PiBnb29kKCk7XHJcbiAgICAgIGF3YWl0IGdhcGkuY2xpZW50LmluaXQoe1xyXG4gICAgICAgIGFwaUtleTogYXJncy5hcGlLZXksXHJcbiAgICAgICAgZGlzY292ZXJ5RG9jczogW3RoaXMucGVvcGxlQXBpRGlzY292ZXJ5XSxcclxuICAgICAgICBjbGllbnRJZDogYXJncy5jbGllbnRJZCxcclxuICAgICAgICBzY29wZTogdGhpcy5zY29wZXMsXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBMaXN0ZW4gZm9yIHNpZ24taW4gc3RhdGUgY2hhbmdlcy5cclxuICAgICAgZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKS5pc1NpZ25lZEluLmxpc3Rlbih0aGlzLnVwZGF0ZVNpZ25pblN0YXR1cyk7XHJcbiAgICAgIC8vIEhhbmRsZSB0aGUgaW5pdGlhbCBzaWduLWluIHN0YXRlLlxyXG4gICAgICB0aGlzLnVwZGF0ZVNpZ25pblN0YXR1cyhnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLmlzU2lnbmVkSW4uZ2V0KCkpO1xyXG4gICAgICB0aGlzLmF1dGhvcml6ZUJ1dHRvbi5vbmNsaWNrID0gdGhpcy5oYW5kbGVBdXRoQ2xpY2s7XHJcbiAgICAgIHRoaXMuc2lnbm91dEJ1dHRvbi5vbmNsaWNrID0gdGhpcy5oYW5kbGVTaWdub3V0Q2xpY2s7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHJpdmF0ZSB1cGRhdGVTaWduaW5TdGF0dXMoaXNTaWduZWRJbjogYm9vbGVhbikge1xyXG4gICAgaWYgKGlzU2lnbmVkSW4pIHtcclxuICAgICAgdGhpcy5hdXRob3JpemVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICB0aGlzLnNpZ25vdXRCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgdGhpcy5yZWFkeSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuYXV0aG9yaXplQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgIHRoaXMuc2lnbm91dEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgaGFuZGxlQXV0aENsaWNrKCkge1xyXG4gICAgZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKS5zaWduSW4oKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBoYW5kbGVTaWdub3V0Q2xpY2soKSB7XHJcbiAgICBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpLnNpZ25PdXQoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBHb29nbGVBbGJ1bSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGNvdmVyUGhvdG9CYXNlVXJsOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgR29vZ2xlUGhvdG9TaWduaW4gfSBmcm9tIFwiLi9Hb29nbGVQaG90b1NpZ25pblwiO1xyXG5pbXBvcnQgeyBHb29nbGVNZWRpYUl0ZW0gfSBmcm9tIFwiLi4vbW9kZWxzL0dvb2dsZU1lZGlhSXRlbVwiO1xyXG5pbXBvcnQgeyBHb29nbGVBbGJ1bSB9IGZyb20gXCIuLi9tb2RlbHMvR29vZ2xlQWxidW1cIjtcclxuaW1wb3J0IHsgR29vZ2xlUGhvdG9BUEkgfSBmcm9tIFwiLi4vbW9kZWxzL0dvb2dsZVBob3RvQVBJXCI7XHJcblxyXG5kZWNsYXJlIHZhciBnYXBpOiBHb29nbGVQaG90b0FQSTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVQaG90b3Mge1xyXG5cclxuICBhc3luYyBnZXRBbGJ1bXMoKSB7XHJcbiAgICBsZXQgc2lnbmluID0gbmV3IEdvb2dsZVBob3RvU2lnbmluKCk7XHJcbiAgICBhd2FpdCBzaWduaW4uaGFuZGxlQ2xpZW50TG9hZCgpO1xyXG4gICAgbGV0IHJlc3AgPSBhd2FpdCBnYXBpLmNsaWVudC5waG90b3NsaWJyYXJ5LmFsYnVtcy5saXN0KCk7XHJcbiAgICBpZiAocmVzcC5zdGF0dXMgIT09IDIwMClcclxuICAgICAgdGhyb3cgYHN0YXR1czogJHtyZXNwLnN0YXR1c31gO1xyXG4gICAgY29uc29sZS5sb2coeyByZXNwIH0pO1xyXG4gICAgbGV0IGFsYnVtcyA9IHJlc3AucmVzdWx0LmFsYnVtcyBhcyBBcnJheTxHb29nbGVBbGJ1bT47XHJcbiAgICB3aGlsZSAocmVzcC5yZXN1bHQubmV4dFBhZ2VUb2tlbikge1xyXG4gICAgICByZXNwID0gYXdhaXQgZ2FwaS5jbGllbnQucGhvdG9zbGlicmFyeS5hbGJ1bXMubGlzdCh7cGFnZVRva2VuOiByZXNwLnJlc3VsdC5uZXh0UGFnZVRva2VufSk7XHJcbiAgICAgIGlmIChyZXNwLnN0YXR1cyAhPT0gMjAwKVxyXG4gICAgICAgIHRocm93IGBzdGF0dXM6ICR7cmVzcC5zdGF0dXN9YDtcclxuICAgICAgY29uc29sZS5sb2coeyByZXNwIH0pO1xyXG4gICAgICBhbGJ1bXMgPSBhbGJ1bXMuY29uY2F0KHJlc3AucmVzdWx0LmFsYnVtcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWxidW1zO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxidW0oYWxidW06IEdvb2dsZUFsYnVtKSB7XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkubWVkaWFJdGVtcy5zZWFyY2goeyBhbGJ1bUlkOiBhbGJ1bS5pZCB9KTtcclxuICAgIGxldCB7bWVkaWFJdGVtc30gPSBkYXRhLnJlc3VsdDtcclxuICAgIHdoaWxlIChkYXRhLnJlc3VsdC5uZXh0UGFnZVRva2VuKSB7XHJcbiAgICAgIGRhdGEgPSBhd2FpdCBnYXBpLmNsaWVudC5waG90b3NsaWJyYXJ5Lm1lZGlhSXRlbXMuc2VhcmNoKHsgYWxidW1JZDogYWxidW0uaWQsIHBhZ2VUb2tlbjogZGF0YS5yZXN1bHQubmV4dFBhZ2VUb2tlbiB9KTtcclxuICAgICAgbWVkaWFJdGVtcy5wdXNoKC4uLmRhdGEucmVzdWx0Lm1lZGlhSXRlbXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lZGlhSXRlbXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQaG90byhtZWRpYUl0ZW1JZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGdhcGkuY2xpZW50LnBob3Rvc2xpYnJhcnkubWVkaWFJdGVtcy5nZXQoeyBtZWRpYUl0ZW1JZCB9KTtcclxuICAgIHJldHVybiAoZGF0YS5yZXN1bHQpIGFzIEdvb2dsZU1lZGlhSXRlbTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9tb2RlbHMvQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgR29vZ2xlUGhvdG9zIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0dvb2dsZVBob3Rvc1wiO1xyXG5pbXBvcnQgeyBHb29nbGVDb2xsYWdlUGhvdG8gfSBmcm9tIFwiLi4vY29udHJvbHMvR29vZ2xlQ29sbGFnZVBob3RvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3BlbkFsYnVtc0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICAgIGFzeW5jIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IFByb21pc2U8ZmFsc2UgfCB2b2lkPiB7XHJcbiAgICAgICAgaWYgKCFhcmdzKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub3BlbkFsYnVtcyhyZXBsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWxidW1OYW1lcyA9IGFyZ3Muc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMub3BlbkFsYnVtcyhyZXBsLCBhbGJ1bU5hbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvcGVuQWxidW1zKHJlcGw6IFJlcGwsIGFsYnVtTmFtZXM/OiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgbGV0IHBob3RvcyA9IG5ldyBHb29nbGVQaG90b3MoKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBob3Rvc1wiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBhbGJ1bXMgPSBhd2FpdCBwaG90b3MuZ2V0QWxidW1zKCk7XHJcbiAgICAgICAgICAgIGlmIChhbGJ1bU5hbWVzKSBhbGJ1bXMgPSBhbGJ1bXMuZmlsdGVyKGEgPT4gLTEgPCBhbGJ1bU5hbWVzLmluZGV4T2YoYS50aXRsZSkpO1xyXG4gICAgICAgICAgICBhbGJ1bXMuZm9yRWFjaChhc3luYyAoYWxidW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBvcGVuaW5nIGFsYnVtOiAke2FsYnVtLmlkfSAoJHthbGJ1bS50aXRsZX0pYCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVkaWFJdGVtcyA9IGF3YWl0IHBob3Rvcy5nZXRBbGJ1bShhbGJ1bSk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUl0ZW1zLmZvckVhY2gobWVkaWFJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGhvdG8gPSBuZXcgR29vZ2xlQ29sbGFnZVBob3RvKG1lZGlhSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbC5waG90b3MucHVzaChwaG90byk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGhvdG8ucmVuZGVySW50byh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcGwucmVpbmRleFBob3RvcygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3IgfSBmcm9tIFwiLi4vbW9kZWxzL0JlaGF2aW9yXCI7XHJcblxyXG4vKipcclxuICogV2hlbiB1c2VyIHNoaWZ0LWNsaWNrcyBhIHBhbmVsIGFkZCBcImZvY3VzXCIgY2xhc3NcclxuICogV2hlbiB1c2VyIGNsaWNrcyBhIHBhbmVsIGFkZCBcImZvY3VzXCIgY2xhc3MsIHJlbW92ZSBcImZvY3VzXCIgZnJvbSBhbGwgb3RoZXJzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RvciBpbXBsZW1lbnRzIEJlaGF2aW9yPFJlcGw+XHJcbntcclxuICAgIGV4dGVuZChjb250cm9sOiBSZXBsKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIGN1cnJlbnQgXCJmb2N1c1wiIGlmIHNoaWZ0IG5vdCBjbGlja2VkXHJcbiAgICAgICAgICAgIGlmICghZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2wucGFuZWxzLmZvckVhY2gocCA9PiBwLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJmb2N1c1wiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBhbmVscyA9IGV2ZW50LmNvbXBvc2VkUGF0aCgpO1xyXG4gICAgICAgICAgICBwYW5lbHMgPSBwYW5lbHMuZmlsdGVyKChub2RlOiBhbnkpID0+IHRydWUgPT09IG5vZGU/LmNsYXNzTGlzdD8uY29udGFpbnMoXCJwYW5lbFwiKSkgYXMgQXJyYXk8SFRNTEVsZW1lbnQ+OyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYW5lbHMuZm9yRWFjaCgobm9kZTogYW55KSA9PiBub2RlLmNsYXNzTGlzdC50b2dnbGUoXCJmb2N1c1wiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuLi9jb250cm9scy9SZXBsXCI7XHJcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSBcIi4uL21vZGVscy9CZWhhdmlvclwiO1xyXG5pbXBvcnQgeyBUb2FzdGVyIH0gZnJvbSBcIi4uL2NvbnRyb2xzL1RvYXN0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBXaGVuIHVzZXIgc2hpZnQtY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzc1xyXG4gKiBXaGVuIHVzZXIgY2xpY2tzIGEgcGFuZWwgYWRkIFwiZm9jdXNcIiBjbGFzcywgcmVtb3ZlIFwiZm9jdXNcIiBmcm9tIGFsbCBvdGhlcnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25CZWhhdmlvciBpbXBsZW1lbnRzIEJlaGF2aW9yPFJlcGw+XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0b2FzdGVyOiBUb2FzdGVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZW5kKGNvbnRyb2w6IFJlcGwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbm90aWZ5ID0gY29udHJvbC5ub3RpZnk7XHJcbiAgICAgICAgY29udHJvbC5ub3RpZnkgPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIG5vdGlmeShtZXNzYWdlKTtcclxuICAgICAgICAgICAgdGhpcy50b2FzdGVyLnRvYXN0KG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlcGwgfSBmcm9tIFwiLi4vY29udHJvbHMvUmVwbFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9Db21tYW5kXCI7XHJcbmltcG9ydCB7IGdldEZvY3VzUGFuZWxzIH0gZnJvbSBcIi4vZ2V0Rm9jdXNQYW5lbHNcIjtcclxuaW1wb3J0IHsgQ29sbGFnZVBhbmVsIH0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbGxhZ2VQYW5lbFwiO1xyXG5pbXBvcnQgeyB0cmFuc2Zvcm0gfSBmcm9tIFwiLi4vZnVuL3RyYW5zZm9ybVwiO1xyXG5cclxuLyoqXHJcbiAqIFNjYWxlIHRoZSBpbWFnZVxyXG4gKiBAcGFyYW0gc2NhbGUgcGVyY2VudGFnZSBkZWx0YSBmcm9tIGN1cnJlbnQgc2NhbGVcclxuICovXHJcbmZ1bmN0aW9uIHNjYWxlSW1hZ2UocmVwbDogUmVwbCwgcGFuZWw6IENvbGxhZ2VQYW5lbCwgc2NhbGU6IHN0cmluZykge1xyXG4gICAgbGV0IG5vZGUgPSBwYW5lbC5pbWFnZTtcclxuICAgIGlmICghbm9kZSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgaWYgKCFzY2FsZSkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGdldENvbXB1dGVkU3R5bGUobm9kZSkud2lkdGg7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gcGFyc2VGbG9hdCh3aWR0aCkgLyAxMDA7XHJcbiAgICAgICAgcmVwbC5hbmltYXRpb25zLmFuaW1hdGUoXCJ6b29tXCIsICgpID0+IHtcclxuICAgICAgICAgICAgc2NhbGUgKj0gMS4wMTtcclxuICAgICAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IGAkezEwMCAqIHNjYWxlfSVgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gY29tcHV0ZSBmb2NhbCBwb2ludCB0byB6b29tIGFib3V0XHJcbiAgICAgICAgLy8gbGV0IGltYWdlQm94ID0gYmJveChub2RlKTtcclxuICAgICAgICAvLyBsZXQgcGFuZWxCb3ggPSBiYm94KHBhbmVsLnBhbmVsKTtcclxuICAgICAgICAvLyBsZXQgZm9jYWxQb2ludCA9IFstaW1hZ2VCb3gubGVmdCArIHBhbmVsQm94LndpZHRoIC8gMiwgLWltYWdlQm94LnRvcCArIHBhbmVsQm94LmhlaWdodCAvIDJdO1xyXG4gICAgICAgIGxldCBlZmZlY3RpdmVTY2FsZSA9IHBhcnNlRmxvYXQoc2NhbGUpO1xyXG4gICAgICAgIC8vbm9kZS5zdHlsZS53aWR0aCA9IGAkezEwMCAqIGVmZmVjdGl2ZVNjYWxlfSVgO1xyXG4gICAgICAgIC8vIHRoZSBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0IGNoYW5nZWQsIHRyYW5zbGF0ZSB0aGUgb3JpZ2luYWwgaW1hZ2VcclxuICAgICAgICAvLyBjZW50ZXIgYmFjayB0byB0aGUgcGFuZWwgY2VudGVyXHJcbiAgICAgICAgdHJhbnNmb3JtKG5vZGUsIGBzY2FsZSgke2VmZmVjdGl2ZVNjYWxlfSwke2VmZmVjdGl2ZVNjYWxlfSlgKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTY2FsZVBhbmVsQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHNjYWxlPzogbnVtYmVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgYWJvdXQoKSB7XHJcbiAgICAgIHJldHVybiBgc2NhbGUgcGFuZWwgYnkgJHsodGhpcy5zY2FsZXx8MCkudG9GaXhlZCgzKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGV4ZWN1dGUocmVwbDogUmVwbCwgYXJncz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQgfCBmYWxzZSB7XHJcbiAgICAgICAgaWYgKCEhYXJncykge1xyXG4gICAgICAgICAgICBsZXQgW25vdW4sIG5vdW4yXSA9IGFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWwgPSByZXBsLnNlbGVjdFBhbmVsKG5vdW4pO1xyXG4gICAgICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHBhbmVsLnNjYWxlRnJhbWUobm91bjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLnNjYWxlRnJhbWUodGhpcy5zY2FsZSArIFwiXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NhbGVJbWFnZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzY2FsZT86IG51bWJlcikge1xyXG4gICAgfVxyXG5cclxuICAgIGFib3V0KCkge1xyXG4gICAgICByZXR1cm4gYHNjYWxlIGltYWdlIGJ5ICR7KHRoaXMuc2NhbGV8fDApLnRvRml4ZWQoMyl9YDtcclxuICAgIH1cclxuXHJcbiAgICBleGVjdXRlKHJlcGw6IFJlcGwsIGFyZ3M/OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHwgZmFsc2Uge1xyXG4gICAgICAgIGlmICghIWFyZ3MpIHtcclxuICAgICAgICAgICAgbGV0IFtpZCwgc2NhbGVdID0gYXJncy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbCA9IHJlcGwuc2VsZWN0UGFuZWwoaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHNjYWxlSW1hZ2UocmVwbCwgcGFuZWwsIHNjYWxlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnNjYWxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IHBhbmVscyA9IGdldEZvY3VzUGFuZWxzKHJlcGwpO1xyXG4gICAgICAgIGlmICghcGFuZWxzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBwYW5lbHMuZm9yRWFjaChwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgIHNjYWxlSW1hZ2UocmVwbCwgcGFuZWwsIHRoaXMuc2NhbGUgKyBcIlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgVG9hc3RlciB9IGZyb20gXCIuL2NvbnRyb2xzL1RvYXN0ZXJcIjtcclxuaW1wb3J0IHsgUmVwbCB9IGZyb20gXCIuL2NvbnRyb2xzL1JlcGxcIjtcclxuaW1wb3J0IHsgRHJhZ0FuZERyb3AgfSBmcm9tIFwiLi9jb250cm9scy9EcmFnQW5kRHJvcFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kcyB9IGZyb20gXCIuL2NvbnRyb2xzL0NvbW1hbmRzXCI7XHJcbmltcG9ydCB7IEhlbHBDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvSGVscFwiO1xyXG5pbXBvcnQgeyBTcGxpdENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9TcGxpdENvbW1hbmRcIjtcclxuaW1wb3J0IHsgQXNwZWN0UmF0aW9Db21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQXNwZWN0UmF0aW9Db21tYW5kXCI7XHJcbmltcG9ydCB7IEJvcmRlckNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Cb3JkZXJDb21tYW5kXCI7XHJcbmltcG9ydCB7IENoYW5nZVN0eWxlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0NoYW5nZVN0eWxlQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBHb3RvQ29tbWFuZEVkaXRvckNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Hb3RvQ29tbWFuZEVkaXRvckNvbW1hbmRcIjtcclxuaW1wb3J0IHsgU3dhcFBhbmVsc0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Td2FwUGFuZWxzQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBHb3RvQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0dvdG9Db21tYW5kXCI7XHJcbmltcG9ydCB7IFRleHRDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvVGV4dENvbW1hbmRcIjtcclxuaW1wb3J0IHsgUGFkQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1BhZENvbW1hbmRcIjtcclxuaW1wb3J0IHsgVG9nZ2xlVmlzaWJpbGl0eUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Ub2dnbGVWaXNpYmlsaXR5Q29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9UcmFuc2xhdGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IE1hcmdpbkNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9NYXJnaW5Db21tYW5kXCI7XHJcbmltcG9ydCB7IE1lcmdlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL01lcmdlQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBIaVJlc0NvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9IaVJlc0NvbW1hbmRcIjtcclxuaW1wb3J0IHsgTW92ZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Nb3ZlQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBSb3RhdGVQYW5lbENvbW1hbmQsIFJvdGF0ZUltYWdlQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0NoYW5nZVJvdGF0aW9uQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVQYW5lbENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9DaGFuZ2VQb3NpdGlvbkNvbW1hbmRcIjtcclxuaW1wb3J0IHsgU3RvcENvbW1hbmQsIFRvZ2dsZUZvY3VzQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL1N0b3BDb21tYW5kXCI7XHJcbmltcG9ydCB7IEtleWJvYXJkSGFuZGxlcnMgfSBmcm9tIFwiLi9jb250cm9scy9LZXlib2FyZEhhbmRsZXJzXCI7XHJcbmltcG9ydCB7IEVzY2FwZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kcy9Fc2NhcGVDb21tYW5kXCI7XHJcbmltcG9ydCB7IENoYW5nZUZvbnRTaXplQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL0NoYW5nZUZvbnRTaXplQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBPcGVuQWxidW1zQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzL09wZW5BbGJ1bXNDb21tYW5kXCI7XHJcbmltcG9ydCB7IE11bHRpU2VsZWN0b3IgfSBmcm9tIFwiLi9iZWhhdmlvci9NdWx0aVNlbGVjdG9yXCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkJlaGF2aW9yIH0gZnJvbSBcIi4vYmVoYXZpb3IvTm90aWZpY2F0aW9uQmVoYXZpb3JcIjtcclxuaW1wb3J0IHsgU2NhbGVQYW5lbENvbW1hbmQsIFNjYWxlSW1hZ2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHMvQ2hhbmdlU2NhbGVDb21tYW5kXCI7XHJcblxyXG4vKiogZ2xvYmFsIHZhcmlhYmxlcyAqL1xyXG5jb25zdCB0b2FzdGVyID0gbmV3IFRvYXN0ZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdGVyXCIpIGFzIEhUTUxFbGVtZW50KTtcclxuY29uc3QgY29tbWFuZHMgPSBuZXcgQ29tbWFuZHMoKTtcclxuY29uc3QgcmVwbCA9IG5ldyBSZXBsKGNvbW1hbmRzKTtcclxuY29uc3Qga2V5Ym9hcmRIYW5kbGVycyA9IG5ldyBLZXlib2FyZEhhbmRsZXJzKCk7XHJcbnJlcGwudXNlKG5ldyBNdWx0aVNlbGVjdG9yKCkpO1xyXG5yZXBsLnVzZShuZXcgTm90aWZpY2F0aW9uQmVoYXZpb3IodG9hc3RlcikpO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IEhlbHBDb21tYW5kKCksIHsga2V5OiBcIj9cIiwgYWJvdXQ6XCJIZWxwXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBFc2NhcGVDb21tYW5kKCksIHsga2V5OiBcIkVzY2FwZVwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlRm9udFNpemVDb21tYW5kKDEpLCB7IGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VGb250U2l6ZUNvbW1hbmQoLTEpLCB7IGtleTogXCItXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU2NhbGVQYW5lbENvbW1hbmQoMS4wMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIrXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZVBhbmVsQ29tbWFuZCgxIC8gMS4wMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCItXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBTY2FsZUltYWdlQ29tbWFuZCgxLjAxKSwgeyBrZXk6IFwiK1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgU2NhbGVJbWFnZUNvbW1hbmQoMSAvIDEuMDEpLCB7IGtleTogXCItXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgUm90YXRlSW1hZ2VDb21tYW5kKDEpLCB7IGtleTogXCIuXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVJbWFnZUNvbW1hbmQoLTEpLCB7IGtleTogXCIsXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVQYW5lbENvbW1hbmQoMSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCI+XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBSb3RhdGVQYW5lbENvbW1hbmQoLTEpLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiPFwiIH0pO1xyXG5cclxuLyoqIHZpbSBjb21tYW5kc1xyXG5UbyBtb3ZlIGxlZnQsIHByZXNzIGguXHJcblRvIG1vdmUgcmlnaHQsIHByZXNzIGwuXHJcblRvIG1vdmUgZG93biwgcHJlc3Mgai5cclxuVG8gbW92ZSB1cCwgcHJlc3Mgay5cclxuICovXHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVQYW5lbENvbW1hbmQoeyB4OiAtMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93TGVmdFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlUGFuZWxDb21tYW5kKHsgeDogMSB9KSwgeyBzaGlmdEtleTogdHJ1ZSwga2V5OiBcIkFycm93UmlnaHRcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHk6IDEgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJBcnJvd0Rvd25cIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZVBhbmVsQ29tbWFuZCh7IHk6IC0xIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQXJyb3dVcFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCh7IHg6IC0xIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93TGVmdFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeDogMSB9KSwgeyBzaGlmdEtleTogZmFsc2UsIGtleTogXCJBcnJvd1JpZ2h0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBUcmFuc2xhdGVJbWFnZUNvbW1hbmQoeyB5OiAxIH0pLCB7IHNoaWZ0S2V5OiBmYWxzZSwga2V5OiBcIkFycm93RG93blwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKHsgeTogLTEgfSksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiQXJyb3dVcFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcInRvcFwiLCB7IGRlbHRhOiAxLCB1bml0czogXCJweFwiIH0pLCB7IGtleTogXCJ0XCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ0b3BcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJUXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJsZWZ0XCIsIHsgZGVsdGE6IDEsIHVuaXRzOiBcInB4XCIgfSksIHsga2V5OiBcImxcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImxlZnRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJMXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3R0b21cIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiYlwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm90dG9tXCIsIHsgZGVsdGE6IC0xLCB1bml0czogXCJweFwiIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiQlwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwicmlnaHRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiclwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwicmlnaHRcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJSXCIgfSk7XHJcblxyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwid2lkdGhcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwid1wiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwid2lkdGhcIiwgeyBkZWx0YTogLTEsIHVuaXRzOiBcInB4XCIgfSksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCJXXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJoZWlnaHRcIiwgeyBkZWx0YTogMSwgdW5pdHM6IFwicHhcIiB9KSwgeyBrZXk6IFwiaFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiaGVpZ2h0XCIsIHsgZGVsdGE6IC0xLCB1bml0czogXCJweFwiIH0pLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiSFwiIH0pO1xyXG5cclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFN3YXBQYW5lbHNDb21tYW5kKCksIHsgY3RybEtleTogdHJ1ZSwga2V5OiBcInNcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFN0b3BDb21tYW5kKCksIHsgc2hpZnRLZXk6IHRydWUsIGtleTogXCIgXCIgfSk7XHJcbmtleWJvYXJkSGFuZGxlcnMuYWRkRXZlbnRIYW5kbGVyKG5ldyBHb3RvQ29tbWFuZEVkaXRvckNvbW1hbmQoKSwgeyBrZXk6IFwiY1wiLCBhYm91dDpcImdvdG8gY29tbWFuZHNcIiB9KTtcclxua2V5Ym9hcmRIYW5kbGVycy5hZGRFdmVudEhhbmRsZXIobmV3IFRvZ2dsZUZvY3VzQ29tbWFuZCgpLCB7IHNoaWZ0S2V5OiB0cnVlLCBrZXk6IFwiIFwiIH0pO1xyXG5rZXlib2FyZEhhbmRsZXJzLmFkZEV2ZW50SGFuZGxlcihuZXcgVG9nZ2xlRm9jdXNDb21tYW5kKCksIHsgc2hpZnRLZXk6IGZhbHNlLCBrZXk6IFwiIFwiIH0pO1xyXG5cclxuY29uc3QgZG5kID0gbmV3IERyYWdBbmREcm9wKHJlcGwsIGtleWJvYXJkSGFuZGxlcnMpO1xyXG5yZXBsLmRuZCA9IGRuZDtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgSGVscENvbW1hbmQoKSwgXCI/XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IE9wZW5BbGJ1bXNDb21tYW5kKCksIFwib3BlblwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQXNwZWN0UmF0aW9Db21tYW5kKCksIFwiYXNwZWN0XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IEJvcmRlckNvbW1hbmQoKSwgXCJib3JkZXJcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgR290b0NvbW1hbmQoKSwgXCJnb3RvXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IEhpUmVzQ29tbWFuZCgpLCBcImhpcmVzXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IE1hcmdpbkNvbW1hbmQoKSwgXCJtYXJnaW5cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgTWVyZ2VDb21tYW5kKCksIFwibWVyZ2VcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgTW92ZUNvbW1hbmQoKSwgXCJtb3ZlXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFBhZENvbW1hbmQoKSwgXCJwYWRcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgUm90YXRlSW1hZ2VDb21tYW5kKCksIFwicm90YXRlXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFNjYWxlUGFuZWxDb21tYW5kKCksIFwic2NhbGVcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgU3dhcFBhbmVsc0NvbW1hbmQoKSwgXCJzd2FwXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFNwbGl0Q29tbWFuZCgpLCBcInNwbGl0XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFN0b3BDb21tYW5kKCksIFwic3RvcFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBUZXh0Q29tbWFuZCgpLCBcInRleHRcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgVHJhbnNsYXRlSW1hZ2VDb21tYW5kKCksIFwidHJhbnNsYXRlXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IFRyYW5zbGF0ZUltYWdlQ29tbWFuZCgpLCBcInBhblwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBTY2FsZUltYWdlQ29tbWFuZCgpLCBcInpvb21cIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYmFja2dyb3VuZENvbG9yXCIpLCBcImJnY1wiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgVG9nZ2xlVmlzaWJpbGl0eUNvbW1hbmQoeyBzZWxlY3RvcjogXCIuY29sbGFnZSAucGFuZWwtY29udGFpbmVyIC5vdmVybGF5XCIgfSksIFwib3ZlcmxheVwiKTtcclxuXHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQ29sb3JcIiksIFwiYmNcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyVG9wQ29sb3JcIiksIFwiYmN0XCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckJvdHRvbUNvbG9yXCIpLCBcImJjYlwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJMZWZ0Q29sb3JcIiksIFwiYmNsXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclJpZ2h0Q29sb3JcIiksIFwiYmNyXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJXaWR0aFwiLCB7dW5pdHM6XCJweFwifSksIFwiYndcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyQm90dG9tV2lkdGhcIiksIFwiYndiXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclRvcFdpZHRoXCIpLCBcImJ3dFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJMZWZ0V2lkdGhcIiksIFwiYndsXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclJpZ2h0V2lkdGhcIiksIFwiYndyXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJvcGFjaXR5XCIpLCBcIm9wYWNpdHlcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiYm9yZGVyUmFkaXVzXCIpLCBcImJyXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlclRvcExlZnRSYWRpdXNcIiksIFwiYnJ0bFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJUb3BSaWdodFJhZGl1c1wiKSwgXCJicnRyXCIpO1xyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcImJvcmRlckJvdHRvbUxlZnRSYWRpdXNcIiksIFwiYnJibFwiKTtcclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiKSwgXCJicmJyXCIpO1xyXG5cclxuY29tbWFuZHMuYWRkKG5ldyBDaGFuZ2VTdHlsZUNvbW1hbmQoXCJ3aWR0aFwiLCB7IHVuaXRzOiBcImVtXCIgfSksIFwid2lkdGhcIik7XHJcbmNvbW1hbmRzLmFkZChuZXcgQ2hhbmdlU3R5bGVDb21tYW5kKFwiaGVpZ2h0XCIsIHsgdW5pdHM6IFwicHhcIiB9KSwgXCJoZWlnaHRcIik7XHJcblxyXG5jb21tYW5kcy5hZGQobmV3IENoYW5nZVN0eWxlQ29tbWFuZChcInpJbmRleFwiKSwgXCJ6XCIpO1xyXG5cclxudG9hc3Rlci50b2FzdChcIldlbGNvbWUhXCIpO1xyXG5leHBvcnQgbGV0IGdsb2JhbHMgPSB7XHJcbiAgICBhbGxvd1NwZWVjaFJlY29nbml0aW9uOiBmYWxzZSxcclxuICAgIGRlYnVnOiB0cnVlLFxyXG4gICAgcmVwbCxcclxuICAgIGRuZCxcclxuICAgIGtleWJvYXJkSGFuZGxlcnMsXHJcbn1cclxuIiwiaW1wb3J0IHsgTGlzdGVuZXIgfSBmcm9tIFwiLi4vY29udHJvbHMvTGlzdGVuZXJcIjtcclxuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gXCIuLi9nbG9iYWxzXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgbGV0IHJlcGwgPSBnbG9iYWxzLnJlcGw7XHJcbiAgYXdhaXQgcmVwbC5zdGFydHVwKCk7XHJcbiAgaWYgKGdsb2JhbHMuYWxsb3dTcGVlY2hSZWNvZ25pdGlvbikge1xyXG4gICAgbGV0IGxpc3RlbmVyID0gbmV3IExpc3RlbmVyKCk7XHJcbiAgICBsaXN0ZW5lci5saXN0ZW4oKTtcclxuICAgIGxpc3RlbmVyLm9uKFwic3BlZWNoLWRldGVjdGVkXCIsIHZhbHVlID0+IHsgcmVwbC5leGVjdXRlQ29tbWFuZChyZXBsLnBhcnNlQ29tbWFuZCh2YWx1ZS5yZXN1bHQpKTsgfSk7XHJcbiAgfVxyXG4gIHJlcGwuZ2V0UGhvdG9PdmVybGF5cygpLmZvckVhY2gob3ZlcmxheSA9PiB7XHJcbiAgICBnbG9iYWxzLmRuZC5kcmFnZ2FibGUob3ZlcmxheSk7XHJcbiAgICBjb25zb2xlLmxvZyhgJHtvdmVybGF5LmlubmVySFRNTH0gaXMgZHJhZ2dhYmxlYCk7XHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgc3RhcnQgfSBmcm9tIFwiLi9jb2xsYWdlL2Z1bi9zdGFydFwiO1xyXG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSBcIi4vY29sbGFnZS9nbG9iYWxzXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBydW4oKSB7XHJcbiAgICBzdGFydCgpO1xyXG5cclxuICAgIGNvbnN0IHJlcGwgPSBnbG9iYWxzLnJlcGw7XHJcblxyXG4gICAgcmVwbC5ldmFsKFwiYXNwZWN0IDYgNlwiKTtcclxuICAgIGlmIChnbG9iYWxzLmRlYnVnKSB7XHJcbiAgICAgIHJlcGwuZXZhbChcIj9cIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwic3BsaXQgMVwiKTtcclxuICAgICAgICByZXBsLmV2YWwoXCJtZXJnZSA0IDNcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwic3BsaXQgMlwiKTtcclxuICAgICAgICByZXBsLmV2YWwoXCJtZXJnZSA0IDVcIik7XHJcbiAgICAgICAgcmVwbC5ldmFsKFwibWVyZ2UgMiAzXCIpO1xyXG4gICAgICAgIC8vL3JlcGwuZXZhbChcInNwbGl0IDFcIik7XHJcblxyXG4gICAgICAgIHJlcGwuZXZhbChcImJ3IDFlbVwiKTtcclxuICAgICAgICByZXBsLmV2YWwoXCJiYyB3aGl0ZVwiKTtcclxuICAgICAgICByZXBsLmV2YWwoXCJiZ2Mgc2lsdmVyXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInNjYWxlIDEgMC43NVwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJib3JkZXIgMSAzIHNpbHZlclwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJyb3RhdGUgMSAtMlwiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJ6b29tIDIgMC41XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInNwbGl0IDFcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwibWVyZ2UgMSAyXCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcInNwbGl0IDZcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwibWVyZ2UgOCA5XCIpO1xyXG4gICAgICAgIC8vIHJlcGwuZXZhbChcIm1lcmdlIDYgN1wiKTtcclxuICAgICAgICAvLyByZXBsLmV2YWwoXCJnb3RvIDFcIik7XHJcbiAgICAgICAgLy8gcmVwbC5ldmFsKFwidGV4dCAxIFN1bW1lciAyMDE5XCIpO1xyXG5yZXR1cm47XHJcbiAgICAgICAgYXdhaXQgcmVwbC5ldmFsKFwib3BlbiBEYXRlIE5pZ2h0LDIwMTlcIik7IC8vIHByZXNlbnQgbGlzdCBvZiBnb29nbGUgcGhvdG8gYWxidW1zP1xyXG4gICAgICAgIC8vYXdhaXQgcmVwbC5ldmFsKFwib3BlbiBncCAxOTk5XCIpOyAvLyBvcGVuIGdvb2dsZSBwaG90byBhbGJ1bSBcIjE5OTlcIj9cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbENvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb2xsYWdlIC5wYW5lbFwiKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBwaG90b0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb2xsYWdlIC5waG90b3MgLmltZ1wiKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHBhbmVsQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVwbC5ldmFsKGBtb3ZlICR7MSArIChpIC0gMSkgJSBwaG90b0NvdW50fSAke2l9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVwbC5ldmFsKFwib3BlbiAxXCIpO1xyXG4gICAgICAgICAgICAvLyByZXBsLmV2YWwoXCJoaXJlcyA2XCIpO1xyXG4gICAgICAgICAgICAvLyByZXBsLmV2YWwoXCJleHBvcnRcIik7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbnJ1bigpO1xyXG4iXX0=
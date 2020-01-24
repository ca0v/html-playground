var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("data/marker", ["require", "exports"], function (require, exports) {
    "use strict";
    return {
        marker1: `M 0 -20
C 0 -20 -6 -20 -6 -12
C -6 -9 0 0 0 0
S 6 -9 6 -12
C 6 -20 0 -20 0 -20
M 0 0
Z`,
        marker2: `M 0 -24
C 0 -24 -6 -24 -6 -16
C -6 -13 0 -4 0 -4
S 6 -13 6 -16
C 6 -24 0 -24 0 -24
M 0 -2
A 1 1 0 0 1 0 2
A 1 1 0 0 1 0 -2
M 0 0
Z`,
        marker3: `M 0 -24
C 0 -24 -6 -24 -6 -16
C -6 -13 0 -4 0 -4
S 6 -13 6 -16
C 6 -24 0 -24 0 -24
M 0 0
L -2 -2
M 0 0
L -2 2
M 0 0
L 2 -2
M 0 0
L 2 2
M 0 0
Z`,
        marker4: `M 0 -20
Z
M 0 -24
C 0 -24 -6 -24 -6 -16
C -6 -13 0 -4 0 -4
S 6 -13 6 -16
C 6 -24 0 -24 0 -24
M 0 0
L -3 -3
L -4 -3
L -1 0
L -4 3
L -3 3
L 0 0
L 3 3
L 4 3
L 1 0
L 4 -3
L 3 -3
L 0 0
M 0 -13
A 2 2 0 0 1 0 -21
A 2 2 0 0 1 0 -13
M 0 0
Z`,
        marker5: `M 0 -20
Z
M 0 -24
C 0 -24 -6 -24 -6 -16
C -6 -13 0 -4 0 -4
S 6 -13 6 -16
C 6 -24 0 -24 0 -24
M 0 -1
L -1 -2
L -4 -3
L -2 0
L -4 3
L -1 2
L 0 1
L 1 2
L 4 3
L 2 0
L 4 -3
L 1 -2
L 0 -1
M 0 -13
A 2 2 0 0 1 0 -21
A 2 2 0 0 1 0 -13
M 0 0
Z`,
        marker6: `M 0 -3
L -3 -23
L 3 -23
L 0 -3
z
M 0 0
L 2 4
L -2 4
Z`,
    };
});
define("data/icons", ["require", "exports"], function (require, exports) {
    "use strict";
    return {
        zoomin: `M 14 15
A 8 8 0 1 1 17 12
L 22 17
A 3 3 0 0 1 19 20
L 14 15
Z
M 11 4
L 9 4
L 9 7
L 6 7
L 6 9
L 9 9
L 9 12
L 11 12
L 11 9
L 14 9
L 14 7
L 11 7
L 11 4
Z`,
        zoomout: `
M 14 15
A 8 8 0 1 1 17 12
L 22 17
A 3 3 0 0 1 19 20
L 14 15
Z
M 14 7
L 7 7
A 1 2 0 0 0 7 9
L 14 9
A 1 2 0 0 0 14 7
Z`,
        polygon: `M 12 0
L 24 13
L 12 22
L 3 14
L 11 11
Z`,
        info: `
M 12 18
L 6 23
L 2 23
L 7 9
L 3 11
L 2 11
L 8 8
L 12 8
L 7 21
L 10 19
Z
M 12 1
A 1 1 0 0 0 10 5
A 1 1 0 0 0 12 1`,
        wizard: `M 11 0
L 8 7
L 0 8
L 5 13
L 4 21
L 9 18
L 10 23
L 12 23
L 13 18
L 19 21
L 17 13
L 22 8
L 14 7
Z
M 11.005 4.937
L 12.484 9.489
L 17.08 9.489
L 13.387 12.055
L 15.844 17.462
L 11.009 13.663
L 7.163 16.432
L 8.622 12.056
L 4.922 9.489
L 9.521 9.489
L 11.005 4.937
Z
`,
        select: `
M 10 22
A 1 1 0 0 0 12 21
L 10 15
L 15 15
L 3 2
L 3 19
L 7 16
Z`,
        next: `M 2 4
L 2 20
L 4 20
L 11 12
L 4 4
Z`,
        previous: `M 11 4
  L 9 4
  L 2 12
  L 9 20
  L 11 20
  Z`,
        zoomfull: `M 17 14
  A 1 1 0 0 0 6 7
  L 8 5
  A 1 1 0 0 0 15 16
  L 18 19
  L 20 17
  L 17 14
  Z
  M 1 1
  L 1 6
  L 6 1
  Z
  M 23 1
  L 18 1
  L 23 6
  Z
  M 23 23
  L 23 18
  L 18 23
  Z
  M 1 23
  L 6 23
  L 1 18
  Z
  `,
        clear: `
  M 0 23
  L 8 5
  L 20 5
  L 11 23
  Z
  M 6 13
  L 14 13
  L 17 7
  L 9 7
  Z
  M 13 23
  L 22 23
  L 22 22
  L 13 22
  Z`,
        pan: `M 8 20
  L 17 20
  L 20 9
  A 1 1 0 0 0 18 9
  L 17 13
  L 17 5
  A 1 1 0 0 0 15 5
  L 14 12
  L 13 4
  A 1 1 0 0 0 11 4
  L 11 12
  L 9 5
  A 1 1 0 0 0 7 5
  L 8 15
  L 5 12
  A 1 1 0 0 0 3 14
  Z`,
        buffer: `M 12 19
  A 1 1 0 0 0 12 6
  A 1 1 0 0 0 12 19
  M 6 16
  A 1 1 0 0 1 14 6
  A 7 7 0 0 0 6 16
  Z`,
        measure: `M 11 10
  A 1 1 0 0 0 13 10
  A 1 1 0 0 0 11 10
  M 9 10
  A 1 1 0 0 1 15 10
  A 1 1 0 0 1 9 10
  M 12 3
  A 1 1 0 0 0 12 17
  A 1 1 0 0 0 12 3
  L 22 3
  L 23 5
  L 22 6
  L 21 5
  L 17 5
  A 10 20 0 0 0 12 3`
    };
});
define("fun/Command", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/Dictionary", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/drawCursor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function drawCursor(location, scale = 5) {
        let { x, y } = location;
        return `M ${x} ${y} l -${scale} -${scale} l ${2 * scale} ${2 * scale} l -${scale} -${scale} l ${scale} -${scale} l -${2 * scale} ${2 * scale} z`;
    }
    exports.drawCursor = drawCursor;
});
define("fun/drawX", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function drawX(location, options) {
        var _a, _b;
        let { x, y } = location;
        let scale = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.scale, (_b !== null && _b !== void 0 ? _b : 1));
        return `M ${x} ${y} l ` + `-${scale} -${scale} l ${2 * scale} ${2 * scale} l -${scale} -${scale} l ${scale} -${scale} l -${2 * scale} ${2 * scale} z`;
    }
    exports.drawX = drawX;
});
define("fun/focus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function focus(element) {
        if (!element)
            return;
        if (!element.focus)
            return;
        element.focus();
    }
    exports.focus = focus;
});
define("fun/parse", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function parse(commandText) {
        let [head, ...tail] = commandText.split(" ");
        return { command: head, args: tail.map(parseFloat) };
    }
    exports.parse = parse;
});
define("fun/getLocation", ["require", "exports", "fun/parse"], function (require, exports, parse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getLocation(index, path) {
        let command = parse_1.parse(path[index]);
        switch (command.command) {
            case "A": return { x: command.args[5], y: command.args[6] };
            case "C": return { x: command.args[4], y: command.args[5] };
            case "H": return { x: command.args[0], y: getLocation(index - 1, path).y };
            case "L": return { x: command.args[0], y: command.args[1] };
            case "M": return { x: command.args[0], y: command.args[1] };
            case "S": return { x: command.args[2], y: command.args[3] };
            case "T": return { x: command.args[0], y: command.args[1] };
            case "V": return { x: getLocation(index - 1, path).x, y: command.args[0] };
            case "Z": {
                while ((0 <= --index) && !path[index].startsWith("M"))
                    ;
                return (0 <= index) ? getLocation(index, path) : { x: 0, y: 0 };
            }
        }
    }
    exports.getLocation = getLocation;
});
define("fun/stringify", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function round2(n) {
        return Math.round(n * 1000) / 1000;
    }
    function stringify(command) {
        return `${command.command} ${command.args.map(v => round2(v)).join(" ")}`;
    }
    exports.stringify = stringify;
});
define("fun/parsePath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function parsePath(path) {
        let tokens = path.split("");
        let commands = [];
        let commandArgs = [];
        while (tokens.length) {
            let ch = tokens.pop();
            if (!ch)
                throw "expected a token";
            if ((ch >= "A" && ch <= "Z")) {
                commandArgs.reverse();
                let args = commandArgs
                    .join("")
                    .split(" ")
                    .map(v => v.trim())
                    .filter(v => v !== "")
                    .map(v => parseFloat(v));
                commands.push({ command: ch, args });
                commandArgs = [];
            }
            else {
                commandArgs.push(ch);
            }
        }
        return commands.reverse();
    }
    exports.parsePath = parsePath;
    let test = parsePath(`M13.235 3.008l-.846-1.078c-.362-.603-1.013-.922-1.716-.922h-3.34c-.703 0-1.355.319-1.716.922l-.847 1.078h-2.774c-1.105 0-2 .895-2 2v9.996c0 1.104.895 2 2 2h13.994c1.104 0 2-.896 2-2v-9.996c0-1.105-.896-2-2-2h-2.755zm-9.251 6.998c0-2.761 2.242-4.998 5.009-4.998 2.766 0 5.009 2.237 5.009 4.998 0 2.759-2.243 4.998-5.009 4.998-2.767 0-5.009-2.239-5.009-4.998zm5.009-2.998c-1.658 0-3.006 1.344-3.006 2.999 0 1.653 1.347 2.999 3.006 2.999 1.657 0 3.006-1.345 3.006-2.999 0-1.654-1.348-2.999-3.006-2.999`);
    if (test.length !== 50) {
        console.warn(test);
        //throw "fail";
    }
});
define("fun/getPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getPath(path) {
        let d = getComputedStyle(path).getPropertyValue("d");
        let firstQuote = d.indexOf("\"");
        if (firstQuote < 0)
            throw "no quote found";
        let lastQuote = d.lastIndexOf("\"");
        if (lastQuote <= firstQuote)
            throw "no end quote found";
        return d.substring(firstQuote + 1, lastQuote);
    }
    exports.getPath = getPath;
});
define("fun/getPathCommands", ["require", "exports", "fun/stringify", "fun/parsePath", "fun/getPath"], function (require, exports, stringify_1, parsePath_1, getPath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getPathCommands(path) {
        return parsePath_1.parsePath(getPath_1.getPath(path)).map(stringify_1.stringify);
    }
    exports.getPathCommands = getPathCommands;
});
define("fun/setPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function setPath(pathElement, d) {
        pathElement.setAttribute("d", d);
    }
    exports.setPath = setPath;
});
define("fun/keys", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function keys(o) {
        return Object.keys(o);
    }
    exports.keys = keys;
});
define("fun/UndoRedo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UndoRedo {
        constructor() {
            this.stack = [];
            this.index = -1;
        }
        run(op) {
            const result = op();
            if (!result)
                return;
            const { undo, redo } = result;
            if (!undo || !redo)
                return;
            this.stack[++this.index] = { undo, redo };
        }
        canRedo() {
            return 1 <= this.stack.length && this.index < this.stack.length - 1;
        }
        canUndo() {
            return 0 <= this.index;
        }
        undo() {
            this.stack[this.index--].undo();
        }
        redo() {
            this.stack[++this.index].redo();
        }
    }
    exports.UndoRedo = UndoRedo;
});
define("fun/RemoveEventHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/Channel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Channel {
        constructor() {
            this.topics = {};
        }
        dispose() {
            this.topics = {};
        }
        on(topic, cb) {
            const listener = (this.topics[topic] = this.topics[topic] || []);
            listener.push(cb);
            return {
                remove: () => {
                    const index = listener.indexOf(cb);
                    if (index < 0)
                        return;
                    listener.splice(index, 1);
                }
            };
        }
        publish(topic, ...args) {
            if (!this.topics[topic])
                return false;
            this.topics[topic].forEach(listener => listener(...args));
        }
    }
    exports.Channel = Channel;
});
define("fun/SvgEditor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/KeyboardShortcuts", ["require", "exports", "fun/keys", "fun/UndoRedo", "fun/Channel"], function (require, exports, keys_1, UndoRedo_1, Channel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // do not use Alt
    const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Control Delete End Enter Escape Home Minus PageUp PageDown Plus Shift Slash Space".split(" ");
    const isAtomic = (v) => 0 <= atomicTokens.indexOf(v);
    class ShortcutManager {
        constructor() {
            this.channel = new Channel_1.Channel();
            this.undos = new UndoRedo_1.UndoRedo();
            this.shortcuts = { key: "", ops: [], subkeys: {}, parent: null };
            this.currentState = this.shortcuts;
            this.firstLetter = (word) => word[0];
            this.tokenize = (words) => words.split(/[ ]/).map(v => (isAtomic(v) ? v : this.firstLetter(v).toUpperCase()));
            this.forceNode = (node, shortcuts) => {
                if (!shortcuts.length)
                    return node;
                const key = shortcuts.shift();
                if (typeof key === "undefined")
                    throw "key cannot be empty";
                node.subkeys[key] = node.subkeys[key] || {
                    key,
                    parent: node,
                    subkeys: {},
                    title: key,
                    ops: []
                };
                return this.forceNode(node.subkeys[key], shortcuts);
            };
        }
        publish(topic, ...args) {
            return this.channel.publish(topic, args);
        }
        subscribe(topic, doit) {
            return this.channel.on(topic, doit);
        }
        help(terse = true, root = this.currentState) {
            const visitEach = (node, cb) => {
                cb(node);
                keys_1.keys(node.subkeys).forEach(key => visitEach(node.subkeys[key], cb));
            };
            const visitUp = (node, cb) => {
                cb(node);
                node.parent && visitUp(node.parent, cb);
            };
            const allNodes = (node) => {
                const nodes = [];
                visitEach(node, node => nodes.push(node));
                return nodes;
            };
            const fullPath = (node) => {
                const nodes = [];
                visitUp(node, node => nodes.push(node));
                return nodes;
            };
            if (terse) {
                return Object.keys(root.subkeys).join("|");
            }
            const markup = allNodes(root.parent || root)
                //.filter(node => 1 === node.ops.length)
                .filter(node => node.parent === root || node.parent === root.parent)
                .filter(node => { var _a; return !((_a = node.options) === null || _a === void 0 ? void 0 : _a.onlyIf) || node.options.onlyIf(); })
                .map(node => {
                const path = fullPath(node).reverse();
                // const deleteCount = path.indexOf(root);
                // path.splice(0, deleteCount);
                return `${path.map(node => node.key.replace("Slash", "/")).join("")} - ${node.title}`;
            });
            return markup.join("\n");
        }
        watchKeyboard(root, callbacks) {
            this.log = callbacks.log;
            let lastStatefulState;
            // move into keyboard shortcuts
            root.addEventListener("keydown", event => {
                var _a;
                if (event.altKey)
                    return; // reserved for the browser
                //if (event.ctrlKey) return; // app constrained not to use ctrl
                const map = {
                    " ": "Space",
                    "-": "Minus",
                    "+": "Plus",
                    "/": "Slash",
                };
                const key = map[event.key] || event.key;
                let nextState = this.findNode(this.currentState, key);
                if (!nextState) {
                    nextState = this.currentState.parent;
                    while (nextState) {
                        const tempState = this.findNode(nextState, key);
                        if (tempState) {
                            nextState = tempState;
                            break;
                        }
                        nextState = nextState.parent;
                    }
                }
                if (!nextState) {
                    // suggest a key
                    !event.repeat && this.log(`${this.help(true, this.currentState)}`);
                    return;
                }
                event.preventDefault();
                if (!nextState.ops.length) {
                    this.currentState = nextState;
                    !event.repeat && this.log(`${this.help(true, this.currentState)}`);
                    this.publish("change", this.currentState);
                    return;
                }
                if (!event.repeat && lastStatefulState !== nextState) {
                    this.log(`${nextState.title}`);
                    keys_1.keys(nextState.subkeys).length && this.log(`${this.help(true, nextState)}`);
                }
                this.execute(nextState);
                if (!((_a = nextState.options) === null || _a === void 0 ? void 0 : _a.stateless)) {
                    lastStatefulState = nextState;
                }
                this.currentState = lastStatefulState || this.currentState;
                this.publish("change", this.currentState);
                return;
            });
        }
        execute(nextState) {
            nextState.ops.forEach(op => {
                try {
                    this.undos.run(op);
                }
                catch (ex) {
                    this.log(ex);
                }
            });
        }
        findNode(node, shortcut) {
            if (!shortcut)
                return node;
            return node.subkeys[isAtomic(shortcut) ? shortcut : shortcut.toUpperCase()];
        }
        registerShortcut(title, callback) {
            const tokens = this.tokenize(title);
            const node = this.forceNode(this.shortcuts, tokens);
            if (node.ops.length > 0)
                throw "cannot overload a keyboard shortcut";
            node.ops.push(callback);
            node.title = title;
            return node;
        }
        getShortcut(title) {
            return this.forceNode(this.shortcuts, this.tokenize(title));
        }
        // to be replaced with calbacks.log
        log(message) {
            console.log(message);
        }
        redo() {
            if (!this.undos.canRedo()) {
                this.log("cannot redo anything");
                return;
            }
            this.undos.redo();
        }
        undo() {
            if (!this.undos.canUndo()) {
                this.log("cannot undo anything");
                return;
            }
            this.undos.undo();
        }
    }
    exports.ShortcutManager = ShortcutManager;
});
define("fun/getScale", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getScale(svg) {
        let { width: viewBoxWidth } = svg.viewBox.baseVal;
        let { width } = svg.getBoundingClientRect();
        return width / viewBoxWidth;
    }
    exports.getScale = getScale;
});
define("fun/SvgEditorControl", ["require", "exports", "fun/drawCursor", "fun/drawX", "fun/focus", "fun/getLocation", "fun/getPathCommands", "fun/parse", "fun/parsePath", "fun/setPath", "fun/stringify", "fun/getScale", "fun/Channel"], function (require, exports, drawCursor_1, drawX_1, focus_1, getLocation_1, getPathCommands_1, parse_2, parsePath_2, setPath_1, stringify_2, getScale_1, Channel_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SvgEditorControl {
        constructor(workview, input, managers) {
            this.workview = workview;
            this.input = input;
            this.channel = new Channel_2.Channel();
            this.topics = {};
            this.currentIndex = -1;
            this.shortcutManager = managers.shortcutManager;
            this.sourcePath = this.workview.querySelector("path");
            if (!this.sourcePath)
                throw "workview must have a path";
            this.input.parentElement && this.shortcutManager.watchKeyboard(this.input.parentElement, {
                log: (message) => {
                    this.publish("log", message);
                }
            });
        }
        redo() {
            this.shortcutManager.redo();
        }
        undo() {
            this.shortcutManager.undo();
        }
        use(rule) {
            rule.initialize(this);
            return this;
        }
        getCursorLocation() {
            return getLocation_1.getLocation(this.currentIndex, this.getSourcePath());
        }
        getViewbox() {
            let { x, y, width, height } = this.workview.viewBox.baseVal;
            return { x, y, width, height };
        }
        getActiveIndex() {
            return this.currentIndex;
        }
        shortcut(topic, callback) {
            const noop = () => { };
            const node = this.shortcutManager.registerShortcut(topic, callback || noop);
            return {
                unsubscribe: () => { },
                options: (options) => {
                    node.title = options.because;
                    node.options = options;
                },
            };
        }
        subscribe(topic, callback) {
            const h = this.channel.on(topic, callback);
            return { unsubscribe: () => h.remove() };
        }
        hideCursor() {
            this.publish("hidecursor");
        }
        hideCommandEditor() {
            //
        }
        execute(command, ...args) {
            const shortcut = this.shortcutManager.getShortcut(command);
            shortcut && this.shortcutManager.execute(shortcut);
        }
        publish(topic, ...args) {
            this.channel.publish(topic, args);
            return true;
        }
        editActiveCommand() {
            let index = this.currentIndex;
            let commandEditor = this.input.children[index];
            let input = document.createElement("input");
            input.value = commandEditor.innerText;
            let originalText = commandEditor.innerText;
            commandEditor.innerText = "";
            commandEditor.appendChild(input);
            input.select();
            input.focus();
            input.onblur = () => {
                commandEditor.innerText = originalText;
                input.remove();
                commandEditor.focus();
            };
            input.onkeydown = event => {
                event.cancelBubble = true;
                switch (event.code) {
                    case "Escape":
                        commandEditor.focus(); // causes a blur
                        commandEditor.innerText = originalText;
                        break;
                    case "NumpadEnter":
                    case "Enter":
                        let newText = input.value;
                        commandEditor.focus(); // causes a blur
                        commandEditor.innerText = newText;
                        this.replaceActiveCommand(newText);
                        event.cancelBubble = true;
                        event.preventDefault();
                        break;
                }
                this.publish("log", event.code);
            };
        }
        insertPath(path) {
            const pathCommands = parsePath_2.parsePath(path);
            const pathSegment = pathCommands.map(stringify_2.stringify);
            const index = this.currentIndex;
            const sourcePath = this.getSourcePath();
            sourcePath.splice(index, 0, ...pathSegment);
            this.show(sourcePath.join("\n"));
        }
        deleteCommand(index) {
            const sourcePath = this.getSourcePath();
            sourcePath.splice(index, 1);
            this.show(sourcePath.join("\n"));
        }
        insertCommand(command) {
            let index = this.currentIndex;
            let path = this.getSourcePath();
            let currentLocation = getLocation_1.getLocation(index, path);
            if (!command.args.length) {
                switch (command.command) {
                    case "A":
                        command.args = [1, 1, 0, 0, 0, currentLocation.x, currentLocation.y];
                        break;
                    case "C":
                        command.args = [
                            currentLocation.x,
                            currentLocation.y,
                            currentLocation.x,
                            currentLocation.y,
                            currentLocation.x,
                            currentLocation.y,
                        ];
                        break;
                    case "H":
                        command.args = [currentLocation.x];
                        break;
                    case "S":
                        command.args = [currentLocation.x, currentLocation.y, currentLocation.x, currentLocation.y];
                        break;
                    case "V":
                        command.args = [currentLocation.y];
                        break;
                    case "L":
                    case "M":
                    case "T":
                        command.args = [currentLocation.x, currentLocation.y];
                        break;
                }
            }
            path.splice(index + 1, 0, stringify_2.stringify(command));
            this.show(path.join("\n"));
        }
        deleteActiveCommand() {
            let index = this.currentIndex;
            let path = this.getSourcePath();
            path.splice(index, 1);
            if (path.length <= index)
                this.currentIndex = path.length - 1;
            this.show(path.join("\n"));
        }
        replaceActiveCommand(commandText) {
            let index = this.currentIndex;
            let command = parse_2.parse(commandText);
            let path = this.getSourcePath();
            path[index] = stringify_2.stringify(command);
            this.show(path.join("\n"));
        }
        goto(index) {
            let path = this.getSourcePath();
            if (!path)
                return;
            if (path.length <= index || index < 0)
                return;
            this.currentIndex = index;
            const scale = getScale_1.getScale(this.workview);
            this.publish("showcursor", drawCursor_1.drawCursor(getLocation_1.getLocation(index, path), 25 / scale));
            focus_1.focus(this.input.children[index]);
        }
        setSourcePath(path) {
            setPath_1.setPath(this.sourcePath, path);
            this.publish("source-path-changed");
        }
        getSourcePath() {
            return getPathCommands_1.getPathCommands(this.sourcePath);
        }
        show(sourcePath) {
            sourcePath && this.setSourcePath(sourcePath);
            this.showMarkers();
            this.renderEditor();
            this.goto(this.currentIndex);
        }
        renderEditor() {
            let cells = this.getSourcePath().map(v => `<div class="cell">${v}</div>`);
            let input = this.input;
            input.innerHTML = cells.join("\n");
            Array.from(input.querySelectorAll(".cell")).forEach(cell => {
                cell.tabIndex = 0;
                cell.addEventListener("focus", () => {
                    let i = Array.from(input.querySelectorAll(".cell")).indexOf(cell);
                    this.goto(i);
                });
            });
        }
        hideMarkers() {
            this.publish("hidemarkers");
        }
        showMarkers() {
            let d = getComputedStyle(this.sourcePath).getPropertyValue("d");
            let commands = parsePath_2.parsePath(d);
            let overlayPath = this.createOverlayPoint(commands);
            overlayPath.unshift("M 0 0");
            overlayPath.push("Z");
            this.publish("showmarkers", overlayPath.join(" "));
        }
        createOverlayPoint(commands) {
            let path = [];
            let priorLocation = { x: 0, y: 0 };
            commands.forEach(command => {
                switch (command.command) {
                    case "A": {
                        let [rx, ry, a, b, cw, x, y] = command.args;
                        priorLocation = { x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "C": {
                        let [ax, ay, bx, by, x, y] = command.args;
                        path.push({ x: ax, y: ay });
                        path.push({ x: bx, y: by });
                        priorLocation = { x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "H": {
                        let [x] = command.args;
                        priorLocation = { x, y: priorLocation.y };
                        path.push(priorLocation);
                        break;
                    }
                    case "L":
                    case "M":
                    case "T": {
                        let [x, y] = command.args;
                        priorLocation = { x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "S": {
                        let [bx, by, x, y] = command.args;
                        path.push({ x: bx, y: by });
                        priorLocation = { x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "V": {
                        let [y] = command.args;
                        priorLocation = { x: priorLocation.x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "Z": {
                        break;
                    }
                    default: {
                        throw `unknown command: ${command}`;
                    }
                }
            });
            const scale = getScale_1.getScale(this.workview);
            return path.map(p => drawX_1.drawX(p, { scale: 5 / scale }));
        }
    }
    exports.SvgEditorControl = SvgEditorControl;
});
define("fun/CoreRules", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getToolbar() {
        let toolbar = document.querySelector(".toolbar");
        if (!toolbar)
            throw "no toolbar defined";
        return toolbar;
    }
    function hideToolbar() {
        getToolbar().classList.add("hidden");
    }
    function hideHelp() {
        var _a;
        let help = document.querySelector(".F1");
        (_a = help) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    }
    class CoreRules {
        constructor(shortcutManager) {
            this.shortcutManager = shortcutManager;
        }
        subscribe(topic, cb) {
        }
        initialize(editor) {
            let shorcutChangeHandler;
            editor
                .shortcut("Escape Escape", () => {
                editor.hideCursor();
                editor.hideCommandEditor();
                editor.hideMarkers();
                editor.goto(0);
                hideToolbar();
                hideHelp();
            })
                .options({ stateless: true, because: "get the editor closer to the initial state" });
            // "?"
            editor.shortcut("?", () => {
                const help = document.querySelector(".F1");
                if (!help)
                    return;
                help.classList.toggle("hidden");
                if (help.classList.contains("hidden")) {
                    shorcutChangeHandler.remove();
                    return;
                }
                const doit = () => {
                    if (!help.classList.contains("hidden")) {
                        const more = this.shortcutManager.help(false).split("\n").map(row => {
                            const [command, ...description] = row.split(" ");
                            return `<div>${command}</div><div>${description.join(" ")}</div>`;
                        });
                        help.innerHTML = `${more.join("")}`;
                    }
                    ;
                };
                doit();
                shorcutChangeHandler = this.shortcutManager.subscribe("change", doit);
            }).options({ because: "show help", stateless: true });
            editor.shortcut(">Redo", () => {
                editor.redo();
            }).options({ stateless: true, because: "redo the prior action" });
            editor.shortcut("<Undo", () => {
                editor.undo();
            }).options({ stateless: true, because: "undo prior action" });
            editor.shortcut("Space").options({
                because: "Prior "
            });
            editor.shortcut("Slash").options({
                because: "Open a Tool"
            });
            editor.shortcut("Slash Toggle").options({
                because: "Toggle"
            });
            editor.shortcut("Slash Toggle Toolbar", () => {
                getToolbar().classList.toggle("hidden");
            });
        }
    }
    exports.CoreRules = CoreRules;
});
define("fun/asDom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function asDom(html) {
        let div = document.createElement("div");
        div.innerHTML = html.trim();
        return div.firstElementChild;
    }
    exports.asDom = asDom;
});
define("fun/Digitizer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function percent(n) {
        return `${Math.round(n * 100 * 10) / 10}%`;
    }
    function getLayers() {
        let layers = document.querySelector(".layers");
        // scaling about a point assume top-left
        layers.style.transformOrigin = "top left";
        return layers;
    }
    function getPixels() {
        if (!isDigitizing)
            return null;
        return document.querySelector(".svgeditor .layers .pixels-to-digitize");
    }
    function isDigitizing() {
        return !!document.querySelector(".svgeditor.digitizer");
    }
    function getPositionOfPixels() {
        const target = getPixels();
        if (!target)
            throw "pixels not found";
        let { top, left } = getComputedStyle(target);
        return { top: parseFloat(top), left: parseFloat(left) };
    }
    function setPositionOfPixels(position) {
        const target = getPixels();
        if (!target)
            throw "pixels not found";
        target.style.left = `${position.left}px`;
        target.style.top = `${position.top}px`;
    }
    function zoomInPixels(scale) {
        const target = getPixels();
        if (!target)
            throw "pixels not found";
        let transform = getComputedStyle(target).transform;
        if (transform === "none")
            transform = "";
        transform = ` scale(${scale}) ${transform}`;
        target.style.transform = transform;
    }
    function createMove(dx, dy) {
        return () => {
            if (!isDigitizing())
                return;
            const { top, left } = getPositionOfPixels();
            setPositionOfPixels({ left: left + dx, top: top + dy });
        };
    }
    function createTranslator(target, dx, dy) {
        return () => {
            let currentTransform = getComputedStyle(target).transform;
            if (currentTransform === "none")
                currentTransform = "";
            target.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
        };
    }
    function createScaler(target, scale) {
        return () => {
            let currentTransform = getComputedStyle(target).transform;
            if (currentTransform === "none")
                currentTransform = "";
            const restoreDx = 100 * (0.5 * scale);
            target.style.transform = `${currentTransform} translate(${restoreDx}%,${restoreDx}%) scale(${scale}) translate(-50%,-50%)`;
        };
    }
    function createScaleAboutCursor(editor, scale) {
        return () => {
            let cursorLocationInViewport = editor.getCursorLocation();
            let viewBox = editor.getViewbox();
            let layers = getLayers();
            let currentTransform = getComputedStyle(layers).transform;
            if (currentTransform === "none")
                currentTransform = "";
            // translate cursor to origin, scale, translate origin to cursor
            // viewbox width = layers width but where is the top-left corner of the layers?
            let layerLocationInPixels = layers.getBoundingClientRect();
            let { width: pixelWidth, height: pixelHeight } = layerLocationInPixels;
            let { height: viewPortHeight, width: viewPortWidth } = viewBox;
            let dx = layerLocationInPixels.x + ((cursorLocationInViewport.x - viewBox.x) * pixelWidth) / viewPortWidth;
            let dy = layerLocationInPixels.y + ((cursorLocationInViewport.y - viewBox.y) * pixelHeight) / viewPortHeight;
            dx = Math.round(dx);
            dy = Math.round(dy);
            layers.style.transform = `${currentTransform} translate(${dx}px,${dy}px) scale(${scale}) translate(${-dx}px,${-dy}px)`;
        };
    }
    class Digitizer {
        initialize(editor) {
            const layers = getLayers();
            const bitmap = getPixels();
            const bitmapOpen = () => {
                var _a;
                return !!((_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.contains("digitizer"));
            };
            if (bitmap) {
                editor.shortcut("Slash Bitmap X", () => { var _a; return (_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.remove("digitizer"); }).options({
                    onlyIf: bitmapOpen,
                    because: "Dismiss Bitmap", stateless: true
                });
                editor.shortcut("Slash Bitmap", () => { var _a; return (_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.add("digitizer"); }).options({
                    because: "Bitmap Editor"
                });
                let scale = 1.1;
                editor.shortcut("Slash Bitmap Plus", createScaler(bitmap, scale)).options({
                    onlyIf: bitmapOpen,
                    because: "Increase Bitmap Size", stateless: false
                });
                editor.shortcut("Slash Bitmap Minus", createScaler(bitmap, 1.0 / scale)).options({
                    onlyIf: bitmapOpen,
                    because: "Reduce Bitmap Size", stateless: false,
                });
                scale = 1 / 1.01;
                editor.shortcut("Slash Bitmap Plus 1", createScaler(bitmap, scale)).options({
                    onlyIf: bitmapOpen,
                    because: "Reverse 1/10", stateless: false
                });
                editor.shortcut("Slash Bitmap Minus 1", createScaler(bitmap, 1.0 / scale)).options({
                    onlyIf: bitmapOpen,
                    because: "Reverse 1/10", stateless: false
                });
                scale = 10;
                editor.shortcut("Slash Bitmap A", createTranslator(bitmap, -scale, 0)).options({
                    onlyIf: bitmapOpen,
                    because: "Move Bitmap Left", stateless: false
                });
                editor.shortcut("Slash Bitmap D", createTranslator(bitmap, scale, 0)).options({
                    onlyIf: bitmapOpen,
                    because: "Move Bitmap Right", stateless: false
                });
                editor.shortcut("Slash Bitmap W", createTranslator(bitmap, 0, -scale)).options({
                    onlyIf: bitmapOpen,
                    because: "Move Bitmap Up", stateless: false
                });
                editor.shortcut("Slash Bitmap S", createTranslator(bitmap, 0, scale)).options({
                    onlyIf: bitmapOpen,
                    because: "Move Bitmap Down", stateless: false
                });
                scale = -1;
                editor.shortcut("Slash Bitmap A 1", createTranslator(bitmap, -scale, 0)).options({
                    onlyIf: bitmapOpen,
                    because: `Move Bitmap X ${-scale}`, stateless: false
                });
                editor.shortcut("Slash Bitmap D 1", createTranslator(bitmap, scale, 0)).options({
                    onlyIf: bitmapOpen,
                    because: `Move Bitmap X ${scale}`, stateless: false
                });
                editor.shortcut("Slash Bitmap W 1", createTranslator(bitmap, 0, -scale)).options({
                    onlyIf: bitmapOpen,
                    because: `Move Bitmap Y ${-scale}`, stateless: false
                });
                editor.shortcut("Slash Bitmap S 1", createTranslator(bitmap, 0, scale)).options({
                    onlyIf: bitmapOpen,
                    because: `Move Bitmap Y ${scale}`, stateless: false
                });
            }
            // iop are keyboard sequences
            const commandInserter = (command) => {
                return () => {
                    const currentIndex = editor.getActiveIndex();
                    const doit = () => {
                        editor.insertCommand({ command, args: [] });
                        editor.goto(currentIndex + 1);
                    };
                    doit();
                    const undo = () => {
                        editor.deleteCommand(currentIndex + 1);
                        editor.goto(currentIndex);
                    };
                    const redo = () => {
                        editor.goto(currentIndex);
                        doit();
                    };
                    return { undo, redo };
                };
            };
            editor.shortcut("Slash Path", () => editor.publish("showgrid")).options({
                because: "Path Editor"
            });
            editor.shortcut("Slash Path ECurve", commandInserter("C")).options({
                because: "Insert (C)urve", stateless: false
            });
            editor.shortcut("Slash Path HorizontalLine", commandInserter("H")).options({
                because: "Insert (H)orizontal Line", stateless: false
            });
            editor.shortcut("Slash Path Line", commandInserter("L")).options({
                because: "Insert (L)ine", stateless: false
            });
            editor.shortcut("Slash Path Move", commandInserter("M")).options({
                because: "Insert (M)ove", stateless: false
            });
            ;
            editor.shortcut("Slash Path RArc", commandInserter("A")).options({
                because: "Insert (A)rc", stateless: false
            });
            editor.shortcut("Slash Path UCurveSmooth", commandInserter("S")).options({
                because: "Insert (S)mooth Curve", stateless: false
            });
            editor.shortcut("Slash Path VerticalLine", commandInserter("V")).options({
                because: "Insert (V)ertical Line", stateless: false
            });
            editor.shortcut("Slash Path ZReturn", commandInserter("Z")).options({
                because: "Insert Return (Z)", stateless: false
            });
            /**
             * Moves the digitizing area
             * control speeds things up, alt slows things down
             * alt=1, ctrl+alt=10 , ctrl=100
             */
            {
                editor.shortcut("Slash View").options({
                    because: "Edit View"
                });
                editor.shortcut("Slash View Viewbox", () => {
                    const svgs = document.querySelectorAll(".layers svg[viewbox]");
                    for (let e of svgs) {
                        const svg = e;
                        let { x, y, width, height } = svg.viewBox.baseVal;
                        const viewbox = prompt("Enter viewbox: ", `${x} ${y} ${width} ${height}`);
                        if (!viewbox)
                            return;
                        [x, y, width, height] = viewbox.split(" ").map(v => parseInt(v));
                        console.log(viewbox, x, y, width, height);
                        if (width && height) {
                            svg.viewBox.baseVal.x = x;
                            svg.viewBox.baseVal.y = y;
                            svg.viewBox.baseVal.width = width;
                            svg.viewBox.baseVal.height = height;
                            localStorage.setItem("viewbox", `${x} ${y} ${width} ${height}`);
                        }
                    }
                }).options({
                    because: "Set the Viewbox"
                });
                let scale = 10;
                editor.shortcut("Slash Path ArrowDown", createTranslator(layers, 0, scale)).options({
                    because: `Move View Down ${scale}`
                });
                editor.shortcut("Slash Path ArrowUp", createTranslator(layers, 0, -scale)).options({
                    because: `Move View Up ${scale}`
                });
                editor.shortcut("Slash Path ArrowLeft", createTranslator(layers, -scale, 0)).options({
                    because: `Move View Left ${scale}`
                });
                editor.shortcut("Slash Path ArrowRight", createTranslator(layers, scale, 0)).options({
                    because: `Move View Right ${scale}`
                });
                scale = -1;
                editor.shortcut("Slash Path ArrowDown 1", createTranslator(layers, 0, scale)).options({
                    because: `Move View Down ${scale}`
                });
                editor.shortcut("Slash Path ArrowUp 1", createTranslator(layers, 0, -scale)).options({
                    because: `Move View Up ${scale}`
                });
                editor.shortcut("Slash Path ArrowLeft 1", createTranslator(layers, -scale, 0)).options({
                    because: `Move View Left ${scale}`
                });
                editor.shortcut("Slash Path ArrowRight 1", createTranslator(layers, scale, 0)).options({
                    because: `Move View Right ${scale}`
                });
                // zoom about current cursor location
                scale = 1.1;
                editor.shortcut("Slash View Plus", createScaleAboutCursor(editor, scale)).options({
                    because: `Zoom In By ${percent(scale)}`
                });
                editor.shortcut("Slash Path Plus", createScaleAboutCursor(editor, scale)).options({
                    because: `Zoom In By ${percent(scale)}`
                });
                editor.shortcut("Slash View Minus", createScaleAboutCursor(editor, 1 / scale)).options({
                    because: `Zoom Out By ${percent(scale)}`
                });
                editor.shortcut("Slash Path Minus", createScaleAboutCursor(editor, 1 / scale)).options({
                    because: `Zoom Out By ${percent((scale))}`
                });
                scale = 1 / 1.01;
                editor.shortcut("Slash View Plus 1", createScaleAboutCursor(editor, scale)).options({
                    because: `Zoom In By ${percent(scale)}`
                });
                editor.shortcut("Slash View Minus 1", createScaleAboutCursor(editor, 1 / scale)).options({
                    because: `Zoom Out By ${percent(scale)}`
                });
            }
            editor.shortcut("Slash Path Center", () => {
                const cursorLocation = editor.getCursorLocation();
                const viewBox = editor.getViewbox();
                const layers = getLayers();
                const layerLocationInPixels = layers.getBoundingClientRect();
                const x = layerLocationInPixels.x + (layerLocationInPixels.width * (cursorLocation.x - viewBox.x)) / viewBox.width;
                const y = layerLocationInPixels.y + (layerLocationInPixels.width * (cursorLocation.y - viewBox.y)) / viewBox.height;
                const cx = getPosition(layers).x + getPosition(layers).width / 2;
                const cy = getPosition(layers).y + getPosition(layers).height / 2;
                const dx = cx - x;
                const dy = cy - y;
                let currentTransform = getComputedStyle(layers).transform;
                if (currentTransform === "none")
                    currentTransform = "";
                console.log(cursorLocation.x, viewBox.x, x, cx, dx, currentTransform);
                layers.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
            });
        }
    }
    exports.Digitizer = Digitizer;
    function getPosition(node) {
        let { left, top, width, height } = getComputedStyle(node);
        return { x: parseFloat(left), y: parseFloat(top), width: parseFloat(width), height: parseFloat(height) };
    }
});
define("fun/html", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function html(html) {
        const a = document.createElement("div");
        a.innerHTML = html;
        return (a.firstChild === a.lastChild ? a.firstChild : a);
    }
    exports.html = html;
    function createUniqueIdForCssBody(css) {
        if (!css || !css.length)
            throw "no css provided";
        const endIndex = css.indexOf("{");
        if (0 >= endIndex)
            throw "no css selector provided";
        // remove invalid characters
        css = "cssId_" + css.substring(0, endIndex - 1).replace(/[^(A-Z)(a-z)(0-9).:_-]/g, "");
        return css;
    }
    exports.createUniqueIdForCssBody = createUniqueIdForCssBody;
    function injectHtml(markup, container = document.body) {
        var _a;
        const node = html(markup);
        (_a = container) === null || _a === void 0 ? void 0 : _a.appendChild(node);
        return node;
    }
    exports.injectHtml = injectHtml;
    function injectCss(css, id) {
        if (!id) {
            id = createUniqueIdForCssBody(css);
        }
        let style = document.head.querySelector(`style[id="${id}"]`);
        if (style) {
            throw `style already defined for "${id}": \n${style.outerHTML}`;
        }
        style = injectHtml(`<style id=${id} type='text/css'>${css}</style>`, document.head);
        return () => style.remove();
    }
    exports.injectCss = injectCss;
    function addToClassList(node, className) {
        if (!className)
            return;
        if (typeof className !== "string")
            return; // will handle objects later?
        className
            .split(" ")
            .map(v => v.trim())
            .filter(v => !!v)
            .forEach(v => node.classList.add(v));
    }
    exports.addToClassList = addToClassList;
});
define("fun/Toaster", ["require", "exports", "fun/html"], function (require, exports, html_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const css = `
    .toaster {
        min-width: 16em;
        max-height: 64em;
        overflow: hidden;
        background-color: black;
        opacity: 0.8;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding-left: 0.5em;
        padding-bottom: 1em;
        padding-top: 1em;
    }

    .toaster .message {
        display: block;
        color: white;
        padding-bottom: 1em;
        overflow: visible;
    }
`;
    /**
     * Determines position of the toaster control (myToaster)
     */
    class Toaster {
        constructor(options) {
            html_1.injectCss(css);
            const { dismissOnClick } = options || {};
            this.domNode = document.createElement("div");
            this.domNode.className = "toaster";
            if (dismissOnClick) {
                this.domNode.onclick = () => this.clear();
            }
        }
        setContent(message, type, duration) {
            const messageNode = document.createElement("span");
            messageNode.className = "message";
            html_1.addToClassList(messageNode, type || "message");
            messageNode.innerText = message;
            this.domNode.appendChild(messageNode);
            setTimeout(() => this.remove(messageNode), duration || 5000);
            this.setVisibility();
            return { remove: () => this.remove(messageNode) };
        }
        remove(node) {
            if (node && node.parentElement === this.domNode) {
                this.domNode.removeChild(node);
                this.setVisibility();
            }
        }
        clear() {
            this.domNode.innerHTML = "";
            this.setVisibility();
        }
        setVisibility() {
            this.domNode.style.display = 0 === this.domNode.children.length ? "none" : "inherit";
        }
    }
    exports.Toaster = Toaster;
});
define("fun/NotificationEditorRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NotificationEditorRule {
        constructor(toaster) {
            this.toaster = toaster;
        }
        initialize(editor) {
            editor.subscribe("log", message => {
                if (!message)
                    return;
                this.toaster.setContent(message);
            });
        }
    }
    exports.NotificationEditorRule = NotificationEditorRule;
});
define("fun/ImageLoaderRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImageLoaderRule {
        initialize(editor) {
            const img = document.querySelector(".pixels-to-digitize");
            if (!img)
                return;
            editor.shortcut("Slash Bitmap Open", () => {
                const url = prompt("what is the url?", "https://media.istockphoto.com/photos/portrait-of-brown-puppy-with-bokeh-background-picture-id636475496");
                if (!url)
                    return;
                const priorUrl = img.src;
                img.src = url;
                return {
                    undo: () => {
                        img.src = priorUrl;
                    }
                };
            });
        }
    }
    exports.ImageLoaderRule = ImageLoaderRule;
});
define("fun/StateManagementRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StateManagementRule {
        initialize(editor) {
            let viewbox = localStorage.getItem("viewbox");
            if (!viewbox)
                return;
            const svgs = document.querySelectorAll(".layers svg[viewbox]");
            for (let e of svgs) {
                const svg = e;
                svg.setAttribute("viewBox", viewbox);
            }
        }
    }
    exports.StateManagementRule = StateManagementRule;
});
define("fun/createSvg", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createSvg() {
        return document.createElementNS("http://www.w3.org/2000/svg", "svg");
    }
    exports.createSvg = createSvg;
});
define("fun/range", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function range(n) {
        return Array(n).fill(0).map((v, i) => i);
    }
    exports.range = range;
});
define("fun/createPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createPath(styles) {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        if (styles) {
            Object.keys(styles).forEach(key => {
                path.style.setProperty(key, styles[key]);
            });
        }
        return path;
    }
    exports.createPath = createPath;
});
define("fun/createGrid", ["require", "exports", "fun/range", "fun/createPath", "fun/setPath", "fun/getScale"], function (require, exports, range_1, createPath_1, setPath_2, getScale_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function dot(x, y, size) {
        const r = size / 2;
        return `M ${x - r} ${y} A ${r} ${r} 0 0 0 ${x + r} ${y} A ${r} ${r} 0 0 0 ${x - r} ${y} Z`;
    }
    function createGrid(gridOverlay) {
        const scale = getScale_2.getScale(gridOverlay);
        const { x, y, width, height } = gridOverlay.viewBox.baseVal;
        // forces lines to pass through origin
        // x + offset + n*size = 0, offset = n*size-x, n*size > x, n > x/size
        const size = Math.floor(width / 10);
        const offset = size * Math.ceil(x / size) - x;
        const count = 1 + Math.ceil((width - offset) / size);
        const vLines = range_1.range(count).map(v => `M ${x + offset + size * v} ${x} V ${y + height}`).join("\n");
        const hLines = range_1.range(count).map(v => `M ${x} ${y + offset + size * v} H ${x + width}`).join("\n");
        const path = createPath_1.createPath({
            fill: "rgba(128,128,128,0.5)",
            stroke: "rgba(128,128,128,0.5)",
            "stroke-width": (1 / scale) + ""
        });
        const markers = range_1.range(1 + Math.ceil(Math.log2(width))).map(v => Math.pow(2, v));
        //markers.splice(0, markers.length - 4);
        console.log(markers, width);
        const hdots = [0, ...markers].map(v => dot(v, 0, size / 30)).join("\n");
        const vdots = markers.map(v => dot(v, v, size / 30) + dot(0, v, size / 30)).join("\n");
        setPath_2.setPath(path, `${vLines}\n${hLines}\n${hdots}\n${vdots}`);
        gridOverlay.appendChild(path);
        return path;
    }
    exports.createGrid = createGrid;
});
define("fun/GridManagementRule", ["require", "exports", "fun/createSvg", "fun/createGrid", "fun/createPath", "fun/setPath"], function (require, exports, createSvg_1, createGrid_1, createPath_2, setPath_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridManagementRule {
        constructor() {
            const layers = document.querySelector(".layers");
            const svg = layers.querySelector("svg");
            let { x, y, width, height } = svg.viewBox.baseVal;
            this.gridOverlay = createSvg_1.createSvg();
            this.gridOverlay.classList.add("hidden");
            this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
            layers.appendChild(this.gridOverlay);
            // how to get workPath stroke-width to be 0.2 regardless of scale?
            this.workPath = createPath_2.createPath({
                fill: "rgb(0,255,128)",
                stroke: "rgb(0,255,128)",
                "stroke-width": "0.2",
            });
            this.gridOverlay.appendChild(this.workPath);
            this.cursorPath = createPath_2.createPath({
                stroke: "rgb(0, 255, 0)",
                "stroke-width": "0.2",
            });
            this.gridOverlay.appendChild(this.cursorPath);
        }
        getScale(svg) {
            let { width: viewBoxWidth } = svg.viewBox.baseVal;
            let { width } = svg.getBoundingClientRect();
            return width / viewBoxWidth;
        }
        hideGrid() {
            this.gridOverlay.classList.add("hidden");
        }
        showGrid() {
            var _a;
            (_a = this.gridPath) === null || _a === void 0 ? void 0 : _a.remove();
            this.gridPath = createGrid_1.createGrid(this.gridOverlay);
            this.gridOverlay.classList.remove("hidden");
            const scale = this.getScale(this.gridOverlay);
            console.log("scale", scale);
            this.gridPath.style.setProperty("stroke-width", 1 / scale + "");
            this.workPath.style.setProperty("stroke-width", 1.5 / scale + "");
            this.cursorPath.style.setProperty("stroke-width", 2 / scale + "");
        }
        isGridVisible() {
            return !this.gridOverlay.classList.contains("hidden");
        }
        isMarkersVisible() {
            return !!this.workPath.getAttribute("d");
        }
        initialize(editor) {
            editor.shortcut("Slash Toggle GridLines", () => {
                if (this.isGridVisible()) {
                    this.hideGrid();
                }
                else {
                    this.showGrid();
                }
            }).options({
                because: "Toggle Grid Lines"
            });
            editor.shortcut("Slash Toggle Markers", () => {
                if (this.isMarkersVisible()) {
                    editor.hideMarkers();
                }
                else {
                    this.showGrid();
                    editor.showMarkers();
                }
            }).options({
                because: "Toggle Point Markers"
            });
            editor.subscribe("showgrid", () => {
                this.showGrid();
            });
            editor.subscribe("showcursor", (path) => {
                setPath_3.setPath(this.cursorPath, path);
            });
            editor.subscribe("hidemarkers", () => {
                setPath_3.setPath(this.workPath, "");
            });
            editor.subscribe("showmarkers", (path) => {
                setPath_3.setPath(this.workPath, path);
            });
            editor.subscribe("hidecursor", () => setPath_3.setPath(this.cursorPath, ""));
        }
    }
    exports.GridManagementRule = GridManagementRule;
});
define("fun/FileRule", ["require", "exports", "fun/asDom", "fun/focus"], function (require, exports, asDom_1, focus_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FileManager {
        validateFileName(fileName) {
            if (!fileName)
                return false;
            if (fileName.length < 3)
                return false;
            return true;
        }
        getFileNames() {
            var _a;
            return ((_a = localStorage.getItem("files/index")) === null || _a === void 0 ? void 0 : _a.split(";")) || [];
        }
        saveFile(fileName, data) {
            if (!this.validateFileName(fileName))
                throw "invalid file name";
            const fileNames = this.getFileNames();
            if (!fileNames.find(v => v === fileName)) {
                fileNames.push(fileName);
                localStorage.setItem("files/index", fileNames.join(";"));
            }
            localStorage.setItem(`files/${fileName}.dat`, data);
        }
        openFile(fileName) {
            if (!this.validateFileName(fileName))
                throw "invalid file name";
            const data = localStorage.getItem(`files/${fileName}.dat`);
            if (!data)
                throw "file does not exist";
            return data;
        }
    }
    const fileManager = new FileManager();
    /**
     * Create a grid to display the items, user clicks one, grid closes, callback invoked
     * @param items items to pick
     * @param cb callback to invoke once user picks an item
     */
    function picklist(items, cb) {
        if (!items.length) {
            cb(-1);
            return null;
        }
        const grid = asDom_1.asDom(`<div class="filepicker"></div>`);
        const litter = items.map(item => asDom_1.asDom(`<div class="filename">${item}</div>`));
        litter.forEach(item => grid.appendChild(item));
        litter.forEach(item => {
            item.tabIndex = 0;
        });
        grid.addEventListener("keypress", event => {
            if (event.key !== "Enter")
                return;
            if (!event.target)
                return;
            const index = litter.indexOf(event.target);
            if (index < 0)
                return;
            cb(index);
        });
        document.body.appendChild(grid);
        focus_2.focus(grid.firstElementChild);
        return grid;
    }
    class FileRule {
        constructor() {
            this.filePicker = null;
            this.currentFileName = "";
        }
        initialize(editor) {
            editor.shortcut("Slash File").options({
                because: "File System"
            });
            editor.shortcut("Slash File New", () => {
                const priorPath = editor.getSourcePath();
                const undo = () => {
                    editor.show(priorPath.join("\n"));
                };
                const doit = () => {
                    editor.show("M 0 0 Z");
                };
                doit();
                return { undo, redo: doit };
            }).options({ because: "New File" });
            editor.shortcut("Slash File Open", () => {
                if (null !== this.filePicker) {
                    this.filePicker.remove();
                    this.filePicker = null;
                    return;
                }
                const fileNames = fileManager.getFileNames();
                this.filePicker = picklist(fileNames, (index) => {
                    var _a;
                    if (index < 0)
                        return;
                    this.currentFileName = fileNames[index];
                    const pathData = fileManager.openFile(this.currentFileName);
                    editor.show(pathData);
                    (_a = this.filePicker) === null || _a === void 0 ? void 0 : _a.remove();
                    this.filePicker = null;
                });
            }).options({ because: "Open File" });
            editor.shortcut("Slash File Save", () => {
                if (null !== this.filePicker) {
                    this.filePicker.remove();
                    this.filePicker = null;
                    return;
                }
                const fileName = prompt("File Name?", this.currentFileName || "");
                if (!fileName)
                    return;
                fileManager.saveFile(fileName, editor.getSourcePath().join("\n"));
            }).options({ because: "Save File" });
            editor.shortcut("Slash File Pull", () => {
                // open
                const doit = () => {
                    let pathData = localStorage.getItem("path");
                    if (!pathData)
                        return;
                    editor.show(pathData);
                };
                const priorPath = editor.getSourcePath();
                const undo = () => {
                    editor.show(priorPath.join("\n"));
                };
                doit();
                return { undo, redo: doit };
            }).options({ because: "Load Temporary File" });
            editor.shortcut("Slash File Commit", () => localStorage.setItem("path", editor.getSourcePath().join("\n"))).options({ because: "Save Temporary File" });
        }
    }
    exports.FileRule = FileRule;
});
define("fun/PathRule", ["require", "exports", "fun/stringify", "fun/parse"], function (require, exports, stringify_3, parse_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PathRule {
        transformActiveCommand(editor, translate, options) {
            let index = editor.getActiveIndex();
            let path = editor.getSourcePath();
            if (!path)
                throw "use targetPath";
            let command = parse_3.parse(path[index]);
            switch (command.command) {
                case "A": {
                    let [rx, ry, a, b, cw, x, y] = command.args;
                    if (options.primary) {
                        x += translate.dx;
                        y += translate.dy;
                    }
                    if (options.secondary) {
                        rx += translate.dx;
                        ry += translate.dy;
                    }
                    path[index] = stringify_3.stringify({ command: command.command, args: [rx, ry, a, b, cw, x, y] });
                    break;
                }
                case "C": {
                    let [ax, ay, bx, by, x, y] = command.args;
                    if (options.primary) {
                        ax += translate.dx;
                        ay += translate.dy;
                        bx += translate.dx;
                        by += translate.dy;
                        x += translate.dx;
                        y += translate.dy;
                    }
                    if (options.secondary) {
                        ax += translate.dx;
                        ay += translate.dy;
                    }
                    if (options.tertiary) {
                        bx += translate.dx;
                        by += translate.dy;
                    }
                    path[index] = stringify_3.stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
                    break;
                }
                case "H": {
                    let [x] = command.args;
                    x += translate.dx;
                    path[index] = stringify_3.stringify({ command: command.command, args: [x] });
                    break;
                }
                case "V": {
                    let [y] = command.args;
                    y += translate.dy;
                    path[index] = stringify_3.stringify({ command: command.command, args: [y] });
                    break;
                }
                case "S": {
                    let [bx, by, x, y] = command.args;
                    if (options.primary) {
                        bx += translate.dx;
                        by += translate.dy;
                        x += translate.dx;
                        y += translate.dy;
                    }
                    if (options.secondary) {
                        bx += translate.dx;
                        by += translate.dy;
                    }
                    path[index] = stringify_3.stringify({ command: command.command, args: [bx, by, x, y] });
                    break;
                }
                case "L":
                case "M":
                case "T": {
                    let [x, y] = command.args;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_3.stringify({ command: command.command, args: [x, y] });
                    break;
                }
            }
            return path;
        }
        initialize(editor) {
            const moveit = (location, options) => {
                const currentIndex = editor.getActiveIndex();
                const doit = () => {
                    editor.hideCursor();
                    editor.show(this.transformActiveCommand(editor, location, options || { primary: true }).join(""));
                    editor.goto(currentIndex);
                };
                const undoCommand = editor.getSourcePath()[currentIndex];
                const undo = () => {
                    const path = editor.getSourcePath();
                    path[currentIndex] = undoCommand;
                    editor.show(path.join("\n"));
                    editor.goto(currentIndex);
                };
                doit();
                const redoCommand = editor.getSourcePath()[currentIndex];
                const redo = () => {
                    const path = editor.getSourcePath();
                    path[currentIndex] = redoCommand;
                    editor.show(path.join("\n"));
                    editor.goto(currentIndex);
                };
                return { undo, redo };
            };
            const hasActiveItem = () => 0 <= editor.getActiveIndex();
            const hasItems = () => { var _a; return !!((_a = document.querySelector(".svg-input")) === null || _a === void 0 ? void 0 : _a.hasChildNodes()); };
            editor.shortcut("Slash Path 2").options({ because: "Modify Secondary Value", onlyIf: hasActiveItem });
            editor.shortcut("Slash Path 3").options({ because: "Modify Tertiary Value", onlyIf: hasActiveItem });
            editor.shortcut("Slash Path 2 A", () => moveit({ dx: -1, dy: 0 }, { secondary: true })).options({
                because: "Decrement X2", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path 2 D", () => moveit({ dx: 1, dy: 0 }, { secondary: true })).options({
                because: "Increment X2", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path 2 S", () => moveit({ dx: 0, dy: 1 }, { secondary: true })).options({
                because: "Increment Y2", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path 2 W", () => moveit({ dx: 0, dy: -1 }, { secondary: true })).options({
                because: "", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path 3 A", () => moveit({ dx: -1, dy: 0 }, { tertiary: true })).options({
                because: "Decrement X3", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path 3 D", () => moveit({ dx: 1, dy: 0 }, { tertiary: true })).options({
                because: "Increment X3", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path 3 S", () => moveit({ dx: 0, dy: 1 }, { tertiary: true })).options({
                because: "Increment Y3", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path 3 W", () => moveit({ dx: 0, dy: -1 }, { tertiary: true })).options({
                because: "Decrement Y3", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path A", () => moveit({ dx: -1, dy: 0 })).options({
                because: "Decrement X", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path D", () => moveit({ dx: 1, dy: 0 })).options({
                because: "Increment X", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path S", () => moveit({ dx: 0, dy: 1 })).options({
                because: "Increment Y", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path W", () => moveit({ dx: 0, dy: -1 })).options({
                because: "Decrement Y", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path A 0", () => moveit({ dx: 0.1, dy: 0 })).options({
                because: "Reverse/10", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path D 0", () => moveit({ dx: -0.1, dy: 0 })).options({
                because: "Reverse/10", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path S 0", () => moveit({ dx: 0, dy: -0.1 })).options({
                because: "Reverse/10", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path W 0", () => moveit({ dx: 0, dy: 0.1 })).options({
                because: "Reverse/10", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path End", () => editor.goto(editor.getSourcePath().length - 1)).options({
                because: "Last Command", stateless: false, onlyIf: hasItems
            });
            editor.shortcut("Slash Path Home", () => editor.goto(0)).options({
                because: "First Command", stateless: false, onlyIf: hasItems
            });
            editor.shortcut("Slash Path .", () => editor.goto(editor.getActiveIndex() + 1))
                .options({
                because: "Next Command", stateless: false, onlyIf: hasItems
            });
            editor.shortcut("Slash Path ,", () => editor.goto(editor.getActiveIndex() - 1))
                .options({
                because: "Prior Command", stateless: false, onlyIf: hasItems
            });
            editor.shortcut("Slash Path X", () => {
                const deletedIndex = editor.getActiveIndex();
                const deletedCommand = editor.getSourcePath()[deletedIndex].trim();
                const undo = () => {
                    editor.goto(deletedIndex - 1);
                    editor.insertCommand(parse_3.parse(deletedCommand));
                    editor.goto(deletedIndex);
                };
                const doit = () => {
                    editor.deleteActiveCommand();
                };
                doit();
                return { undo, redo: doit };
            }).options({
                because: "Delete Command", stateless: false, onlyIf: hasActiveItem
            });
            editor.shortcut("Slash Path Enter", () => editor.editActiveCommand()).options({
                because: "Edit Command", stateless: false, onlyIf: hasActiveItem
            });
        }
    }
    exports.PathRule = PathRule;
});
define("index", ["require", "exports", "data/marker", "data/icons", "fun/SvgEditorControl", "fun/CoreRules", "fun/asDom", "fun/Digitizer", "fun/keys", "fun/getPath", "fun/Toaster", "fun/NotificationEditorRule", "fun/ImageLoaderRule", "fun/StateManagementRule", "fun/GridManagementRule", "fun/FileRule", "fun/PathRule", "fun/KeyboardShortcuts"], function (require, exports, marker_1, icons_1, SvgEditorControl_1, CoreRules_1, asDom_2, Digitizer_1, keys_2, getPath_2, Toaster_1, NotificationEditorRule_1, ImageLoaderRule_1, StateManagementRule_1, GridManagementRule_1, FileRule_1, PathRule_1, KeyboardShortcuts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    marker_1 = __importDefault(marker_1);
    icons_1 = __importDefault(icons_1);
    const shortcutManager = new KeyboardShortcuts_1.ShortcutManager();
    function createSvgEditor(workview, input) {
        let editor = new SvgEditorControl_1.SvgEditorControl(workview, input, {
            shortcutManager
        });
        return editor;
    }
    function pasteFromClipboard(clipboard) {
        let svgText = clipboard.value.trim();
        let svg = asDom_2.asDom(`<svg>${svgText}</svg>`);
        return Array.from(svg.querySelectorAll("symbol"));
    }
    function insertIntoEditor(editor, pathData) {
        // not sure why this is necessary...probably the namespace?
        const svgConverterPathNode = document.getElementById("cleanup");
        svgConverterPathNode.setAttribute("d", pathData.getAttribute("d"));
        let d = getPath_2.getPath(svgConverterPathNode);
        editor.insertPath(d);
    }
    function run() {
        const toaster = new Toaster_1.Toaster();
        document.body.appendChild(toaster.domNode);
        toaster.setContent("Hello!");
        let path = document.querySelector("path");
        let svg = path.ownerSVGElement;
        if (!svg)
            throw "path must be in an svg container";
        //path.setAttribute("d", markers.marker5);
        path.setAttribute("d", "M 0 0 Z");
        let input = document.getElementById("svg-input");
        let editor = createSvgEditor(svg, input);
        editor.use(new GridManagementRule_1.GridManagementRule());
        editor.use(new StateManagementRule_1.StateManagementRule());
        editor.use(new CoreRules_1.CoreRules(shortcutManager));
        editor.use(new Digitizer_1.Digitizer());
        editor.use(new NotificationEditorRule_1.NotificationEditorRule(toaster));
        editor.use(new ImageLoaderRule_1.ImageLoaderRule());
        editor.use(new FileRule_1.FileRule());
        editor.use(new PathRule_1.PathRule());
        let toolbar = asDom_2.asDom(`<div class="toolbar hidden">
  <input class="filter" placeholder="filter icons"/>
  </div>`);
        document.body.appendChild(toolbar);
        keys_2.keys(marker_1.default).forEach(marker => {
            let b = asDom_2.asDom(`<button id="${marker}" class="marker"><svg viewBox="-18 -18 36 36"><path d="${marker_1.default[marker]}"></path></svg></button>`);
            toolbar.appendChild(b);
            b.addEventListener("click", () => {
                insertIntoEditor(editor, b.querySelector("path"));
            });
        });
        keys_2.keys(icons_1.default).forEach(marker => {
            let b = asDom_2.asDom(`<button id="${marker}" class="icon"><svg viewBox="0 0 36 36"><path d="${icons_1.default[marker]}"></path></svg></button>`);
            toolbar.appendChild(b);
            b.addEventListener("click", () => {
                insertIntoEditor(editor, b.querySelector("path"));
            });
        });
        const clipboard = document.querySelector(".clipboard");
        if (clipboard) {
            const doit = () => {
                const symbols = pasteFromClipboard(clipboard);
                if (symbols) {
                    symbols.forEach(symbol => {
                        let { x, y, width, height } = symbol.viewBox.baseVal;
                        let b = asDom_2.asDom(`<button class="icon" title=#${symbol.id}><svg viewBox="${x} ${y} ${width} ${height}"><g>${symbol.innerHTML}</g></svg></button>`);
                        toolbar.appendChild(b);
                        b.addEventListener("click", () => {
                            let pathData = symbol.querySelector("path");
                            insertIntoEditor(editor, pathData);
                        });
                    });
                }
            };
            doit();
            clipboard.addEventListener("change", doit);
        }
        const inset = document.querySelector(".inset");
        if (inset) {
            editor.subscribe("source-path-changed", () => {
                let path = editor
                    .getSourcePath()
                    .join(" ");
                path = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 32 32"><g><path d="${path}"></path></g></svg>`;
                let url = `data:image/svg+xml;base64,${btoa(path)}`;
                inset.src = url;
            });
        }
    }
    exports.run = run;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhL21hcmtlci50cyIsImRhdGEvaWNvbnMudHMiLCJmdW4vQ29tbWFuZC50cyIsImZ1bi9EaWN0aW9uYXJ5LnRzIiwiZnVuL2RyYXdDdXJzb3IudHMiLCJmdW4vZHJhd1gudHMiLCJmdW4vZm9jdXMudHMiLCJmdW4vcGFyc2UudHMiLCJmdW4vZ2V0TG9jYXRpb24udHMiLCJmdW4vc3RyaW5naWZ5LnRzIiwiZnVuL3BhcnNlUGF0aC50cyIsImZ1bi9nZXRQYXRoLnRzIiwiZnVuL2dldFBhdGhDb21tYW5kcy50cyIsImZ1bi9zZXRQYXRoLnRzIiwiZnVuL2tleXMudHMiLCJmdW4vVW5kb1JlZG8udHMiLCJmdW4vUmVtb3ZlRXZlbnRIYW5kbGVyLnRzIiwiZnVuL0NoYW5uZWwudHMiLCJmdW4vU3ZnRWRpdG9yLnRzIiwiZnVuL0tleWJvYXJkU2hvcnRjdXRzLnRzIiwiZnVuL2dldFNjYWxlLnRzIiwiZnVuL1N2Z0VkaXRvckNvbnRyb2wudHMiLCJmdW4vQ29yZVJ1bGVzLnRzIiwiZnVuL2FzRG9tLnRzIiwiZnVuL0RpZ2l0aXplci50cyIsImZ1bi9odG1sLnRzIiwiZnVuL1RvYXN0ZXIudHMiLCJmdW4vTm90aWZpY2F0aW9uRWRpdG9yUnVsZS50cyIsImZ1bi9JbWFnZUxvYWRlclJ1bGUudHMiLCJmdW4vU3RhdGVNYW5hZ2VtZW50UnVsZS50cyIsImZ1bi9jcmVhdGVTdmcudHMiLCJmdW4vcmFuZ2UudHMiLCJmdW4vY3JlYXRlUGF0aC50cyIsImZ1bi9jcmVhdGVHcmlkLnRzIiwiZnVuL0dyaWRNYW5hZ2VtZW50UnVsZS50cyIsImZ1bi9GaWxlUnVsZS50cyIsImZ1bi9QYXRoUnVsZS50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBQUEsT0FBUztRQUNQLE9BQU8sRUFBRTs7Ozs7O0VBTVQ7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7OztFQVNUO1FBQ0EsT0FBTyxF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QyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMzRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENB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
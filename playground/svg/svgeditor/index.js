define("data/marker", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
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
define("typings/Command", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("typings/Dictionary", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/drawCursor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.drawCursor = void 0;
    function drawCursor(location, scale = 5) {
        let { x, y } = location;
        return `M ${x} ${y} l -${scale} -${scale} l ${2 * scale} ${2 * scale} l -${scale} -${scale} l ${scale} -${scale} l -${2 * scale} ${2 * scale} z`;
    }
    exports.drawCursor = drawCursor;
});
define("fun/drawX", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.drawX = void 0;
    function drawX(location, options) {
        let { x, y } = location;
        let scale = options?.scale ?? 1;
        return `M ${x} ${y} l ` + `-${scale} -${scale} l ${2 * scale} ${2 * scale} l -${scale} -${scale} l ${scale} -${scale} l -${2 * scale} ${2 * scale} z`;
    }
    exports.drawX = drawX;
});
define("fun/focus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.focus = void 0;
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
    exports.parse = void 0;
    function parse(commandText) {
        let [head, ...tail] = commandText.split(" ");
        return { command: head, args: tail.map(parseFloat) };
    }
    exports.parse = parse;
});
define("fun/getLocation", ["require", "exports", "fun/parse"], function (require, exports, parse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocation = void 0;
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
    exports.stringify = void 0;
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
    exports.parsePath = void 0;
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
    exports.getPath = void 0;
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
    exports.getPathCommands = void 0;
    function getPathCommands(path) {
        return parsePath_1.parsePath(getPath_1.getPath(path)).map(stringify_1.stringify);
    }
    exports.getPathCommands = getPathCommands;
});
define("fun/setPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setPath = void 0;
    function setPath(pathElement, d) {
        pathElement.setAttribute("d", d);
    }
    exports.setPath = setPath;
});
define("fun/keys", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.keys = void 0;
    function keys(o) {
        return Object.keys(o);
    }
    exports.keys = keys;
});
define("widgets/UndoRedo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UndoRedo = void 0;
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
define("typings/RemoveEventHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("widgets/Channel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Channel = void 0;
    class Channel {
        constructor() {
            this.topics = {};
        }
        dispose() {
            this.topics = {};
        }
        subscribe(topic, cb) {
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
define("typings/ShortcutOptions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("widgets/KeyboardShortcuts", ["require", "exports", "fun/keys", "widgets/UndoRedo", "widgets/Channel"], function (require, exports, keys_1, UndoRedo_1, Channel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShortcutManager = void 0;
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
            return this.channel.subscribe(topic, doit);
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
                .filter(node => !node.options?.onlyIf || node.options.onlyIf())
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
                if (!nextState.options?.stateless) {
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
define("typings/PubSub", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("typings/UndoRedo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("typings/SvgEditorRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("typings/Extensibility", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("typings/CommandEditor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("typings/SvgEditor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/getScale", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getScale = void 0;
    function getScale(svg) {
        let { width: viewBoxWidth } = svg.viewBox.baseVal;
        let { width } = svg.getBoundingClientRect();
        return width / viewBoxWidth;
    }
    exports.getScale = getScale;
});
define("widgets/SvgEditorControl", ["require", "exports", "fun/drawCursor", "fun/drawX", "fun/focus", "fun/getLocation", "fun/getPathCommands", "fun/parse", "fun/parsePath", "fun/setPath", "fun/stringify", "fun/getScale", "widgets/Channel"], function (require, exports, drawCursor_1, drawX_1, focus_1, getLocation_1, getPathCommands_1, parse_2, parsePath_2, setPath_1, stringify_2, getScale_1, Channel_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SvgEditorControl = void 0;
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
            const h = this.channel.subscribe(topic, callback);
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
define("widgets/CoreRules", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CoreRules = void 0;
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
        let help = document.querySelector(".F1");
        help?.classList.add("hidden");
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
    exports.asDom = void 0;
    function asDom(html) {
        let div = document.createElement("div");
        div.innerHTML = html.trim();
        return div.firstElementChild;
    }
    exports.asDom = asDom;
});
define("widgets/DigitizerRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Digitizer = void 0;
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
                return !!document.querySelector(".svgeditor")?.classList.contains("digitizer");
            };
            if (bitmap) {
                editor.shortcut("Slash Bitmap X", () => document.querySelector(".svgeditor")?.classList.remove("digitizer")).options({
                    onlyIf: bitmapOpen,
                    because: "Dismiss Bitmap", stateless: true
                });
                editor.shortcut("Slash Bitmap", () => document.querySelector(".svgeditor")?.classList.add("digitizer")).options({
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
                    because: `Zoom Out By ${percent(scale)}`
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
    exports.addToClassList = exports.injectCss = exports.injectHtml = exports.createUniqueIdForCssBody = exports.html = void 0;
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
        const node = html(markup);
        container?.appendChild(node);
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
define("widgets/Toaster", ["require", "exports", "fun/html"], function (require, exports, html_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Toaster = void 0;
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
define("widgets/NotificationEditorRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotificationEditorRule = void 0;
    class NotificationEditorRule {
        constructor(toaster) {
            this.toaster = toaster;
        }
        initialize(editor) {
            editor.subscribe("log", message => {
                if (!message)
                    return;
                this.toaster.setContent(message, "", 1000);
            });
        }
    }
    exports.NotificationEditorRule = NotificationEditorRule;
});
define("widgets/ImageLoaderRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageLoaderRule = void 0;
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
define("widgets/StateManagementRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateManagementRule = void 0;
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
    exports.createSvg = void 0;
    function createSvg() {
        return document.createElementNS("http://www.w3.org/2000/svg", "svg");
    }
    exports.createSvg = createSvg;
});
define("fun/range", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.range = void 0;
    function range(n) {
        return Array(n).fill(0).map((v, i) => i);
    }
    exports.range = range;
});
define("fun/createPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createPath = void 0;
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
    exports.createGrid = void 0;
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
define("widgets/GridManagementRule", ["require", "exports", "fun/createSvg", "fun/createGrid", "fun/createPath", "fun/setPath"], function (require, exports, createSvg_1, createGrid_1, createPath_2, setPath_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GridManagementRule = void 0;
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
            this.gridPath?.remove();
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
define("widgets/FileRule", ["require", "exports", "fun/asDom", "fun/focus"], function (require, exports, asDom_1, focus_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileRule = void 0;
    class FileManager {
        validateFileName(fileName) {
            if (!fileName)
                return false;
            if (fileName.length < 3)
                return false;
            return true;
        }
        getFileNames() {
            return localStorage.getItem("files/index")?.split(";") || [];
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
                    if (index < 0)
                        return;
                    this.currentFileName = fileNames[index];
                    const pathData = fileManager.openFile(this.currentFileName);
                    editor.show(pathData);
                    this.filePicker?.remove();
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
define("widgets/PathRule", ["require", "exports", "fun/stringify", "fun/parse"], function (require, exports, stringify_3, parse_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PathRule = void 0;
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
            const hasItems = () => !!document.querySelector(".svg-input")?.hasChildNodes();
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
define("index", ["require", "exports", "data/marker", "data/icons", "widgets/SvgEditorControl", "widgets/CoreRules", "fun/asDom", "widgets/DigitizerRule", "fun/keys", "fun/getPath", "widgets/Toaster", "widgets/NotificationEditorRule", "widgets/ImageLoaderRule", "widgets/StateManagementRule", "widgets/GridManagementRule", "widgets/FileRule", "widgets/PathRule", "widgets/KeyboardShortcuts"], function (require, exports, marker_1, icons_1, SvgEditorControl_1, CoreRules_1, asDom_2, DigitizerRule_1, keys_2, getPath_2, Toaster_1, NotificationEditorRule_1, ImageLoaderRule_1, StateManagementRule_1, GridManagementRule_1, FileRule_1, PathRule_1, KeyboardShortcuts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.run = void 0;
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
        editor.use(new DigitizerRule_1.Digitizer());
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
//# sourceMappingURL=index.js.map
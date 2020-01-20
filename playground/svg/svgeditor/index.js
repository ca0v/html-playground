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
define("fun/Dictionary", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/Command", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("fun/parse", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function parse(commandText) {
        let [head, ...tail] = commandText.split(" ");
        return { command: head, args: tail.map(parseFloat) };
    }
    exports.parse = parse;
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
define("fun/drawCursor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function drawCursor(location, scale = 5) {
        let { x, y } = location;
        return `M ${x} ${y} l -${scale} -${scale} l ${2 * scale} ${2 * scale} l -${scale} -${scale} l ${scale} -${scale} l -${2 * scale} ${2 * scale} z`;
    }
    exports.drawCursor = drawCursor;
});
define("fun/setPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function setPath(pathElement, d) {
        pathElement.setAttribute("d", d);
    }
    exports.setPath = setPath;
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
define("fun/range", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function range(n) {
        return Array(n).fill(0).map((v, i) => i);
    }
    exports.range = range;
});
define("fun/createGrid", ["require", "exports", "fun/range", "fun/createPath", "fun/setPath"], function (require, exports, range_1, createPath_1, setPath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function dot(x, y, size) {
        const r = size / 2;
        return `M ${x - r} ${y} A ${r} ${r} 0 0 0 ${x + r} ${y} A ${r} ${r} 0 0 0 ${x - r} ${y} Z`;
    }
    function getScale(gridOverlay) {
        let { width: viewBoxWidth } = gridOverlay.viewBox.baseVal;
        let { width } = gridOverlay.getBoundingClientRect();
        return width / viewBoxWidth;
    }
    function createGrid(gridOverlay) {
        const scale = getScale(gridOverlay);
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
        setInterval(() => {
            const scale = getScale(gridOverlay);
            path.style.setProperty("stroke-width", (1 / scale) + "");
        }, 1000);
        const markers = range_1.range(1 + Math.ceil(Math.log2(width))).map(v => Math.pow(2, v));
        //markers.splice(0, markers.length - 4);
        console.log(markers, width);
        const hdots = [0, ...markers].map(v => dot(v, 0, size / 30)).join("\n");
        const vdots = markers.map(v => dot(v, v, size / 30) + dot(0, v, size / 30)).join("\n");
        setPath_1.setPath(path, `${vLines}\n${hLines}\n${hdots}\n${vdots}`);
        gridOverlay.appendChild(path);
    }
    exports.createGrid = createGrid;
});
define("fun/SvgEditor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("fun/createSvg", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createSvg() {
        return document.createElementNS("http://www.w3.org/2000/svg", "svg");
    }
    exports.createSvg = createSvg;
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
define("fun/KeyboardShortcuts", ["require", "exports", "fun/keys", "fun/UndoRedo"], function (require, exports, keys_1, UndoRedo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // do not use Alt
    const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Control Delete End Enter Escape Home Minus PageUp PageDown Plus Shift Slash Space".split(" ");
    const isAtomic = (v) => 0 <= atomicTokens.indexOf(v);
    class ShortcutManager {
        constructor() {
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
                node.subkeys[key] = node.subkeys[key] || { key, parent: node, subkeys: {}, ops: [] };
                return this.forceNode(node.subkeys[key], shortcuts);
            };
        }
        help(root = this.currentState, deep = false) {
            const visitAll = (node, cb) => {
                cb(node);
                keys_1.keys(node.subkeys).forEach(key => visitAll(node.subkeys[key], cb));
            };
            const visitUp = (node, cb) => {
                cb(node);
                node.parent && visitUp(node.parent, cb);
            };
            if (deep) {
                const parentKeys = [];
                visitAll(root, node => {
                    if (node.ops && node.ops.length) {
                        parentKeys.push(node.title || node.key);
                    }
                });
                return parentKeys.join("\n");
            }
            let results = keys_1.keys(root.subkeys);
            // if no child ops report parent ops
            if (!results.length) {
                root.parent && visitAll(root.parent, node => results.push(node.key));
            }
            return results.length ? `[${results.join("|")}]` : deep ? "" : this.help(root, true);
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
                    !event.repeat && this.log(`Try one of these: ${this.help(this.currentState)}`);
                    return;
                }
                event.preventDefault();
                if (!nextState.ops.length) {
                    this.currentState = nextState;
                    !event.repeat && this.log(`Up next: ${this.help(this.currentState)}`);
                    return;
                }
                if (!event.repeat) {
                    this.log(`${nextState.title}`);
                    keys_1.keys(nextState.subkeys).length && this.log(`more: ${this.help(nextState)}`);
                }
                nextState.ops.forEach(op => this.undos.run(op));
                if (!((_a = nextState.options) === null || _a === void 0 ? void 0 : _a.stateless)) {
                    lastStatefulState = nextState;
                }
                this.currentState = lastStatefulState || this.currentState;
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
define("fun/SvgEditorControl", ["require", "exports", "fun/stringify", "fun/parse", "fun/createPath", "fun/parsePath", "fun/focus", "fun/drawX", "fun/drawCursor", "fun/setPath", "fun/getPathCommands", "fun/createGrid", "fun/getLocation", "fun/getPath", "fun/createSvg", "fun/keys", "fun/KeyboardShortcuts"], function (require, exports, stringify_2, parse_2, createPath_2, parsePath_2, focus_1, drawX_1, drawCursor_1, setPath_2, getPathCommands_1, createGrid_1, getLocation_1, getPath_2, createSvg_1, keys_2, KeyboardShortcuts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getScale(gridOverlay) {
        let { width: viewBoxWidth } = gridOverlay.viewBox.baseVal;
        let { width } = gridOverlay.getBoundingClientRect();
        return width / viewBoxWidth;
    }
    class SvgEditorControl {
        constructor(workview, input) {
            var _a;
            this.workview = workview;
            this.input = input;
            this.topics = {};
            this.currentIndex = -1;
            this.keyCommands = {};
            this.shortcutManager = new KeyboardShortcuts_1.ShortcutManager();
            this.sourcePath = this.workview.querySelector("path");
            if (!this.sourcePath)
                throw "workview must have a path";
            let { x, y, width, height } = workview.viewBox.baseVal;
            this.gridOverlay = createSvg_1.createSvg();
            this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
            (_a = workview.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(this.gridOverlay);
            // how to get workPath stroke-width to be 0.2 regardless of scale?
            this.workPath = createPath_2.createPath({
                fill: "rgb(0,255,128)",
                stroke: "rgb(0,255,128)",
                "stroke-width": "0.2",
            });
            setInterval(() => {
                const scale = getScale(this.gridOverlay);
                this.workPath.style.setProperty("stroke-width", 1 / scale + "");
            }, 1000);
            this.gridOverlay.appendChild(this.workPath);
            this.createGrid();
            this.cursorPath = createPath_2.createPath({
                stroke: "rgb(0, 255, 0)",
                "stroke-width": "0.2",
            });
            this.gridOverlay.appendChild(this.cursorPath);
            const moveit = (location, options) => {
                const currentIndex = this.currentIndex;
                const undoCommand = this.getSourcePath()[currentIndex];
                const undo = () => {
                    const path = this.getSourcePath();
                    path[currentIndex] = undoCommand;
                    this.setSourcePath(path.join("\n"));
                };
                const doit = () => {
                    this.hideCursor();
                    this.setSourcePath(this.transformActiveCommand(location, options || { primary: true }).join(""));
                    this.showMarkers();
                };
                doit();
                const redoCommand = this.getSourcePath()[currentIndex];
                const redo = () => {
                    const path = this.getSourcePath();
                    path[currentIndex] = redoCommand;
                    this.setSourcePath(path.join("\n"));
                };
                return { undo, redo };
            };
            const keyCommands = {
                "Slash Help": () => {
                    console.log(this.shortcutManager.help(this.shortcutManager.shortcuts, true));
                    this.publish("log", this.shortcutManager.help());
                },
                "Slash File Open": () => {
                    // open
                    let pathData = localStorage.getItem("path");
                    if (!pathData)
                        return;
                    this.setSourcePath(pathData);
                    this.renderEditor();
                    this.showMarkers();
                    focus_1.focus(this.input.children[0]);
                },
                "Slash File New": () => {
                    this.setSourcePath("M 0 0 Z");
                    this.renderEditor();
                    this.showMarkers();
                    focus_1.focus(this.input.children[0]);
                },
                "Slash File Save": () => localStorage.setItem("path", this.getSourcePath().join("\n")),
                "Slash Path 2 A": () => moveit({ dx: -1, dy: 0 }, { secondary: true }),
                "Slash Path 2 D": () => moveit({ dx: 1, dy: 0 }, { secondary: true }),
                "Slash Path 2 S": () => moveit({ dx: 0, dy: 1 }, { secondary: true }),
                "Slash Path 2 W": () => moveit({ dx: 0, dy: -1 }, { secondary: true }),
                "Slash Path 3 A": () => moveit({ dx: -1, dy: 0 }, { tertiary: true }),
                "Slash Path 3 D": () => moveit({ dx: 1, dy: 0 }, { tertiary: true }),
                "Slash Path 3 S": () => moveit({ dx: 0, dy: 1 }, { tertiary: true }),
                "Slash Path 3 W": () => moveit({ dx: 0, dy: -1 }, { tertiary: true }),
                "Slash Path A": () => moveit({ dx: -1, dy: 0 }),
                "Slash Path D": () => moveit({ dx: 1, dy: 0 }),
                "Slash Path S": () => moveit({ dx: 0, dy: 1 }),
                "Slash Path W": () => moveit({ dx: 0, dy: -1 }),
                "Slash Path A 0": () => moveit({ dx: 0.1, dy: 0 }),
                "Slash Path D 0": () => moveit({ dx: -0.1, dy: 0 }),
                "Slash Path S 0": () => moveit({ dx: 0, dy: -0.1 }),
                "Slash Path W 0": () => moveit({ dx: 0, dy: 0.1 }),
                "Slash Path ArrowDown": () => { var _a; return focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling); },
                "Slash Path ArrowUp": () => { var _a; return focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling); },
                "Slash Path Delete": () => this.deleteActiveCommand(),
                "Slash Path End": () => focus_1.focus(this.input.lastElementChild),
                "Slash Path Enter": () => this.editActiveCommand(),
                "Slash Path Home": () => focus_1.focus(this.input.firstElementChild),
            };
            this.keyCommands = keyCommands;
            keys_2.keys(keyCommands).forEach(phrase => this.shortcutManager.registerShortcut(phrase, keyCommands[phrase]));
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
        setActiveIndex(index) {
            focus_1.focus(this.input.children[index]);
        }
        shortcut(topic, callback) {
            const node = this.shortcutManager.registerShortcut(topic, callback);
            return {
                unsubscribe: () => { },
                options: (options) => {
                    node.title = options.because;
                    node.options = options;
                },
            };
        }
        subscribe(topic, callback) {
            let subscribers = (this.topics[topic] = this.topics[topic] || []);
            subscribers.push(callback);
            return {
                unsubscribe: () => {
                    let i = subscribers.indexOf(callback);
                    if (i < 0)
                        return;
                    subscribers.splice(i, 1);
                },
                because: (about) => {
                    // use a shortcut instead
                },
            };
        }
        hideCursor() {
            setPath_2.setPath(this.cursorPath, "");
        }
        hideCommandEditor() {
            //
        }
        hideGrid() {
            this.gridOverlay.remove();
        }
        showGrid() {
            var _a, _b;
            (_b = (_a = this.workview) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(this.gridOverlay);
        }
        isGridVisible() {
            return !!this.gridOverlay.parentElement;
        }
        execute(command, ...args) {
            if (!this.keyCommands[command])
                return;
            this.keyCommands[command](...args);
        }
        publish(topic, ...args) {
            let subscribers = this.topics[topic];
            if (!subscribers) {
                console.log(topic);
                return false;
            }
            subscribers.forEach(subscriber => subscriber(...args));
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
            this.setSourcePath(sourcePath.join("\n"));
            this.renderEditor();
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
            this.setSourcePath(path.join("\n"));
            this.renderEditor();
            focus_1.focus(this.input.children[index + 1]);
        }
        deleteActiveCommand() {
            var _a, _b;
            let index = this.currentIndex;
            let path = this.getSourcePath();
            path.splice(index, 1);
            this.setSourcePath(path.join("\n"));
            let nextFocusItem = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) || ((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.previousElementSibling);
            this.input.children[index].remove();
            focus_1.focus(nextFocusItem);
        }
        replaceActiveCommand(commandText) {
            let index = this.currentIndex;
            let command = parse_2.parse(commandText);
            let path = this.getSourcePath();
            path[index] = stringify_2.stringify(command);
            this.setSourcePath(path.join("\n"));
        }
        transformActiveCommand(translate, options) {
            let index = this.currentIndex;
            let path = this.getSourcePath();
            if (!path)
                throw "use targetPath";
            let command = parse_2.parse(path[index]);
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
                    path[index] = stringify_2.stringify({ command: command.command, args: [rx, ry, a, b, cw, x, y] });
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
                    path[index] = stringify_2.stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
                    break;
                }
                case "H": {
                    let [x] = command.args;
                    x += translate.dx;
                    path[index] = stringify_2.stringify({ command: command.command, args: [x] });
                    break;
                }
                case "V": {
                    let [y] = command.args;
                    y += translate.dy;
                    path[index] = stringify_2.stringify({ command: command.command, args: [y] });
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
                    path[index] = stringify_2.stringify({ command: command.command, args: [bx, by, x, y] });
                    break;
                }
                case "L":
                case "M":
                case "T": {
                    let [x, y] = command.args;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_2.stringify({ command: command.command, args: [x, y] });
                    break;
                }
            }
            this.input.children[index].innerText = path[index];
            return path;
        }
        goto(index) {
            this.currentIndex = index;
            let path = this.getSourcePath();
            if (!path)
                return;
            const scale = getScale(this.gridOverlay);
            setPath_2.setPath(this.cursorPath, drawCursor_1.drawCursor(getLocation_1.getLocation(index, path), 25 / scale));
        }
        getPath() {
            return parsePath_2.parsePath(getPath_2.getPath(this.sourcePath));
        }
        setSourcePath(path) {
            setPath_2.setPath(this.sourcePath, path);
            this.publish("source-path-changed");
        }
        getSourcePath() {
            return getPathCommands_1.getPathCommands(this.sourcePath);
        }
        show() {
            this.showMarkers();
            this.renderEditor();
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
        createGrid() {
            createGrid_1.createGrid(this.gridOverlay);
        }
        hideMarkers() {
            setPath_2.setPath(this.workPath, "");
        }
        isMarkersVisible() {
            return !!this.workPath.getAttribute("d");
        }
        showMarkers() {
            let d = getComputedStyle(this.sourcePath).getPropertyValue("d");
            let commands = parsePath_2.parsePath(d);
            let overlayPath = this.createOverlayPoint(commands);
            overlayPath.unshift("M 0 0");
            overlayPath.push("Z");
            setPath_2.setPath(this.workPath, overlayPath.join(" "));
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
            const scale = getScale(this.gridOverlay);
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
        initialize(editor) {
            editor
                .shortcut("Escape Escape", () => {
                editor.hideCursor();
                editor.hideCommandEditor();
                editor.hideMarkers();
                editor.setActiveIndex(0);
                editor.showGrid();
                hideToolbar();
                hideHelp();
            })
                .options({ stateless: true, because: "get the editor closer to the initial state" });
            // "?"
            editor.shortcut("Slash Toggle Help", () => {
                var _a;
                let help = document.querySelector(".F1");
                (_a = help) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            });
            editor.shortcut(">", () => {
                editor.redo();
            }).options({ stateless: true, because: "redo the prior action" });
            editor.shortcut("<", () => {
                editor.undo();
            }).options({ stateless: true, because: "undo prior action" });
            editor.shortcut("Slash Toggle Toolbar", () => {
                getToolbar().classList.toggle("hidden");
            });
            editor.shortcut("Slash Toggle GridLines", () => {
                if (editor.isGridVisible()) {
                    editor.hideGrid();
                }
                else {
                    editor.showGrid();
                }
            });
            editor.shortcut("Slash Toggle Markers", () => {
                if (editor.isMarkersVisible()) {
                    editor.hideMarkers();
                }
                else {
                    editor.showGrid();
                    editor.showMarkers();
                }
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
            if (bitmap) {
                editor.shortcut("Slash Toggle Bitmap", () => { var _a; return (_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.toggle("digitizer"); });
                editor.shortcut("Slash Bitmap", () => { var _a; return (_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.add("digitizer"); });
                let scale = 1.1;
                editor.shortcut("Slash Bitmap Plus", createScaler(bitmap, scale));
                editor.shortcut("Slash Bitmap Minus", createScaler(bitmap, 1.0 / scale));
                scale = 1 / 1.01;
                editor.shortcut("Slash Bitmap Plus 1", createScaler(bitmap, scale));
                editor.shortcut("Slash Bitmap Minus 1", createScaler(bitmap, 1.0 / scale));
                scale = 10;
                editor.shortcut("Slash Bitmap A.ArrowLeft", createTranslator(bitmap, -scale, 0));
                editor.shortcut("Slash Bitmap D.ArrowRight", createTranslator(bitmap, scale, 0));
                editor.shortcut("Slash Bitmap W.ArrowUp", createTranslator(bitmap, 0, -scale));
                editor.shortcut("Slash Bitmap S.ArrowDown", createTranslator(bitmap, 0, scale));
                scale = -1;
                editor.shortcut("Slash Bitmap A.ArrowLeft 1", createTranslator(bitmap, -scale, 0));
                editor.shortcut("Slash Bitmap D.ArrowRight 1", createTranslator(bitmap, scale, 0));
                editor.shortcut("Slash Bitmap W.ArrowUp 1", createTranslator(bitmap, 0, -scale));
                editor.shortcut("Slash Bitmap S.ArrowDown 1", createTranslator(bitmap, 0, scale));
            }
            // iop are keyboard sequences
            editor.shortcut("Slash Path ECurve", () => editor.insertCommand({ command: "C", args: [] }));
            editor.shortcut("Slash Path HorizontalLine", () => editor.insertCommand({ command: "H", args: [] }));
            editor.shortcut("Slash Path Line", () => editor.insertCommand({ command: "L", args: [] }));
            editor.shortcut("Slash Path Move", () => editor.insertCommand({ command: "M", args: [] }));
            editor.shortcut("Slash Path RArc", () => editor.insertCommand({ command: "A", args: [] }));
            editor.shortcut("Slash Path UCurveSmooth", () => editor.insertCommand({ command: "S", args: [] }));
            editor.shortcut("Slash Path VerticalLine", () => editor.insertCommand({ command: "V", args: [] }));
            editor.shortcut("Slash Path ZReturn", () => editor.insertCommand({ command: "Z", args: [] }));
            /**
             * Moves the digitizing area
             * control speeds things up, alt slows things down
             * alt=1, ctrl+alt=10 , ctrl=100
             */
            {
                let scale = 10;
                editor.shortcut("Slash Vector S.ArrowDown", createTranslator(layers, 0, scale));
                editor.shortcut("Slash Vector W.ArrowUp", createTranslator(layers, 0, -scale));
                editor.shortcut("Slash Vector A.ArrowLeft", createTranslator(layers, -scale, 0));
                editor.shortcut("Slash Vector D.ArrowRight", createTranslator(layers, scale, 0));
                scale = -1;
                editor.shortcut("Slash Vector S.ArrowDown 1", createTranslator(layers, 0, scale));
                editor.shortcut("Slash Vector W.ArrowUp 1", createTranslator(layers, 0, -scale));
                editor.shortcut("Slash Vector A.ArrowLeft 1", createTranslator(layers, -scale, 0));
                editor.shortcut("Slash Vector D.ArrowRight 1", createTranslator(layers, scale, 0));
                // zoom about current cursor location
                scale = 1.1;
                editor.shortcut("Slash Vector Plus", createScaleAboutCursor(editor, scale));
                editor.shortcut("Slash Vector Minus", createScaleAboutCursor(editor, 1 / scale));
                scale = 1 / 1.01;
                editor.shortcut("Slash Vector Plus 1", createScaleAboutCursor(editor, scale));
                editor.shortcut("Slash Vector Minus 1", createScaleAboutCursor(editor, 1 / scale));
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
define("NotificationEditorRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NotificationEditorRule {
        constructor(toaster) {
            this.toaster = toaster;
        }
        initialize(editor) {
            editor.subscribe("log", message => {
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
            editor.shortcut("Slash Bitmap Load", () => {
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
define("index", ["require", "exports", "data/marker", "data/icons", "fun/SvgEditorControl", "fun/CoreRules", "fun/asDom", "fun/stringify", "fun/Digitizer", "fun/keys", "fun/getPath", "fun/Toaster", "NotificationEditorRule", "fun/ImageLoaderRule"], function (require, exports, marker_1, icons_1, SvgEditorControl_1, CoreRules_1, asDom_1, stringify_3, Digitizer_1, keys_3, getPath_3, Toaster_1, NotificationEditorRule_1, ImageLoaderRule_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    marker_1 = __importDefault(marker_1);
    icons_1 = __importDefault(icons_1);
    function createSvgEditor(workview, input) {
        let editor = new SvgEditorControl_1.SvgEditorControl(workview, input);
        return editor;
    }
    function pasteFromClipboard(clipboard) {
        let svgText = clipboard.value.trim();
        let svg = asDom_1.asDom(`<svg>${svgText}</svg>`);
        return Array.from(svg.querySelectorAll("symbol"));
    }
    function insertIntoEditor(editor, pathData) {
        // not sure why this is necessary...probably the namespace?
        const svgConverterPathNode = document.getElementById("cleanup");
        svgConverterPathNode.setAttribute("d", pathData.getAttribute("d"));
        let d = getPath_3.getPath(svgConverterPathNode);
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
        editor.use(new CoreRules_1.CoreRules());
        editor.use(new Digitizer_1.Digitizer());
        editor.use(new NotificationEditorRule_1.NotificationEditorRule(toaster));
        editor.use(new ImageLoaderRule_1.ImageLoaderRule());
        editor.show();
        let toolbar = asDom_1.asDom(`<div class="toolbar hidden"></div>`);
        document.body.appendChild(toolbar);
        toolbar.appendChild(asDom_1.asDom(`<button class="F1"><svg viewBox="-18 -18 36 36"><use href="#svg-path"></use></svg></button>`));
        keys_3.keys(marker_1.default).forEach(marker => {
            let b = asDom_1.asDom(`<button id="${marker}" class="F1 marker"><svg viewBox="-18 -18 36 36"><path d="${marker_1.default[marker]}"></path></svg></button>`);
            toolbar.appendChild(b);
            b.addEventListener("click", () => {
                insertIntoEditor(editor, b.querySelector("path"));
            });
        });
        keys_3.keys(icons_1.default).forEach(marker => {
            let b = asDom_1.asDom(`<button id="${marker}" class="F1 icon"><svg viewBox="0 0 36 36"><path d="${icons_1.default[marker]}"></path></svg></button>`);
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
                        let b = asDom_1.asDom(`<button class="F2"><svg viewBox="${x} ${y} ${width} ${height}"><g>${symbol.innerHTML}</g></svg></button>`);
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
                    .getPath()
                    .map(c => stringify_3.stringify(c))
                    .join(" ");
                path = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 32 32"><g><path d="${path}"></path></g></svg>`;
                let url = `data:image/svg+xml;base64,${btoa(path)}`;
                console.log(url);
                inset.src = url;
            });
        }
        editor.execute("Slash File Open");
        editor.execute("Slash Help");
    }
    exports.run = run;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhL21hcmtlci50cyIsImRhdGEvaWNvbnMudHMiLCJmdW4vRGljdGlvbmFyeS50cyIsImZ1bi9Db21tYW5kLnRzIiwiZnVuL3N0cmluZ2lmeS50cyIsImZ1bi9wYXJzZS50cyIsImZ1bi9jcmVhdGVQYXRoLnRzIiwiZnVuL3BhcnNlUGF0aC50cyIsImZ1bi9mb2N1cy50cyIsImZ1bi9kcmF3WC50cyIsImZ1bi9kcmF3Q3Vyc29yLnRzIiwiZnVuL3NldFBhdGgudHMiLCJmdW4vZ2V0UGF0aC50cyIsImZ1bi9nZXRQYXRoQ29tbWFuZHMudHMiLCJmdW4vcmFuZ2UudHMiLCJmdW4vY3JlYXRlR3JpZC50cyIsImZ1bi9TdmdFZGl0b3IudHMiLCJmdW4vZ2V0TG9jYXRpb24udHMiLCJmdW4vY3JlYXRlU3ZnLnRzIiwiZnVuL2tleXMudHMiLCJmdW4vVW5kb1JlZG8udHMiLCJmdW4vS2V5Ym9hcmRTaG9ydGN1dHMudHMiLCJmdW4vU3ZnRWRpdG9yQ29udHJvbC50cyIsImZ1bi9Db3JlUnVsZXMudHMiLCJmdW4vYXNEb20udHMiLCJmdW4vRGlnaXRpemVyLnRzIiwiZnVuL2h0bWwudHMiLCJmdW4vVG9hc3Rlci50cyIsIk5vdGlmaWNhdGlvbkVkaXRvclJ1bGUudHMiLCJmdW4vSW1hZ2VMb2FkZXJSdWxlLnRzIiwiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFBQSxPQUFTO1FBQ1AsT0FBTyxFQUFFOzs7Ozs7RUFNVDtRQUNBLE9BQU8sRUFBRTs7Ozs7Ozs7O0VBU1Q7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0VBY1Q7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXdCVDtRQUNBLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBd0JUO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7OztFQVFUO0tBQ0QsQ0FBQzs7OztJQzVGRixPQUFT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Ozs7O0lFNUNELFNBQWdCLFdBQVcsQ0FBQyxLQUFhLEVBQUUsSUFBYztRQUl2RCxJQUFJLE9BQU8sR0FBRyxhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakMsUUFBUSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0UsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxP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QUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEYsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0RSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDcEUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3BFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JFLGNBQWMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUMvQyxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQzlDLGNBQWMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQy9DLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNsRCxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNuRCxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNuRCxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDbEQsc0JBQXNCLEVBQUUsR0FBRyxFQUFFLFdBQUMsT0FBQSxhQUFLLE9BQUMsUUFBUSxDQUFDLGFBQWEsMENBQUUsa0JBQWtCLENBQUMsQ0FBQSxFQUFBO2dCQUMvRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsV0FBQyxPQUFBLGFBQUssT0FBQyxRQUFRLENBQUMsYUFBYSwwQ0FBRSxzQkFBc0IsQ0FBQyxDQUFBLEVBQUE7Z0JBQ2pGLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDckQsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzFELGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDbEQsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7YUFDN0QsQ0FBQztZQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBRS9CLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFTLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hILElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO2dCQUN2RixHQUFHLEVBQUUsQ0FBQyxPQUFlLEVBQUUsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDO1FBbE1ELElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFFRCxJQUFJO1lBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBRUQsR0FBRyxDQUFDLElBQW1CO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsaUJBQWlCO1lBQ2YsT0FBTyx5QkFBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELFVBQVU7WUFDUixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQzVELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBRUQsY0FBYyxDQUFDLEtBQWE7WUFDMUIsYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELFFBQVEsQ0FBQyxLQUFhLEVBQUUsUUFBcUM7WUFPM0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDcEUsT0FBTztnQkFDTCxXQUFXLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUMsT0FBaUQsRUFBRSxFQUFFO29CQUM3RCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQzdCLElBQUksQ0FBQyxPQUFPLEdBQVEsT0FBTyxDQUFDO2dCQUM5QixDQUFDO2FBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRCxTQUFTLENBQUMsS0FBYSxFQUFFLFFBQW9CO1lBQzNDLElBQUksV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsT0FBTztnQkFDTCxXQUFXLEVBQUUsR0FBRyxFQUFFO29CQUNoQixJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUFFLE9BQU87b0JBQ2xCLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUNELE9BQU8sRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFO29CQUN6Qix5QkFBeUI7Z0JBQzNCLENBQUM7YUFDRixDQUFDO1FBQ0osQ0FBQztRQUVELFVBQVU7WUFDUixpQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVELGlCQUFpQjtZQUNmLEVBQUU7UUFDSixDQUFDO1FBRUQsUUFBUTtZQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVELFFBQVE7O1lBQ04sWUFBQSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxhQUFhLDBDQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQzlELENBQUM7UUFFRCxhQUFhO1lBQ1gsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDMUMsQ0FBQztRQXdITSxPQUFPLENBQUMsT0FBZSxFQUFFLEdBQUcsSUFBVztZQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7Z0JBQUUsT0FBTztZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVPLE9BQU8sQ0FBQyxLQUFhLEVBQUUsR0FBRyxJQUFXO1lBQzNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVPLGlCQUFpQjtZQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzlCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBZ0IsQ0FBQztZQUM5RCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLEtBQUssQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQztZQUN0QyxJQUFJLFlBQVksR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQzNDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzdCLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2YsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWQsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ2xCLGFBQWEsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO2dCQUN2QyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2YsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQztZQUNGLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ2xCLEtBQUssUUFBUTt3QkFDWCxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0I7d0JBQ3ZDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO3dCQUN2QyxNQUFNO29CQUNSLEtBQUssYUFBYSxDQUFDO29CQUNuQixLQUFLLE9BQU87d0JBQ1YsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzt3QkFDMUIsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsZ0JBQWdCO3dCQUN2QyxhQUFhLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNuQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzt3QkFDMUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO3dCQUN2QixNQUFNO2lCQUNUO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRU0sVUFBVSxDQUFDLElBQVk7WUFDNUIsTUFBTSxZQUFZLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLHFCQUFTLENBQUMsQ0FBQztZQUNoRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN4QyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUVNLGFBQWEsQ0FBQyxPQUFnQjtZQUNuQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzlCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNoQyxJQUFJLGVBQWUsR0FBRyx5QkFBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDdkIsS0FBSyxHQUFHO3dCQUNOLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyRSxNQUFNO29CQUNSLEtBQUssR0FBRzt3QkFDTixPQUFPLENBQUMsSUFBSSxHQUFHOzRCQUNiLGVBQWUsQ0FBQyxDQUFDOzRCQUNqQixlQUFlLENBQUMsQ0FBQzs0QkFDakIsZUFBZSxDQUFDLENBQUM7NEJBQ2pCLGVBQWUsQ0FBQyxDQUFDOzRCQUNqQixlQUFlLENBQUMsQ0FBQzs0QkFDakIsZUFBZSxDQUFDLENBQUM7eUJBQ2xCLENBQUM7d0JBQ0YsTUFBTTtvQkFDUixLQUFLLEdBQUc7d0JBQ04sT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsTUFBTTtvQkFDUixLQUFLLEdBQUc7d0JBQ04sT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUYsTUFBTTtvQkFDUixLQUFLLEdBQUc7d0JBQ04sT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsTUFBTTtvQkFDUixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUc7d0JBQ04sT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNO2lCQUNUO2FBQ0Y7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLHFCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFTyxtQkFBbUI7O1lBQ3pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksYUFBYSxHQUFHLE9BQUEsUUFBUSxDQUFDLGFBQWEsMENBQUUsa0JBQWtCLFlBQUksUUFBUSxDQUFDLGFBQWEsMENBQUUsc0JBQXNCLENBQUEsQ0FBQztZQUNqSCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQyxhQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUVPLG9CQUFvQixDQUFDLFdBQW1CO1lBQzlDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDOUIsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRU8sc0JBQXNCLENBQzVCLFNBQXFDLEVBQ3JDLE9BQXVFO1lBRXZFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJO2dCQUFFLE1BQU0sZ0JBQWdCLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDdkIsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDUixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDNUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO3dCQUNuQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbEIsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ25CO29CQUNELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTt3QkFDckIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3FCQUNwQjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdEYsTUFBTTtpQkFDUDtnQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNSLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQzFDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNuQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNsQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztxQkFDbkI7b0JBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO3dCQUNyQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ3BCO29CQUNELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTt3QkFDcEIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3FCQUNwQjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNwRixNQUFNO2lCQUNQO2dCQUNELEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ1IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDakUsTUFBTTtpQkFDUDtnQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNSLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUN2QixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLHFCQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2pFLE1BQU07aUJBQ1A7Z0JBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDUixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDbEMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO3dCQUNuQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNsQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztxQkFDbkI7b0JBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO3dCQUNyQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ3BCO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxxQkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1RSxNQUFNO2lCQUNQO2dCQUNELEtBQUssR0FBRyxDQUFDO2dCQUNULEtBQUssR0FBRyxDQUFDO2dCQUNULEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ1IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUMxQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxxQkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEUsTUFBTTtpQkFDUDthQUNGO1lBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFvQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkUsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRU8sSUFBSSxDQUFDLEtBQWE7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDbEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QyxpQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsdUJBQVUsQ0FBQyx5QkFBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQsT0FBTztZQUNMLE9BQU8scUJBQVMsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFTyxhQUFhLENBQUMsSUFBWTtZQUNoQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFTyxhQUFhO1lBQ25CLE9BQU8saUNBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELElBQUk7WUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFFTyxZQUFZO1lBQ2xCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFTyxVQUFVO1lBQ2hCLHVCQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFTSxXQUFXO1lBQ2hCLGlCQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRU0sZ0JBQWdCO1lBQ3JCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFTSxXQUFXO1lBQ2hCLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoRSxJQUFJLFFBQVEsR0FBRyxxQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsaUJBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRU8sa0JBQWtCLENBQUMsUUFBbUI7WUFDNUMsSUFBSSxJQUFJLEdBQW9DLEVBQUUsQ0FBQztZQUMvQyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ25DLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3pCLFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDdkIsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDUixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDNUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixNQUFNO3FCQUNQO29CQUNELEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ1IsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUM1QixhQUFhLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3pCLE1BQU07cUJBQ1A7b0JBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDUixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDdkIsYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3pCLE1BQU07cUJBQ1A7b0JBQ0QsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDUixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQzFCLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDekIsTUFBTTtxQkFDUDtvQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUNSLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDNUIsYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixNQUFNO3FCQUNQO29CQUNELEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ1IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3ZCLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixNQUFNO3FCQUNQO29CQUNELEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ1IsTUFBTTtxQkFDUDtvQkFDRCxPQUFPLENBQUMsQ0FBQzt3QkFDUCxNQUFNLG9CQUFvQixPQUFPLEVBQUUsQ0FBQztxQkFDckM7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7S0FDRjtJQTFnQkQsNENBMGdCQzs7Ozs7SUNqaUJELFNBQVMsVUFBVTtRQUNqQixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBZ0IsQ0FBQztRQUNoRSxJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sb0JBQW9CLENBQUM7UUFDekMsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVMsV0FBVztRQUNsQixVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxTQUFTLFFBQVE7O1FBQ2YsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxNQUFBLElBQUksMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7SUFDaEMsQ0FBQztJQUVELE1BQWEsU0FBUztRQUNwQixVQUFVLENBQUMsTUFBaUI7WUFFMUIsTUFBTTtpQkFDSCxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtnQkFDOUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNwQixNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNyQixNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xCLFdBQVcsRUFBRSxDQUFDO2dCQUNkLFFBQVEsRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDO2lCQUNELE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDRDQUE0QyxFQUFFLENBQUMsQ0FBQztZQUV2RixNQUFNO1lBQ04sTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7O2dCQUN4QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxNQUFBLElBQUksMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbkMsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBQyxDQUFDLENBQUE7WUFFL0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUN4QixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBRTlELE1BQU0sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO2dCQUMzQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7Z0JBQzdDLElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFO29CQUMxQixNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDbkI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO2dCQUMzQyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO29CQUM3QixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3RCO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDbEIsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN0QjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBbERELDhCQWtEQzs7Ozs7SUNuRUQsU0FBZ0IsS0FBSyxDQUFDLElBQVk7UUFDOUIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQyxpQkFBZ0MsQ0FBQztJQUNoRCxDQUFDO0lBSkQsc0JBSUM7Ozs7O0lDREQsU0FBUyxTQUFTO1FBQ2hCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFnQixDQUFDO1FBQzlELHdDQUF3QztRQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDMUMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVMsU0FBUztRQUNoQixJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9CLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxTQUFTLFlBQVk7UUFDbkIsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxTQUFTLG1CQUFtQjtRQUMxQixNQUFNLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sa0JBQWtCLENBQUM7UUFDdEMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELFNBQVMsbUJBQW1CLENBQUMsUUFBdUM7UUFDbEUsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLGtCQUFrQixDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFhO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxrQkFBa0IsQ0FBQztRQUN0QyxJQUFJLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDbkQsSUFBSSxTQUFTLEtBQUssTUFBTTtZQUFFLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDekMsU0FBUyxHQUFHLFVBQVUsS0FBSyxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsU0FBUyxVQUFVLENBQUMsRUFBVSxFQUFFLEVBQVU7UUFDeEMsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUFFLE9BQU87WUFDNUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1lBQzVDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLGdCQUFnQixDQUFDLE1BQW1CLEVBQUUsRUFBVSxFQUFFLEVBQVU7UUFDbkUsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMxRCxJQUFJLGdCQUFnQixLQUFLLE1BQU07Z0JBQUUsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsRUFBRSxNQUFNLEVBQUUsT0FBTyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVFLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLFlBQVksQ0FBQyxNQUFtQixFQUFFLEtBQWE7UUFDdEQsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMxRCxJQUFJLGdCQUFnQixLQUFLLE1BQU07Z0JBQUUsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBQ3ZELE1BQU0sU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLGdCQUFnQixjQUFjLFNBQVMsS0FBSyxTQUFTLFlBQVksS0FBSyx3QkFBd0IsQ0FBQztRQUM3SCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsU0FBUyxzQkFBc0IsQ0FBQyxNQUFpQixFQUFFLEtBQWE7UUFDOUQsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzFELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQyxJQUFJLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztZQUN6QixJQUFJLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMxRCxJQUFJLGdCQUFnQixLQUFLLE1BQU07Z0JBQUUsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBQ3ZELGdFQUFnRTtZQUNoRSwrRUFBK0U7WUFDL0UsSUFBSSxxQkFBcUIsR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUMzRCxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcscUJBQXFCLENBQUM7WUFDdkUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUUvRCxJQUFJLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQzNHLElBQUksRUFBRSxHQUFHLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxjQUFjLENBQUM7WUFFN0csRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEIsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxnQkFBZ0IsY0FBYyxFQUFFLE1BQU0sRUFBRSxhQUFhLEtBQUssZUFBZSxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQ3pILENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFhLFNBQVM7UUFDcEIsVUFBVSxDQUFDLE1BQWlCO1lBQzFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsRUFBRSxDQUFDO1lBQzNCLE1BQU0sTUFBTSxHQUFHLFNBQVMsRUFBRSxDQUFDO1lBRTNCLElBQUksTUFBTSxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFLHdCQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFDLENBQUMsQ0FBQztnQkFDbEgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLHdCQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFDLENBQUMsQ0FBQztnQkFDeEcsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNoQixNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUV6RSxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFM0UsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakYsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsTUFBTSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRWhGLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLDRCQUE0QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixNQUFNLENBQUMsUUFBUSxDQUFDLDZCQUE2QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkYsTUFBTSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakYsTUFBTSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFFbkY7WUFFRCw2QkFBNkI7WUFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdGLE1BQU0sQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzRixNQUFNLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkcsTUFBTSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25HLE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUU5Rjs7OztlQUlHO1lBQ0g7Z0JBQ0UsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakYsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixNQUFNLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsUUFBUSxDQUFDLDRCQUE0QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixNQUFNLENBQUMsUUFBUSxDQUFDLDZCQUE2QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkYscUNBQXFDO2dCQUNyQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDOUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDcEY7WUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ2xELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEMsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7Z0JBQzNCLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxHQUNMLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDM0csTUFBTSxDQUFDLEdBQ0wscUJBQXFCLENBQUMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsS0FBSyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUM1RyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDMUQsSUFBSSxnQkFBZ0IsS0FBSyxNQUFNO29CQUFFLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztnQkFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDdEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsYUFBYSxFQUFFLE1BQU0sRUFBRSxPQUFPLGdCQUFnQixFQUFFLENBQUM7WUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0Y7SUFyRkQsOEJBcUZDO0lBRUQsU0FBUyxXQUFXLENBQUMsSUFBaUI7UUFDcEMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELE9BQU8sRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDM0csQ0FBQzs7Ozs7SUNwTEQsU0FBZ0IsSUFBSSxDQUFDLElBQVk7UUFDN0IsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNuQixPQUFvQixDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUpELG9CQUlDO0lBRUQsU0FBZ0Isd0JBQXdCLENBQUMsR0FBVztRQUNoRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU07WUFBRSxNQUFNLGlCQUFpQixDQUFDO1FBQ2pELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksUUFBUTtZQUFFLE1BQU0sMEJBQTBCLENBQUM7UUFDcEQsNEJBQTRCO1FBQzVCLEdBQUcsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFQRCw0REFPQztJQUVELFNBQWdCLFVBQVUsQ0FBQyxNQUFjLEVBQUUsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJOztRQUNoRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsTUFBQSxTQUFTLDBDQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUU7UUFDN0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUpELGdDQUlDO0lBRUQsU0FBZ0IsU0FBUyxDQUFDLEdBQVcsRUFBRSxFQUFXO1FBQzlDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDTCxFQUFFLEdBQUcsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFxQixDQUFDO1FBQ2pGLElBQUksS0FBSyxFQUFFO1lBQ1AsTUFBTSw4QkFBOEIsRUFBRSxRQUFRLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNuRTtRQUNELEtBQUssR0FBRyxVQUFVLENBQUMsYUFBYSxFQUFFLG9CQUFvQixHQUFHLFVBQVUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFxQixDQUFDO1FBQ3hHLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFWRCw4QkFVQztJQUVELFNBQWdCLGNBQWMsQ0FBQyxJQUFhLEVBQUUsU0FBaUI7UUFDM0QsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPO1FBQ3ZCLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUTtZQUFFLE9BQU8sQ0FBQyw2QkFBNkI7UUFDeEUsU0FBUzthQUNKLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQixPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFSRCx3Q0FRQzs7Ozs7SUN2Q0QsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0JYLENBQUM7SUFFRjs7T0FFRztJQUNILE1BQWEsT0FBTztRQUVoQixZQUFZLE9BQXFDO1lBQzdDLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRW5DLElBQUksY0FBYyxFQUFFO2dCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDN0M7UUFDTCxDQUFDO1FBRUQsVUFBVSxDQUFDLE9BQWUsRUFBRSxJQUFhLEVBQUUsUUFBaUI7WUFDeEQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxXQUFXLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUNsQyxxQkFBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksU0FBUyxDQUFDLENBQUM7WUFDL0MsV0FBVyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQTtRQUNyRCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQWlCO1lBQ3BCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUM7UUFFRCxLQUFLO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRU8sYUFBYTtZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDekYsQ0FBQztLQUNKO0lBdkNELDBCQXVDQzs7Ozs7SUNoRUQsTUFBYSxzQkFBc0I7UUFNakMsWUFBbUIsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNuQyxDQUFDO1FBTkQsVUFBVSxDQUFDLE1BQWlCO1lBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FHRjtJQVJELHdEQVFDOzs7OztJQ1JELE1BQWEsZUFBZTtRQUV4QixVQUFVLENBQUMsTUFBaUI7WUFDeEIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBcUIsQ0FBQztZQUM5RSxJQUFJLENBQUMsR0FBRztnQkFDSixPQUFPO1lBRVgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSx3R0FBd0csQ0FBQyxDQUFDO2dCQUNqSixJQUFJLENBQUMsR0FBRztvQkFDSixPQUFPO2dCQUNYLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ3pCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUNkLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUcsRUFBRTt3QkFDUCxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztvQkFDdkIsQ0FBQztpQkFDSixDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQ0o7SUFwQkQsMENBb0JDOzs7Ozs7O0lDUkQsU0FBUyxlQUFlLENBQUMsUUFBdUIsRUFBRSxLQUFrQjtRQUNsRSxJQUFJLE1BQU0sR0FBRyxJQUFJLG1DQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxPQUFPLE1BQW1CLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVMsa0JBQWtCLENBQUMsU0FBNEI7UUFDdEQsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLEdBQUcsR0FBRyxhQUFLLENBQUMsUUFBUSxPQUFPLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQXVCLENBQUM7SUFDMUUsQ0FBQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsTUFBaUIsRUFBRSxRQUF3QjtRQUNuRSwyREFBMkQ7UUFDM0QsTUFBTSxvQkFBb0IsR0FBd0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRixvQkFBb0IsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFPLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsR0FBRyxpQkFBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsU0FBZ0IsR0FBRztRQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBbUIsQ0FBQztRQUM1RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHO1lBQUUsTUFBTSxrQ0FBa0MsQ0FBQztRQUNuRCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbEMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQWdCLENBQUM7UUFDaEUsSUFBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUkscUJBQVMsRUFBRSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLHFCQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSwrQ0FBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxpQ0FBZSxFQUFFLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFZCxJQUFJLE9BQU8sR0FBRyxhQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUMxRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsV0FBVyxDQUNqQixhQUFLLENBQUMsNkZBQTZGLENBQUMsQ0FDckcsQ0FBQztRQUVGLFdBQUksQ0FBQyxnQkFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxHQUFHLGFBQUssQ0FDWCxlQUFlLE1BQU0sNkRBQTZELGdCQUFPLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUM1SCxDQUFDO1lBQ0YsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDL0IsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFtQixDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFdBQUksQ0FBQyxlQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEdBQUcsYUFBSyxDQUNYLGVBQWUsTUFBTSx1REFBdUQsZUFBSyxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FDcEgsQ0FBQztZQUNGLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQy9CLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBbUIsQ0FBQyxDQUFDO1lBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBd0IsQ0FBQztRQUM5RSxJQUFJLFNBQVMsRUFBRTtZQUNiLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtnQkFDaEIsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLElBQUksT0FBTyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQ3ZCLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzt3QkFDckQsSUFBSSxDQUFDLEdBQUcsYUFBSyxDQUNYLG9DQUFvQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLFFBQVEsTUFBTSxDQUFDLFNBQVMscUJBQXFCLENBQzNHLENBQUM7d0JBQ0YsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7NEJBQy9CLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFtQixDQUFDOzRCQUM5RCxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ3JDLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsSUFBSSxFQUFFLENBQUM7WUFDUCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQXFCLENBQUM7UUFDbkUsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtnQkFDM0MsSUFBSSxJQUFJLEdBQUcsTUFBTTtxQkFDZCxPQUFPLEVBQUU7cUJBQ1QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNiLElBQUksR0FBRyxvSUFBb0ksSUFBSSxxQkFBcUIsQ0FBQztnQkFDckssSUFBSSxHQUFHLEdBQUcsNkJBQTZCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQW5GRCxrQkFtRkMifQ==
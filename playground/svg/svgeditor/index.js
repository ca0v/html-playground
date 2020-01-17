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
define("fun/KeyboardShortcuts", ["require", "exports", "fun/keys"], function (require, exports, keys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // do not use Alt
    const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Control Delete End Enter Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Home Insert Minus PageUp PageDown Plus Shift Slash Space".split(" ");
    const isAtomic = (v) => 0 <= atomicTokens.indexOf(v);
    const isCompound = (v) => 0 < v.indexOf("|") && -1 === v.indexOf(" ");
    class ShortcutManager {
        constructor() {
            this.shortcuts = { ops: [], subkeys: {} };
            this.currentState = this.shortcuts;
            this.firstLetter = (word) => word[0];
            this.tokenize = (words) => words.split(/[ ]/).map(v => (isAtomic(v) ? v : isCompound(v) ? v : this.firstLetter(v).toUpperCase()));
            this.forceNode = (node, shortcuts) => {
                if (!shortcuts.length)
                    return node;
                const key = shortcuts.shift();
                if (typeof key === "undefined")
                    throw "key cannot be empty";
                node.subkeys[key] = node.subkeys[key] || { parent: node, subkeys: {}, ops: [] };
                return this.forceNode(node.subkeys[key], shortcuts);
            };
        }
        help(root) {
            const visitEach = (node, visit) => {
                visit(node);
                keys_1.keys(node.subkeys).forEach(key => visitEach(node.subkeys[key], visit));
            };
            let result = [];
            visitEach(root, node => {
                if (node.ops.length && node.title) {
                    result.push(node.title);
                }
            });
            return result.sort().join("\n");
        }
        watchKeyboard(root) {
            // move into keyboard shortcuts
            root.addEventListener("keydown", event => {
                if (event.altKey)
                    return; // reserved for the browser
                if (event.ctrlKey)
                    return; // app constrained not to use ctrl
                const map = {
                    " ": "Space",
                    "-": "Minus",
                    "+": "Plus",
                    "/": "Slash",
                };
                const key = map[event.key] || event.key;
                console.log("you pressed: ", key, event.code);
                let currentState = this.currentState;
                let nextState = this.findNode(currentState, key);
                if (nextState) {
                    console.log("continuation found");
                }
                else {
                    if (currentState.parent) {
                        console.log("scanning parent");
                        nextState = this.findNode(currentState.parent, key);
                        if (nextState) {
                            console.log("found by searching siblings");
                        }
                    }
                }
                if (!nextState) {
                    nextState = this.findNode(this.shortcuts, key);
                    if (nextState) {
                        console.log("found searching root keys");
                    }
                }
                if (!nextState) {
                    // suggest a key
                    console.log(this.help(this.shortcuts));
                    //if (false !== this.publish(event.code)) event.preventDefault();
                    return;
                }
                this.currentState = currentState = nextState;
                event.preventDefault();
                if (!currentState.ops.length) {
                    console.log("continue using: ", keys_1.keys(currentState.subkeys)
                        .map(k => {
                        const title = currentState.subkeys[k].title;
                        return !!title ? `${title}(${k})` : k + "";
                    })
                        .join(", "));
                    return;
                }
                console.log("executing ops: ", currentState);
                currentState.ops.forEach(cb => cb());
            });
        }
        // depth first
        findNode(node, shortcut) {
            if (!shortcut)
                return node;
            const shortcuts = isAtomic(shortcut)
                ? [shortcut]
                : isCompound(shortcut)
                    ? shortcut.split("|")
                    : [shortcut.toUpperCase()];
            let result = null;
            shortcuts.some(shortcut => (result = this._findNode(node, shortcut)));
            return result;
        }
        _findNode(node, shortcut) {
            if (node.subkeys[shortcut])
                return node.subkeys[shortcut];
            // does it exist in any child?
            let result = null;
            keys_1.keys(node.subkeys).some(key => (result = this._findNode(node.subkeys[key], shortcut)));
            return result;
        }
        registerShortcut(title, callback) {
            const tokens = this.tokenize(title);
            const node = this.forceNode(this.shortcuts, tokens);
            node.ops.push(callback);
            node.title = title;
            return node;
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
                this.hideCursor();
                this.setSourcePath(this.transformActiveCommand(location, options || { primary: true }).join(""));
                this.showMarkers();
            };
            const keyCommands = {
                Delete: () => this.deleteActiveCommand(),
                End: () => focus_1.focus(this.input.lastElementChild),
                Home: () => focus_1.focus(this.input.firstElementChild),
                F2: () => {
                    keyCommands["Enter"]();
                },
                "File Open": () => {
                    // open
                    let pathData = localStorage.getItem("path");
                    if (!pathData)
                        return;
                    this.setSourcePath(pathData);
                    this.renderEditor();
                    this.showMarkers();
                    focus_1.focus(this.input.children[0]);
                },
                "File New": () => {
                    this.setSourcePath("M 0 0 Z");
                    this.renderEditor();
                    this.showMarkers();
                    focus_1.focus(this.input.children[0]);
                },
                "File Save": () => localStorage.setItem("path", this.getSourcePath().join("\n")),
                Enter: () => this.editActiveCommand(),
                "Move ArrowDown": () => { var _a; return focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling); },
                "Move ArrowUp": () => { var _a; return focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling); },
                "Move 1 A": () => moveit({ dx: -1, dy: 0 }),
                "Move 1 C": () => moveit({ dx: 1, dy: 1 }),
                "Move 1 D": () => moveit({ dx: 1, dy: 0 }),
                "Move 1 E": () => moveit({ dx: 1, dy: -1 }),
                "Move 1 Q": () => moveit({ dx: -1, dy: -1 }),
                "Move 1 S": () => moveit({ dx: 0, dy: 1 }),
                "Move 1 W": () => moveit({ dx: 0, dy: -1 }),
                "Move 1 Z": () => moveit({ dx: -1, dy: 1 }),
                "Move 2 A": () => moveit({ dx: -1, dy: 0 }, { secondary: true }),
                "Move 2 D": () => moveit({ dx: 1, dy: 0 }, { secondary: true }),
                "Move 2 S": () => moveit({ dx: 0, dy: 1 }, { secondary: true }),
                "Move 2 W": () => moveit({ dx: 0, dy: -1 }, { secondary: true }),
                "Move 3 A": () => moveit({ dx: -1, dy: 0 }, { tertiary: true }),
                "Move 3 D": () => moveit({ dx: 1, dy: 0 }, { tertiary: true }),
                "Move 3 S": () => moveit({ dx: 0, dy: 1 }, { tertiary: true }),
                "Move 3 W": () => moveit({ dx: 0, dy: -1 }, { tertiary: true }),
            };
            this.keyCommands = keyCommands;
            keys_2.keys(keyCommands).forEach(phrase => this.shortcutManager.registerShortcut(phrase, keyCommands[phrase]));
            this.input.parentElement && this.shortcutManager.watchKeyboard(this.input.parentElement);
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
                because: (about) => {
                    node.title = about;
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
        publish(topic) {
            let subscribers = this.topics[topic];
            if (!subscribers) {
                console.log(topic);
                return false;
            }
            subscribers.forEach(subscriber => subscriber());
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
                console.log(event.code);
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
                .shortcut("Escape", () => {
                editor.hideCursor();
                editor.hideCommandEditor();
                editor.hideMarkers();
                editor.setActiveIndex(0);
                editor.showGrid();
                hideToolbar();
                hideHelp();
            })
                .because("get the editor closer to the initial state");
            // "?"
            editor.shortcut("Toggle Help", () => {
                var _a;
                let help = document.querySelector(".F1");
                (_a = help) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            });
            editor.shortcut("Toggle Toolbar", () => {
                getToolbar().classList.toggle("hidden");
            });
            editor.shortcut("Toggle GridLines", () => {
                if (editor.isGridVisible()) {
                    editor.hideGrid();
                }
                else {
                    editor.showGrid();
                }
            });
            editor.shortcut("Toggle Markers", () => {
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
            editor.shortcut("Escape", () => {
                layers.style.transform = "none";
            });
            if (bitmap) {
                editor.shortcut("Toggle Bitmap", () => { var _a; return (_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.toggle("digitizer"); });
                let scale = 1.01;
                editor.shortcut("Bitmap Move Plus", createScaler(bitmap, scale));
                editor.shortcut("Bitmap Move Minus", createScaler(bitmap, 1.0 / scale));
                scale = -1;
                editor.shortcut("Bitmap Move ArrowLeft 1", createTranslator(bitmap, -scale, 0));
                editor.shortcut("Bitmap Move ArrowRight 1", createTranslator(bitmap, scale, 0));
                editor.shortcut("Bitmap Move ArrowUp 1", createTranslator(bitmap, 0, -scale));
                editor.shortcut("Bitmap Move ArrowDown 1", createTranslator(bitmap, 0, scale));
                scale = 10;
                editor.shortcut("Bitmap Move ArrowLeft", createTranslator(bitmap, -scale, 0));
                editor.shortcut("Bitmap Move ArrowRight", createTranslator(bitmap, scale, 0));
                editor.shortcut("Bitmap Move ArrowUp", createTranslator(bitmap, 0, -scale));
                editor.shortcut("Bitmap Move ArrowDown", createTranslator(bitmap, 0, scale));
            }
            editor.shortcut("Path Insert ZReturn", () => editor.insertCommand({ command: "Z", args: [] }));
            editor.shortcut("Path Insert Move", () => editor.insertCommand({ command: "M", args: [] }));
            editor.shortcut("Path Insert Line", () => editor.insertCommand({ command: "L", args: [] }));
            editor.shortcut("Path Insert HorizontalLine", () => editor.insertCommand({ command: "H", args: [] }));
            editor.shortcut("Path Insert VerticalLine", () => editor.insertCommand({ command: "V", args: [] }));
            editor.shortcut("Path Insert Arc", () => editor.insertCommand({ command: "A", args: [] }));
            editor.shortcut("Path Insert SmoothCurve", () => editor.insertCommand({ command: "S", args: [] }));
            editor.shortcut("Path Insert Curve", () => editor.insertCommand({ command: "C", args: [] }));
            /**
             * Moves the digitizing area
             * control speeds things up, alt slows things down
             * alt=1, ctrl+alt=10 , ctrl=100
             */
            {
                let scale = -10;
                editor.shortcut("Canvas Move ArrowDown", createTranslator(layers, 0, scale));
                editor.shortcut("Canvas Move ArrowUp", createTranslator(layers, 0, -scale));
                editor.shortcut("Canvas Move ArrowLeft", createTranslator(layers, -scale, 0));
                editor.shortcut("Canvas Move ArrowRight", createTranslator(layers, scale, 0));
                scale = -1;
                editor.shortcut("Canvas Move 1 ArrowDown", createTranslator(layers, 0, scale));
                editor.shortcut("Canvas Move 1 ArrowUp", createTranslator(layers, 0, -scale));
                editor.shortcut("Canvas Move 1 ArrowLeft", createTranslator(layers, -scale, 0));
                editor.shortcut("Canvas Move 1 ArrowRight", createTranslator(layers, scale, 0));
            }
            // zoom about current cursor location
            editor.shortcut("Canvas Move Plus", createScaleAboutCursor(editor, 1.1));
            editor.shortcut("Canvas Move Minus", createScaleAboutCursor(editor, 1 / 1.1));
            editor.shortcut("Canvas Move 1 Plus", createScaleAboutCursor(editor, 1.01));
            editor.shortcut("Canvas Move 1 Minus", createScaleAboutCursor(editor, 1 / 1.01));
            editor.shortcut("Path Center", () => {
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
define("index", ["require", "exports", "data/marker", "data/icons", "fun/SvgEditorControl", "fun/CoreRules", "fun/asDom", "fun/stringify", "fun/Digitizer", "fun/keys", "fun/getPath"], function (require, exports, marker_1, icons_1, SvgEditorControl_1, CoreRules_1, asDom_1, stringify_3, Digitizer_1, keys_3, getPath_3) {
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
        editor.execute("File Open");
    }
    exports.run = run;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhL21hcmtlci50cyIsImRhdGEvaWNvbnMudHMiLCJmdW4vRGljdGlvbmFyeS50cyIsImZ1bi9Db21tYW5kLnRzIiwiZnVuL3N0cmluZ2lmeS50cyIsImZ1bi9wYXJzZS50cyIsImZ1bi9jcmVhdGVQYXRoLnRzIiwiZnVuL3BhcnNlUGF0aC50cyIsImZ1bi9mb2N1cy50cyIsImZ1bi9kcmF3WC50cyIsImZ1bi9kcmF3Q3Vyc29yLnRzIiwiZnVuL3NldFBhdGgudHMiLCJmdW4vZ2V0UGF0aC50cyIsImZ1bi9nZXRQYXRoQ29tbWFuZHMudHMiLCJmdW4vcmFuZ2UudHMiLCJmdW4vY3JlYXRlR3JpZC50cyIsImZ1bi9TdmdFZGl0b3IudHMiLCJmdW4vZ2V0TG9jYXRpb24udHMiLCJmdW4vY3JlYXRlU3ZnLnRzIiwiZnVuL2tleXMudHMiLCJmdW4vS2V5Ym9hcmRTaG9ydGN1dHMudHMiLCJmdW4vU3ZnRWRpdG9yQ29udHJvbC50cyIsImZ1bi9Db3JlUnVsZXMudHMiLCJmdW4vYXNEb20udHMiLCJmdW4vRGlnaXRpemVyLnRzIiwiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFBQSxPQUFTO1FBQ1AsT0FBTyxFQUFFOzs7Ozs7RUFNVDtRQUNBLE9BQU8sRUFBRTs7Ozs7Ozs7O0VBU1Q7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0VBY1Q7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXdCVDtRQUNBLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBd0JUO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7OztFQVFUO0tBQ0QsQ0FBQzs7OztJQzVGRixPQUFTO1FBQ1AsTUFBTSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUJSO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7RUFZVDtRQUNBLE9BQU8sRUFBRTs7Ozs7RUFLVDtRQUNBLElB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UUFDakMsUUFBUSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0UsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENB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Q0FBQyxFQUFFLENBQUM7Z0JBQzNDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUMzQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDaEUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUMvRCxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQy9ELFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNoRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDL0QsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUM5RCxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFD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Q0FBQyxDQUFDO29CQUNSLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUM1QyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7d0JBQ25CLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNsQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztxQkFDbkI7b0JBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO3dCQUNyQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ3BCO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxxQkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN0RixNQUFNO2lCQUNQO2dCQUNELEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ1IsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDMUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO3dCQUNuQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNuQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ2xCLENBQUMsSUFB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
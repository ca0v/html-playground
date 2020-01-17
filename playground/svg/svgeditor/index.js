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
    const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Delete End Enter F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Home Insert PageUp PageDOwn".split(" ");
    const isAtomic = (v) => 0 <= atomicTokens.indexOf(v);
    const isCompound = (v) => 0 < v.indexOf("|") && -1 === v.indexOf(" ");
    class ShortcutManager {
        constructor() {
            this.shortcuts = { ops: [], subkeys: {} };
            this.firstLetter = (word) => word[0];
            this.tokenize = (words) => words.split(/[ +]/).map(v => (isAtomic(v) ? v : isCompound(v) ? v : this.firstLetter(v).toUpperCase()));
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
            var _a, _b;
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
                Delete: () => {
                    this.deleteActiveCommand();
                },
                End: () => {
                    focus_1.focus(this.input.lastElementChild);
                },
                Home: () => {
                    focus_1.focus(this.input.firstElementChild);
                },
                Insert: () => {
                    this.insertBeforeActiveCommand();
                },
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
                ArrowDown: () => { var _a; return focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling); },
                ArrowUp: () => { var _a; return focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling); },
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
            const shortcuts = this.shortcutManager.shortcuts;
            let currentState = shortcuts;
            (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.addEventListener("keydown", event => {
                const key = event.key;
                console.log("you pressed: ", key);
                let nextState = this.shortcutManager.findNode(currentState, key);
                if (nextState) {
                    console.log("continuation found");
                }
                else {
                    if (currentState.parent) {
                        console.log("scanning parent");
                        nextState = this.shortcutManager.findNode(currentState.parent, key);
                        if (nextState) {
                            console.log("found by searching siblings");
                        }
                    }
                }
                if (!nextState) {
                    nextState = this.shortcutManager.findNode(shortcuts, key);
                    if (nextState) {
                        console.log("found searching root keys");
                    }
                }
                if (!nextState) {
                    if (false !== this.publish(event.code))
                        event.preventDefault();
                    return;
                }
                currentState = nextState;
                event.preventDefault();
                if (!currentState.ops.length) {
                    console.log("continue using: ", keys_2.keys(currentState.subkeys).join(" "));
                    return;
                }
                console.log("executing ops: ", currentState);
                currentState.ops.forEach(cb => cb());
            });
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
                    this.shortcutManager.registerShortcut(about, callback);
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
        insertBeforeActiveCommand() {
            let index = this.currentIndex;
            let path = this.getSourcePath();
            let command = { command: "m", args: [0, 0] };
            path.splice(index, 0, stringify_2.stringify(command));
            this.setSourcePath(path.join("\n"));
            this.renderEditor();
            focus_1.focus(this.input.children[index]);
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
            editor.subscribe("Escape", () => {
                editor.hideCursor();
                editor.hideCommandEditor();
                editor.hideMarkers();
                editor.setActiveIndex(0);
                editor.showGrid();
                hideToolbar();
                hideHelp();
            }).because("get the editor closer to the initial state");
            // "?"
            editor.subscribe("ShiftRight+Slash", () => {
                var _a;
                let help = document.querySelector(".F1");
                (_a = help) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            });
            editor.subscribe("AltLeft+ControlLeft+KeyT", () => {
                getToolbar().classList.toggle("hidden");
            }).because("toggle toolbar");
            editor.subscribe("AltLeft+ControlLeft+KeyG", () => {
                if (editor.isGridVisible()) {
                    editor.hideGrid();
                }
                else {
                    editor.showGrid();
                }
            }).because("toggle grid lines");
            editor.subscribe("AltLeft+ControlLeft+KeyM", () => {
                if (editor.isMarkersVisible()) {
                    editor.hideMarkers();
                }
                else {
                    editor.showGrid();
                    editor.showMarkers();
                }
            }).because("toggle markers");
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
define("fun/Digitizer", ["require", "exports", "fun/keys"], function (require, exports, keys_3) {
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
        return document.querySelector(".svgeditor.digitizer .layers .pixels-to-digitize");
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
    function createTranslator(dx, dy) {
        return () => {
            let layers = getLayers();
            let currentTransform = getComputedStyle(layers).transform;
            if (currentTransform === "none")
                currentTransform = "";
            layers.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
        };
    }
    function createScaler(scale) {
        return () => {
            let layers = getLayers();
            let currentTransform = getComputedStyle(layers).transform;
            if (currentTransform === "none")
                currentTransform = "";
            const restoreDx = 100 * (0.5 * scale);
            layers.style.transform = `${currentTransform} translate(${restoreDx}%,${restoreDx}%) scale(${scale}) translate(-50%,-50%)`;
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
            let dx = layerLocationInPixels.x + (cursorLocationInViewport.x - viewBox.x) * pixelWidth / viewPortWidth;
            let dy = layerLocationInPixels.y + (cursorLocationInViewport.y - viewBox.y) * pixelHeight / viewPortHeight;
            dx = Math.round(dx);
            dy = Math.round(dy);
            layers.style.transform = `${currentTransform} translate(${dx}px,${dy}px) scale(${scale}) translate(${-dx}px,${-dy}px)`;
        };
    }
    class Digitizer {
        initialize(editor) {
            editor.subscribe("Escape", () => {
                getLayers().style.transform = "none";
            });
            editor.subscribe("KeyD+ShiftLeft", () => {
                var _a;
                (_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.toggle("digitizer");
            });
            editor.subscribe("NumpadAdd+ShiftLeft", () => {
                zoomInPixels(1.01);
            });
            editor.subscribe("NumpadSubtract+ShiftLeft", () => {
                zoomInPixels(1.0 / 1.01);
            });
            editor.subscribe("ArrowLeft+ShiftLeft", createMove(1, 0));
            editor.subscribe("ArrowRight+ShiftLeft", createMove(-1, 0));
            editor.subscribe("ArrowUp+ShiftLeft", createMove(0, 1));
            editor.subscribe("ArrowDown+ShiftLeft", createMove(0, -1));
            const movers = {
                "ArrowLeft+ControlLeft+ShiftLeft": [10, 0],
                "ArrowRight+ControlLeft+ShiftLeft": [-10, 0],
                "ArrowUp+ControlLeft+ShiftLeft": [0, 10],
                "ArrowDown+ControlLeft+ShiftLeft": [0, -10],
            };
            keys_3.keys(movers).forEach(key => {
                let [dx, dy] = movers[key];
                editor.subscribe(key, createMove(dx, dy));
            });
            editor.subscribe("ShiftLeft+Space", () => {
                editor.insertCommand({ command: "Z", args: [] });
            });
            editor.subscribe("Space", () => {
                editor.insertCommand({ command: "M", args: [] });
            });
            editor.subscribe("Digit1", () => {
                editor.insertCommand({ command: "L", args: [] });
            });
            editor.subscribe("Minus", () => {
                editor.insertCommand({ command: "H", args: [] });
            });
            editor.subscribe("Digit2", () => {
                editor.insertCommand({ command: "V", args: [] });
            });
            editor.subscribe("Digit4", () => {
                editor.insertCommand({ command: "A", args: [] });
            });
            editor.subscribe("Digit3", () => {
                editor.insertCommand({ command: "S", args: [] });
            });
            /**
             * Moves the digitizing area
             * control speeds things up, alt slows things down
             * alt=1, ctrl+alt=10 , ctrl=100
             */
            {
                let scale = -10;
                editor.subscribe("AltLeft+ControlLeft+Numpad2", createTranslator(0, scale));
                editor.subscribe("AltLeft+ControlLeft+Numpad8", createTranslator(0, -scale));
                editor.subscribe("AltLeft+ControlLeft+Numpad4", createTranslator(-scale, 0));
                editor.subscribe("AltLeft+ControlLeft+Numpad6", createTranslator(scale, 0));
                scale = -100;
                editor.subscribe("ControlLeft+Numpad2", createTranslator(0, scale));
                editor.subscribe("ControlLeft+Numpad8", createTranslator(0, -scale));
                editor.subscribe("ControlLeft+Numpad4", createTranslator(-scale, 0));
                editor.subscribe("ControlLeft+Numpad6", createTranslator(scale, 0));
                scale = -1;
                editor.subscribe("AltLeft+Numpad2", createTranslator(0, scale));
                editor.subscribe("AltLeft+Numpad8", createTranslator(0, -scale));
                editor.subscribe("AltLeft+Numpad4", createTranslator(-scale, 0));
                editor.subscribe("AltLeft+Numpad6", createTranslator(scale, 0));
            }
            // zoom about current cursor location
            editor.subscribe("AltLeft+ControlLeft+NumpadAdd", createScaleAboutCursor(editor, 1.01));
            editor.subscribe("AltLeft+ControlLeft+NumpadSubtract", createScaleAboutCursor(editor, 1 / 1.01));
            editor.subscribe("AltLeft+NumpadAdd", createScaler(1.01));
            editor.subscribe("AltLeft+NumpadSubtract", createScaler(1 / 1.01));
            editor.subscribe("KeyC", () => {
                const cursorLocation = editor.getCursorLocation();
                const viewBox = editor.getViewbox();
                const layers = getLayers();
                const layerLocationInPixels = layers.getBoundingClientRect();
                const x = layerLocationInPixels.x + layerLocationInPixels.width * (cursorLocation.x - viewBox.x) / viewBox.width;
                const y = layerLocationInPixels.y + layerLocationInPixels.width * (cursorLocation.y - viewBox.y) / viewBox.height;
                const cx = getPosition(layers).x + getPosition(layers).width / 2;
                const cy = getPosition(layers).y + getPosition(layers).height / 2;
                const dx = cx - x;
                const dy = cy - y;
                let currentTransform = getComputedStyle(layers).transform;
                if (currentTransform === "none")
                    currentTransform = "";
                console.log(cursorLocation.x, viewBox.x, x, cx, dx, currentTransform);
                layers.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
            }).because("camera center at current location");
        }
    }
    exports.Digitizer = Digitizer;
    function getPosition(node) {
        let { left, top, width, height } = getComputedStyle(node);
        return { x: parseFloat(left), y: parseFloat(top), width: parseFloat(width), height: parseFloat(height) };
    }
});
define("index", ["require", "exports", "data/marker", "data/icons", "fun/SvgEditorControl", "fun/CoreRules", "fun/asDom", "fun/stringify", "fun/Digitizer", "fun/keys", "fun/getPath"], function (require, exports, marker_1, icons_1, SvgEditorControl_1, CoreRules_1, asDom_1, stringify_3, Digitizer_1, keys_4, getPath_3) {
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
        keys_4.keys(marker_1.default).forEach(marker => {
            let b = asDom_1.asDom(`<button id="${marker}" class="F1 marker"><svg viewBox="-18 -18 36 36"><path d="${marker_1.default[marker]}"></path></svg></button>`);
            toolbar.appendChild(b);
            b.addEventListener("click", () => {
                insertIntoEditor(editor, b.querySelector("path"));
            });
        });
        keys_4.keys(icons_1.default).forEach(marker => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhL21hcmtlci50cyIsImRhdGEvaWNvbnMudHMiLCJmdW4vRGljdGlvbmFyeS50cyIsImZ1bi9Db21tYW5kLnRzIiwiZnVuL3N0cmluZ2lmeS50cyIsImZ1bi9wYXJzZS50cyIsImZ1bi9jcmVhdGVQYXRoLnRzIiwiZnVuL3BhcnNlUGF0aC50cyIsImZ1bi9mb2N1cy50cyIsImZ1bi9kcmF3WC50cyIsImZ1bi9kcmF3Q3Vyc29yLnRzIiwiZnVuL3NldFBhdGgudHMiLCJmdW4vZ2V0UGF0aC50cyIsImZ1bi9nZXRQYXRoQ29tbWFuZHMudHMiLCJmdW4vcmFuZ2UudHMiLCJmdW4vY3JlYXRlR3JpZC50cyIsImZ1bi9TdmdFZGl0b3IudHMiLCJmdW4vZ2V0TG9jYXRpb24udHMiLCJmdW4vY3JlYXRlU3ZnLnRzIiwiZnVuL2tleXMudHMiLCJmdW4vS2V5Ym9hcmRTaG9ydGN1dHMudHMiLCJmdW4vU3ZnRWRpdG9yQ29udHJvbC50cyIsImZ1bi9Db3JlUnVsZXMudHMiLCJmdW4vYXNEb20udHMiLCJmdW4vRGlnaXRpemVyLnRzIiwiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFBQSxPQUFTO1FBQ1AsT0FBTyxFQUFFOzs7Ozs7RUFNVDtRQUNBLE9BQU8sRUFBRTs7Ozs7Ozs7O0VBU1Q7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0VBY1Q7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXdCVDtRQUNBLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBd0JUO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7OztFQVFUO0tBQ0QsQ0FBQzs7OztJQzVGRixPQUFTO1FBQ1AsTUFBTSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUJSO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7RUFZVDtRQUNBLE9BQU8sRUFBRTs7Ozs7RUFLVDtRQUNBLElB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UUFDakMsUUFBUSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0UsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0UsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDUixPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztvQkFDbkQsQ0FBQztnQkFDSCxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2pFO1NBQ0Y7SUFDSCxDQUFDO0lBcEJELGtDQW9CQzs7Ozs7SUNyQkQsU0FBZ0IsU0FBUztRQUN2QixPQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUZELDhCQUVDOzs7OztJQ0ZELFNBQWdCLElBQUksQ0FBSSxDQUFJO1FBQzFCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQTBCLENBQUM7SUFDakQsQ0FBQztJQUZELG9CQUVDOzs7OztJQ0NELE1BQU0sWUFBWSxHQUFHLDRIQUE0SCxDQUFDLEtBQUssQ0FDckosR0FBRyxDQUNKLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFXOUUsTUFBYSxlQUFlO1FBQTVCO1lBQ2tCLGNBQVMsR0FBcUIsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUMvRCxnQkFBVyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsYUFBUSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FDbkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFbEcsY0FBUyxHQUFHLENBQUMsSUFBc0IsRUFBRSxTQUFtQixFQUFvQixFQUFFO2dCQUNwRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBQ25DLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXO29CQUFFLE1BQU0scUJBQXFCLENBQUM7Z0JBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ2hGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQztRQThCSixDQUFDO1FBNUJDLGNBQWM7UUFDUCxRQUFRLENBQUMsSUFBc0IsRUFBRSxRQUFnQjtZQUN0RCxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUMzQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7b0JBQ3RCLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFFN0IsSUFBSSxNQUFNLEdBQTRCLElBQUksQ0FBQztZQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFTyxTQUFTLENBQUMsSUFBc0IsRUFBRSxRQUFnQjtZQUN4RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRCw4QkFBOEI7WUFDOUIsSUFBSSxNQUFNLEdBQTRCLElBQUksQ0FBQztZQUMzQyxXQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVNLGdCQUFnQixDQUFDLEtBQWEsRUFBRSxRQUFvQjtZQUN6RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO0tBQ0Y7SUExQ0QsMENBMENDOzs7OztJQ3pDRCxTQUFTLFFBQVEsQ0FBQyxXQUEwQjtRQUMxQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzFELElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNwRCxPQUFPLEtBQUssR0FBRyxZQUFZLENBQUM7SUFDOUIsQ0FBQztJQUVELE1BQWEsZ0JBQWdCO1FBZ0UzQixZQUFtQixRQUF1QixFQUFTLEtBQWtCOztZQUFsRCxhQUFRLEdBQVIsUUFBUSxDQUFlO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBYTtZQS9EN0QsV0FBTSxHQUFrQyxFQUFFLENBQUM7WUEyRDNDLGlCQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEIsZ0JBQVcsR0FBeUMsRUFBRSxDQUFDO1lBQ3ZELG9CQUFlLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7WUFHOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQW1CLENBQUM7WUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUFFLE1BQU0sMkJBQTJCLENBQUM7WUFFeEQsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVMsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDekUsTUFBQSxRQUFRLENBQUMsYUFBYSwwQ0FBRSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUV0RCxrRUFBa0U7WUFDbEUsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBVSxDQUFDO2dCQUN6QixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixNQUFNLEVBQUUsZ0JBQWdCO2dCQUN4QixjQUFjLEVBQUUsS0FBSzthQUN0QixDQUFDLENBQUM7WUFFSCxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNmLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNsRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFVCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsdUJBQVUsQ0FBQztnQkFDM0IsTUFBTSxFQUFFLGdCQUFnQjtnQkFDeEIsY0FBYyxFQUFFLEtBQUs7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlDLE1BQU0sTUFBTSxHQUFHLENBQ2IsUUFBb0MsRUFDcEMsT0FBd0UsRUFDeEUsRUFBRTtnQkFDRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JCLENBQUMsQ0FBQztZQUVGLE1BQU0sV0FBVyxHQUEyQjtnQkFDMUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDWCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQztnQkFDRCxHQUFHLEVBQUUsR0FBRyxFQUFFO29CQUNSLGFBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRTtvQkFDVCxhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUNELE1BQU0sRUFBRSxHQUFHLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsRUFBRSxFQUFFLEdBQUcsRUFBRTtvQkFDUCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztnQkFDRCxXQUFXLEVBQUUsR0FBRyxFQUFFO29CQUNoQixPQUFPO29CQUNQLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxRQUFRO3dCQUFFLE9BQU87b0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDRCxVQUFVLEVBQUUsR0FBRyxFQUFFO29CQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDRCxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEYsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDckMsU0FBUyxFQUFFLEdBQUcsRUFBRSxXQUFDLE9BQUEsYUFBSyxPQUFDLFFBQVEsQ0FBQyxhQUFhLDBDQUFFLGtCQUFrQixDQUFDLENBQUEsRUFBQTtnQkFDbEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxXQUFDLE9BQUEsYUFBSyxPQUFDLFFBQVEsQ0FBQyxhQUFhLDBDQUFFLHNCQUFzQixDQUFDLENBQUEsRUFBQTtnQkFDcEUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQzNDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDMUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUMxQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUMxQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQzNDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNoRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQy9ELFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDL0QsVUFBVSxFQUFFLEdBQUcsRUFBRSxD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
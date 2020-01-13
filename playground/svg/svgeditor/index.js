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
Z`
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
            if (ch >= "A" && ch <= "Z") {
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
    function drawCursor(location, scale = 1) {
        let { x, y } = location;
        return `M ${x} ${y} l -5 -5 l 10 10 l -5 -5 l 5 -5 l -10 10 z`;
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
    function createGrid(gridOverlay, count, offset, dx) {
        let { x, y, width, height } = gridOverlay.viewBox.baseVal;
        let vLines = range_1.range(count).map(v => `M ${x + offset + dx * v} ${x} V ${y + height}`).join("\n");
        let hLines = range_1.range(count).map(v => `M ${x} ${y + offset + dx * v} H ${x + width}`).join("\n");
        let path = createPath_1.createPath({
            stroke: "rgba(128,128,128,0.5)",
            "stroke-width": "0.1"
        });
        setPath_1.setPath(path, `${vLines}\n${hLines}`);
        gridOverlay.appendChild(path);
    }
    exports.createGrid = createGrid;
});
define("fun/SvgEditor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("svgeditor", ["require", "exports", "fun/stringify", "fun/parse", "fun/createPath", "fun/parsePath", "fun/focus", "fun/drawX", "fun/drawCursor", "fun/setPath", "fun/getPathCommands", "fun/createGrid"], function (require, exports, stringify_2, parse_1, createPath_2, parsePath_2, focus_1, drawX_1, drawCursor_1, setPath_2, getPathCommands_1, createGrid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SvgEditorControl {
        constructor(workview, input) {
            var _a, _b;
            this.workview = workview;
            this.input = input;
            this.topics = {};
            this.currentIndex = -1;
            this.sourcePath = this.workview.querySelector("path");
            if (!this.sourcePath)
                throw "workview must have a path";
            let { x, y, width, height } = workview.viewBox.baseVal;
            this.gridOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
            (_a = workview.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(this.gridOverlay);
            this.workPath = createPath_2.createPath({
                fill: "rgb(0,255,128)",
                stroke: "rgb(0,255,128)",
                "stroke-width": "0.2",
            });
            this.gridOverlay.appendChild(this.workPath);
            this.createGrid();
            this.cursorPath = createPath_2.createPath({
                stroke: "rgb(0, 255, 0)",
                "stroke-width": "0.2",
            });
            this.gridOverlay.appendChild(this.cursorPath);
            let keystate = {};
            input.addEventListener("keyup", event => {
                keystate[event.code] = false;
            });
            const moveit = (location) => {
                setPath_2.setPath(this.sourcePath, this.transformActiveCommand(location).join(""));
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
                F5: () => {
                    // open
                    let pathData = localStorage.getItem("path");
                    if (!pathData)
                        return;
                    setPath_2.setPath(this.sourcePath, pathData);
                    this.renderEditor();
                    this.showMarkers();
                    focus_1.focus(this.input.children[0]);
                },
                F11: () => {
                    // save
                    localStorage.setItem("path", this.getSourcePath().join("\n"));
                },
                Enter: () => {
                    this.editActiveCommand();
                },
                ArrowDown: () => {
                    var _a;
                    focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling);
                },
                "ArrowDown+ControlLeft": () => {
                    keyCommands["KeyS"]();
                },
                "ArrowLeft+ControlLeft": () => {
                    keyCommands["KeyA"]();
                },
                "ArrowRight+ControlLeft": () => {
                    keyCommands["KeyD"]();
                },
                ArrowUp: () => {
                    var _a;
                    focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling);
                },
                "ArrowUp+ControlLeft": () => {
                    keyCommands["KeyW"]();
                },
                KeyA: () => {
                    moveit({ dx: -1, dy: 0 });
                },
                "KeyA+KeyS": () => {
                    moveit({ dx: -1, dy: 1 });
                },
                "KeyA+KeyW": () => {
                    moveit({ dx: -1, dy: -1 });
                },
                KeyD: () => {
                    moveit({ dx: 1, dy: 0 });
                },
                "KeyD+KeyS": () => {
                    moveit({ dx: 1, dy: 1 });
                },
                "KeyD+KeyW": () => {
                    moveit({ dx: 1, dy: -1 });
                },
                KeyS: () => {
                    moveit({ dx: 0, dy: 1 });
                },
                KeyW: () => {
                    moveit({ dx: 0, dy: -1 });
                },
            };
            (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.addEventListener("keydown", event => {
                if (event.code === "Escape")
                    keystate = {};
                keystate[event.code] = true;
                let code = Object.keys(keystate)
                    .filter(k => keystate[k])
                    .sort()
                    .join("+");
                if (keyCommands[code]) {
                    keyCommands[code]();
                    event.preventDefault();
                    return;
                }
                else {
                    this.publish(code);
                }
            });
        }
        use(rule) {
            rule.initialize(this);
            return this;
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
        publish(topic) {
            let subscribers = this.topics[topic];
            if (!subscribers) {
                console.log(topic);
                return;
            }
            subscribers.forEach(subscriber => subscriber());
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
        insertBeforeActiveCommand() {
            let index = this.currentIndex;
            let path = this.getSourcePath();
            let command = { command: "m", args: [0, 0] };
            path.splice(index, 0, stringify_2.stringify(command));
            setPath_2.setPath(this.sourcePath, path.join("\n"));
            this.renderEditor();
            focus_1.focus(this.input.children[index]);
        }
        deleteActiveCommand() {
            var _a, _b;
            let index = this.currentIndex;
            let path = this.getSourcePath();
            path.splice(index, 1);
            setPath_2.setPath(this.sourcePath, path.join("\n"));
            let nextFocusItem = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) || ((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.previousElementSibling);
            this.input.children[index].remove();
            focus_1.focus(nextFocusItem);
        }
        replaceActiveCommand(commandText) {
            let index = this.currentIndex;
            let command = parse_1.parse(commandText);
            let path = this.getSourcePath();
            path[index] = stringify_2.stringify(command);
            setPath_2.setPath(this.sourcePath, path.join("\n"));
        }
        transformActiveCommand(translate) {
            let index = this.currentIndex;
            let path = this.getSourcePath();
            if (!path)
                throw "use targetPath";
            let command = parse_1.parse(path[index]);
            switch (command.command) {
                case "A": {
                    let [rx, ry, a, b, cw, x, y] = command.args;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_2.stringify({ command: command.command, args: [rx, ry, a, b, cw, x, y] });
                    setPath_2.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
                    break;
                }
                case "C": {
                    let [ax, ay, bx, by, x, y] = command.args;
                    ax += translate.dx;
                    ay += translate.dy;
                    bx += translate.dx;
                    by += translate.dy;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_2.stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
                    setPath_2.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
                    break;
                }
                case "S": {
                    let [bx, by, x, y] = command.args;
                    bx += translate.dx;
                    by += translate.dy;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_2.stringify({ command: command.command, args: [bx, by, x, y] });
                    setPath_2.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
                    break;
                }
                case "L":
                case "M":
                case "T": {
                    let [x, y] = command.args;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_2.stringify({ command: command.command, args: [x, y] });
                    setPath_2.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
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
            let command = parse_1.parse(path[index]);
            switch (command.command) {
                case "A": {
                    let [rx, ry, a, b, cw, x, y] = command.args;
                    setPath_2.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
                    break;
                }
                case "C":
                case "L":
                case "M":
                case "S":
                case "T": {
                    let [x, y] = command.args;
                    setPath_2.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
                    break;
                }
            }
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
            createGrid_1.createGrid(this.gridOverlay, 10, 10, 20);
            createGrid_1.createGrid(this.gridOverlay, 20, 0, 10);
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
                        priorLocation.x = x;
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
                        priorLocation.y = y;
                        path.push(priorLocation);
                        break;
                    }
                    case "Z": {
                        break;
                    }
                    default: {
                        console.warn("ignored: ", command);
                    }
                }
            });
            return path.map(p => drawX_1.drawX(p, { scale: 0.5 }));
        }
    }
    exports.SvgEditorControl = SvgEditorControl;
});
define("fun/CoreRules", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CoreRules {
        initialize(editor) {
            // "?"
            editor.subscribe("ShiftRight+Slash", () => {
                var _a;
                let help = document.querySelector(".F1");
                (_a = help) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            });
            editor.subscribe("KeyT", () => {
                let toolbar = document.querySelector(".toolbar");
                if (!toolbar)
                    return;
                toolbar.classList.toggle("hidden");
            });
            editor.subscribe("Escape", () => {
                editor.hideCursor();
                editor.hideCommandEditor();
                editor.hideMarkers();
                editor.setActiveIndex(0);
            });
            editor.subscribe("KeyG", () => {
                if (editor.isGridVisible()) {
                    editor.hideGrid();
                }
                else {
                    editor.showGrid();
                }
            });
            editor.subscribe("KeyM", () => {
                if (editor.isMarkersVisible()) {
                    editor.hideMarkers();
                }
                else {
                    editor.showGrid();
                    editor.showMarkers();
                }
            });
            editor.subscribe("NumpadAdd", () => {
                let layers = document.querySelector(".layers");
                let currentScale = getComputedStyle(layers).transform;
                if (currentScale === "none")
                    currentScale = "";
                layers.style.transform = `${currentScale} translate(100%,100%) scale(2) translate(-50%,-50%)`;
                // zoom 2x
                // translate(100%,100%) scale(2) translate(-50%,-50%)
                // zoom 3x
                // translate(150%,150%) scale(3) translate(-50%,-50%)
            });
            editor.subscribe("NumpadSubtract", () => {
                let layers = document.querySelector(".layers");
                let currentScale = getComputedStyle(layers).transform;
                if (currentScale === "none")
                    currentScale = "";
                // inverse zoom-in
                layers.style.transform = `${currentScale} translate(50%, 50%) scale(0.5) translate(-100%,-100%)`;
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
define("index", ["require", "exports", "data/marker", "svgeditor", "fun/CoreRules", "fun/asDom"], function (require, exports, marker_1, svgeditor_1, CoreRules_1, asDom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    marker_1 = __importDefault(marker_1);
    function keys(o) {
        return Object.keys(o);
    }
    function createSvgEditor(workview, input) {
        let editor = new svgeditor_1.SvgEditorControl(workview, input);
        return editor;
    }
    function pasteFromClipboard(clipboard) {
        let svgText = clipboard.value.trim();
        let svg = asDom_1.asDom(`<svg>${svgText}</svg>`);
        console.log(svg.innerHTML);
        return Array.from(svg.querySelectorAll("symbol"));
    }
    function run() {
        let path = document.querySelector("path");
        let svg = path.ownerSVGElement;
        if (!svg)
            throw "path must be in an svg container";
        path.setAttribute("d", marker_1.default.marker5);
        let input = document.getElementById("svg-input");
        let editor = createSvgEditor(svg, input);
        editor.use(new CoreRules_1.CoreRules());
        editor.show();
        let toolbar = asDom_1.asDom(`<div class="toolbar hidden"></div>`);
        document.body.appendChild(toolbar);
        toolbar.appendChild(asDom_1.asDom(`<button class="F1"><svg viewBox="-18 -18 36 36"><use href="#svg-path"></use></svg></button>`));
        keys(marker_1.default).forEach(marker => {
            let b = asDom_1.asDom(`<button id="${marker}" class="F1"><svg viewBox="-18 -18 36 36"><path d="${marker_1.default[marker]}"></path></svg></button>`);
            toolbar.appendChild(b);
            b.addEventListener("click", () => {
                path.setAttribute("d", marker_1.default[marker]);
                editor.show();
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
                            var _a;
                            let pathData = symbol.querySelector("path");
                            path.setAttribute("d", (_a = pathData.getAttribute("d"), (_a !== null && _a !== void 0 ? _a : "")));
                            editor.show();
                        });
                    });
                }
            };
            doit();
            clipboard.addEventListener("change", doit);
        }
    }
    exports.run = run;
});

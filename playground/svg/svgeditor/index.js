define("data/marker", ["require", "exports"], function (require, exports) {
    "use strict";
    return {
        marker1: `M 6.3 0
C 6.3 0 0 0.1 0 7.5
C 0 11.3 6.3 20.1 6.3 20.1
S 12.6 11.3 12.6 7.4
C 12.6 0.1 6.3 0 6.3 0
Z`,
        marker2: `M 30 0
L 24 -15
L 29 -20
L 31 -20
T 36 -15
L 30 0
Z`,
        marker3: `M -20 0
A 1 15 0 0 1 -20 -20
A 10 5 0 0 1 -20 0
Z
M -50 0
A 15 10 0 0 1 -70 0
A 5 10 0 0 1 -50 0
Z`
    };
});
define("fun/range", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function range(n) {
        return Array(n).fill(0).map((v, i) => i);
    }
    exports.range = range;
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
    function stringify(command) {
        return `${command.command} ${command.args.join(" ")}`;
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
    function drawX(location) {
        let { x, y } = location;
        return `M ${x} ${y} l ` + `-1 -1 l 2 2 l -1 -1 l 1 -1 l -2 2 z`;
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
define("index", ["require", "exports", "fun/range", "fun/stringify", "fun/parse", "fun/createPath", "fun/parsePath", "fun/focus", "fun/drawX", "fun/drawCursor", "fun/setPath", "fun/getPathCommands", "data/marker"], function (require, exports, range_1, stringify_2, parse_1, createPath_1, parsePath_2, focus_1, drawX_1, drawCursor_1, setPath_1, getPathCommands_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SvgEditor {
        constructor(workview, input) {
            var _a;
            this.workview = workview;
            this.input = input;
            this.currentIndex = -1;
            this.sourcePath = this.workview.querySelector("path");
            if (!this.sourcePath)
                throw "workview must have a path";
            let { x, y, width, height } = workview.viewBox.baseVal;
            this.gridOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
            (_a = workview.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(this.gridOverlay);
            this.workPath = createPath_1.createPath({
                "fill": "rgb(0,255,128)",
                "stroke": "rgb(0,255,128)",
                "stroke-width": "0.5"
            });
            this.gridOverlay.appendChild(this.workPath);
            this.showGrid();
            this.cursorPath = createPath_1.createPath({
                stroke: "rgb(0, 255, 0)",
                "stroke-width": "0.2",
            });
            this.gridOverlay.appendChild(this.cursorPath);
            let keystate = {};
            input.addEventListener("keyup", event => {
                keystate[event.code] = false;
            });
            const moveit = (location) => {
                setPath_1.setPath(this.sourcePath, this.transformActiveCommand(location).join(""));
                this.showMarkers();
            };
            const keyCommands = {
                "Delete": () => {
                    this.deleteActiveCommand();
                },
                "Insert": () => {
                    this.insertBeforeActiveCommand();
                },
                "F2": () => {
                    keyCommands["Enter"]();
                },
                "Enter": () => {
                    this.editActiveCommand();
                },
                "ArrowDown": () => {
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
                "ArrowUp": () => {
                    var _a;
                    focus_1.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling);
                },
                "ArrowUp+ControlLeft": () => {
                    keyCommands["KeyW"]();
                },
                "KeyA": () => {
                    moveit({ dx: -1, dy: 0 });
                },
                "KeyA+KeyS": () => {
                    moveit({ dx: -1, dy: 1 });
                },
                "KeyA+KeyW": () => {
                    moveit({ dx: -1, dy: -1 });
                },
                "KeyD": () => {
                    moveit({ dx: 1, dy: 0 });
                },
                "KeyD+KeyS": () => {
                    moveit({ dx: 1, dy: 1 });
                },
                "KeyD+KeyW": () => {
                    moveit({ dx: 1, dy: -1 });
                },
                "KeyS": () => {
                    moveit({ dx: 0, dy: 1 });
                },
                "KeyW": () => {
                    moveit({ dx: 0, dy: -1 });
                },
            };
            input.addEventListener("keydown", event => {
                if (event.code === "Escape")
                    keystate = {};
                keystate[event.code] = true;
                let code = Object.keys(keystate).filter(k => keystate[k]).sort().join("+");
                if (keyCommands[code]) {
                    keyCommands[code]();
                    event.preventDefault();
                    return;
                }
                else {
                    console.log(event.code, code);
                }
            });
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
            input.onkeydown = (event) => {
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
            setPath_1.setPath(this.sourcePath, path.join("\n"));
            this.renderEditor();
            focus_1.focus(this.input.children[index]);
        }
        deleteActiveCommand() {
            var _a, _b;
            let index = this.currentIndex;
            let path = this.getSourcePath();
            path.splice(index, 1);
            setPath_1.setPath(this.sourcePath, path.join("\n"));
            let nextFocusItem = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) || ((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.previousElementSibling);
            this.input.children[index].remove();
            focus_1.focus(nextFocusItem);
        }
        replaceActiveCommand(commandText) {
            let index = this.currentIndex;
            let command = parse_1.parse(commandText);
            let path = this.getSourcePath();
            path[index] = stringify_2.stringify(command);
            setPath_1.setPath(this.sourcePath, path.join("\n"));
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
                    setPath_1.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
                    break;
                }
                case "C": {
                    let [ax, ay, bx, by, x, y] = command.args;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_2.stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
                    setPath_1.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
                    break;
                }
                case "M":
                case "T":
                case "L": {
                    let [x, y] = command.args;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_2.stringify({ command: command.command, args: [x, y] });
                    setPath_1.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
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
                    setPath_1.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
                    break;
                }
                case "C":
                case "L":
                case "M":
                case "S":
                case "T": {
                    let [x, y] = command.args;
                    setPath_1.setPath(this.cursorPath, drawCursor_1.drawCursor({ x, y }));
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
        showGrid() {
            this.createGrid(10, 10, 20);
            this.createGrid(20, 0, 10);
        }
        createGrid(count, offset, dx) {
            let { x, y, width, height } = this.gridOverlay.viewBox.baseVal;
            let vLines = range_1.range(count).map(v => `M ${x + offset + dx * v} ${x} V ${y + height}`).join("\n");
            let hLines = range_1.range(count).map(v => `M ${x} ${y + offset + dx * v} H ${x + width}`).join("\n");
            let path = createPath_1.createPath({
                stroke: "rgba(128,128,128,0.5)",
                "stroke-width": "0.1"
            });
            setPath_1.setPath(path, `${vLines}\n${hLines}`);
            this.gridOverlay.appendChild(path);
        }
        showMarkers() {
            let d = getComputedStyle(this.sourcePath).getPropertyValue("d");
            let commands = parsePath_2.parsePath(d);
            let overlayPath = this.createOverlayPoint(commands);
            overlayPath.unshift("M 0 0");
            setPath_1.setPath(this.workPath, overlayPath.join(" "));
        }
        createOverlayPoint(commands) {
            let path = [];
            let priorLocation = { x: 0, y: 0 };
            commands.forEach(command => {
                switch (command.command) {
                    case "A": {
                        let [rx, ry, a, b, cw, x, y] = command.args;
                        priorLocation = { x, y };
                        path.push(drawX_1.drawX(priorLocation));
                        break;
                    }
                    case "C": {
                        let [ax, ay, bx, by, x, y] = command.args;
                        path.push(drawX_1.drawX({ x: ax, y: ay }));
                        path.push(drawX_1.drawX({ x: bx, y: by }));
                        priorLocation = { x, y };
                        path.push(drawX_1.drawX(priorLocation));
                        break;
                    }
                    case "H": {
                        let [x] = command.args;
                        priorLocation.x = x;
                        path.push(drawX_1.drawX(priorLocation));
                        break;
                    }
                    case "L":
                    case "M":
                    case "T":
                        {
                            let [x, y] = command.args;
                            priorLocation = { x, y };
                            path.push(drawX_1.drawX(priorLocation));
                            break;
                        }
                    case "S": {
                        let [bx, by, x, y] = command.args;
                        path.push(drawX_1.drawX({ x: bx, y: by }));
                        priorLocation = { x, y };
                        path.push(drawX_1.drawX(priorLocation));
                        break;
                    }
                    case "V": {
                        let [y] = command.args;
                        priorLocation.y = y;
                        path.push(drawX_1.drawX(priorLocation));
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
            return path;
        }
    }
    exports.SvgEditor = SvgEditor;
});
"use strict";
function range(n) {
    return Array(n).fill(0).map((v, i) => i);
}
function asDom(html) {
    let div = document.createElement("div");
    div.innerHTML = html.trim();
    return div.firstElementChild;
}
class SvgEditor {
    constructor(workview, input) {
        var _a;
        this.workview = workview;
        this.input = input;
        this.css = `
    <style>
    </style>`;
        this.gridScale = 10;
        this.currentIndex = -1;
        document.head.appendChild(asDom(this.css));
        this.sourcePath = this.workview.querySelector("path");
        if (!this.sourcePath)
            throw "workview must have a path";
        let { x, y, width, height } = workview.viewBox.baseVal;
        this.gridOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        (_a = workview.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(this.gridOverlay);
        this.workPath = this.createPath();
        this.gridOverlay.appendChild(this.workPath);
        this.workPath.style.setProperty("fill", "rgb(0,255,128)");
        this.workPath.style.setProperty("stroke", "rgb(0,255,128)");
        this.workPath.style.setProperty("stroke-width", "0.5");
        this.showGrid();
        this.cursorPath = this.createPath({
            stroke: "rgb(0, 255, 0)",
            "stroke-width": "0.2",
        });
        this.gridOverlay.appendChild(this.cursorPath);
        let keystate = {};
        input.addEventListener("keyup", event => {
            keystate[event.code] = false;
        });
        const moveit = (location) => {
            this.setPath(this.sourcePath, this.transformActiveCommand(location).join(""));
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
                this.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling);
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
                this.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling);
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
        let path = this.getPath().split("\n");
        let command = { command: "m", args: [0, 0] };
        path.splice(index, 0, this.stringify(command));
        this.setPath(this.sourcePath, path.join("\n"));
        this.renderEditor();
        this.focus(this.input.children[index]);
    }
    deleteActiveCommand() {
        var _a, _b;
        let index = this.currentIndex;
        let path = this.getPath().split("\n");
        path.splice(index, 1);
        this.setPath(this.sourcePath, path.join("\n"));
        let nextFocusItem = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) || ((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.previousElementSibling);
        this.input.children[index].remove();
        this.focus(nextFocusItem);
    }
    replaceActiveCommand(commandText) {
        let index = this.currentIndex;
        let [head, ...tail] = commandText.split(" ");
        let command = { command: head, args: tail.map(parseFloat) };
        let path = this.getPath().split("\n");
        path[index] = this.stringify(command);
        this.setPath(this.sourcePath, path.join("\n"));
    }
    transformActiveCommand(translate) {
        let index = this.currentIndex;
        let path = this.getPath().split("\n");
        if (!path)
            throw "use targetPath";
        let [c, ...a] = path[index].split(" ");
        let command = { command: c, args: a.map(parseFloat) };
        switch (command.command) {
            case "A": {
                let [rx, ry, a, b, cw, x, y] = command.args;
                x += translate.dx;
                y += translate.dy;
                path[index] = this.stringify({ command: command.command, args: [rx, ry, a, b, cw, x, y] });
                this.setPath(this.cursorPath, this.drawCursor({ x, y }));
                break;
            }
            case "C": {
                let [ax, ay, bx, by, x, y] = command.args;
                x += translate.dx;
                y += translate.dy;
                path[index] = this.stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
                this.setPath(this.cursorPath, this.drawCursor({ x, y }));
                break;
            }
            case "M":
            case "T":
            case "L": {
                let [x, y] = command.args;
                x += translate.dx;
                y += translate.dy;
                path[index] = this.stringify({ command: command.command, args: [x, y] });
                this.setPath(this.cursorPath, this.drawCursor({ x, y }));
                break;
            }
        }
        this.input.children[index].innerText = path[index];
        return path;
    }
    stringify(command) {
        return `${command.command} ${command.args.join(" ")}`;
    }
    focus(element) {
        if (!element)
            return;
        if (!element.focus)
            return;
        element.focus();
    }
    goto(index) {
        this.currentIndex = index;
        let path = this.getPath().split("\n");
        if (!path)
            return;
        let [c, ...a] = path[index].split(" ");
        let command = { command: c, args: a.map(parseFloat) };
        switch (command.command) {
            case "A": {
                let [rx, ry, a, b, cw, x, y] = command.args;
                this.setPath(this.cursorPath, this.drawCursor({ x, y }));
                break;
            }
            case "C":
            case "L":
            case "M":
            case "S":
            case "T": {
                let [x, y] = command.args;
                this.setPath(this.cursorPath, this.drawCursor({ x, y }));
                break;
            }
        }
    }
    setPath(pathElement, d) {
        pathElement.setAttribute("d", d);
    }
    createPath(styles) {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        if (styles) {
            Object.keys(styles).forEach(key => {
                path.style.setProperty(key, styles[key]);
            });
        }
        return path;
    }
    getPath(path = this.sourcePath) {
        let d = getComputedStyle(path).getPropertyValue("d");
        let commands = this.parsePath(d);
        return commands.map(c => `${c.command} ${c.args.join(" ")}`).join("\n");
    }
    show() {
        this.showMarkers();
        this.renderEditor();
    }
    renderEditor() {
        let cells = this.getPath().split("\n").map(v => `<div class="cell">${v}</div>`);
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
        let vLines = range(count).map(v => `M ${x + offset + dx * v} ${x} V ${y + height}`).join("\n");
        let hLines = range(count).map(v => `M ${x} ${y + offset + dx * v} H ${x + width}`).join("\n");
        let path = this.createPath();
        path.style.setProperty("stroke", "rgba(128,128,128,0.5)");
        path.style.setProperty("stroke-width", "0.1");
        this.setPath(path, `${vLines}\n${hLines}`);
        this.gridOverlay.appendChild(path);
    }
    showMarkers() {
        let d = getComputedStyle(this.sourcePath).getPropertyValue("d");
        let commands = this.parsePath(d);
        let overlayPath = this.createOverlayPoint(commands);
        overlayPath.unshift("M 0 0");
        this.setPath(this.workPath, overlayPath.join(" "));
    }
    createOverlayPoint(commands) {
        let path = [];
        let priorLocation = { x: 0, y: 0 };
        commands.forEach(command => {
            switch (command.command) {
                case "A": {
                    let [rx, ry, a, b, cw, x, y] = command.args;
                    priorLocation = { x, y };
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "C": {
                    let [ax, ay, bx, by, x, y] = command.args;
                    path.push(this.drawX({ x: ax, y: ay }));
                    path.push(this.drawX({ x: bx, y: by }));
                    priorLocation = { x, y };
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "H": {
                    let [x] = command.args;
                    priorLocation.x = x;
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "L":
                case "M":
                case "T":
                    {
                        let [x, y] = command.args;
                        priorLocation = { x, y };
                        path.push(this.drawX(priorLocation));
                        break;
                    }
                case "S": {
                    let [bx, by, x, y] = command.args;
                    path.push(this.drawX({ x: bx, y: by }));
                    priorLocation = { x, y };
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "V": {
                    let [y] = command.args;
                    priorLocation.y = y;
                    path.push(this.drawX(priorLocation));
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
    drawX(location) {
        let { x, y } = location;
        return `M ${x} ${y} l ` + `-1 -1 l 2 2 l -1 -1 l 1 -1 l -2 2 z`;
    }
    drawCursor(location, scale = 1) {
        let { x, y } = location;
        return `M ${x} ${y} l -5 -5 l 10 10 l -5 -5 l 5 -5 l -10 10 z`;
    }
    parsePath(path) {
        let firstQuote = path.indexOf("\"");
        if (firstQuote < 0)
            throw "no quote found";
        let lastQuote = path.lastIndexOf("\"");
        if (lastQuote <= firstQuote)
            throw "no end quote found";
        path = path.substring(firstQuote + 1, lastQuote);
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
}

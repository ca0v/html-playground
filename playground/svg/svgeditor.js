"use strict";
function range(n) {
    return Array(n).fill(0).map((v, i) => i);
}
class SvgEditor {
    constructor(workview, input) {
        var _a;
        this.workview = workview;
        this.input = input;
        this.gridScale = 10;
        this.currentIndex = -1;
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
        input.addEventListener("keydown", event => {
            var _a, _b;
            keystate[event.code] = true;
            switch (event.code) {
                case "ArrowUp":
                    if (keystate["ControlLeft"]) {
                        this.setPath(this.sourcePath, this.transform({ dx: 0, dy: -1 }).join(""));
                    }
                    else {
                        this.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling);
                    }
                    break;
                case "ArrowDown":
                    if (keystate["ControlLeft"]) {
                        this.setPath(this.sourcePath, this.transform({ dx: 0, dy: 1 }).join(""));
                    }
                    else {
                        this.focus((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.nextElementSibling);
                    }
                    break;
                case "ArrowLeft":
                    if (keystate["ControlLeft"]) {
                        let path = this.transform({ dx: -1, dy: 0 }).join("\n");
                        this.setPath(this.sourcePath, path);
                        break;
                    }
                case "ArrowRight":
                    if (keystate["ControlLeft"]) {
                        let path = this.transform({ dx: 1, dy: 0 });
                        this.setPath(this.sourcePath, path.join("\n"));
                        break;
                    }
                default:
                    console.log(event.code);
            }
        });
    }
    transform(translate) {
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
        this.showMarkers();
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
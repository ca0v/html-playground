import { range } from "./range";
import { asDom } from "./asDom";
import { Dictionary } from "./Dictionary";
import { Command } from "./Command";

export class SvgEditor {

    private css = `
    <style>
    </style>`;

    private gridOverlay: SVGSVGElement;
    private workPath: SVGPathElement;
    private cursorPath: SVGPathElement;
    private sourcePath: SVGPathElement;
    private gridScale = 10;
    private currentIndex = -1;

    constructor(public workview: SVGSVGElement, public input: HTMLElement) {
        document.head.appendChild(asDom(this.css));
        this.sourcePath = this.workview.querySelector("path") as SVGPathElement;
        if (!this.sourcePath) throw "workview must have a path";

        let { x, y, width, height } = workview.viewBox.baseVal;
        this.gridOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        workview.parentElement?.appendChild(this.gridOverlay);
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

        let keystate = <any>{};

        input.addEventListener("keyup", event => {
            keystate[event.code] = false;
        });

        const moveit = (location: { dx: number, dy: number }) => {
            this.setPath(this.sourcePath, this.transformActiveCommand(location).join(""));
            this.showMarkers();
        }

        const keyCommands: Dictionary<() => void> = {
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
                this.focus(document.activeElement?.nextElementSibling);
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
                this.focus(document.activeElement?.previousElementSibling);
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
        }

        input.addEventListener("keydown", event => {
            if (event.code === "Escape") keystate = {};
            keystate[event.code] = true;

            let code = Object.keys(keystate).filter(k => keystate[k]).sort().join("+");
            if (keyCommands[code]) {
                keyCommands[code]();
                event.preventDefault();
                return;
            } else {
                console.log(event.code, code);
            }
        });

    }

    private editActiveCommand() {
        let index = this.currentIndex;
        let commandEditor = this.input.children[index] as HTMLElement;
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
        }
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
        }
    }

    private insertBeforeActiveCommand() {
        let index = this.currentIndex;
        let path = this.getPath().split("\n");
        let command = { command: "m", args: [0, 0] };
        path.splice(index, 0, this.stringify(command));
        this.setPath(this.sourcePath, path.join("\n"));
        this.renderEditor();
        this.focus(this.input.children[index]);
    }

    private deleteActiveCommand() {
        let index = this.currentIndex;
        let path = this.getPath().split("\n");
        path.splice(index, 1);
        this.setPath(this.sourcePath, path.join("\n"));
        let nextFocusItem = document.activeElement?.nextElementSibling || document.activeElement?.previousElementSibling;
        this.input.children[index].remove();
        this.focus(nextFocusItem);
    }

    private replaceActiveCommand(commandText: string) {
        let index = this.currentIndex;
        let [head, ...tail] = commandText.split(" ");
        let command = { command: head, args: tail.map(parseFloat) };
        let path = this.getPath().split("\n");
        path[index] = this.stringify(command);
        this.setPath(this.sourcePath, path.join("\n"));
    }

    private transformActiveCommand(translate: { dx: number, dy: number }) {
        let index = this.currentIndex;
        let path = this.getPath().split("\n");
        if (!path) throw "use targetPath";
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
        (this.input.children[index] as HTMLDivElement).innerText = path[index];
        return path;
    }

    stringify(command: Command) {
        return `${command.command} ${command.args.join(" ")}`;
    }

    focus(element: any) {
        if (!element) return;
        if (!element.focus) return;
        element.focus();
    }

    goto(index: number) {
        this.currentIndex = index;
        let path = this.getPath().split("\n");
        if (!path) return;
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

    private setPath(pathElement: SVGPathElement, d: string) {
        pathElement.setAttribute("d", d);
    }

    private createPath(styles?: Partial<{
        stroke: string;
        "stroke-width": string;
    }>): SVGPathElement {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        if (styles) {
            Object.keys(styles).forEach(key => {
                path.style.setProperty(key, (<any>styles)[key]);
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

    private renderEditor() {
        let cells = this.getPath().split("\n").map(v => `<div class="cell">${v}</div>`);
        let input = this.input;
        input.innerHTML = cells.join("\n");
        (Array.from(input.querySelectorAll(".cell")) as HTMLElement[]).forEach(cell => {
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

    private createGrid(count: number, offset: number, dx: number) {
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

    private createOverlayPoint(commands: Command[]) {
        let path: Array<string> = [];
        let priorLocation = { x: 0, y: 0 };
        commands.forEach(command => {
            switch (command.command) {
                case "A": {
                    let [rx, ry, a, b, cw, x, y] = command.args;
                    priorLocation = { x, y }
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "C": {
                    let [ax, ay, bx, by, x, y] = command.args;
                    path.push(this.drawX({ x: ax, y: ay }));
                    path.push(this.drawX({ x: bx, y: by }));
                    priorLocation = { x, y }
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
                        priorLocation = { x, y }
                        path.push(this.drawX(priorLocation));
                        break;
                    }
                case "S": {
                    let [bx, by, x, y] = command.args;
                    path.push(this.drawX({ x: bx, y: by }));
                    priorLocation = { x, y }
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

    private drawX(location: { x: number; y: number }) {
        let { x, y } = location;
        return `M ${x} ${y} l ` + `-1 -1 l 2 2 l -1 -1 l 1 -1 l -2 2 z`;
    }

    private drawCursor(location: { x: number; y: number }, scale = 1) {
        let { x, y } = location;
        return `M ${x} ${y} l -5 -5 l 10 10 l -5 -5 l 5 -5 l -10 10 z`;
    }

    private parsePath(path: string) {
        let firstQuote = path.indexOf("\"");
        if (firstQuote < 0) throw "no quote found";
        let lastQuote = path.lastIndexOf("\"");
        if (lastQuote <= firstQuote) throw "no end quote found";
        path = path.substring(firstQuote + 1, lastQuote);
        let tokens = path.split("");
        let commands = [] as Array<{ command: string, args: number[] }>;
        let commandArgs = [];
        while (tokens.length) {
            let ch = tokens.pop();
            if (!ch) throw "expected a token";
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
            } else {
                commandArgs.push(ch);
            }
        }
        return commands.reverse();
    }
}
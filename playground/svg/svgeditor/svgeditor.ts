import { range } from "./fun/range";
import { Dictionary } from "./fun/Dictionary";
import { Command } from "./fun/Command";
import { stringify } from "./fun/stringify";
import { parse } from "./fun/parse";
import { createPath } from "./fun/createPath";
import { parsePath } from "./fun/parsePath";
import { focus } from "./fun/focus";
import { drawX } from "./fun/drawX";
import { drawCursor } from "./fun/drawCursor";
import { setPath } from "./fun/setPath";
import { getPathCommands } from "./fun/getPathCommands";

export interface SvgEditor {
    use(rule: SvgEditorRule): SvgEditor;
    show(): void;
    subscribe(topic: string, callback: () => void): { unsubscribe: () => void };
    hideCursor(): void;
    hideCommandEditor(): void;
    hideMarkers(): void;
    hideGrid(): void;
    showGrid(): void;
    isGridVisible(): boolean;
}

/**
 * rules
 * escape => clear markers, clear editors
 */
export interface SvgEditorRule {
    initialize(editor: SvgEditor): void;
}

export class CoreRules implements SvgEditorRule {
    initialize(editor: SvgEditor) {
        editor.subscribe("Escape", () => {
            editor.hideCursor();
            editor.hideCommandEditor();
            editor.hideMarkers();
        });

        editor.subscribe("KeyG", () => {
            if (editor.isGridVisible()) {
                editor.hideGrid();
            } else {
                editor.showGrid();
            }
        });
    }
}

export class SvgEditorControl implements SvgEditor {
    private topics: Dictionary<Array<() => void>> = {};

    use(rule: SvgEditorRule): SvgEditor {
        rule.initialize(this);
        return this;
    }

    subscribe(topic: string, callback: () => void): { unsubscribe: () => void; } {
        let subscribers = this.topics[topic] = this.topics[topic] || [];
        subscribers.push(callback);
        return {
            unsubscribe: () => {
                let i = subscribers.indexOf(callback);
                if (i < 0) return;
                subscribers.splice(i, 1);
            }
        };
    }

    hideCursor(): void {
        this.cursorPath.remove();
    }
    hideCommandEditor(): void {
        //
    }
    hideMarkers(): void {
        //
    }
    hideGrid(): void {
        //
    }
    isGridVisible(): boolean {
        return true;
    }

    private gridOverlay: SVGSVGElement;
    private workPath: SVGPathElement;
    private cursorPath: SVGPathElement;
    private sourcePath: SVGPathElement;
    private currentIndex = -1;

    constructor(public workview: SVGSVGElement, public input: HTMLElement) {
        this.sourcePath = this.workview.querySelector("path") as SVGPathElement;
        if (!this.sourcePath) throw "workview must have a path";

        let { x, y, width, height } = workview.viewBox.baseVal;
        this.gridOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        workview.parentElement?.appendChild(this.gridOverlay);
        this.workPath = createPath({
            "fill": "rgb(0,255,128)",
            "stroke": "rgb(0,255,128)",
            "stroke-width": "0.5"
        });
        this.gridOverlay.appendChild(this.workPath);
        this.showGrid();
        this.cursorPath = createPath({
            stroke: "rgb(0, 255, 0)",
            "stroke-width": "0.2",
        });
        this.gridOverlay.appendChild(this.cursorPath);

        let keystate = <any>{};

        input.addEventListener("keyup", event => {
            keystate[event.code] = false;
        });

        const moveit = (location: { dx: number, dy: number }) => {
            setPath(this.sourcePath, this.transformActiveCommand(location).join(""));
            this.showMarkers();
        }

        const keyCommands: Dictionary<() => void> = {
            "Delete": () => {
                this.deleteActiveCommand();
            },
            "End": () => {
                focus(this.input.lastElementChild);
            },
            "Home": () => {
                focus(this.input.firstElementChild);
            },
            "Insert": () => {
                this.insertBeforeActiveCommand();
            },
            "F2": () => {
                keyCommands["Enter"]();
            },
            "F5": () => {
                // open
                let pathData = localStorage.getItem("path");
                if (!pathData) return;
                setPath(this.sourcePath, pathData);
                this.renderEditor();
                this.showMarkers();
                focus(this.input.children[0]);
            },
            "F11": () => {
                // save
                localStorage.setItem("path", this.getSourcePath().join("\n"));
            },
            "Enter": () => {
                this.editActiveCommand();
            },
            "ArrowDown": () => {
                focus(document.activeElement?.nextElementSibling);
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
                focus(document.activeElement?.previousElementSibling);
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
                this.publish(code);
            }
        });

    }

    private publish(topic: string) {
        let subscribers = this.topics[topic];
        if (!subscribers) return;
        subscribers.forEach(subscriber => subscriber());
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
        let path = this.getSourcePath();
        let command = { command: "m", args: [0, 0] };
        path.splice(index, 0, stringify(command));
        setPath(this.sourcePath, path.join("\n"));
        this.renderEditor();
        focus(this.input.children[index]);
    }

    private deleteActiveCommand() {
        let index = this.currentIndex;
        let path = this.getSourcePath();
        path.splice(index, 1);
        setPath(this.sourcePath, path.join("\n"));
        let nextFocusItem = document.activeElement?.nextElementSibling || document.activeElement?.previousElementSibling;
        this.input.children[index].remove();
        focus(nextFocusItem);
    }

    private replaceActiveCommand(commandText: string) {
        let index = this.currentIndex;
        let command = parse(commandText);
        let path = this.getSourcePath();
        path[index] = stringify(command);
        setPath(this.sourcePath, path.join("\n"));
    }

    private transformActiveCommand(translate: { dx: number, dy: number }) {
        let index = this.currentIndex;
        let path = this.getSourcePath();
        if (!path) throw "use targetPath";
        let command = parse(path[index]);
        switch (command.command) {
            case "A": {
                let [rx, ry, a, b, cw, x, y] = command.args;
                x += translate.dx;
                y += translate.dy;
                path[index] = stringify({ command: command.command, args: [rx, ry, a, b, cw, x, y] });
                setPath(this.cursorPath, drawCursor({ x, y }));
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
                path[index] = stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
                setPath(this.cursorPath, drawCursor({ x, y }));
                break;
            }
            case "S":
                {
                    let [bx, by, x, y] = command.args;
                    bx += translate.dx;
                    by += translate.dy;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify({ command: command.command, args: [bx, by, x, y] });
                    setPath(this.cursorPath, drawCursor({ x, y }));
                    break;
                }
            case "L":
            case "M":
            case "T":
                {
                    let [x, y] = command.args;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify({ command: command.command, args: [x, y] });
                    setPath(this.cursorPath, drawCursor({ x, y }));
                    break;
                }
        }
        (this.input.children[index] as HTMLDivElement).innerText = path[index];
        return path;
    }

    goto(index: number) {
        this.currentIndex = index;
        let path = this.getSourcePath();
        if (!path) return;
        let command = parse(path[index]);

        switch (command.command) {
            case "A": {
                let [rx, ry, a, b, cw, x, y] = command.args;
                setPath(this.cursorPath, drawCursor({ x, y }));
                break;
            }
            case "C":
            case "L":
            case "M":
            case "S":
            case "T": {
                let [x, y] = command.args;
                setPath(this.cursorPath, drawCursor({ x, y }));
                break;
            }
        }
    }

    getSourcePath() {
        return getPathCommands(this.sourcePath);
    }

    show() {
        this.showMarkers();
        this.renderEditor();
    }

    private renderEditor() {
        let cells = this.getSourcePath().map(v => `<div class="cell">${v}</div>`);
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
        let path = createPath({
            stroke: "rgba(128,128,128,0.5)",
            "stroke-width": "0.1"
        });
        setPath(path, `${vLines}\n${hLines}`);
        this.gridOverlay.appendChild(path);
    }

    showMarkers() {
        let d = getComputedStyle(this.sourcePath).getPropertyValue("d");
        let commands = parsePath(d);
        let overlayPath = this.createOverlayPoint(commands);
        overlayPath.unshift("M 0 0");
        setPath(this.workPath, overlayPath.join(" "));
    }

    private createOverlayPoint(commands: Command[]) {
        let path: Array<string> = [];
        let priorLocation = { x: 0, y: 0 };
        commands.forEach(command => {
            switch (command.command) {
                case "A": {
                    let [rx, ry, a, b, cw, x, y] = command.args;
                    priorLocation = { x, y }
                    path.push(drawX(priorLocation));
                    break;
                }
                case "C": {
                    let [ax, ay, bx, by, x, y] = command.args;
                    path.push(drawX({ x: ax, y: ay }));
                    path.push(drawX({ x: bx, y: by }));
                    priorLocation = { x, y }
                    path.push(drawX(priorLocation));
                    break;
                }
                case "H": {
                    let [x] = command.args;
                    priorLocation.x = x;
                    path.push(drawX(priorLocation));
                    break;
                }
                case "L":
                case "M":
                case "T":
                    {
                        let [x, y] = command.args;
                        priorLocation = { x, y }
                        path.push(drawX(priorLocation));
                        break;
                    }
                case "S": {
                    let [bx, by, x, y] = command.args;
                    path.push(drawX({ x: bx, y: by }));
                    priorLocation = { x, y }
                    path.push(drawX(priorLocation));
                    break;
                }
                case "V": {
                    let [y] = command.args;
                    priorLocation.y = y;
                    path.push(drawX(priorLocation));
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
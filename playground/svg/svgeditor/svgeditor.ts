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
import { createGrid } from "./fun/createGrid";
import { SvgEditor, SvgEditorRule } from "./fun/SvgEditor";
import { getLocation } from "./fun/getLocation";
import { getPath } from "./fun/getPath";

let keystate: Dictionary<boolean> = {};

export class SvgEditorControl implements SvgEditor {
  private topics: Dictionary<Array<() => void>> = {};

  use(rule: SvgEditorRule): SvgEditor {
    rule.initialize(this);
    return this;
  }

  setActiveIndex(index: number) {
    focus(this.input.children[index]);
  }

  subscribe(topic: string, callback: () => void): { unsubscribe: () => void } {
    let subscribers = (this.topics[topic] = this.topics[topic] || []);
    subscribers.push(callback);
    return {
      unsubscribe: () => {
        let i = subscribers.indexOf(callback);
        if (i < 0) return;
        subscribers.splice(i, 1);
      },
    };
  }

  hideCursor(): void {
    setPath(this.cursorPath, "");
  }

  hideCommandEditor(): void {
    //
  }

  hideGrid(): void {
    this.gridOverlay.remove();
  }

  showGrid(): void {
    this.workview?.parentElement?.appendChild(this.gridOverlay);
  }

  isGridVisible(): boolean {
    return !!this.gridOverlay.parentElement;
  }

  private gridOverlay: SVGSVGElement;
  private workPath: SVGPathElement;
  private cursorPath: SVGPathElement;
  private sourcePath: SVGPathElement;
  private currentIndex = -1;
  private keyCommands: Dictionary<(...args: any[]) => void> = {};

  constructor(public workview: SVGSVGElement, public input: HTMLElement) {
    this.sourcePath = this.workview.querySelector("path") as SVGPathElement;
    if (!this.sourcePath) throw "workview must have a path";

    let { x, y, width, height } = workview.viewBox.baseVal;
    this.gridOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    workview.parentElement?.appendChild(this.gridOverlay);
    this.workPath = createPath({
      fill: "rgb(0,255,128)",
      stroke: "rgb(0,255,128)",
      "stroke-width": "0.2",
    });
    this.gridOverlay.appendChild(this.workPath);
    this.createGrid();
    this.cursorPath = createPath({
      stroke: "rgb(0, 255, 0)",
      "stroke-width": "0.2",
    });
    this.gridOverlay.appendChild(this.cursorPath);

    input.addEventListener("keyup", event => {
      keystate[event.code] = false;
    });

    const moveit = (
      location: { dx: number; dy: number },
      options?: { primary?: boolean; secondary?: boolean; tertiary?: boolean }
    ) => {
      this.setSourcePath(this.transformActiveCommand(location, options || { primary: true }).join(""));
      this.showMarkers();
    };

    const keyCommands: Dictionary<() => void> = {
      Delete: () => {
        this.deleteActiveCommand();
      },
      End: () => {
        focus(this.input.lastElementChild);
      },
      Home: () => {
        focus(this.input.firstElementChild);
      },
      Insert: () => {
        this.insertBeforeActiveCommand();
      },
      F2: () => {
        keyCommands["Enter"]();
      },
      F5: () => {
        keyCommands["OpenWorkFile"]();
      },
      OpenWorkFile: () => {
        // open
        let pathData = localStorage.getItem("path");
        if (!pathData) return;
        this.setSourcePath(pathData);
        this.renderEditor();
        this.showMarkers();
        focus(this.input.children[0]);
      },
      F11: () => {
        // save
        localStorage.setItem("path", this.getSourcePath().join("\n"));
      },
      Enter: () => {
        this.editActiveCommand();
      },
      ArrowDown: () => {
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
      ArrowUp: () => {
        focus(document.activeElement?.previousElementSibling);
      },
      "ArrowUp+ControlLeft": () => {
        keyCommands["KeyW"]();
      },
      KeyA: () => {
        moveit({ dx: -1, dy: 0 });
      },
      "KeyA+Numpad2": () => {
        moveit({ dx: -1, dy: 0 }, { secondary: true });
      },
      "KeyA+Numpad3": () => {
        moveit({ dx: -1, dy: 0 }, { tertiary: true });
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
      "KeyD+Numpad2": () => {
        moveit({ dx: 1, dy: 0 }, { secondary: true });
      },
      "KeyD+Numpad3": () => {
        moveit({ dx: 1, dy: 0 }, { tertiary: true });
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
      "KeyS+Numpad2": () => {
        moveit({ dx: 0, dy: 1 }, { secondary: true });
      },
      "KeyS+Numpad3": () => {
        moveit({ dx: 0, dy: 1 }, { tertiary: true });
      },
      KeyW: () => {
        moveit({ dx: 0, dy: -1 });
      },
      "KeyW+Numpad2": () => {
        moveit({ dx: 0, dy: -1 }, { secondary: true });
      },
      "KeyW+Numpad3": () => {
        moveit({ dx: 0, dy: -1 }, { tertiary: true });
      },
    };

    this.keyCommands = keyCommands;

    input.parentElement?.addEventListener("keydown", event => {
      if (event.code === "Escape") keystate = {};
      keystate[event.code] = true;

      let code = Object.keys(keystate)
        .filter(k => keystate[k])
        .sort()
        .join("+");
      if (keyCommands[code]) {
        keyCommands[code]();
        event.preventDefault();
        return;
      } else {
        this.publish(code);
      }
    });
  }

  public execute(command: string, ...args: any[]) {
    if (!this.keyCommands[command]) return;
    this.keyCommands[command](...args);
  }

  private publish(topic: string) {
    let subscribers = this.topics[topic];
    if (!subscribers) {
      console.log(topic);
      return;
    }
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

  private insertBeforeActiveCommand() {
    let index = this.currentIndex;
    let path = this.getSourcePath();
    let command = { command: "m", args: [0, 0] };
    path.splice(index, 0, stringify(command));
    this.setSourcePath(path.join("\n"));
    this.renderEditor();
    focus(this.input.children[index]);
  }

  private deleteActiveCommand() {
    let index = this.currentIndex;
    let path = this.getSourcePath();
    path.splice(index, 1);
    this.setSourcePath(path.join("\n"));
    let nextFocusItem = document.activeElement?.nextElementSibling || document.activeElement?.previousElementSibling;
    this.input.children[index].remove();
    focus(nextFocusItem);
  }

  private replaceActiveCommand(commandText: string) {
    let index = this.currentIndex;
    let command = parse(commandText);
    let path = this.getSourcePath();
    path[index] = stringify(command);
    this.setSourcePath(path.join("\n"));
  }

  private transformActiveCommand(
    translate: { dx: number; dy: number },
    options: { primary?: boolean; secondary?: boolean; tertiary?: boolean }
  ) {
    let index = this.currentIndex;
    let path = this.getSourcePath();
    if (!path) throw "use targetPath";
    let command = parse(path[index]);
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
        path[index] = stringify({ command: command.command, args: [rx, ry, a, b, cw, x, y] });
        setPath(this.cursorPath, drawCursor({ x, y }));
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
        path[index] = stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
        setPath(this.cursorPath, drawCursor({ x, y }));
        break;
      }
      case "H": {
        let [x] = command.args;
        x += translate.dx;
        path[index] = stringify({ command: command.command, args: [x] });
        // prior has to have a "Y" component so cannot be another "H"
        setPath(this.cursorPath, drawCursor({ x, y: getLocation(index - 1, path).y }));
        break;
      }
      case "V": {
        let [y] = command.args;
        y += translate.dy;
        path[index] = stringify({ command: command.command, args: [y] });
        // prior has to have a "Y" component so cannot be another "H"
        setPath(this.cursorPath, drawCursor({ x: getLocation(index - 1, path).x, y }));
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
        path[index] = stringify({ command: command.command, args: [bx, by, x, y] });
        setPath(this.cursorPath, drawCursor({ x, y }));
        break;
      }
      case "L":
      case "M":
      case "T": {
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

  private goto(index: number) {
    this.currentIndex = index;
    let path = this.getSourcePath();
    if (!path) return;
    setPath(this.cursorPath, drawCursor(getLocation(index, path)));
  }

  getPath() {
    return parsePath(getPath(this.sourcePath));
  }

  private setSourcePath(path: string) {
    setPath(this.sourcePath, path);
    this.publish("source-path-changed");
  }

  private getSourcePath() {
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

  private createGrid() {
    createGrid(this.gridOverlay, 10, 10, 20);
    createGrid(this.gridOverlay, 20, 0, 10);
  }

  public hideMarkers(): void {
    setPath(this.workPath, "");
  }

  public isMarkersVisible() {
    return !!this.workPath.getAttribute("d");
  }

  public showMarkers() {
    let d = getComputedStyle(this.sourcePath).getPropertyValue("d");
    let commands = parsePath(d);
    let overlayPath = this.createOverlayPoint(commands);
    overlayPath.unshift("M 0 0");
    overlayPath.push("Z");
    setPath(this.workPath, overlayPath.join(" "));
  }

  private createOverlayPoint(commands: Command[]) {
    let path: Array<{ x: number; y: number }> = [];
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
          throw `unknown command: ${command}`;
        }
      }
    });
    return path.map(p => drawX(p, { scale: 0.5 }));
  }
}
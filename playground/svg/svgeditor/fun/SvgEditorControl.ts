import { Dictionary } from "./Dictionary";
import { Command } from "./Command";
import { stringify } from "./stringify";
import { parse } from "./parse";
import { createPath } from "./createPath";
import { parsePath } from "./parsePath";
import { focus } from "./focus";
import { drawX } from "./drawX";
import { drawCursor } from "./drawCursor";
import { setPath } from "./setPath";
import { getPathCommands } from "./getPathCommands";
import { createGrid } from "./createGrid";
import { SvgEditor, SvgEditorRule, CursorLocation, Viewbox } from "./SvgEditor";
import { getLocation } from "./getLocation";
import { getPath } from "./getPath";
import { createSvg } from "./createSvg";
import { keys } from "./keys";
import { ShortcutManager } from "./KeyboardShortcuts";

function getScale(gridOverlay: SVGSVGElement) {
  let { width: viewBoxWidth } = gridOverlay.viewBox.baseVal;
  let { width } = gridOverlay.getBoundingClientRect();
  return width / viewBoxWidth;
}

export class SvgEditorControl implements SvgEditor {
  private topics: Dictionary<Array<() => void>> = {};

  use(rule: SvgEditorRule): SvgEditor {
    rule.initialize(this);
    return this;
  }

  getCursorLocation(): CursorLocation {
    return getLocation(this.currentIndex, this.getSourcePath());
  }

  getViewbox(): Viewbox {
    let { x, y, width, height } = this.workview.viewBox.baseVal;
    return { x, y, width, height };
  }

  setActiveIndex(index: number) {
    focus(this.input.children[index]);
  }

  shortcut(topic: string, callback: () => void): { unsubscribe: () => void; because: (about: string) => void } {
    const node = this.shortcutManager.registerShortcut(topic, callback);
    return {
      unsubscribe: () => {},
      because: (about: string) => {
        node.title = about;
      },
    };
  }

  subscribe(topic: string, callback: () => void): { unsubscribe: () => void; because: (about: string) => void } {
    let subscribers = (this.topics[topic] = this.topics[topic] || []);
    subscribers.push(callback);
    return {
      unsubscribe: () => {
        let i = subscribers.indexOf(callback);
        if (i < 0) return;
        subscribers.splice(i, 1);
      },
      because: (about: string) => {
        // use a shortcut instead
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
  private shortcutManager = new ShortcutManager();

  constructor(public workview: SVGSVGElement, public input: HTMLElement) {
    this.sourcePath = this.workview.querySelector("path") as SVGPathElement;
    if (!this.sourcePath) throw "workview must have a path";

    let { x, y, width, height } = workview.viewBox.baseVal;
    this.gridOverlay = createSvg();
    this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
    workview.parentElement?.appendChild(this.gridOverlay);

    // how to get workPath stroke-width to be 0.2 regardless of scale?
    this.workPath = createPath({
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
    this.cursorPath = createPath({
      stroke: "rgb(0, 255, 0)",
      "stroke-width": "0.2",
    });
    this.gridOverlay.appendChild(this.cursorPath);

    const moveit = (
      location: { dx: number; dy: number },
      options?: { primary?: boolean; secondary?: boolean; tertiary?: boolean }
    ) => {
      this.hideCursor();
      this.setSourcePath(this.transformActiveCommand(location, options || { primary: true }).join(""));
      this.showMarkers();
    };

    const keyCommands: Dictionary<() => void> = {
      Delete: () => this.deleteActiveCommand(),
      End: () => focus(this.input.lastElementChild),
      Home: () => focus(this.input.firstElementChild),
      F2: () => {
        keyCommands["Enter"]();
      },
      "File Open": () => {
        // open
        let pathData = localStorage.getItem("path");
        if (!pathData) return;
        this.setSourcePath(pathData);
        this.renderEditor();
        this.showMarkers();
        focus(this.input.children[0]);
      },
      "File New": () => {
        this.setSourcePath("M 0 0 Z");
        this.renderEditor();
        this.showMarkers();
        focus(this.input.children[0]);
      },
      "File Save": () => localStorage.setItem("path", this.getSourcePath().join("\n")),
      Enter: () => this.editActiveCommand(),
      ArrowDown: () => focus(document.activeElement?.nextElementSibling),
      ArrowUp: () => focus(document.activeElement?.previousElementSibling),
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

    keys(keyCommands).forEach(phrase => this.shortcutManager.registerShortcut(<string>phrase, keyCommands[phrase]));
    const shortcuts = this.shortcutManager.shortcuts;
    let currentState = shortcuts;

    input.parentElement?.addEventListener("keydown", event => {
      const map = <any>{
        " ": "Space",
        "-": "Minus",
        "+": "Plus",
      };

      const key = map[event.key] || event.key;

      console.log("you pressed: ", key);
      let nextState = this.shortcutManager.findNode(currentState, key);
      if (nextState) {
        console.log("continuation found");
      } else {
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
        //if (false !== this.publish(event.code)) event.preventDefault();
        return;
      }

      currentState = nextState;
      event.preventDefault();
      if (!currentState.ops.length) {
        console.log(
          "continue using: ",
          keys(currentState.subkeys)
            .map(k => {
              const title = currentState.subkeys[k].title;
              return !!title ? `${title}(${k})` : k + "";
            })
            .join(", ")
        );
        return;
      }

      console.log("executing ops: ", currentState);
      currentState.ops.forEach(cb => cb());
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
      return false;
    }
    subscribers.forEach(subscriber => subscriber());
    return true;
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

  public insertPath(path: string) {
    const pathCommands = parsePath(path);
    const pathSegment = pathCommands.map(stringify);
    const index = this.currentIndex;
    const sourcePath = this.getSourcePath();
    sourcePath.splice(index, 0, ...pathSegment);
    this.setSourcePath(sourcePath.join("\n"));
    this.renderEditor();
  }

  public insertCommand(command: Command) {
    let index = this.currentIndex;
    let path = this.getSourcePath();
    let currentLocation = getLocation(index, path);
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
    path.splice(index + 1, 0, stringify(command));
    this.setSourcePath(path.join("\n"));
    this.renderEditor();
    focus(this.input.children[index + 1]);
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
        break;
      }
      case "H": {
        let [x] = command.args;
        x += translate.dx;
        path[index] = stringify({ command: command.command, args: [x] });
        break;
      }
      case "V": {
        let [y] = command.args;
        y += translate.dy;
        path[index] = stringify({ command: command.command, args: [y] });
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
        break;
      }
      case "L":
      case "M":
      case "T": {
        let [x, y] = command.args;
        x += translate.dx;
        y += translate.dy;
        path[index] = stringify({ command: command.command, args: [x, y] });
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
    const scale = getScale(this.gridOverlay);
    setPath(this.cursorPath, drawCursor(getLocation(index, path), 25 / scale));
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
    createGrid(this.gridOverlay);
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
    return path.map(p => drawX(p, { scale: 5 / scale }));
  }
}

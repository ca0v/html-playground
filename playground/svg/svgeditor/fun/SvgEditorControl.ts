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

function getScale(svg: SVGSVGElement) {
  let { width: viewBoxWidth } = svg.viewBox.baseVal;
  let { width } = svg.getBoundingClientRect();
  return width / viewBoxWidth;
}

export class SvgEditorControl implements SvgEditor {
  private topics: Dictionary<Array<(...args: any[]) => void>> = {};

  redo() {
    this.shortcutManager.redo();
  }

  undo() {
    this.shortcutManager.undo();
  }

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

  getActiveIndex() {
    return this.currentIndex;
  }

  setActiveIndex(index: number) {
    focus(this.input.children[index]);
  }

  shortcut(topic: string, callback: () => { redo: () => void; undo: () => void; }): {
    unsubscribe: () => void;
    options: (options: {
      stateless: boolean;
      because: string;
    }) => void;
  } {
    const node = this.shortcutManager.registerShortcut(topic, callback);
    return {
      unsubscribe: () => { },
      options: (options: { because: string, stateless?: boolean }) => {
        node.title = options.because;
        node.options = <any>options;
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
    this.publish("hidecursor");
  }

  hideCommandEditor(): void {
    //
  }

  private sourcePath: SVGPathElement;
  private currentIndex = -1;
  private keyCommands: Dictionary<(...args: any[]) => void> = {};
  private shortcutManager = new ShortcutManager();

  constructor(public workview: SVGSVGElement, public input: HTMLElement) {
    this.sourcePath = this.workview.querySelector("path") as SVGPathElement;
    if (!this.sourcePath) throw "workview must have a path";

    const moveit = (
      location: { dx: number; dy: number },
      options?: { primary?: boolean; secondary?: boolean; tertiary?: boolean }
    ) => {
      const doit = () => {
        this.hideCursor();
        this.setSourcePath(this.transformActiveCommand(location, options || { primary: true }).join(""));
        this.showMarkers();
      }
      const currentIndex = this.currentIndex;
      const undoCommand = this.getSourcePath()[currentIndex];
      const undo = () => {
        const path = this.getSourcePath();
        path[currentIndex] = undoCommand;
        this.setSourcePath(path.join("\n"));
        this.showMarkers();
      }
      doit();
      const redoCommand = this.getSourcePath()[currentIndex];
      const redo = () => {
        const path = this.getSourcePath();
        path[currentIndex] = redoCommand;
        this.setSourcePath(path.join("\n"));
        this.showMarkers();
      }
      return { undo, redo };
    };

    const keyCommands: Dictionary<() => void> = {
      "Slash Help": () => {
        console.log(this.shortcutManager.help(this.shortcutManager.shortcuts, true));
        this.publish("log", this.shortcutManager.help());
      },
      "Slash File Open": () => {
        // open
        const doit = () => {
          let pathData = localStorage.getItem("path");
          if (!pathData) return;
          this.setSourcePath(pathData);
          this.renderEditor();
          this.showMarkers();
          focus(this.input.children[0]);
        }
        const priorPath = this.getSourcePath();
        const undo = () => {
          this.setSourcePath(priorPath.join("\n"));
          this.renderEditor();
          this.showMarkers();
          focus(this.input.children[0]);
        }
        doit();
        return { undo, redo: doit };
      },
      "Slash File New": () => {
        const priorIndex = this.currentIndex;
        const priorPath = this.getSourcePath();
        const undo = () => {
          this.setSourcePath(priorPath.join("\n"));
          this.renderEditor();
          this.showMarkers();
          focus(this.input.children[priorIndex]);
        }
        const doit = () => {
          this.setSourcePath("M 0 0 Z");
          this.renderEditor();
          this.showMarkers();
          focus(this.input.children[0]);
        }
        doit();
        return { undo, redo: doit };
      },
      "Slash File Save": () => localStorage.setItem("path", this.getSourcePath().join("\n")),
      "Slash Path 2 A": () => moveit({ dx: -1, dy: 0 }, { secondary: true }),
      "Slash Path 2 D": () => moveit({ dx: 1, dy: 0 }, { secondary: true }),
      "Slash Path 2 S": () => moveit({ dx: 0, dy: 1 }, { secondary: true }),
      "Slash Path 2 W": () => moveit({ dx: 0, dy: -1 }, { secondary: true }),
      "Slash Path 3 A": () => moveit({ dx: -1, dy: 0 }, { tertiary: true }),
      "Slash Path 3 D": () => moveit({ dx: 1, dy: 0 }, { tertiary: true }),
      "Slash Path 3 S": () => moveit({ dx: 0, dy: 1 }, { tertiary: true }),
      "Slash Path 3 W": () => moveit({ dx: 0, dy: -1 }, { tertiary: true }),
      "Slash Path A": () => moveit({ dx: -1, dy: 0 }),
      "Slash Path D": () => moveit({ dx: 1, dy: 0 }),
      "Slash Path S": () => moveit({ dx: 0, dy: 1 }),
      "Slash Path W": () => moveit({ dx: 0, dy: -1 }),
      "Slash Path A 0": () => moveit({ dx: 0.1, dy: 0 }),
      "Slash Path D 0": () => moveit({ dx: -0.1, dy: 0 }),
      "Slash Path S 0": () => moveit({ dx: 0, dy: -0.1 }),
      "Slash Path W 0": () => moveit({ dx: 0, dy: 0.1 }),
      "Slash Path ArrowDown": () => focus(document.activeElement?.nextElementSibling),
      "Slash Path ArrowUp": () => focus(document.activeElement?.previousElementSibling),
      "Slash Path Delete": () => this.deleteActiveCommand(),
      "Slash Path End": () => focus(this.input.lastElementChild),
      "Slash Path Enter": () => this.editActiveCommand(),
      "Slash Path Home": () => focus(this.input.firstElementChild),
    };

    this.keyCommands = keyCommands;

    keys(keyCommands).forEach(phrase => this.shortcutManager.registerShortcut(<string>phrase, keyCommands[phrase]));
    this.input.parentElement && this.shortcutManager.watchKeyboard(this.input.parentElement, {
      log: (message: string) => {
        this.publish("log", message);
      }
    });
  }

  public execute(command: string, ...args: any[]) {
    if (!this.keyCommands[command]) return;
    this.keyCommands[command](...args);
  }

  private publish(topic: string, ...args: any[]) {
    let subscribers = this.topics[topic];
    if (!subscribers) {
      console.log(topic);
      return false;
    }
    subscribers.forEach(subscriber => subscriber(...args));
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
      this.publish("log", event.code);
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

  public deleteCommand(index: number) {
    const sourcePath = this.getSourcePath();
    sourcePath.splice(index, 1);
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
    const scale = getScale(this.workview);
    this.publish("showcursor", drawCursor(getLocation(index, path), 25 / scale));
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

  public hideMarkers(): void {
    this.publish("hidemarkers");
  }

  public showMarkers() {
    let d = getComputedStyle(this.sourcePath).getPropertyValue("d");
    let commands = parsePath(d);
    let overlayPath = this.createOverlayPoint(commands);
    overlayPath.unshift("M 0 0");
    overlayPath.push("Z");
    this.publish("showmarkers", overlayPath.join(" "));
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

    const scale = getScale(this.workview);
    return path.map(p => drawX(p, { scale: 5 / scale }));
  }
}

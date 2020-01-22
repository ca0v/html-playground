import { Command } from "./Command";
import { Dictionary } from "./Dictionary";
import { drawCursor } from "./drawCursor";
import { drawX } from "./drawX";
import { focus } from "./focus";
import { getLocation } from "./getLocation";
import { getPath } from "./getPath";
import { getPathCommands } from "./getPathCommands";
import { parse } from "./parse";
import { parsePath } from "./parsePath";
import { setPath } from "./setPath";
import { ShortcutManager } from "./KeyboardShortcuts";
import { stringify } from "./stringify";
import { SvgEditor, SvgEditorRule, CursorLocation, Viewbox } from "./SvgEditor";
import { getScale } from "./getScale";

export class SvgEditorControl implements SvgEditor {
  private topics: Dictionary<Array<(...args: any[]) => void>> = {};

  redo() {
    this.shortcutManager.redo();
  }

  undo() {
    this.shortcutManager.undo();
  }

  use(rule: SvgEditorRule) {
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
  private shortcutManager = new ShortcutManager();

  constructor(public workview: SVGSVGElement, public input: HTMLElement) {
    this.sourcePath = this.workview.querySelector("path") as SVGPathElement;
    if (!this.sourcePath) throw "workview must have a path";
    this.shortcut("Slash Help", () => {
      console.log(this.shortcutManager.help(this.shortcutManager.shortcuts, true));
      this.publish("log", this.shortcutManager.help());
    }).options({ stateless: true });

    this.input.parentElement && this.shortcutManager.watchKeyboard(this.input.parentElement, {
      log: (message: string) => {
        this.publish("log", message);
      }
    });

  }

  public execute(command: string, ...args: any[]) {
    const shortcut = this.shortcutManager.getShortcut(command);
    shortcut && this.shortcutManager.execute(shortcut);
  }

  public publish(topic: string, ...args: any[]) {
    let subscribers = this.topics[topic];
    if (!subscribers) {
      console.log(topic);
      return false;
    }
    subscribers.forEach(subscriber => subscriber(...args));
    return true;
  }

  public editActiveCommand() {
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
    this.show(sourcePath.join("\n"));
  }

  public deleteCommand(index: number) {
    const sourcePath = this.getSourcePath();
    sourcePath.splice(index, 1);
    this.show(sourcePath.join("\n"));
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
    this.show(path.join("\n"));
  }

  public deleteActiveCommand() {
    let index = this.currentIndex;
    let path = this.getSourcePath();
    path.splice(index, 1);
    this.show(path.join("\n"));
  }

  private replaceActiveCommand(commandText: string) {
    let index = this.currentIndex;
    let command = parse(commandText);
    let path = this.getSourcePath();
    path[index] = stringify(command);
    this.show(path.join("\n"));
  }

  public goto(index: number) {
    this.currentIndex = index;
    let path = this.getSourcePath();
    if (!path) return;
    const scale = getScale(this.workview);
    this.publish("showcursor", drawCursor(getLocation(index, path), 25 / scale));
    focus(this.input.children[index]);
  }

  private setSourcePath(path: string) {
    const index = this.currentIndex;
    setPath(this.sourcePath, path);
    this.publish("source-path-changed");
  }

  public getSourcePath() {
    return getPathCommands(this.sourcePath);
  }

  show(sourcePath?: string) {
    sourcePath && this.setSourcePath(sourcePath);
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

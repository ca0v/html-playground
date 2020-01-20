import { Dictionary } from "./Dictionary";
import { keys } from "./keys";

// do not use Alt
const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Control Delete End Enter Escape Home Minus PageUp PageDown Plus Shift Slash Space".split(
  " "
);
const isAtomic = (v: string) => 0 <= atomicTokens.indexOf(v);

type KeyboardShortcuts = Dictionary<KeyboardShortcut>;

type KeyboardShortcut = {
  key: string;
  title?: string;
  parent: KeyboardShortcut | null;
  ops: Array<() => { undo: () => void }>;
  subkeys: KeyboardShortcuts;
};

class UndoRedo {
  private stack: Array<{ do: () => { undo: () => void }, undo: () => void }> = [];
  private index = -1;

  public run(op: () => { undo: () => void }) {
    const undo = op();
    if (!undo?.undo) return;
    this.stack[++this.index] = { do: op, undo: undo.undo };
  }

  public canRedo() {
    return 1 <= this.stack.length && this.index < this.stack.length - 1;
  }

  public canUndo() {
    return 0 <= this.index;
  }

  public undo() {
    this.stack[this.index--].undo();
  }

  public redo() {
    this.stack[++this.index].do();
  }
}

export class ShortcutManager {
  private undos = new UndoRedo();
  public readonly shortcuts: KeyboardShortcut = { key: "", ops: [], subkeys: {}, parent: null };
  private currentState = this.shortcuts;

  private firstLetter = (word: string) => word[0];
  private tokenize = (words: string) =>
    words.split(/[ ]/).map(v => (isAtomic(v) ? v : this.firstLetter(v).toUpperCase()));

  private forceNode = (node: KeyboardShortcut, shortcuts: string[]): KeyboardShortcut => {
    if (!shortcuts.length) return node;
    const key = shortcuts.shift();
    if (typeof key === "undefined") throw "key cannot be empty";
    node.subkeys[key] = node.subkeys[key] || { key, parent: node, subkeys: {}, ops: [] };
    return this.forceNode(node.subkeys[key], shortcuts);
  };

  public help(root = this.currentState, deep = false): string {
    const visitAll = (node: KeyboardShortcut, cb: (node: KeyboardShortcut) => void) => {
      cb(node);
      keys(node.subkeys).forEach(key => visitAll(node.subkeys[key], cb));
    }
    const visitUp = (node: KeyboardShortcut, cb: (node: KeyboardShortcut) => void) => {
      cb(node);
      node.parent && visitUp(node.parent, cb);
    }

    if (deep) {
      const parentKeys = <Array<string | number>>[];
      visitAll(root, node => {
        if (node.ops && node.ops.length) {
          parentKeys.push(node.title || node.key);
        }
      });
      return parentKeys.join("\n");
    }

    let results = keys(root.subkeys);
    // if no child ops report parent ops
    if (!results.length) {
      root.parent && visitAll(root.parent, node => results.push(node.key));
    }
    return results.length ? `[${results.join("|")}]` : deep ? "" : this.help(root, true);
  }

  public watchKeyboard(root: HTMLElement, callbacks: { log: (message: string) => void }) {
    this.log = callbacks.log;
    // move into keyboard shortcuts
    root.addEventListener("keydown", event => {
      if (event.altKey) return; // reserved for the browser
      //if (event.ctrlKey) return; // app constrained not to use ctrl

      const map = <any>{
        " ": "Space",
        "-": "Minus",
        "+": "Plus",
        "/": "Slash",
      };

      const key = map[event.key] || event.key;

      let nextState = this.findNode(this.currentState, key);
      if (!nextState) {
        nextState = this.currentState.parent;
        while (nextState) {
          const tempState = this.findNode(nextState, key);
          if (tempState) {
            nextState = tempState;
            break;
          }
          nextState = nextState.parent;
        }
      }

      if (!nextState) {
        // suggest a key
        !event.repeat && this.log(`Try one of these: ${this.help(this.currentState)}`);
        return;
      }

      this.currentState = nextState;
      event.preventDefault();
      if (!this.currentState.ops.length) {
        !event.repeat && this.log(`Up next: ${this.help(this.currentState)}`);
        return;
      }

      if (!event.repeat) {
        this.log(`${this.currentState.title}`);
        keys(this.currentState.subkeys).length && this.log(`more: ${this.help(this.currentState)}`)
      }
      this.currentState.ops.forEach(op => this.undos.run(op));
    });
  }

  private findNode(node: KeyboardShortcut, shortcut: string): KeyboardShortcut | null {
    if (!shortcut) return node;
    return node.subkeys[isAtomic(shortcut) ? shortcut : shortcut.toUpperCase()];
  }

  public registerShortcut(title: string, callback: () => { undo: () => void }) {
    const tokens = this.tokenize(title);
    const node = this.forceNode(this.shortcuts, tokens);
    if (node.ops.length > 0) throw "cannot overload a keyboard shortcut";
    node.ops.push(callback);
    node.title = title;
    return node;
  }

  // to be replaced with calbacks.log
  private log(message: string) {
    console.log(message);
  }

  public redo() {
    if (!this.undos.canRedo()) {
      this.log("cannot redo anything");
      return;
    }
    this.undos.redo();
  }

  public undo() {
    if (!this.undos.canUndo()) {
      this.log("cannot undo anything");
      return;
    }
    this.undos.undo();
  }
}

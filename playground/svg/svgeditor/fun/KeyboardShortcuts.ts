import { Dictionary } from "./Dictionary";
import { keys } from "./keys";
import { UndoRedo } from "./UndoRedo";

// do not use Alt
const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Control Delete End Enter Escape Home Minus PageUp PageDown Plus Shift Slash Space".split(
  " "
);
const isAtomic = (v: string) => 0 <= atomicTokens.indexOf(v);

type KeyboardShortcuts = Dictionary<KeyboardShortcut>;

type KeyboardShortcut = {
  key: string;
  options?: { stateless: boolean, because: string };
  title?: string;
  parent: KeyboardShortcut | null;
  ops: Array<() => { undo: () => void }>;
  subkeys: KeyboardShortcuts;
};

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

  public help(terse = true, root = this.currentState): string {
    const visitEach = (node: KeyboardShortcut, cb: (node: KeyboardShortcut) => void) => {
      cb(node);
      keys(node.subkeys).forEach(key => visitEach(node.subkeys[key], cb));
    }

    const visitUp = (node: KeyboardShortcut, cb: (node: KeyboardShortcut) => void) => {
      cb(node);
      node.parent && visitUp(node.parent, cb);
    }

    const allNodes = (node: KeyboardShortcut) => {
      const nodes = <Array<KeyboardShortcut>>[];
      visitEach(root, node => {
        if (node.ops && node.ops.length) {
          nodes.push(node);
        }
      });
      return nodes;
    }

    const fullPath = (node: KeyboardShortcut) => {
      const nodes = <Array<KeyboardShortcut>>[];
      visitUp(node, node => nodes.push(node));
      return nodes;
    }

    if (terse) {
      return Object.keys(root.subkeys).join("|");
    }
    
    const markup = allNodes(root)
      .filter(node => 1 === node.ops.length)
      .map(node => {
        const path = fullPath(node).reverse();
        const deleteCount = path.indexOf(root);
        path.splice(0, deleteCount);
        return `${path.map(node => node.key).join("+")} - ${node.title}`;
      });

    return markup.join("\n");

  }


  public watchKeyboard(root: HTMLElement, callbacks: { log: (message: string) => void }) {
    this.log = callbacks.log;
    let lastStatefulState: KeyboardShortcut;

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
        !event.repeat && this.log(`${this.help(true, this.currentState)}`);
        return;
      }

      event.preventDefault();
      if (!nextState.ops.length) {
        this.currentState = nextState;
        !event.repeat && this.log(`${this.help(true, this.currentState)}`);
        return;
      }

      if (!event.repeat) {
        this.log(`${nextState.title}`);
        keys(nextState.subkeys).length && this.log(`${this.help(true, nextState)}`)
      }
      this.execute(nextState);
      if (!nextState.options?.stateless) {
        lastStatefulState = nextState;
      }
      this.currentState = lastStatefulState || this.currentState;
    });
  }

  public execute(nextState: KeyboardShortcut) {
    nextState.ops.forEach(op => {
      try {
        this.undos.run(op);
      } catch (ex) {
        this.log(ex);
      }
    });
  }

  private findNode(node: KeyboardShortcut, shortcut: string): KeyboardShortcut | null {
    if (!shortcut) return node;
    return node.subkeys[isAtomic(shortcut) ? shortcut : shortcut.toUpperCase()];
  }

  public registerShortcut(title: string, callback: () => { redo: () => void; undo: () => void }) {
    const tokens = this.tokenize(title);
    const node = this.forceNode(this.shortcuts, tokens);
    if (node.ops.length > 0) throw "cannot overload a keyboard shortcut";
    node.ops.push(callback);
    node.title = title;
    return node;
  }
  public getShortcut(title: string) {
    return this.forceNode(this.shortcuts, this.tokenize(title));
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

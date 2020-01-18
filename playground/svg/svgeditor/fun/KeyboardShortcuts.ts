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
  ops: Array<() => void>;
  subkeys: KeyboardShortcuts;
};

export class ShortcutManager {
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

  public help(root = this.shortcuts) {
    const childKeys = keys(root.subkeys);
    const visit = (node: KeyboardShortcut, cb: (node: KeyboardShortcut) => void) => {
      cb(node);
      node.parent && visit(node.parent, cb);
    }
    const parentKeys = <Array<string | number>>[];
    if (root.parent) {
      parentKeys.concat(keys(root.parent.subkeys));
    }
    visit(root, node => parentKeys.push(node.key));
    return `${root.key} -> [${(childKeys).join("|")}] ${parentKeys.join(" ")}`;
  }

  public watchKeyboard(root: HTMLElement, callbacks: { log: (message: string) => void }) {
    // move into keyboard shortcuts
    root.addEventListener("keydown", event => {
      if (event.altKey) return; // reserved for the browser
      if (event.ctrlKey) return; // app constrained not to use ctrl

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
        !event.repeat && callbacks.log(`Try one of these: ${this.help(this.currentState)}`);
        return;
      }

      this.currentState = nextState;
      event.preventDefault();
      if (!this.currentState.ops.length) {
        !event.repeat && callbacks.log(`Up next: ${this.help(this.currentState)}`);
        return;
      }

      if (!event.repeat) {
        callbacks.log(`executing ops: ${this.currentState.title}`);
      }
      this.currentState.ops.forEach(cb => cb());
    });
  }

  private findNode(node: KeyboardShortcut, shortcut: string): KeyboardShortcut | null {
    if (!shortcut) return node;
    return node.subkeys[isAtomic(shortcut) ? shortcut : shortcut.toUpperCase()];
  }

  public registerShortcut(title: string, callback: () => void) {
    const tokens = this.tokenize(title);
    const node = this.forceNode(this.shortcuts, tokens);
    node.ops.push(callback);
    node.title = title;
    return node;
  }
}

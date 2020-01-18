import { Dictionary } from "./Dictionary";
import { keys } from "./keys";

// do not use Alt
const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Control Delete End Enter Escape Home Minus PageUp PageDown Plus Shift Slash Space".split(
  " "
);
const isAtomic = (v: string) => 0 <= atomicTokens.indexOf(v);
const isCompound = (v: string) => 0 < v.indexOf("|") && -1 === v.indexOf(" ");

type KeyboardShortcuts = Dictionary<KeyboardShortcut>;

type KeyboardShortcut = {
  title?: string;
  parent: KeyboardShortcut | null;
  ops: Array<() => void>;
  subkeys: KeyboardShortcuts;
};

export class ShortcutManager {
  public readonly shortcuts: KeyboardShortcut = { ops: [], subkeys: {}, parent: null };
  private currentState = this.shortcuts;

  private firstLetter = (word: string) => word[0];
  private tokenize = (words: string) =>
    words.split(/[ ]/).map(v => (isAtomic(v) ? v : isCompound(v) ? v : this.firstLetter(v).toUpperCase()));

  private forceNode = (node: KeyboardShortcut, shortcuts: string[]): KeyboardShortcut => {
    if (!shortcuts.length) return node;
    const key = shortcuts.shift();
    if (typeof key === "undefined") throw "key cannot be empty";
    node.subkeys[key] = node.subkeys[key] || { parent: node, subkeys: {}, ops: [] };
    return this.forceNode(node.subkeys[key], shortcuts);
  };

  public help(root = this.shortcuts) {
    return keys(root.subkeys).join(" ");
  }

  watchKeyboard(root: HTMLElement) {
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

      console.log("you pressed: ", key, event.code);

      let nextState = this.findNode(this.currentState, key);
      if (!nextState) {
        nextState = this.currentState.parent;
        while (nextState) {
          console.log("scanning parent");
          const tempState = this.findNode(nextState, key);
          if (tempState) {
            console.log("found by searching siblings");
            nextState = tempState;
            break;
          }
          nextState = nextState.parent;
        }
      }

      if (!nextState) {
        // suggest a key
        console.log(this.help(this.currentState));
        return;
      }

      this.currentState = nextState;
      event.preventDefault();
      if (!this.currentState.ops.length) {
        console.log(`next keys: ${this.help(this.currentState)}`);
        return;
      }

      console.log("executing ops: ", this.currentState);
      this.currentState.ops.forEach(cb => cb());
    });
  }

  // depth first
  public findNode(node: KeyboardShortcut, shortcut: string): KeyboardShortcut | null {
    if (!shortcut) return node;
    const shortcuts = isAtomic(shortcut)
      ? [shortcut]
      : isCompound(shortcut)
        ? shortcut.split("|")
        : [shortcut.toUpperCase()];

    return node.subkeys[shortcuts[0]];
  }

  private _findNode(node: KeyboardShortcut, shortcut: string): KeyboardShortcut | null {
    if (node.subkeys[shortcut]) return node.subkeys[shortcut];
    // does it exist in any child?
    let result: KeyboardShortcut | null = null;
    keys(node.subkeys).some(key => (result = this._findNode(node.subkeys[key], shortcut)));
    return result;
  }

  public registerShortcut(title: string, callback: () => void) {
    const tokens = this.tokenize(title);
    const node = this.forceNode(this.shortcuts, tokens);
    node.ops.push(callback);
    node.title = title;
    return node;
  }
}

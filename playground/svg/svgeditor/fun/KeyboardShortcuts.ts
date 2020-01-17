import { Dictionary } from "./Dictionary";
import { keys } from "./keys";

// do not use Alt
const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Control Delete End Enter Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Home Insert Minus PageUp PageDown Plus Shift Slash Space".split(
  " "
);
const isAtomic = (v: string) => 0 <= atomicTokens.indexOf(v);
const isCompound = (v: string) => 0 < v.indexOf("|") && -1 === v.indexOf(" ");

type KeyboardShortcuts = Dictionary<KeyboardShortcut>;

type KeyboardShortcut = {
  title?: string;
  parent?: KeyboardShortcut;
  ops: Array<() => void>;
  subkeys: KeyboardShortcuts;
};

export class ShortcutManager {
  public readonly shortcuts: KeyboardShortcut = { ops: [], subkeys: {} };
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

  private help(root: KeyboardShortcut) {
    const visitEach = (node: KeyboardShortcut, visit: (node: KeyboardShortcut) => void) => {
      visit(node);
      keys(node.subkeys).forEach(key => visitEach(node.subkeys[key], visit));
    };

    let result: Array<string> = [];
    visitEach(root, node => {
      if (node.ops.length && node.title) {
        result.push(node.title);
      }
    });
    return result.sort().join("\n");
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
      let currentState = this.currentState;
      let nextState = this.findNode(currentState, key);
      if (nextState) {
        console.log("continuation found");
      } else {
        if (currentState.parent) {
          console.log("scanning parent");
          nextState = this.findNode(currentState.parent, key);
          if (nextState) {
            console.log("found by searching siblings");
          }
        }
      }
      if (!nextState) {
        nextState = this.findNode(this.shortcuts, key);
        if (nextState) {
          console.log("found searching root keys");
        }
      }
      if (!nextState) {
        // suggest a key
        console.log(this.help(this.shortcuts));
        //if (false !== this.publish(event.code)) event.preventDefault();
        return;
      }

      this.currentState = currentState = nextState;
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

  // depth first
  public findNode(node: KeyboardShortcut, shortcut: string): KeyboardShortcut | null {
    if (!shortcut) return node;
    const shortcuts = isAtomic(shortcut)
      ? [shortcut]
      : isCompound(shortcut)
      ? shortcut.split("|")
      : [shortcut.toUpperCase()];

    let result: KeyboardShortcut | null = null;
    shortcuts.some(shortcut => (result = this._findNode(node, shortcut)));
    return result;
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

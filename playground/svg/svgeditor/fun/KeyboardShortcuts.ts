import { Dictionary } from "./Dictionary";
import { keys } from "./keys";

const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Delete End Enter F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Home Insert PageUp PageDOwn".split(
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
  private firstLetter = (word: string) => word[0];
  private tokenize = (words: string) =>
    words.split(/[ +]/).map(v => (isAtomic(v) ? v : isCompound(v) ? v : this.firstLetter(v).toUpperCase()));

  private forceNode = (node: KeyboardShortcut, shortcuts: string[]): KeyboardShortcut => {
    if (!shortcuts.length) return node;
    const key = shortcuts.shift();
    if (typeof key === "undefined") throw "key cannot be empty";
    node.subkeys[key] = node.subkeys[key] || { parent: node, subkeys: {}, ops: [] };
    return this.forceNode(node.subkeys[key], shortcuts);
  };

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
  }
}

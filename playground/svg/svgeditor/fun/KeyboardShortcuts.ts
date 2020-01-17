import { Dictionary } from "./Dictionary";
import { keys } from "./keys";

const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Delete End Enter Home Insert PageUp PageDOwn".split(" ");
const isAtomic = (v: string) => 0 <= atomicTokens.indexOf(v);

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
    private tokenize = (words: string) => words.split(/[ +]/).map(v => isAtomic(v) ? v : this.firstLetter(v).toUpperCase());
    private getNode = (node: KeyboardShortcut, shortcuts: string[]): KeyboardShortcut => {
        if (!shortcuts.length)
            return node;
        const key = shortcuts.shift();
        if (typeof key === "undefined")
            throw "key cannot be empty";
        node.subkeys[key] = node.subkeys[key] || { parent: node, subkeys: {}, ops: [] };
        return this.getNode(node.subkeys[key], shortcuts);
    };

    // depth first
    public findNode(node: KeyboardShortcut, shortcut: string): KeyboardShortcut {
        if (!shortcut)
            return node;
        return this._findNode(node, isAtomic(shortcut) ? shortcut : shortcut.toUpperCase());
    }

    private _findNode(node: KeyboardShortcut, shortcut: string): KeyboardShortcut {
        if (node.subkeys[shortcut]) return node.subkeys[shortcut];
        return keys(node.subkeys).map(k => node.subkeys[k]).map(node => this.findNode(node, shortcut))[0];
    }

    public registerShortcut(title: string, callback: () => void) {
        const tokens = this.tokenize(title);
        const node = this.getNode(this.shortcuts, tokens);
        node.ops.push(callback);
        node.title = title;
    }
    ;
}

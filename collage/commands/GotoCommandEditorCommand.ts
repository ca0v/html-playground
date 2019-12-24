import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

function hasFocus(node: HTMLElement) {
  return document.activeElement === node;
}

export class GotoCommandEditorCommand implements Command {
  execute(repl: Repl, args: string): void | false {
    let editor = document.querySelector(".console") as HTMLElement;
    if (!editor) {
      repl.notify("no command editor found");
      return false;
    }
    if (hasFocus(editor)) return false;
    editor.focus();
  }
}

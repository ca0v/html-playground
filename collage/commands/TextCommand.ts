import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class TextCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [id, value] = args.split(" ");
    let panel = repl.selectPanel(id);
    if (!panel) return;
    panel.text = value;
  }
}

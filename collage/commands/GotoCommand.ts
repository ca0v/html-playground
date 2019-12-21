import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class GotoCommand implements Command {
  execute(repl: Repl, args: string): void {
    let id = args;
    let node = repl.select(id);
    if (!node) return;
    node.focus();
  }
}

import { Command } from "./Command";
import { Repl } from "../Repl";
export class GotoCommand implements Command {
  execute(repl: Repl, args: string): void {
    let id = args;
    let node = repl.select(id);
    if (!node) return;
    node.focus();
  }
}

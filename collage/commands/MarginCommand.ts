import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class MarginCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [id, width] = args.split(" ");
    let node = repl.select(id);
    if (!node) return;

    node.style.margin = `${width}em`;
    }
}

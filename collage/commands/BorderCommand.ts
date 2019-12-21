import { Command } from "./Command";
import { Repl } from "../Repl";
export class BorderCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [id, width] = args.split(" ");
    repl.selectPanel(id)?.border(width);
  }
}

import { Command } from "./Command";
import { Repl } from "../Repl";
export class BorderCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [id, width, color] = args.split(" ");
    repl.selectPanel(id)?.border(width, color);
  }
}

import { Command } from "./Command";
import { Repl } from "../Repl";
export class ZoomCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [noun, noun2] = args.split(" ");
    repl.selectPanel(noun)?.scale(noun2);

  }
}

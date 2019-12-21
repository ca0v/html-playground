import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class ZoomCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [noun, noun2] = args.split(" ");
    repl.selectPanel(noun)?.scale(noun2);

  }
}

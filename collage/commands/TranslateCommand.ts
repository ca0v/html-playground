import { Command } from "./Command";
import { Repl } from "../Repl";
export class TranslateCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [noun, noun2, noun3] = args.split(" ");
    repl.selectPanel(noun)?.pan(noun2, noun3 || "0");
  }
}

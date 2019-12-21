import { Command } from "./Command";
import { Repl } from "../Repl";
export class RotateCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [noun, noun2] = args.split(" ");
    repl.selectPanel(noun)?.rotateImage(noun2);
  }
}

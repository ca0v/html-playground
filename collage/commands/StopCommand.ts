import { Command } from "./Command";
import { Repl } from "../Repl";
export class StopCommand implements Command {
  execute(repl: Repl, args: string): void {
    repl.animations.stop(args);
  }
}

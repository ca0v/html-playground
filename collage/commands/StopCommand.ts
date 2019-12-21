import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class StopCommand implements Command {
  execute(repl: Repl, args: string): void {
    repl.animations.stop(args);
  }
}

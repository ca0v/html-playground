import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

export class StopCommand implements Command {
  execute(repl: Repl, args: string): void | false {
    if (!repl.animations.animations.length) return false;
    repl.animations.stop(args);
  }
}


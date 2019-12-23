import { Repl } from "../controls/Repl";

export interface Command {
  // return false to signal the command was not handled
  execute(repl: Repl, args?: string): void | false | Promise<void | false>;
}



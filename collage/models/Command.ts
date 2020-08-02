import { Repl } from "../controls/Repl";

export interface Command {
  about?(): string;
  // return false to signal the command was not handled
  execute(repl: Repl, args?: string): void | false | Promise<void | false>;
}



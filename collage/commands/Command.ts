import { Repl } from "../Repl";

export interface Command {
  execute(repl: Repl, args: string): void;
}

import { Repl } from "../controls/Repl";

export interface Command {
  execute(repl: Repl, args?: string): void;
}

import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class MergeCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [id1, id2] = args.split(" ");
    let node1 = repl.select(id1);
    let node2 = repl.select(id2);
    node1 && node2 && repl.merge_nodes(node1, node2);
  }
  
}

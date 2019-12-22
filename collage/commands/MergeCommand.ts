import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { CollagePanel } from "../controls/CollagePanel";

function merge_nodes(repl: Repl, panel1: CollagePanel, panel2: CollagePanel) {
  let node1 = panel1.panel;
  let node2 = panel2.panel;

  node2.classList.forEach(c => node1.classList.add(c));
  repl.removePanel(panel2);

  // if node1 is q1...q4 and only child then it assumes the q of it's container and replaces its container
  let qs = [1, 2, 3, 4].map(v => `q${v}`);
  if (qs.every(v => node1.classList.contains(v))) {
    const parent = node1.parentElement;
    if (!parent) return;

    if (parent.classList.contains("panel-container")) {
      qs.forEach(v => node1.classList.remove(v));
      qs.forEach(v => parent.classList.contains(v) && node1.classList.add(v));
      parent.parentElement?.insertBefore(node1, parent);
      parent.remove();
    }
  }
  repl.reindex();
}

export class MergeCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [id1, id2] = args.split(" ");
    let node1 = repl.selectPanel(id1);
    let node2 = repl.selectPanel(id2);
    node1 && node2 && merge_nodes(repl, node1, node2);
  }
  
}

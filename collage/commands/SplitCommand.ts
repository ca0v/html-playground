import { Command } from "./Command";
import { Repl } from "../Repl";

  /**
   * Splits the panel into 4 new child panels
   */
  export class SplitCommand implements Command {

    execute(repl: Repl, commandArgs: string): void {
        let id = commandArgs;

        let node = repl.select(id);
        if (!node) {
          console.log("no node found");
          return;
        }
    
        let panel = repl.panels.find(p => p.panel === node);
        if (!panel) {
          console.log("no panel found");
          return;
        }
    
        let originalIndex = repl.panels.indexOf(panel);
        let childPanels = panel.split();
        // remove since it is no longer a panel
        repl.panels.splice(originalIndex, 1, ...childPanels);
        childPanels.forEach(c => repl.addBehaviors(c));
        //this.panels.push(...childPanels);
        repl.reindex();
        }
    
}



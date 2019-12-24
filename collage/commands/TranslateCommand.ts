import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { getFocusPanels } from "./getFocusPanels";

export class TranslateImageCommand implements Command {

  constructor(public delta?: {
    x?: number;
    y?: number;
  }) { }


  execute(repl: Repl, args: string): void | false {
    if (!!args) {
      let [noun, noun2, noun3] = args.split(" ");
      repl.selectPanel(noun)?.pan(noun2, noun3 || "0");
    } else if (this.delta) {
      let panels = getFocusPanels(repl);
      if (!panels.length) return false;
      
      panels.forEach(panel => {
        panel.pan((this.delta!.x || 0) + "", (this.delta!.y || 0) + "");
      });
    } else {
      // not handled
      return false;
    }
  }
}

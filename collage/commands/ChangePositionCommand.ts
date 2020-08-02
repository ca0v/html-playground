import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { getFocusPanels } from "./getFocusPanels";

export class TranslatePanelCommand implements Command {
  constructor(public delta: {
    x?: number;
    y?: number;
  }) { }

  about(){
    let result = <string[]>[];
    let x = this.delta.x || 0;
    let y = this.delta.y || 0;

    if (x > 0) result.push(`${x} px right`);
    if (x < 0) result.push(`${-x} px left`);
    if (y > 0) result.push(`${y} px up`);
    if (y < 0) result.push(`${-y} px down`);
    return `move panel ${result.join(" and ")}`;
  }

  execute(repl: Repl, args: string): void | false {
    let panels = getFocusPanels(repl);
    if (!panels.length) return false;
    panels.forEach(panel => {
      let labelImageOrPanel = panel.panel;
      let computedTranform = getComputedStyle(labelImageOrPanel).transform;
      if (computedTranform === "none") computedTranform = "";
      labelImageOrPanel.style.transform = computedTranform + ` translate(${this.delta.x || 0}px, ${this.delta.y || 0}px)`;
    });
  }
}

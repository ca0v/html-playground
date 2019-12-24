import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { getFocusPanels } from "./getFocusPanels";

export class ChangePositionCommand implements Command {
  constructor(public delta: {
    x?: number;
    y?: number;
  }) { }

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

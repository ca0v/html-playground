import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

export class ChangePositionCommand implements Command {
  constructor(public delta: {
    x?: number;
    y?: number;
  }) { }

  execute(repl: Repl, args: string): void | false {
    repl.panels.filter(p => p.panel.classList.contains("focus")).forEach(panel => {
      let labelImageOrPanel = panel.panel;
      let computedTranform = getComputedStyle(labelImageOrPanel).transform;
      if (computedTranform === "none") computedTranform = "";
      labelImageOrPanel.style.transform = computedTranform + ` translate(${this.delta.x || 0}px, ${this.delta.y || 0}px)`;
    });
  }
}

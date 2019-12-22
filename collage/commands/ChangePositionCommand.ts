import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { isValidTarget } from "../fun/isValidTarget";

export class ChangePositionCommand implements Command {
  constructor(public delta: {
    x?: number;
    y?: number;
  }) { }
  execute(repl: Repl, args: string): void | false {
    let labelImageOrPanel = document.activeElement as HTMLElement;
    if (!labelImageOrPanel)
      return false;
    if (!isValidTarget(labelImageOrPanel))
      return false;
    let computedTranform = getComputedStyle(labelImageOrPanel).transform;
    if (computedTranform === "none") computedTranform = "";
    labelImageOrPanel.style.transform = computedTranform + ` translate(${this.delta.x || 0}px, ${this.delta.y || 0}px)`;
  }
}

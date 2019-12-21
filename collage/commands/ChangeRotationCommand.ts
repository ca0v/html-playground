import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { isValidTarget } from "../fun/isValidTarget";

export class ChangeRotationCommand implements Command {
  constructor(public delta: number) { }
  execute(repl: Repl, args: string): void | false {
    let labelImageOrPanel = document.activeElement as HTMLElement;
    if (!labelImageOrPanel)
      return false;
    if (!isValidTarget(labelImageOrPanel))
      return false;
    labelImageOrPanel.style.transform += `rotate(${this.delta}deg)`;
  }
}

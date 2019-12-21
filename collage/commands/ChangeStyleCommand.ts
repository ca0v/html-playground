import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class ChangeStyleCommand implements Command {
  constructor(public target: keyof(CSSStyleDeclaration)) {
  }
  execute(repl: Repl, args?: string | undefined): void | false {
    if (!args)
      return;
    let [id, value] = args.split(" ");
    let panel = repl.selectPanel(id);
    if (!panel)
      return;
    panel.panel.style[this.target] = value;
  }
}

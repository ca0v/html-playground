import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class ChangeStyleCommand implements Command {
  constructor(public target: keyof (CSSStyleDeclaration)) {
  }
  execute(repl: Repl, args?: string | undefined): void | false {
    if (!args)
      return;
    let panels = repl.panels;
    let [value, id] = args.split(" ");
    if (!!id) {
      let panel = repl.selectPanel(id);
      if (!panel)
        return;
      panels = [panel];
    }

    panels.forEach(panel => {
      panel.panel.style[<any>this.target] = value;
    });
  }
}

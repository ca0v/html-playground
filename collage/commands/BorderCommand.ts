import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

export class BorderCommand implements Command {
  about() {
    return "set the border WIDTH COLOR of ID1 ID2 ...";
  }

  execute(repl: Repl, args: string): void {
    const [width, color, ...ids] = args.split(" ").filter((v) => !!v);
    if (!width) throw "width required";
    if (!color) throw "color required";
    const targets = ids.length ? ids.map((id) => repl.selectPanel(id)) : repl.panels;
    targets.forEach((p) => p?.border(width, color));
  }
}

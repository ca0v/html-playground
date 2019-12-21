import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
export class HiResCommand implements Command {
  execute(repl: Repl, args: string): void {
    let id = args;
    let panel = repl.selectPanel(id);
    if (!panel) return;
    panel.upgradeResolution();

  }
}

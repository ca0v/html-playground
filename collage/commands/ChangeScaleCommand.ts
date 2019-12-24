import { Repl } from "../controls/Repl";
import { Command } from "../models/Command";

export class ChangeScaleCommand implements Command {
    constructor(public scale: number) {
    }
    execute(repl: Repl, args?: string | undefined): void | false {
        repl.panels.filter(p => p.panel.classList.contains("focus")).forEach(panel => {
            panel.scale(this.scale + "");
        });
    }
}

import { Repl } from "../controls/Repl";
import { Command } from "../models/Command";
import { getFocusPanels } from "./getFocusPanels";

export class ChangeScaleCommand implements Command {
    constructor(public scale: number) {
    }
    execute(repl: Repl, args?: string | undefined): void | false {
        let panels = getFocusPanels(repl);
        if (!panels.length) return false;

        panels.forEach(panel => {
            panel.scale(this.scale + "");
        });
    }
}

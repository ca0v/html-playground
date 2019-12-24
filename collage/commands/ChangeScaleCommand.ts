import { Repl } from "../controls/Repl";
import { Command } from "../models/Command";
import { getFocusPanels } from "./getFocusPanels";

export class ScalePanelCommand implements Command {
    constructor(public scale?: number) {
    }
    execute(repl: Repl, args?: string | undefined): void | false {
        if (!!args) {
            let [noun, noun2] = args.split(" ");
            let panel = repl.selectPanel(noun);
            if (!panel) return false;
            panel.scaleFrame(noun2);
        }

        let panels = getFocusPanels(repl);
        if (!panels.length) return false;

        panels.forEach(panel => {
            panel.scaleFrame(this.scale + "");
        });
    }
}

export class ScaleImageCommand implements Command {
    constructor(public scale?: number) {
    }
    execute(repl: Repl, args?: string | undefined): void | false {
        if (!!args) {
            let [noun, noun2] = args.split(" ");
            let panel = repl.selectPanel(noun);
            if (!panel) return false;
            panel.scaleImage(noun2);
            return;
        }
        let panels = getFocusPanels(repl);
        if (!panels.length) return false;

        panels.forEach(panel => {
            panel.scaleImage(this.scale + "");
        });
    }
}


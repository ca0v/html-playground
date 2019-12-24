import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { getFocusPanels } from "./getFocusPanels";

export class RotatePanelCommand implements Command {
  constructor(public delta: number) { }

  execute(repl: Repl, args: string): void | false {
    let panels = getFocusPanels(repl);
    if (!panels.length) return false;

    panels.forEach(panel => {
      let labelImageOrPanel = panel.panel;
      labelImageOrPanel.style.transform += `rotate(${this.delta}deg)`;
    });
  }
}

export class RotateImageCommand implements Command {
  constructor(public delta?: number) { }

  execute(repl: Repl, args: string): void | false {
    if (!!args) {
      let [noun, noun2] = args.split(" ");
      if (noun && noun2) {
        let panel = repl.selectPanel(noun);
        if (!panel) return false;
        panel.rotateImage(noun2);
        return;
      };
    }

    let panels = getFocusPanels(repl);
    if (!panels.length) return false;

    panels.forEach(panel => {
      let labelImageOrPanel = panel.image;
      labelImageOrPanel.style.transform += `rotate(${this.delta}deg)`;
    });
  }
}



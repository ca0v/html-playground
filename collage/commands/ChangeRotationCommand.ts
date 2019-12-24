import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

export class ChangeRotationCommand implements Command {
  constructor(public delta: number) { }

  execute(repl: Repl, args: string): void | false {
    repl.panels.filter(p => p.panel.classList.contains("focus")).forEach(panel => {
      let labelImageOrPanel = panel.panel;
      labelImageOrPanel.style.transform += `rotate(${this.delta}deg)`;
    });
  }
}

export class RotationImageCommand implements Command {
  constructor(public delta: number) { }

  execute(repl: Repl, args: string): void | false {
    repl.panels.filter(p => p.panel.classList.contains("focus")).forEach(panel => {
      let labelImageOrPanel = panel.image;
      labelImageOrPanel.style.transform += `rotate(${this.delta}deg)`;
    });
  }
}


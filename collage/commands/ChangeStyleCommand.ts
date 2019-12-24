import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

const units = "px em".split(" ");

function hasUnits(value: string) {
  return units.some(v => value.endsWith(v));
}

export class ChangeStyleCommand implements Command {
  constructor(
    public target: keyof Omit<CSSStyleDeclaration, number>,
    public options?: {
      units?: string;
      delta?: number;
    }
  ) { }

  private keyboardHandler(repl: Repl) {
    return repl.panels
      .filter(p => p.panel.classList.contains("focus"))
      .some(panel => {
        let target = panel.panel;
        let value = parseFloat(getComputedStyle(target)[this.target]) + (this.options?.delta ?? 0);
        target.style.setProperty(this.target, value + (this.options?.units ?? ""));
        return true;
      });
  }

  execute(repl: Repl, args?: string | undefined): void | false {
    if (!args) {
      if (this.keyboardHandler(repl)) return;
      return false;
    }

    let panels = repl.panels;
    let [value, id] = args.split(" ");
    if (!!id) {
      let panel = repl.selectPanel(id);
      if (!panel) return false;
      panels = [panel];
    }
    if (!panels.length) return false;

    if (this.options?.units && !hasUnits(value)) {
      value += this.options.units;
    }

    panels.forEach(panel => {
      panel.panel.style[<any>this.target] = value;
    });
  }
}



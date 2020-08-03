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

  about() {
    return `change ${this.target}`;
  }

  private keyboardHandler(repl: Repl) {
    return repl.panels
      .filter(p => p.panel.classList.contains("focus"))
      .some(panel => {
        const target = panel.panel;
        const style = getComputedStyle(target);
        const value = parseFloat(style[<any>this.target]) + (this.options?.delta ?? 0);
        target.style[<any>this.target] = value + (this.options?.units ?? "");
        return true;
      });
  }

  execute(repl: Repl, args?: string | undefined): void | false {
    if (!args) {
      if (this.keyboardHandler(repl)) return;
      return false;
    }

    const panels = repl.panels;
    const [value, ...ids] = args.split(" ");
    if (!value) throw "size required";

    const targets = (!ids.length) ? panels : ids.map(id => repl.selectPanel(id)).filter(v => !!v);
    if (!targets.length) return false;

    const units = !hasUnits(value) ? this.options?.units || "" : "";

    targets.forEach(panel => {
      if (!panel) return;
      panel.panel.style[<any>this.target] = `${value}${units}`;
    });

  }
}



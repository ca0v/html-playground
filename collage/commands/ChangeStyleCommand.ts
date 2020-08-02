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
    return `change style ${this.target} by ${this.options?.delta} ${this.options?.units}`;
  }

  private keyboardHandler(repl: Repl) {
    return repl.panels
      .filter(p => p.panel.classList.contains("focus"))
      .some(panel => {
        let target = panel.panel;
        const style = getComputedStyle(target);
        let value = parseFloat(style[<any>this.target]) + (this.options?.delta ?? 0);
        target.style[<any>this.target] = value + (this.options?.units ?? "");
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
      if (!panel) {
        repl.notify(`panel not found: ${id}`);
        return false;
      }
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



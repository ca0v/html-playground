import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

const units = "px em".split(" ");

function hasUnits(value: string) {
  return units.some(v => value.endsWith(v));
}

function isPanel(element: Element | null) {
  if (!element)
    return false;
  return element.classList.contains("panel") || element.classList.contains("panel-container");
}


export class ChangeStyleCommand implements Command {
  constructor(public target: keyof (CSSStyleDeclaration), public options?: {
    units?: string;
    delta?: number;
  }) {
  }

  private keyboardHandler() {
    let target = document.activeElement as HTMLElement;
    if (!isPanel(target)) return;
    let value = parseFloat(getComputedStyle(target)[this.target]) + (this.options?.delta ?? 0);
    target.style[<any>this.target] = value + (this.options?.units ?? "");
  }

  execute(repl: Repl, args?: string | undefined): void | false {
    if (!args) return this.keyboardHandler();

    let panels = repl.panels;
    let [value, id] = args.split(" ");
    if (!!id) {
      let panel = repl.selectPanel(id);
      if (!panel)
        return;
      panels = [panel];
    }

    if (this.options?.units && !hasUnits(value)) {
      value += this.options.units;
    }

    panels.forEach(panel => {
      panel.panel.style[<any>this.target] = value;
    });
  }
}

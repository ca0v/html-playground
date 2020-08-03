import { Repl } from "../controls/Repl";
import { Command } from "../models/Command";

export class ChangeFontSizeCommand implements Command {
  readonly #units: string;

  constructor(
    public delta: number,
    public options = {
      units: "px",
    }
  ) {
    this.#units = options?.units || "px";
  }

  about() {
    return this.delta > 0 ? `increase font by ${this.delta}${this.#units}` : `decrease font by ${-this.delta}${this.#units}`;
  }

  isLabel(element: Element | null) {
    if (!element) return false;
    return element.classList.contains("label");
  }

  execute(repl: Repl, args?: string | undefined): void | false {
    const label = document.activeElement as HTMLElement;
    if (!this.isLabel(label)) return false;
    const fontSize = parseFloat(getComputedStyle(label).fontSize);
    label.style.fontSize = `${fontSize + this.delta}${this.#units}`;
  }
}

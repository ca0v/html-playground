import { Repl } from "../controls/Repl";
import { Command } from "../models/Command";

export class ChangeFontSizeCommand implements Command {

    constructor(public delta: number) {
    }

    about() {
      return `increase font by ${this.delta}px`;
    }

    isLabel(element: Element | null) {
        if (!element)
            return false;
        return element.classList.contains("label");
    }

    execute(repl: Repl, args?: string | undefined): void | false {
        let label = document.activeElement as HTMLElement;
        if (!this.isLabel(label)) return false;
        let fontSize = parseFloat(getComputedStyle(label).fontSize);
        label.style.fontSize = `${fontSize + this.delta}px`;
    }
}


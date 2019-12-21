import { Repl } from "../controls/Repl";
import { Command } from "../models/Command";

export class ChangeFontSize implements Command {

    constructor(public delta: number) {
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

export class DecreaseFontSize extends ChangeFontSize {
    constructor() {
        super(-1);
    }
}

export class IncreaseFontSize extends ChangeFontSize {
    constructor() {
        super(1);
    }
}


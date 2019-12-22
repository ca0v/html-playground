import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { isVisible } from "../fun/isVisible";
export class ToggleVisibilityCommand implements Command {
  constructor(public options: {
    selector: string;
  }) {
  }
  execute(repl: Repl, args: string): void {
    let overlays = Array.from(document.querySelectorAll(this.options.selector)) as Array<HTMLElement>;
    let allVisible = overlays.every(v => isVisible(v));
    if (!allVisible) {
      overlays.forEach(v => v.style.visibility = "visible");
    }
    else {
      overlays.forEach(v => v.style.visibility = "hidden");
    }
  }
}

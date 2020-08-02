import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

export class StopCommand implements Command {
  about() { return "Stop Animations";}

  execute(repl: Repl, args: string): void | false {
    if (!repl.animations.animations.length) return false;
    repl.animations.stop(args);
  }
}

export class ToggleFocusCommand implements Command {
  about() { return "Toggle focus";}
  execute(repl: Repl, args: string): void | false {
    let activePanel = document.activeElement;
    if (!activePanel?.classList.contains("panel")) return false;
    activePanel.classList.toggle("focus");
    // here i am - if not "shift" key then unfocus all panels
  }
}

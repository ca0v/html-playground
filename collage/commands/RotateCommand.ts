import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

export class ChangeRotationCommand implements Command {

  constructor(public delta: number) { }

  execute(repl: Repl, args: string): void | false {
    let labelImageOrPanel = document.activeElement as HTMLElement;
    if (!labelImageOrPanel) return false;
    if (!["label", "panel", "panel-container", "img"].some(v => labelImageOrPanel.classList.contains(v))) return false;
    labelImageOrPanel.style.transform += `rotate(${this.delta}deg)`;
  }
}

export class RotateCommand implements Command {

  execute(repl: Repl, args: string): void {
    let [noun, noun2] = args.split(" ");
    if (noun && noun2) {
      repl.selectPanel(noun)?.rotateImage(noun2);
      return;
    };

    // applies a rotation tranformation to any element
  }
}

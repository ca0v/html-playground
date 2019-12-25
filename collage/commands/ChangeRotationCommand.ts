import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { getFocusPanels } from "./getFocusPanels";
import { transform } from "../fun/transform";

function rotateImage(repl: Repl, node: HTMLElement, angle: string) {
  if (!node)
    return;

  if (!!angle) {
    transform(node, `rotate(${angle}deg)`);
  }
  else {
    let angle = 0;
    let animations = repl.animations;
    animations.animate("rotate", () => {
      angle += 1;
      transform(node, `rotate(${angle}deg)`);
    });
  }

}


export class RotatePanelCommand implements Command {
  constructor(public delta: number) { }

  execute(repl: Repl, args: string): void | false {
    let panels = getFocusPanels(repl);
    if (!panels.length) return false;

    panels.forEach(panel => {
      let labelImageOrPanel = panel.panel;
      transform(labelImageOrPanel, `rotate(${this.delta}deg)`);
    });
  }
}

export class RotateImageCommand implements Command {
  constructor(public delta?: number) { }

  execute(repl: Repl, args: string): void | false {
    if (!!args) {
      let [noun, noun2] = args.split(" ");
      let panel = repl.selectPanel(noun);
      if (!panel) return false;
      rotateImage(repl, panel.image, noun2);
      return;
    }

    let panels = getFocusPanels(repl);
    if (!panels.length) return false;

    panels.forEach(panel => {
      let labelImageOrPanel = panel.image;
      transform(labelImageOrPanel, `rotate(${this.delta}deg)`);
    });
  }
}



import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { getFocusPanels } from "./getFocusPanels";
import { transform } from "../fun/transform";

/**
   * Move the image inside the frame
   * @param x horizontal offset in pixels
   * @param y vertical offset in pixels
   */
function pan(repl: Repl, node: HTMLElement, x: string, y: string) {
  let [dx, dy] = [0, 0];
  let animate = true;
  let pixelSize = 1;
  switch (x) {
    case "up":
      dy = -pixelSize;
      break;
    case "down":
      dy = pixelSize;
      break;
    case "left":
      dx = -pixelSize;
      break;
    case "right":
      dx = pixelSize;
      break;
    default:
      animate = false;
      dx = pixelSize * parseFloat(x);
      dy = pixelSize * parseFloat(y);
      break;
  }
  let op = () => {
    transform(node, `translate(${dx}px, ${dy}px)`);
  };
  op();
  let animations = repl.animations;
  animate && animations.animate("pan", op);
}

export class TranslateImageCommand implements Command {

  constructor(public delta?: {
    x?: number;
    y?: number;
  }) { }


  execute(repl: Repl, args: string): void | false {
    if (!!args) {
      let [id, x, y] = args.split(" ");
      let panel = repl.selectPanel(id);
      if (!panel) return false;
      pan(repl, panel.image, x, y || "0");
    } else if (this.delta) {
      let panels = getFocusPanels(repl);
      if (!panels.length) return false;

      panels.forEach(panel => {
        pan(repl, panel.image, (this.delta!.x || 0) + "", (this.delta!.y || 0) + "");
      });
    } else {
      // not handled
      return false;
    }
  }
}

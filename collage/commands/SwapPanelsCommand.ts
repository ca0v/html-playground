import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { CollagePanel } from "../controls/CollagePanel";
import { getFocusPanels } from "./getFocusPanels";

/**
 * swap images of two panels
 */
function swapImages(panel1: CollagePanel, panel2: CollagePanel) {
  let image1 = panel1.image;
  let image2 = panel2.image;
  let parent1 = image1.parentElement;
  let parent2 = image2.parentElement;
  if (!parent1 || !parent2) return false;
  let next1 = image1.nextElementSibling;
  let next2 = image2.nextElementSibling;
  image1.remove();
  image2.remove();
  parent2.insertBefore(image1, next2);
  parent1.insertBefore(image2, next1);
  let photo1 = panel1.photo;
  let photo2 = panel2.photo;
  panel1.image = image2;
  panel2.image = image1;
  panel1.photo = photo2;
  panel2.photo = photo1;
}


export class SwapPanelsCommand implements Command {
  private keyboardHandler(repl: Repl) {
    let panels = getFocusPanels(repl);
    if (!panels.length) return;
    if (2 !== panels.length) {
      repl.notify("Exactly two panels must be selected before you can perform a swap.");
      return false;
    }
    swapImages(panels[0], panels[1]);
  }

  execute(repl: Repl, args?: string | undefined): false | void | Promise<false | void> {
    if (!args)
      return this.keyboardHandler(repl);
    return false;
  }
}

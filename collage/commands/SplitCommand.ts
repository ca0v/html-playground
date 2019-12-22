import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { CollagePanel } from "../controls/CollagePanel";

/**
   * Splits the current panel into 4 equal size panels
   * This panel then takes on the role of a panel container
   */
  function split(panel: CollagePanel) {
    let [topleft, topright, bottomleft, bottomright] = [1, 2, 3, 4].map(n => document.createElement("div"));
    let children = [topleft, topright, bottomleft, bottomright].map(v => new CollagePanel(v));
    topleft.classList.add("q1");
    topright.classList.add("q2");
    bottomleft.classList.add("q3");
    bottomright.classList.add("q4");
    // photo contains no state so not cloning
    const photo = panel.photo;
    if (photo) {
      children.forEach(c => c.addPhoto(photo.clone()));
    }
    panel.panel.classList.remove("panel");
    panel.overlay.remove();
    panel.image.src = "";
    panel.panel.classList.add("panel-container");
    panel.panel.dataset["id"] = "";
    children.forEach(c => panel.panel.appendChild(c.panel));
    return children;
  }

/**
 * Splits the panel into 4 new child panels
 */
export class SplitCommand implements Command {

  execute(repl: Repl, commandArgs: string): void {
    let id = commandArgs;

    let node = repl.select(id);
    if (!node) {
      console.log("no node found");
      return;
    }

    let panel = repl.panels.find(p => p.panel === node);
    if (!panel) {
      console.log("no panel found");
      return;
    }

    let originalIndex = repl.panels.indexOf(panel);
    let childPanels = split(panel);
    // remove since it is no longer a panel
    repl.panels.splice(originalIndex, 1, ...childPanels);
    childPanels.forEach(c => repl.addBehaviors(c));
    repl.reindex();
  }

}



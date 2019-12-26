import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { CollagePanel } from "../controls/CollagePanel";
import { transform } from "../fun/transform";
import { bbox } from "../fun/bbox";
import { getImageResolution } from "../fun/getImageResolution";

export class HiResCommand implements Command {

  /**
   * replaces the current photo with one of higher quality
   */
  async upgradeResolution(repl: Repl, panel: CollagePanel) {
    if (!panel.photo)
      return;

    // attempts to increase an image size and decrease the transform scale 
    // to have a negligable effect on the image but allow for swapping in 
    // a higher resolution version.
    // this is not compensating for  padding, margin, border width, etc.
    // it is not preserving rotation
    let box = bbox(panel.image);
    let imageRect = panel.image.getBoundingClientRect();
    let scale = imageRect.width / box.width;
    if (1 > scale) {
      repl.notify("this would not be an upgrade");
      return;
    }
    let panelRect = panel.panel.getBoundingClientRect();
    panel.image.style.width = imageRect.width + "px";
    panel.image.style.height = imageRect.height + "px";
    let dx = imageRect.left - panelRect.left - parseFloat(panel.panel.style.borderLeftWidth);
    let dy = imageRect.top - panelRect.top - parseFloat(panel.panel.style.borderTopWidth);
    panel.image.style.transform = `translate(${dx}px,${dy}px)`;
    panel.setBackgroundImage(`${panel.photo.mediaInfo.baseUrl}=w${Math.floor(imageRect.width)}`);
    repl.notify(`upgraded by ${Math.round(scale * 100)}%`);
  }


  execute(repl: Repl, args: string): void {
    let id = args;
    let panel = repl.selectPanel(id);
    if (!panel) return;
    this.upgradeResolution(repl, panel);

  }
}


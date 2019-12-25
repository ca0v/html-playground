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
  async upgradeResolution(panel: CollagePanel) {
    if (!panel.photo)
      return;

    let scale = getImageResolution(panel.image);
    if (scale < 1) return;
    let w = panel.photoWidth;
    let imageRect = panel.image.getBoundingClientRect();
    let panelRect = panel.panel.getBoundingClientRect();
    panel.image.style.width = imageRect.width + "px";
    panel.image.style.height = imageRect.height + "px";
    let dx = imageRect.left - panelRect.left;
    let dy = imageRect.top - panelRect.top;
    panel.image.style.transform = `translate(${dx}px,${dy}px)`;
    panel.setBackgroundImage(`${panel.photo.mediaInfo.baseUrl}=w${Math.floor(w * scale)}`);
  }


  execute(repl: Repl, args: string): void {
    let id = args;
    let panel = repl.selectPanel(id);
    if (!panel) return;
    this.upgradeResolution(panel);

  }
}


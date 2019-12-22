import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { CollagePanel } from "../controls/CollagePanel";

export class HiResCommand implements Command {

  /**
   * replaces the current photo with one of higher quality
   */
  async upgradeResolution(panel: CollagePanel) {
    if (!panel.photo)
      return;

    // 512 is the maximum width/height of the placeholder image
    // 512 * scale = actual size
    let w = panel.photoWidth;
    let h = panel.photoHeight;
    let isPortrait = h > w;
    let scale = (isPortrait ? h : w) / 512.0;
    if (scale < 1) return;
    panel.setBackgroundImage(`${panel.photo.mediaInfo.baseUrl}=w${Math.floor(w * scale)}`);
  }


  execute(repl: Repl, args: string): void {
    let id = args;
    let panel = repl.selectPanel(id);
    if (!panel) return;
    this.upgradeResolution(panel);

  }
}


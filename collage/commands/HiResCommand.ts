import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { CollagePanel } from "../controls/CollagePanel";

function getResolution(image: HTMLImageElement) {
  let style = getComputedStyle(image);
  let w = parseFloat(style.width);
  let h = parseFloat(style.height);
  let isPortrait = h > w;
  // 512 is the maximum width/height of the placeholder image
  let scale = (isPortrait ? h : w) / 512.0;
  let rect = image.getBoundingClientRect();
  scale *= rect.width / w;
  return scale;
}

export class HiResCommand implements Command {

  /**
   * replaces the current photo with one of higher quality
   */
  async upgradeResolution(panel: CollagePanel) {
    if (!panel.photo)
      return;

    let scale = getResolution(panel.image);
    if (scale < 1) return;
    let w = panel.photoWidth;
    panel.setBackgroundImage(`${panel.photo.mediaInfo.baseUrl}=w${Math.floor(w * scale)}`);
  }


  execute(repl: Repl, args: string): void {
    let id = args;
    let panel = repl.selectPanel(id);
    if (!panel) return;
    this.upgradeResolution(panel);

  }
}


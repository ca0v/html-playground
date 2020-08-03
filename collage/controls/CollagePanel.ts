import { GoogleCollagePhoto } from "./GoogleCollagePhoto";
import { Sprite } from "./Sprite";
import { globals } from "../globals";

const units = "px em".split(" ");

function hasUnits(value: string) {
  return units.some(v => value.endsWith(v));
}

/**
 * Manages a single image on the collage,
 * not to be confused with an Photo on the album
 */
export class CollagePanel {

  /**
   * A panel contains a single photo (this one)
   */
  public photo: GoogleCollagePhoto | null;

  // the actual image rendered on the panel
  public image: HTMLImageElement;
  public sprite: Sprite;

  /**
   *
   * @param panel dom element to control
   */
  constructor(public panel: HTMLDivElement) {
    this.photo = null;
    this.image = document.createElement("img");
    this.sprite = new Sprite(this.image);
    this.image.classList.add("img");
    this.image.draggable = false;
    this.panel.appendChild(this.image);
    this.asPanel(this.panel);
  }

  /**
   * @param photo renders this photo onto the panel
   */
  addPhoto(photo: GoogleCollagePhoto) {
    this.photo = photo;
    this.setBackgroundImage(photo.mediaInfo.baseUrl);
  }

  /**
   * computes the width of the photo display area
   */
  get photoWidth() {
    return parseInt(window.getComputedStyle(this.image).width);
  }

  /**
   * computes the height of the photo display area
   */
  get photoHeight() {
    return parseInt(window.getComputedStyle(this.image).height);
  }

  /**
   * computes the scale of the photo, assumes aspect ratio is preserved (at least the width or height is 'auto')
   */
  get photoScale() {
    let style = window.getComputedStyle(this.image);
    let scale = style.height;
    if (scale === "auto") return 1.0;
    return parseFloat(scale) / 100.0;
  }

  /**
   * return the panel overlay (does not belong here)
   */
  get overlay() {
    return this.panel.querySelector(".overlay") as HTMLDivElement;
  }

  /**
   * Adds text as an input control on the panel
   * Label is absolutely positioned and can move outside the bounds of this panel
   * so probably doesn't belong here
   */
  set text(value: string) {
    let label = document.createElement("textarea");
    label.readOnly = true;
    label.title = "1";
    label.style.top = label.style.left = "0";
    label.classList.add("label");
    this.panel.appendChild(label);
    label.value = value;
    globals.dnd.moveable(label);
  }

  /**
   * Remove the panel from the dom
   */
  destroy() {
    this.panel.remove();
  }

  /**
 *
 * @param backgroundImage the url of the image to display in this panel
 */
  setBackgroundImage(backgroundImage: string): void {
    this.image.src = backgroundImage;
  }

  /**
   * style the frame
   * @param width border width in "em"
   */
  border(width: string, color = "white") {
    const units = hasUnits(width) ? "" : "em";
    this.panel.style.border = `${width}${units} solid ${color}`;
  }

  /**
  * Rotate the actual frame
  * @param angle angle in degrees
  */
  rotateFrame(angle: string) {
    let node = this.panel;
    if (!node)
      return;
    if (!!angle) {
      this.transform_node(`rotate(${angle}deg)`);
    }
    else {
      let angle = 0;
      let transform = node.style.transform;
      let animations = globals.repl.animations;
      animations.animate("rotate", () => {
        angle += 1;
        node.style.transform = transform + ` rotate(${angle}deg)`;
      });
    }
  }

  scaleFrame(scale: string) {
    this.transform_node(`scale(${scale}, ${scale})`);
  }

  private transform_node(v: string) {
    let node = this.panel;
    let transform = (node.style.transform || "").split(" ");
    transform.unshift(v);
    node.style.transform = transform.join(" ");
  }
  private asPanel(element: HTMLDivElement) {
    element.classList.add("panel");
    element.tabIndex = 1;
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    this.panel.appendChild(overlay);
  }

}

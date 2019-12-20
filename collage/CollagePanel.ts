import { GooglePhotos } from "./GooglePhotos";
import { GoogleCollagePhoto } from "./GoogleCollagePhoto";
import { globals } from "./globals";
/**
 * Manages a single image on the collage
 */
export class CollagePanel {
  public photo: GoogleCollagePhoto | null;
  constructor(public panel: HTMLDivElement) {
    this.photo = null;
    this.asPanel(this.panel);
  }
  addPhoto(photo: GoogleCollagePhoto) {
    this.photo = photo;
    this.setBackgroundImage(photo.img.style.backgroundImage);
  }
  async hires() {
    if (!this.photo)
      return;
    let photos = new GooglePhotos();
    let photo = await photos.getPhoto(this.photo.mediaInfo.id);
    this.setBackgroundImage(`url("${photo.baseUrl}")`);
  }
  get overlay() {
    return this.panel.querySelector(".overlay") as HTMLDivElement;
  }
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
  destroy() {
    this.panel.remove();
  }
  split() {
    let [topleft, topright, bottomleft, bottomright] = [1, 2, 3, 4].map(n => document.createElement("div"));
    let children = [topleft, topright, bottomleft, bottomright].map(v => new CollagePanel(v));
    topleft.classList.add("q1");
    topright.classList.add("q2");
    bottomleft.classList.add("q3");
    bottomright.classList.add("q4");
    children.forEach(c => c.setBackgroundImage(this.panel.style.backgroundImage));
    this.panel.classList.remove("panel");
    this.overlay.remove();
    this.panel.style.backgroundImage = "";
    this.panel.classList.add("panel-container");
    this.panel.dataset["id"] = "";
    children.forEach(c => this.panel.appendChild(c.panel));
    return children;
  }
  setBackgroundImage(backgroundImage: string): void {
    this.panel.style.backgroundImage = backgroundImage;
  }
  /**
   * style the frame
   * @param width border width in "em"
   */
  border(width: string) {
    this.panel.style.border = `${width}em solid white`;
  }
  /**
   * Move the image inside the frame
   * @param x horizontal offset in pixels
   * @param y vertical offset in pixels
   */
  pan(x: string, y: string) {
    let node = this.panel;
    if (!node)
      return;
    let [dx, dy] = [0, 0];
    let animate = true;
    let pixelSize = 1 / 16;
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
      let x0 = parseFloat(node.style.backgroundPositionX || "0");
      let y0 = parseFloat(node.style.backgroundPositionY || "0");
      x0 += dx;
      y0 += dy;
      node.style.backgroundPositionX = `${x0}em`;
      node.style.backgroundPositionY = `${y0}em`;
    };
    op();
    animate && globals.animations.animate("pan", op);
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
      globals.animations.animate("rotate", () => {
        angle += 1;
        node.style.transform = transform + ` rotate(${angle}deg)`;
      });
    }
  }
  scaleFrame(scale: string) {
    this.transform_node(`scale(${scale}, ${scale})`);
  }
  /**
   * Scale the image
   * @param scale percentage delta from current scale
   */
  scale(scale: string) {
    let node = this.panel;
    if (!node)
      return;
    if (!scale) {
      let backgroundSize = getComputedStyle(node).backgroundSize;
      let scale = parseFloat(backgroundSize) / 100;
      globals.animations.animate("zoom", () => {
        scale *= 1.01;
        node.style.backgroundSize = `${100 * scale}%`;
      });
    }
    else {
      let effectiveScale = parseFloat(scale) * (this.getData("scale") || 1.0);
      node.style.backgroundSize = `auto ${100 * effectiveScale}%`;
      this.setData("scale", effectiveScale);
    }
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
  private getData(tag: string) {
    let element = this.panel;
    let dataStr = element.dataset.data = element.dataset.data || "{}";
    let data = JSON.parse(dataStr);
    return data[tag];
  }
  private setData(tag: string, value: any) {
    let element = this.panel;
    let data = JSON.parse(element.dataset.data || "{}");
    data[tag] = value;
    element.dataset.data = JSON.stringify(data);
  }
}

/**
 * Manages image style.transform by persisting
 * the scale and rotation to facilitate computing transforms
 */
export class Sprite {
  public x: number;
  public y: number;
  public r: number;
  public s: number;
  constructor(public image: HTMLImageElement) {
    this.x = this.y = this.r = 0;
    this.s = 1;
  }
  transform(args: {
    dx?: number;
    dy?: number;
    scale?: number;
    angle?: number;
  }) {
    this.x += (args.dx || 0);
    this.y += (args.dy || 0);
    this.r += (args.angle || 0);
    this.s *= (args.scale || 1.0);
    this.image.style.transform = `translate(${this.x}px,${this.y}px) rotate(${this.r}deg) scale(${this.s})`;
  }
  translate(dx: number, dy: number) {
    return this.transform({ dx, dy });
  }
  rotate(angle: number) {
    return this.transform({ angle });
  }
  scale(scale: number) {
    return this.transform({ scale });
  }
  // modify the pixel density of the image
  // useful when using google photos API to 
  // request higher resolution photos
  upscale(scale: number) {
    let style = getComputedStyle(this.image);
    let width = parseFloat(style.width);
    let height = parseFloat(style.height);
    this.scale(1 / scale);
    this.image.style.width = scale * width + "px";
    this.image.style.height = scale * height + "px";
    this.translate(width / 2 - width * scale / 2, height / 2 - height * scale / 2);
  }
}

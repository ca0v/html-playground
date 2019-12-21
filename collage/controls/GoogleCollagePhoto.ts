import { CollagePhoto } from "./CollagePhoto";
import { GoogleMediaItem } from "../models/GoogleMediaItem";

export class GoogleCollagePhoto extends CollagePhoto<GoogleMediaItem> {
  public img: HTMLDivElement;

  constructor(public mediaInfo: GoogleMediaItem) {
    super();
    let img = this.img = document.createElement("div");
    img.classList.add("img");
    img.style.backgroundImage = `url(${this.mediaInfo.baseUrl})`;
  }
  
  renderInto(target: HTMLElement) {
    target.appendChild(this.img);
  }

  clone() {
    return new GoogleCollagePhoto(JSON.parse(JSON.stringify(this.mediaInfo)));
  }
}

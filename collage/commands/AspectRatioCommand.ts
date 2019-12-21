import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

export class AspectRatioCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [w, h] = args.split(" ");
    let width = parseFloat(w);
    let height = parseFloat(h);
    let window = document.querySelector(".window") as HTMLElement;
    let canvas = window.parentElement as HTMLElement;
    let currentWidth = parseFloat(getComputedStyle(canvas).width);
    let currentHeight = parseFloat(getComputedStyle(canvas).height);
    // multiple width and height by maximum scale such that
    // width * scale <= currentWidth and height * scale <= currentHeight
    let sx = currentWidth / width;
    let sy = currentHeight / height;
    let scale = Math.min(sx, sy);
    window.style.width = `${Math.round(width * scale)}px`;
    window.style.height = `${Math.round(height * scale)}px`;
  }
}

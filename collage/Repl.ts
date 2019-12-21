import { tail } from "./tail";
import { CommandParser } from "./CommandParser";
import { CollagePanel } from "./CollagePanel";
import { GoogleCollagePhoto } from "./GoogleCollagePhoto";
import { GooglePhotos } from "./GooglePhotos";
import { GooglePhotoAPI } from "./GooglePhotoAPI";
import { Animations } from "./Animations";
import { DragAndDrop } from "./DragAndDrop";

export class Repl {
  private panels: Array<CollagePanel> = [];
  private photos: Array<GoogleCollagePhoto> = [];
  private commandHistory: Array<string> = [];
  private commandHistoryIndex = -1;
  public dnd: DragAndDrop | null = null;

  constructor(public animations: Animations) {
    // cannot set dnd because dnd needs repl (for now)
  }

  private commands = ["aspect", "export", "border", "margin", "move", "open", "pan", "rotate", "scale", "split", "stop", "zoom"];

  private getCommand(command: string) {
    let [token] = command.split(" ", 2);
    return this.commands.find(v => v.startsWith(token));
  }

  async eval(command: string) {
    console.log(`executing: ${command}`);
    let [verb, noun, noun2, noun3] = command.split(" ");
    verb = this.getCommand(verb) || verb;
    switch (verb) {
      case "aspect":
        this.setAspectRatio(noun, noun2);
        break;
      case "export":
        let canvas = await this.asCanvas();
        if (!canvas) return;

        let img = document.createElement("img");
        img.classList.add("export-result");
        img.src = canvas.toDataURL();
        document.body.insertBefore(img, document.body.firstElementChild);
        break;
      case "border":
        this.border(noun, noun2);
        break;
      case "goto":
        this.goto(noun);
        break;
      case "pad":
        this.pad(noun, noun2);
        break;
      case "text":
        this.text(noun, tail(tail(command)));
        break;
      case "translate":
      case "pan":
        this.selectPanel(noun)?.pan(noun2, noun3 || "0");
        break;
      case "margin":
        this.margin(noun, noun2);
        break;
      case "merge":
        this.merge(noun, noun2);
        break;
      case "hires":
        this.hires(noun);
        break;
      case "move":
        this.move(noun, noun2);
        break;
      case "rotate":
        this.selectPanel(noun)?.rotateFrame(noun2);
        break;
      case "split":
        this.split(noun);
        break;
      case "zoom":
        this.selectPanel(noun)?.scale(noun2);
        break;
      case "scale":
        this.selectPanel(noun)?.scaleFrame(noun2);
        break;
      case "stop":
        this.animations.stop(noun);
        break;
    }
  }

  setAspectRatio(w: string, h: string) {
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
  // create a canvas of the entire collage
  async asCanvas() {
    return new Promise<HTMLCanvasElement>((good, bad) => {
      let imageCanvas = document.querySelector(".canvas")?.getBoundingClientRect();
      if (!imageCanvas) return;

      let canvas = document.createElement("canvas");
      canvas.width = imageCanvas.width;
      canvas.height = imageCanvas.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let count = 0;
      let panels = this.panels.filter(p => 0 === getComputedStyle(p.panel).backgroundImage.indexOf(`url("`));
      console.log("loading", panels.length);
      panels.forEach(p => {
        let pos = p.panel.getBoundingClientRect();
        let img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.width = pos.width;
        img.height = pos.height;
        img.style.transform = p.panel.style.transform;
        img.onload = () => {
          ctx.drawImage(img, pos.x, pos.y);
          count++;
          console.log("loaded:", count);
          if (count === panels.length) {
            good(canvas);
          }
        };
        // strip url("");
        let url = getComputedStyle(p.panel).backgroundImage;
        console.log("url", url);
        url = url.substring(5, url.length - 2);
        console.log("url", url);
        img.src = url;
      });
    });
  }

  getCollageOverlays() {
    return Array.from(document.querySelectorAll(`.panel[data-id] .overlay`)) as HTMLElement[];
  }

  getPhotoOverlays() {
    return Array.from(document.querySelectorAll(`.photos .img .overlay[data-id]`)) as HTMLElement[];
  }

  select(id: string) {
    return this.selectPanel(id)?.panel;
  }

  selectPanel(id: string) {
    return this.panels.find(p => p.overlay.dataset.id === id);
  }

  selectPhoto(id: string) {
    return this.photos[parseInt(id) - 1];
  }

  merge_nodes(node1: HTMLElement, node2: HTMLElement) {
    node2.classList.forEach(c => node1.classList.add(c));
    node2.remove();
    // if node1 is q1...q4 and only child then it assumes the q of it's container and replaces its container
    let qs = [1, 2, 3, 4].map(v => `q${v}`);
    if (qs.every(v => node1.classList.contains(v))) {
      const parent = node1.parentElement;
      if (!parent) return;

      if (parent.classList.contains("panel-container")) {
        qs.forEach(v => node1.classList.remove(v));
        qs.forEach(v => parent.classList.contains(v) && node1.classList.add(v));
        parent.parentElement?.insertBefore(node1, parent);
        parent.remove();
      }
    }
    this.reindex();
  }

  reindex() {
    this.panels.forEach((p, i) => p.overlay.dataset.id = p.overlay.innerText = i + 1 + "");
  }

  border(id: string, width: string) {
    this.selectPanel(id)?.border(width);
  }

  goto(id: string) {
    let node = this.select(id);
    if (!node) return;
    node.focus();
  }

  pad(id: string, width: string) {
    let node = this.select(id);
    if (!node) return;
    node.style.padding = `${width}em`;
  }

  text(id: string, value: string) {
    let panel = this.selectPanel(id);
    if (!panel) return;
    panel.text = value;
  }

  margin(id: string, width: string) {
    let node = this.select(id);
    if (!node) return;

    node.style.margin = `${width}em`;
  }

  merge(id1: string, id2: string) {
    let node1 = this.select(id1);
    let node2 = this.select(id2);
    node1 && node2 && this.merge_nodes(node1, node2);
  }

  hires(id: string) {
    let panel = this.selectPanel(id);
    if (!panel) return;
    panel.upgradeResolution();
  }

  move(id1: string, id2: string) {
    let photo = this.selectPhoto(id1);
    if (!photo) return;


    let panel = this.selectPanel(id2);
    if (!panel) return;

    panel.addPhoto(photo);
  }

  /**
   * Splits the panel into 4 new child panels
   * @param id panel identifier
   */
  split(id: string) {
    let node = this.select(id);
    if (!node) {
      console.log("no node found");
      return;
    }

    let panel = this.panels.find(p => p.panel === node);
    if (!panel) {
      console.log("no panel found");
      return;
    }

    let originalIndex = this.panels.indexOf(panel);
    let childPanels = panel.split();
    // remove since it is no longer a panel
    this.panels.splice(originalIndex, 1, ...childPanels);
    childPanels.forEach(c => this.addBehaviors(c));
    //this.panels.push(...childPanels);
    this.reindex();
  }

  /**
   * Adds zoom and drag capabilities to a panel
   * @param panel make this panel interactive
   */
  addBehaviors(panel: CollagePanel) {
    let overlay = panel.overlay;
    let dnd = this.dnd;
    if (dnd) {
      dnd.zoomable(overlay);
      console.log(`${overlay.innerHTML} is zoomable`);
      dnd.draggable(overlay);
      dnd.panable(panel);
      console.log(`${overlay.innerHTML} is draggable`);
      dnd.droppable(overlay);
      console.log(`${overlay.innerHTML} is droppable`);
    }
  }

  reindexPhotos() {
    this.photos.forEach((photo, i) => {
      let p = photo.img;
      let overlay = p.querySelector(".overlay") as HTMLElement;
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.dataset.id = overlay.innerText = 1 + i + "";
        p.appendChild(overlay);
        this.dnd?.draggable(overlay);
        console.log(`${overlay.innerHTML} is draggable`);
      }
    })
  }

  priorCommand() {
    if (this.commandHistoryIndex > 0) {
      return this.commandHistory[--this.commandHistoryIndex];
    }
    return "";
  }

  nextCommand() {
    if (this.commandHistoryIndex < this.commandHistory.length - 1) {
      return this.commandHistory[++this.commandHistoryIndex];
    }
    return "";
  }

  async startup() {
    let childPanels = Array.from(document.querySelectorAll(".panel")).map(p => new CollagePanel(<HTMLDivElement>p));
    childPanels.forEach(c => this.addBehaviors(c));
    this.panels.push(...childPanels);
    let cmd = document.querySelector(".console") as HTMLInputElement;
    cmd.onkeydown = event => {
      switch (event.key) {
        case "Enter":
          this.executeCommand(cmd.value);
          cmd.value = "";
          break;
        case "ArrowUp":
          cmd.value = this.priorCommand();
          break;
        case "ArrowDown":
          cmd.value = this.nextCommand();
          break;
      }
    };
    this.reindex();

    let photos = new GooglePhotos();
    const target = document.querySelector(".photos") as HTMLElement;
    if (target) {
      const albums = await photos.getAlbums();
      albums.forEach(async album => {
        let mediaItems = await photos.getAlbum(album);
        mediaItems.forEach(mediaItem => {
          let photo = new GoogleCollagePhoto(mediaItem);
          this.photos.push(photo);
          photo.renderInto(target);
          this.reindexPhotos();
        });
      });
    }
  }

  public executeCommand(cmd: string) {
    this.eval(cmd);
    this.commandHistoryIndex = this.commandHistory.push(cmd);
  }

  public parseCommand(command: string) {
    let ai = new CommandParser();
    return ai.parsePhrase(command);
  }
}


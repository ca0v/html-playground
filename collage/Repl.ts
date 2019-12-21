import { tail } from "./tail";
import { CommandParser } from "./CommandParser";
import { CollagePanel } from "./CollagePanel";
import { GoogleCollagePhoto } from "./GoogleCollagePhoto";
import { GooglePhotos } from "./GooglePhotos";
import { Animations } from "./Animations";
import { DragAndDrop } from "./DragAndDrop";
import { Commands } from "./Commands";

export class Repl {
  // public so split command can operate on them
  public panels: Array<CollagePanel> = []; 
  private photos: Array<GoogleCollagePhoto> = [];
  private commandHistory: Array<string> = [];
  private commandHistoryIndex = -1;
  public dnd: DragAndDrop | null = null;

  constructor(public animations: Animations, public commands: Commands) {
    // cannot set dnd because dnd needs repl (for now)
  }

  async eval(command: string) {
    console.log(`executing: ${command}`);
    let [verb, noun, noun2, noun3] = command.split(" ");
    let handler = this.commands.getCommand(verb);
    if (handler) {
      handler.execute(this, tail(command));
      return;
    }
    switch (verb) {
      case "export":
        let canvas = await this.asCanvas();
        if (!canvas) return;

        let img = document.createElement("img");
        img.classList.add("export-result");
        img.src = canvas.toDataURL();
        document.body.insertBefore(img, document.body.firstElementChild);
        break;
    }
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


/**
 * One big happy family of classes to avoid loading
 * and concatination
 */

/** Interfaces  */
interface Dictionary<T> {
  [Key: string]: T;
}

declare var gapi: {
  auth2: {
    getAuthInstance: () => {
      isSignedIn: { listen: (cb: (isSignedIn: boolean) => void) => void; get: () => boolean };
      signIn: () => void;
      signOut: () => void;
    };
  };
  load: (type: string, cb: Function) => void;
  client: {
    init: (args: { apiKey: string; discoveryDocs: Array<string>; clientId: string; scope: string }) => Promise<any>;
    photoslibrary: {
      albums: { list: Function };
      mediaItems: {
        search: (args: {
          albumId: string;
        }) => Promise<{ result: { nextPageToken?: string; mediaItems: Array<GoogleMediaItem> } }>;
      };
    };
  };
};

/** global variables */
let globals = {
  allowSpeechRecognition: false,
  debug: true,
}

/** Global Functions */
function gotoCommandEditor() {
  let editor = document.querySelector(".console") as HTMLElement;
  if (!editor) {
    console.log("no command editor found");
    return;
  }
  editor.focus();
}

function getActiveOverlay() {
  let activePanel = document.activeElement;
  if (!activePanel) {
    console.log("no active panel");
    return;
  }
  return activePanel.querySelector(".overlay") as HTMLElement;
}
function setCommand(command: string) {
  let cmd = document.querySelector(".console") as HTMLInputElement;
  cmd.value = command;
}

/** Global Classes */

/**
 * Try to turn a spoken phrase into a command grammar
 */
class CommandParser {
  parsePhrase(phrase: string) {
    phrase = phrase.toLowerCase();
    let map = <any>{
      "zoom in": "zoom",
      "zoom out": "zoom",
      "drag": "pan",
      "number for": "4",
      "number": "",
      "frame": "",
      "photo": "",
      "one": "1",
      "two": "2",
      "three": "3",
      "four": "4",
      "five": "5",
      "six": "6",
      "seven": "7",
      "eight": "8",
      "nine": "9",
      "into": "",
      "on": "",
      "and": "",
      "picture": "",
      "go to": "goto",
      "-": " ", // "move 7-6"
    }
    Object.keys(map).forEach(v => phrase = phrase.replace(v, map[v]));
    let tokens = phrase.split(" ");
    tokens = tokens.map(v => map[v] ?? v).filter(v => !!v);
    return tokens.join(" ");
  }
}

/**
 * manages user interactions for keyboard shortcuts, wheel, drag, click events
 */
class DragAndDrop {

  private source: HTMLElement | null = null;

  constructor() {
    window.addEventListener("wheel", (event) => {
      let source = getActiveOverlay();
      if (!source) {
        console.log("no active overlay found");
        return;
      }
      let from = source.innerHTML;

      // -150 => 0.9, 150 => 1.1, so
      let delta = 1 + event.deltaY / 1500;
      repl.executeCommand(`zoom ${from} ${delta}`);
    });

    window.addEventListener("keydown", event => {
      let source = getActiveOverlay();
      if (!source) {
        console.log("no active overlay found");
        return;
      }
      let from = source.innerHTML;

      switch (event.key) {
        case "ArrowDown":
          repl.executeCommand(`pan ${from} 0 1`);
          break;
        case "ArrowUp":
          repl.executeCommand(`pan ${from} 0 -1`);
          break;
        case "ArrowLeft":
          repl.executeCommand(`pan ${from} -1 0`);
          break;
        case "ArrowRight":
          repl.executeCommand(`pan ${from} 1 0`);
          break;
        case "(":
        case "<":
          repl.executeCommand(`rotate ${from} -1`);
          break;
        case ")":
        case ">":
          repl.executeCommand(`rotate ${from} 1`);
          break;
        case "+":
          repl.executeCommand(`zoom ${from} ${1.01}`);
          break;
        case "-":
          repl.executeCommand(`zoom ${from} ${0.99}`);
          break;
        case "c":
          event.preventDefault();
          gotoCommandEditor();
          break;
        case "Enter":
        case " ":
          repl.executeCommand("stop");
          break;
        default:
          console.log(`${event.key} not handled`);
      }
    });
  }

  /**
   * Make an element a drag source
   * @param div element to make draggable
   */
  draggable(draggable: HTMLElement) {
    draggable.classList.add("draggable");
    draggable.draggable = true;
    draggable.addEventListener("dragstart", event => this.ondragstart(draggable))
  }

  /**
   * Make an element a drop target
   * @param target element to make into a drop target (draggable are droppable, bad name)
   */
  droppable(target: HTMLElement) {
    target.addEventListener("dragover", (event) => {
      if (!this.source) return;
      event.preventDefault();
      this.ondragover(target, this.source);
    });

    target.addEventListener("drop", (event) => {
      if (!this.source) return;
      event.preventDefault();
      this.ondrop(target, this.source);
    });
  }

  /**
   * 
   * @param source listen for wheel events
   */
  zoomable(source: HTMLElement) {
  }

  ondragstart(source: HTMLElement) {
    this.source = source;
  }

  ondragover(target: HTMLElement, source: HTMLElement) {
    // nothing to do?
  }

  ondrop(target: HTMLElement, source: HTMLElement) {
    let from = source.innerHTML;
    let to = target.innerHTML;
    let command = `move ${from} ${to}`;
    repl.executeCommand(command);
  }
}

/**
 * Manages a single image on the collage
 */
class CollagePanel {

  constructor(public panel: HTMLDivElement) {
    this.asPanel(this.panel);
  }

  get overlay() {
    return this.panel.querySelector(".overlay") as HTMLDivElement;
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
    if (!node) return;

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
    animate && animations.animate("pan", op);
  }

  /**
   * Rotate the actual frame
   * @param angle angle in degrees
   */
  rotateFrame(angle: string) {
    let node = this.panel;
    if (!node) return;

    if (!!angle) {
      this.transform_node(`rotate(${angle}deg)`);
    } else {
      let angle = 0;
      let transform = node.style.transform;
      animations.animate("rotate", () => {
        angle += 1;
        node.style.transform = transform + ` rotate(${angle}deg)`;
      });
    }
  }

  scaleFrame(scale: string) {
    this.transform_node(`scale(${scale}, ${scale})`)
  }

  /**
   * Scale the image
   * @param scale percentage delta from current scale
   */
  scale(scale: string) {
    let node = this.panel;
    if (!node) return;

    if (!scale) {
      let backgroundSize = getComputedStyle(node).backgroundSize;
      let scale = parseFloat(backgroundSize) / 100;
      animations.animate("zoom", () => {
        scale *= 1.01;
        node.style.backgroundSize = `${100 * scale}%`;
      });
    } else {
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

class GooglePhotoSignin {
  private peopleApiDiscovery = "";
  // where to store these values?
  private scopes = "https://www.googleapis.com/auth/photoslibrary.readonly";
  private authorizeButton = document.getElementById("authorize-button") as HTMLButtonElement;
  private signoutButton = document.getElementById("signout-button") as HTMLButtonElement;
  private ready = () => { };

  async handleClientLoad() {
    // Load the API client and auth2 library.
    await new Promise((resolve, reject) => {
      gapi.load("client:auth2", resolve);
    });

    let credentialsResponse = await fetch("./web/credentials.json");
    let credentials: { apiKey: string; clientId: string } = await credentialsResponse.json();
    let resp = await fetch("./web/photos_rest_v1.json");
    this.peopleApiDiscovery = await resp.json();

    await this.initClient(credentials);
  }

  private async initClient(args: { apiKey: string; clientId: string }) {
    return new Promise<any>(async (good, bad) => {
      this.ready = () => good();

      await gapi.client.init({
        apiKey: args.apiKey,
        discoveryDocs: [this.peopleApiDiscovery],
        clientId: args.clientId,
        scope: this.scopes,
      });

      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      this.authorizeButton.onclick = this.handleAuthClick;
      this.signoutButton.onclick = this.handleSignoutClick;
    });
  }

  private updateSigninStatus(isSignedIn: boolean) {
    if (isSignedIn) {
      this.authorizeButton.style.display = "none";
      this.signoutButton.style.display = "block";
      this.ready();
    } else {
      this.authorizeButton.style.display = "block";
      this.signoutButton.style.display = "none";
    }
  }

  private handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  private handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }
}

interface GoogleMediaItem {
  id: string;
  description: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata: any;
  contributorInfo: any;
  filename: string;
}

interface GoogleAlbum {
  id: string;
  title: string;
  coverPhotoBaseUrl: string;
}

class GooglePhotos {
  async getAlbums() {
    let signin = new GooglePhotoSignin();
    await signin.handleClientLoad();
    let resp = await gapi.client.photoslibrary.albums.list();
    if (resp.status !== 200) throw `status: ${resp.status}`;
    console.log({ resp });

    return resp.result.albums as Array<GoogleAlbum>;
  }

  async getAlbum(album: GoogleAlbum) {
    let data = await gapi.client.photoslibrary.mediaItems.search({ albumId: album.id });
    return data.result.mediaItems;
  }
}

class Animations {
  animations: Array<{ type: string; handle: number }> = [];

  stop(type: string) {
    let animations = this.animations.map(v => v); //clone
    animations.forEach((v, i) => {
      if (!type || v.type === type) {
        clearInterval(v.handle);
        this.animations.splice(i, 1);
      }
    });
  }

  animate(type: string, cb: () => void) {
    this.animations.push({ type, handle: setInterval(cb, 100) });
  }
}

let animations = new Animations();

class Repl {
  private commandHistory: Array<string> = [];
  private commandHistoryIndex = -1;
  private albumData = new Datahash<GoogleAlbum>();

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
        img.src = canvas.toDataURL();
        document.body.appendChild(img);
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
      case "move":
        this.move(noun, noun2);
        break;
      case "open":
        this.openAlbum(noun);
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
        animations.stop(noun);
        break;
    }
  }

  async openAlbum(id: string) {
    const target = document.querySelector(".photos");
    if (!target) return;
    let photo = this.selectPhoto(id);
    if (!photo) return;
    let album = this.albumData.get(photo)?.data;
    if (!album) return;
    let photos = new GooglePhotos();
    let data = await photos.getAlbum(album);
    data.forEach(photo => {
      let img = document.createElement("div");
      img.classList.add("img");
      img.style.backgroundImage = `url(${photo.baseUrl})`;
      target.appendChild(img);
    });
    this.reindexPhotos();
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

      let panels = Array.from(document.querySelectorAll(".panel")) as HTMLElement[];
      let count = 0;
      panels.forEach(p => {
        let pos = p.getBoundingClientRect();
        let img = document.createElement("img");
        img.width = pos.width;
        img.height = pos.height;
        img.style.transform = p.style.transform;
        img.onload = () => {
          ctx.drawImage(img, pos.x, pos.y);
          count++;
          if (count === panels.length) {
            good(canvas);
          }
        };
        // strip url();
        let url = getComputedStyle(p).backgroundImage;
        img.src = "./assets/ca0v.png"; // url.substring(4, url.length - 1);
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
    let photoOverlay = document.querySelector(`.photos .img .overlay[data-id="${id}"]`) as HTMLElement;
    return photoOverlay?.parentElement;
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

  move(id1: string, id2: string) {
    let src = this.selectPhoto(id1);
    if (!src) return;

    let dst = this.select(id2);
    if (!dst) return;

    dst.style.backgroundImage = src.style.backgroundImage;
    //src.remove();
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
    dnd.zoomable(overlay);
    console.log(`${overlay.innerHTML} is zoomable`);
    dnd.draggable(overlay);
    console.log(`${overlay.innerHTML} is draggable`);
    dnd.droppable(overlay);
    console.log(`${overlay.innerHTML} is droppable`);
  }

  reindexPhotos() {
    let photos = Array.from(document.querySelectorAll(".photos .img")) as Array<HTMLImageElement>;
    let overlays = photos.map(p => p.querySelector(".overlay") as HTMLElement).filter(v => !!v);
    // remove original overlays
    overlays.forEach(overlay => overlay.remove());
    photos.forEach((p,i) => {
      let overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.dataset.id = overlay.innerText = 1 + i + "";
      p.appendChild(overlay);
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

  private panels: Array<CollagePanel> = [];
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
    const target = document.querySelector(".photos");
    if (target) {
      const albums = await photos.getAlbums();
      albums.forEach(album => {
        const img = document.createElement("div");
        img.classList.add("img");
        img.style.backgroundImage = `url(${album.coverPhotoBaseUrl})`;
        img.title = album.title;
        target.appendChild(img);
        this.albumData.add(img, album);
      });
      this.reindexPhotos();
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

class Datahash<T> {
  private hash: Array<{ owner: HTMLElement; data: T }> = [];

  add(owner: HTMLElement, data: T) {
    this.hash.push({ owner, data });
  }

  get(owner: HTMLElement) {
    return this.hash.find(v => v.owner === owner);
  }
}

/**
 * Google speech recognition
 */
class Listener {
  recognition: SpeechRecognition;
  stopped: boolean = true;
  autostart: boolean = true;

  constructor() {
    this.recognition = new (<any>window)["webkitSpeechRecognition"]();
    let recognition = this.recognition;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.lang = "en-PH";
    recognition.maxAlternatives = 5;


    recognition.addEventListener("start", e => {
      this.stopped = false;
    });

    recognition.addEventListener("end", e => {
      this.stopped = false;
      if (this.autostart) recognition.start();
    });

    recognition.addEventListener("result", e => {
      for (let i = 0; i < e.results.length; i++) {
        let result = e.results[i];
        if (result.isFinal) {
          for (let j = 0; j < result.length; j++) {
            let transcript = result[j].transcript;
            console.log(transcript, result[j]);
            let confidence = result[j].confidence;
            this.trigger("speech-detected", {
              result: transcript,
              power: confidence * 100
            });
            return;
          }
        }
      }
    });
  }

  private _callbacks: Dictionary<Array<(value: { result: string, power: number }) => void>> = {};

  private callbacks(topic: string) {
    return this._callbacks[topic] = this._callbacks[topic] ?? [];
  }

  on(topic: string, cb: (value: { result: string, power: number }) => void) {
    this.callbacks(topic).push(cb);
  }

  trigger(topic: string, value: { result: string, power: number }) {
    this.callbacks(topic).forEach(cb => cb(value));
  }

  listen() {
    if (this.stopped) this.recognition.start();
  }
}

let repl = new Repl();
let dnd = new DragAndDrop();

async function start() {
  await repl.startup();

  if (globals.allowSpeechRecognition) {
    let listener = new Listener();
    listener.listen();
    listener.on("speech-detected", value => { repl.executeCommand(repl.parseCommand(value.result)) });
  }

  repl.getPhotoOverlays().forEach(overlay => {
    dnd.draggable(overlay);
    console.log(`${overlay.innerHTML} is draggable`);
  });

}

start();
import { SvgEditor, SvgEditorRule } from "./SvgEditor";
import { keys } from "./keys";

function getLayers(): HTMLElement {
  let layers = document.querySelector(".layers") as HTMLElement;
  // scaling about a point assume top-left
  layers.style.transformOrigin = "top left";
  return layers;
}

function getPixels(): HTMLImageElement | null {
  if (!isDigitizing) return null;
  return document.querySelector(".svgeditor.digitizer .layers .pixels-to-digitize");
}

function isDigitizing() {
  return !!document.querySelector(".svgeditor.digitizer");
}

function getPositionOfPixels(): { top: number; left: number } {
  const target = getPixels();
  if (!target) throw "pixels not found";
  let { top, left } = getComputedStyle(target);
  return { top: parseFloat(top), left: parseFloat(left) };
}

function setPositionOfPixels(position: { top: number; left: number }) {
  const target = getPixels();
  if (!target) throw "pixels not found";
  target.style.left = `${position.left}px`;
  target.style.top = `${position.top}px`;
}

function zoomInPixels(scale: number) {
  const target = getPixels();
  if (!target) throw "pixels not found";
  let transform = getComputedStyle(target).transform;
  if (transform === "none") transform = "";
  transform = ` scale(${scale}) ${transform}`;
  target.style.transform = transform;
}

function createMove(dx: number, dy: number) {
  return () => {
    if (!isDigitizing()) return;
    const { top, left } = getPositionOfPixels();
    setPositionOfPixels({ left: left + dx, top: top + dy });
  };
}

function createTranslator(dx: number, dy: number) {
  return () => {
    let layers = getLayers();
    let currentTransform = getComputedStyle(layers).transform;
    if (currentTransform === "none") currentTransform = "";
    layers.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
  };
}

function createScaler(scale: number) {
  return () => {
    let layers = getLayers();
    let currentTransform = getComputedStyle(layers).transform;
    if (currentTransform === "none") currentTransform = "";
    const restoreDx = 100 * (0.5 * scale);
    layers.style.transform = `${currentTransform} translate(${restoreDx}%,${restoreDx}%) scale(${scale}) translate(-50%,-50%)`;
  };
}

function createScaleAboutCursor(editor: SvgEditor, scale: number) {
  return () => {
    let cursorLocationInViewport = editor.getCursorLocation();
    let viewBox = editor.getViewbox();
    let layers = getLayers();
    let currentTransform = getComputedStyle(layers).transform;
    if (currentTransform === "none") currentTransform = "";
    // translate cursor to origin, scale, translate origin to cursor
    // viewbox width = layers width but where is the top-left corner of the layers?
    let layerLocationInPixels = layers.getBoundingClientRect();
    let { width: pixelWidth, height: pixelHeight } = layerLocationInPixels;
    let { height: viewPortHeight, width: viewPortWidth } = viewBox;

    let dx = layerLocationInPixels.x + (cursorLocationInViewport.x - viewBox.x) * pixelWidth / viewPortWidth;
    let dy = layerLocationInPixels.y + (cursorLocationInViewport.y - viewBox.y) * pixelHeight / viewPortHeight;

    dx = Math.round(dx);
    dy = Math.round(dy);

    layers.style.transform = `${currentTransform} translate(${dx}px,${dy}px) scale(${scale}) translate(${-dx}px,${-dy}px)`;
  }
}

export class Digitizer implements SvgEditorRule {
  initialize(editor: SvgEditor): void {

    editor.subscribe("Escape", () => {
      getLayers().style.transform = "none";
    });

    editor.subscribe("KeyD+ShiftLeft", () => {
      document.querySelector(".svgeditor")?.classList.toggle("digitizer");
    });

    editor.subscribe("NumpadAdd+ShiftLeft", () => {
      zoomInPixels(1.01);
    });

    editor.subscribe("NumpadSubtract+ShiftLeft", () => {
      zoomInPixels(1.0 / 1.01);
    });

    editor.subscribe("ArrowLeft+ShiftLeft", createMove(1, 0));
    editor.subscribe("ArrowRight+ShiftLeft", createMove(-1, 0));
    editor.subscribe("ArrowUp+ShiftLeft", createMove(0, 1));
    editor.subscribe("ArrowDown+ShiftLeft", createMove(0, -1));

    const movers = {
      "ArrowLeft+ControlLeft+ShiftLeft": [10, 0],
      "ArrowRight+ControlLeft+ShiftLeft": [-10, 0],
      "ArrowUp+ControlLeft+ShiftLeft": [0, 10],
      "ArrowDown+ControlLeft+ShiftLeft": [0, -10],
    };

    keys(movers).forEach(key => {
      let [dx, dy] = movers[key];
      editor.subscribe(key, createMove(dx, dy));
    });

    editor.subscribe("ShiftLeft+Space", () => {
      editor.insertCommand({ command: "Z", args: [] });
    });

    editor.subscribe("Space", () => {
      editor.insertCommand({ command: "M", args: [] });
    });

    editor.subscribe("Digit1", () => {
      editor.insertCommand({ command: "L", args: [] });
    });

    editor.subscribe("Minus", () => {
      editor.insertCommand({ command: "H", args: [] });
    });

    editor.subscribe("Digit2", () => {
      editor.insertCommand({ command: "V", args: [] });
    });

    editor.subscribe("Digit4", () => {
      editor.insertCommand({ command: "A", args: [] });
    });

    editor.subscribe("Digit3", () => {
      editor.insertCommand({ command: "S", args: [] });
    });

    /**
     * Moves the digitizing area
     * control speeds things up, alt slows things down
     * alt=1, ctrl+alt=10 , ctrl=100
     */
    {
      let scale = -10;
      editor.subscribe("AltLeft+ControlLeft+Numpad2", createTranslator(0, scale));
      editor.subscribe("AltLeft+ControlLeft+Numpad8", createTranslator(0, -scale));
      editor.subscribe("AltLeft+ControlLeft+Numpad4", createTranslator(-scale, 0));
      editor.subscribe("AltLeft+ControlLeft+Numpad6", createTranslator(scale, 0));
      scale = -100;
      editor.subscribe("ControlLeft+Numpad2", createTranslator(0, scale));
      editor.subscribe("ControlLeft+Numpad8", createTranslator(0, -scale));
      editor.subscribe("ControlLeft+Numpad4", createTranslator(-scale, 0));
      editor.subscribe("ControlLeft+Numpad6", createTranslator(scale, 0));
      scale = -1;
      editor.subscribe("AltLeft+Numpad2", createTranslator(0, scale));
      editor.subscribe("AltLeft+Numpad8", createTranslator(0, -scale));
      editor.subscribe("AltLeft+Numpad4", createTranslator(-scale, 0));
      editor.subscribe("AltLeft+Numpad6", createTranslator(scale, 0));
    }

    // zoom about current cursor location
    editor.subscribe("AltLeft+ControlLeft+NumpadAdd", createScaleAboutCursor(editor, 1.01));
    editor.subscribe("AltLeft+ControlLeft+NumpadSubtract", createScaleAboutCursor(editor, 1 / 1.01));
    editor.subscribe("AltLeft+NumpadAdd", createScaler(1.01));
    editor.subscribe("AltLeft+NumpadSubtract", createScaler(1 / 1.01));

    editor.subscribe("KeyC", () => {
      const cursorLocation = editor.getCursorLocation();
      const viewBox = editor.getViewbox();
      const layers = getLayers();
      const layerLocationInPixels = layers.getBoundingClientRect();
      const x = layerLocationInPixels.x + layerLocationInPixels.width * (cursorLocation.x - viewBox.x) / viewBox.width;
      const y = layerLocationInPixels.y + layerLocationInPixels.width * (cursorLocation.y - viewBox.y) / viewBox.height;
      const cx = getPosition(layers).x + getPosition(layers).width / 2;
      const cy = getPosition(layers).y + getPosition(layers).height / 2;
      const dx = cx - x;
      const dy = cy - y;
      let currentTransform = getComputedStyle(layers).transform;
      if (currentTransform === "none") currentTransform = "";
      console.log(cursorLocation.x, viewBox.x, x, cx, dx, currentTransform);
      layers.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;

    }).because("camera center at current location");

  }
}

function getPosition(node: HTMLElement) {
  let { left, top, width, height } = getComputedStyle(node);
  return { x: parseFloat(left), y: parseFloat(top), width: parseFloat(width), height: parseFloat(height) };
}
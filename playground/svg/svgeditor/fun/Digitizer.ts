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

    let dx = layerLocationInPixels.x + ((cursorLocationInViewport.x - viewBox.x) * pixelWidth) / viewPortWidth;
    let dy = layerLocationInPixels.y + ((cursorLocationInViewport.y - viewBox.y) * pixelHeight) / viewPortHeight;

    dx = Math.round(dx);
    dy = Math.round(dy);

    layers.style.transform = `${currentTransform} translate(${dx}px,${dy}px) scale(${scale}) translate(${-dx}px,${-dy}px)`;
  };
}

export class Digitizer implements SvgEditorRule {
  initialize(editor: SvgEditor): void {
    editor.shortcut("Escape", () => {
      getLayers().style.transform = "none";
    });

    editor.shortcut("Digitizer Toggle", () => document.querySelector(".svgeditor")?.classList.toggle("digitizer"));
    editor.shortcut("Digitizer Plus", () => zoomInPixels(1.01));
    editor.shortcut("Digitizer Minus", () => zoomInPixels(1.0 / 1.01));

    let scale = 1;
    editor.shortcut("Digitizer CameraMove 1 ArrowLeft", createMove(scale, 0));
    editor.shortcut("Digitizer CameraMove 1 ArrowRight", createMove(-scale, 0));
    editor.shortcut("Digitizer CameraMove 1 ArrowUp", createMove(0, scale));
    editor.shortcut("Digitizer CameraMove 1 ArrowDown", createMove(0, -scale));
    scale = 10;
    editor.shortcut("Digitizer CameraMove ArrowLeft", createMove(scale, 0));
    editor.shortcut("Digitizer CameraMove ArrowRight", createMove(-scale, 0));
    editor.shortcut("Digitizer CameraMove ArrowUp", createMove(0, scale));
    editor.shortcut("Digitizer CameraMove ArrowDown", createMove(0, -scale));

    editor.shortcut("Insert ZReturn", () => editor.insertCommand({ command: "Z", args: [] }));
    editor.shortcut("Insert Move", () => editor.insertCommand({ command: "M", args: [] }));
    editor.shortcut("Insert Line", () => editor.insertCommand({ command: "L", args: [] }));
    editor.shortcut("Insert HorizontalLine", () => editor.insertCommand({ command: "H", args: [] }));
    editor.shortcut("Insert VerticalLine", () => editor.insertCommand({ command: "V", args: [] }));
    editor.shortcut("Insert Arc", () => editor.insertCommand({ command: "A", args: [] }));
    editor.shortcut("Insert SmoothCurve", () => editor.insertCommand({ command: "S", args: [] }));
    editor.shortcut("Insert Curve", () => editor.insertCommand({ command: "C", args: [] }));

    /**
     * Moves the digitizing area
     * control speeds things up, alt slows things down
     * alt=1, ctrl+alt=10 , ctrl=100
     */
    {
      let scale = -10;
      editor.shortcut("Move ArrowDown", createTranslator(0, scale));
      editor.shortcut("Move ArrowUp", createTranslator(0, -scale));
      editor.shortcut("Move ArrowLeft", createTranslator(-scale, 0));
      editor.shortcut("Move ArrowRight", createTranslator(scale, 0));
      scale = -1;
      editor.shortcut("Move 1 ArrowDown", createTranslator(0, scale));
      editor.shortcut("Move 1 ArrowUp", createTranslator(0, -scale));
      editor.shortcut("Move 1 ArrowLeft", createTranslator(-scale, 0));
      editor.shortcut("Move 1 ArrowRight", createTranslator(scale, 0));
    }

    // zoom about current cursor location
    editor.shortcut("Move Plus", createScaleAboutCursor(editor, 1.1));
    editor.shortcut("Move Minus", createScaleAboutCursor(editor, 1 / 1.1));
    editor.shortcut("Move 1 Plus", createScaleAboutCursor(editor, 1.01));
    editor.shortcut("Move 1 Minus", createScaleAboutCursor(editor, 1 / 1.01));
    editor.shortcut("Plus", createScaler(1.01));
    editor.shortcut("Minus", createScaler(1 / 1.01));

    editor
      .shortcut("Goto C", () => {
        const cursorLocation = editor.getCursorLocation();
        const viewBox = editor.getViewbox();
        const layers = getLayers();
        const layerLocationInPixels = layers.getBoundingClientRect();
        const x =
          layerLocationInPixels.x + (layerLocationInPixels.width * (cursorLocation.x - viewBox.x)) / viewBox.width;
        const y =
          layerLocationInPixels.y + (layerLocationInPixels.width * (cursorLocation.y - viewBox.y)) / viewBox.height;
        const cx = getPosition(layers).x + getPosition(layers).width / 2;
        const cy = getPosition(layers).y + getPosition(layers).height / 2;
        const dx = cx - x;
        const dy = cy - y;
        let currentTransform = getComputedStyle(layers).transform;
        if (currentTransform === "none") currentTransform = "";
        console.log(cursorLocation.x, viewBox.x, x, cx, dx, currentTransform);
        layers.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
      })
      .because("camera center at current location");
  }
}

function getPosition(node: HTMLElement) {
  let { left, top, width, height } = getComputedStyle(node);
  return { x: parseFloat(left), y: parseFloat(top), width: parseFloat(width), height: parseFloat(height) };
}

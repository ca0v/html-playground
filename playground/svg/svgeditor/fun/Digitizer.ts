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
  return document.querySelector(".svgeditor .layers .pixels-to-digitize");
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

function createTranslator(target: HTMLElement, dx: number, dy: number) {
  return () => {
    let currentTransform = getComputedStyle(target).transform;
    if (currentTransform === "none") currentTransform = "";
    target.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
  };
}

function createScaler(target: HTMLElement, scale: number) {
  return () => {
    let currentTransform = getComputedStyle(target).transform;
    if (currentTransform === "none") currentTransform = "";
    const restoreDx = 100 * (0.5 * scale);
    target.style.transform = `${currentTransform} translate(${restoreDx}%,${restoreDx}%) scale(${scale}) translate(-50%,-50%)`;
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
    const layers = getLayers();
    const bitmap = getPixels();

    editor.shortcut("Escape", () => {
      layers.style.transform = "none";
    });

    if (bitmap) {
      editor.shortcut("Slash Toggle Bitmap", () => document.querySelector(".svgeditor")?.classList.toggle("digitizer"));

      let scale = 1.1;
      editor.shortcut("Slash Bitmap Plus", createScaler(bitmap, scale));
      editor.shortcut("Slash Bitmap Minus", createScaler(bitmap, 1.0 / scale));

      scale = 1 / 1.01;
      editor.shortcut("Slash Bitmap Plus 1", createScaler(bitmap, scale));
      editor.shortcut("Slash Bitmap Minus 1", createScaler(bitmap, 1.0 / scale));

      scale = 10;
      editor.shortcut("Slash Bitmap A.ArrowLeft", createTranslator(bitmap, -scale, 0));
      editor.shortcut("Slash Bitmap D.ArrowRight", createTranslator(bitmap, scale, 0));
      editor.shortcut("Slash Bitmap W.ArrowUp", createTranslator(bitmap, 0, -scale));
      editor.shortcut("Slash Bitmap S.ArrowDown", createTranslator(bitmap, 0, scale));

      scale = -1;
      editor.shortcut("Slash Bitmap A.ArrowLeft 1", createTranslator(bitmap, -scale, 0));
      editor.shortcut("Slash Bitmap D.ArrowRight 1", createTranslator(bitmap, scale, 0));
      editor.shortcut("Slash Bitmap W.ArrowUp 1", createTranslator(bitmap, 0, -scale));
      editor.shortcut("Slash Bitmap S.ArrowDown 1", createTranslator(bitmap, 0, scale));

    }

    // iop are keyboard sequences
    editor.shortcut("Slash Path 3.ZReturn", () => editor.insertCommand({ command: "Z", args: [] }));
    editor.shortcut("Slash Path 2.Move", () => editor.insertCommand({ command: "M", args: [] }));
    editor.shortcut("Slash Path 1.Line", () => editor.insertCommand({ command: "L", args: [] }));
    editor.shortcut("Slash Path 4.HorizontalLine", () => editor.insertCommand({ command: "H", args: [] }));
    editor.shortcut("Slash Path 5.VerticalLine", () => editor.insertCommand({ command: "V", args: [] }));
    editor.shortcut("Slash Path 6.Arc", () => editor.insertCommand({ command: "A", args: [] }));
    editor.shortcut("Slash Path 9.SmoothCurve", () => editor.insertCommand({ command: "S", args: [] }));
    editor.shortcut("Slash Path 0.Curve", () => editor.insertCommand({ command: "C", args: [] }));

    /**
     * Moves the digitizing area
     * control speeds things up, alt slows things down
     * alt=1, ctrl+alt=10 , ctrl=100
     */
    {
      let scale = 10;
      editor.shortcut("Slash Vector S.ArrowDown", createTranslator(layers, 0, scale));
      editor.shortcut("Slash Vector W.ArrowUp", createTranslator(layers, 0, -scale));
      editor.shortcut("Slash Vector A.ArrowLeft", createTranslator(layers, -scale, 0));
      editor.shortcut("Slash Vector D.ArrowRight", createTranslator(layers, scale, 0));
      scale = -1;
      editor.shortcut("Slash Vector S.ArrowDown 1", createTranslator(layers, 0, scale));
      editor.shortcut("Slash Vector W.ArrowUp 1", createTranslator(layers, 0, -scale));
      editor.shortcut("Slash Vector A.ArrowLeft 1", createTranslator(layers, -scale, 0));
      editor.shortcut("Slash Vector D.ArrowRight 1", createTranslator(layers, scale, 0));

      // zoom about current cursor location
      scale = 1.1;
      editor.shortcut("Slash Vector Plus", createScaleAboutCursor(editor, scale));
      editor.shortcut("Slash Vector Minus", createScaleAboutCursor(editor, 1 / scale));
      scale = 1 / 1.01;
      editor.shortcut("Slash Vector Plus 1", createScaleAboutCursor(editor, scale));
      editor.shortcut("Slash Vector Minus 1", createScaleAboutCursor(editor, 1 / scale));
    }

    editor.shortcut("Slash Path Center", () => {
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
    });
  }
}

function getPosition(node: HTMLElement) {
  let { left, top, width, height } = getComputedStyle(node);
  return { x: parseFloat(left), y: parseFloat(top), width: parseFloat(width), height: parseFloat(height) };
}

import { SvgEditor, SvgEditorRule } from "./SvgEditor";

function percent(n: number) {
  return `${Math.round(n * 100 * 10) / 10}%`;
}

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

    const bitmapOpen = () => {
      return !!document.querySelector(".svgeditor")?.classList.contains("digitizer");
    };

    if (bitmap) {
      editor.shortcut("Slash Bitmap X", () => document.querySelector(".svgeditor")?.classList.remove("digitizer")).options({
        onlyIf: bitmapOpen,
        because: "Dismiss Bitmap", stateless: true
      });
      editor.shortcut("Slash Bitmap", () => document.querySelector(".svgeditor")?.classList.add("digitizer")).options({
        because: "Bitmap Editor"
      });

      let scale = 1.1;
      editor.shortcut("Slash Bitmap Plus", createScaler(bitmap, scale)).options({
        onlyIf: bitmapOpen,
        because: "Increase Bitmap Size", stateless: false
      });
      editor.shortcut("Slash Bitmap Minus", createScaler(bitmap, 1.0 / scale)).options({
        onlyIf: bitmapOpen,
        because: "Reduce Bitmap Size", stateless: false,
      });

      scale = 1 / 1.01;
      editor.shortcut("Slash Bitmap Plus 1", createScaler(bitmap, scale)).options({
        onlyIf: bitmapOpen,
        because: "Reverse 1/10", stateless: false
      });
      editor.shortcut("Slash Bitmap Minus 1", createScaler(bitmap, 1.0 / scale)).options({
        onlyIf: bitmapOpen,
        because: "Reverse 1/10", stateless: false
      });

      scale = 10;
      editor.shortcut("Slash Bitmap A", createTranslator(bitmap, -scale, 0)).options({
        onlyIf: bitmapOpen,
        because: "Move Bitmap Left", stateless: false
      });
      editor.shortcut("Slash Bitmap D", createTranslator(bitmap, scale, 0)).options({
        onlyIf: bitmapOpen,
        because: "Move Bitmap Right", stateless: false
      });

      editor.shortcut("Slash Bitmap W", createTranslator(bitmap, 0, -scale)).options({
        onlyIf: bitmapOpen,
        because: "Move Bitmap Up", stateless: false
      });

      editor.shortcut("Slash Bitmap S", createTranslator(bitmap, 0, scale)).options({
        onlyIf: bitmapOpen,
        because: "Move Bitmap Down", stateless: false
      });


      scale = -1;
      editor.shortcut("Slash Bitmap A 1", createTranslator(bitmap, -scale, 0)).options({
        onlyIf: bitmapOpen,
        because: `Move Bitmap X ${-scale}`, stateless: false
      });
      editor.shortcut("Slash Bitmap D 1", createTranslator(bitmap, scale, 0)).options({
        onlyIf: bitmapOpen,
        because: `Move Bitmap X ${scale}`, stateless: false
      });
      editor.shortcut("Slash Bitmap W 1", createTranslator(bitmap, 0, -scale)).options({
        onlyIf: bitmapOpen,
        because: `Move Bitmap Y ${-scale}`, stateless: false
      });
      editor.shortcut("Slash Bitmap S 1", createTranslator(bitmap, 0, scale)).options({
        onlyIf: bitmapOpen,
        because: `Move Bitmap Y ${scale}`, stateless: false
      });

    }

    // iop are keyboard sequences
    const commandInserter = (command: string) => {
      return () => {
        const currentIndex = editor.getActiveIndex();
        const doit = () => {
          editor.insertCommand({ command, args: [] });
          editor.goto(currentIndex + 1);
        }
        doit();
        const undo = () => {
          editor.deleteCommand(currentIndex + 1);
          editor.goto(currentIndex);
        }
        const redo = () => {
          editor.goto(currentIndex);
          doit();
        }
        return { undo, redo };
      }
    }

    editor.shortcut("Slash Path", () => editor.publish("showgrid")).options({
      because: "Path Editor"
    });
    editor.shortcut("Slash Path ECurve", commandInserter("C")).options({
      because: "Insert (C)urve", stateless: false
    });
    editor.shortcut("Slash Path HorizontalLine", commandInserter("H")).options({
      because: "Insert (H)orizontal Line", stateless: false
    });
    editor.shortcut("Slash Path Line", commandInserter("L")).options({
      because: "Insert (L)ine", stateless: false
    });
    editor.shortcut("Slash Path Move", commandInserter("M")).options({
      because: "Insert (M)ove", stateless: false
    });;
    editor.shortcut("Slash Path RArc", commandInserter("A")).options({
      because: "Insert (A)rc", stateless: false
    });
    editor.shortcut("Slash Path UCurveSmooth", commandInserter("S")).options({
      because: "Insert (S)mooth Curve", stateless: false
    });
    editor.shortcut("Slash Path VerticalLine", commandInserter("V")).options({
      because: "Insert (V)ertical Line", stateless: false
    });
    editor.shortcut("Slash Path ZReturn", commandInserter("Z")).options({
      because: "Insert Return (Z)", stateless: false
    });

    /**
     * Moves the digitizing area
     * control speeds things up, alt slows things down
     * alt=1, ctrl+alt=10 , ctrl=100
     */
    {
      editor.shortcut("Slash View").options({
        because: "Edit View"
      });

      editor.shortcut("Slash View Viewbox", () => {
        const svgs = document.querySelectorAll(".layers svg[viewbox]");
        for (let e of svgs) {
          const svg = e as SVGSVGElement;
          let { x, y, width, height } = svg.viewBox.baseVal;
          const viewbox = prompt("Enter viewbox: ", `${x} ${y} ${width} ${height}`);
          if (!viewbox) return;
          [x, y, width, height] = viewbox.split(" ").map(v => parseInt(v));
          console.log(viewbox, x, y, width, height);
          if (width && height) {
            svg.viewBox.baseVal.x = x;
            svg.viewBox.baseVal.y = y;
            svg.viewBox.baseVal.width = width;
            svg.viewBox.baseVal.height = height;
            localStorage.setItem("viewbox", `${x} ${y} ${width} ${height}`);
          }
        }
      }).options({
        because: "Set the Viewbox"
      });

      let scale = 10;
      editor.shortcut("Slash Path ArrowDown", createTranslator(layers, 0, scale)).options({
        because: `Move View Down ${scale}`
      });
      editor.shortcut("Slash Path ArrowUp", createTranslator(layers, 0, -scale)).options({
        because: `Move View Up ${scale}`
      });
      editor.shortcut("Slash Path ArrowLeft", createTranslator(layers, -scale, 0)).options({
        because: `Move View Left ${scale}`
      });
      editor.shortcut("Slash Path ArrowRight", createTranslator(layers, scale, 0)).options({
        because: `Move View Right ${scale}`
      });

      scale = -1;
      editor.shortcut("Slash Path ArrowDown 1", createTranslator(layers, 0, scale)).options({
        because: `Move View Down ${scale}`
      });
      editor.shortcut("Slash Path ArrowUp 1", createTranslator(layers, 0, -scale)).options({
        because: `Move View Up ${scale}`
      });
      editor.shortcut("Slash Path ArrowLeft 1", createTranslator(layers, -scale, 0)).options({
        because: `Move View Left ${scale}`
      });
      editor.shortcut("Slash Path ArrowRight 1", createTranslator(layers, scale, 0)).options({
        because: `Move View Right ${scale}`
      });

      // zoom about current cursor location
      scale = 1.1;
      editor.shortcut("Slash View Plus", createScaleAboutCursor(editor, scale)).options({
        because: `Zoom In By ${percent(scale)}`
      });
      editor.shortcut("Slash Path Plus", createScaleAboutCursor(editor, scale)).options({
        because: `Zoom In By ${percent(scale)}`
      });
      editor.shortcut("Slash View Minus", createScaleAboutCursor(editor, 1 / scale)).options({
        because: `Zoom Out By ${percent(scale)}`
      });
      editor.shortcut("Slash Path Minus", createScaleAboutCursor(editor, 1 / scale)).options({
        because: `Zoom Out By ${percent((scale)}`
      });
      scale = 1 / 1.01;
      editor.shortcut("Slash View Plus 1", createScaleAboutCursor(editor, scale)).options({
        because: `Zoom In By ${percent(scale)}`
      });
      editor.shortcut("Slash View Minus 1", createScaleAboutCursor(editor, 1 / scale)).options({
        because: `Zoom Out By ${percent(scale)}`
      });
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

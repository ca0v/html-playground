import { SvgEditor, SvgEditorRule } from "./SvgEditor";
import { keys } from "../keys";

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
    const { top, left } = getPositionOfPixels();
    setPositionOfPixels({ left: left + dx, top: top + dy });
  };
}

export class Digitizer implements SvgEditorRule {
  initialize(editor: SvgEditor): void {
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
  }
}

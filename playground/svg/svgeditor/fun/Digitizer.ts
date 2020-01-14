import { SvgEditor, SvgEditorRule } from "./SvgEditor";

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

export class Digitizer implements SvgEditorRule {
  initialize(editor: SvgEditor): void {
    editor.subscribe("KeyD+ShiftLeft", () => {
      document.querySelector(".svgeditor")?.classList.toggle("digitizer");
    });

    editor.subscribe("ArrowLeft+ShiftLeft", () => {
      const { top, left } = getPositionOfPixels();
      setPositionOfPixels({ left: left - 1, top });
    });

    editor.subscribe("ArrowRight+ShiftLeft", () => {
      const { top, left } = getPositionOfPixels();
      setPositionOfPixels({ left: left + 1, top });
    });

    editor.subscribe("ArrowUp+ShiftLeft", () => {
      const { top, left } = getPositionOfPixels();
      setPositionOfPixels({ left: left, top: top - 1 });
    });

    editor.subscribe("ArrowDown+ShiftLeft", () => {
      const { top, left } = getPositionOfPixels();
      setPositionOfPixels({ left: left, top: top + 1 });
    });
  }
}

import { getActiveOverlay } from "../fun/getActiveOverlay";
import { CollagePanel } from "./CollagePanel";
import { Repl } from "./Repl";
import { KeyboardHandlers } from "./KeyboardHandlers";
import { transform } from "../fun/transform";
import { bbox } from "../fun/bbox";

/**
 * manages user interactions for keyboard shortcuts, wheel, drag, click events
 */
export class DragAndDrop {
  private source: HTMLElement | null = null;

  constructor(public repl: Repl, public keydownHandlers: KeyboardHandlers) {

    window.addEventListener("wheel", (event) => {
      let source = getActiveOverlay();
      if (!source) {
        console.log("no active overlay found");
        return;
      }
      // TODO would be nice to only perform when mouse is over the element
      // document.elementsFromPoint(event.screenX, event.screenY);
      let from = source.innerHTML;
      // -150 => 0.9, 150 => 1.1, so
      let delta = 1 + event.deltaY / 1500;
      repl.executeCommand(`zoom ${from} ${delta}`);
    });

    window.addEventListener("keydown", event => {

      if (this.keydownHandlers.getEventHandlers(event).some(handler => {
        return false !== handler.command.execute(repl);
      })) {
        // handled
        event.preventDefault();
      }

    });
  }

  /**
   * Move the background image on the panel
   * @param panel Invoke pan on the panel so that it follows the mouse
   */
  panable(panel: CollagePanel) {
    let draggable = panel.image;
    let startPosition = [0, 0];
    draggable.classList.add("draggable");

    draggable.addEventListener("pointerdown", event => {
      let left = parseFloat(draggable.style.left || "0");
      let top = parseFloat(draggable.style.top || "0");
      startPosition = [left - event.screenX, top - event.screenY];
      draggable.setPointerCapture(event.pointerId);
      draggable.addEventListener("pointermove", pointermove);
      event.stopPropagation();
    });

    draggable.addEventListener("pointerup", event => {
      draggable.releasePointerCapture(event.pointerId);
      draggable.removeEventListener("pointermove", pointermove);
      let box = bbox(draggable);
      let rect = draggable.getBoundingClientRect();      
      let scale = rect.width / box.width;
      draggable.style.top = draggable.style.left = "0px";
      transform(draggable, `translate(${box.left / scale}px, ${box.top / scale}px)`);
      event.stopPropagation();
    });

    let pointermove = (event: MouseEvent) => {
      let [x, y] = [startPosition[0] + event.screenX, startPosition[1] + event.screenY];
      draggable.style.left = `${x}px`;
      draggable.style.top = `${y}px`;
      event.stopPropagation();
    };
  }

  moveable(draggable: HTMLElement) {
    let startPosition = [0, 0];
    draggable.classList.add("draggable");

    draggable.addEventListener("pointerdown", event => {
      let top = parseFloat(draggable.style.top);
      let left = parseFloat(draggable.style.left);
      startPosition = [left - event.screenX, top - event.screenY];
      draggable.setPointerCapture(event.pointerId);
      draggable.addEventListener("pointermove", pointermove);
      event.stopPropagation();
    });

    draggable.addEventListener("pointerup", event => {
      draggable.releasePointerCapture(event.pointerId);
      draggable.removeEventListener("pointermove", pointermove);
      event.stopPropagation();
    });

    let pointermove = (event: MouseEvent) => {
      let [left, top] = [startPosition[0] + event.screenX, startPosition[1] + event.screenY];
      draggable.style.top = top + "px";
      draggable.style.left = left + "px";
      event.stopPropagation();
    };
  }

  /**
   * Make an element a drag source
   * @param div element to make draggable
   */
  draggable(draggable: HTMLElement) {
    draggable.classList.add("draggable");
    draggable.draggable = true;
    draggable.addEventListener("dragstart", event => this.ondragstart(draggable));
  }

  /**
   * Make an element a drop target
   * @param target element to make into a drop target (draggable are droppable, bad name)
   */
  droppable(target: HTMLElement) {
    target.addEventListener("dragover", (event) => {
      if (!this.source)
        return;
      event.preventDefault();
      this.ondragover(target, this.source);
    });
    target.addEventListener("drop", (event) => {
      if (!this.source)
        return;
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
    this.repl.executeCommand(command);
  }
}

import { SvgEditorRule, SvgEditor } from "./SvgEditor";

function getToolbar() {
  let toolbar = document.querySelector(".toolbar") as HTMLElement;
  if (!toolbar) throw "no toolbar defined";
  return toolbar;
}

function hideToolbar() {
  getToolbar().classList.add("hidden");
}

function hideHelp() {
  let help = document.querySelector(".F1");
  help?.classList.add("hidden");
}

export class CoreRules implements SvgEditorRule {
  initialize(editor: SvgEditor) {

    editor.subscribe("Escape", () => {
      editor.hideCursor();
      editor.hideCommandEditor();
      editor.hideMarkers();
      editor.setActiveIndex(0);
      editor.showGrid();
      hideToolbar();
      hideHelp();
    }).because("get the editor closer to the initial state");

    // "?"
    editor.subscribe("ShiftRight+Slash", () => {
      let help = document.querySelector(".F1");
      help?.classList.toggle("hidden");
    });

    editor.subscribe("AltLeft+ControlLeft+KeyT", () => {
      getToolbar().classList.toggle("hidden");
    }).because("toggle toolbar");

    editor.subscribe("AltLeft+ControlLeft+KeyG", () => {
      if (editor.isGridVisible()) {
        editor.hideGrid();
      } else {
        editor.showGrid();
      }
    }).because("toggle grid lines");

    editor.subscribe("AltLeft+ControlLeft+KeyM", () => {
      if (editor.isMarkersVisible()) {
        editor.hideMarkers();
      } else {
        editor.showGrid();
        editor.showMarkers();
      }
    }).because("toggle markers");

  }
}

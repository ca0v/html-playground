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
    editor
      .shortcut("Escape", () => {
        editor.hideCursor();
        editor.hideCommandEditor();
        editor.hideMarkers();
        editor.setActiveIndex(0);
        editor.showGrid();
        hideToolbar();
        hideHelp();
      })
      .because("get the editor closer to the initial state");

    // "?"
    editor.shortcut("Toggle Help", () => {
      let help = document.querySelector(".F1");
      help?.classList.toggle("hidden");
    });

    editor.shortcut("Toggle Toolbar", () => {
      getToolbar().classList.toggle("hidden");
    });

    editor.shortcut("Toggle GridLines", () => {
      if (editor.isGridVisible()) {
        editor.hideGrid();
      } else {
        editor.showGrid();
      }
    });

    editor.shortcut("Toggle Markers", () => {
      if (editor.isMarkersVisible()) {
        editor.hideMarkers();
      } else {
        editor.showGrid();
        editor.showMarkers();
      }
    });
  }
}

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
      .shortcut("Escape Escape", () => {
        editor.hideCursor();
        editor.hideCommandEditor();
        editor.hideMarkers();
        editor.setActiveIndex(0);
        editor.showGrid();
        hideToolbar();
        hideHelp();
      })
      .options({ stateless: true, because: "get the editor closer to the initial state" });

    // "?"
    editor.shortcut("Slash Toggle Help", () => {
      let help = document.querySelector(".F1");
      help?.classList.toggle("hidden");
    });

    editor.shortcut(">", () => {
      editor.redo();
    }).options({stateless: true, because: "redo the prior action"})

    editor.shortcut("<", () => {
      editor.undo();
    }).options({ stateless: true, because: "undo prior action" });

    editor.shortcut("Slash Toggle Toolbar", () => {
      getToolbar().classList.toggle("hidden");
    });

    editor.shortcut("Slash Toggle GridLines", () => {
      if (editor.isGridVisible()) {
        editor.hideGrid();
      } else {
        editor.showGrid();
      }
    });

    editor.shortcut("Slash Toggle Markers", () => {
      if (editor.isMarkersVisible()) {
        editor.hideMarkers();
      } else {
        editor.showGrid();
        editor.showMarkers();
      }
    });
  }
}

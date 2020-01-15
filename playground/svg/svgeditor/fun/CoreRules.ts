import { SvgEditorRule, SvgEditor } from "./SvgEditor";

export class CoreRules implements SvgEditorRule {
  initialize(editor: SvgEditor) {
    // "?"
    editor.subscribe("ShiftRight+Slash", () => {
      let help = document.querySelector(".F1");
      help?.classList.toggle("hidden");
    });

    editor.subscribe("KeyT", () => {
      let toolbar = document.querySelector(".toolbar");
      if (!toolbar) return;
      toolbar.classList.toggle("hidden");
    });

    editor.subscribe("Escape", () => {
      editor.hideCursor();
      editor.hideCommandEditor();
      editor.hideMarkers();
      editor.setActiveIndex(0);
    });

    editor.subscribe("KeyG", () => {
      if (editor.isGridVisible()) {
        editor.hideGrid();
      } else {
        editor.showGrid();
      }
    });

    editor.subscribe("KeyM", () => {
      if (editor.isMarkersVisible()) {
        editor.hideMarkers();
      } else {
        editor.showGrid();
        editor.showMarkers();
      }
    });

  }
}

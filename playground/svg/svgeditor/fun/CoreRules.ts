import { SvgEditorRule, SvgEditor } from "./SvgEditor";

export class CoreRules implements SvgEditorRule {
    initialize(editor: SvgEditor) {
        editor.subscribe("Escape", () => {
            editor.hideCursor();
            editor.hideCommandEditor();
            editor.hideMarkers();
        });
        editor.subscribe("KeyG", () => {
            if (editor.isGridVisible()) {
                editor.hideGrid();
            }
            else {
                editor.showGrid();
            }
        });
    }
}

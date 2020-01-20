import { SvgEditor, SvgEditorRule } from "./SvgEditor";
export class FileRule implements SvgEditorRule {
    initialize(editor: SvgEditor): void {
        editor.shortcut("Slash File Open", () => {
            // open
            const doit = () => {
                let pathData = localStorage.getItem("path");
                if (!pathData)
                    return;
                editor.show(pathData);
            };
            const priorPath = editor.getSourcePath();
            const undo = () => {
                editor.show(priorPath.join("\n"));
            };
            doit();
            return { undo, redo: doit };
        });
        editor.shortcut("Slash File New", () => {
            const priorPath = editor.getSourcePath();
            const undo = () => {
                editor.show(priorPath.join("\n"));
            };
            const doit = () => {
                editor.show("M 0 0 Z");
            };
            doit();
            return { undo, redo: doit };
        });
        editor.shortcut("Slash File Save", () => localStorage.setItem("path", editor.getSourcePath().join("\n")));
    }
}

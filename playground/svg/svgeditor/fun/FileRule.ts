import { SvgEditor, SvgEditorRule } from "./SvgEditor";
import { asDom } from "./asDom";
import { focus } from "./focus";    

class FileManager {

    private validateFileName(fileName: string) {
        if (!fileName) return false;
        if (fileName.length < 3) return false;
        return true;
    }

    getFileNames(): string[] {
        return localStorage.getItem("files/index")?.split(";") || [];
    }

    saveFile(fileName: string, data: string) {
        if (!this.validateFileName(fileName)) throw "invalid file name";
        const fileNames = this.getFileNames();
        if (!fileNames.find(v => v === fileName)) {
            fileNames.push(fileName);
            localStorage.setItem("files/index", fileNames.join(";"));
        }
        localStorage.setItem(`files/${fileName}.dat`, data);
    }

    openFile(fileName: string) {
        if (!this.validateFileName(fileName)) throw "invalid file name";
        const data = localStorage.getItem(`files/${fileName}.dat`);
        if (!data) throw "file does not exist";
        return data;
    }

}

const fileManager = new FileManager();

/**
 * Create a grid to display the items, user clicks one, grid closes, callback invoked
 * @param items items to pick
 * @param cb callback to invoke once user picks an item
 */
function picklist(items: string[], cb: (index: number) => void) {
    if (!items.length) {
        cb(-1);
        return;
    }

    const grid = asDom(`<div class="filepicker"></div>`) as HTMLDivElement;
    const litter = items.map(item => asDom(`<div class="filename">${item}</div>`));
    litter.forEach(item => grid.appendChild(item));

    litter.forEach(item => {
        item.tabIndex = 0;
    });

    grid.addEventListener("keypress", event => {
        if (event.key !== "Enter") return;
        if (!event.target) return;
        const index = litter.indexOf(<any>event.target);
        if (index < 0) return;
        cb(index);
    })

    document.body.appendChild(grid);
    focus(grid.firstElementChild);
    return grid;
}

export class FileRule implements SvgEditorRule {
    private filePicker: HTMLElement | null = null;
    private currentFileName = "";

    initialize(editor: SvgEditor): void {
        editor.shortcut("Slash File Open", () => {
            if (null !== this.filePicker) {
                this.filePicker.remove();
                this.filePicker = null;
                return;
            }
            const fileNames = fileManager.getFileNames();
            this.filePicker = picklist(fileNames, (index: number) => {
                if (index < 0) return;
                this.currentFileName = fileNames[index];
                const pathData = fileManager.openFile(this.currentFileName);
                editor.show(pathData);
                this.filePicker?.remove();
                this.filePicker = null;
            });
        });

        editor.shortcut("Slash File Save", () => {
            if (null !== this.filePicker) {
                this.filePicker.remove();
                this.filePicker = null;
                return;
            }
            const fileName = prompt("File Name?", this.currentFileName || "");
            if (!fileName) return;
            fileManager.saveFile(fileName, editor.getSourcePath().join("\n"))
        });

        editor.shortcut("Slash Workspace Open", () => {
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

        editor.shortcut("Slash Workspace New", () => {
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

        editor.shortcut("Slash Workspace Save", () => localStorage.setItem("path", editor.getSourcePath().join("\n")));
    }
}

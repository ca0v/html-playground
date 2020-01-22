import { stringify } from "./stringify";
import { parse } from "./parse";
import { focus } from "./focus";
import { SvgEditor, SvgEditorRule } from "./SvgEditor";

export class PathRule implements SvgEditorRule {
    private transformActiveCommand(
        editor: SvgEditor,
        translate: { dx: number; dy: number },
        options: { primary?: boolean; secondary?: boolean; tertiary?: boolean }
    ) {
        let index = editor.getActiveIndex();
        let path = editor.getSourcePath();
        if (!path) throw "use targetPath";
        let command = parse(path[index]);
        switch (command.command) {
            case "A": {
                let [rx, ry, a, b, cw, x, y] = command.args;
                if (options.primary) {
                    x += translate.dx;
                    y += translate.dy;
                }
                if (options.secondary) {
                    rx += translate.dx;
                    ry += translate.dy;
                }
                path[index] = stringify({ command: command.command, args: [rx, ry, a, b, cw, x, y] });
                break;
            }
            case "C": {
                let [ax, ay, bx, by, x, y] = command.args;
                if (options.primary) {
                    ax += translate.dx;
                    ay += translate.dy;
                    bx += translate.dx;
                    by += translate.dy;
                    x += translate.dx;
                    y += translate.dy;
                }
                if (options.secondary) {
                    ax += translate.dx;
                    ay += translate.dy;
                }
                if (options.tertiary) {
                    bx += translate.dx;
                    by += translate.dy;
                }
                path[index] = stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
                break;
            }
            case "H": {
                let [x] = command.args;
                x += translate.dx;
                path[index] = stringify({ command: command.command, args: [x] });
                break;
            }
            case "V": {
                let [y] = command.args;
                y += translate.dy;
                path[index] = stringify({ command: command.command, args: [y] });
                break;
            }
            case "S": {
                let [bx, by, x, y] = command.args;
                if (options.primary) {
                    bx += translate.dx;
                    by += translate.dy;
                    x += translate.dx;
                    y += translate.dy;
                }
                if (options.secondary) {
                    bx += translate.dx;
                    by += translate.dy;
                }
                path[index] = stringify({ command: command.command, args: [bx, by, x, y] });
                break;
            }
            case "L":
            case "M":
            case "T": {
                let [x, y] = command.args;
                x += translate.dx;
                y += translate.dy;
                path[index] = stringify({ command: command.command, args: [x, y] });
                break;
            }
        }
        return path;
    }

    initialize(editor: SvgEditor): void {
        const moveit = (
            location: { dx: number; dy: number },
            options?: { primary?: boolean; secondary?: boolean; tertiary?: boolean }
        ) => {
            const currentIndex = editor.getActiveIndex();
            const doit = () => {
                editor.hideCursor();
                editor.show(this.transformActiveCommand(editor, location, options || { primary: true }).join(""));
                editor.goto(currentIndex);
            }
            const undoCommand = editor.getSourcePath()[currentIndex];
            const undo = () => {
                const path = editor.getSourcePath();
                path[currentIndex] = undoCommand;
                editor.show(path.join("\n"));
                editor.goto(currentIndex);
            }
            doit();
            const redoCommand = editor.getSourcePath()[currentIndex];
            const redo = () => {
                const path = editor.getSourcePath();
                path[currentIndex] = redoCommand;
                editor.show(path.join("\n"));
                editor.goto(currentIndex);
            }
            return { undo, redo };
        };

        editor.shortcut("Slash Path 2 A", () => moveit({ dx: -1, dy: 0 }, { secondary: true })).options({
            because: "Decrement X2", stateless: false
        });
        editor.shortcut("Slash Path 2 D", () => moveit({ dx: 1, dy: 0 }, { secondary: true })).options({
            because: "Increment X2", stateless: false
        });
        editor.shortcut("Slash Path 2 S", () => moveit({ dx: 0, dy: 1 }, { secondary: true })).options({
            because: "Increment Y2", stateless: false
        });
        editor.shortcut("Slash Path 2 W", () => moveit({ dx: 0, dy: -1 }, { secondary: true })).options({
            because: "", stateless: false
        });
        editor.shortcut("Slash Path 3 A", () => moveit({ dx: -1, dy: 0 }, { tertiary: true })).options({
            because: "Decrement X3", stateless: false
        });
        editor.shortcut("Slash Path 3 D", () => moveit({ dx: 1, dy: 0 }, { tertiary: true })).options({
            because: "Increment X3", stateless: false
        });
        editor.shortcut("Slash Path 3 S", () => moveit({ dx: 0, dy: 1 }, { tertiary: true })).options({
            because: "Increment Y3", stateless: false
        });
        editor.shortcut("Slash Path 3 W", () => moveit({ dx: 0, dy: -1 }, { tertiary: true })).options({
            because: "Decrement Y3", stateless: false
        });
        editor.shortcut("Slash Path A", () => moveit({ dx: -1, dy: 0 })).options({
            because: "Decrement X", stateless: false
        });
        editor.shortcut("Slash Path D", () => moveit({ dx: 1, dy: 0 })).options({
            because: "Increment X", stateless: false
        });
        editor.shortcut("Slash Path S", () => moveit({ dx: 0, dy: 1 })).options({
            because: "Increment Y", stateless: false
        });
        editor.shortcut("Slash Path W", () => moveit({ dx: 0, dy: -1 })).options({
            because: "Decrement Y", stateless: false
        });
        editor.shortcut("Slash Path A 0", () => moveit({ dx: 0.1, dy: 0 })).options({
            because: "Reverse/10", stateless: false
        });
        editor.shortcut("Slash Path D 0", () => moveit({ dx: -0.1, dy: 0 })).options({
            because: "Reverse/10", stateless: false
        });
        editor.shortcut("Slash Path S 0", () => moveit({ dx: 0, dy: -0.1 })).options({
            because: "Reverse/10", stateless: false
        });
        editor.shortcut("Slash Path W 0", () => moveit({ dx: 0, dy: 0.1 })).options({
            because: "Reverse/10", stateless: false
        });
        editor.shortcut("Slash Path .", () => focus(document.activeElement?.nextElementSibling)).options({
            because: "Next Command", stateless: false
        });
        editor.shortcut("Slash Path ,", () => focus(document.activeElement?.previousElementSibling)).options({
            because: "Prior Command", stateless: false
        });
        editor.shortcut("Slash Path X", () => {
            const deletedIndex = editor.getActiveIndex();
            const deletedCommand = editor.getSourcePath()[deletedIndex].trim();
            const undo = () => {
                editor.goto(deletedIndex - 1);
                editor.insertCommand(parse(deletedCommand));
                editor.goto(deletedIndex);
            };
            const doit = () => {
                editor.deleteActiveCommand();
            };
            doit();
            return { undo, redo: doit };
        }).options({
            because: "Delete Command", stateless: false
        });
        editor.shortcut("Slash Path End", () => editor.goto(editor.getSourcePath().length - 1)).options({
            because: "Last Command", stateless: false
        });
        editor.shortcut("Slash Path Enter", () => editor.editActiveCommand()).options({
            because: "Edit Command", stateless: false
        });
        editor.shortcut("Slash Path Home", () => editor.goto(0)).options({
            because: "First Command", stateless: false
        });
    }

}
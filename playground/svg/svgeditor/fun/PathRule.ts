import { stringify } from "./stringify";
import { keys } from "./keys";
import { parse } from "./parse";
import { focus } from "./focus";
import { Dictionary } from "./Dictionary";
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
            const doit = () => {
                editor.hideCursor();
                editor.show(this.transformActiveCommand(editor, location, options || { primary: true }).join(""));
            }
            const currentIndex = editor.getActiveIndex();
            const undoCommand = editor.getSourcePath()[currentIndex];
            const undo = () => {
                const path = editor.getSourcePath();
                path[currentIndex] = undoCommand;
                editor.show(path.join("\n"));
            }
            doit();
            const redoCommand = editor.getSourcePath()[currentIndex];
            const redo = () => {
                const path = editor.getSourcePath();
                path[currentIndex] = redoCommand;
                editor.show(path.join("\n"));
            }
            return { undo, redo };
        };

        const input = document.querySelector(".svg-input") as HTMLElement;

        const keyCommands: Dictionary<() => void> = {
            "Slash Path 2 A": () => moveit({ dx: -1, dy: 0 }, { secondary: true }),
            "Slash Path 2 D": () => moveit({ dx: 1, dy: 0 }, { secondary: true }),
            "Slash Path 2 S": () => moveit({ dx: 0, dy: 1 }, { secondary: true }),
            "Slash Path 2 W": () => moveit({ dx: 0, dy: -1 }, { secondary: true }),
            "Slash Path 3 A": () => moveit({ dx: -1, dy: 0 }, { tertiary: true }),
            "Slash Path 3 D": () => moveit({ dx: 1, dy: 0 }, { tertiary: true }),
            "Slash Path 3 S": () => moveit({ dx: 0, dy: 1 }, { tertiary: true }),
            "Slash Path 3 W": () => moveit({ dx: 0, dy: -1 }, { tertiary: true }),
            "Slash Path A": () => moveit({ dx: -1, dy: 0 }),
            "Slash Path D": () => moveit({ dx: 1, dy: 0 }),
            "Slash Path S": () => moveit({ dx: 0, dy: 1 }),
            "Slash Path W": () => moveit({ dx: 0, dy: -1 }),
            "Slash Path A 0": () => moveit({ dx: 0.1, dy: 0 }),
            "Slash Path D 0": () => moveit({ dx: -0.1, dy: 0 }),
            "Slash Path S 0": () => moveit({ dx: 0, dy: -0.1 }),
            "Slash Path W 0": () => moveit({ dx: 0, dy: 0.1 }),
            "Slash Path ArrowDown": () => focus(document.activeElement?.nextElementSibling),
            "Slash Path ArrowUp": () => focus(document.activeElement?.previousElementSibling),
            "Slash Path Delete": () => editor.deleteActiveCommand(),
            "Slash Path End": () => focus(input.lastElementChild),
            "Slash Path Enter": () => editor.editActiveCommand(),
            "Slash Path Home": () => focus(input.firstElementChild),
        };

        keys(keyCommands).forEach(phrase => editor.shortcut(<string>phrase, keyCommands[phrase]));
    }

}
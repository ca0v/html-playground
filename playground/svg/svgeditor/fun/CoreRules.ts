import { SvgEditorRule, SvgEditor } from "./SvgEditor";
import { ShortcutManager, KeyboardShortcut } from "./KeyboardShortcuts";
import { RemoveEventHandler } from "./RemoveEventHandler";

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

  constructor(private shortcutManager: ShortcutManager) {
  }

  public subscribe(topic: string, cb: () => void) {

  }

  initialize(editor: SvgEditor) {

    let shorcutChangeHandler: RemoveEventHandler;

    editor
      .shortcut("Escape Escape", () => {
        editor.hideCursor();
        editor.hideCommandEditor();
        editor.hideMarkers();
        editor.goto(0);
        hideToolbar();
        hideHelp();
      })
      .options({ stateless: true, because: "get the editor closer to the initial state" });

    // "?"
    editor.shortcut("?", () => {
      const help = document.querySelector(".F1") as HTMLElement;
      if (!help) return;
      help.classList.toggle("hidden");
      if (help.classList.contains("hidden")) {
        shorcutChangeHandler.remove();
        return;
      }
      const doit = () => {
        if (!help.classList.contains("hidden")) {
          const more = this.shortcutManager.help(false).split("\n").map(row => {
            const [command, ...description] = row.split(" ");
            return `<div>${command}</div><div>${description.join(" ")}</div>`;
          });
          help.innerHTML = `${more.join("")}`;
        };
      }
      doit();
      shorcutChangeHandler = this.shortcutManager.subscribe("change", doit);
    }).options({ because: "show help", stateless: true });

    editor.shortcut(">Redo", () => {
      editor.redo();
    }).options({ stateless: true, because: "redo the prior action" })

    editor.shortcut("<Undo", () => {
      editor.undo();
    }).options({ stateless: true, because: "undo prior action" });

    editor.shortcut("Space").options({
      because: "Prior "
    });
    
    editor.shortcut("Slash").options({
      because: "Open a Tool"
    });
    
    editor.shortcut("Slash Toggle").options({
      because: "Toggle"
    });

    editor.shortcut("Slash Toggle Toolbar", () => {
      getToolbar().classList.toggle("hidden");
    });

  }
}

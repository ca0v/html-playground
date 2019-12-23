import { Repl } from "../controls/Repl";
import { Command } from "../models/Command";
export class EscapeCommand implements Command {
  
  private isPanel(element: Element | null) {
    if (!element)
      return false;
    return element.classList.contains("panel") || element.classList.contains("panel-container");
  }

  private selectParentPanel() {
    let currentPanel = document.activeElement as HTMLElement | null;
    if (!currentPanel)
      return;
    while (currentPanel) {
      currentPanel = currentPanel.parentElement;
      if (!currentPanel)
        return;
      if (this.isPanel(currentPanel)) {
        currentPanel.focus();
        return;
      }
    }
  }
  
  execute(repl: Repl, args: string): void {
    // unfocus all panels
    repl.panels.forEach(p => p.panel.classList.remove("focus"));
    this.selectParentPanel();
  }
}

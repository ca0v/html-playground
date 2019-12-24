import { Repl } from "../controls/Repl";

export function getFocusPanels(repl: Repl) {
  return repl.panels.filter(p => p.panel.classList.contains("focus"));
}

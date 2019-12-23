import { Repl } from "../controls/Repl";
import { Behavior } from "../models/Behavior";

/**
 * When user shift-clicks a panel add "focus" class
 * When user clicks a panel add "focus" class, remove "focus" from all others
 */
export class MultiSelector implements Behavior<Repl>
{
    extend(control: Repl): void {
        window.addEventListener("click", event => {
            // clear current "focus" if shift not clicked
            if (!event.shiftKey) {
                control.panels.forEach(p => p.panel.classList.remove("focus"));
            }
            let panels = event.composedPath();
            panels = panels.filter((node: any) => true === node?.classList?.contains("panel")) as Array<HTMLElement>;            
            panels.forEach((node: any) => node.classList.toggle("focus"));
        });
    }

}
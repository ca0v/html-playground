import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

import { globals } from "../globals";

const textarea = document.createElement("textarea");
function escape(value: string) {
  textarea.innerText = value;
  return textarea.value;
}

export class HelpCommand implements Command {
  private initialized = false;

  execute(repl: Repl, args: string) {
    const target = document.querySelector(".help") as HTMLSelectElement;
    if (!target) throw "cannot show help unless a HTMLSelectElement is defined with a className of 'help'";

    if (!this.initialized) {
      const commands = globals.repl.commands.list().map(name => ({ command: (globals.repl.commands.get(name) as Command), name }));
      const keyboardCommands = globals.keyboardHandlers.list();
      const markup1 = commands.map(c => `<option value="${c.name}">"${c.name}" - ${c.command.about ? c.command.about() : "command"}</option>`).sort().join("");
      const markup2 = keyboardCommands.map((c, i) => `<option value="${c.key}">"${c.key}" - ${(c.about!)}</code></option>`).sort().join("");


      target.innerHTML = `${markup1}${markup2}`;
      target.addEventListener("change", () => {
        document.querySelector<HTMLTextAreaElement>(".console")!.value = target.value;
      });
    }
    target.toggleAttribute("hidden");
  }
}

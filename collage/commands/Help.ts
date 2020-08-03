import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

import {globals} from "../globals";

const textarea = document.createElement("textarea");
function escape(value: string){
  textarea.innerText = value;
  return textarea.value;
}

export class HelpCommand implements Command {
  execute(repl: Repl, args: string) {
    const commands = globals.repl.commands.list().map(name => ({command: (globals.repl.commands.get(name) as Command), name}));
    const keyboardCommands = globals.keyboardHandlers.list();
    const markup1 = commands.map(c => `<option value="${c.name}">"${c.name}" - ${c.command.about ? c.command.about() : "command"}</option>`).sort().join("");
    const markup2 = keyboardCommands.map((c,i) => `<option value="${c.key}">"${c.key}" - ${(c.about!)}</code></option>`).sort().join("");
    const target = document.createElement("select");
    target.classList.add("help");
    target.innerHTML = `${markup1}${markup2}`;
    document.body.appendChild(target);
    target.addEventListener("change", () => {
      document.querySelector<HTMLTextAreaElement>(".console")!.value = target.value;
    });
  }
}

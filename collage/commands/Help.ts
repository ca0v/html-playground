import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";

import {globals} from "../globals";

export class HelpCommand implements Command {
  execute(repl: Repl, args: string) {
    const commands = globals.repl.commands.list().join(",");
    const keyboardCommands = globals.keyboardHandlers.list().join(",");
    console.log(commands, keyboardCommands);
    window.alert(commands + keyboardCommands);
  }
}

import { Command } from "./commands/Command";
import { Dictionary } from "./Dictionary";

export class Commands {

    private commands: Dictionary<Command> = {};

    getCommand(verb: string) {
        if (this.commands[verb]) return this.commands[verb];
        var key = Object.keys(this.commands).find(v => v.startsWith(verb));
        return key && this.commands[key];
    }

    add(command: Command, keyword: string) {
        this.commands[keyword] = command;
    }

}
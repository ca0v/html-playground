import { Command } from "../models/Command";
import { Dictionary } from "../models/Dictionary";

/**
 * Keeps hash of commands
 */
export class Commands {

    private commands: Dictionary<Command> = {};

    /**
     * Finds the command associated with the action keyword
     * @param verb the full name of the action keyword or a partial match
     */
    get(verb: string) {
        if (this.commands[verb]) return this.commands[verb];
        var key = Object.keys(this.commands).find(v => v.startsWith(verb));
        return key && this.commands[key];
    }

    /**
     * Adds/replaces command associated with an action keyword
     * @param command command to process the action
     * @param verb action to associate with a command
     */
    add(command: Command, verb: string) {
        this.commands[verb] = command;
    }

}
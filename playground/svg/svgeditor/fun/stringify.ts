import { Command } from "./Command";
export function stringify(command: Command) {
    return `${command.command} ${command.args.join(" ")}`;
}

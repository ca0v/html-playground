import { Command } from "./Command";

function round2(n: number) {
    return Math.round(n * 1000) / 1000;
}

export function stringify(command: Command) {
    return `${command.command} ${command.args.map(v => round2(v)).join(" ")}`;
}

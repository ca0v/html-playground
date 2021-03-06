import { Command } from "../typings/Command";

export function parsePath(path: string) {
    let tokens = path.split("");
    let commands = [] as Array<Command>;
    let commandArgs = [];
    while (tokens.length) {
        let ch = tokens.pop();
        if (!ch)
            throw "expected a token";
        if ((ch >= "A" && ch <= "Z")) {
            commandArgs.reverse();
            let args = commandArgs
                .join("")
                .split(" ")
                .map(v => v.trim())
                .filter(v => v !== "")
                .map(v => parseFloat(v));
            commands.push({ command: ch, args });
            commandArgs = [];
        }
        else {
            commandArgs.push(ch);
        }
    }
    return commands.reverse();
}

let test = parsePath(`M13.235 3.008l-.846-1.078c-.362-.603-1.013-.922-1.716-.922h-3.34c-.703 0-1.355.319-1.716.922l-.847 1.078h-2.774c-1.105 0-2 .895-2 2v9.996c0 1.104.895 2 2 2h13.994c1.104 0 2-.896 2-2v-9.996c0-1.105-.896-2-2-2h-2.755zm-9.251 6.998c0-2.761 2.242-4.998 5.009-4.998 2.766 0 5.009 2.237 5.009 4.998 0 2.759-2.243 4.998-5.009 4.998-2.767 0-5.009-2.239-5.009-4.998zm5.009-2.998c-1.658 0-3.006 1.344-3.006 2.999 0 1.653 1.347 2.999 3.006 2.999 1.657 0 3.006-1.345 3.006-2.999 0-1.654-1.348-2.999-3.006-2.999`);

if (test.length !== 50) {
    console.warn(test);
    //throw "fail";
}
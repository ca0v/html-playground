export function parsePath(path: string) {
    let tokens = path.split("");
    let commands = [] as Array<{
        command: string;
        args: number[];
    }>;
    let commandArgs = [];
    while (tokens.length) {
        let ch = tokens.pop();
        if (!ch)
            throw "expected a token";
        if (ch >= "A" && ch <= "Z") {
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

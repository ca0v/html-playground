export function parsePath(path: string) {
    let firstQuote = path.indexOf("\"");
    if (firstQuote < 0)
        throw "no quote found";
    let lastQuote = path.lastIndexOf("\"");
    if (lastQuote <= firstQuote)
        throw "no end quote found";
    path = path.substring(firstQuote + 1, lastQuote);
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

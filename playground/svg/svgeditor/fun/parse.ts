type CommandName = "A" | "C" | "H" | "L" | "M" | "S" | "T" | "V" | "Z";

export function parse(commandText: string) {
    let [head, ...tail] = commandText.split(" ");
    return { command: head as CommandName, args: tail.map(parseFloat) };
}

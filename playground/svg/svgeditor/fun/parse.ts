export function parse(commandText: string) {
    let [head, ...tail] = commandText.split(" ");
    return { command: head, args: tail.map(parseFloat) };
}

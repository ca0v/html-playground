import { parse } from "./parse";
export function getLocation(index: number, path: string[]): {
  x: number;
  y: number;
} {
  let command = parse(path[index]);
  switch (command.command) {
    case "A": return { x: command.args[5], y: command.args[6] };
    case "C": return { x: command.args[4], y: command.args[5] };
    case "H": return { x: command.args[0], y: getLocation(index - 1, path).y };
    case "L": return { x: command.args[0], y: command.args[1] };
    case "M": return { x: command.args[0], y: command.args[1] };
    case "S": return { x: command.args[2], y: command.args[3] };
    case "T": return { x: command.args[0], y: command.args[1] };
    case "V": return { x: getLocation(index - 1, path).x, y: command.args[0] };
    case "Z": {
      while ((0 <= --index) && !path[index].startsWith("M"))
        ;
      return (0 <= index) ? getLocation(index, path) : { x: 0, y: 0 };
    }
  }
}

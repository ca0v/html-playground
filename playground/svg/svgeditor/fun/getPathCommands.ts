import { stringify } from "./stringify";
import { parsePath } from "./parsePath";
import { getPath } from "./getPath";
export function getPathCommands(path: SVGPathElement) {
    return parsePath(getPath(path)).map(stringify);
}

import { range } from "./range";
import { createPath } from "./createPath";
import { setPath } from "./setPath";
export function createGrid(gridOverlay: SVGSVGElement, count: number, offset: number, dx: number) {
    let { x, y, width, height } = gridOverlay.viewBox.baseVal;
    let vLines = range(count).map(v => `M ${x + offset + dx * v} ${x} V ${y + height}`).join("\n");
    let hLines = range(count).map(v => `M ${x} ${y + offset + dx * v} H ${x + width}`).join("\n");
    let path = createPath({
        stroke: "rgba(128,128,128,0.5)",
        "stroke-width": "0.1"
    });
    setPath(path, `${vLines}\n${hLines}`);
    gridOverlay.appendChild(path);
}

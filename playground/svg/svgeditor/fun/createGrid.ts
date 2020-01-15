import { range } from "./range";
import { createPath } from "./createPath";
import { setPath } from "./setPath";

function dot(x: number, y: number, size: number) {
    return `M ${-size / 2} 0 A ${size / 2} ${size / 2} 0 0 0 ${size / 2} 0 A ${size / 2} ${size / 2} 0 0 0 ${-size / 2} 0 Z`;
}

export function createGrid(gridOverlay: SVGSVGElement, size: number) {
    let { x, y, width, height } = gridOverlay.viewBox.baseVal;
    // forces lines to pass through origin
    // x + offset + n*size = 0, offset = n*size-x, n*size > x, n > x/size
    let offset = size * Math.ceil(x / size) - x;

    let count = 1 + Math.ceil((width - offset) / size);
    let vLines = range(count).map(v => `M ${x + offset + size * v} ${x} V ${y + height}`).join("\n");
    let hLines = range(count).map(v => `M ${x} ${y + offset + size * v} H ${x + width}`).join("\n");
    let path = createPath({
        stroke: "rgba(128,128,128,0.5)",
        "stroke-width": "0.1"
    });
    setPath(path, `${vLines}\n${hLines}\n${dot(0, 0, 0.3)}`);
    gridOverlay.appendChild(path);
}

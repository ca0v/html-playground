import { range } from "./range";
import { createPath } from "./createPath";
import { setPath } from "./setPath";

function dot(x: number, y: number, size: number) {
    const r = size / 2;
    return `M ${x - r} ${y} A ${r} ${r} 0 0 0 ${x + r} ${y} A ${r} ${r} 0 0 0 ${x - r} ${y} Z`;
}

function getScale(gridOverlay: SVGSVGElement) {
    let { width: viewBoxWidth } = gridOverlay.viewBox.baseVal;
    let { width } = gridOverlay.getBoundingClientRect();
    return width / viewBoxWidth;
}

export function createGrid(gridOverlay: SVGSVGElement) {
    const scale = getScale(gridOverlay);
    const { x, y, width, height } = gridOverlay.viewBox.baseVal;
    // forces lines to pass through origin
    // x + offset + n*size = 0, offset = n*size-x, n*size > x, n > x/size
    const size = Math.floor(width / 10);
    const offset = size * Math.ceil(x / size) - x;

    const count = 1 + Math.ceil((width - offset) / size);
    const vLines = range(count).map(v => `M ${x + offset + size * v} ${x} V ${y + height}`).join("\n");
    const hLines = range(count).map(v => `M ${x} ${y + offset + size * v} H ${x + width}`).join("\n");
    const path = createPath({
        fill: "rgba(128,128,128,0.5)",
        stroke: "rgba(128,128,128,0.5)",
        "stroke-width": (1 / scale) + ""
    });

    setInterval(() => {
        const scale = getScale(gridOverlay);
        path.style.setProperty("stroke-width", (1 / scale) + "");
    }, 1000);

    const markers = range(1 + Math.ceil(Math.log2(width))).map(v => Math.pow(2, v));
    //markers.splice(0, markers.length - 4);
    console.log(markers, width);

    const hdots = [0, ...markers].map(v => dot(v, 0, size / 30)).join("\n");
    const vdots = markers.map(v => dot(v, v, size / 30) + dot(0, v, size / 30)).join("\n");
    setPath(path, `${vLines}\n${hLines}\n${hdots}\n${vdots}`);
    gridOverlay.appendChild(path);
}

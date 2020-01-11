export function createPath(styles?: Partial<{
    fill: string;
    stroke: string;
    "stroke-width": string;
}>): SVGPathElement {
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (styles) {
        Object.keys(styles).forEach(key => {
            path.style.setProperty(key, (<any>styles)[key]);
        });
    }
    return path;
}

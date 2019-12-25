export function bbox(node: HTMLElement) {
    let { left, top, width, height } = getComputedStyle(node);
    return { top: parseFloat(top), left: parseFloat(left), width: parseFloat(width), height: parseFloat(height) };
}

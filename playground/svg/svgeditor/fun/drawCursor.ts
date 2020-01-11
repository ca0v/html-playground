export function drawCursor(location: {
    x: number;
    y: number;
}, scale = 1) {
    let { x, y } = location;
    return `M ${x} ${y} l -5 -5 l 10 10 l -5 -5 l 5 -5 l -10 10 z`;
}

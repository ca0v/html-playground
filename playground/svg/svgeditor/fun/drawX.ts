export function drawX(location: {
    x: number;
    y: number;
}) {
    let { x, y } = location;
    return `M ${x} ${y} l ` + `-1 -1 l 2 2 l -1 -1 l 1 -1 l -2 2 z`;
}

export function drawCursor(location: {
    x: number;
    y: number;
}, scale = 5) {
    let { x, y } = location;
    return `M ${x} ${y} l -${scale} -${scale} l ${2 * scale} ${2 * scale} l -${scale} -${scale} l ${scale} -${scale} l -${2 * scale} ${2 * scale} z`;
}

export function drawX(location: {
    x: number;
    y: number;
}, options?: {
    scale?: number;
}) {
    let { x, y } = location;
    let scale = options?.scale ?? 1;
    return `M ${x} ${y} l ` + `-${scale} -${scale} l ${2*scale} ${2*scale} l -${scale} -${scale} l ${scale} -${scale} l -${2*scale} ${2*scale} z`;
}

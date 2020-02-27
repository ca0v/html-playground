export function merge(...audio: Blob[]) {
    return new Blob([...audio], { type: "audio/webm" });
}
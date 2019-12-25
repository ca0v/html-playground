export function getImageResolution(image: HTMLImageElement) {
  let style = getComputedStyle(image);
  let w = parseFloat(style.width);
  let h = parseFloat(style.height);
  let isPortrait = h > w;
  // 512 is the maximum width/height of the placeholder image
  let scale = (isPortrait ? h : w) / 512.0;
  let rect = image.getBoundingClientRect();
  scale *= rect.width / w;
  return scale;
}

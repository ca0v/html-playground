export function getScale(svg: SVGSVGElement) {
  let { width: viewBoxWidth } = svg.viewBox.baseVal;
  let { width } = svg.getBoundingClientRect();
  return width / viewBoxWidth;
}

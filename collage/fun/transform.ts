
export function transform(node: HTMLElement, value: string) {
  let t = window.getComputedStyle(node).transform;
  t = (t === "none") ? "" : t + " ";
  node.style.transform = t + value;
}


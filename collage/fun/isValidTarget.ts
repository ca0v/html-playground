export function isValidTarget(labelImageOrPanel: HTMLElement) {
  return (["label", "panel", "panel-container", "img"].some(v => labelImageOrPanel.classList.contains(v)));
}

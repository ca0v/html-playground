export function getActiveOverlay() {
  let activePanel = document.activeElement;
  if (!activePanel) {
    console.log("no active panel");
    return;
  }
  return activePanel.querySelector(".overlay") as HTMLElement;
}

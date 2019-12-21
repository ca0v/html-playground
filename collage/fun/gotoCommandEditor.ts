export function gotoCommandEditor() {
  let editor = document.querySelector(".console") as HTMLElement;
  if (!editor) {
    console.log("no command editor found");
    return;
  }
  editor.focus();
}

// not used?  voice should be using this command
function setCommand(command: string) {
  let cmd = document.querySelector(".console") as HTMLInputElement;
  cmd.value = command;
}

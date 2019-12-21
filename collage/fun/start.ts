import { Listener } from "../controls/Listener";
import { globals } from "../globals";

export async function start() {
  let repl = globals.repl;
  await repl.startup();
  if (globals.allowSpeechRecognition) {
    let listener = new Listener();
    listener.listen();
    listener.on("speech-detected", value => { repl.executeCommand(repl.parseCommand(value.result)); });
  }
  repl.getPhotoOverlays().forEach(overlay => {
    globals.dnd.draggable(overlay);
    console.log(`${overlay.innerHTML} is draggable`);
  });
}

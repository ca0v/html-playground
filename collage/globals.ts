import { Animations } from "./Animations";
import { Repl } from "./Repl";
import { DragAndDrop } from "./DragAndDrop";

/** global variables */
const animations = new Animations();
const repl = new Repl(animations);
const dnd = new DragAndDrop(repl);
repl.dnd = dnd;

export let globals = {
    allowSpeechRecognition: false,
    debug: true,
    animations,
    repl,
    dnd,

}



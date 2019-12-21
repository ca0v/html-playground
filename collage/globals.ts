import { Animations } from "./Animations";
import { Repl } from "./Repl";
import { DragAndDrop } from "./DragAndDrop";
import { Commands } from "./Commands";
import { SplitCommand } from "./commands/split";

/** global variables */
const animations = new Animations();
const commands = new Commands();
const repl = new Repl(animations, commands);
const dnd = new DragAndDrop(repl);
repl.dnd = dnd;

commands.add(new SplitCommand(), "split");

export let globals = {
    allowSpeechRecognition: false,
    debug: true,
    animations,
    repl,
    dnd,

}



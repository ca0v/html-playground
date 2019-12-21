import { Animations } from "./controls/Animations";
import { Repl } from "./controls/Repl";
import { DragAndDrop } from "./controls/DragAndDrop";
import { Commands } from "./controls/Commands";
import { SplitCommand } from "./commands/SplitCommand";
import { AspectRatioCommand } from "./commands/AspectRatioCommand";
import { BorderCommand } from "./commands/BorderCommand";
import { GotoCommand } from "./commands/GotoCommand";
import { TextCommand } from "./commands/TextCommand";
import { PadCommand } from "./commands/PadCommand";
import { TranslateCommand } from "./commands/TranslateCommand";
import { MarginCommand } from "./commands/MarginCommand";
import { MergeCommand } from "./commands/MergeCommand";
import { HiResCommand } from "./commands/HiResCommand";
import { MoveCommand } from "./commands/MoveCommand";
import { RotateCommand } from "./commands/RotateCommand";
import { ZoomCommand } from "./commands/ZoomCommand";
import { ScaleCommand } from "./commands/ScaleCommand";
import { StopCommand } from "./commands/StopCommand";
import { KeyboardHandlers } from "./controls/KeyboardHandlers";
import { EscapeCommand } from "./commands/EscapeCommand";
import { IncreaseFontSize, DecreaseFontSize } from "./commands/ChangeFontSize";

/** global variables */
const animations = new Animations();
const commands = new Commands();
const repl = new Repl(animations, commands);
const keyboardHandlers = new KeyboardHandlers();

keyboardHandlers.addEventHandler(new EscapeCommand(), { key: "Escape" });
keyboardHandlers.addEventHandler(new IncreaseFontSize(), { key: "+" });
keyboardHandlers.addEventHandler(new DecreaseFontSize(), { key: "-" });

const dnd = new DragAndDrop(repl, keyboardHandlers);
repl.dnd = dnd;

commands.add(new AspectRatioCommand(), "aspect");
commands.add(new BorderCommand(), "border");
commands.add(new GotoCommand(), "goto");
commands.add(new HiResCommand(), "hires");
commands.add(new MarginCommand(), "margin");
commands.add(new MergeCommand(), "merge");
commands.add(new MoveCommand(), "move");
commands.add(new PadCommand(), "pad");
commands.add(new RotateCommand(), "rotate");
commands.add(new ScaleCommand(), "scale");
commands.add(new SplitCommand(), "split");
commands.add(new StopCommand(), "stop");
commands.add(new TextCommand(), "text");
commands.add(new TranslateCommand(), "translate");
commands.add(new TranslateCommand(), "pan");
commands.add(new ZoomCommand(), "zoom");

export let globals = {
    allowSpeechRecognition: false,
    debug: true,
    animations,
    repl,
    dnd,

}

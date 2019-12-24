import { Animations } from "./controls/Animations";
import { Repl } from "./controls/Repl";
import { DragAndDrop } from "./controls/DragAndDrop";
import { Commands } from "./controls/Commands";
import { SplitCommand } from "./commands/SplitCommand";
import { AspectRatioCommand } from "./commands/AspectRatioCommand";
import { BorderCommand } from "./commands/BorderCommand";
import { ChangeStyleCommand } from "./commands/ChangeStyleCommand";
import { SwapPanelsCommand } from "./commands/SwapPanelsCommand";
import { GotoCommand } from "./commands/GotoCommand";
import { TextCommand } from "./commands/TextCommand";
import { PadCommand } from "./commands/PadCommand";
import { ToggleVisibilityCommand } from "./commands/ToggleVisibilityCommand";
import { TranslateCommand as TranslateImageCommand } from "./commands/TranslateCommand";
import { MarginCommand } from "./commands/MarginCommand";
import { MergeCommand } from "./commands/MergeCommand";
import { HiResCommand } from "./commands/HiResCommand";
import { MoveCommand } from "./commands/MoveCommand";
import { RotateCommand, ChangeRotationCommand as RotatePanelCommand, RotationImageCommand as RotateImageCommand } from "./commands/ChangeRotationCommand";
import { ChangePositionCommand as TranslatePanelCommand } from "./commands/ChangePositionCommand";
import { ZoomCommand } from "./commands/ZoomCommand";
import { ScaleCommand } from "./commands/ScaleCommand";
import { StopCommand } from "./commands/StopCommand";
import { KeyboardHandlers } from "./controls/KeyboardHandlers";
import { EscapeCommand } from "./commands/EscapeCommand";
import { ChangeFontSizeCommand } from "./commands/ChangeFontSizeCommand";
import { OpenAlbumsCommand } from "./commands/OpenAlbumsCommand";
import { MultiSelector } from "./behavior/MultiSelector";
import { ChangeScaleCommand as ScalePanelCommand } from "./commands/ChangeScaleCommand";

/** global variables */
const animations = new Animations();
const commands = new Commands();
const repl = new Repl(animations, commands);
const keyboardHandlers = new KeyboardHandlers();
repl.use(new MultiSelector());

keyboardHandlers.addEventHandler(new EscapeCommand(), { key: "Escape" });
keyboardHandlers.addEventHandler(new ChangeFontSizeCommand(1), { key: "+" });
keyboardHandlers.addEventHandler(new ChangeFontSizeCommand(-1), { key: "-" });

keyboardHandlers.addEventHandler(new ScalePanelCommand(1.01), { key: "+" });
keyboardHandlers.addEventHandler(new ScalePanelCommand(1 / 1.01), { key: "-" });

keyboardHandlers.addEventHandler(new RotateImageCommand(1), { key: "." });
keyboardHandlers.addEventHandler(new RotateImageCommand(-1), { key: "," });
keyboardHandlers.addEventHandler(new RotatePanelCommand(1), { shiftKey: true, key: ">" });
keyboardHandlers.addEventHandler(new RotatePanelCommand(-1), { shiftKey: true, key: "<" });

/** vim commands
To move left, press h.
To move right, press l.
To move down, press j.
To move up, press k.
 */
keyboardHandlers.addEventHandler(new TranslatePanelCommand({ x: -1 }), { shiftKey: true, key: "ArrowLeft" });
keyboardHandlers.addEventHandler(new TranslatePanelCommand({ x: 1 }), { shiftKey: true, key: "ArrowRight" });
keyboardHandlers.addEventHandler(new TranslatePanelCommand({ y: 1 }), { shiftKey: true, key: "ArrowDown" });
keyboardHandlers.addEventHandler(new TranslatePanelCommand({ y: -1 }), { shiftKey: true, key: "ArrowUp" });

keyboardHandlers.addEventHandler(new TranslateImageCommand({ x: -1 }), { shiftKey: false, key: "ArrowLeft" });
keyboardHandlers.addEventHandler(new TranslateImageCommand({ x: 1 }), { shiftKey: false, key: "ArrowRight" });
keyboardHandlers.addEventHandler(new TranslateImageCommand({ y: 1 }), { shiftKey: false, key: "ArrowDown" });
keyboardHandlers.addEventHandler(new TranslateImageCommand({ y: -1 }), { shiftKey: false, key: "ArrowUp" });

keyboardHandlers.addEventHandler(new ChangeStyleCommand("top", { delta: 1, units: "px" }), { key: "t" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("top", { delta: -1, units: "px" }), { shiftKey: true, key: "T" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("left", { delta: 1, units: "px" }), { key: "l" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("left", { delta: -1, units: "px" }), { shiftKey: true, key: "L" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("bottom", { delta: 1, units: "px" }), { key: "b" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("bottom", { delta: -1, units: "px" }), { shiftKey: true, key: "B" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("right", { delta: 1, units: "px" }), { key: "r" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("right", { delta: -1, units: "px" }), { shiftKey: true, key: "R" });

keyboardHandlers.addEventHandler(new ChangeStyleCommand("width", { delta: 1, units: "px" }), { key: "w" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("width", { delta: -1, units: "px" }), { shiftKey: true, key: "W" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("height", { delta: 1, units: "px" }), { key: "h" });
keyboardHandlers.addEventHandler(new ChangeStyleCommand("height", { delta: -1, units: "px" }), { shiftKey: true, key: "H" });

keyboardHandlers.addEventHandler(new SwapPanelsCommand(), { ctrlKey: true, key: "s" });

const dnd = new DragAndDrop(repl, keyboardHandlers);
repl.dnd = dnd;

commands.add(new OpenAlbumsCommand(), "open");

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
commands.add(new TranslateImageCommand(), "translate");
commands.add(new TranslateImageCommand(), "pan");
commands.add(new ZoomCommand(), "zoom");
commands.add(new ChangeStyleCommand("backgroundColor"), "bgc");

commands.add(new ToggleVisibilityCommand({ selector: ".collage .panel-container .overlay" }), "overlay");

commands.add(new ChangeStyleCommand("borderColor"), "bc");
commands.add(new ChangeStyleCommand("borderTopColor"), "bct");
commands.add(new ChangeStyleCommand("borderBottomColor"), "bcb");
commands.add(new ChangeStyleCommand("borderLeftColor"), "bcl");
commands.add(new ChangeStyleCommand("borderRightColor"), "bcr");

commands.add(new ChangeStyleCommand("borderWidth"), "bw");
commands.add(new ChangeStyleCommand("borderBottomWidth"), "bwb");
commands.add(new ChangeStyleCommand("borderTopWidth"), "bwt");
commands.add(new ChangeStyleCommand("borderLeftWidth"), "bwl");
commands.add(new ChangeStyleCommand("borderRightWidth"), "bwr");

commands.add(new ChangeStyleCommand("opacity"), "opacity");
commands.add(new ChangeStyleCommand("borderRadius"), "br");
commands.add(new ChangeStyleCommand("borderTopLeftRadius"), "brtl");
commands.add(new ChangeStyleCommand("borderTopRightRadius"), "brtr");
commands.add(new ChangeStyleCommand("borderBottomLeftRadius"), "brbl");
commands.add(new ChangeStyleCommand("borderBottomRightRadius"), "brbr");

commands.add(new ChangeStyleCommand("width", { units: "em" }), "width");
commands.add(new ChangeStyleCommand("height", { units: "px" }), "height");

commands.add(new ChangeStyleCommand("zIndex"), "z");

export let globals = {
    allowSpeechRecognition: false,
    debug: true,
    animations,
    repl,
    dnd,

}

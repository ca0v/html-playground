import { PubSub } from "./PubSub";
import { UndoRedo } from "./UndoRedo";
import { Extensibility } from "./Extensibility";
import { CommandEditor } from "./CommandEditor";

export type CursorLocation = { x: number; y: number };
export type Viewbox = { x: number; y: number; width: number; height: number };

export interface SvgEditor extends Extensibility, PubSub, UndoRedo, CommandEditor {
  show(path: string): void;
  execute(command: string): void;
  hideCursor(): void;
  getCursorLocation(): CursorLocation;
  getViewbox(): Viewbox;
  hideCommandEditor(): void;
  hideMarkers(): void;
  showMarkers(): void;
  getActiveIndex(): number;
  goto(index: number): void;
}

import { Command } from "./Command";

export type CursorLocation = { x: number; y: number };
export type Viewbox = { x: number; y: number; width: number; height: number };

/**
 * rules
 * escape => clear markers, clear editors
 */
export interface SvgEditorRule {
  initialize(editor: SvgEditor): void;
}

export interface SvgEditor {
  publish(arg0: string): void;
  redo(): void;
  undo(): void;
  use(rule: SvgEditorRule): SvgEditor;
  show(): void;
  execute(command: string): void;
  subscribe(
    topic: string,
    callback: (...args: any[]) => void
  ): {
    unsubscribe: () => void;
    because(about: string): void;
  };
  shortcut(
    topic: string,
    callback: () => void | { undo: () => void }
  ): {
    options: (options: { stateless: boolean, because: string }) => void,
    unsubscribe: () => void;
  };
  hideCursor(): void;
  getCursorLocation(): CursorLocation;
  getViewbox(): Viewbox;
  hideCommandEditor(): void;
  hideMarkers(): void;
  showMarkers(): void;
  getActiveIndex(): number;
  setActiveIndex(index: number): void;
  getPath(): Array<Command>;  
  insertCommand(command: Command): void;
  deleteCommand(index: number): void;
  insertPath(path: string): void;
}

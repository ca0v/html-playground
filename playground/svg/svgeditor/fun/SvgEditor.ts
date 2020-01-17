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
  use(rule: SvgEditorRule): SvgEditor;
  show(): void;
  execute(command: string): void;
  subscribe(
    topic: string,
    callback: () => void
  ): {
    unsubscribe: () => void;
    because(about: string): void;
  };
  shortcut(
    topic: string,
    callback: () => void
  ): {
    unsubscribe: () => void;
    because(about: string): void;
  };
  hideCursor(): void;
  getCursorLocation(): CursorLocation;
  getViewbox(): Viewbox;
  hideCommandEditor(): void;
  hideGrid(): void;
  showGrid(): void;
  isGridVisible(): boolean;
  hideMarkers(): void;
  showMarkers(): void;
  isMarkersVisible(): boolean;
  setActiveIndex(index: number): void;
  getPath(): Array<Command>;
  insertCommand(command: Command): void;
  insertPath(path: string): void;
}

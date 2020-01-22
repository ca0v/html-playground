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

type ShortcutOptions = {
  stateless: boolean;
  because: string;
};

interface PubSub {
  publish(topic: string): void;
  subscribe(
    topic: string,
    callback: (...args: any[]) => void
  ): {
    unsubscribe: () => void;
    because(about: string): void;
  };
}

interface UndoRedo {
  redo(): void;
  undo(): void;
}

interface Extensibility {
  use(rule: SvgEditorRule): void;
  shortcut(
    topic: string,
    callback: () => void | { undo: () => void }
  ): {
    options: (options: ShortcutOptions) => void,
    unsubscribe: () => void;
  };
}

interface CommandEditor {
  insertCommand(command: Command): void;
  deleteCommand(index: number): void;
  editActiveCommand(): void;
  deleteActiveCommand(): void;
  insertPath(path: string): void;
  getSourcePath(): string[];
}

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

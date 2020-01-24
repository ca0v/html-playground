import { Callback } from "../widgets/KeyboardShortcuts";
import { SvgEditorRule } from "./SvgEditorRule";
import { ShortcutOptions } from "./ShortcutOptions";
export interface Extensibility {
  use(rule: SvgEditorRule): void;
  shortcut(topic: string, callback?: Callback): {
    options: (options: ShortcutOptions) => void;
    unsubscribe: () => void;
  };
}

import { SvgEditor } from "./SvgEditor";
/**
 * rules
 * escape => clear markers, clear editors
 */
export interface SvgEditorRule {
  initialize(editor: SvgEditor): void;
}

import { SvgEditor, SvgEditorRule } from "./SvgEditor";
import { Toaster } from "./Toaster";
export class NotificationEditorRule implements SvgEditorRule {
  initialize(editor: SvgEditor): void {
    editor.subscribe("log", message => {
      this.toaster.setContent(message);
    });
  }
  constructor(public toaster: Toaster) {
  }
}

import { SvgEditor, SvgEditorRule } from "./SvgEditor";
import { Toaster } from "./Toaster";
export class NotificationEditorRule implements SvgEditorRule {
  initialize(editor: SvgEditor): void {
    editor.subscribe("log", message => {
      if (!message) return;
      this.toaster.setContent(message, "", 1000);
    });
  }
  constructor(public toaster: Toaster) {
  }
}

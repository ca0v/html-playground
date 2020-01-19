import { SvgEditor, SvgEditorRule } from "./fun/SvgEditor";
import { Toaster } from "./fun/Toaster";
export class NotificationEditorRule implements SvgEditorRule {
  initialize(editor: SvgEditor): void {
    editor.subscribe("log", message => {
      this.toaster.setContent(message);
    });
  }
  constructor(public toaster: Toaster) {
  }
}

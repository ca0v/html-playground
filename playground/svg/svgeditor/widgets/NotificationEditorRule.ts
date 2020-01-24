import { SvgEditor } from "../typings/SvgEditor";
import { SvgEditorRule } from "../typings/SvgEditorRule";
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

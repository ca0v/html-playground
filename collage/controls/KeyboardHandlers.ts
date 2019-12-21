import { Command } from "../models/Command";
import { KeyboardHandler } from "../models/KeyboardHandler";

export class KeyboardHandlers {
  private keyboardHandlers: Array<{match: KeyboardHandler; command: Command}> = [];

  getEventHandler(event: KeyboardEvent) {
    let handler = this.keyboardHandlers.find(handler => {
      let match = handler.match;
      if (event.altKey !== match.altKey) return false;
      if (event.shiftKey !== match.shiftKey) return false;
      if (event.ctrlKey !== match.ctrlKey) return false;
      if (!!match.key && event.key !== match.key) return false;
      return true;
    });
    return handler?.command;
  }

  addEventHandler(match: Partial<KeyboardHandler>, command: Command) {
    let fullMatch: KeyboardHandler = {
      altKey: match.altKey ?? false,
      ctrlKey: match.ctrlKey ?? false,
      shiftKey: match.shiftKey ?? false,
      key: match.key ?? ""
    };
    this.keyboardHandlers.push({match: fullMatch, command});
  }
}
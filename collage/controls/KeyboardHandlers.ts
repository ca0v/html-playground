import { Command } from "../models/Command";
import { KeyboardHandler } from "../models/KeyboardHandler";

export class KeyboardHandlers {
  private keyboardHandlers: Array<{match: KeyboardHandler; command: Command}> = [];

  getEventHandlers(event: KeyboardEvent) {
    return this.keyboardHandlers.filter(handler => {
      let match = handler.match;
      if (event.altKey !== match.altKey) return false;
      if (event.shiftKey !== match.shiftKey) return false;
      if (event.ctrlKey !== match.ctrlKey) return false;
      if (!!match.key && event.key !== match.key) return false;
      return true;
    });
  }

  addEventHandler(command: Command, match: Partial<KeyboardHandler>) {
    let fullMatch: KeyboardHandler = {
      altKey: match.altKey ?? false,
      ctrlKey: match.ctrlKey ?? false,
      shiftKey: match.shiftKey ?? false,
      key: match.key ?? "",
      about: match.about || command.about && command.about()
    };
    this.keyboardHandlers.push({match: fullMatch, command});
  }

  list() {
    return this.keyboardHandlers.map(h => ({
      command:h.command,
      key: this.keysAsString(h.match),
      about: h.match.about,
    }));
  }

  keysAsString(match: KeyboardHandler) {
   let result = match.key;
   switch (result){
     case " ": result = "space"; break;
   }
   if (match.ctrlKey) result = "ctrl + "+result;
   if (match.altKey) result = "alt + "+result;
   if (match.shiftKey) result = "shift + "+result;
   return result;
  }
}

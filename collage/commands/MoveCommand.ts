import { Command } from "./Command";
import { Repl } from "../Repl";
export class MoveCommand implements Command {
  execute(repl: Repl, args: string): void {
    let [id1, id2] = args.split(" ");
    let photo = repl.selectPhoto(id1);
    if (!photo) return;


    let panel = repl.selectPanel(id2);
    if (!panel) return;

    panel.addPhoto(photo);

  }
}

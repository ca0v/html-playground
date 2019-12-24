import { Repl } from "../controls/Repl";
import { Behavior } from "../models/Behavior";
import { Toaster } from "../controls/Toaster";

/**
 * When user shift-clicks a panel add "focus" class
 * When user clicks a panel add "focus" class, remove "focus" from all others
 */
export class NotificationBehavior implements Behavior<Repl>
{
    constructor(public toaster: Toaster) {
    }

    extend(control: Repl): void {
        let notify = control.notify;
        control.notify = (message: string) => {
            notify(message);
            this.toaster.toast(message);
        }
    }
}
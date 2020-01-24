import { Dictionary } from "../typings/Dictionary";
import { RemoveEventHandler } from "../typings/RemoveEventHandler";

export class Channel {
  private topics: Dictionary<Array<(...args: any[]) => void>> = {};
  dispose() {
    this.topics = {};
  }
  subscribe(topic: string, cb: (result: any) => void): RemoveEventHandler {
    const listener = (this.topics[topic] = this.topics[topic] || []);
    listener.push(cb);
    return {
      remove: () => {
        const index = listener.indexOf(cb);
        if (index < 0)
          return;
        listener.splice(index, 1);
      }
    };
  }
  publish(topic: string, ...args: any) {
    if (!this.topics[topic])
      return false;
    this.topics[topic].forEach(listener => listener(...args));
  }
}

export interface PubSub {
  publish(topic: string, ...args: any[]): void;
  subscribe(topic: string, callback: (...args: any[]) => void): {
    unsubscribe: () => void;
  };
}

export interface Behavior<T> {
  extend(control: T): void;
}

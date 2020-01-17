export function keys<T>(o: T) {
  return Object.keys(o) as Array<keyof typeof o>;
}

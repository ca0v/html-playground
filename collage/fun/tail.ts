/** Global Functions */
export function tail(value: string) {
  let list = value.split(" ");
  list.shift();
  return list.join(" ");
}

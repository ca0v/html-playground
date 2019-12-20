/** Global Classes */
/**
 * Try to turn a spoken phrase into a command grammar
 */
export class CommandParser {
  parsePhrase(phrase: string) {
    phrase = phrase.toLowerCase();
    let map = <any>{
      "zoom in": "zoom",
      "zoom out": "zoom",
      "drag": "pan",
      "number for": "4",
      "number": "",
      "frame": "",
      "photo": "",
      "one": "1",
      "two": "2",
      "three": "3",
      "four": "4",
      "five": "5",
      "six": "6",
      "seven": "7",
      "eight": "8",
      "nine": "9",
      "into": "",
      "on": "",
      "and": "",
      "picture": "",
      "go to": "goto",
      "-": " ",
    };
    Object.keys(map).forEach(v => phrase = phrase.replace(v, map[v]));
    let tokens = phrase.split(" ");
    tokens = tokens.map(v => map[v] ?? v).filter(v => !!v);
    return tokens.join(" ");
  }
}

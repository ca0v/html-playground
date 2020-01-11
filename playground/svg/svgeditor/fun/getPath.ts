export function getPath(path: SVGPathElement) {
    let d = getComputedStyle(path).getPropertyValue("d");
    let firstQuote = d.indexOf("\"");
    if (firstQuote < 0)
        throw "no quote found";
    let lastQuote = d.lastIndexOf("\"");
    if (lastQuote <= firstQuote)
        throw "no end quote found";
    return d.substring(firstQuote + 1, lastQuote);
}

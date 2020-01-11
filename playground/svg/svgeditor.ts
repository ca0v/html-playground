type Command = {
    command: string;
    args: number[]
};

function range(n: number) {
    return Array(n).fill(0).map((v, i) => i);
}

class SvgEditor {

    private gridOverlay: SVGSVGElement;
    private workPath: SVGPathElement;
    private cursorPath: SVGPathElement;
    private gridScale = 10;

    constructor(public workview: SVGSVGElement) {
        let { x, y, width, height } = workview.viewBox.baseVal;
        this.gridOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        workview.parentElement?.appendChild(this.gridOverlay);
        this.workPath = this.createPath();
        this.gridOverlay.appendChild(this.workPath);
        this.workPath.style.setProperty("fill", "rgb(0,255,128)");
        this.workPath.style.setProperty("stroke", "rgb(0,255,128)");
        this.workPath.style.setProperty("stroke-width", "0.5");
        this.showGrid();
        this.cursorPath = this.createPath({
            stroke: "rgb(0, 255, 0)",
            "stroke-width": "0.2",
        });
        this.gridOverlay.appendChild(this.cursorPath);
    }

    goto(index: number) {
        let path = this.getPath().split("\n");
        if (!path) return;
        let [command, ...args] = path[index].split(" ");
        switch (command) {
            case "L": {
                let [x, y] = args.map(parseFloat);
                this.setPath(this.cursorPath, this.drawCursor({ x, y }));
                break;
            }
        }
    }

    private setPath(pathElement: SVGPathElement, d: string) {
        pathElement.setAttribute("d", d);
    }

    private createPath(styles?: Partial<{
        stroke: string;
        "stroke-width": string;
    }>): SVGPathElement {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        if (styles) {
            Object.keys(styles).forEach(key => {
                path.style.setProperty(key, (<any>styles)[key]);
            });
        }
        return path;
    }

    getPath() {
        let path = this.workview.querySelector("path");
        if (!path) return "";
        let d = getComputedStyle(path).getPropertyValue("d");
        let commands = this.parsePath(d);
        return commands.map(c => `${c.command} ${c.args.join(" ")}`).join("\n");
    }

    show() {
        this.showMarkers();
    }

    showGrid() {
        this.createGrid(10, 10, 20);
        this.createGrid(20, 0, 10);
    }

    private createGrid(count: number, offset: number, dx: number) {
        let { x, y, width, height } = this.gridOverlay.viewBox.baseVal;
        let vLines = range(count).map(v => `M ${x + offset + dx * v} ${x} V ${y + height}`).join("\n");
        let hLines = range(count).map(v => `M ${x} ${y + offset + dx * v} H ${x + width}`).join("\n");
        let path = this.createPath();
        path.style.setProperty("stroke", "rgba(128,128,128,0.5)");
        path.style.setProperty("stroke-width", "0.1");
        this.setPath(path, `${vLines}\n${hLines}`);
        this.gridOverlay.appendChild(path);
    }

    showMarkers() {
        let path = this.workview.querySelector("path");
        if (!path) return;
        let d = getComputedStyle(path).getPropertyValue("d");
        let commands = this.parsePath(d);
        let overlayPath = this.createOverlayPoint(commands);
        overlayPath.unshift("M 0 0");
        this.setPath(this.workPath, overlayPath.join(" "));
    }

    private createOverlayPoint(commands: Command[]) {
        let path: Array<string> = [];
        let priorLocation = { x: 0, y: 0 };
        commands.forEach(command => {
            switch (command.command) {
                case "A": {
                    let [rx, ry, a, b, cw, x, y] = command.args;
                    priorLocation = { x, y }
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "C": {
                    let [ax, ay, bx, by, x, y] = command.args;
                    path.push(this.drawX({ x: ax, y: ay }));
                    path.push(this.drawX({ x: bx, y: by }));
                    priorLocation = { x, y }
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "H": {
                    let [x] = command.args;
                    priorLocation.x = x;
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "L":
                case "M":
                case "T":
                    {
                        let [x, y] = command.args;
                        priorLocation = { x, y }
                        path.push(this.drawX(priorLocation));
                        break;
                    }
                case "S": {
                    let [bx, by, x, y] = command.args;
                    path.push(this.drawX({ x: bx, y: by }));
                    priorLocation = { x, y }
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "V": {
                    let [y] = command.args;
                    priorLocation.y = y;
                    path.push(this.drawX(priorLocation));
                    break;
                }
                case "Z": {
                    break;
                }
                default: {
                    console.warn("ignored: ", command);
                }
            }
        });
        return path;
    }

    private drawX(location: { x: number; y: number }) {
        let { x, y } = location;
        return `M ${x} ${y} l ` + `-1 -1 l 2 2 l -1 -1 l 1 -1 l -2 2 z`;
    }

    private drawCursor(location: { x: number; y: number }, scale = 1) {
        let { x, y } = location;
        return `M ${x} ${y} l -5 -5 l 10 10 l -5 -5 l 5 -5 l -10 10 z`;
    }

    private parsePath(path: string) {
        let firstQuote = path.indexOf("\"");
        if (firstQuote < 0) throw "no quote found";
        let lastQuote = path.lastIndexOf("\"");
        if (lastQuote <= firstQuote) throw "no end quote found";
        path = path.substring(firstQuote + 1, lastQuote - 1);
        let tokens = path.split("");
        let commands = [] as Array<{ command: string, args: number[] }>;
        let commandArgs = [];
        while (tokens.length) {
            let ch = tokens.pop();
            if (!ch) throw "expected a token";
            if (ch >= "A" && ch <= "Z") {
                commandArgs.reverse();
                let args = commandArgs
                    .join("")
                    .split(" ")
                    .map(v => v.trim())
                    .filter(v => !!v)
                    .map(v => parseFloat(v));
                commands.push({ command: ch, args });
                commandArgs = [];
            } else {
                commandArgs.push(ch);
            }
        }
        return commands.reverse();
    }
}
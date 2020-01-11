type Command = {
    command: string;
    args: number[]
};

class SvgEditor {

    private gridOverlay: SVGSVGElement;
    private workPath: SVGPathElement;
    private gridScale = 10;

    constructor(public workview: SVGSVGElement) {
        let style = getComputedStyle(workview);
        let { x, y, width, height } = workview.viewBox.baseVal;
        this.gridOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.gridOverlay.style.position = "absolute";
        this.gridOverlay.style.top = style.top;
        this.gridOverlay.style.left = style.left;
        this.gridOverlay.style.width = style.width;
        this.gridOverlay.style.height = style.height;
        this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        workview.parentElement?.appendChild(this.gridOverlay);
        this.workPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.gridOverlay.appendChild(this.workPath);
        this.workPath.style.setProperty("fill", "white");
        this.workPath.style.setProperty("stroke", "white");
        this.workPath.style.setProperty("stroke-width", "1");
    }

    show() {
        let path = this.workview.querySelector("path");
        if (!path) return;
        let d = getComputedStyle(path).getPropertyValue("d");
        let commands = this.parsePath(d);
        let overlayPath = this.createOverlayPoint(commands);
        console.log(overlayPath);
        overlayPath.unshift("M 0 0");
        this.workPath.setAttribute("d", overlayPath.join(" "));
    }

    private createOverlayPoint(commands: Command[]) {
        let path: Array<string> = [];
        commands.forEach(command => {
            switch (command.command) {
                case "M": {
                    path.push(`L ${command.args.join(" ")}`)
                }
            }
        });
        return path;
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
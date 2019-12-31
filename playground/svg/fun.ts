type DD = { x: number; y: number };
type BorderEdge = "top" | "left" | "bottom" | "right";

function range(n: number) {
    return Array(n).fill(0);
}

function circle(r: number, count: number, offset: number) {
    r = r || 100;
    let dr = 2 * Math.PI / count;
    return range(count).map((_, i) => {
        let x = r * Math.sin((i + offset) * dr);
        let y = r * Math.cos((i + offset) * dr);
        return ({ x, y });
    });
}

function round6(n: number) {
    return n.toFixed(6);
}

function star(r1: number, r2: number, count: number, offset: number) {
    let c1 = circle(r1, count, offset);
    let c2 = circle(r2, count, offset + 0.5);
    return c1.reduce((arr, v, i) => arr.concat(v, c2[i]), []);
}

function xySvg(xy: Array<DD>) {
    return xy.map(({ x, y }, i) => {
        if (i === 0) {
            let lastItem = xy[xy.length - 1];
            let [dx, dy] = [x - lastItem.x, y - lastItem.y];
            return `M ${round6(lastItem.x)} ${round6(lastItem.y)} l ${round6(dx)} ${round6(dy)}`;
        }
        return `l ${round6(x - xy[i - 1].x)} ${round6(y - xy[i - 1].y)} `;
    }).join("");
}

function rotate90(xy: Array<DD>) {
    return xy.map(v => ({ x: v.x - v.y, y: v.y + v.x }));
}

class Effects {

    private createPatternPath(args: {
        sections: Array<BorderEdge>;
        pattern: Array<DD>;
        width: number;
        height: number;
    }) {
        let { width, height, pattern } = args;
        let dx = args.pattern.reduce((a, b) => a + b.x, 0) / args.pattern.length;
        let xSegmentCount = Math.floor(width / (2 * dx));
        let ySegmentCount = Math.floor(xSegmentCount * height / width);
        console.log(args.pattern, { dx, xSegmentCount, ySegmentCount });
        let path = [] as Array<DD>;

        // start
        let x = 0;
        let y = 0;
        path.push({ x, y });

        // top
        if (args.sections.find(v => v === "top")) {
            while (pattern.every(p => {
                x += p.x;
                y += p.y;
                if (x > width) return false;
                path.push({ x, y });
                return true;
            }));
        }
        x = width;
        y = 0;
        path.push({ x, y });

        // right
        if (args.sections.find(v => v === "right")) {
            while (pattern.every(p => {
                x -= p.y;
                y += p.x;
                if (y > height) return false;
                path.push({ x, y });
                return true;
            }));
        }
        x = width;
        y = height;
        path.push({ x, y });

        // bottom
        if (args.sections.find(v => v === "bottom")) {
            while (pattern.every(p => {
                x -= p.x;
                y -= p.y;
                if (x < 0) return false;
                path.push({ x, y });
                return true;
            }));
        }
        x = 0;
        y = height;
        path.push({ x, y });

        // left
        if (args.sections.find(v => v === "left")) {
            while (pattern.every(p => {
                x += p.y;
                y -= p.x;
                if (y < 0) return false;
                path.push({ x, y });
                return true;
            }));
        }
        x = 0;
        y = 0;
        path.push({ x, y });
        return path;
    }

    // these are the _╔╗_╔╗_╔╗_ on a castle wall
    createCrenelationPath(args: {
        sections?: Array<"top" | "left" | "bottom" | "right">
        width: number; height?: number; dx?: number, dy?: number
    }) {
        let { sections, dx, dy, width, height } = args;
        sections = sections ?? ["top"];
        dx = dx ?? Math.floor(width / 9);
        height = height ?? width;
        dy = dy ?? Math.floor(height / 9);
        let pattern = [[0.5, 0], [0, 1], [1, 0], [0, -1]].map(v => ({ x: v[0] * dx, y: v[1] * dy }));
        return this.createPatternPath({ pattern, sections, width, height });
    }

    createBartPath(args: { sections?: Array<BorderEdge>; width: number, dx: number, dy: number }) {
        let { sections, width, dx, dy } = args;
        let pattern = [{ x: dx, y: dy }, { x: dx, y: -dy }];
        sections = sections ?? [<BorderEdge>"top"];
        return this.createPatternPath({ pattern, sections, width, height: width });
    }

}

function run() {
    let effects = new Effects();
    let clipPath = document.querySelector("#clippath1 path") as SVGClipPathElement;
    let width = 100;
    let height = 80;
    let dx = 16;
    let dy = 8;
    let sections = ["top", "bottom", "left", "right"] as Array<BorderEdge>;
    let path = effects.createCrenelationPath({
        sections,
        width, height, dx, dy
    });
    path = effects.createBartPath({ sections, width, dx, dy });
    clipPath.setAttribute("d", xySvg(path));
}
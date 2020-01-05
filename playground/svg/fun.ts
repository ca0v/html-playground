const GRAVITY = { x: 0, y: 5, z: 0 };
const LIFESPAN = 10.2;
const REFRESH_RATE = 0;
const TICKS_PER_SECOND = 1000;
const MISSLES_PER_LAUNCH = 10;
const MAXPOWER = 100;
type DD = { x: number; y: number };
type DDD = { x: number; y: number, z: number };
type BorderEdge = "top" | "left" | "bottom" | "right";
type Ticks = { ticks: number };
type FractalRange = [number, number];

function rand(min: number, max: number) {
    return min + (max - min) * Math.random();
}

async function sleep(timeout: number) {
    return new Promise((good, bad) => {
        setTimeout(good, timeout);
    });
}

async function loopUntil(cb: () => boolean) {
    return new Promise(async (good, bad) => {
        let doit = () => {
            try {
                if (cb()) {
                    good();
                } else {
                    requestAnimationFrame(doit);
                }
            } catch (ex) {
                bad(ex);
            }
        };
        doit();
    });
}

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
    return c1.reduce((arr, v, i) => arr.concat(v, c2[i]), [] as typeof c1);
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

function rotate(xy: Array<DD>, angle: number) {
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    return xy.map(v => ({ x: c * v.x - s * v.y, y: c * v.y + s * v.x }));
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
        let pattern = [[0.5, 0], [0, 1], [1, 0], [0, -1]].map(v => ({ x: v[0] * dx!, y: v[1] * dy! }));
        return this.createPatternPath({ pattern, sections, width, height });
    }

    //     |\/\/\/|  <- this part of Bart Simpson
    //     |      |  
    //     |      |  
    //     | (o)(o)  
    //     C      _) 
    //      | ,___|  
    //      |   /    
    //     /____\    
    //    /      \    
    createBartPath(args: { sections?: Array<BorderEdge>; width: number, dx: number, dy: number }) {
        let { sections, width, dx, dy } = args;
        let pattern = [{ x: dx, y: dy }, { x: dx, y: -dy }];
        sections = sections ?? [<BorderEdge>"top"];
        return this.createPatternPath({ pattern, sections, width, height: width });
    }

}

type FractalState = {
    readonly canvas: SVGGeometryElement;
    readonly position: DDD;
    readonly velocity: DDD;
    readonly lifespan: Ticks;
    readonly offspringRange: FractalRange;
}
class Fractal {
    private birthday: Ticks;

    constructor(readonly initialState: FractalState) {
        this.birthday = { ticks: Date.now() }
    }

    computeSpeed(velocity: DDD) {
        return Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);
    }

    computeHeading(velocity: DDD) {
        let angle = Math.atan2(velocity.y, velocity.x);
        return angle;
    }

    computePosition(tick: Ticks) {
        let v = this.initialState.velocity;
        let p = this.initialState.position;
        let t = tick.ticks;

        let x = (t: number) => GRAVITY.x * t * t + v.x * t + p.x;
        let y = (t: number) => GRAVITY.y * t * t + v.y * t + p.y;
        let z = (t: number) => GRAVITY.z * t * t + v.z * t + p.z;

        // convert to seconds before computing position
        t /= TICKS_PER_SECOND;
        return { x: x(t), y: y(t), z: z(t) };
    }

    computeVelocity(tick: Ticks) {
        let v = this.initialState.velocity;
        let t = tick.ticks;

        let x = (t: number) => 2 * GRAVITY.x * t + v.x;
        let y = (t: number) => 2 * GRAVITY.y * t + v.y;
        let z = (t: number) => 2 * GRAVITY.z * t + v.z;

        // convert to seconds before computing position
        t /= TICKS_PER_SECOND;
        return { x: x(t), y: y(t), z: z(t) };
    }

    computeCurrentPosition() {
        let ticks = Date.now() - this.birthday.ticks;
        if (ticks > this.initialState.lifespan.ticks) throw "does not exist";
        return this.computePosition({ ticks });
    }

    computeCurrentVelocity() {
        let ticks = Date.now() - this.birthday.ticks;
        if (ticks > this.initialState.lifespan.ticks) throw "does not exist";
        return this.computeVelocity({ ticks });
    }

    moveTo(p: DDD, angle: number, length: number) {
        // let transform1 = this.initialState.canvas.ownerSVGElement!.createSVGTransform();
        // let transform2 = this.initialState.canvas.ownerSVGElement!.createSVGTransform();
        // transform1.setTranslate(p.x, p.y);
        // transform2.setRotate(angle, 0, 0);
        angle += Math.PI / 2;
        angle *= 180 / Math.PI;
        this.initialState.canvas.setAttribute("transform", `translate(${p.x}, ${p.y}) rotate(${angle})`);
        // this.initialState.canvas.transform.baseVal.clear();
        // this.initialState.canvas.transform.baseVal.appendItem(transform2);
        // this.initialState.canvas.transform.baseVal.appendItem(transform1);
    }

    // render a arc representing this fractal
    // span child-fractals at end-of-life, each with
    // near-equal energy as the parent
    async render(): Promise<any> {
        // compute projectile path from initial state
        // render along path
        let priorPosition = this.computeCurrentPosition();
        this.moveTo(priorPosition, 0, 1);
        await loopUntil(() => {
            let velocity = this.computeCurrentVelocity();
            let angle = this.computeHeading(velocity);
            let speed = this.computeSpeed(velocity);
            let position = this.computeCurrentPosition();
            this.moveTo(position, angle, speed);
            //this.lineSegment(priorPosition, position);
            priorPosition = position;
            let timeRemaining = this.initialState.lifespan.ticks - Date.now();
            return timeRemaining < 0;
        });

        // create children if still on screen
        let parent = this.initialState.canvas;
        let velocity = this.computeCurrentVelocity();
        let offspring = this.initialState.offspringRange[0];
        let lifespan = { ticks: Date.now() + rand(0.1, 0.9) * LIFESPAN * TICKS_PER_SECOND };
        let position = this.computeCurrentPosition();
        let children = range(offspring)
            .map(() => parent.cloneNode(true) as unknown as SVGCircleElement)
            .map((canvas, i) => {
                let grandSpring = Math.floor(offspring / 2);
                if (grandSpring == 1) {
                    grandSpring = 0;
                }
                parent.parentElement?.appendChild(canvas);
                let angle = 0.9 * Math.PI * rand(-0.5, 0.5);
                let v = rotate([velocity], angle)[0];
                return new Fractal({
                    canvas,
                    lifespan,
                    offspringRange: [grandSpring, 0],
                    position,
                    velocity: { x: v.x, y: v.y, z: velocity.z }
                });
            });
        this.explode(2000);
        return Promise.all(children.map(c => c.render()));
    }

    private async explode(life = 250) {
        let parent = this.initialState.canvas;
        parent.style.animation = `explode ${life}ms 0s linear`;
        let timeRemaining = Date.now() + life;
        await loopUntil(() => {
            let velocity = this.computeCurrentVelocity();
            let angle = this.computeHeading(velocity);
            let speed = this.computeSpeed(velocity);
            let position = this.computeCurrentPosition();
            this.moveTo(position, angle, speed);
            return timeRemaining < Date.now();
        });
        parent.remove();
    }
}

async function run() {
    async function renderFractal(fractal: SVGGeometryElement, className: string) {
        if (fractal) {
            let clone = fractal.cloneNode(true) as SVGGeometryElement;
            clone.classList.add(className);
            fractal.parentElement?.appendChild(clone);
            let vx = rand(-6, 6);
            let vy = - Math.sqrt((0.1 + Math.random()) * MAXPOWER * MAXPOWER - vx * vx);
            let animator = new Fractal({
                canvas: <any>clone,
                lifespan: { ticks: Date.now() + (0.1 * + 0.9 * Math.random()) *LIFESPAN * TICKS_PER_SECOND },
                offspringRange: [1 + Math.pow(2, Math.round(Math.random() * 3)), 2], // this means 7! = 5040 nodes created in last two cycles
                position: { x: 0, y: 0, z: 0 },
                velocity: { x: vx, y: vy, z: 0 }
            });

            await animator.render();
        }
    }

    (async () => {
        let colors = "cusr na ba sr cu ti na ba sr cu ti".split(" ");
        colors = [...colors, ...colors];
        let prob = Math.min(MISSLES_PER_LAUNCH / colors.length, 1);
        let model = document.querySelector(".fractal") as SVGGeometryElement;
        renderFractal(model, "ti");
        while (true) {
            await sleep(300 + 1000 * REFRESH_RATE * Math.random());
            let nextColors = colors.filter(c => prob > Math.random());
            await Promise.all(nextColors.map(async c => {
                await sleep(300 + 1700 * Math.random());
                return renderFractal(model, c);
            }));
        }
    })();

    let effects = new Effects();
    let clipPath = document.querySelector("#clippath1 path") as SVGClipPathElement;
    let width = 100;
    let height = 100;
    let dx = 20;
    let dy = 3;
    let sections = ["top", "bottom", "left", "right"] as Array<BorderEdge>;
    let castlePath = effects.createCrenelationPath({
        sections,
        width, height, dx, dy
    });
    let bartPath = effects.createBartPath({ sections, width, dx, dy });
    let paths = [castlePath, bartPath].map(xySvg);
    let i = 0;
    while (true) {
        clipPath.setAttribute("d", paths[i++ % paths.length]);
        await sleep(5000);
    }

}

(function () {

    function zoomTarget(selector: string, points: number) {
        let offset = 0.5 * points % 2;
        const target = document.querySelector(selector) as SVGElement;
        if (!target) return;
        const animation = target.querySelector("animate") as SVGAnimateElement;
        if (!animation) return;
        let starPoints = xySvg(star(100, 50, points, offset));
        let circlePoints = xySvg(circle(80, 2 * points, offset - 0.5));
        animation.setAttribute("from", circlePoints);
        animation.setAttribute("to", starPoints);
        animation.beginElementAt(0);
        setTimeout(() => {
            animation.setAttribute("to", circlePoints);
            animation.setAttribute("from", starPoints);
            animation.beginElementAt(0);
        }, 3000);
    }

    // it is possible to @keyframes "d" on a path
    // would like to morph down to a circle with same point count
    // then to a circle with new point count
    // then to a star with new point count
    let count = 3;
    zoomTarget("#moon1", count++);
    let h = setInterval(() => {
        try {
            if (count > 10) count = 3;
            zoomTarget("#moon1", count++);
        } catch {
            clearInterval(h);
        }
    }, 5000);

    run();
})();

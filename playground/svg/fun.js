"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const GRAVITY = { x: 0, y: 5, z: 0 };
const LIFESPAN = 10.2;
const REFRESH_RATE = 0;
const TICKS_PER_SECOND = 1000;
const MISSLES_PER_LAUNCH = 10;
const MAXPOWER = 100;
function rand(min, max) {
    return min + (max - min) * Math.random();
}
function sleep(timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((good, bad) => {
            setTimeout(good, timeout);
        });
    });
}
function loopUntil(cb) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((good, bad) => __awaiter(this, void 0, void 0, function* () {
            let doit = () => {
                try {
                    if (cb()) {
                        good();
                    }
                    else {
                        requestAnimationFrame(doit);
                    }
                }
                catch (ex) {
                    bad(ex);
                }
            };
            doit();
        }));
    });
}
function range(n) {
    return Array(n).fill(0);
}
function circle(r, count, offset) {
    r = r || 100;
    let dr = 2 * Math.PI / count;
    return range(count).map((_, i) => {
        let x = r * Math.sin((i + offset) * dr);
        let y = r * Math.cos((i + offset) * dr);
        return ({ x, y });
    });
}
function round6(n) {
    return n.toFixed(6);
}
function star(r1, r2, count, offset) {
    let c1 = circle(r1, count, offset);
    let c2 = circle(r2, count, offset + 0.5);
    return c1.reduce((arr, v, i) => arr.concat(v, c2[i]), []);
}
function xySvg(xy) {
    return xy.map(({ x, y }, i) => {
        if (i === 0) {
            let lastItem = xy[xy.length - 1];
            let [dx, dy] = [x - lastItem.x, y - lastItem.y];
            return `M ${round6(lastItem.x)} ${round6(lastItem.y)} l ${round6(dx)} ${round6(dy)}`;
        }
        return `l ${round6(x - xy[i - 1].x)} ${round6(y - xy[i - 1].y)} `;
    }).join("");
}
function rotate(xy, angle) {
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    return xy.map(v => ({ x: c * v.x - s * v.y, y: c * v.y + s * v.x }));
}
function rotate90(xy) {
    return xy.map(v => ({ x: v.x - v.y, y: v.y + v.x }));
}
class Effects {
    createPatternPath(args) {
        let { width, height, pattern } = args;
        let dx = args.pattern.reduce((a, b) => a + b.x, 0) / args.pattern.length;
        let xSegmentCount = Math.floor(width / (2 * dx));
        let ySegmentCount = Math.floor(xSegmentCount * height / width);
        let path = [];
        // start
        let x = 0;
        let y = 0;
        path.push({ x, y });
        // top
        if (args.sections.find(v => v === "top")) {
            while (pattern.every(p => {
                x += p.x;
                y += p.y;
                if (x > width)
                    return false;
                path.push({ x, y });
                return true;
            }))
                ;
        }
        x = width;
        y = 0;
        path.push({ x, y });
        // right
        if (args.sections.find(v => v === "right")) {
            while (pattern.every(p => {
                x -= p.y;
                y += p.x;
                if (y > height)
                    return false;
                path.push({ x, y });
                return true;
            }))
                ;
        }
        x = width;
        y = height;
        path.push({ x, y });
        // bottom
        if (args.sections.find(v => v === "bottom")) {
            while (pattern.every(p => {
                x -= p.x;
                y -= p.y;
                if (x < 0)
                    return false;
                path.push({ x, y });
                return true;
            }))
                ;
        }
        x = 0;
        y = height;
        path.push({ x, y });
        // left
        if (args.sections.find(v => v === "left")) {
            while (pattern.every(p => {
                x += p.y;
                y -= p.x;
                if (y < 0)
                    return false;
                path.push({ x, y });
                return true;
            }))
                ;
        }
        x = 0;
        y = 0;
        path.push({ x, y });
        return path;
    }
    // these are the _╔╗_╔╗_╔╗_ on a castle wall
    createCrenelationPath(args) {
        let { sections, dx, dy, width, height } = args;
        sections = (sections !== null && sections !== void 0 ? sections : ["top"]);
        dx = (dx !== null && dx !== void 0 ? dx : Math.floor(width / 9));
        height = (height !== null && height !== void 0 ? height : width);
        dy = (dy !== null && dy !== void 0 ? dy : Math.floor(height / 9));
        let pattern = [[0.5, 0], [0, 1], [1, 0], [0, -1]].map(v => ({ x: v[0] * dx, y: v[1] * dy }));
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
    createBartPath(args) {
        let { sections, width, dx, dy } = args;
        let pattern = [{ x: dx, y: dy }, { x: dx, y: -dy }];
        sections = (sections !== null && sections !== void 0 ? sections : ["top"]);
        return this.createPatternPath({ pattern, sections, width, height: width });
    }
}
class Fractal {
    constructor(initialState) {
        this.initialState = initialState;
        this.birthday = { ticks: Date.now() };
    }
    computeSpeed(velocity) {
        return Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);
    }
    computeHeading(velocity) {
        let angle = Math.atan2(velocity.y, velocity.x);
        return angle;
    }
    computePosition(tick) {
        let v = this.initialState.velocity;
        let p = this.initialState.position;
        let t = tick.ticks;
        let x = (t) => GRAVITY.x * t * t + v.x * t + p.x;
        let y = (t) => GRAVITY.y * t * t + v.y * t + p.y;
        let z = (t) => GRAVITY.z * t * t + v.z * t + p.z;
        // convert to seconds before computing position
        t /= TICKS_PER_SECOND;
        return { x: x(t), y: y(t), z: z(t) };
    }
    computeVelocity(tick) {
        let v = this.initialState.velocity;
        let t = tick.ticks;
        let x = (t) => 2 * GRAVITY.x * t + v.x;
        let y = (t) => 2 * GRAVITY.y * t + v.y;
        let z = (t) => 2 * GRAVITY.z * t + v.z;
        // convert to seconds before computing position
        t /= TICKS_PER_SECOND;
        return { x: x(t), y: y(t), z: z(t) };
    }
    computeCurrentPosition() {
        let ticks = Date.now() - this.birthday.ticks;
        if (ticks > this.initialState.lifespan.ticks)
            throw "does not exist";
        return this.computePosition({ ticks });
    }
    computeCurrentVelocity() {
        let ticks = Date.now() - this.birthday.ticks;
        if (ticks > this.initialState.lifespan.ticks)
            throw "does not exist";
        return this.computeVelocity({ ticks });
    }
    moveTo(p, angle, length) {
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
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            // compute projectile path from initial state
            // render along path
            let priorPosition = this.computeCurrentPosition();
            this.moveTo(priorPosition, 0, 1);
            yield loopUntil(() => {
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
                .map(() => parent.cloneNode(true))
                .map((canvas, i) => {
                var _a;
                let grandSpring = Math.floor(offspring / 2);
                if (grandSpring == 1) {
                    grandSpring = 0;
                }
                (_a = parent.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(canvas);
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
        });
    }
    explode(life = 250) {
        return __awaiter(this, void 0, void 0, function* () {
            let parent = this.initialState.canvas;
            parent.style.animation = `explode ${life}ms 0s linear`;
            let timeRemaining = Date.now() + life;
            yield loopUntil(() => {
                let velocity = this.computeCurrentVelocity();
                let angle = this.computeHeading(velocity);
                let speed = this.computeSpeed(velocity);
                let position = this.computeCurrentPosition();
                this.moveTo(position, angle, speed);
                return timeRemaining < Date.now();
            });
            parent.remove();
        });
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        function renderFractal(fractal, className) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (fractal) {
                    let clone = fractal.cloneNode(true);
                    clone.classList.add(className);
                    (_a = fractal.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(clone);
                    let vx = rand(-6, 6);
                    let vy = -Math.sqrt((0.1 + Math.random()) * MAXPOWER * MAXPOWER - vx * vx);
                    let animator = new Fractal({
                        canvas: clone,
                        lifespan: { ticks: Date.now() + (0.1 * +0.9 * Math.random()) * LIFESPAN * TICKS_PER_SECOND },
                        offspringRange: [1 + Math.pow(2, Math.round(Math.random() * 3)), 2],
                        position: { x: 0, y: 0, z: 0 },
                        velocity: { x: vx, y: vy, z: 0 }
                    });
                    yield animator.render();
                }
            });
        }
        (() => __awaiter(this, void 0, void 0, function* () {
            let colors = "cusr na ba sr cu ti na ba sr cu ti".split(" ");
            colors = [...colors, ...colors];
            let prob = Math.min(MISSLES_PER_LAUNCH / colors.length, 1);
            let model = document.querySelector(".fractal");
            renderFractal(model, "ti");
            while (true) {
                yield sleep(300 + 1000 * REFRESH_RATE * Math.random());
                let nextColors = colors.filter(c => prob > Math.random());
                yield Promise.all(nextColors.map((c) => __awaiter(this, void 0, void 0, function* () {
                    yield sleep(300 + 1700 * Math.random());
                    return renderFractal(model, c);
                })));
            }
        }))();
        let effects = new Effects();
        let clipPath = document.querySelector("#clippath1 path");
        let width = 100;
        let height = 100;
        let dx = 20;
        let dy = 3;
        let sections = ["top", "bottom", "left", "right"];
        let castlePath = effects.createCrenelationPath({
            sections,
            width, height, dx, dy
        });
        let bartPath = effects.createBartPath({ sections, width, dx, dy });
        let paths = [castlePath, bartPath].map(xySvg);
        let i = 0;
        while (true) {
            clipPath.setAttribute("d", paths[i++ % paths.length]);
            yield sleep(5000);
        }
    });
}
(function () {
    function zoomTarget(selector, points) {
        let offset = 0.5 * points % 2;
        const target = document.querySelector(selector);
        if (!target)
            return;
        const animation = target.querySelector("animate");
        if (!animation)
            return;
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
            if (count > 10)
                count = 3;
            zoomTarget("#moon1", count++);
        }
        catch (_a) {
            clearInterval(h);
        }
    }, 5000);
    run();
})();

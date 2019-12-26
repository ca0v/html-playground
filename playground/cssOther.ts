/**
 * Manages image style.transform by persisting
 * the scale and rotation to facilitate computing transforms
 */
class Sprite {

    public x: number;
    public y: number;
    public r: number;
    public s: number;

    constructor(public image: HTMLImageElement) {
        this.x = this.y = this.r = 0;
        this.s = 1;
    }

    transform(args: {
        dx?: number;
        dy?: number;
        scale?: number;
        angle?: number;
    }
    ) {
        this.x += (args.dx || 0);
        this.y += (args.dy || 0);
        this.r += (args.angle || 0);
        this.s *= (args.scale || 1.0);
        this.image.style.transform = `translate(${this.x}px,${this.y}px) rotate(${this.r}deg) scale(${this.s})`;
    }

    translate(dx: number, dy: number) {
        return this.transform({ dx, dy });
    }

    rotate(angle: number) {
        return this.transform({ angle });
    }

    scale(scale: number) {
        return this.transform({ scale });
    }

    // modify the pixel density of the image
    // useful when using google photos API to 
    // request higher resolution photos
    upscale(scale: number) {
        let style = getComputedStyle(this.image);
        let width = parseFloat(style.width);
        let height = parseFloat(style.height);
        this.scale(1 / scale);
        this.image.style.width = scale * width + "px";
        this.image.style.height = scale * height + "px";
        this.translate(width / 2 - width * scale / 2, height / 2 - height * scale / 2);
    }
}

class CssLab {

    transform(node: HTMLElement, value: string) {
        let t = window.getComputedStyle(node).transform;
        t = (t === "none") ? "" : t + " ";
        node.style.transform = t + value;
    }

    css(rules: string) {
        const style = document.createElement("style");
        style.innerText = rules;
        document.head.appendChild(style);
    }

    div(parent?: HTMLElement) {
        let div = document.createElement("div");
        if (parent) parent.appendChild(div);
        return div;
    }

    position(node: HTMLElement, pos: { top: number, left: number }) {
        node.style.position = "absolute";
        node.style.top = pos.top + "em";
        node.style.left = pos.left + "em";
    }

    translateTopLeft(node: HTMLElement) {
        console.log("remove the top left values and replace them with a translate transform");
        let style = getComputedStyle(node);
        let x = parseFloat(style.left);
        let y = parseFloat(style.top);
        this.transform(node, `translate(${x}px, ${y}px)`);
        node.style.left = "0px";
        node.style.top = "0px";
    }

    run() {
        this.css(`
.outer { position:absolute; width: 5em; height: 5em; left:20em; top:3em; border: 1em solid white; overflow: hidden; transform:rotate(-13deg) scale(1.3) translate(1em,1em) }
.inner { position:absolute; width: 10em; height: 10em; left:-2em;top:-2em; border: 0.5em solid blue; background-color: yellow; opacity: 0.5;}
        `)
        let outer = this.div(document.body);
        let inner = this.div(outer);
        outer.classList.add("outer");
        inner.classList.add("inner");
        let image = document.createElement("img");
        inner.appendChild(image);
        image.src = "../assets/ca0v.png";
        image.onload = () => {
            let sprite = new Sprite(image);
            sprite.transform({ dx: -10, dy: -10, scale: 1.1, angle: 3 });
            setTimeout(() => {
                this.translateTopLeft(inner);
                setTimeout(() => {
                    sprite.upscale(2.0);
                }, 1000);
            }, 1000);
        };

    }
}

new CssLab().run();
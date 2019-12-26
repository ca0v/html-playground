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

    upscale(image: HTMLImageElement, scale: number) {
        /**
         * I cannot find a way to compute the rotation and scale
         * because the bounding client is enlarged due to the rotation scale
         * and the transform matrix elements have both scale and sin/cos angle
         * mixed together...need to know the angle to compute the scale or visa-versa
         * so...probably need to track the angle and scale as meta-data
         */
        let style = getComputedStyle(image);
        let width = parseFloat(style.width);
        let height = parseFloat(style.height);
        let r = parseFloat(image.dataset.angle || "0");
        let s = parseFloat(image.dataset.scale || "1");
        this.scaleImage(image, 1 / scale);
        image.style.width = scale * width + "px";
        image.style.height = scale * height + "px";
        // s = 0.7, scale = 5, width = 150, height = 145
        // how does these numbers make any sense at all?
        // actual width increases x 5
        // transform negates this effect
        this.translateImage(image, width / 2 - width * scale / 2, height / 2 - height * scale / 2);
    }

    transformImage(image: HTMLImageElement, args: {
        dx?: number;
        dy?: number;
        scale?: number;
        angle?: number;
    }
    ) {
        let x = parseFloat(image.dataset.x || "0") + (args.dx || 0);
        let y = parseFloat(image.dataset.y || "0") + (args.dy || 0);
        let r = parseFloat(image.dataset.angle || "0") + (args.angle || 0);
        let s = parseFloat(image.dataset.scale || "1") * (args.scale || 1.0);
        image.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${s})`;
        image.dataset.x = x + "";
        image.dataset.y = y + "";
        image.dataset.scale = s + "";
        image.dataset.angle = r + "";
        let result = { x, y, r, s };
        console.log(result);
        return result;
    }

    translateImage(image: HTMLImageElement, dx: number, dy: number) {
        return this.transformImage(image, { dx, dy });
    }

    rotateImage(image: HTMLImageElement, angle: number) {
        return this.transformImage(image, { angle });
    }

    scaleImage(image: HTMLImageElement, scale: number) {
        return this.transformImage(image, { scale });
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
            this.transformImage(image, { dx: -10, dy: -10, scale: 1.1, angle: 3 });
            setTimeout(() => {
                this.translateTopLeft(inner);
                setTimeout(() => {
                    this.upscale(image, 5);
                }, 1000);
            }, 1000);
        };

    }
}

new CssLab().run();
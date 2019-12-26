class CssLab {

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
        let rects = node.getBoundingClientRect();
        let parentRects = node.parentElement.getBoundingClientRect();
        console.log(rects, parentRects);
        let style = getComputedStyle(node);
        let parentStyle = getComputedStyle(node.parentElement);
        let parentBorderWidth = parseFloat(parentStyle.borderLeftWidth);
        let parentBorderHeight = parseFloat(parentStyle.borderTopWidth);
        let borderWidth = parseFloat(style.borderLeftWidth);
        let borderHeight = parseFloat(style.borderTopWidth);
        /**
         * This give the actual x/y of the inner div
         * which includes transforms performed on its container
         * But using those values to apply a translate transform 
         * to the inner div is not fair compensation..it wasn't
         * the "original", or pre-transform values
         */
        let x = rects.left - parentRects.left - parentBorderWidth;
        let y = rects.top - parentRects.top - parentBorderHeight;
        console.log({ x, y }); // x: -38.965057, y: -37.5132389
        /**
         * Provide the pre-transform values instead of the actual values
         * And there is no need to invert the effective transform
         */
        x = parseFloat(style.left);
        y = parseFloat(style.top);
        console.log({ x, y }); // x: -32, y: -32
        x = -32;
        y = -32;
        node.style.transform = `translate(${x}px, ${y}px)`;
        node.style.left = "0px";
        node.style.top = "0px";
    }

    run() {
        this.css(`
.outer { position:absolute; width: 5em; height: 5em; left:20em; top:3em; border: 1em solid white; overflow: visible; transform:rotate(13deg) scale(1.3) translate(1em,1em) }
.inner { position:absolute; width: 10em; height: 10em; left:-2em;top:-2em; border: 0.5em solid blue; background-color: yellow; opacity: 0.5;}
        `)
        let outer = this.div(document.body);
        let inner = this.div(outer);
        outer.classList.add("outer");
        inner.classList.add("inner");
        setTimeout(() => {
            this.translateTopLeft(inner);
        }, 2000);
    }
}

new CssLab().run();
export function html(html: string): HTMLElement {
    const a = document.createElement("div");
    a.innerHTML = html;
    return <HTMLElement>(a.firstChild === a.lastChild ? a.firstChild : a);
}

export function createUniqueIdForCssBody(css: string) {
    if (!css || !css.length) throw "no css provided";
    const endIndex = css.indexOf("{");
    if (0 >= endIndex) throw "no css selector provided";
    // remove invalid characters
    css = "cssId_" + css.substring(0, endIndex - 1).replace(/[^(A-Z)(a-z)(0-9).:_-]/g, "");
    return css;
}

export function injectHtml(markup: string, container = document.body) {
    const node = html(markup);
    container?.appendChild(node);
    return node;
}

export function injectCss(css: string, id?: string) {
    if (!id) {
        id = createUniqueIdForCssBody(css);
    }
    let style = document.head.querySelector(`style[id="${id}"]`) as HTMLStyleElement;
    if (style) {
        throw `style already defined for "${id}": \n${style.outerHTML}`;
    }
    style = injectHtml(`<style id=${id} type='text/css'>${css}</style>`, document.head) as HTMLStyleElement;
    return () => style.remove();
}

export function addToClassList(node: Element, className: string) {
    if (!className) return;
    if (typeof className !== "string") return; // will handle objects later?
    className
        .split(" ")
        .map(v => v.trim())
        .filter(v => !!v)
        .forEach(v => node.classList.add(v));
}


import { injectCss, addToClassList } from "../fun/html";

const css = `
    .toaster {
        min-width: 16em;
        max-height: 64em;
        overflow: hidden;
        background-color: black;
        opacity: 0.8;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding-left: 0.5em;
        padding-bottom: 1em;
        padding-top: 1em;
    }

    .toaster .message {
        display: block;
        color: white;
        padding-bottom: 1em;
        overflow: visible;
    }
`;

/**
 * Determines position of the toaster control (myToaster)
 */
export class Toaster {
    domNode: HTMLElement;
    constructor(options?: { dismissOnClick: boolean }) {
        injectCss(css);
        const { dismissOnClick } = options || {};
        this.domNode = document.createElement("div");
        this.domNode.className = "toaster";

        if (dismissOnClick) {
            this.domNode.onclick = () => this.clear();
        }
    }

    setContent(message: string, type?: string, duration?: number) {
        const messageNode = document.createElement("span");
        messageNode.className = "message";
        addToClassList(messageNode, type || "message");
        messageNode.innerText = message;
        this.domNode.appendChild(messageNode);
        setTimeout(() => this.remove(messageNode), duration || 5000);
        this.setVisibility();
        return { remove: () => this.remove(messageNode) }
    }

    remove(node: HTMLElement) {
        if (node && node.parentElement === this.domNode) {
            this.domNode.removeChild(node);
            this.setVisibility();
        }
    }

    clear() {
        this.domNode.innerHTML = "";
        this.setVisibility();
    }

    private setVisibility() {
        this.domNode.style.display = 0 === this.domNode.children.length ? "none" : "inherit";
    }
}

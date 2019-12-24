const messageDuration = 5000;
const fadeDelay = 1500;

async function fadeOut(node: HTMLElement) {
    return new Promise((good, bad) => {
        node.classList.add("fade-out");
        setTimeout(() => good(node), fadeDelay);
    });
}

export class Toaster {
    constructor(public target: HTMLElement) { 
        Array.from(target.querySelectorAll(".toast")).map(t => this.destroyToast(t as HTMLElement));
    }

    toast(message: string) {
        this.target.classList.remove("fade-out");
        let toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerText = message;
        this.target.insertBefore(toast, this.target.firstElementChild);
        setTimeout(() => this.destroyToast(toast), messageDuration);
    }

    async destroyToast(toast: HTMLElement) {
        await fadeOut(toast);
        toast.remove();
        if (!this.target.querySelector(".toast")) fadeOut(this.target);
    }
}
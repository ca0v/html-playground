function getPanels() {
    let panels = Array.from(document.querySelectorAll(`.panel[data-id]`)) as HTMLElement[];
    console.log(panels.map(p => p.dataset["id"]).join(","));
    return panels;
}

function removeOverlays() {
    let overlays = Array.from(document.querySelectorAll(`.overlay`)) as HTMLElement[];
    overlays.forEach(o => o.remove());
}

function showOverlays() {
    let panels = getPanels();
    let overlays = panels.map(p => document.createElement("div"))
    overlays.forEach((overlay, i) => {
        let panel = panels[i];
        overlay.classList.add("overlay");
        overlay.innerText = panel.dataset["id"] + "";
        panel.appendChild(overlay);
    })
}

function reindex() {
    removeOverlays();
    let items = getPanels();
    items.forEach((item, i) => item.dataset["id"] = (i + 1) + "");
    showOverlays();
}

function select(id: string) {
    return document.querySelector(`.panel[data-id="${id}"]`) as HTMLElement;
}


function split_node(node: HTMLElement) {
    let [topleft, topright, bottomleft, bottomright] = [1, 2, 3, 4].map(n => document.createElement("div"));
    let children = [topleft, topright, bottomleft, bottomright];
    children.forEach(c => c.classList.add("panel"));
    children.forEach(c => c.dataset["id"] = "dontcare");
    topleft.classList.add("q1");
    topright.classList.add("q2");
    bottomleft.classList.add("q3");
    bottomright.classList.add("q4");
    node.classList.remove("panel");
    node.classList.add("panel-container");
    node.dataset["id"] = "";
    children.forEach(c => node.appendChild(c));
    reindex();
}

function merge_nodes(node1: HTMLElement, node2: HTMLElement) {
    node2.classList.forEach(c =>
        node1.classList.add(c));
    node2.remove();
    // if node1 is q1...q4 and only child then it assumes the q of it's container and replaces its container
    let qs = [1, 2, 3, 4].map(v => `q${v}`);
    if (qs.every(v => node1.classList.contains(v))) {
        const parent = node1.parentElement;
        if (!parent) return;
        if (parent.classList.contains("panel-container")) {
            qs.forEach(v => node1.classList.remove(v));
            qs.forEach(v => parent.classList.contains(v) && node1.classList.add(v));
            parent.parentElement?.insertBefore(node1, parent);
            parent.remove();
        }
    }
    reindex();
}

function rotate_node(node: HTMLElement, deg: string) {
    node.style.transform = `rotate(${deg}deg)`;
}

// create a canvas of the entire collage
async function asCanvas() {
    return new Promise<HTMLCanvasElement>((good, bad) => {
        let imageCanvas = document.querySelector(".canvas")?.getBoundingClientRect();
        if (!imageCanvas) return;
        let canvas = document.createElement("canvas");
        canvas.width = imageCanvas.width;
        canvas.height = imageCanvas.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let panels = getPanels();
        let count = 0;
        panels.forEach(p => {
            let pos = p.getBoundingClientRect();
            let img = document.createElement("img");
            img.width = pos.width;
            img.height = pos.height;
            img.style.transform = p.style.transform;
            img.onload = () => {
                ctx.drawImage(img, pos.x, pos.y);
                count++;
                if (count === panels.length) {
                    good(canvas);
                }
            }
            // strip url();
            let url = getComputedStyle(p).backgroundImage;
            img.src = "./assets/ca0v.png";//url.substring(4, url.length - 1);
        });
    });
}

class Repl {
    async eval(command: string) {
        let [verb, noun, noun2] = command.split(" ");
        switch (verb) {
            case "export":
                debugger;
                let canvas = await asCanvas();
                if (!canvas) return;
                let img = document.createElement("img");
                img.src = canvas.toDataURL();
                document.body.appendChild(img);
                break;
            case "b":
            case "border":
                this.border(noun, noun2);
                break;
            case "margin":
                this.margin(noun, noun2);
                break;
            case "pad":
                this.pad(noun, noun2);
                break;
            case "m":
            case "merge":
                this.merge(noun, noun2);
                break;
            case "r":
            case "rotate":
                this.rotate(noun, noun2);
                break;
            case "s":
            case "split":
                this.split(noun);
                break;
            case "scale":
                this.scale(noun, noun2);
                break;
        }
    }

    border(id: string, width: string) {
        let node = select(id);
        if (!node) return;
        node.style.border = `${width}em solid white`;
    }

    pad(id: string, width: string) {
        let node = select(id);
        if (!node) return;
        node.style.padding = `${width}em`;
    }

    margin(id: string, width: string) {
        let node = select(id);
        if (!node) return;
        node.style.margin = `${width}em`;
    }

    merge(id1: string, id2: string) {
        let node1 = select(id1);
        let node2 = select(id2);
        merge_nodes(node1, node2);
    }

    rotate(id: string, deg: string) {
        let node = select(id);
        if (!node) return;
        this.transform_node(node, `rotate(${deg}deg)`);
    }

    scale(id: string, scale: string) {
        let node = select(id);
        if (!node) return;
        this.transform_node(node, `scale(${scale})`);
    }

    split(id: string) {
        let node = select(id);
        if (!node) return;
        split_node(node);
    }

    transform_node(node: HTMLElement, v: string) {
        let transform = (node.style.transform || "").split(" ");
        transform.unshift(v);
        node.style.transform = transform.join(" ");
    }
}

let repl = new Repl();

function startup() {
    let cmd = document.querySelector(".console") as HTMLInputElement;
    cmd.onkeydown = (event) => {
        console.log(event);
        if (event.key === "Enter") {
            repl.eval(cmd.value);
            cmd.value = "";
        }
    }
    reindex();
}

startup();


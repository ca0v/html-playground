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

function split(id: string) {
    let node = select(id);
    if (!node) return;
    split_node(node);
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

function startup() {
    let cmd = document.querySelector(".console") as HTMLInputElement;
    cmd.onkeydown = (event) => {
        console.log(event);
        if (event.key === "Enter") {
            repl.eval(cmd.value);
            cmd.value = "split ";
        }
    }
    reindex();
}

startup();

class Repl {
    eval(command: string) {
        let [verb, noun] = command.split(" ");
        switch (verb) {
            case "split":
                split(noun);
                break;
        }
    }
}

let repl = new Repl();
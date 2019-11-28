declare var gapi: {
    auth2: {
        getAuthInstance: () => {
            isSignedIn: {
                listen: (cb: (isSignedIn: boolean) => void) => void;
                get: () => boolean;
            }
            signIn: () => void;
            signOut: () => void;
        }
    }
    load: (type: string, cb: Function) => void;
    client: {
        init: (args: {
            apiKey: string;
            discoveryDocs: Array<string>;
            clientId: string;
            scope: string;
        }) => Promise<any>;
        photoslibrary: {
            albums: {
                list: Function;
            }
        }
    }
};

class GooglePhotoSignin {
    private peopleApiDiscovery = "";
    // where to store these values?
    private scopes = 'https://www.googleapis.com/auth/photoslibrary.readonly';
    private authorizeButton = document.getElementById('authorize-button') as HTMLButtonElement;
    private signoutButton = document.getElementById('signout-button') as HTMLButtonElement;
    private ready = () => { };

    async handleClientLoad() {
        // Load the API client and auth2 library.
        await new Promise((resolve, reject) => {
            gapi.load('client:auth2', resolve);
        });

        let credentialsResponse = await fetch("./web/credentials.json");
        let credentials: { apiKey: string, clientId: string } = await credentialsResponse.json();
        let resp = await fetch('./web/photos_rest_v1.json');
        this.peopleApiDiscovery = await resp.json();

        await this.initClient(credentials);
    }

    private async initClient(args: { apiKey: string; clientId: string }) {
        return new Promise<any>(async (good, bad) => {
            this.ready = () => good();

            await gapi.client.init({
                apiKey: args.apiKey,
                discoveryDocs: [this.peopleApiDiscovery],
                clientId: args.clientId,
                scope: this.scopes
            });

            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            this.authorizeButton.onclick = this.handleAuthClick;
            this.signoutButton.onclick = this.handleSignoutClick;
        });
    }

    private updateSigninStatus(isSignedIn: boolean) {
        if (isSignedIn) {
            this.authorizeButton.style.display = 'none';
            this.signoutButton.style.display = 'block';
            this.ready();
        } else {
            this.authorizeButton.style.display = 'block';
            this.signoutButton.style.display = 'none';
        }
    }

    private handleAuthClick() {
        gapi.auth2.getAuthInstance().signIn();
    }

    private handleSignoutClick() {
        gapi.auth2.getAuthInstance().signOut();
    }

}

class GooglePhotos {
    async getAlbums() {
        let signin = new GooglePhotoSignin();
        await signin.handleClientLoad();
        let resp = await gapi.client.photoslibrary.albums.list();
        if (resp.status !== 200) throw `status: ${resp.status}`;
        return (resp.result.albums) as Array<{
            coverPhotoBaseUrl: string;
        }>;
    }
}

let photos = new GooglePhotos();

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

async function startup() {
    let cmd = document.querySelector(".console") as HTMLInputElement;
    cmd.onkeydown = (event) => {
        console.log(event);
        if (event.key === "Enter") {
            repl.eval(cmd.value);
            cmd.value = "";
        }
    }
    reindex();

    const target = document.querySelector(".photos");
    if (target) {
        const albums = await photos.getAlbums();
        albums.forEach(album => {
            const img = document.createElement("img");
            img.src = album.coverPhotoBaseUrl;
            target.appendChild(img);
        });
    }
}

startup();


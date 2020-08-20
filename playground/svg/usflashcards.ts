import { Normalizer } from "./data/Normalizer.js";

function stateUrl(stateCode: string) {
    return `http://localhost:3002/mock/sampleserver6/arcgis/rest/services/USA/MapServer/2/query?where=state_abbr%3D%27${stateCode}%27&f=pjson`;
    //return `https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2/query?where=state_abbr%3D%27${stateCode}%27&f=json`;
}

const normalizer = new Normalizer();

async function getStateShape(stateCode: string) {
    const url = stateUrl(stateCode);
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

async function buildFlashCards(states: string[]) {

    const svg = states.map(async stateCode => {
        const url = stateUrl(stateCode);
        const response = await fetch(url);
        const data = await response.json();
        const svgPaths = normalizer.process(data);
        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', "clippath") as SVGClipPathElement;
        clipPath.id = stateCode;
        clipPath.setAttribute("clipPathUnits", "objectBoundingBox");
        clipPath.innerHTML = svgPaths;
        return clipPath;
    });
    return await Promise.all(svg);
}

async function run() {
    const target = document.querySelector("svg");
    if (!target) return;

    const states = "AK,AL,AR,CA,CO,CT,FL,ID,IN,MI,MA,MD,MT,NC,NH,NV,NC,ND,OK,OR,RI,SC,VA,VT,WA,WV,WY".split(",").sort();
    console.log(states.sort().join(","));
    const html = await buildFlashCards(states);
    target.innerHTML = html.map(v => v.outerHTML).join("");

    states.forEach(stateCode => {
        const wrapper = document.createElement("div");
        document.body.appendChild(wrapper);
        wrapper.classList.add("wrapper");
        const clipme = document.createElement("div");
        clipme.classList.add("clipme");
        clipme.style.clipPath = `url(#${stateCode})`;
        wrapper.appendChild(clipme);
    });
}

run();

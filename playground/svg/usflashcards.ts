import { Normalizer, State } from "./data/Normalizer.js";
import countries from "./data/countries.js";

function stateUrl(stateCode: string) {
    return `http://localhost:3002/mock/sampleserver6/arcgis/rest/services/USA/MapServer/2/query?where=state_abbr%3D%27${stateCode}%27&f=json&geometryPrecision=0.001&outsr=4326`;
    //return `https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2/query?where=state_abbr%3D%27${stateCode}%27&f=json`;
}

function countryUrl(countryCode: string) {
    return `http://localhost:3002/mock/sampleserver6/arcgis/rest/services/World_Countries/FeatureServer/0/query?where=ISO_CC%3D%27${countryCode}%27&f=json&geometryPrecision=1&outsr=3857`;
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

async function buildAsianFlashCards(countryCodes: string[]) {

    const svg = countryCodes.map(async countryCode => {
        const url = countryUrl(countryCode);
        const response = await fetch(url);
        const data = await response.json() as State;
        const svgPaths = normalizer.process(data);
        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', "clippath") as SVGClipPathElement;
        clipPath.id = countryCode;
        clipPath.setAttribute("clipPathUnits", "objectBoundingBox");
        clipPath.innerHTML = svgPaths;
        return clipPath;
    });
    return await Promise.all(svg);
}

async function buildUnitedStatesFlashCards(states: string[]) {
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

export async function run() {
    const target = document.querySelector("svg");
    if (!target) return;

    //["CC", "CN", "CX", "CY", "EG"]
    let countryCodes = countries.features
        .filter(f => 0 > ["South America", "North America", "Europe", "Asia", "Africa"].indexOf(f.attributes.CONTINENT))
        .sort((a, b) => a.attributes.CONTINENT.localeCompare(b.attributes.CONTINENT))
        .map(f => f.attributes.ISO_CC);

    // distinct
    countryCodes = [...new Set(countryCodes)];
    console.log(countryCodes);

    countryCodes = ["US"];//"NO", "SE", "FI"];
    const html = await buildAsianFlashCards(countryCodes);

    target.innerHTML = html.map(v => v.outerHTML).join("");

    countryCodes.forEach(stateCode => {
        const wrapper = document.createElement("div");
        document.body.appendChild(wrapper);
        wrapper.classList.add("wrapper");
        const clipme = document.createElement("div");
        clipme.classList.add("clipme");
        clipme.style.clipPath = `url(#${stateCode})`;
        wrapper.appendChild(clipme);
        wrapper.title = stateCode;
        const label = document.createElement("label");
        wrapper.appendChild(label);
        label.textContent = stateCode;
    });
}

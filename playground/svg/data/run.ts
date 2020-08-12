import { Normalizer } from "./Normalizer.js";

function stateUrl(stateCode: string) {
    return `http://localhost:3002/mock/sampleserver6/arcgis/rest/services/USA/MapServer/2/query?where=state_abbr%3D%27${stateCode}%27&f=pjson`;
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

async function run(stateCode: string) {
    const state = await getStateShape(stateCode);
    const svgPaths = normalizer.process(state);
    document.getElementById("path1")!.innerHTML = svgPaths;
}

const input= document.createElement("input");
document.body.appendChild(input);
input.addEventListener("change", () => run(input.value))
input.value = "VT";
input.dispatchEvent(new Event("change"));
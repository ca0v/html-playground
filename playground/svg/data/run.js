var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Normalizer } from "./Normalizer.js";
function stateUrl(stateCode) {
    //return `http://localhost:3002/mock/sampleserver6/arcgis/rest/services/USA/MapServer/2/query?where=state_abbr%3D%27${stateCode}%27&f=pjson`;
    return `https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2/query?where=state_abbr%3D%27${stateCode}%27&f=json`;
}
const normalizer = new Normalizer();
function getStateShape(stateCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = stateUrl(stateCode);
        console.log(url);
        const response = yield fetch(url);
        const data = yield response.json();
        console.log(data);
        return data;
    });
}
function run(stateCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const state = yield getStateShape(stateCode);
        const svgPaths = normalizer.process(state);
        document.getElementById("path1").innerHTML = svgPaths;
    });
}
const input = document.createElement("input");
document.body.appendChild(input);
input.addEventListener("change", () => run(input.value));
input.value = "VT";
input.dispatchEvent(new Event("change"));

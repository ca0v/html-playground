import markers from "./data/marker";
import { SvgEditorControl } from "./svgeditor";
import { SvgEditor } from "./fun/SvgEditor";
import { CoreRules } from "./fun/CoreRules";

function createSvgEditor(workview: SVGSVGElement, input: HTMLElement) {
    let editor = new SvgEditorControl(workview, input);
    return editor as SvgEditor;
}

export function run() {
    let d = Object.keys(markers).map(k => (<any>markers)[k]).join("\n").trim();
    let path = document.querySelector("path") as SVGPathElement;
    let svg = path.ownerSVGElement;
    if (!svg) throw "path must be in an svg container";
    path.setAttribute("d", d);
    let input = document.getElementById("svg-input") as HTMLElement;
    let editor = createSvgEditor(svg, input);
    editor.use(new CoreRules());
    editor.show();
}
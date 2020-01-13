import markers from "./data/marker";
import { SvgEditorControl } from "./svgeditor";
import { SvgEditor } from "./fun/SvgEditor";
import { CoreRules } from "./fun/CoreRules";
import { asDom } from "./fun/asDom";

function keys<T>(o: T) {
    return Object.keys(o) as Array<keyof typeof o>;
}
function createSvgEditor(workview: SVGSVGElement, input: HTMLElement) {
    let editor = new SvgEditorControl(workview, input);
    return editor as SvgEditor;
}

export function run() {
    let path = document.querySelector("path") as SVGPathElement;
    let svg = path.ownerSVGElement;
    if (!svg) throw "path must be in an svg container";
    path.setAttribute("d", markers.marker5);
    let input = document.getElementById("svg-input") as HTMLElement;
    let editor = createSvgEditor(svg, input);
    editor.use(new CoreRules());
    editor.show();

    let toolbar = asDom(`<div class="toolbar"></div>`);
    document.body.appendChild(toolbar);
    toolbar.appendChild(asDom(`<button class="F1"><svg viewBox="-18 -18 36 36"><use href="#svg-path"></use></svg></button>`));

    keys(markers).forEach(marker => {
        let b = asDom(`<button id="${marker}" class="F1"><svg viewBox="-18 -18 36 36"><path d="${markers[marker]}"></path></svg></button>`);
        toolbar.appendChild(b);
        b.addEventListener("click", () => {
            path.setAttribute("d", markers[marker]);
            editor.show();
        });
    });
}
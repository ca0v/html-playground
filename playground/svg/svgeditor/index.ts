import markers from "./data/marker";
import icons from "./data/icons";
import { SvgEditorControl } from "./widgets/SvgEditorControl";
import { SvgEditor } from "./typings/SvgEditor";
import { CoreRules } from "./widgets/CoreRules";
import { asDom } from "./fun/asDom";
import { Digitizer } from "./widgets/DigitizerRule";
import { keys } from "./fun/keys";
import { getPath } from "./fun/getPath";
import { Toaster } from "./widgets/Toaster";
import { NotificationEditorRule } from "./widgets/NotificationEditorRule";
import { ImageLoaderRule } from "./widgets/ImageLoaderRule";
import { StateManagementRule } from "./widgets/StateManagementRule";
import { GridManagementRule } from "./widgets/GridManagementRule";
import { FileRule } from "./widgets/FileRule";
import { PathRule } from "./widgets/PathRule";
import { ShortcutManager } from "./widgets/KeyboardShortcuts";

const shortcutManager = new ShortcutManager();
function createSvgEditor(workview: SVGSVGElement, input: HTMLElement) {
  let editor = new SvgEditorControl(workview, input, {
    shortcutManager
  });
  return editor as SvgEditor;
}

function pasteFromClipboard(clipboard: { value: string }) {
  let svgText = clipboard.value.trim();
  let svg = asDom(`<svg>${svgText}</svg>`);
  return Array.from(svg.querySelectorAll("symbol")) as SVGSymbolElement[];
}

function insertIntoEditor(editor: SvgEditor, pathData: SVGPathElement) {
  // not sure why this is necessary...probably the namespace?
  const svgConverterPathNode: SVGPathElement = <any>document.getElementById("cleanup");
  svgConverterPathNode.setAttribute("d", <any>pathData.getAttribute("d"));
  let d = getPath(svgConverterPathNode);
  editor.insertPath(d);
}

export function run() {
  const toaster = new Toaster();
  document.body.appendChild(toaster.domNode);
  toaster.setContent("Hello!");

  let path = document.querySelector("path") as SVGPathElement;
  let svg = path.ownerSVGElement;
  if (!svg) throw "path must be in an svg container";
  //path.setAttribute("d", markers.marker5);
  path.setAttribute("d", "M 0 0 Z");

  let input = document.getElementById("svg-input") as HTMLElement;
  let editor = createSvgEditor(svg, input);
  editor.use(new GridManagementRule());
  editor.use(new StateManagementRule());
  editor.use(new CoreRules(shortcutManager));
  editor.use(new Digitizer());
  editor.use(new NotificationEditorRule(toaster));
  editor.use(new ImageLoaderRule());
  editor.use(new FileRule());
  editor.use(new PathRule());

  let toolbar = asDom(`<div class="toolbar hidden">
  <input class="filter" placeholder="filter icons"/>
  </div>`);
  document.body.appendChild(toolbar);

  keys(markers).forEach(marker => {
    let b = asDom(
      `<button id="${marker}" class="marker"><svg viewBox="-18 -18 36 36"><path d="${markers[marker]}"></path></svg></button>`
    );
    toolbar.appendChild(b);
    b.addEventListener("click", () => {
      insertIntoEditor(editor, b.querySelector("path") as SVGPathElement);
    });
  });

  keys(icons).forEach(marker => {
    let b = asDom(
      `<button id="${marker}" class="icon"><svg viewBox="0 0 36 36"><path d="${icons[marker]}"></path></svg></button>`
    );
    toolbar.appendChild(b);
    b.addEventListener("click", () => {
      insertIntoEditor(editor, b.querySelector("path") as SVGPathElement);
    });
  });

  const clipboard = document.querySelector(".clipboard") as HTMLTextAreaElement;
  if (clipboard) {
    const doit = () => {
      const symbols = pasteFromClipboard(clipboard);
      if (symbols) {
        symbols.forEach(symbol => {
          let { x, y, width, height } = symbol.viewBox.baseVal;
          let b = asDom(
            `<button class="icon" title=#${symbol.id}><svg viewBox="${x} ${y} ${width} ${height}"><g>${symbol.innerHTML}</g></svg></button>`
          );
          toolbar.appendChild(b);
          b.addEventListener("click", () => {
            let pathData = symbol.querySelector("path") as SVGPathElement;
            insertIntoEditor(editor, pathData);
          });
        });
      }
    };
    doit();
    clipboard.addEventListener("change", doit);
  }

  const inset = document.querySelector(".inset") as HTMLImageElement;
  if (inset) {
    editor.subscribe("source-path-changed", () => {
      let path = editor
        .getSourcePath()
        .join(" ");
      path = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 32 32"><g><path d="${path}"></path></g></svg>`;
      let url = `data:image/svg+xml;base64,${btoa(path)}`;
      inset.src = url;
    });
  }

}

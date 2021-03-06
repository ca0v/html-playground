import { SvgEditor } from "../typings/SvgEditor";
import { SvgEditorRule } from "../typings/SvgEditorRule";

export class StateManagementRule implements SvgEditorRule {
  initialize(editor: SvgEditor): void {
    let viewbox = localStorage.getItem("viewbox");
    if (!viewbox)
      return;
    const svgs = document.querySelectorAll(".layers svg[viewbox]");
    for (let e of svgs) {
      const svg = e as SVGSVGElement;
      svg.setAttribute("viewBox", viewbox);
    }
  }
}

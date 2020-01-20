import { SvgEditor, SvgEditorRule } from "./SvgEditor";
import { createSvg } from "./createSvg";
import { createGrid } from "./createGrid";
import { createPath } from "./createPath";
import { setPath } from "./setPath";
export class GridManagementRule implements SvgEditorRule {
    private gridOverlay: SVGSVGElement;
    private workPath: SVGPathElement;
    private cursorPath: SVGPathElement;
    private gridPath: SVGPathElement | undefined;

    private getScale(svg: SVGSVGElement) {
        let { width: viewBoxWidth } = svg.viewBox.baseVal;
        let { width } = svg.getBoundingClientRect();
        return width / viewBoxWidth;
    }

    hideGrid(): void {
        this.gridOverlay.classList.add("hidden");
    }

    showGrid(): void {
        this.gridPath?.remove();
        this.gridPath = createGrid(this.gridOverlay);
        this.gridOverlay.classList.remove("hidden");
        const scale = this.getScale(this.gridOverlay);
        console.log("scale", scale);
        this.gridPath.style.setProperty("stroke-width", 1 / scale + "");
        this.workPath.style.setProperty("stroke-width", 1.5 / scale + "");
        this.cursorPath.style.setProperty("stroke-width", 2 / scale + "");
    }

    isGridVisible(): boolean {
        return !this.gridOverlay.classList.contains("hidden");
    }

    isMarkersVisible() {
        return !!this.workPath.getAttribute("d");
    }

    constructor() {
        const layers = document.querySelector(".layers") as HTMLElement;
        const svg = layers.querySelector("svg") as SVGSVGElement;
        let { x, y, width, height } = svg.viewBox.baseVal;
        this.gridOverlay = createSvg();
        this.gridOverlay.classList.add("hidden");
        this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        layers.appendChild(this.gridOverlay);

        // how to get workPath stroke-width to be 0.2 regardless of scale?
        this.workPath = createPath({
            fill: "rgb(0,255,128)",
            stroke: "rgb(0,255,128)",
            "stroke-width": "0.2",
        });
        this.gridOverlay.appendChild(this.workPath);

        this.cursorPath = createPath({
            stroke: "rgb(0, 255, 0)",
            "stroke-width": "0.2",
        });
        this.gridOverlay.appendChild(this.cursorPath);
    }

    initialize(editor: SvgEditor): void {
        editor.shortcut("Slash Toggle GridLines", () => {
            if (this.isGridVisible()) {
                this.hideGrid();
            }
            else {
                this.showGrid();
            }
        });

        editor.shortcut("Slash Toggle Markers", () => {
            if (this.isMarkersVisible()) {
                editor.hideMarkers();
            }
            else {
                this.showGrid();
                editor.showMarkers();
            }
        });

        editor.subscribe("showcursor", (path: string) => {
            setPath(this.cursorPath, path);
        });

        editor.subscribe("hidemarkers", () => {
            setPath(this.workPath, "");
        });

        editor.subscribe("showmarkers", (path: string) => {
            setPath(this.workPath, path);
        });

        editor.subscribe("hidecursor", () => setPath(this.cursorPath, ""));
    }
}

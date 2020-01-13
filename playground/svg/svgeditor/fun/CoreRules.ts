import { SvgEditorRule, SvgEditor } from "./SvgEditor";

export class CoreRules implements SvgEditorRule {
    initialize(editor: SvgEditor) {
        // "?"
        editor.subscribe("ShiftRight+Slash", () => {
            let help = document.querySelector(".F1");
            help?.classList.toggle("hidden");
        });


        editor.subscribe("Escape", () => {
            editor.hideCursor();
            editor.hideCommandEditor();
            editor.hideMarkers();
            editor.setActiveIndex(0);
        });

        editor.subscribe("KeyG", () => {
            if (editor.isGridVisible()) {
                editor.hideGrid();
            }
            else {
                editor.showGrid();
            }
        });

        editor.subscribe("KeyM", () => {
            if (editor.isMarkersVisible()) {
                editor.hideMarkers();
            } else {
                editor.showGrid();
                editor.showMarkers();
            }
        });

        editor.subscribe("NumpadAdd", () => {
            let layers = document.querySelector(".layers") as HTMLElement;
            let currentScale = getComputedStyle(layers).transform;
            if (currentScale === "none") currentScale = "";
            layers.style.transform = `${currentScale} translate(100%,100%) scale(2) translate(-50%,-50%)`;
            // zoom 2x
            // translate(100%,100%) scale(2) translate(-50%,-50%) 
            // zoom 3x
            // translate(150%,150%) scale(3) translate(-50%,-50%) 
        });

        editor.subscribe("NumpadSubtract", () => {
            let layers = document.querySelector(".layers") as HTMLElement;
            let currentScale = getComputedStyle(layers).transform;
            if (currentScale === "none") currentScale = "";
            // inverse zoom-in
            layers.style.transform = `${currentScale} translate(50%, 50%) scale(0.5) translate(-100%,-100%)`;
        });
    }
}

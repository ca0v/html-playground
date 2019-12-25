import { Repl } from "../controls/Repl";
import { Command } from "../models/Command";
import { getFocusPanels } from "./getFocusPanels";
import { CollagePanel } from "../controls/CollagePanel";
import { transform } from "../fun/transform";

/**
 * Scale the image
 * @param scale percentage delta from current scale
 */
function scaleImage(repl: Repl, panel: CollagePanel, scale: string) {
    let node = panel.image;
    if (!node)
        return;

    if (!scale) {
        let width = getComputedStyle(node).width;
        let scale = parseFloat(width) / 100;
        repl.animations.animate("zoom", () => {
            scale *= 1.01;
            node.style.width = `${100 * scale}%`;
        });
    }
    else {
        // compute focal point to zoom about
        // let imageBox = bbox(node);
        // let panelBox = bbox(panel.panel);
        // let focalPoint = [-imageBox.left + panelBox.width / 2, -imageBox.top + panelBox.height / 2];
        let effectiveScale = parseFloat(scale);
        //node.style.width = `${100 * effectiveScale}%`;
        // the image width and height changed, translate the original image
        // center back to the panel center
        transform(node, `scale(${effectiveScale},${effectiveScale})`);

    }
}

export class ScalePanelCommand implements Command {
    constructor(public scale?: number) {
    }
    execute(repl: Repl, args?: string | undefined): void | false {
        if (!!args) {
            let [noun, noun2] = args.split(" ");
            let panel = repl.selectPanel(noun);
            if (!panel) return false;
            panel.scaleFrame(noun2);
        }

        let panels = getFocusPanels(repl);
        if (!panels.length) return false;

        panels.forEach(panel => {
            panel.scaleFrame(this.scale + "");
        });
    }
}

export class ScaleImageCommand implements Command {
    constructor(public scale?: number) {
    }
    execute(repl: Repl, args?: string | undefined): void | false {
        if (!!args) {
            let [id, scale] = args.split(" ");
            let panel = repl.selectPanel(id);
            if (!panel) return false;
            scaleImage(repl, panel, scale);
            return;
        }

        if (!this.scale) return false;
        let panels = getFocusPanels(repl);
        if (!panels.length) return false;

        panels.forEach(panel => {
            scaleImage(repl, panel, this.scale + "");
        });
    }
}


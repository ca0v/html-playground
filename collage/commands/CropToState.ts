import { Command } from "../models/Command";
import { Repl } from "../controls/Repl";
import { Dictionary } from "../models/Dictionary";

const paths = {
    "sc": "M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z"
}

const svgHash = <Dictionary<SVGPathElement>>{};

function getSvgPath(key: keyof (typeof paths)) {
    let result = svgHash[key];
    if (!result) {
        result = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        result.id = key;
        result.setAttribute("d", paths[key]);
        svgHash[key] = result;
    }
    return result;
}

export class CropToStateCommand implements Command {
    about() {
        return `applies an SVG filter to an image`;
    }

    execute(repl: Repl, args: string): void {
        let [usStateCode, ...ids] = args.split(" ").filter((v) => !!v);
        const targets = ids.length ? ids.map((id) => repl.selectPanel(id)) : repl.panels;
        const path = getSvgPath("sc");

        targets.forEach((p) => {
            p!.panel.style.clipPath = `url(#heart)`;
        });
    }
}

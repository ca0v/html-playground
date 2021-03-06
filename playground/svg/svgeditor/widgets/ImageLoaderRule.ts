import { SvgEditor } from "../typings/SvgEditor";
import { SvgEditorRule } from "../typings/SvgEditorRule";

export class ImageLoaderRule implements SvgEditorRule {

    initialize(editor: SvgEditor): void {
        const img = document.querySelector(".pixels-to-digitize") as HTMLImageElement;
        if (!img)
            return;

        editor.shortcut("Slash Bitmap Open", () => {
            const url = prompt("what is the url?", "https://media.istockphoto.com/photos/portrait-of-brown-puppy-with-bokeh-background-picture-id636475496");
            if (!url)
                return;
            const priorUrl = img.src;
            img.src = url;
            return {
                undo: () => {
                    img.src = priorUrl;
                }
            };
        });
    }
}

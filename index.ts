import { start } from "./collage/fun/start";
import { globals } from "./collage/globals";

async function run() {
    start();

    const repl = globals.repl;

    repl.eval("aspect 6 6");
    if (globals.debug) {
        repl.eval("?");
        repl.eval("split 1");
        repl.eval("merge 4 3");
        repl.eval("split 2");
        repl.eval("merge 4 5");
        repl.eval("merge 2 3");
        ///repl.eval("split 1");

        repl.eval("bw 1em");
        repl.eval("bc white");
        repl.eval("bgc silver");
        // repl.eval("scale 1 0.75");
        // repl.eval("border 1 3 silver");
        // repl.eval("rotate 1 -2");
        // repl.eval("zoom 2 0.5");
        // repl.eval("split 1");
        // repl.eval("merge 1 2");
        // repl.eval("split 6");
        // repl.eval("merge 8 9");
        // repl.eval("merge 6 7");
        // repl.eval("goto 1");
        // repl.eval("text 1 Summer 2019");
        return;
        await repl.eval("open Date Night,2019"); // present list of google photo albums?
        //await repl.eval("open gp 1999"); // open google photo album "1999"?

        setTimeout(() => {
            let panelCount = document.querySelectorAll(".collage .panel").length;
            let photoCount = document.querySelectorAll(".collage .photos .img").length;
            for (let i = 1; i <= panelCount; i++) {
                repl.eval(`move ${1 + (i - 1) % photoCount} ${i}`);
            }
            // repl.eval("open 1");
            // repl.eval("hires 6");
            // repl.eval("export");
        }, 3000);
    }
}

run();

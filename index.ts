import { start } from "./collage/start";
import { globals } from "./collage/globals";

start();

const repl = globals.repl;

repl.eval("aspect 7 5");
if (globals.debug) {
    repl.eval("scale 1 0.75");
    repl.eval("border 1 3");
    repl.eval("rotate 1 -2");
    repl.eval("split 1");
    repl.eval("zoom 2 1");
    repl.eval("split 1");
    repl.eval("merge 2 3");
    repl.eval("goto 1");
    repl.eval("text 1 Summer 2019");
    setTimeout(() => {
        let photoCount = document.querySelectorAll(".photos .img").length;
        for (let i = 1; i <= 6; i++) {
            repl.eval("move " + (1 + Math.floor(photoCount * Math.random())) + " " + i);
        }
        // repl.eval("open 1");
        repl.eval("hires 6");
        // repl.eval("export");
    }, 3000);
}

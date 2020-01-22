var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("data/marker", ["require", "exports"], function (require, exports) {
    "use strict";
    return {
        marker1: `M 0 -20
C 0 -20 -6 -20 -6 -12
C -6 -9 0 0 0 0
S 6 -9 6 -12
C 6 -20 0 -20 0 -20
M 0 0
Z`,
        marker2: `M 0 -24
C 0 -24 -6 -24 -6 -16
C -6 -13 0 -4 0 -4
S 6 -13 6 -16
C 6 -24 0 -24 0 -24
M 0 -2
A 1 1 0 0 1 0 2
A 1 1 0 0 1 0 -2
M 0 0
Z`,
        marker3: `M 0 -24
C 0 -24 -6 -24 -6 -16
C -6 -13 0 -4 0 -4
S 6 -13 6 -16
C 6 -24 0 -24 0 -24
M 0 0
L -2 -2
M 0 0
L -2 2
M 0 0
L 2 -2
M 0 0
L 2 2
M 0 0
Z`,
        marker4: `M 0 -20
Z
M 0 -24
C 0 -24 -6 -24 -6 -16
C -6 -13 0 -4 0 -4
S 6 -13 6 -16
C 6 -24 0 -24 0 -24
M 0 0
L -3 -3
L -4 -3
L -1 0
L -4 3
L -3 3
L 0 0
L 3 3
L 4 3
L 1 0
L 4 -3
L 3 -3
L 0 0
M 0 -13
A 2 2 0 0 1 0 -21
A 2 2 0 0 1 0 -13
M 0 0
Z`,
        marker5: `M 0 -20
Z
M 0 -24
C 0 -24 -6 -24 -6 -16
C -6 -13 0 -4 0 -4
S 6 -13 6 -16
C 6 -24 0 -24 0 -24
M 0 -1
L -1 -2
L -4 -3
L -2 0
L -4 3
L -1 2
L 0 1
L 1 2
L 4 3
L 2 0
L 4 -3
L 1 -2
L 0 -1
M 0 -13
A 2 2 0 0 1 0 -21
A 2 2 0 0 1 0 -13
M 0 0
Z`,
        marker6: `M 0 -3
L -3 -23
L 3 -23
L 0 -3
z
M 0 0
L 2 4
L -2 4
Z`,
    };
});
define("data/icons", ["require", "exports"], function (require, exports) {
    "use strict";
    return {
        zoomin: `M 14 15
A 8 8 0 1 1 17 12
L 22 17
A 3 3 0 0 1 19 20
L 14 15
Z
M 11 4
L 9 4
L 9 7
L 6 7
L 6 9
L 9 9
L 9 12
L 11 12
L 11 9
L 14 9
L 14 7
L 11 7
L 11 4
Z`,
        zoomout: `
M 14 15
A 8 8 0 1 1 17 12
L 22 17
A 3 3 0 0 1 19 20
L 14 15
Z
M 14 7
L 7 7
A 1 2 0 0 0 7 9
L 14 9
A 1 2 0 0 0 14 7
Z`,
        polygon: `M 12 0
L 24 13
L 12 22
L 3 14
L 11 11
Z`,
        info: `
M 12 18
L 6 23
L 2 23
L 7 9
L 3 11
L 2 11
L 8 8
L 12 8
L 7 21
L 10 19
Z
M 12 1
A 1 1 0 0 0 10 5
A 1 1 0 0 0 12 1`,
        wizard: `M 11 0
L 8 7
L 0 8
L 5 13
L 4 21
L 9 18
L 10 23
L 12 23
L 13 18
L 19 21
L 17 13
L 22 8
L 14 7
Z
M 11.005 4.937
L 12.484 9.489
L 17.08 9.489
L 13.387 12.055
L 15.844 17.462
L 11.009 13.663
L 7.163 16.432
L 8.622 12.056
L 4.922 9.489
L 9.521 9.489
L 11.005 4.937
Z
`,
        select: `
M 10 22
A 1 1 0 0 0 12 21
L 10 15
L 15 15
L 3 2
L 3 19
L 7 16
Z`,
        next: `M 2 4
L 2 20
L 4 20
L 11 12
L 4 4
Z`,
        previous: `M 11 4
  L 9 4
  L 2 12
  L 9 20
  L 11 20
  Z`,
        zoomfull: `M 17 14
  A 1 1 0 0 0 6 7
  L 8 5
  A 1 1 0 0 0 15 16
  L 18 19
  L 20 17
  L 17 14
  Z
  M 1 1
  L 1 6
  L 6 1
  Z
  M 23 1
  L 18 1
  L 23 6
  Z
  M 23 23
  L 23 18
  L 18 23
  Z
  M 1 23
  L 6 23
  L 1 18
  Z
  `,
        clear: `
  M 0 23
  L 8 5
  L 20 5
  L 11 23
  Z
  M 6 13
  L 14 13
  L 17 7
  L 9 7
  Z
  M 13 23
  L 22 23
  L 22 22
  L 13 22
  Z`,
        pan: `M 8 20
  L 17 20
  L 20 9
  A 1 1 0 0 0 18 9
  L 17 13
  L 17 5
  A 1 1 0 0 0 15 5
  L 14 12
  L 13 4
  A 1 1 0 0 0 11 4
  L 11 12
  L 9 5
  A 1 1 0 0 0 7 5
  L 8 15
  L 5 12
  A 1 1 0 0 0 3 14
  Z`,
        buffer: `M 12 19
  A 1 1 0 0 0 12 6
  A 1 1 0 0 0 12 19
  M 6 16
  A 1 1 0 0 1 14 6
  A 7 7 0 0 0 6 16
  Z`,
        measure: `M 11 10
  A 1 1 0 0 0 13 10
  A 1 1 0 0 0 11 10
  M 9 10
  A 1 1 0 0 1 15 10
  A 1 1 0 0 1 9 10
  M 12 3
  A 1 1 0 0 0 12 17
  A 1 1 0 0 0 12 3
  L 22 3
  L 23 5
  L 22 6
  L 21 5
  L 17 5
  A 10 20 0 0 0 12 3`
    };
});
define("fun/Command", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/Dictionary", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/drawCursor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function drawCursor(location, scale = 5) {
        let { x, y } = location;
        return `M ${x} ${y} l -${scale} -${scale} l ${2 * scale} ${2 * scale} l -${scale} -${scale} l ${scale} -${scale} l -${2 * scale} ${2 * scale} z`;
    }
    exports.drawCursor = drawCursor;
});
define("fun/drawX", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function drawX(location, options) {
        var _a, _b;
        let { x, y } = location;
        let scale = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.scale, (_b !== null && _b !== void 0 ? _b : 1));
        return `M ${x} ${y} l ` + `-${scale} -${scale} l ${2 * scale} ${2 * scale} l -${scale} -${scale} l ${scale} -${scale} l -${2 * scale} ${2 * scale} z`;
    }
    exports.drawX = drawX;
});
define("fun/focus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function focus(element) {
        if (!element)
            return;
        if (!element.focus)
            return;
        element.focus();
    }
    exports.focus = focus;
});
define("fun/parse", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function parse(commandText) {
        let [head, ...tail] = commandText.split(" ");
        return { command: head, args: tail.map(parseFloat) };
    }
    exports.parse = parse;
});
define("fun/getLocation", ["require", "exports", "fun/parse"], function (require, exports, parse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getLocation(index, path) {
        let command = parse_1.parse(path[index]);
        switch (command.command) {
            case "A": return { x: command.args[5], y: command.args[6] };
            case "C": return { x: command.args[4], y: command.args[5] };
            case "H": return { x: command.args[0], y: getLocation(index - 1, path).y };
            case "L": return { x: command.args[0], y: command.args[1] };
            case "M": return { x: command.args[0], y: command.args[1] };
            case "S": return { x: command.args[2], y: command.args[3] };
            case "T": return { x: command.args[0], y: command.args[1] };
            case "V": return { x: getLocation(index - 1, path).x, y: command.args[0] };
            case "Z": {
                while ((0 <= --index) && !path[index].startsWith("M"))
                    ;
                return (0 <= index) ? getLocation(index, path) : { x: 0, y: 0 };
            }
        }
    }
    exports.getLocation = getLocation;
});
define("fun/getPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getPath(path) {
        let d = getComputedStyle(path).getPropertyValue("d");
        let firstQuote = d.indexOf("\"");
        if (firstQuote < 0)
            throw "no quote found";
        let lastQuote = d.lastIndexOf("\"");
        if (lastQuote <= firstQuote)
            throw "no end quote found";
        return d.substring(firstQuote + 1, lastQuote);
    }
    exports.getPath = getPath;
});
define("fun/stringify", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function round2(n) {
        return Math.round(n * 1000) / 1000;
    }
    function stringify(command) {
        return `${command.command} ${command.args.map(v => round2(v)).join(" ")}`;
    }
    exports.stringify = stringify;
});
define("fun/parsePath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function parsePath(path) {
        let tokens = path.split("");
        let commands = [];
        let commandArgs = [];
        while (tokens.length) {
            let ch = tokens.pop();
            if (!ch)
                throw "expected a token";
            if ((ch >= "A" && ch <= "Z")) {
                commandArgs.reverse();
                let args = commandArgs
                    .join("")
                    .split(" ")
                    .map(v => v.trim())
                    .filter(v => v !== "")
                    .map(v => parseFloat(v));
                commands.push({ command: ch, args });
                commandArgs = [];
            }
            else {
                commandArgs.push(ch);
            }
        }
        return commands.reverse();
    }
    exports.parsePath = parsePath;
    let test = parsePath(`M13.235 3.008l-.846-1.078c-.362-.603-1.013-.922-1.716-.922h-3.34c-.703 0-1.355.319-1.716.922l-.847 1.078h-2.774c-1.105 0-2 .895-2 2v9.996c0 1.104.895 2 2 2h13.994c1.104 0 2-.896 2-2v-9.996c0-1.105-.896-2-2-2h-2.755zm-9.251 6.998c0-2.761 2.242-4.998 5.009-4.998 2.766 0 5.009 2.237 5.009 4.998 0 2.759-2.243 4.998-5.009 4.998-2.767 0-5.009-2.239-5.009-4.998zm5.009-2.998c-1.658 0-3.006 1.344-3.006 2.999 0 1.653 1.347 2.999 3.006 2.999 1.657 0 3.006-1.345 3.006-2.999 0-1.654-1.348-2.999-3.006-2.999`);
    if (test.length !== 50) {
        console.warn(test);
        //throw "fail";
    }
});
define("fun/getPathCommands", ["require", "exports", "fun/stringify", "fun/parsePath", "fun/getPath"], function (require, exports, stringify_1, parsePath_1, getPath_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getPathCommands(path) {
        return parsePath_1.parsePath(getPath_1.getPath(path)).map(stringify_1.stringify);
    }
    exports.getPathCommands = getPathCommands;
});
define("fun/setPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function setPath(pathElement, d) {
        pathElement.setAttribute("d", d);
    }
    exports.setPath = setPath;
});
define("fun/keys", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function keys(o) {
        return Object.keys(o);
    }
    exports.keys = keys;
});
define("fun/UndoRedo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UndoRedo {
        constructor() {
            this.stack = [];
            this.index = -1;
        }
        run(op) {
            const result = op();
            if (!result)
                return;
            const { undo, redo } = result;
            if (!undo || !redo)
                return;
            this.stack[++this.index] = { undo, redo };
        }
        canRedo() {
            return 1 <= this.stack.length && this.index < this.stack.length - 1;
        }
        canUndo() {
            return 0 <= this.index;
        }
        undo() {
            this.stack[this.index--].undo();
        }
        redo() {
            this.stack[++this.index].redo();
        }
    }
    exports.UndoRedo = UndoRedo;
});
define("fun/KeyboardShortcuts", ["require", "exports", "fun/keys", "fun/UndoRedo"], function (require, exports, keys_1, UndoRedo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // do not use Alt
    const atomicTokens = "ArrowLeft ArrowRight ArrowUp ArrowDown Control Delete End Enter Escape Home Minus PageUp PageDown Plus Shift Slash Space".split(" ");
    const isAtomic = (v) => 0 <= atomicTokens.indexOf(v);
    class ShortcutManager {
        constructor() {
            this.undos = new UndoRedo_1.UndoRedo();
            this.shortcuts = { key: "", ops: [], subkeys: {}, parent: null };
            this.currentState = this.shortcuts;
            this.firstLetter = (word) => word[0];
            this.tokenize = (words) => words.split(/[ ]/).map(v => (isAtomic(v) ? v : this.firstLetter(v).toUpperCase()));
            this.forceNode = (node, shortcuts) => {
                if (!shortcuts.length)
                    return node;
                const key = shortcuts.shift();
                if (typeof key === "undefined")
                    throw "key cannot be empty";
                node.subkeys[key] = node.subkeys[key] || { key, parent: node, subkeys: {}, ops: [] };
                return this.forceNode(node.subkeys[key], shortcuts);
            };
        }
        help(root = this.currentState, deep = false) {
            const visitAll = (node, cb) => {
                cb(node);
                keys_1.keys(node.subkeys).forEach(key => visitAll(node.subkeys[key], cb));
            };
            const visitUp = (node, cb) => {
                cb(node);
                node.parent && visitUp(node.parent, cb);
            };
            if (deep) {
                const parentKeys = [];
                visitAll(root, node => {
                    if (node.ops && node.ops.length) {
                        parentKeys.push(node.title || node.key);
                    }
                });
                return parentKeys.join("\n");
            }
            let results = keys_1.keys(root.subkeys);
            // if no child ops report parent ops
            if (!results.length) {
                root.parent && visitAll(root.parent, node => results.push(node.key));
            }
            return results.length ? `[${results.join("|")}]` : deep ? "" : this.help(root, true);
        }
        watchKeyboard(root, callbacks) {
            this.log = callbacks.log;
            let lastStatefulState;
            // move into keyboard shortcuts
            root.addEventListener("keydown", event => {
                var _a;
                if (event.altKey)
                    return; // reserved for the browser
                //if (event.ctrlKey) return; // app constrained not to use ctrl
                const map = {
                    " ": "Space",
                    "-": "Minus",
                    "+": "Plus",
                    "/": "Slash",
                };
                const key = map[event.key] || event.key;
                let nextState = this.findNode(this.currentState, key);
                if (!nextState) {
                    nextState = this.currentState.parent;
                    while (nextState) {
                        const tempState = this.findNode(nextState, key);
                        if (tempState) {
                            nextState = tempState;
                            break;
                        }
                        nextState = nextState.parent;
                    }
                }
                if (!nextState) {
                    // suggest a key
                    !event.repeat && this.log(`Try one of these: ${this.help(this.currentState)}`);
                    return;
                }
                event.preventDefault();
                if (!nextState.ops.length) {
                    this.currentState = nextState;
                    !event.repeat && this.log(`Up next: ${this.help(this.currentState)}`);
                    return;
                }
                if (!event.repeat) {
                    this.log(`${nextState.title}`);
                    keys_1.keys(nextState.subkeys).length && this.log(`more: ${this.help(nextState)}`);
                }
                this.execute(nextState);
                if (!((_a = nextState.options) === null || _a === void 0 ? void 0 : _a.stateless)) {
                    lastStatefulState = nextState;
                }
                this.currentState = lastStatefulState || this.currentState;
            });
        }
        execute(nextState) {
            nextState.ops.forEach(op => this.undos.run(op));
        }
        findNode(node, shortcut) {
            if (!shortcut)
                return node;
            return node.subkeys[isAtomic(shortcut) ? shortcut : shortcut.toUpperCase()];
        }
        registerShortcut(title, callback) {
            const tokens = this.tokenize(title);
            const node = this.forceNode(this.shortcuts, tokens);
            if (node.ops.length > 0)
                throw "cannot overload a keyboard shortcut";
            node.ops.push(callback);
            node.title = title;
            return node;
        }
        getShortcut(title) {
            return this.forceNode(this.shortcuts, this.tokenize(title));
        }
        // to be replaced with calbacks.log
        log(message) {
            console.log(message);
        }
        redo() {
            if (!this.undos.canRedo()) {
                this.log("cannot redo anything");
                return;
            }
            this.undos.redo();
        }
        undo() {
            if (!this.undos.canUndo()) {
                this.log("cannot undo anything");
                return;
            }
            this.undos.undo();
        }
    }
    exports.ShortcutManager = ShortcutManager;
});
define("fun/SvgEditor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("fun/getScale", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getScale(svg) {
        let { width: viewBoxWidth } = svg.viewBox.baseVal;
        let { width } = svg.getBoundingClientRect();
        return width / viewBoxWidth;
    }
    exports.getScale = getScale;
});
define("fun/SvgEditorControl", ["require", "exports", "fun/drawCursor", "fun/drawX", "fun/focus", "fun/getLocation", "fun/getPathCommands", "fun/parse", "fun/parsePath", "fun/setPath", "fun/KeyboardShortcuts", "fun/stringify", "fun/getScale"], function (require, exports, drawCursor_1, drawX_1, focus_1, getLocation_1, getPathCommands_1, parse_2, parsePath_2, setPath_1, KeyboardShortcuts_1, stringify_2, getScale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SvgEditorControl {
        constructor(workview, input) {
            this.workview = workview;
            this.input = input;
            this.topics = {};
            this.currentIndex = -1;
            this.shortcutManager = new KeyboardShortcuts_1.ShortcutManager();
            this.sourcePath = this.workview.querySelector("path");
            if (!this.sourcePath)
                throw "workview must have a path";
            this.shortcut("Slash Help", () => {
                console.log(this.shortcutManager.help(this.shortcutManager.shortcuts, true));
                this.publish("log", this.shortcutManager.help());
            }).options({ stateless: true });
            this.input.parentElement && this.shortcutManager.watchKeyboard(this.input.parentElement, {
                log: (message) => {
                    this.publish("log", message);
                }
            });
        }
        redo() {
            this.shortcutManager.redo();
        }
        undo() {
            this.shortcutManager.undo();
        }
        use(rule) {
            rule.initialize(this);
            return this;
        }
        getCursorLocation() {
            return getLocation_1.getLocation(this.currentIndex, this.getSourcePath());
        }
        getViewbox() {
            let { x, y, width, height } = this.workview.viewBox.baseVal;
            return { x, y, width, height };
        }
        getActiveIndex() {
            return this.currentIndex;
        }
        shortcut(topic, callback) {
            const node = this.shortcutManager.registerShortcut(topic, callback);
            return {
                unsubscribe: () => { },
                options: (options) => {
                    node.title = options.because;
                    node.options = options;
                },
            };
        }
        subscribe(topic, callback) {
            let subscribers = (this.topics[topic] = this.topics[topic] || []);
            subscribers.push(callback);
            return {
                unsubscribe: () => {
                    let i = subscribers.indexOf(callback);
                    if (i < 0)
                        return;
                    subscribers.splice(i, 1);
                },
                because: (about) => {
                    // use a shortcut instead
                },
            };
        }
        hideCursor() {
            this.publish("hidecursor");
        }
        hideCommandEditor() {
            //
        }
        execute(command, ...args) {
            const shortcut = this.shortcutManager.getShortcut(command);
            shortcut && this.shortcutManager.execute(shortcut);
        }
        publish(topic, ...args) {
            let subscribers = this.topics[topic];
            if (!subscribers) {
                console.log(topic);
                return false;
            }
            subscribers.forEach(subscriber => subscriber(...args));
            return true;
        }
        editActiveCommand() {
            let index = this.currentIndex;
            let commandEditor = this.input.children[index];
            let input = document.createElement("input");
            input.value = commandEditor.innerText;
            let originalText = commandEditor.innerText;
            commandEditor.innerText = "";
            commandEditor.appendChild(input);
            input.select();
            input.focus();
            input.onblur = () => {
                commandEditor.innerText = originalText;
                input.remove();
                commandEditor.focus();
            };
            input.onkeydown = event => {
                event.cancelBubble = true;
                switch (event.code) {
                    case "Escape":
                        commandEditor.focus(); // causes a blur
                        commandEditor.innerText = originalText;
                        break;
                    case "NumpadEnter":
                    case "Enter":
                        let newText = input.value;
                        commandEditor.focus(); // causes a blur
                        commandEditor.innerText = newText;
                        this.replaceActiveCommand(newText);
                        event.cancelBubble = true;
                        event.preventDefault();
                        break;
                }
                this.publish("log", event.code);
            };
        }
        insertPath(path) {
            const pathCommands = parsePath_2.parsePath(path);
            const pathSegment = pathCommands.map(stringify_2.stringify);
            const index = this.currentIndex;
            const sourcePath = this.getSourcePath();
            sourcePath.splice(index, 0, ...pathSegment);
            this.show(sourcePath.join("\n"));
        }
        deleteCommand(index) {
            const sourcePath = this.getSourcePath();
            sourcePath.splice(index, 1);
            this.show(sourcePath.join("\n"));
        }
        insertCommand(command) {
            let index = this.currentIndex;
            let path = this.getSourcePath();
            let currentLocation = getLocation_1.getLocation(index, path);
            if (!command.args.length) {
                switch (command.command) {
                    case "A":
                        command.args = [1, 1, 0, 0, 0, currentLocation.x, currentLocation.y];
                        break;
                    case "C":
                        command.args = [
                            currentLocation.x,
                            currentLocation.y,
                            currentLocation.x,
                            currentLocation.y,
                            currentLocation.x,
                            currentLocation.y,
                        ];
                        break;
                    case "H":
                        command.args = [currentLocation.x];
                        break;
                    case "S":
                        command.args = [currentLocation.x, currentLocation.y, currentLocation.x, currentLocation.y];
                        break;
                    case "V":
                        command.args = [currentLocation.y];
                        break;
                    case "L":
                    case "M":
                    case "T":
                        command.args = [currentLocation.x, currentLocation.y];
                        break;
                }
            }
            path.splice(index + 1, 0, stringify_2.stringify(command));
            this.show(path.join("\n"));
        }
        deleteActiveCommand() {
            let index = this.currentIndex;
            let path = this.getSourcePath();
            path.splice(index, 1);
            this.show(path.join("\n"));
        }
        replaceActiveCommand(commandText) {
            let index = this.currentIndex;
            let command = parse_2.parse(commandText);
            let path = this.getSourcePath();
            path[index] = stringify_2.stringify(command);
            this.show(path.join("\n"));
        }
        goto(index) {
            this.currentIndex = index;
            let path = this.getSourcePath();
            if (!path)
                return;
            const scale = getScale_1.getScale(this.workview);
            this.publish("showcursor", drawCursor_1.drawCursor(getLocation_1.getLocation(index, path), 25 / scale));
            focus_1.focus(this.input.children[index]);
        }
        setSourcePath(path) {
            const index = this.currentIndex;
            setPath_1.setPath(this.sourcePath, path);
            this.publish("source-path-changed");
        }
        getSourcePath() {
            return getPathCommands_1.getPathCommands(this.sourcePath);
        }
        show(sourcePath) {
            sourcePath && this.setSourcePath(sourcePath);
            this.showMarkers();
            this.renderEditor();
        }
        renderEditor() {
            let cells = this.getSourcePath().map(v => `<div class="cell">${v}</div>`);
            let input = this.input;
            input.innerHTML = cells.join("\n");
            Array.from(input.querySelectorAll(".cell")).forEach(cell => {
                cell.tabIndex = 0;
                cell.addEventListener("focus", () => {
                    let i = Array.from(input.querySelectorAll(".cell")).indexOf(cell);
                    this.goto(i);
                });
            });
        }
        hideMarkers() {
            this.publish("hidemarkers");
        }
        showMarkers() {
            let d = getComputedStyle(this.sourcePath).getPropertyValue("d");
            let commands = parsePath_2.parsePath(d);
            let overlayPath = this.createOverlayPoint(commands);
            overlayPath.unshift("M 0 0");
            overlayPath.push("Z");
            this.publish("showmarkers", overlayPath.join(" "));
        }
        createOverlayPoint(commands) {
            let path = [];
            let priorLocation = { x: 0, y: 0 };
            commands.forEach(command => {
                switch (command.command) {
                    case "A": {
                        let [rx, ry, a, b, cw, x, y] = command.args;
                        priorLocation = { x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "C": {
                        let [ax, ay, bx, by, x, y] = command.args;
                        path.push({ x: ax, y: ay });
                        path.push({ x: bx, y: by });
                        priorLocation = { x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "H": {
                        let [x] = command.args;
                        priorLocation = { x, y: priorLocation.y };
                        path.push(priorLocation);
                        break;
                    }
                    case "L":
                    case "M":
                    case "T": {
                        let [x, y] = command.args;
                        priorLocation = { x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "S": {
                        let [bx, by, x, y] = command.args;
                        path.push({ x: bx, y: by });
                        priorLocation = { x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "V": {
                        let [y] = command.args;
                        priorLocation = { x: priorLocation.x, y };
                        path.push(priorLocation);
                        break;
                    }
                    case "Z": {
                        break;
                    }
                    default: {
                        throw `unknown command: ${command}`;
                    }
                }
            });
            const scale = getScale_1.getScale(this.workview);
            return path.map(p => drawX_1.drawX(p, { scale: 5 / scale }));
        }
    }
    exports.SvgEditorControl = SvgEditorControl;
});
define("fun/CoreRules", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getToolbar() {
        let toolbar = document.querySelector(".toolbar");
        if (!toolbar)
            throw "no toolbar defined";
        return toolbar;
    }
    function hideToolbar() {
        getToolbar().classList.add("hidden");
    }
    function hideHelp() {
        var _a;
        let help = document.querySelector(".F1");
        (_a = help) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    }
    class CoreRules {
        initialize(editor) {
            editor
                .shortcut("Escape Escape", () => {
                editor.hideCursor();
                editor.hideCommandEditor();
                editor.hideMarkers();
                editor.goto(0);
                hideToolbar();
                hideHelp();
            })
                .options({ stateless: true, because: "get the editor closer to the initial state" });
            // "?"
            editor.shortcut("Slash Toggle Help", () => {
                var _a;
                let help = document.querySelector(".F1");
                (_a = help) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
            });
            editor.shortcut(">Redo", () => {
                editor.redo();
            }).options({ stateless: true, because: "redo the prior action" });
            editor.shortcut("<Undo", () => {
                editor.undo();
            }).options({ stateless: true, because: "undo prior action" });
            editor.shortcut("Slash Toggle Toolbar", () => {
                getToolbar().classList.toggle("hidden");
            });
        }
    }
    exports.CoreRules = CoreRules;
});
define("fun/asDom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function asDom(html) {
        let div = document.createElement("div");
        div.innerHTML = html.trim();
        return div.firstElementChild;
    }
    exports.asDom = asDom;
});
define("fun/Digitizer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getLayers() {
        let layers = document.querySelector(".layers");
        // scaling about a point assume top-left
        layers.style.transformOrigin = "top left";
        return layers;
    }
    function getPixels() {
        if (!isDigitizing)
            return null;
        return document.querySelector(".svgeditor .layers .pixels-to-digitize");
    }
    function isDigitizing() {
        return !!document.querySelector(".svgeditor.digitizer");
    }
    function getPositionOfPixels() {
        const target = getPixels();
        if (!target)
            throw "pixels not found";
        let { top, left } = getComputedStyle(target);
        return { top: parseFloat(top), left: parseFloat(left) };
    }
    function setPositionOfPixels(position) {
        const target = getPixels();
        if (!target)
            throw "pixels not found";
        target.style.left = `${position.left}px`;
        target.style.top = `${position.top}px`;
    }
    function zoomInPixels(scale) {
        const target = getPixels();
        if (!target)
            throw "pixels not found";
        let transform = getComputedStyle(target).transform;
        if (transform === "none")
            transform = "";
        transform = ` scale(${scale}) ${transform}`;
        target.style.transform = transform;
    }
    function createMove(dx, dy) {
        return () => {
            if (!isDigitizing())
                return;
            const { top, left } = getPositionOfPixels();
            setPositionOfPixels({ left: left + dx, top: top + dy });
        };
    }
    function createTranslator(target, dx, dy) {
        return () => {
            let currentTransform = getComputedStyle(target).transform;
            if (currentTransform === "none")
                currentTransform = "";
            target.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
        };
    }
    function createScaler(target, scale) {
        return () => {
            let currentTransform = getComputedStyle(target).transform;
            if (currentTransform === "none")
                currentTransform = "";
            const restoreDx = 100 * (0.5 * scale);
            target.style.transform = `${currentTransform} translate(${restoreDx}%,${restoreDx}%) scale(${scale}) translate(-50%,-50%)`;
        };
    }
    function createScaleAboutCursor(editor, scale) {
        return () => {
            let cursorLocationInViewport = editor.getCursorLocation();
            let viewBox = editor.getViewbox();
            let layers = getLayers();
            let currentTransform = getComputedStyle(layers).transform;
            if (currentTransform === "none")
                currentTransform = "";
            // translate cursor to origin, scale, translate origin to cursor
            // viewbox width = layers width but where is the top-left corner of the layers?
            let layerLocationInPixels = layers.getBoundingClientRect();
            let { width: pixelWidth, height: pixelHeight } = layerLocationInPixels;
            let { height: viewPortHeight, width: viewPortWidth } = viewBox;
            let dx = layerLocationInPixels.x + ((cursorLocationInViewport.x - viewBox.x) * pixelWidth) / viewPortWidth;
            let dy = layerLocationInPixels.y + ((cursorLocationInViewport.y - viewBox.y) * pixelHeight) / viewPortHeight;
            dx = Math.round(dx);
            dy = Math.round(dy);
            layers.style.transform = `${currentTransform} translate(${dx}px,${dy}px) scale(${scale}) translate(${-dx}px,${-dy}px)`;
        };
    }
    class Digitizer {
        initialize(editor) {
            const layers = getLayers();
            const bitmap = getPixels();
            if (bitmap) {
                editor.shortcut("Slash Toggle Bitmap", () => { var _a; return (_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.toggle("digitizer"); });
                editor.shortcut("Slash Bitmap", () => { var _a; return (_a = document.querySelector(".svgeditor")) === null || _a === void 0 ? void 0 : _a.classList.add("digitizer"); });
                let scale = 1.1;
                editor.shortcut("Slash Bitmap Plus", createScaler(bitmap, scale));
                editor.shortcut("Slash Bitmap Minus", createScaler(bitmap, 1.0 / scale));
                scale = 1 / 1.01;
                editor.shortcut("Slash Bitmap Plus 1", createScaler(bitmap, scale));
                editor.shortcut("Slash Bitmap Minus 1", createScaler(bitmap, 1.0 / scale));
                scale = 10;
                editor.shortcut("Slash Bitmap A.ArrowLeft", createTranslator(bitmap, -scale, 0));
                editor.shortcut("Slash Bitmap D.ArrowRight", createTranslator(bitmap, scale, 0));
                editor.shortcut("Slash Bitmap W.ArrowUp", createTranslator(bitmap, 0, -scale));
                editor.shortcut("Slash Bitmap S.ArrowDown", createTranslator(bitmap, 0, scale));
                scale = -1;
                editor.shortcut("Slash Bitmap A.ArrowLeft 1", createTranslator(bitmap, -scale, 0));
                editor.shortcut("Slash Bitmap D.ArrowRight 1", createTranslator(bitmap, scale, 0));
                editor.shortcut("Slash Bitmap W.ArrowUp 1", createTranslator(bitmap, 0, -scale));
                editor.shortcut("Slash Bitmap S.ArrowDown 1", createTranslator(bitmap, 0, scale));
            }
            // iop are keyboard sequences
            const commandInserter = (command) => {
                return () => {
                    const currentIndex = editor.getActiveIndex();
                    const doit = () => {
                        editor.insertCommand({ command, args: [] });
                        editor.goto(currentIndex + 1);
                    };
                    doit();
                    const undo = () => {
                        editor.deleteCommand(currentIndex + 1);
                        editor.goto(currentIndex);
                    };
                    const redo = () => {
                        editor.goto(currentIndex);
                        doit();
                    };
                    return { undo, redo };
                };
            };
            editor.shortcut("Slash Path", () => editor.publish("showgrid"));
            editor.shortcut("Slash Path ECurve", commandInserter("C"));
            editor.shortcut("Slash Path HorizontalLine", commandInserter("H"));
            editor.shortcut("Slash Path Line", commandInserter("L"));
            editor.shortcut("Slash Path Move", commandInserter("M"));
            editor.shortcut("Slash Path RArc", commandInserter("A"));
            editor.shortcut("Slash Path UCurveSmooth", commandInserter("C"));
            editor.shortcut("Slash Path VerticalLine", commandInserter("V"));
            editor.shortcut("Slash Path ZReturn", commandInserter("Z"));
            /**
             * Moves the digitizing area
             * control speeds things up, alt slows things down
             * alt=1, ctrl+alt=10 , ctrl=100
             */
            {
                editor.shortcut("Slash View Viewbox", () => {
                    const svgs = document.querySelectorAll(".layers svg[viewbox]");
                    for (let e of svgs) {
                        const svg = e;
                        let { x, y, width, height } = svg.viewBox.baseVal;
                        const viewbox = prompt("Enter viewbox: ", `${x} ${y} ${width} ${height}`);
                        if (!viewbox)
                            return;
                        [x, y, width, height] = viewbox.split(" ").map(v => parseInt(v));
                        console.log(viewbox, x, y, width, height);
                        if (width && height) {
                            svg.viewBox.baseVal.x = x;
                            svg.viewBox.baseVal.y = y;
                            svg.viewBox.baseVal.width = width;
                            svg.viewBox.baseVal.height = height;
                            localStorage.setItem("viewbox", `${x} ${y} ${width} ${height}`);
                        }
                    }
                });
                let scale = 10;
                editor.shortcut("Slash View S.ArrowDown", createTranslator(layers, 0, scale));
                editor.shortcut("Slash View W.ArrowUp", createTranslator(layers, 0, -scale));
                editor.shortcut("Slash View A.ArrowLeft", createTranslator(layers, -scale, 0));
                editor.shortcut("Slash View D.ArrowRight", createTranslator(layers, scale, 0));
                scale = -1;
                editor.shortcut("Slash View S.ArrowDown 1", createTranslator(layers, 0, scale));
                editor.shortcut("Slash View W.ArrowUp 1", createTranslator(layers, 0, -scale));
                editor.shortcut("Slash View A.ArrowLeft 1", createTranslator(layers, -scale, 0));
                editor.shortcut("Slash View D.ArrowRight 1", createTranslator(layers, scale, 0));
                // zoom about current cursor location
                scale = 1.1;
                editor.shortcut("Slash View Plus", createScaleAboutCursor(editor, scale));
                editor.shortcut("Slash View Minus", createScaleAboutCursor(editor, 1 / scale));
                editor.shortcut("Slash Path Plus", createScaleAboutCursor(editor, scale));
                editor.shortcut("Slash Path Minus", createScaleAboutCursor(editor, 1 / scale));
                scale = 1 / 1.01;
                editor.shortcut("Slash View Plus 1", createScaleAboutCursor(editor, scale));
                editor.shortcut("Slash View Minus 1", createScaleAboutCursor(editor, 1 / scale));
            }
            editor.shortcut("Slash Path Center", () => {
                const cursorLocation = editor.getCursorLocation();
                const viewBox = editor.getViewbox();
                const layers = getLayers();
                const layerLocationInPixels = layers.getBoundingClientRect();
                const x = layerLocationInPixels.x + (layerLocationInPixels.width * (cursorLocation.x - viewBox.x)) / viewBox.width;
                const y = layerLocationInPixels.y + (layerLocationInPixels.width * (cursorLocation.y - viewBox.y)) / viewBox.height;
                const cx = getPosition(layers).x + getPosition(layers).width / 2;
                const cy = getPosition(layers).y + getPosition(layers).height / 2;
                const dx = cx - x;
                const dy = cy - y;
                let currentTransform = getComputedStyle(layers).transform;
                if (currentTransform === "none")
                    currentTransform = "";
                console.log(cursorLocation.x, viewBox.x, x, cx, dx, currentTransform);
                layers.style.transform = `translate(${dx}px,${dy}px) ${currentTransform}`;
            });
        }
    }
    exports.Digitizer = Digitizer;
    function getPosition(node) {
        let { left, top, width, height } = getComputedStyle(node);
        return { x: parseFloat(left), y: parseFloat(top), width: parseFloat(width), height: parseFloat(height) };
    }
});
define("fun/html", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function html(html) {
        const a = document.createElement("div");
        a.innerHTML = html;
        return (a.firstChild === a.lastChild ? a.firstChild : a);
    }
    exports.html = html;
    function createUniqueIdForCssBody(css) {
        if (!css || !css.length)
            throw "no css provided";
        const endIndex = css.indexOf("{");
        if (0 >= endIndex)
            throw "no css selector provided";
        // remove invalid characters
        css = "cssId_" + css.substring(0, endIndex - 1).replace(/[^(A-Z)(a-z)(0-9).:_-]/g, "");
        return css;
    }
    exports.createUniqueIdForCssBody = createUniqueIdForCssBody;
    function injectHtml(markup, container = document.body) {
        var _a;
        const node = html(markup);
        (_a = container) === null || _a === void 0 ? void 0 : _a.appendChild(node);
        return node;
    }
    exports.injectHtml = injectHtml;
    function injectCss(css, id) {
        if (!id) {
            id = createUniqueIdForCssBody(css);
        }
        let style = document.head.querySelector(`style[id="${id}"]`);
        if (style) {
            throw `style already defined for "${id}": \n${style.outerHTML}`;
        }
        style = injectHtml(`<style id=${id} type='text/css'>${css}</style>`, document.head);
        return () => style.remove();
    }
    exports.injectCss = injectCss;
    function addToClassList(node, className) {
        if (!className)
            return;
        if (typeof className !== "string")
            return; // will handle objects later?
        className
            .split(" ")
            .map(v => v.trim())
            .filter(v => !!v)
            .forEach(v => node.classList.add(v));
    }
    exports.addToClassList = addToClassList;
});
define("fun/Toaster", ["require", "exports", "fun/html"], function (require, exports, html_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const css = `
    .toaster {
        min-width: 16em;
        max-height: 64em;
        overflow: hidden;
        background-color: black;
        opacity: 0.8;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding-left: 0.5em;
        padding-bottom: 1em;
        padding-top: 1em;
    }

    .toaster .message {
        display: block;
        color: white;
        padding-bottom: 1em;
        overflow: visible;
    }
`;
    /**
     * Determines position of the toaster control (myToaster)
     */
    class Toaster {
        constructor(options) {
            html_1.injectCss(css);
            const { dismissOnClick } = options || {};
            this.domNode = document.createElement("div");
            this.domNode.className = "toaster";
            if (dismissOnClick) {
                this.domNode.onclick = () => this.clear();
            }
        }
        setContent(message, type, duration) {
            const messageNode = document.createElement("span");
            messageNode.className = "message";
            html_1.addToClassList(messageNode, type || "message");
            messageNode.innerText = message;
            this.domNode.appendChild(messageNode);
            setTimeout(() => this.remove(messageNode), duration || 5000);
            this.setVisibility();
            return { remove: () => this.remove(messageNode) };
        }
        remove(node) {
            if (node && node.parentElement === this.domNode) {
                this.domNode.removeChild(node);
                this.setVisibility();
            }
        }
        clear() {
            this.domNode.innerHTML = "";
            this.setVisibility();
        }
        setVisibility() {
            this.domNode.style.display = 0 === this.domNode.children.length ? "none" : "inherit";
        }
    }
    exports.Toaster = Toaster;
});
define("fun/NotificationEditorRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NotificationEditorRule {
        constructor(toaster) {
            this.toaster = toaster;
        }
        initialize(editor) {
            editor.subscribe("log", message => {
                this.toaster.setContent(message);
            });
        }
    }
    exports.NotificationEditorRule = NotificationEditorRule;
});
define("fun/ImageLoaderRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImageLoaderRule {
        initialize(editor) {
            const img = document.querySelector(".pixels-to-digitize");
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
    exports.ImageLoaderRule = ImageLoaderRule;
});
define("fun/StateManagementRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StateManagementRule {
        initialize(editor) {
            let viewbox = localStorage.getItem("viewbox");
            if (!viewbox)
                return;
            const svgs = document.querySelectorAll(".layers svg[viewbox]");
            for (let e of svgs) {
                const svg = e;
                svg.setAttribute("viewBox", viewbox);
            }
        }
    }
    exports.StateManagementRule = StateManagementRule;
});
define("fun/createSvg", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createSvg() {
        return document.createElementNS("http://www.w3.org/2000/svg", "svg");
    }
    exports.createSvg = createSvg;
});
define("fun/range", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function range(n) {
        return Array(n).fill(0).map((v, i) => i);
    }
    exports.range = range;
});
define("fun/createPath", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createPath(styles) {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        if (styles) {
            Object.keys(styles).forEach(key => {
                path.style.setProperty(key, styles[key]);
            });
        }
        return path;
    }
    exports.createPath = createPath;
});
define("fun/createGrid", ["require", "exports", "fun/range", "fun/createPath", "fun/setPath", "fun/getScale"], function (require, exports, range_1, createPath_1, setPath_2, getScale_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function dot(x, y, size) {
        const r = size / 2;
        return `M ${x - r} ${y} A ${r} ${r} 0 0 0 ${x + r} ${y} A ${r} ${r} 0 0 0 ${x - r} ${y} Z`;
    }
    function createGrid(gridOverlay) {
        const scale = getScale_2.getScale(gridOverlay);
        const { x, y, width, height } = gridOverlay.viewBox.baseVal;
        // forces lines to pass through origin
        // x + offset + n*size = 0, offset = n*size-x, n*size > x, n > x/size
        const size = Math.floor(width / 10);
        const offset = size * Math.ceil(x / size) - x;
        const count = 1 + Math.ceil((width - offset) / size);
        const vLines = range_1.range(count).map(v => `M ${x + offset + size * v} ${x} V ${y + height}`).join("\n");
        const hLines = range_1.range(count).map(v => `M ${x} ${y + offset + size * v} H ${x + width}`).join("\n");
        const path = createPath_1.createPath({
            fill: "rgba(128,128,128,0.5)",
            stroke: "rgba(128,128,128,0.5)",
            "stroke-width": (1 / scale) + ""
        });
        const markers = range_1.range(1 + Math.ceil(Math.log2(width))).map(v => Math.pow(2, v));
        //markers.splice(0, markers.length - 4);
        console.log(markers, width);
        const hdots = [0, ...markers].map(v => dot(v, 0, size / 30)).join("\n");
        const vdots = markers.map(v => dot(v, v, size / 30) + dot(0, v, size / 30)).join("\n");
        setPath_2.setPath(path, `${vLines}\n${hLines}\n${hdots}\n${vdots}`);
        gridOverlay.appendChild(path);
        return path;
    }
    exports.createGrid = createGrid;
});
define("fun/GridManagementRule", ["require", "exports", "fun/createSvg", "fun/createGrid", "fun/createPath", "fun/setPath"], function (require, exports, createSvg_1, createGrid_1, createPath_2, setPath_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridManagementRule {
        constructor() {
            const layers = document.querySelector(".layers");
            const svg = layers.querySelector("svg");
            let { x, y, width, height } = svg.viewBox.baseVal;
            this.gridOverlay = createSvg_1.createSvg();
            this.gridOverlay.classList.add("hidden");
            this.gridOverlay.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
            layers.appendChild(this.gridOverlay);
            // how to get workPath stroke-width to be 0.2 regardless of scale?
            this.workPath = createPath_2.createPath({
                fill: "rgb(0,255,128)",
                stroke: "rgb(0,255,128)",
                "stroke-width": "0.2",
            });
            this.gridOverlay.appendChild(this.workPath);
            this.cursorPath = createPath_2.createPath({
                stroke: "rgb(0, 255, 0)",
                "stroke-width": "0.2",
            });
            this.gridOverlay.appendChild(this.cursorPath);
        }
        getScale(svg) {
            let { width: viewBoxWidth } = svg.viewBox.baseVal;
            let { width } = svg.getBoundingClientRect();
            return width / viewBoxWidth;
        }
        hideGrid() {
            this.gridOverlay.classList.add("hidden");
        }
        showGrid() {
            var _a;
            (_a = this.gridPath) === null || _a === void 0 ? void 0 : _a.remove();
            this.gridPath = createGrid_1.createGrid(this.gridOverlay);
            this.gridOverlay.classList.remove("hidden");
            const scale = this.getScale(this.gridOverlay);
            console.log("scale", scale);
            this.gridPath.style.setProperty("stroke-width", 1 / scale + "");
            this.workPath.style.setProperty("stroke-width", 1.5 / scale + "");
            this.cursorPath.style.setProperty("stroke-width", 2 / scale + "");
        }
        isGridVisible() {
            return !this.gridOverlay.classList.contains("hidden");
        }
        isMarkersVisible() {
            return !!this.workPath.getAttribute("d");
        }
        initialize(editor) {
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
            editor.subscribe("showgrid", () => {
                this.showGrid();
            });
            editor.subscribe("showcursor", (path) => {
                setPath_3.setPath(this.cursorPath, path);
            });
            editor.subscribe("hidemarkers", () => {
                setPath_3.setPath(this.workPath, "");
            });
            editor.subscribe("showmarkers", (path) => {
                setPath_3.setPath(this.workPath, path);
            });
            editor.subscribe("hidecursor", () => setPath_3.setPath(this.cursorPath, ""));
        }
    }
    exports.GridManagementRule = GridManagementRule;
});
define("fun/FileRule", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FileRule {
        initialize(editor) {
            editor.shortcut("Slash File Open", () => {
                // open
                const doit = () => {
                    let pathData = localStorage.getItem("path");
                    if (!pathData)
                        return;
                    editor.show(pathData);
                };
                const priorPath = editor.getSourcePath();
                const undo = () => {
                    editor.show(priorPath.join("\n"));
                };
                doit();
                return { undo, redo: doit };
            });
            editor.shortcut("Slash File New", () => {
                const priorPath = editor.getSourcePath();
                const undo = () => {
                    editor.show(priorPath.join("\n"));
                };
                const doit = () => {
                    editor.show("M 0 0 Z");
                };
                doit();
                return { undo, redo: doit };
            });
            editor.shortcut("Slash File Save", () => localStorage.setItem("path", editor.getSourcePath().join("\n")));
        }
    }
    exports.FileRule = FileRule;
});
define("fun/PathRule", ["require", "exports", "fun/stringify", "fun/keys", "fun/parse", "fun/focus"], function (require, exports, stringify_3, keys_2, parse_3, focus_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PathRule {
        transformActiveCommand(editor, translate, options) {
            let index = editor.getActiveIndex();
            let path = editor.getSourcePath();
            if (!path)
                throw "use targetPath";
            let command = parse_3.parse(path[index]);
            switch (command.command) {
                case "A": {
                    let [rx, ry, a, b, cw, x, y] = command.args;
                    if (options.primary) {
                        x += translate.dx;
                        y += translate.dy;
                    }
                    if (options.secondary) {
                        rx += translate.dx;
                        ry += translate.dy;
                    }
                    path[index] = stringify_3.stringify({ command: command.command, args: [rx, ry, a, b, cw, x, y] });
                    break;
                }
                case "C": {
                    let [ax, ay, bx, by, x, y] = command.args;
                    if (options.primary) {
                        ax += translate.dx;
                        ay += translate.dy;
                        bx += translate.dx;
                        by += translate.dy;
                        x += translate.dx;
                        y += translate.dy;
                    }
                    if (options.secondary) {
                        ax += translate.dx;
                        ay += translate.dy;
                    }
                    if (options.tertiary) {
                        bx += translate.dx;
                        by += translate.dy;
                    }
                    path[index] = stringify_3.stringify({ command: command.command, args: [ax, ay, bx, by, x, y] });
                    break;
                }
                case "H": {
                    let [x] = command.args;
                    x += translate.dx;
                    path[index] = stringify_3.stringify({ command: command.command, args: [x] });
                    break;
                }
                case "V": {
                    let [y] = command.args;
                    y += translate.dy;
                    path[index] = stringify_3.stringify({ command: command.command, args: [y] });
                    break;
                }
                case "S": {
                    let [bx, by, x, y] = command.args;
                    if (options.primary) {
                        bx += translate.dx;
                        by += translate.dy;
                        x += translate.dx;
                        y += translate.dy;
                    }
                    if (options.secondary) {
                        bx += translate.dx;
                        by += translate.dy;
                    }
                    path[index] = stringify_3.stringify({ command: command.command, args: [bx, by, x, y] });
                    break;
                }
                case "L":
                case "M":
                case "T": {
                    let [x, y] = command.args;
                    x += translate.dx;
                    y += translate.dy;
                    path[index] = stringify_3.stringify({ command: command.command, args: [x, y] });
                    break;
                }
            }
            return path;
        }
        initialize(editor) {
            const moveit = (location, options) => {
                const currentIndex = editor.getActiveIndex();
                const doit = () => {
                    editor.hideCursor();
                    editor.show(this.transformActiveCommand(editor, location, options || { primary: true }).join(""));
                    editor.goto(currentIndex);
                };
                const undoCommand = editor.getSourcePath()[currentIndex];
                const undo = () => {
                    const path = editor.getSourcePath();
                    path[currentIndex] = undoCommand;
                    editor.show(path.join("\n"));
                    editor.goto(currentIndex);
                };
                doit();
                const redoCommand = editor.getSourcePath()[currentIndex];
                const redo = () => {
                    const path = editor.getSourcePath();
                    path[currentIndex] = redoCommand;
                    editor.show(path.join("\n"));
                    editor.goto(currentIndex);
                };
                return { undo, redo };
            };
            const input = document.querySelector(".svg-input");
            const keyCommands = {
                "Slash Path 2 A": () => moveit({ dx: -1, dy: 0 }, { secondary: true }),
                "Slash Path 2 D": () => moveit({ dx: 1, dy: 0 }, { secondary: true }),
                "Slash Path 2 S": () => moveit({ dx: 0, dy: 1 }, { secondary: true }),
                "Slash Path 2 W": () => moveit({ dx: 0, dy: -1 }, { secondary: true }),
                "Slash Path 3 A": () => moveit({ dx: -1, dy: 0 }, { tertiary: true }),
                "Slash Path 3 D": () => moveit({ dx: 1, dy: 0 }, { tertiary: true }),
                "Slash Path 3 S": () => moveit({ dx: 0, dy: 1 }, { tertiary: true }),
                "Slash Path 3 W": () => moveit({ dx: 0, dy: -1 }, { tertiary: true }),
                "Slash Path A": () => moveit({ dx: -1, dy: 0 }),
                "Slash Path D": () => moveit({ dx: 1, dy: 0 }),
                "Slash Path S": () => moveit({ dx: 0, dy: 1 }),
                "Slash Path W": () => moveit({ dx: 0, dy: -1 }),
                "Slash Path A 0": () => moveit({ dx: 0.1, dy: 0 }),
                "Slash Path D 0": () => moveit({ dx: -0.1, dy: 0 }),
                "Slash Path S 0": () => moveit({ dx: 0, dy: -0.1 }),
                "Slash Path W 0": () => moveit({ dx: 0, dy: 0.1 }),
                "Slash Path .ArrowDown": () => { var _a; return focus_2.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling); },
                "Slash Path ,ArrowUp": () => { var _a; return focus_2.focus((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling); },
                "Slash Path XDelete": () => editor.deleteActiveCommand(),
                "Slash Path End": () => editor.goto(editor.getSourcePath().length - 1),
                "Slash Path Enter": () => editor.editActiveCommand(),
                "Slash Path Home": () => editor.goto(0),
            };
            keys_2.keys(keyCommands).forEach(phrase => editor.shortcut(phrase, keyCommands[phrase]));
        }
    }
    exports.PathRule = PathRule;
});
define("index", ["require", "exports", "data/marker", "data/icons", "fun/SvgEditorControl", "fun/CoreRules", "fun/asDom", "fun/Digitizer", "fun/keys", "fun/getPath", "fun/Toaster", "fun/NotificationEditorRule", "fun/ImageLoaderRule", "fun/StateManagementRule", "fun/GridManagementRule", "fun/FileRule", "fun/PathRule"], function (require, exports, marker_1, icons_1, SvgEditorControl_1, CoreRules_1, asDom_1, Digitizer_1, keys_3, getPath_2, Toaster_1, NotificationEditorRule_1, ImageLoaderRule_1, StateManagementRule_1, GridManagementRule_1, FileRule_1, PathRule_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    marker_1 = __importDefault(marker_1);
    icons_1 = __importDefault(icons_1);
    function createSvgEditor(workview, input) {
        let editor = new SvgEditorControl_1.SvgEditorControl(workview, input);
        return editor;
    }
    function pasteFromClipboard(clipboard) {
        let svgText = clipboard.value.trim();
        let svg = asDom_1.asDom(`<svg>${svgText}</svg>`);
        return Array.from(svg.querySelectorAll("symbol"));
    }
    function insertIntoEditor(editor, pathData) {
        // not sure why this is necessary...probably the namespace?
        const svgConverterPathNode = document.getElementById("cleanup");
        svgConverterPathNode.setAttribute("d", pathData.getAttribute("d"));
        let d = getPath_2.getPath(svgConverterPathNode);
        editor.insertPath(d);
    }
    function run() {
        const toaster = new Toaster_1.Toaster();
        document.body.appendChild(toaster.domNode);
        toaster.setContent("Hello!");
        let path = document.querySelector("path");
        let svg = path.ownerSVGElement;
        if (!svg)
            throw "path must be in an svg container";
        //path.setAttribute("d", markers.marker5);
        path.setAttribute("d", "M 0 0 Z");
        let input = document.getElementById("svg-input");
        let editor = createSvgEditor(svg, input);
        editor.use(new GridManagementRule_1.GridManagementRule());
        editor.use(new StateManagementRule_1.StateManagementRule());
        editor.use(new CoreRules_1.CoreRules());
        editor.use(new Digitizer_1.Digitizer());
        editor.use(new NotificationEditorRule_1.NotificationEditorRule(toaster));
        editor.use(new ImageLoaderRule_1.ImageLoaderRule());
        editor.use(new FileRule_1.FileRule());
        editor.use(new PathRule_1.PathRule());
        editor.show("");
        let toolbar = asDom_1.asDom(`<div class="toolbar hidden"></div>`);
        document.body.appendChild(toolbar);
        toolbar.appendChild(asDom_1.asDom(`<button class="F1"><svg viewBox="-18 -18 36 36"><use href="#svg-path"></use></svg></button>`));
        keys_3.keys(marker_1.default).forEach(marker => {
            let b = asDom_1.asDom(`<button id="${marker}" class="F1 marker"><svg viewBox="-18 -18 36 36"><path d="${marker_1.default[marker]}"></path></svg></button>`);
            toolbar.appendChild(b);
            b.addEventListener("click", () => {
                insertIntoEditor(editor, b.querySelector("path"));
            });
        });
        keys_3.keys(icons_1.default).forEach(marker => {
            let b = asDom_1.asDom(`<button id="${marker}" class="F1 icon"><svg viewBox="0 0 36 36"><path d="${icons_1.default[marker]}"></path></svg></button>`);
            toolbar.appendChild(b);
            b.addEventListener("click", () => {
                insertIntoEditor(editor, b.querySelector("path"));
            });
        });
        const clipboard = document.querySelector(".clipboard");
        if (clipboard) {
            const doit = () => {
                const symbols = pasteFromClipboard(clipboard);
                if (symbols) {
                    symbols.forEach(symbol => {
                        let { x, y, width, height } = symbol.viewBox.baseVal;
                        let b = asDom_1.asDom(`<button class="F2"><svg viewBox="${x} ${y} ${width} ${height}"><g>${symbol.innerHTML}</g></svg></button>`);
                        toolbar.appendChild(b);
                        b.addEventListener("click", () => {
                            let pathData = symbol.querySelector("path");
                            insertIntoEditor(editor, pathData);
                        });
                    });
                }
            };
            doit();
            clipboard.addEventListener("change", doit);
        }
        const inset = document.querySelector(".inset");
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
        editor.execute("Slash File Open");
        editor.execute("Slash Help");
    }
    exports.run = run;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhL21hcmtlci50cyIsImRhdGEvaWNvbnMudHMiLCJmdW4vQ29tbWFuZC50cyIsImZ1bi9EaWN0aW9uYXJ5LnRzIiwiZnVuL2RyYXdDdXJzb3IudHMiLCJmdW4vZHJhd1gudHMiLCJmdW4vZm9jdXMudHMiLCJmdW4vcGFyc2UudHMiLCJmdW4vZ2V0TG9jYXRpb24udHMiLCJmdW4vZ2V0UGF0aC50cyIsImZ1bi9zdHJpbmdpZnkudHMiLCJmdW4vcGFyc2VQYXRoLnRzIiwiZnVuL2dldFBhdGhDb21tYW5kcy50cyIsImZ1bi9zZXRQYXRoLnRzIiwiZnVuL2tleXMudHMiLCJmdW4vVW5kb1JlZG8udHMiLCJmdW4vS2V5Ym9hcmRTaG9ydGN1dHMudHMiLCJmdW4vU3ZnRWRpdG9yLnRzIiwiZnVuL2dldFNjYWxlLnRzIiwiZnVuL1N2Z0VkaXRvckNvbnRyb2wudHMiLCJmdW4vQ29yZVJ1bGVzLnRzIiwiZnVuL2FzRG9tLnRzIiwiZnVuL0RpZ2l0aXplci50cyIsImZ1bi9odG1sLnRzIiwiZnVuL1RvYXN0ZXIudHMiLCJmdW4vTm90aWZpY2F0aW9uRWRpdG9yUnVsZS50cyIsImZ1bi9JbWFnZUxvYWRlclJ1bGUudHMiLCJmdW4vU3RhdGVNYW5hZ2VtZW50UnVsZS50cyIsImZ1bi9jcmVhdGVTdmcudHMiLCJmdW4vcmFuZ2UudHMiLCJmdW4vY3JlYXRlUGF0aC50cyIsImZ1bi9jcmVhdGVHcmlkLnRzIiwiZnVuL0dyaWRNYW5hZ2VtZW50UnVsZS50cyIsImZ1bi9GaWxlUnVsZS50cyIsImZ1bi9QYXRoUnVsZS50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBQUEsT0FBUztRQUNQLE9BQU8sRUFBRTs7Ozs7O0VBTVQ7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7OztFQVNUO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7OztFQWNUO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7Ozs7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QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMzRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxF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LENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDL0YsQ0FBQztJQUVELFNBQWdCLFVBQVUsQ0FBQyxXQUEwQjtRQUNqRCxNQUFNLEtBQUssR0FBRyxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM1RCxzQ0FBc0M7UUFDdEMscUVBQXFFO1FBQ3JFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckQsTUFBTSxNQUFNLEdBQUcsYUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkcsTUFBTSxNQUFNLEdBQUcsYUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEcsTUFBTSxJ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
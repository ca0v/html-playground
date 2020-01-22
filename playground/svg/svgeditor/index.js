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
        help(terse = true, root = this.currentState) {
            const visitEach = (node, cb) => {
                cb(node);
                keys_1.keys(node.subkeys).forEach(key => visitEach(node.subkeys[key], cb));
            };
            const visitUp = (node, cb) => {
                cb(node);
                node.parent && visitUp(node.parent, cb);
            };
            const allNodes = (node) => {
                const nodes = [];
                visitEach(root, node => {
                    if (node.ops && node.ops.length) {
                        nodes.push(node);
                    }
                });
                return nodes;
            };
            const fullPath = (node) => {
                const nodes = [];
                visitUp(node, node => nodes.push(node));
                return nodes;
            };
            if (terse) {
                return Object.keys(root.subkeys).join("|");
            }
            const markup = allNodes(root)
                .filter(node => 1 === node.ops.length)
                .map(node => {
                const path = fullPath(node).reverse();
                const deleteCount = path.indexOf(root) + 1;
                path.splice(0, deleteCount);
                return `${path.map(node => node.key).join("+")} - ${node.title}`;
            });
            return markup.join("\n");
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
                    !event.repeat && this.log(`${this.help(this.currentState)}`);
                    return;
                }
                event.preventDefault();
                if (!nextState.ops.length) {
                    this.currentState = nextState;
                    !event.repeat && this.log(`${this.help(this.currentState)}`);
                    return;
                }
                if (!event.repeat) {
                    this.log(`${nextState.title}`);
                    keys_1.keys(nextState.subkeys).length && this.log(`${this.help(nextState)}`);
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
define("fun/SvgEditorControl", ["require", "exports", "fun/drawCursor", "fun/drawX", "fun/focus", "fun/getLocation", "fun/getPathCommands", "fun/parse", "fun/parsePath", "fun/setPath", "fun/stringify", "fun/getScale"], function (require, exports, drawCursor_1, drawX_1, focus_1, getLocation_1, getPathCommands_1, parse_2, parsePath_2, setPath_1, stringify_2, getScale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SvgEditorControl {
        constructor(workview, input, managers) {
            this.workview = workview;
            this.input = input;
            this.topics = {};
            this.currentIndex = -1;
            this.shortcutManager = managers.shortcutManager;
            this.sourcePath = this.workview.querySelector("path");
            if (!this.sourcePath)
                throw "workview must have a path";
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
        constructor(shortcutManager) {
            this.shortcutManager = shortcutManager;
        }
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
            editor.shortcut("?", () => {
                const help = document.querySelector(".F1");
                if (!help)
                    return;
                help.classList.toggle("hidden");
                if (!help.classList.contains("hidden")) {
                    const more = this.shortcutManager.help(false).split("\n").map(row => {
                        const [command, ...description] = row.split(" ");
                        return `<div>${command}</div><div>${description.join(" ")}</div>`;
                    });
                    help.innerHTML = `${more.join("")}`;
                }
            }).options({ because: "show help", stateless: true });
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
define("index", ["require", "exports", "data/marker", "data/icons", "fun/SvgEditorControl", "fun/CoreRules", "fun/asDom", "fun/Digitizer", "fun/keys", "fun/getPath", "fun/Toaster", "fun/NotificationEditorRule", "fun/ImageLoaderRule", "fun/StateManagementRule", "fun/GridManagementRule", "fun/FileRule", "fun/PathRule", "fun/KeyboardShortcuts"], function (require, exports, marker_1, icons_1, SvgEditorControl_1, CoreRules_1, asDom_1, Digitizer_1, keys_3, getPath_2, Toaster_1, NotificationEditorRule_1, ImageLoaderRule_1, StateManagementRule_1, GridManagementRule_1, FileRule_1, PathRule_1, KeyboardShortcuts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    marker_1 = __importDefault(marker_1);
    icons_1 = __importDefault(icons_1);
    const shortcutManager = new KeyboardShortcuts_1.ShortcutManager();
    function createSvgEditor(workview, input) {
        let editor = new SvgEditorControl_1.SvgEditorControl(workview, input, {
            shortcutManager
        });
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
        editor.use(new CoreRules_1.CoreRules(shortcutManager));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhL21hcmtlci50cyIsImRhdGEvaWNvbnMudHMiLCJmdW4vQ29tbWFuZC50cyIsImZ1bi9EaWN0aW9uYXJ5LnRzIiwiZnVuL2RyYXdDdXJzb3IudHMiLCJmdW4vZHJhd1gudHMiLCJmdW4vZm9jdXMudHMiLCJmdW4vcGFyc2UudHMiLCJmdW4vZ2V0TG9jYXRpb24udHMiLCJmdW4vZ2V0UGF0aC50cyIsImZ1bi9zdHJpbmdpZnkudHMiLCJmdW4vcGFyc2VQYXRoLnRzIiwiZnVuL2dldFBhdGhDb21tYW5kcy50cyIsImZ1bi9zZXRQYXRoLnRzIiwiZnVuL2tleXMudHMiLCJmdW4vVW5kb1JlZG8udHMiLCJmdW4vS2V5Ym9hcmRTaG9ydGN1dHMudHMiLCJmdW4vU3ZnRWRpdG9yLnRzIiwiZnVuL2dldFNjYWxlLnRzIiwiZnVuL1N2Z0VkaXRvckNvbnRyb2wudHMiLCJmdW4vQ29yZVJ1bGVzLnRzIiwiZnVuL2FzRG9tLnRzIiwiZnVuL0RpZ2l0aXplci50cyIsImZ1bi9odG1sLnRzIiwiZnVuL1RvYXN0ZXIudHMiLCJmdW4vTm90aWZpY2F0aW9uRWRpdG9yUnVsZS50cyIsImZ1bi9JbWFnZUxvYWRlclJ1bGUudHMiLCJmdW4vU3RhdGVNYW5hZ2VtZW50UnVsZS50cyIsImZ1bi9jcmVhdGVTdmcudHMiLCJmdW4vcmFuZ2UudHMiLCJmdW4vY3JlYXRlUGF0aC50cyIsImZ1bi9jcmVhdGVHcmlkLnRzIiwiZnVuL0dyaWRNYW5hZ2VtZW50UnVsZS50cyIsImZ1bi9GaWxlUnVsZS50cyIsImZ1bi9QYXRoUnVsZS50cyIsImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBQUEsT0FBUztRQUNQLE9BQU8sRUFBRTs7Ozs7O0VBTVQ7UUFDQSxPQUFPLEVBQUU7Ozs7Ozs7OztFQVNUO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7OztFQWNUO1FBQ0EsT0FBTyxFQUFFOzs7Ozs7Ozs7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QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMzRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVELEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMzRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNSLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO29CQUNuRCxDQUFDO2dCQUNILE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDakU7U0FDRjtJQUNILENBQUM7SUFwQkQsa0NBb0JDOzs7OztJQ3JCRCxTQUFnQixPQUFPLENBQUMsSUFBb0I7UUFDeEMsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLFVBQVUsR0FBRyxDQUFDO1lBQ2QsTUFBTSxnQkFBZ0IsQ0FBQztRQUMzQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksU0FBUyxJQUFJLFVBQVU7WUFDdkIsTUFBTSxvQkFBb0IsQ0FBQztRQUMvQixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBVEQsMEJBU0M7Ozs7O0lDUEQsU0FBUyxNQUFNLENBQUMsQ0FBUztRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUQsU0FBZ0IsU0FBUyxDQUFDLE9BQWdCO1FBQ3RDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDOUUsQ0FBQztJQUZELDhCQUVDOzs7OztJQ1JELFNBQWdCLFNBQVMsQ0FBQyxJQUFZO1FBQ2xDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsSUFBSSxRQUFRLEdBQUcsRUFHYixDQUFDO1FBQ0gsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLEVBQUU7Z0JBQ0gsTUFBTSxrQkFBa0IsQ0FBQztZQUM3QixJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxJQUFJLEdBQUcsV0FBVztxQkFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQztxQkFDUixLQUFLLENBQUMsR0FBRyxDQUFDO3FCQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDckIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3JDLFdBQVcsR0FBRyxFQUFFLENBQUM7YUFDcEI7aUJBQ0k7Z0JBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN4QjtTQUNKO1FBQ0QsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQTNCRCw4QkEyQkM7SUFFRCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsb2ZBQW9mLENBQUMsQ0FBQztJQUUzZ0IsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtRQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLGVBQWU7S0FDbEI7Ozs7O0lDL0JELFNBQWdCLGVBQWUsQ0FBQyxJQUFvQjtRQUNoRCxPQUFPLHFCQUFTLENBQUMsaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxxQkFBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUZELDBDQUVDOzs7OztJQ0xELFNBQWdCLE9BQU8sQ0FBQyxXQUEyQixFQUFFLENBQVM7UUFDMUQsV0FBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUZELDBCQUVDOzs7OztJQ0ZELFNBQWdCLElBQUksQ0FBSSxDQUFJO1FBQzFCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQTBCLENBQUM7SUFDakQsQ0FBQztJQUZELG9CQUVDOzs7OztJQ0ZELE1BQWEsUUFBUTtRQUFyQjtZQUNZLFVBQUssR0FHUixFQUFFLENBQUM7WUFDQSxVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUF5QnZCLENBQUM7UUF2QlUsR0FBRyxDQUFDLEVBQWdEO1lBQ3ZELE1BQU0sTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU87WUFDcEIsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQzlDLENBQUM7UUFFTSxPQUFPO1lBQ1YsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUVNLE9BQU87WUFDVixPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFFTSxJQUFJO1lBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRU0sSUFBSTtZQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEMsQ0FBQztLQUNKO0lBOUJELDRCQThCQzs7Ozs7SUMxQkQsaUJBQWlCO0lBQ2pCLE1BQU0sWUFBWSxHQUFHLDBIQUEwSCxDQUFDLEtBQUssQ0FDbkosR0FBRyxDQUNKLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFhN0QsTUFBYSxlQUFlO1FBQTVCO1lBQ1UsVUFBSyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQ2YsY0FBUyxHQUFxQixFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN0RixpQkFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFOUIsZ0JBQVcsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLGFBQVEsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQ25DLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFN0UsY0FBUyxHQUFHLENBQUMsSUFBc0IsRUFBRSxTQUFtQixFQUFvQixFQUFFO2dCQUNwRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBQ25DLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXO29CQUFFLE1BQU0scUJBQXFCLENBQUM7Z0JBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO2dCQUNyRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUM7UUFnSkosQ0FBQztRQTlJUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVk7WUFDaEQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFzQixFQUFFLEVBQW9DLEVBQUUsRUFBRTtnQkFDakYsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNULFdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RSxDQUFDLENBQUE7WUFFRCxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQXNCLEVBQUUsRUFBb0MsRUFBRSxFQUFFO2dCQUMvRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUE7WUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQXNCLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxLQUFLLEdBQTRCLEVBQUUsQ0FBQztnQkFDMUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO3dCQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNsQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQTtZQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBc0IsRUFBRSxFQUFFO2dCQUMxQyxNQUFNLEtBQUssR0FBNEIsRUFBRSxDQUFDO2dCQUMxQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQTtZQUVELElBQUksS0FBSyxFQUFFO2dCQUNULE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVDO1lBRUQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztpQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO2lCQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN0QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUM7WUFFTCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0IsQ0FBQztRQUdNLGFBQWEsQ0FBQyxJQUFpQixFQUFFLFNBQTZDO1lBQ25GLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUN6QixJQUFJLGlCQUFtQyxDQUFDO1lBRXhDLCtCQUErQjtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFOztnQkFDdkMsSUFBSSxLQUFLLENBQUMsTUFBTTtvQkFBRSxPQUFPLENBQUMsMkJBQTJCO2dCQUNyRCwrREFBK0Q7Z0JBRS9ELE1BQU0sR0FBRyxHQUFRO29CQUNmLEdBQUcsRUFBRSxPQUFPO29CQUNaLEdBQUcsRUFBRSxPQUFPO29CQUNaLEdBQUcsRUFBRSxNQUFNO29CQUNYLEdBQUcsRUFBRSxPQUFPO2lCQUNiLENBQUM7Z0JBRUYsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUV4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2QsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO29CQUNyQyxPQUFPLFNBQVMsRUFBRTt3QkFDaEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ2hELElBQUksU0FBUyxFQUFFOzRCQUNiLFNBQVMsR0FBRyxTQUFTLENBQUM7NEJBQ3RCLE1BQU07eUJBQ1A7d0JBQ0QsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7cUJBQzlCO2lCQUNGO2dCQUVELElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2QsZ0JBQWdCO29CQUNoQixDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0QsT0FBTztpQkFDUjtnQkFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7b0JBQzlCLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM3RCxPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQy9CLFdBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtpQkFDdEU7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxRQUFDLFNBQVMsQ0FBQyxPQUFPLDBDQUFFLFNBQVMsQ0FBQSxFQUFFO29CQUNqQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7aUJBQy9CO2dCQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsaUJBQWlCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFTSxPQUFPLENBQUMsU0FBMkI7WUFDeEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFTyxRQUFRLENBQUMsSUFBc0IsRUFBRSxRQUFnQjtZQUN2RCxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFTSxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsUUFBc0Q7WUFDM0YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUFFLE1BQU0scUNBQXFDLENBQUM7WUFDckUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ00sV0FBVyxDQUFDLEtBQWE7WUFDOUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxtQ0FBbUM7UUFDM0IsR0FBRyxDQUFDLE9BQWU7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBRU0sSUFBSTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ2pDLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVNLElBQUk7WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLENBQUM7S0FDRjtJQS9KRCwwQ0ErSkM7Ozs7Ozs7OztJRXBMRCxTQUFnQixRQUFRLENBQUMsR0FBa0I7UUFDekMsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNsRCxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDNUMsT0FBTyxLQUFLLEdBQUcsWUFBWSxDQUFDO0lBQzlCLENBQUM7SUFKRCw0QkFJQzs7Ozs7SUNZRCxNQUFhLGdCQUFnQjtRQXlFM0IsWUFBbUIsUUFBdUIsRUFBUyxLQUFrQixFQUFFLFFBRXRFO1lBRmtCLGFBQVEsR0FBUixRQUFRLENBQWU7WUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFhO1lBeEU3RCxXQUFNLEdBQWdELEVBQUUsQ0FBQztZQXFFekQsaUJBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztZQU14QixJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQW1CLENBQUM7WUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUFFLE1BQU0sMkJBQTJCLENBQUM7WUFFeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7Z0JBQ3ZGLEdBQUcsRUFBRSxDQUFDLE9BQWUsRUFBRSxFQUFFO29CQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDL0IsQ0FBQzthQUNGLENBQUMsQ0FBQztRQUVMLENBQUM7UUFuRkQsSUFBSTtZQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVELElBQUk7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLENBQUM7UUFFRCxHQUFHLENBQUMsSUFBbUI7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxpQkFBaUI7WUFDZixPQUFPLHlCQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsVUFBVTtZQUNSLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDNUQsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFRCxjQUFjO1lBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7UUFFRCxRQUFRLENBQUMsS0FBYSxFQUFFLFFBQXVEO1lBTzdFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLE9BQU87Z0JBQ0wsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSxDQUFDLE9BQWlELEVBQUUsRUFBRTtvQkFDN0QsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO29CQUM3QixJQUFJLENBQUMsT0FBTyxHQUFRLE9BQU8sQ0FBQztnQkFDOUIsQ0FBQzthQUNGLENBQUM7UUFDSixDQUFDO1FBRUQsU0FBUyxDQUFDLEtBQWEsRUFBRSxRQUFvQjtZQUMzQyxJQUFJLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNsRSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLE9BQU87Z0JBQ0wsV0FBVyxFQUFFLEdBQUcsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFBRSxPQUFPO29CQUNsQixXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztnQkFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtvQkFDekIseUJBQXlCO2dCQUMzQixDQUFDO2FBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRCxVQUFVO1lBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsaUJBQWlCO1lBQ2YsRUFBRTtRQUNKLENBQUM7UUFxQk0sT0FBTyxDQUFDLE9BQWUsRUFBRSxHQUFHLElBQVc7WUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0QsUUFBUSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFTSxPQUFPLENBQUMsS0FBYSxFQUFFLEdBQUcsSUFBVztZQUMxQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFTSxpQkFBaUI7WUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM5QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQWdCLENBQUM7WUFDOUQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUM7WUFDdEMsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxhQUFhLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUM3QixhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNmLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVkLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNsQixhQUFhLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztnQkFDdkMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNmLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDMUIsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUNsQixLQUFLLFFBQVE7d0JBQ1gsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsZ0JBQWdCO3dCQUN2QyxhQUFhLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQzt3QkFDdkMsTUFBTTtvQkFDUixLQUFLLGFBQWEsQ0FBQztvQkFDbkIsS0FBSyxPQUFPO3dCQUNWLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQzFCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQjt3QkFDdkMsYUFBYSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbkMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7d0JBQzFCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdkIsTUFBTTtpQkFDVDtnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVNLFVBQVUsQ0FBQyxJQUFZO1lBQzVCLE1BQU0sWUFBWSxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxxQkFBUyxDQUFDLENBQUM7WUFDaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDeEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVNLGFBQWEsQ0FBQyxLQUFhO1lBQ2hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN4QyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRU0sYUFBYSxDQUFDLE9BQWdCO1lBQ25DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLElBQUksZUFBZSxHQUFHLHlCQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDeEIsUUFBUSxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUN2QixLQUFLLEdBQUc7d0JBQ04sT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JFLE1BQU07b0JBQ1IsS0FBSyxHQUFHO3dCQUNOLE9BQU8sQ0FBQyxJQUFJLEdBQUc7NEJBQ2IsZUFBZSxDQUFDLENBQUM7NEJBQ2pCLGVBQWUsQ0FBQyxDQUFDOzRCQUNqQixlQUFlLENBQUMsQ0FBQzs0QkFDakIsZUFBZSxDQUFDLENBQUM7NEJBQ2pCLGVBQWUsQ0FBQyxDQUFDOzRCQUNqQixlQUFlLENBQUMsQ0FBQzt5QkFDbEIsQ0FBQzt3QkFDRixNQUFNO29CQUNSLEtBQUssR0FBRzt3QkFDTixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNO29CQUNSLEtBQUssR0FBRzt3QkFDTixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RixNQUFNO29CQUNSLEtBQUssR0FBRzt3QkFDTixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNO29CQUNSLEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssR0FBRzt3QkFDTixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RELE1BQU07aUJBQ1Q7YUFDRjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUscUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFTSxtQkFBbUI7WUFDeEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM5QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVPLG9CQUFvQixDQUFDLFdBQW1CO1lBQzlDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDOUIsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRU0sSUFBSSxDQUFDLEtBQWE7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDbEIsTUFBTSxLQUFLLEdBQUcsbUJBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsdUJBQVUsQ0FBQyx5QkFBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3RSxhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBRU8sYUFBYSxDQUFDLElBQVk7WUFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNoQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFTSxhQUFhO1lBQ2xCLE9BQU8saUNBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFtQjtZQUN0QixVQUFVLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFFTyxZQUFZO1lBQ2xCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFTSxXQUFXO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVNLFdBQVc7WUFDaEIsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hFLElBQUksUUFBUSxHQUFHLHFCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVPLGtCQUFrQixDQUFDLFFBQW1CO1lBQzVDLElBQUksSUFBSSxHQUFvQyxFQUFFLENBQUM7WUFDL0MsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNuQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN6QixRQUFRLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ1IsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQzVDLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDekIsTUFBTTtxQkFDUDtvQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUNSLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDNUIsYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixNQUFNO3FCQUNQO29CQUNELEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ1IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3ZCLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixNQUFNO3FCQUNQO29CQUNELEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ1IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUMxQixhQUFhLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3pCLE1BQU07cUJBQ1A7b0JBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDUixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzVCLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDekIsTUFBTTtxQkFDUDtvQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUNSLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUN2QixhQUFhLEdBQUcsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDekIsTUFBTTtxQkFDUDtvQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUNSLE1BQU07cUJBQ1A7b0JBQ0QsT0FBTyxDQUFDLENBQUM7d0JBQ1AsTUFBTSxvQkFBb0IsT0FBTyxFQUFFLENBQUM7cUJBQ3JDO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLEtBQUssR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUNGO0lBOVRELDRDQThUQzs7Ozs7SUMzVUQsU0FBUyxVQUFVO1FBQ2pCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFnQixDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxvQkFBb0IsQ0FBQztRQUN6QyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsU0FBUyxXQUFXO1FBQ2xCLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFNBQVMsUUFBUTs7UUFDZixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLE1BQUEsSUFBSSwwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtJQUNoQyxDQUFDO0lBRUQsTUFBYSxTQUFTO1FBRXBCLFlBQW9CLGVBQWdDO1lBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNwRCxDQUFDO1FBRUQsVUFBVSxDQUFDLE1BQWlCO1lBRTFCLE1BQU07aUJBQ0gsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7Z0JBQzlCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixXQUFXLEVBQUUsQ0FBQztnQkFDZCxRQUFRLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQztpQkFDRCxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxDQUFDLENBQUM7WUFFdkYsTUFBTTtZQUNOLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDeEIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQWdCLENBQUM7Z0JBQzFELElBQUksQ0FBQyxJQUFJO29CQUFFLE9BQU87Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2xFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqRCxPQUFPLFFBQVEsT0FBTyxjQUFjLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztvQkFDcEUsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDckM7WUFDSCxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRXRELE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDNUIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQTtZQUVqRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQzVCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7WUFFOUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7Z0JBQzNDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFTCxDQUFDO0tBQ0Y7SUE3Q0QsOEJBNkNDOzs7OztJQy9ERCxTQUFnQixLQUFLLENBQUMsSUFBWTtRQUM5QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDLGlCQUFnQyxDQUFDO0lBQ2hELENBQUM7SUFKRCxzQkFJQzs7Ozs7SUNERCxTQUFTLFNBQVM7UUFDaEIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQWdCLENBQUM7UUFDOUQsd0NBQXdDO1FBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztRQUMxQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsU0FBUyxTQUFTO1FBQ2hCLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDL0IsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELFNBQVMsWUFBWTtRQUNuQixPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELFNBQVMsbUJBQW1CO1FBQzFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxrQkFBa0IsQ0FBQztRQUN0QyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsU0FBUyxtQkFBbUIsQ0FBQyxRQUF1QztRQUNsRSxNQUFNLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sa0JBQWtCLENBQUM7UUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDekMsQ0FBQztJQUVELFNBQVMsWUFBWSxDQUFDLEtBQWE7UUFDakMsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLGtCQUFrQixDQUFDO1FBQ3RDLElBQUksU0FBUyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNuRCxJQUFJLFNBQVMsS0FBSyxNQUFNO1lBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxTQUFTLEdBQUcsVUFBVSxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLFVBQVUsQ0FBQyxFQUFVLEVBQUUsRUFBVTtRQUN4QyxPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQUUsT0FBTztZQUM1QixNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLG1CQUFtQixFQUFFLENBQUM7WUFDNUMsbUJBQW1CLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsTUFBbUIsRUFBRSxFQUFVLEVBQUUsRUFBVTtRQUNuRSxPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFELElBQUksZ0JBQWdCLEtBQUssTUFBTTtnQkFBRSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsYUFBYSxFQUFFLE1BQU0sRUFBRSxPQUFPLGdCQUFnQixFQUFFLENBQUM7UUFDNUUsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMsWUFBWSxDQUFDLE1BQW1CLEVBQUUsS0FBYTtRQUN0RCxPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFELElBQUksZ0JBQWdCLEtBQUssTUFBTTtnQkFBRSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDdkQsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsZ0JBQWdCLGNBQWMsU0FBUyxLQUFLLFNBQVMsWUFBWSxLQUFLLHdCQUF3QixDQUFDO1FBQzdILENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLHNCQUFzQixDQUFDLE1BQWlCLEVBQUUsS0FBYTtRQUM5RCxPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksd0JBQXdCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDMUQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xDLElBQUksTUFBTSxHQUFHLFNBQVMsRUFBRSxDQUFDO1lBQ3pCLElBQUksZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFELElBQUksZ0JBQWdCLEtBQUssTUFBTTtnQkFBRSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDdkQsZ0VBQWdFO1lBQ2hFLCtFQUErRTtZQUMvRSxJQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzNELElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQztZQUN2RSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBRS9ELElBQUksRUFBRSxHQUFHLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDM0csSUFBSSxFQUFFLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLGNBQWMsQ0FBQztZQUU3RyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQixFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVwQixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLGdCQUFnQixjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsS0FBSyxlQUFlLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUM7UUFDekgsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQWEsU0FBUztRQUNwQixVQUFVLENBQUMsTUFBaUI7WUFDMUIsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFDM0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFFM0IsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUUsd0JBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUMsQ0FBQyxDQUFDO2dCQUNsSCxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsd0JBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUMsQ0FBQyxDQUFDO2dCQUN4RyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXpFLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUUzRSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLE1BQU0sQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFaEYsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLE1BQU0sQ0FBQyxRQUFRLENBQUMsNkJBQTZCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixNQUFNLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsUUFBUSxDQUFDLDRCQUE0QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUVuRjtZQUVELDZCQUE2QjtZQUM3QixNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFO2dCQUMxQyxPQUFPLEdBQUcsRUFBRTtvQkFDVixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQzdDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTt3QkFDaEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQTtvQkFDRCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7d0JBQ2hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUM1QixDQUFDLENBQUE7b0JBQ0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO3dCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUMxQixJQUFJLEVBQUUsQ0FBQztvQkFDVCxDQUFDLENBQUE7b0JBQ0QsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxDQUFBO1lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUU1RDs7OztlQUlHO1lBQ0g7Z0JBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7b0JBQ3pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUMvRCxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTt3QkFDbEIsTUFBTSxHQUFHLEdBQUcsQ0FBa0IsQ0FBQzt3QkFDL0IsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUNsRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxJQUFJLENBQUMsT0FBTzs0QkFBRSxPQUFPO3dCQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7NEJBQ25CLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7NEJBQ2xDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7NEJBQ3BDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQzt5QkFDakU7cUJBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM5RSxNQUFNLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLENBQUMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakYscUNBQXFDO2dCQUNyQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ2xGO1lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNsRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BDLE1BQU0sTUFBTSxHQUFHLFNBQVMsRUFBRSxDQUFDO2dCQUMzQixNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUM3RCxNQUFNLENBQUMsR0FDTCxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQzNHLE1BQU0sQ0FBQyxHQUNMLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDNUcsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDakUsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzFELElBQUksZ0JBQWdCLEtBQUssTUFBTTtvQkFBRSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3RFLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsRUFBRSxNQUFNLEVBQUUsT0FBTyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBL0hELDhCQStIQztJQUVELFNBQVMsV0FBVyxDQUFDLElBQWlCO1FBQ3BDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQzNHLENBQUM7Ozs7O0lDOU5ELFNBQWdCLElBQUksQ0FBQyxJQUFZO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDbkIsT0FBb0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFKRCxvQkFJQztJQUVELFNBQWdCLHdCQUF3QixDQUFDLEdBQVc7UUFDaEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNO1lBQUUsTUFBTSxpQkFBaUIsQ0FBQztRQUNqRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLFFBQVE7WUFBRSxNQUFNLDBCQUEwQixDQUFDO1FBQ3BELDRCQUE0QjtRQUM1QixHQUFHLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkYsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBUEQsNERBT0M7SUFFRCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSTs7UUFDaEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLE1BQUEsU0FBUywwQ0FBRSxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFKRCxnQ0FJQztJQUVELFNBQWdCLFNBQVMsQ0FBQyxHQUFXLEVBQUUsRUFBVztRQUM5QyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ0wsRUFBRSxHQUFHLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBcUIsQ0FBQztRQUNqRixJQUFJLEtBQUssRUFBRTtZQUNQLE1BQU0sOEJBQThCLEVBQUUsUUFBUSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbkU7UUFDRCxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsR0FBRyxVQUFVLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBcUIsQ0FBQztRQUN4RyxPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBVkQsOEJBVUM7SUFFRCxTQUFnQixjQUFjLENBQUMsSUFBYSxFQUFFLFNBQWlCO1FBQzNELElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTztRQUN2QixJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVE7WUFBRSxPQUFPLENBQUMsNkJBQTZCO1FBQ3hFLFNBQVM7YUFDSixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBUkQsd0NBUUM7Ozs7O0lDdkNELE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9CWCxDQUFDO0lBRUY7O09BRUc7SUFDSCxNQUFhLE9BQU87UUFFaEIsWUFBWSxPQUFxQztZQUM3QyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUVuQyxJQUFJLGNBQWMsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzdDO1FBQ0wsQ0FBQztRQUVELFVBQVUsQ0FBQyxPQUFlLEVBQUUsSUFBYSxFQUFFLFFBQWlCO1lBQ3hELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsV0FBVyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDbEMscUJBQWMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLFdBQVcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUE7UUFDckQsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFpQjtZQUNwQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBRUQsS0FBSztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVPLGFBQWE7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3pGLENBQUM7S0FDSjtJQXZDRCwwQkF1Q0M7Ozs7O0lDaEVELE1BQWEsc0JBQXNCO1FBTWpDLFlBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDbkMsQ0FBQztRQU5ELFVBQVUsQ0FBQyxNQUFpQjtZQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBR0Y7SUFSRCx3REFRQzs7Ozs7SUNSRCxNQUFhLGVBQWU7UUFFeEIsVUFBVSxDQUFDLE1BQWlCO1lBQ3hCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQXFCLENBQUM7WUFDOUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ0osT0FBTztZQUVYLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsd0dBQXdHLENBQUMsQ0FBQztnQkFDakosSUFBSSxDQUFDLEdBQUc7b0JBQ0osT0FBTztnQkFDWCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUN6QixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDZCxPQUFPO29CQUNILElBQUksRUFBRSxHQUFHLEVBQUU7d0JBQ1AsR0FBRyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7b0JBQ3ZCLENBQUM7aUJBQ0osQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUNKO0lBcEJELDBDQW9CQzs7Ozs7SUNwQkQsTUFBYSxtQkFBbUI7UUFDOUIsVUFBVSxDQUFDLE1BQWlCO1lBQzFCLElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE9BQU87Z0JBQ1YsT0FBTztZQUNULE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQy9ELEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUNsQixNQUFNLEdBQUcsR0FBRyxDQUFrQixDQUFDO2dCQUMvQixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7S0FDRjtJQVhELGtEQVdDOzs7OztJQ2JELFNBQWdCLFNBQVM7UUFDdkIsT0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFGRCw4QkFFQzs7Ozs7SUNGRCxTQUFnQixLQUFLLENBQUMsQ0FBUztRQUMzQixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUZELHNCQUVDOzs7OztJQ0ZELFNBQWdCLFVBQVUsQ0FBQyxNQUl6QjtRQUNFLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUUsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFRLE1BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBWkQsZ0NBWUM7Ozs7O0lDUEQsU0FBUyxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFZO1FBQzNDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7UUFDbkIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQy9GLENBQUM7SUFFRCxTQUFnQixVQUFVLENBQUMsV0FBMEI7UUFDakQsTUFBTSxLQUFLLEdBQUcsbUJBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDNUQsc0NBQXNDO1FBQ3RDLHFFQUFxRTtRQUNyRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3JELE1BQU0sTUFBTSxHQUFHLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25HLE1BQU0sTUFBTSxHQUFHLGFBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xHLE1BQU0sSUFBSSxHQUFHLHVCQUFVLENBQUM7WUFDcEIsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixNQUFNLEVBQUUsdUJBQXVCO1lBQy9CLGNBQWMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFO1NBQ25DLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLGFBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLHdDQUF3QztRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU1QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RixpQkFBTyxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sS0FBSyxNQUFNLEtBQUssS0FBSyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDMUQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBMUJELGdDQTBCQzs7Ozs7SUMvQkQsTUFBYSxrQkFBa0I7UUFtQzNCO1lBQ0ksTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQWdCLENBQUM7WUFDaEUsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQWtCLENBQUM7WUFDekQsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVMsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXJDLGtFQUFrRTtZQUNsRSxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFVLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE1BQU0sRUFBRSxnQkFBZ0I7Z0JBQ3hCLGNBQWMsRUFBRSxLQUFLO2FBQ3hCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsVUFBVSxHQUFHLHVCQUFVLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxnQkFBZ0I7Z0JBQ3hCLGNBQWMsRUFBRSxLQUFLO2FBQ3hCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBbkRPLFFBQVEsQ0FBQyxHQUFrQjtZQUMvQixJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2xELElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM1QyxPQUFPLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDaEMsQ0FBQztRQUVELFFBQVE7WUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELFFBQVE7O1lBQ0osTUFBQSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxNQUFNLEdBQUc7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVELGFBQWE7WUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFRCxnQkFBZ0I7WUFDWixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBMEJELFVBQVUsQ0FBQyxNQUFpQjtZQUN4QixNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtnQkFDM0MsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDbkI7cUJBQ0k7b0JBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7Z0JBQ3pDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7b0JBQ3pCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDeEI7cUJBQ0k7b0JBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNoQixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3hCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBWSxFQUFFLEVBQUU7Z0JBQzVDLGlCQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtnQkFDakMsaUJBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDN0MsaUJBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsaUJBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkUsQ0FBQztLQUNKO0lBakdELGdEQWlHQzs7Ozs7SUNyR0QsTUFBYSxRQUFRO1FBQ2pCLFVBQVUsQ0FBQyxNQUFpQjtZQUN4QixNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtnQkFDcEMsT0FBTztnQkFDUCxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLFFBQVE7d0JBQ1QsT0FBTztvQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxQixDQUFDLENBQUM7Z0JBQ0YsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN6QyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQztnQkFDRixJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO2dCQUNuQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3pDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtvQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDO2dCQUNGLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtvQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlHLENBQUM7S0FDSjtJQTlCRCw0QkE4QkM7Ozs7O0lDeEJELE1BQWEsUUFBUTtRQUNULHNCQUFzQixDQUMxQixNQUFpQixFQUNqQixTQUFxQyxFQUNyQyxPQUF1RTtZQUV2RSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDcEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJO2dCQUFFLE1BQU0sZ0JBQWdCLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQUcsYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDNUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO3dCQUNqQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbEIsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ3JCO29CQUNELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3FCQUN0QjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdEYsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQzFDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTt3QkFDakIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNuQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNsQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztxQkFDckI7b0JBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO3dCQUNuQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ3RCO29CQUNELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTt3QkFDbEIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLEVBQUUsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3FCQUN0QjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNwRixNQUFNO2lCQUNUO2dCQUNELEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDakUsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUN2QixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLHFCQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2pFLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDbEMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO3dCQUNqQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQ25CLENBQUMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNsQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztxQkFDckI7b0JBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO3dCQUNuQixFQUFFLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsRUFBRSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ3RCO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxxQkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1RSxNQUFNO2lCQUNUO2dCQUNELEtBQUssR0FBRyxDQUFDO2dCQUNULEtBQUssR0FBRyxDQUFDO2dCQUNULEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUMxQixDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxxQkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEUsTUFBTTtpQkFDVDthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELFVBQVUsQ0FBQyxNQUFpQjtZQUN4QixNQUFNLE1BQU0sR0FBRyxDQUNYLFFBQW9DLEVBQ3BDLE9BQXdFLEVBQzFFLEVBQUU7Z0JBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUM3QyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ2QsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNsRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUE7Z0JBQ0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ2QsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsV0FBVyxDQUFDO29CQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFBO2dCQUNELElBQUksRUFBRSxDQUFDO2dCQUNQLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDekQsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNkLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFdBQVcsQ0FBQztvQkFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQTtnQkFDRCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFnQixDQUFDO1lBRWxFLE1BQU0sV0FBVyxHQUEyQjtnQkFDeEMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0RSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNyRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDcEUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3BFLGdCQUFnQixFQUFFLEdBQUcs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
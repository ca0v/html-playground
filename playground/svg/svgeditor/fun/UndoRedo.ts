export class UndoRedo {
    private stack: Array<{
        undo: () => void;
        redo: () => void;
    }> = [];
    private index = -1;

    public run(op: () => { undo: () => void, redo: () => void }) {
        const result = op();
        if (!result) return;
        const { undo, redo } = result;
        if (!undo || !redo) return;
        this.stack[++this.index] = { undo, redo };
    }

    public canRedo() {
        return 1 <= this.stack.length && this.index < this.stack.length - 1;
    }

    public canUndo() {
        return 0 <= this.index;
    }

    public undo() {
        this.stack[this.index--].undo();
    }

    public redo() {
        this.stack[++this.index].redo();
    }
}


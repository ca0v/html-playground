/**
 * rules
 * escape => clear markers, clear editors
 */
export interface SvgEditorRule {
    initialize(editor: SvgEditor): void;
}

export interface SvgEditor {
    use(rule: SvgEditorRule): SvgEditor;
    show(): void;
    subscribe(topic: string, callback: () => void): {
        unsubscribe: () => void;
    };
    hideCursor(): void;
    hideCommandEditor(): void;
    hideGrid(): void;
    showGrid(): void;
    isGridVisible(): boolean;
    hideMarkers(): void;
    showMarkers(): void;
    isMarkersVisible(): boolean;
    setActiveIndex(index: number): void;
}

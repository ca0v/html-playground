export function focus(element: any) {
    if (!element)
        return;
    if (!element.focus)
        return;
    element.focus();
}

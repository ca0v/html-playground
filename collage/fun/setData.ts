export function setData(element: HTMLElement, tag: string, value: any) {
    let data = JSON.parse(element.dataset.data || "{}");
    data[tag] = value;
    element.dataset.data = JSON.stringify(data);
}

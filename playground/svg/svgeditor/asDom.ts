export function asDom(html: string) {
    let div = document.createElement("div");
    div.innerHTML = html.trim();
    return div.firstElementChild as HTMLElement;
}

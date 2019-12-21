export class Datahash<T> {
  private hash: Array<{
    owner: HTMLElement;
    data: T;
  }> = [];
  add(owner: HTMLElement, data: T) {
    this.hash.push({ owner, data });
  }
  get(owner: HTMLElement) {
    return this.hash.find(v => v.owner === owner);
  }
}

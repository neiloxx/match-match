export default class Control {
  node: HTMLElement;

  protected parent: HTMLElement | null;

  constructor(
    parent: HTMLElement | null = null,
    tagName = 'div',
    className = '',
    content = '',
    appendType = '',
  ) {
    const el = document.createElement(tagName);
    el.className = className;
    el.innerHTML = content;
    this.parent = parent;
    if (appendType === 'onTop') {
      this.parent?.prepend(el);
    } else {
      this.parent?.appendChild(el);
    }
    this.node = el;
  }

  setParent(parent: HTMLElement): void {
    if (!this.parent) {
      this.parent = parent;
      this.parent.appendChild(this.node);
    }
  }

  public getNode(): HTMLElement {
    return this.node;
  }
}

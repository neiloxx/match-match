import Control from '../control';

export default class Link extends Control {
  image: Control | null = null;

  text: Control | null = null;

  constructor(
    parent: HTMLElement | null,
    attr = '',
    className = '',
    content = '',
    image = false,
  ) {
    super(parent, 'a', className);
    this.node.setAttribute('href', attr);
    if (image) {
      this.image = new Control(this.node, 'span', 'link_image');
      this.text = new Control(this.node, 'span', 'link_text', content);
    } else {
      this.node.innerHTML = content;
    }
  }
}

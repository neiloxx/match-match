import Control from '../../elements/control';

export default class GridItem extends Control {
  private items: Array<Control> = [];

  constructor(
    parent: HTMLElement | null = null,
    children: Array<Control>,
    className = '',
  ) {
    super(parent, 'div', className);
    children.forEach(child => {
      child.setParent(this.node);
      this.items.push(child);
    });
  }
}

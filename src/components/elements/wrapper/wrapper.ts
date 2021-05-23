import Control from '../control';

export default class Wrapper extends Control {
  constructor(
    parent: HTMLElement | null,
    className = '',
    children: Array<Control>,
  ) {
    super(parent, 'div', className);
    children.forEach(child => {
      child.setParent(this.node);
    });
  }
}

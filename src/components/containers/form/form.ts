import Control from '../../elements/control';

export default class Form extends Control {
  constructor(
    parent: HTMLElement | null,
    className = '',
    children: Array<Control>,
  ) {
    super(parent, 'form', className);
    children.forEach(child => {
      child.setParent(this.node);
    });
  }
}

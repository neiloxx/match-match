import Control from '../../elements/control';

export default class GridField extends Control {
  constructor(
    parent: HTMLElement | null,
    children: Array<Control>,
    className = '',
  ) {
    super(parent, 'div', className, '');
    children.forEach(child => {
      child.setParent(this.node);
    });
  }
}

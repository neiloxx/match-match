import Control from '../control';

export default class Button extends Control {
  constructor(
    parent: HTMLElement | null,
    className = '',
    type = '',
    content = '',
  ) {
    super(parent, 'button', className, content);
    this.node.setAttribute('type', type);
  }
}

import Control from '../control';

export default class InputImage extends Control {
  constructor(parent: HTMLElement | null, className = '') {
    super(parent, 'input', className);
    this.node.setAttribute('type', 'file');
    this.node.setAttribute('accept', '.jpg, .jpeg, .png, .gif');
  }
}

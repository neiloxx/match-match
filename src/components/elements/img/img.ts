import Control from '../control';

export default class Img extends Control {
  constructor(parent: HTMLElement | null, className = '', src = '', alt = '') {
    super(parent, 'img', className);
    this.node.setAttribute('src', src);
    this.node.setAttribute('alt', alt);
  }
}

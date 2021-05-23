import Control from '../control';
import Paragraph from '../paragraph/paragraph';
import './style.css';

export default class Logo extends Control {
  textFirst: Control;

  textSecond: Control;

  constructor(parent: HTMLElement, className = '') {
    super(parent, 'a', className);
    this.node.setAttribute('href', '#');
    this.textFirst = new Paragraph(this.node, 'logo-text', 'match');
    this.textSecond = new Paragraph(this.node, 'logo-text', 'match');
  }
}

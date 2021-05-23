import Control from '../../elements/control';
import Link from '../../elements/link/link';
import './style.css';
import Paragraph from '../../elements/paragraph/paragraph';
import Wrapper from '../../elements/wrapper/wrapper';

export default class LosePopup extends Control {
  wrapper: Control;

  constructor() {
    super(null, 'div', 'state-popup');
    this.wrapper = new Wrapper(this.node, 'popup__wrapper', [
      new Paragraph(null, 'popup__text', 'Your time is over'),
      new Wrapper(null, 'link__wrapper', [
        new Link(null, '#start', 'link link_popup', 'restart'),
        new Link(null, '#about', 'link link_popup', 'exit'),
      ]),
    ]);
  }
}

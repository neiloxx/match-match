import Control from '../../elements/control';
import Link from '../../elements/link/link';
import './style.css';
import Paragraph from '../../elements/paragraph/paragraph';
import store from '../../../store/game-store';
import Wrapper from '../../elements/wrapper/wrapper';

export default class WinPopup extends Control {
  wrapper: Control;

  constructor() {
    super(null, 'div', 'state-popup');
    const time = store.getTime();
    const score = store.getScore();
    localStorage.setItem('lastScore', score.toString());
    this.wrapper = new Wrapper(this.node, 'popup__wrapper', [
      new Paragraph(
        null,
        'popup__text',
        `Congratulations! You successfully found all matches on ${time} seconds. Your score: ${score}`,
      ),
      new Link(null, '#score', 'link link_popup', 'ok'),
    ]);
  }
}

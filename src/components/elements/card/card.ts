import Control from '../control';
import './style.css';

const FLIP_CLASS = 'flipped';

export default class Card extends Control {
  front: Control;

  back: Control;

  isFlipped = false;

  constructor(parent: HTMLElement | null, backImage: string) {
    super(parent, 'div', 'card');
    this.front = new Control(this.node, 'div', 'card__front');
    this.back = new Control(this.node, 'div', 'card__back');
    this.front.getNode().style.backgroundImage = `url(${backImage})`;
  }

  flipToBack() {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront() {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise(resolve => {
      this.node.classList.toggle(FLIP_CLASS, isFront);
      this.node.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}

import Control from '../../elements/control';
import './style.css';
import Card from '../../elements/card/card';
import { shuffleArray } from '../../../utils/array';
import images from '../../../consts/images.json';
import delay from '../../../shared/delay';
import store from '../../../store/game-store';
import settingsStore from '../../../store/settings-store';

const FLIP_DELAY = 1000;

export default class CardsField extends Control {
  private cards: Array<Card> = [];

  private activeCard?: Card;

  private isAnimation = false;

  images: string[] = [];

  category: string;

  tries = 0;

  correctTries = 0;

  public quantity = settingsStore.getDifficulty(); // This number we should get from settings

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'card__field');
    this.category = settingsStore.getGameCards();
    this.images = images[this.category];
    this.addCards();
    this.changeSize();
  }

  clear() {
    this.cards = [];
    this.node.innerHTML = '';
  }

  addCards() {
    for (let i = 1; i < this.quantity + 1; i++) {
      this.cards.push(
        new Card(
          null,
          `./assets/images/${this.category}/${
            this.images[Math.ceil(i / 2) - 1]
          }`,
        ),
      );
    }
    shuffleArray(this.cards);
    this.cards.forEach(card => {
      card.setParent(this.node);
      card.node.onclick = () => this.cardHandler(card);
    });
    this.cards.forEach(card => {
      setTimeout(() => card.flipToBack(), 5000);
    });
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();
    if (!this.activeCard) {
      this.tries++;
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (
      this.activeCard.front.getNode().style.backgroundImage !==
      card.front.getNode().style.backgroundImage
    ) {
      card.node.classList.add('wrong');
      this.activeCard.node.classList.add('wrong');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }
    card.node.classList.remove('wrong');
    this.activeCard.node.classList.remove('wrong');
    if (
      this.activeCard.front.getNode().style.backgroundImage ===
      card.front.getNode().style.backgroundImage
    ) {
      this.correctTries++;

      card.node.classList.toggle('right');
      this.activeCard.node.classList.toggle('right');
    }
    store.setTries(this.tries, this.correctTries);
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  changeSize(): void {
    if (settingsStore.getDifficulty() > 20) {
      this.node.classList.add('small');
    } else if (settingsStore.getDifficulty() > 15) {
      this.node.classList.add('medium');
    }
  }
}

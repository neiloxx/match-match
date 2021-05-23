import Control from '../../components/elements/control';
import Timer from '../../components/elements/timer/timer';
import CardsField from '../../components/containers/cards-field/cards-field';

export default class Game extends Control {
  timer: Timer;

  field: CardsField;

  constructor(parent: HTMLElement | null) {
    super(parent, 'main', 'main');
    this.timer = new Timer(this.node, 'game__timer');
    this.timer.start();
    this.field = new CardsField(this.node);
  }
}

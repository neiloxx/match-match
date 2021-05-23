import Control from '../../components/elements/control';
import '../game/style.css';
import LosePopup from '../../components/containers/state-popup/lose-popup';

export default class Settings extends Control {
  field: Control;

  constructor(parent: HTMLElement | null) {
    super(parent, 'main', 'main');
    this.field = new LosePopup();
  }
}

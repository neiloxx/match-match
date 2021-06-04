import Control from '../control';
import './style.css';
import settingsStore from '../../../store/settings-store';

export default class Option extends Control {
  constructor(
    parent: HTMLElement | null,
    className = '',
    value = '',
    content = '',
  ) {
    super(parent, 'option', className, content);
    this.node.setAttribute('value', value);
    if (
      value === settingsStore.getGameCards() ||
      +value === settingsStore.getDifficulty()
    ) {
      this.node.setAttribute('selected', '');
    }
  }
}

import Control from '../control';
import './style.css';
import settingsStore from '../../../store/settings-store';

export default class Select extends Control {
  private optionsCards = ['lotr', 'games', 'animals'];

  private optionsDifficulty = [12, 16, 36];

  constructor(
    parent: HTMLElement | null,
    className = '',
    children: Array<Control>,
  ) {
    super(parent, 'select', className);
    children.forEach(child => {
      child.setParent(this.node);
    });
    this.observe();
  }

  observe(): void {
    this.node.addEventListener('change', event => {
      const target = event.target as HTMLInputElement;
      if (this.optionsCards.includes(target.value)) {
        settingsStore.setGameCards(target.value);
      } else {
        settingsStore.setDifficulty(+target.value);
      }
    });
  }
}

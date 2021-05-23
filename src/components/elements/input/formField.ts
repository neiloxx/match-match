import Control from '../control';
import './style.css';

export default class FormField extends Control {
  checkbox: Control;

  constructor(
    parent: HTMLElement | null,
    className = '',
    type = '',
    placeholder = '',
    isValid: (value: string) => boolean,
  ) {
    super(parent, 'input', className);
    this.node.setAttribute('type', type);
    this.node.setAttribute('placeholder', placeholder);
    this.node.setAttribute('required', '');
    this.checkbox = new Control(parent, 'div', 'form__checkbox');
    this.node.addEventListener('input', (event: Event) => {
      const input: HTMLInputElement | null = <HTMLInputElement>event.target;
      if (input.value && isValid(input.value)) {
        this.setCorrect();
      } else {
        this.setWrong();
      }
    });
  }

  setParent(parent: HTMLElement) {
    super.setParent(parent);
    this.checkbox.setParent(parent);
  }

  setCorrect() {
    this.checkbox.getNode().classList.add('correct');
  }

  setWrong() {
    this.checkbox.getNode().classList.remove('correct');
  }
}

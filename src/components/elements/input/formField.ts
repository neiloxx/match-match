import Control from '../control';
import './style.css';

export default class FormField extends Control {
  checkbox: Control;

  value = '';

  warningBox: Control;

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
    this.warningBox = new Control(parent, 'div', 'form__warning');
    this.node.addEventListener('input', (event: Event) => {
      const input: HTMLInputElement | null = <HTMLInputElement>event.target;
      if (input.value && isValid(input.value)) {
        this.value = input.value;
        this.setCorrect();
      } else {
        this.value = input.value;
        this.setWrong();
      }
    });
  }

  setParent(parent: HTMLElement): void {
    super.setParent(parent);
    this.checkbox.setParent(parent);
    this.warningBox.setParent(parent);
  }

  setCorrect(): void {
    this.checkbox.getNode().classList.add('correct');
    this.warningBox.getNode().classList.remove('active');
  }

  setWrong(): void {
    this.checkbox.getNode().classList.remove('correct');
    this.warningBox.getNode().textContent = 'You should enter valid data';
    this.warningBox.getNode().classList.add('active');
  }

  getValue(): string {
    return this.value;
  }
}

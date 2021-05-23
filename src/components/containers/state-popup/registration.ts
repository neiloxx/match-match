import Control from '../../elements/control';
import Wrapper from '../../elements/wrapper/wrapper';
import './style.css';
import FormField from '../../elements/input/formField';
import Img from '../../elements/img/img';
import Form from '../form/form';
import Button from '../../elements/button/button';
import { validateName, validateEmail } from '../../../utils/validators';
import RegistrationStore from '../../../store/registration-store';

export default class Registration extends Control {
  wrapper: Control;

  emailField: FormField;

  nameField: FormField;

  surnameField: FormField;

  constructor(onSubmit: () => void) {
    super(null, 'div', 'state-popup');
    this.node.onclick = event => {
      onSubmit();
    };
    const addBtn = new Button(null, 'form__btn add', 'submit', 'add user');
    const cancelBtn = new Button(null, 'form__btn cancel', 'reset', 'cancel');
    this.nameField = new FormField(
      null,
      'form__input',
      'text',
      'First Name',
      value => {
        RegistrationStore.isNameValid = validateName(value);
        return RegistrationStore.isNameValid;
      },
    );
    this.surnameField = new FormField(
      null,
      'form__input',
      'text',
      'Last Name',
      value => {
        RegistrationStore.isSurNameValid = validateName(value);
        return RegistrationStore.isSurNameValid;
      },
    );
    this.emailField = new FormField(
      null,
      'form__input',
      'text',
      'E-mail',
      value => {
        RegistrationStore.isEmailValid = validateEmail(value);
        return RegistrationStore.isEmailValid;
      },
    );
    this.wrapper = new Wrapper(this.node, 'popup__wrapper registration', [
      new Control(null, 'h2', 'registration__text', 'Register new Player'),
      new Wrapper(null, 'registration__wrapper', [
        new Form(null, 'form', [
          new Wrapper(null, 'input__wrapper', [this.nameField]),
          new Wrapper(null, 'input__wrapper', [this.surnameField]),
          new Wrapper(null, 'input__wrapper', [this.emailField]),
          new Wrapper(null, 'btn__wrapper', [addBtn, cancelBtn]),
        ]),
        new Img(null, 'avatar', './assets/images/temp.jpg', 'Your photo'),
      ]),
    ]);
    addBtn.getNode().onclick = event => {
      event.preventDefault();
      if (
        RegistrationStore.isEmailValid &&
        RegistrationStore.isNameValid &&
        RegistrationStore.isSurNameValid
      ) {
        onSubmit();
        // TODO: add call to backend with form info
      }
    };
    cancelBtn.getNode().onclick = () => {
      RegistrationStore.isEmailValid = false;
      RegistrationStore.isNameValid = false;
      RegistrationStore.isSurNameValid = false;
      this.nameField.setWrong();
      this.surnameField.setWrong();
      this.emailField.setWrong();
    };
    this.wrapper.getNode().onclick = event => {
      event.stopPropagation();
    };
  }
}

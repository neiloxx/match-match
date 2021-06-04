import Control from '../../elements/control';
import Wrapper from '../../elements/wrapper/wrapper';
import './style.css';
import FormField from '../../elements/input/formField';
import Form from '../form/form';
import Button from '../../elements/button/button';
import { validateName, validateEmail } from '../../../utils/validators';
import RegistrationStore from '../../../store/registration-store';
import { userRepository } from '../../../repositories/userRepository';
import InputImage from '../../elements/input/inputImage';

export default class Registration extends Control {
  wrapper: Control;

  emailField: FormField;

  nameField: FormField;

  surnameField: FormField;

  constructor(onSubmit: () => void) {
    super(null, 'div', 'state-popup');
    this.node.onclick = () => {
      onSubmit();
    };
    const addBtn = new Button(null, 'form__btn add', 'submit', 'add user');
    const cancelBtn = new Button(null, 'form__btn cancel', 'reset', 'cancel');
    const inputImage = new InputImage(null, 'input__image');
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
        new Wrapper(null, 'canvas__wrapper', [
          inputImage,
          new Control(null, 'canvas', 'canvas'),
        ]),
      ]),
    ]);
    addBtn.getNode().onclick = event => {
      event.preventDefault();
      if (
        RegistrationStore.isEmailValid &&
        RegistrationStore.isNameValid &&
        RegistrationStore.isSurNameValid
      ) {
        userRepository.upsertUser(
          this.nameField.getValue(),
          this.surnameField.getValue(),
          this.emailField.getValue(),
          0,
          () => {
            localStorage.setItem('currentUser', this.emailField.getValue());
            const startLink = document.querySelector('.start-link');
            const registrationLink =
              document.querySelector('.registration-link');
            registrationLink?.classList.add('unavailable');
            startLink?.classList.add('available');
            onSubmit();
          },
          RegistrationStore.avatar,
        );
        const headerAvatar = document.querySelector('.header__avatar');
        headerAvatar?.setAttribute('src', RegistrationStore.avatar);
        headerAvatar?.classList.add('active');
      }
    };
    cancelBtn.getNode().onclick = () => this.handleCancelBtn();
    this.wrapper.getNode().onclick = event => event.stopPropagation();
    this.handleImage(inputImage);
  }

  handleCancelBtn(): void {
    RegistrationStore.isEmailValid = false;
    RegistrationStore.isNameValid = false;
    RegistrationStore.isSurNameValid = false;
    this.nameField.setWrong();
    this.surnameField.setWrong();
    this.emailField.setWrong();
  }

  handleImage(inputImage: Control): void {
    inputImage.node.onchange = () => {
      const files = inputImage.node as unknown as DataTransfer;
      const file = files.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        if (typeof reader.result === 'string') {
          img.src = reader.result;
        }
        this.drawImage(img.src);
      };
      reader.readAsDataURL(file);
    };
  }

  drawImage = (src: string): void => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas?.getContext('2d');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;
    img.onload = () => {
      if (canvas) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx?.drawImage(img, 0, 0);
        RegistrationStore.avatar = canvas.toDataURL();
      }
    };
  };
}

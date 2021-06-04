import Control from '../../components/elements/control';
import './style.css';
import Wrapper from '../../components/elements/wrapper/wrapper';
import Select from '../../components/elements/select/select';
import Option from '../../components/elements/select/options';

export default class Settings extends Control {
  field: Control;

  constructor(parent: HTMLElement | null) {
    super(parent, 'main', 'main');
    this.field = new Wrapper(this.node, 'settings', [
      new Control(null, 'h2', 'settings__title', 'Game cards'),
      new Select(null, 'settings__select settings__select_cards', [
        new Option(
          null,
          'settings__select-option settings__select-option_cards',
          'lotr',
          'The Lord of the Rings',
        ),
        new Option(
          null,
          'settings__select-option settings__select-option_cards',
          'games',
          'Games',
        ),
        new Option(
          null,
          'settings__select-option settings__select-option_cards',
          'animals',
          'Animals',
        ),
      ]),
      new Control(null, 'h2', 'settings__title', 'Difficulty'),
      new Select(null, 'settings__select settings__select_difficulty', [
        new Option(
          null,
          'settings__select-option settings__select-option_difficulty',
          '12',
          '3x4',
        ),
        new Option(
          null,
          'settings__select-option settings__select-option_difficulty',
          '16',
          '4x4',
        ),
        new Option(
          null,
          'settings__select-option settings__select-option_difficulty',
          '36',
          '6x6',
        ),
      ]),
    ]);
  }
}

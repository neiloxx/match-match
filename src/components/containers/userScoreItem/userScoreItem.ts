import Control from '../../elements/control';
import { User } from '../../../repositories/userRepository';
import Paragraph from '../../elements/paragraph/paragraph';
import Wrapper from '../../elements/wrapper/wrapper';
import './style.css';

export default class UserScoreItem extends Control {
  private score: Control;

  private wpapper: Wrapper;

  constructor(parent = null, user: User) {
    super(parent, 'li', 'score__list-item');
    this.wpapper = new Wrapper(this.node, 'score__list-item_inner', [
      new Paragraph(
        null,
        'score__list-item_text name',
        `${user.firstName} ${user.lastName}` || '',
      ),
      new Paragraph(null, 'score__list-item_text email', user.email || ''),
    ]);
    this.score = new Control(
      this.node,
      'span',
      'score__list-item_text score',
      `${user.score}`,
    );
  }
}

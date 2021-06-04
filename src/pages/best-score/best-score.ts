import Control from '../../components/elements/control';
import { User, userRepository } from '../../repositories/userRepository';
import Wrapper from '../../components/elements/wrapper/wrapper';
import './style.css';
import UserScoreItem from '../../components/containers/userScoreItem/userScoreItem';

export default class BestScore extends Control {
  private wrapper: Wrapper;

  constructor(parent: HTMLElement | null) {
    super(parent, 'main', 'main');
    const list = new Control(null, 'ul', 'score__list');
    this.wrapper = new Wrapper(this.node, 'score', [
      new Control(null, 'h2', 'score__title', 'Best players'),
      new Control(
        null,
        'h3',
        'score__subtitle',
        'Register to play the game and add your result',
      ),
      list,
    ]);
    userRepository
      .getAll()
      .then(res => {
        list.getNode().innerHTML = '';
        res
          ?.filter(user => user && user.score)
          .sort((user1, user2) => this.sortUsers(user1, user2))
          .forEach(user => {
            const scoreItem = new UserScoreItem(null, user);
            scoreItem.setParent(list.getNode());
          });
      })
      .catch(() => {
        throw new Error('unable to read users');
      });
  }

  sortUsers = (user1: User, user2: User): number => {
    if (!user1.score && !user2.score) {
      return 0;
    }
    if (!user1.score) {
      return 1;
    }
    if (!user2.score) {
      return -1;
    }
    if (user1.score > user2.score) {
      return -1;
    }
    if (user1.score < user2.score) {
      return 1;
    }
    return 0;
  };
}

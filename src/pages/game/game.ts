import Control from '../../components/elements/control';
import Timer from '../../components/elements/timer/timer';
import CardsField from '../../components/containers/cards-field/cards-field';
import store from '../../store/game-store';
import WinPopup from '../../components/containers/state-popup/win-popup';
import LosePopup from '../../components/containers/state-popup/lose-popup';
import { userRepository } from '../../repositories/userRepository';
import settingsStore from '../../store/settings-store';

export default class Game extends Control {
  timer: Timer;

  field: CardsField;

  constructor(parent: HTMLElement | null) {
    super(parent, 'main', 'main');
    this.field = new CardsField(this.node);
    this.timer = new Timer(
      this.node,
      'game__timer',
      () => settingsStore.getDifficulty() / 2 === store.getCorrectTries(),
      () => {
        const win = new WinPopup();
        userRepository
          .getAll()
          .then(res => {
            if (res && res?.length > 0) {
              const user = res[res.length - 1];
              if (user.email === localStorage.getItem('currentUser')) {
                user.score = parseInt(
                  <string>localStorage.getItem('lastScore'),
                  10,
                );
                userRepository.upsertUser(
                  user.firstName,
                  user.lastName,
                  user.email,
                  user.score,
                  () => {
                    console.log('score updated');
                  },
                );
              }
            }
            store.clear();
          })
          .catch(() => {
            store.clear();
          });
        document.body.appendChild(win.node);
        window.onhashchange = () => {
          this.timer.clear();
          document.body.removeChild(win.node);
        };
      },
      () => {
        const currentLocation = window.location;
        const lose = new LosePopup(() => {
          if (currentLocation === window.location) {
            document.body.removeChild(lose.node);
            this.timer.startMinutes = 0;
            this.timer.startSeconds = -2;
            this.timer.clear();
            this.timer.start();
            this.node?.removeChild(this.field.node);
            this.field = new CardsField(this.node);
          } else document.body.removeChild(lose.node);
        });
        document.body.appendChild(lose.node);
        store.clear();
        window.onhashchange = () => {
          this.timer.clear();
          document.body.removeChild(lose.node);
        };
      },
    );
    this.timer.start();
  }
}

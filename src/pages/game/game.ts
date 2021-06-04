import Control from '../../components/elements/control';
import StopWatch from '../../components/elements/stop-watch/stop-watch';
import CardsField from '../../components/containers/cards-field/cards-field';
import store from '../../store/game-store';
import WinPopup from '../../components/containers/state-popup/win-popup';
import LosePopup from '../../components/containers/state-popup/lose-popup';
import { userRepository } from '../../repositories/userRepository';
import settingsStore from '../../store/settings-store';

export default class Game extends Control {
  timer: StopWatch;

  field: CardsField;

  constructor(parent: HTMLElement | null) {
    super(parent, 'main', 'main');
    this.field = new CardsField(this.node);
    this.field.addCards();
    this.field.changeSize();
    this.timer = new StopWatch(
      this.node,
      'game__stopwatch',
      () => settingsStore.getDifficulty() / 2 === store.getCorrectTries(),
      () => this.renderWinPopup(),
      () => this.renderLosePopup(),
    );
    this.timer.start();
  }

  renderWinPopup(): void {
    const win = new WinPopup();
    this.addWinnerToDb();
    document.body.appendChild(win.node);
    window.onhashchange = () => {
      this.timer.clear();
      if (document.body.contains(win.node)) {
        document.body.removeChild(win.node);
      }
    };
  }

  renderLosePopup(): void {
    const currentLocation = window.location;
    const lose: Control = new LosePopup(() =>
      this.restartWhenLose(lose, currentLocation),
    );
    document.body.appendChild(lose.node);
    store.clear();
    window.onhashchange = () => {
      this.timer.clear();
      document.body.removeChild(lose.node);
    };
  }

  addWinnerToDb = (): void => {
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
              () => {},
              user.avatar,
            );
          }
        }
        store.clear();
      })
      .catch(() => {
        store.clear();
      });
  };

  restartWhenLose(lose: Control, currentLocation: Location): void {
    if (currentLocation === window.location) {
      document.body.removeChild(lose.node);
      this.timer.startMinutes = 0;
      this.timer.startMs = store.preparingTime;
      this.timer.clear();
      this.timer.start();
      this.node?.removeChild(this.field.node);
      this.field = new CardsField(this.node);
    } else document.body.removeChild(lose.node);
  }
}

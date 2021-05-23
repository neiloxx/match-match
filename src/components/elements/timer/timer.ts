import Control from '../control';
import './style.css';
import LosePopup from '../../containers/state-popup/lose-popup';
import store from '../../../store/game-store';
import WinPopup from '../../containers/state-popup/win-popup';

export default class Timer extends Control {
  intervalId: NodeJS.Timeout | null = null;

  private startMinutes = 0;

  private startSeconds = -29;

  public spentTime: NodeJS.Timeout | undefined;

  constructor(parent: HTMLElement | null, className = '') {
    super(parent, 'div', className);
  }

  // TODO: remove game logic in other class with methods start&stop game. There should be only the Timer;
  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        if (store.getQuantity() / 2 === store.getCorrectTries()) {
          this.stop();
        }
        if (this.startMinutes < 10) {
          this.node.innerHTML = `0${this.startMinutes}:${this.startSeconds}`;
          if (this.startSeconds < 10 && this.startSeconds >= 0) {
            this.node.innerHTML = `0${this.startMinutes}:0${this.startSeconds}`;
          } else if (this.startSeconds < 0 && this.startSeconds < -10) {
            this.node.innerHTML = `0${this.startMinutes}:-${Math.abs(
              this.startSeconds,
            )}`;
          } else if (this.startSeconds < 0 && this.startSeconds > -10) {
            this.node.innerHTML = `0${this.startMinutes}:-0${Math.abs(
              this.startSeconds,
            )}`;
          } else {
            this.node.innerHTML = `0${this.startMinutes}:${this.startSeconds}`;
          }
          if (this.startSeconds === 59) {
            this.startMinutes++;
            this.startSeconds = 0;
          }
        } else {
          this.stop();
        }
        this.startSeconds++;
      }, 1000);
    }
  }

  clear() {
    if (this.intervalId) {
      this.spentTime = this.intervalId;
      clearInterval(this.intervalId);
    }
  }

  // TODO: remove game logic in other class
  stop() {
    store.setTime(this.startMinutes, this.startSeconds);
    if (this.intervalId) {
      this.spentTime = this.intervalId;
      clearInterval(this.intervalId);
    }
    if (store.getQuantity() / 2 === store.getCorrectTries()) {
      const win = new WinPopup();
      document.body.appendChild(win.node);
      store.clear();
      window.onhashchange = () => document.body.removeChild(win.node);
    } else if (store.getQuantity() / 2 !== store.getCorrectTries()) {
      const lose = new LosePopup();
      const currentLocation = window.location;
      document.body.appendChild(lose.node);
      const btns = document.body.querySelectorAll('.link_popup');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (currentLocation === window.location) {
            this.intervalId = null;
            document.body.removeChild(lose.node);
            this.startMinutes = 0;
            this.startSeconds = 0;
            this.start();
          } else document.body.removeChild(lose.node);
        });
      });
    }
  }
}

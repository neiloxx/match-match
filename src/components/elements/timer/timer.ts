import Control from '../control';
import store from '../../../store/game-store';
import './style.css';

export default class Timer extends Control {
  intervalId: NodeJS.Timeout | null = null;

  startMinutes = 0;

  startSeconds = -4;

  private readonly isWinner: () => boolean;

  private readonly onWinCallback: () => void;

  private readonly onLoseCallback: () => void;

  constructor(
    parent: HTMLElement | null,
    className = '',
    isWinner: () => boolean,
    onWinCallback: () => void,
    onLoseCallback: () => void,
  ) {
    super(parent, 'div', className, '', 'onTop');
    this.isWinner = isWinner;
    this.onWinCallback = onWinCallback;
    this.onLoseCallback = onLoseCallback;
    window.onhashchange = () => {
      if (window.location.hash !== '#start') {
        this.clear();
      }
    };
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        if (this.isWinner()) {
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
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  stop() {
    store.setTime(this.startMinutes, this.startSeconds);
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.isWinner()) {
      this.onWinCallback();
    } else {
      this.onLoseCallback();
    }
  }
}

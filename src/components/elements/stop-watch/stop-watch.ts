import Control from '../control';
import store from '../../../store/game-store';
import './style.css';

const msInMinute = 60000;
const msInSecond = 1000;
const speedMs = 1000;

export default class StopWatch extends Control {
  intervalId: NodeJS.Timeout | null = null;

  startMinutes = 0;

  startMs = store.preparingTime;

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

  start(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.count();
      }, speedMs);
    }
  }

  count(): void {
    if (this.isWinner()) {
      this.stop();
    }
    if (this.startMs === msInMinute) {
      this.startMinutes++;
      this.startMs = 0;
    }
    this.drawSecondsCounter();
    this.startMs += msInSecond;
  }

  drawSecondsCounter(): void {
    if (this.startMinutes < store.maxMinutesBeforeLose) {
      this.node.innerHTML = `0${this.startMinutes}:${
        this.startMs / msInSecond
      }`;
      if (this.startMs < store.maxMinutesBeforeLose && this.startMs >= 0) {
        this.node.innerHTML = `0${this.startMinutes}:0${
          this.startMs / msInSecond
        }`;
      } else if (
        this.startMs < 0 &&
        this.startMs <= -store.maxMinutesBeforeLose
      ) {
        this.node.innerHTML = `0${this.startMinutes}:${Math.abs(
          this.startMs / msInSecond,
        )}`;
      } else if (
        this.startMs < 0 &&
        this.startMs > -store.maxMinutesBeforeLose
      ) {
        this.node.innerHTML = `0${this.startMinutes}:0${Math.abs(
          this.startMs / msInSecond,
        )}`;
      } else {
        this.node.innerHTML = `0${this.startMinutes}:${
          this.startMs / msInSecond
        }`;
      }
    } else {
      this.stop();
    }
  }

  clear(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  stop(): void {
    store.setTime((this.startMinutes + this.startMs) / msInSecond);
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

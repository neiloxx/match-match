import settingsStore from './settings-store';

const coefficient = 100;
const secondCoefficient = 10;

class GameStore {
  seconds = 0;

  score = 0;

  allTries = 0;

  correctTries = 0;

  preparingTime: number;

  maxMinutesBeforeLose: number;

  quantityCards = settingsStore.getDifficulty();

  constructor() {
    this.preparingTime = -29000;
    this.maxMinutesBeforeLose = 10000;
  }

  setTime(seconds: number): void {
    this.seconds = Math.round(seconds);
  }

  getTime(): number {
    return this.seconds;
  }

  setTries(allTries: number, correctTries: number): void {
    this.allTries = allTries;
    this.correctTries = correctTries;
  }

  getCorrectTries(): number {
    return this.correctTries;
  }

  getScore(): number {
    const wrongTries = this.allTries - this.correctTries;
    this.score =
      ((this.allTries - wrongTries) * coefficient -
        this.seconds * secondCoefficient) *
      Math.round(Math.sqrt(this.quantityCards));
    return this.score >= 0 ? this.score : 0;
  }

  clear(): void {
    this.score = 0;
    this.correctTries = 0;
    this.allTries = 0;
  }
}

const store = new GameStore();
export default store;

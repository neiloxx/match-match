import settingsStore from './settings-store';

class GameStore {
  seconds = 0;

  score = 0;

  allTries = 0;

  correctTries = 0;

  quantityCards = settingsStore.getDifficulty(); // This number we should get from settings

  setTime(minutes: number, seconds: number) {
    this.seconds = minutes * 60 + seconds;
  }

  getTime() {
    return this.seconds;
  }

  setTries(allTries: number, correctTries: number) {
    this.allTries = allTries;
    this.correctTries = correctTries;
  }

  setQuantity(value: number) {
    this.quantityCards = value;
  }

  getQuantity() {
    return this.quantityCards;
  }

  getCorrectTries() {
    return this.correctTries;
  }

  getScore() {
    const wrongTries = this.allTries - this.correctTries;
    this.score =
      ((this.allTries - wrongTries) * 100 - this.seconds * 10) *
      Math.round(Math.sqrt(this.quantityCards));
    return this.score >= 0 ? this.score : 0;
  }

  clear() {
    this.score = 0;
    this.correctTries = 0;
    this.allTries = 0;
  }
}

const store = new GameStore();
export default store;

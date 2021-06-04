const startDifficulty = 12;

class SettingsStore {
  public gameCards = 'lotr';

  public difficulty = startDifficulty;

  setGameCards(value: string): void {
    this.gameCards = value;
  }

  getGameCards(): string {
    return this.gameCards;
  }

  setDifficulty(value: number): void {
    this.difficulty = value;
  }

  getDifficulty(): number {
    return this.difficulty;
  }
}

const settingsStore = new SettingsStore();
export default settingsStore;

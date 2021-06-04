import DataBase from '../db/db';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  avatar: string;
}

class UserRepository {
  private database: DataBase;

  constructor() {
    this.database = new DataBase();
  }

  upsertUser(
    firstName: string,
    lastName: string,
    email: string,
    score: number,
    onSuccessCallback: () => void,
    avatar: string,
    id?: number,
  ): Promise<void> {
    const user: { [key: string]: string | number } = {
      firstName,
      lastName,
      email,
      score,
      avatar,
    };
    if (id) {
      user.id = id;
    }
    return this.database
      .upsert('users', user)
      .then(() => onSuccessCallback())
      .catch(() => {
        throw new Error('User with this email already exists.');
      });
  }

  getAll(): Promise<Array<User>> {
    return this.database.getAll('users') as unknown as Promise<Array<User>>;
  }
}

export const userRepository = new UserRepository();

import DataBase from '../db/db';

export interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  score: number | null;
}

class UserRepository {
  private database: DataBase;

  constructor() {
    this.database = new DataBase();
  }

  upsertUser(
    firstName: string | null = null,
    lastName: string | null = null,
    email: string | null = null,
    score: number | null = null,
    onSuccessCallback: () => void,
    id?: number | null,
  ) {
    const user: { [key: string]: string | number | null } = {
      firstName,
      lastName,
      email,
      score,
    };
    if (id) {
      user.id = id;
    }
    return this.database
      .upsert('users', user)
      .then(() => onSuccessCallback())
      .catch(e => {
        console.log(e);
        alert('User with this email already exists.');
      });
  }

  getAll(): Promise<Array<User> | null> {
    return this.database.getAll('users') as Promise<Array<User> | null>;
  }
}

export const userRepository = new UserRepository();

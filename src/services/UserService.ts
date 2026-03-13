// -------------------------------
// Own Imports
// -------------------------------
import type { LoginDTO } from '@dtos/user/LoginDTO';
import type { RegisterDTO } from '@dtos/user/RegisterDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { useUsersStore } from '@stores/UsersStore';

// -------------------------------
// Third-Party Imports
// -------------------------------
export class UserService {
  private store: ReturnType<typeof useUsersStore>;
  private static instance: UserService;

  private constructor(store: ReturnType<typeof useUsersStore>) {
    this.store = store;
  }

  static getInstance(store?: ReturnType<typeof useUsersStore>): UserService {
    if (!this.instance) {
      if (!store) {
        throw new Error('You should put a store here');
      }
      this.instance = new UserService(store);
    }
    return this.instance;
  }

  login(credentials: LoginDTO): boolean {
    const user = this.store.users.find(
      (currentUser) =>
        currentUser.username === credentials.username &&
        currentUser.password === credentials.password,
    );

    if (user) {
      this.store.setLoggedInUser(user);
      return true;
    }

    return false;
  }

  register(data: RegisterDTO): boolean {
    const userExists = this.store.users.some(
      (currentUser) => currentUser.username === data.username || currentUser.email === data.email,
    );

    if (userExists) {
      return false;
    }

    const newId = this.store.users.length
      ? Math.max(...this.store.users.map((user) => user.id)) + 1
      : 1;

    const newUser: UserInterface = {
      id: newId,
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      role: 'user',
      createdAt: new Date(),
      computers: null,
    };

    this.store.users.push(newUser);
    this.store.setLoggedInUser(newUser);

    return true;
  }
}

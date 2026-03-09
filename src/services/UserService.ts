// -------------------------------
// Own Imports
// -------------------------------
import type { LoginDTO } from '@/dtos/user/LoginDTO';
import { useUsersStore } from '@/stores/UsersStore';

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
      (user) => user.username === credentials.username && user.password === credentials.password,
    );
    if (user) {
      this.store.setLoggedInUser(user);
      return true;
    }

    return false;
  }
}

// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { UserInterface } from '@interfaces/UserInterface';
import { useUsersStore } from '@stores/UsersStore';

export class UserService {
  private usersStore: ReturnType<typeof useUsersStore>;
  private static instance: UserService;

  private constructor(usersStore: ReturnType<typeof useUsersStore>) {
    this.usersStore = usersStore;
  }

  static getInstance(usersStore?: ReturnType<typeof useUsersStore>): UserService {
    if (!this.instance) {
      if (!usersStore) {
        throw new Error('You should put a store here');
      }
      this.instance = new UserService(usersStore);
    }
    return this.instance;
  }

  getAll(): UserInterface[] {
    return this.usersStore.users;
  }
}

// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { CreateUserDTO } from '@dtos/user/CreateUserDTO';
import type { EditUserDTO } from '@dtos/user/EditUserDTO';
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

  getById(id: number): UserInterface | undefined {
    return this.usersStore.users.find((user) => user.id === id);
  }

  isUniqueUsername(username: string, excludeUserId?: number): boolean {
    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername) {
      return true;
    }

    return !this.usersStore.users.some(
      (user) =>
        user.id !== excludeUserId && user.username.trim().toLowerCase() === normalizedUsername,
    );
  }

  isUniqueEmail(email: string, excludeUserId?: number): boolean {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return true;
    }

    return !this.usersStore.users.some(
      (user) => user.id !== excludeUserId && user.email.trim().toLowerCase() === normalizedEmail,
    );
  }

  create(userData: CreateUserDTO): UserInterface {
    return this.usersStore.addUser(userData);
  }

  update(id: number, userData: EditUserDTO): boolean {
    return this.usersStore.updateUserById(id, userData);
  }

  delete(id: number): boolean {
    return this.usersStore.deleteUserById(id);
  }
}

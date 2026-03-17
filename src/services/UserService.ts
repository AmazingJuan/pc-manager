// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { CreateUserDTO } from '@dtos/user/CreateUserDTO';
import type { EditUserDTO } from '@dtos/user/EditUserDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { useUsersStore } from '@stores/UsersStore';

// -------------------------------
// Class Definition
// -------------------------------
export class UserService {
  // private properties
  // singleton instance
  private static instance: UserService;
  private usersStore: ReturnType<typeof useUsersStore>;

  // constructor
  private constructor(usersStore: ReturnType<typeof useUsersStore>) {
    this.usersStore = usersStore;
  }

  // getInstance()
  static getInstance(usersStore?: ReturnType<typeof useUsersStore>): UserService {
    if (!this.instance) {
      if (!usersStore) {
        throw new Error('You should put a store here');
      }
      this.instance = new UserService(usersStore);
    }
    return this.instance;
  }

  // query methods (getAll, getById, stats, filters)
  getAll(): UserInterface[] {
    return this.usersStore.users;
  }

  getById(id: number): UserInterface | undefined {
    return this.usersStore.users.find((user) => user.id === id);
  }

  isUniqueEmail(email: string, excludeUserId?: number): boolean {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return true;
    }

    return !this.usersStore.users.some((user) => user.id !== excludeUserId && user.email.trim().toLowerCase() === normalizedEmail);
  }

  isUniqueUsername(username: string, excludeUserId?: number): boolean {
    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername) {
      return true;
    }

    return !this.usersStore.users.some((user) => user.id !== excludeUserId && user.username.trim().toLowerCase() === normalizedUsername);
  }

  // mutation methods (create, update, delete)
  create(userData: CreateUserDTO): UserInterface {
    return this.usersStore.addUser(userData);
  }

  delete(id: number): boolean {
    return this.usersStore.deleteUserById(id);
  }

  update(id: number, userData: EditUserDTO): boolean {
    return this.usersStore.updateUserById(id, userData);
  }
}

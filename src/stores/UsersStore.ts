// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { CreateUserDTO } from '@dtos/user/CreateUserDTO';
import type { EditUserDTO } from '@dtos/user/EditUserDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { users } from '@seeders/UserSeeder';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({ users: users, lastId: users.length }),
  actions: {
    getNextUserId(): number {
      this.lastId += 1;
      return this.lastId;
    },

    addUser(userData: CreateUserDTO): UserInterface {
      const newUser: UserInterface = { id: this.getNextUserId(), ...userData, createdAt: new Date() };

      this.users.push(newUser);
      return newUser;
    },

    updateUserById(id: number, userData: EditUserDTO): boolean {
      const user = this.users.find((currentUser) => currentUser.id === id);

      if (!user) {
        return false;
      }

      Object.assign(user, userData);
      return true;
    },

    deleteUserById(id: number): boolean {
      const previousLength = this.users.length;
      this.users = this.users.filter((user) => user.id !== id);

      return this.users.length < previousLength;
    },
  },
  persist: {
    afterHydrate: (ctx) => {
      ctx.store.users = ctx.store.users.map((user: { createdAt: string | Date }) => ({ ...user, createdAt: new Date(user.createdAt) }));
    },
  },
});

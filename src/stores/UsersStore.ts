// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { users } from '@seeders/UserSeeder';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: users,
    lastId: users.length,
  }),
  persist: {
    afterHydrate: (ctx) => {
      ctx.store.users = ctx.store.users.map((user: { createdAt: string | Date }) => ({
        ...user,
        createdAt: new Date(user.createdAt),
      }));
    },
  },
});

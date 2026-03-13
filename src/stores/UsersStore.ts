// -------------------------------
// Own Imports
// -------------------------------
import { users } from '@seeders/UserSeeder';
import type { UserInterface } from '@interfaces/UserInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: users,
    loggedInUser: null as UserInterface | null,
  }),
  actions: {
    setLoggedInUser(user: UserInterface | null) {
      this.loggedInUser = user;
    },
  },
  persist: true,
});

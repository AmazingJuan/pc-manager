// -------------------------------
// Own Imports
// -------------------------------
import type { UserInterface } from '@interfaces/UserInterface';
import { users } from '@seeders/UserSeeder';

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

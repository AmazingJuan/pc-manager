// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { UserInterface } from '@interfaces/UserInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedInUser: null as UserInterface | null,
  }),
  getters: {
    hasLoggedInUser: (state) => !!state.loggedInUser,
  },
  actions: {
    setLoggedInUser(user: UserInterface | null) {
      this.loggedInUser = user;
    },
  },
  persist: {
    afterHydrate: (ctx) => {
      if (ctx.store.loggedInUser) {
        ctx.store.loggedInUser = {
          ...ctx.store.loggedInUser,
          createdAt: new Date(ctx.store.loggedInUser.createdAt),
        };
      }
    },
  },
});

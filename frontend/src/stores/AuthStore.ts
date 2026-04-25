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
  state: () => ({ accessToken: '' as string, refreshToken: '' as string, loggedInUser: null as UserInterface | null }),
  actions: {
    setTokens(accessToken: string, refreshToken = ''): void {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },

    setLoggedInUser(user: UserInterface | null): void {
      this.loggedInUser = user;
    },

    clearSession(): void {
      this.accessToken = '';
      this.refreshToken = '';
      this.loggedInUser = null;
    },
  },
  persist: true,
});

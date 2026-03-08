// Own Imports
import type { UserInterface } from '@/interfaces/UserInterface'

// Third-Party Imports
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as UserInterface[],
  }),
  persist: true,
})

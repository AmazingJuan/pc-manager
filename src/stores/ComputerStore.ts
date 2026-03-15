// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { computers } from '@seeders/ComputerSeeder';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useComputersStore = defineStore('computers', {
  state: () => ({
    computers: computers,
    lastId: computers.length,
  }),
  persist: {
    afterHydrate: (ctx) => {
      ctx.store.computers = ctx.store.computers.map(
        (computer: {
          purchaseDate: string | Date;
          warrantyExpirationDate: string | Date;
          createdAt: string | Date;
        }) => ({
          ...computer,
          purchaseDate: new Date(computer.purchaseDate),
          warrantyExpirationDate: new Date(computer.warrantyExpirationDate),
          createdAt: new Date(computer.createdAt),
        }),
      );
    },
  },
});

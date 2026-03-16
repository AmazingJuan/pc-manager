// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { computers } from '@seeders/ComputerSeeder';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useComputersStore = defineStore('computers', {
  state: () => ({ computers: computers, lastId: computers.length }),
  actions: {
    getNextComputerId(): number {
      this.lastId += 1;
      return this.lastId;
    },

    addComputer(computerData: CreateComputerDTO): ComputerInterface {
      const newComputer: ComputerInterface = { id: this.getNextComputerId(), ...computerData, createdAt: new Date() };

      this.computers.push(newComputer);
      return newComputer;
    },

    updateComputerById(id: number, computerData: EditComputerDTO): boolean {
      const computer = this.computers.find((currentComputer) => currentComputer.id === id);

      if (!computer) {
        return false;
      }

      Object.assign(computer, computerData);
      return true;
    },

    deleteComputerById(id: number): boolean {
      const previousLength = this.computers.length;
      this.computers = this.computers.filter((computer) => computer.id !== id);

      return this.computers.length < previousLength;
    },
  },
  persist: {
    afterHydrate: (ctx) => {
      ctx.store.computers = ctx.store.computers.map(
        (computer: { purchaseDate: string | Date; warrantyExpirationDate: string | Date; createdAt: string | Date }) => ({
          ...computer,
          purchaseDate: new Date(computer.purchaseDate),
          warrantyExpirationDate: new Date(computer.warrantyExpirationDate),
          createdAt: new Date(computer.createdAt),
        }),
      );
    },
  },
});

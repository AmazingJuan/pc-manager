// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { StatusChangeInterface } from '@interfaces/StatusChangeInterface';
import type { ComputerStatus } from '@/types/Computer';
// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useStatusChangesStore = defineStore('statusChanges', {
  state: () => ({
    statusChanges: [] as StatusChangeInterface[],
    lastId: 0,
  }),
  actions: {
    getNextStatusChangeId(): number {
      this.lastId += 1;
      return this.lastId;
    },
    addStatusChange(
      computerId: number,
      previousStatus: ComputerStatus,
      newStatus: ComputerStatus,
    ): StatusChangeInterface {
      const newStatusChange: StatusChangeInterface = {
        id: this.getNextStatusChangeId(),
        computerId,
        previousStatus,
        newStatus,
        changedAt: new Date(),
      };
      this.statusChanges.push(newStatusChange);
      return newStatusChange;
    },
  },
  persist: {
    afterHydrate: (ctx) => {
        ctx.store.statusChanges = ctx.store.statusChanges.map(
        (statusChange: { changedAt: string | Date; [key: string]: unknown }) => ({
            ...statusChange,
            changedAt: new Date(statusChange.changedAt as string)
        }),
      );
    },
  },
});
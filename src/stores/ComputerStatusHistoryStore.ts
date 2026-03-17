// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { RecordComputerStatusChange } from '@/dtos/computerStatusHistory/RecordComputerStatusChangeDTO';
import type { ComputerStatusHistoryInterface } from '@interfaces/ComputerStatusHistoryInterface';
// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useComputerStatusHistoryStore = defineStore('computerStatusHistory', {
  state: () => ({ historyEntries: [] as ComputerStatusHistoryInterface[], lastId: 0 }),
  actions: {
    getNextHistoryEntryId(): number {
      this.lastId += 1;
      return this.lastId;
    },
    addHistoryEntry(dto: RecordComputerStatusChange): ComputerStatusHistoryInterface {
      const newHistoryEntry: ComputerStatusHistoryInterface = { id: this.getNextHistoryEntryId(), ...dto, changedAt: new Date() };
      this.historyEntries.push(newHistoryEntry);
      return newHistoryEntry;
    },
  },
  persist: {
    afterHydrate: (ctx) => {
      ctx.store.historyEntries = ctx.store.historyEntries.map((historyEntry: { changedAt: string | Date; [key: string]: unknown }) => ({
        ...historyEntry,
        changedAt: new Date(historyEntry.changedAt as string),
      }));
    },
  },
});

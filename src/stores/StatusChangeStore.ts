// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { RecordStatusChangeDTO } from '@dtos/statusChange/RecordStatusChangeDTO';
import type { StatusChangeInterface } from '@interfaces/StatusChangeInterface';
// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useStatusChangesStore = defineStore('statusChanges', {
  state: () => ({ statusChanges: [] as StatusChangeInterface[], lastId: 0 }),
  actions: {
    getNextStatusChangeId(): number {
      this.lastId += 1;
      return this.lastId;
    },
    addStatusChange(dto: RecordStatusChangeDTO): StatusChangeInterface {
      const newStatusChange: StatusChangeInterface = { id: this.getNextStatusChangeId(), ...dto, changedAt: new Date() };
      this.statusChanges.push(newStatusChange);
      return newStatusChange;
    },
  },
  persist: {
    afterHydrate: (ctx) => {
      ctx.store.statusChanges = ctx.store.statusChanges.map((statusChange: { changedAt: string | Date; [key: string]: unknown }) => ({
        ...statusChange,
        changedAt: new Date(statusChange.changedAt as string),
      }));
    },
  },
});

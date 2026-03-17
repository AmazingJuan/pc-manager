// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { RecordComputerStatusChange } from '@/dtos/computerStatusHistory/RecordComputerStatusChangeDTO';
import type { ComputerStatusHistoryInterface } from '@interfaces/ComputerStatusHistoryInterface';
import { useComputerStatusHistoryStore } from '@stores/ComputerStatusHistoryStore';

export class ComputerStatusHistoryService {
  private computerStatusHistoryStore: ReturnType<typeof useComputerStatusHistoryStore>;
  private static instance: ComputerStatusHistoryService;

  private constructor(computerStatusHistoryStore: ReturnType<typeof useComputerStatusHistoryStore>) {
    this.computerStatusHistoryStore = computerStatusHistoryStore;
  }

  static getInstance(computerStatusHistoryStore?: ReturnType<typeof useComputerStatusHistoryStore>): ComputerStatusHistoryService {
    if (!this.instance) {
      if (!computerStatusHistoryStore) {
        throw new Error('You should put a store here');
      }
      this.instance = new ComputerStatusHistoryService(computerStatusHistoryStore);
    }
    return this.instance;
  }

  getAll(): ComputerStatusHistoryInterface[] {
    return this.computerStatusHistoryStore.historyEntries;
  }

  getByComputerId(computerId: number): ComputerStatusHistoryInterface[] {
    return this.computerStatusHistoryStore.historyEntries.filter((historyEntry) => historyEntry.computerId === computerId);
  }

  record(dto: RecordComputerStatusChange): void {
    this.computerStatusHistoryStore.addHistoryEntry(dto);
  }
}

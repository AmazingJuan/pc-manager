// Author: Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@app-types/Computer';
import type { ComputerStatusHistoryInterface } from '@interfaces/ComputerStatusHistoryInterface';
import type { RecordComputerStatusChange } from '@dtos/computerStatusHistory/RecordComputerStatusChangeDTO';
import { useComputerStatusHistoryStore } from '@stores/ComputerStatusHistoryStore';

// -------------------------------
// Class Definition
// -------------------------------
export class ComputerStatusHistoryService {
  // private properties
  // singleton instance
  private static instance: ComputerStatusHistoryService;
  private computerStatusHistoryStore: ReturnType<typeof useComputerStatusHistoryStore>;

  // constructor
  private constructor(computerStatusHistoryStore: ReturnType<typeof useComputerStatusHistoryStore>) {
    this.computerStatusHistoryStore = computerStatusHistoryStore;
  }

  // getInstance()
  static getInstance(computerStatusHistoryStore?: ReturnType<typeof useComputerStatusHistoryStore>): ComputerStatusHistoryService {
    if (!this.instance) {
      if (!computerStatusHistoryStore) {
        throw new Error('You should put a store here');
      }
      this.instance = new ComputerStatusHistoryService(computerStatusHistoryStore);
    }
    return this.instance;
  }

  // query methods (getAll, getById, stats, filters)
  getAll(): ComputerStatusHistoryInterface[] {
    return this.computerStatusHistoryStore.historyEntries;
  }

  getByComputerId(computerId: number): ComputerStatusHistoryInterface[] {
    return this.computerStatusHistoryStore.historyEntries.filter((historyEntry) => historyEntry.computerId === computerId);
  }

  filterHistoryEntries(
    historyEntries: ComputerStatusHistoryInterface[] = this.getAll(),
    filters: { computerId?: number | 'all'; previousStatus?: ComputerStatus | 'all'; newStatus?: ComputerStatus | 'all' } = {},
  ): ComputerStatusHistoryInterface[] {
    const { computerId = 'all', previousStatus = 'all', newStatus = 'all' } = filters;

    return historyEntries.filter((historyEntry) => {
      const matchesComputer = computerId === 'all' || historyEntry.computerId === computerId;
      const matchesPreviousStatus = previousStatus === 'all' || historyEntry.previousStatus === previousStatus;
      const matchesNewStatus = newStatus === 'all' || historyEntry.newStatus === newStatus;

      return matchesComputer && matchesPreviousStatus && matchesNewStatus;
    });
  }

  getStatusChangeStats(historyEntries: ComputerStatusHistoryInterface[] = this.getAll()): {
    total: number;
    toActive: number;
    toMaintenance: number;
    toInactive: number;
  } {
    return {
      total: historyEntries.length,
      toActive: historyEntries.filter((entry) => entry.newStatus === 'active').length,
      toMaintenance: historyEntries.filter((entry) => entry.newStatus === 'maintenance').length,
      toInactive: historyEntries.filter((entry) => entry.newStatus === 'inactive').length,
    };
  }

  // mutation methods (create, update, delete)
  record(dto: RecordComputerStatusChange): void {
    this.computerStatusHistoryStore.addHistoryEntry(dto);
  }
}

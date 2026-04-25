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
  // query methods (getAll, getById, stats, filters)
  static getAll(): ComputerStatusHistoryInterface[] {
    return useComputerStatusHistoryStore().historyEntries;
  }

  static getByComputerId(computerId: number): ComputerStatusHistoryInterface[] {
    return useComputerStatusHistoryStore().historyEntries.filter((historyEntry) => historyEntry.computerId === computerId);
  }

  static filterHistoryEntries(
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

  static getStatusChangeStats(historyEntries: ComputerStatusHistoryInterface[] = this.getAll()): {
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
  static record(dto: RecordComputerStatusChange): void {
    useComputerStatusHistoryStore().addHistoryEntry(dto);
  }
}

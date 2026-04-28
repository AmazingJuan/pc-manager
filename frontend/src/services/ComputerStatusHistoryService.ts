// Author: Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { api } from '@api/client';
import type { ComputerStatus } from '@app-types/Computer';
import type { RecordComputerStatusChange } from '@dtos/computerStatusHistory/RecordComputerStatusChangeDTO';
import type { ComputerStatusHistoryInterface } from '@interfaces/ComputerStatusHistoryInterface';

// -------------------------------
export class ComputerStatusHistoryService {
  static async getAll(): Promise<ComputerStatusHistoryInterface[]> {
    const response = await api.get<ComputerStatusHistoryInterface[]>('/computers-history');
    if (!response.data) {
      throw new Error('Failed to get computer status history');
    }
    return response.data.map((entry) => ({ ...entry, changedAt: new Date(entry.changedAt) }));
  }

  static async getByComputerId(computerId: number): Promise<ComputerStatusHistoryInterface[]> {
    const response = await api.get<ComputerStatusHistoryInterface[]>(`/computers-history/computer/${computerId}`);
    if (!response.data) {
      throw new Error('Failed to get computer status history');
    }
    return response.data.map((entry) => ({ ...entry, changedAt: new Date(entry.changedAt) }));
  }

  static filterHistoryEntries(
    historyEntries: ComputerStatusHistoryInterface[] = [],
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

  static getStatusChangeStats(historyEntries: ComputerStatusHistoryInterface[] = []): {
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
  static async record(dto: RecordComputerStatusChange): Promise<void> {
    await api.post('/computers-history', dto);
  }
}

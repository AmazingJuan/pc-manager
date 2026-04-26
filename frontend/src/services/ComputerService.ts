// Author: Juan Pablo Avendaño & Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { ComputerStatus } from '@app-types/Computer';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import { ComputerStatusHistoryService } from '@services/ComputerStatusHistoryService';
import { useComputersStore } from '@stores/ComputerStore';

// -------------------------------
export class ComputerService {
  static filterComputers(
    computers: ComputerInterface[] = this.getAll(),
    filters: { searchQuery?: string; status?: ComputerStatus | 'all'; userId?: number | 'all' } = {},
  ): ComputerInterface[] {
    const { searchQuery = '', status = 'all', userId = 'all' } = filters;
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    return computers.filter((computer) => {
      const matchesSearch =
        !normalizedSearchQuery ||
        computer.name.toLowerCase().includes(normalizedSearchQuery) ||
        computer.location.toLowerCase().includes(normalizedSearchQuery);
      const matchesStatus = status === 'all' || computer.status === status;
      const matchesUser = userId === 'all' || computer.userId === userId;

      return matchesSearch && matchesStatus && matchesUser;
    });
  }

  static getAll(): ComputerInterface[] {
    return useComputersStore().computers;
  }

  static getById(id: number): ComputerInterface | undefined {
    return useComputersStore().computers.find((computer) => computer.id === id);
  }

  static getCountByStatus(computers: ComputerInterface[] = this.getAll()): { status: ComputerStatus; count: number }[] {
    const statusOrder: ComputerStatus[] = ['active', 'inactive', 'maintenance'];
    const counts = new Map<ComputerStatus, number>();

    for (const status of statusOrder) {
      counts.set(status, 0);
    }

    for (const computer of computers) {
      counts.set(computer.status, (counts.get(computer.status) ?? 0) + 1);
    }

    return statusOrder.map((status) => ({ status, count: counts.get(status) ?? 0 }));
  }

  static getStatusCount(status: ComputerStatus, computers: ComputerInterface[] = this.getAll()): number {
    return this.getCountByStatus(computers).find((entry) => entry.status === status)?.count ?? 0;
  }

  // mutation methods (create, update, delete)
  static create(computerData: CreateComputerDTO): ComputerInterface {
    return useComputersStore().addComputer(computerData);
  }

  static delete(id: number): boolean {
    return useComputersStore().deleteComputerById(id);
  }

  static update(id: number, computerData: EditComputerDTO): boolean {
    const computer = this.getById(id);

    if (computer && computerData.status && computer.status !== computerData.status) {
      ComputerStatusHistoryService.record({ computerId: id, previousStatus: computer.status, newStatus: computerData.status });
    }

    return useComputersStore().updateComputerById(id, computerData);
  }
}

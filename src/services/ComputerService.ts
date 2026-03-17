// Author: Juan Pablo Avendaño & Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { ComputerStatus } from '@app-types/Computer';
import { ComputerStatusHistoryService } from '@services/ComputerStatusHistoryService';
import { useComputersStore } from '@stores/ComputerStore';

export class ComputerService {
  private computersStore: ReturnType<typeof useComputersStore>;
  private computerStatusHistoryService: ComputerStatusHistoryService;
  private static instance: ComputerService;

  private constructor(computersStore: ReturnType<typeof useComputersStore>, computerStatusHistoryService: ComputerStatusHistoryService) {
    this.computersStore = computersStore;
    this.computerStatusHistoryService = computerStatusHistoryService;
  }

  static getInstance(
    computersStore?: ReturnType<typeof useComputersStore>,
    computerStatusHistoryService?: ComputerStatusHistoryService,
  ): ComputerService {
    if (!this.instance) {
      if (!computersStore || !computerStatusHistoryService) {
        throw new Error('You should put a store here');
      }
      this.instance = new ComputerService(computersStore, computerStatusHistoryService);
    }
    return this.instance;
  }

  getAll(): ComputerInterface[] {
    return this.computersStore.computers;
  }

  getById(id: number): ComputerInterface | undefined {
    return this.computersStore.computers.find((computer) => computer.id === id);
  }

  getCountByStatus(computers: ComputerInterface[] = this.getAll()): { status: ComputerStatus; count: number }[] {
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

  getStatusCount(status: ComputerStatus, computers: ComputerInterface[] = this.getAll()): number {
    return this.getCountByStatus(computers).find((entry) => entry.status === status)?.count ?? 0;
  }

  filterComputers(
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

  create(computerData: CreateComputerDTO): ComputerInterface {
    return this.computersStore.addComputer(computerData);
  }

  update(id: number, computerData: EditComputerDTO): boolean {
    const computer = this.getById(id);

    if (computer && computerData.status && computer.status !== computerData.status) {
      this.computerStatusHistoryService.record({ computerId: id, previousStatus: computer.status, newStatus: computerData.status });
    }

    return this.computersStore.updateComputerById(id, computerData);
  }

  delete(id: number): boolean {
    return this.computersStore.deleteComputerById(id);
  }
}

// Author: Juan Pablo Avendaño & Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import { StatusChangeService } from '@services/StatusChangeService';
import { useComputersStore } from '@stores/ComputerStore';

export class ComputerService {
  private computersStore: ReturnType<typeof useComputersStore>;
  private statusChangeService: StatusChangeService;
  private static instance: ComputerService;

  private constructor(computersStore: ReturnType<typeof useComputersStore>, statusChangeService: StatusChangeService) {
    this.computersStore = computersStore;
    this.statusChangeService = statusChangeService;
  }

  static getInstance(computersStore?: ReturnType<typeof useComputersStore>, statusChangeService?: StatusChangeService): ComputerService {
    if (!this.instance) {
      if (!computersStore || !statusChangeService) {
        throw new Error('You should put a store here');
      }
      this.instance = new ComputerService(computersStore, statusChangeService);
    }
    return this.instance;
  }

  getAll(): ComputerInterface[] {
    return this.computersStore.computers;
  }

  getById(id: number): ComputerInterface | undefined {
    return this.computersStore.computers.find((computer) => computer.id === id);
  }

  create(computerData: CreateComputerDTO): ComputerInterface {
    return this.computersStore.addComputer(computerData);
  }

  update(id: number, computerData: EditComputerDTO): boolean {
    const computer = this.getById(id);

    if (computer && computerData.status && computer.status !== computerData.status) {
      this.statusChangeService.record({ computerId: id, previousStatus: computer.status, newStatus: computerData.status });
    }

    return this.computersStore.updateComputerById(id, computerData);
  }

  delete(id: number): boolean {
    return this.computersStore.deleteComputerById(id);
  }
}

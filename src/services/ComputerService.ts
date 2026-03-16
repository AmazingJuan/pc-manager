// Author: Juan Pablo Avendaño y Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import { useComputersStore } from '@stores/ComputerStore';
import { StatusChangeService } from '@services/StatusChangeService';

export class ComputerService {
  private computersStore: ReturnType<typeof useComputersStore>;
  private static instance: ComputerService;

  private constructor(computersStore: ReturnType<typeof useComputersStore>) {
    this.computersStore = computersStore;
  }

  static getInstance(computersStore?: ReturnType<typeof useComputersStore>): ComputerService {
    if (!this.instance) {
      if (!computersStore) {
        throw new Error('You should put a store here');
      }
      this.instance = new ComputerService(computersStore);
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
      StatusChangeService.getInstance().record(id, computer.status, computerData.status);
    }

    return this.computersStore.updateComputerById(id, computerData);
  }

  delete(id: number): boolean {
    return this.computersStore.deleteComputerById(id);
  }
}
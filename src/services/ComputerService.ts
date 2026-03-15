// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';
import { useComputersStore } from '@stores/ComputerStore';

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
    const newId = this.computersStore.lastId + 1;
    this.computersStore.lastId = newId;

    const newComputer: ComputerInterface = {
      id: newId,
      ...computerData,
      createdAt: new Date(),
    };

    this.computersStore.computers.push(newComputer);
    return newComputer;
  }

  update(id: number, computerData: EditComputerDTO): boolean {
    const computer = this.computersStore.computers.find(
      (currentComputer) => currentComputer.id === id,
    );

    if (!computer) {
      return false;
    }

    Object.assign(computer, computerData);

    return true;
  }

  delete(id: number): boolean {
    const previousLength = this.computersStore.computers.length;
    this.computersStore.computers = this.computersStore.computers.filter(
      (computer) => computer.id !== id,
    );

    return this.computersStore.computers.length < previousLength;
  }
}

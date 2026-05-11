// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
import type { ComputerInterface } from '#shared/interfaces/computer.interface';
import { computers } from '#shared/data/computer.data';

export class ComputerService {
  static getAll(): ComputerInterface[] {
    return computers;
  }

  static getById(id: number): ComputerInterface | undefined {
    return computers.find((computer) => computer.id === id);
  }
}

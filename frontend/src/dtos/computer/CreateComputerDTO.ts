// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';

export type CreateComputerDTO = Omit<ComputerInterface, 'id' | 'createdAt'>;

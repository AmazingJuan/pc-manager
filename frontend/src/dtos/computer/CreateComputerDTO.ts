// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@app-types/Computer';

export type CreateComputerDTO = {
  name: string;
  location: string;
  status: ComputerStatus;
  purchaseDate: Date;
  warrantyExpirationDate: Date;
  notes: string;
  userId: number;
  componentIds: number[];
};

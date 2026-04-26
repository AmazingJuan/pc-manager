// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@app-types/Computer';

export interface ComputerInterface {
  id: number;
  name: string;
  location: string;
  status: ComputerStatus;
  purchaseDate: string;
  warrantyExpirationDate: string;
  notes: string;
  createdAt: string;
  userId: number | null;
}

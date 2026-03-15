// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@/types/Computer';

export interface ComputerInterface {
  id: number;
  name: string;
  location: string;
  userId: number;
  status: ComputerStatus;
  componentIds: number[];
  purchaseDate: Date;
  warrantyExpirationDate: Date;
  notes: string;
  createdAt: Date;
}

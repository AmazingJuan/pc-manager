// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@/types/Computer';

export interface StatusChangeInterface {
  id: number;
  computerId: number;
  previousStatus: ComputerStatus;
  newStatus: ComputerStatus;
  changedAt: Date;
}

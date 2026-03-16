// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@/types/Computer';

export interface RecordStatusChangeDTO {
  computerId: number;
  previousStatus: ComputerStatus;
  newStatus: ComputerStatus;
}
// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@app-types/Computer';

export interface ComputerStatusHistoryInterface {
  id: number;
  computerId: number;
  previousStatus: ComputerStatus;
  newStatus: ComputerStatus;
  changedAt: Date;
}

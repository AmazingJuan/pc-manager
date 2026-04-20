// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatusHistoryInterface } from '@interfaces/ComputerStatusHistoryInterface';

export type RecordComputerStatusChange = Omit<ComputerStatusHistoryInterface, 'id' | 'changedAt'>;

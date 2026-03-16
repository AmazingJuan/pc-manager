// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { StatusChangeInterface } from '@interfaces/StatusChangeInterface';

export type RecordStatusChangeDTO = Omit<StatusChangeInterface, 'id' | 'changedAt'>;

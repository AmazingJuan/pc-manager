// Author: Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import type { RecordStatusChangeDTO } from '@dtos/statusChange/RecordStatusChangeDTO';
import type { StatusChangeInterface } from '@interfaces/StatusChangeInterface';
import { useStatusChangesStore } from '@stores/StatusChangeStore';

export class StatusChangeService {
  private statusChangesStore: ReturnType<typeof useStatusChangesStore>;
  private static instance: StatusChangeService;

  private constructor(statusChangesStore: ReturnType<typeof useStatusChangesStore>) {
    this.statusChangesStore = statusChangesStore;
  }

  static getInstance(statusChangesStore?: ReturnType<typeof useStatusChangesStore>): StatusChangeService {
    if (!this.instance) {
      if (!statusChangesStore) {
        throw new Error('You should put a store here');
      }
      this.instance = new StatusChangeService(statusChangesStore);
    }
    return this.instance;
  }

  getAll(): StatusChangeInterface[] {
    return this.statusChangesStore.statusChanges;
  }

  getByComputerId(computerId: number): StatusChangeInterface[] {
    return this.statusChangesStore.statusChanges.filter(
      (statusChange) => statusChange.computerId === computerId,
    );
  }

  record(dto: RecordStatusChangeDTO): void {
    this.statusChangesStore.addStatusChange(dto.computerId, dto.previousStatus, dto.newStatus);
  }
}
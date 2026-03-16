// Author: Juan Pablo Avendaño y Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import { ComponentService } from '@services/ComponentService';
import { ComputerService } from '@services/ComputerService';
import { StatusChangeService } from '@services/StatusChangeService';
import { useAuthStore } from '@stores/AuthStore';
import { useComponentsStore } from '@stores/ComponentStore';
import { useComputersStore } from '@stores/ComputerStore';
import { useStatusChangesStore } from '@stores/StatusChangeStore';
import { UserService } from '@services/UserService';
import { useUsersStore } from '@stores/UsersStore';

export class ServiceInitializer {
  static initialize(): void {
    // stores
    const authStore = useAuthStore();
    const componentsStore = useComponentsStore();
    const computersStore = useComputersStore();
    const statusChangesStore = useStatusChangesStore();
    const usersStore = useUsersStore();
    // services
    AuthService.getInstance(authStore, usersStore);
    ComponentService.getInstance(componentsStore);
    ComputerService.getInstance(computersStore);
    StatusChangeService.getInstance(statusChangesStore);
    UserService.getInstance(usersStore);
  }
}
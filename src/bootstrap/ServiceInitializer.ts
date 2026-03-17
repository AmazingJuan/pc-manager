// Author: Juan Pablo Avendaño y Andru Quiroz
// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import { ComponentService } from '@services/ComponentService';
import { ComputerService } from '@services/ComputerService';
import { ComputerStatusHistoryService } from '@services/ComputerStatusHistoryService';
import { useAuthStore } from '@stores/AuthStore';
import { useComponentsStore } from '@stores/ComponentStore';
import { useComputerStatusHistoryStore } from '@stores/ComputerStatusHistoryStore';
import { useComputersStore } from '@stores/ComputerStore';
import { UserService } from '@services/UserService';
import { useUsersStore } from '@stores/UsersStore';

export class ServiceInitializer {
  static initialize(): void {
    // stores
    const authStore = useAuthStore();
    const componentsStore = useComponentsStore();
    const computersStore = useComputersStore();
    const computerStatusHistoryStore = useComputerStatusHistoryStore();
    const usersStore = useUsersStore();

    // services
    const computerStatusHistoryService = ComputerStatusHistoryService.getInstance(computerStatusHistoryStore);
    AuthService.getInstance(authStore, usersStore);
    ComponentService.getInstance(componentsStore);
    ComputerService.getInstance(computersStore, computerStatusHistoryService);
    UserService.getInstance(usersStore);
  }
}

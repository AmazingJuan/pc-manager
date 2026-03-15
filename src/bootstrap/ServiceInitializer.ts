// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { AuthService } from '@services/AuthService';
import { ComponentService } from '@services/ComponentService';
import { ComputerService } from '@services/ComputerService';
import { useAuthStore } from '@stores/AuthStore';
import { useComponentsStore } from '@stores/ComponentStore';
import { useComputersStore } from '@stores/ComputerStore';
import { UserService } from '@services/UserService';
import { useUsersStore } from '@stores/UsersStore';

export class ServiceInitializer {
  static initialize(): void {
    //stores
    const authStore = useAuthStore();
    const componentsStore = useComponentsStore();
    const computersStore = useComputersStore();
    const usersStore = useUsersStore();

    //services
    AuthService.getInstance(authStore, usersStore);
    ComponentService.getInstance(componentsStore);
    ComputerService.getInstance(computersStore);
    UserService.getInstance(usersStore);
  }
}

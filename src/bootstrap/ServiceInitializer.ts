// -------------------------------
// Own Imports
// -------------------------------
import { UserService } from '@services/UserService';
import { useUsersStore } from '@stores/UsersStore';

export class ServiceInitializer {
  static initialize(): void {
    const usersStore = useUsersStore();
    UserService.getInstance(usersStore);
  }
}

// -------------------------------
// Own Imports
// -------------------------------
import type { LoginDTO } from '@dtos/user/LoginDTO';
import type { RegisterDTO } from '@dtos/user/RegisterDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { useUsersStore } from '@stores/UsersStore';

// -------------------------------
// Third-Party Imports
// -------------------------------
export class UserService {
  private usersStore: ReturnType<typeof useUsersStore>;
  private static instance: UserService;

  private constructor(usersStore: ReturnType<typeof useUsersStore>) {
    this.usersStore = usersStore;
  }

  static getInstance(usersStore?: ReturnType<typeof useUsersStore>): UserService {
    if (!this.instance) {
      if (!usersStore) {
        throw new Error('You should put a store here');
      }
      this.instance = new UserService(usersStore);
    }
    return this.instance;
  }

  login(credentials: LoginDTO): boolean {
    const user = this.usersStore.users.find(
      (currentUser) =>
        currentUser.username === credentials.username &&
        currentUser.password === credentials.password,
    );

    if (user) {
      this.usersStore.setLoggedInUser(user);
      return true;
    }

    return false;
  }

  register(registerData: RegisterDTO): boolean {
    const userExists = this.usersStore.users.some(
      (currentUser) =>
        currentUser.username === registerData.username ||
        currentUser.email === registerData.email,
    );

    if (userExists) {
      return false;
    }

    const newId = this.usersStore.users.length
      ? Math.max(...this.usersStore.users.map((user) => user.id)) + 1
      : 1;

    const newUser: UserInterface = {
      id: newId,
      name: registerData.name,
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
      role: 'user',
      createdAt: new Date(),
      computers: null,
    };

    this.usersStore.users.push(newUser);
    this.usersStore.setLoggedInUser(newUser);

    return true;
  }
}

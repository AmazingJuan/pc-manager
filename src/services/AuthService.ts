// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { LoginDTO } from '@dtos/auth/LoginDTO';
import type { RegisterDTO } from '@dtos/auth/RegisterDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import { useAuthStore } from '@stores/AuthStore';
import { useUsersStore } from '@stores/UsersStore';

export class AuthService {
  private usersStore: ReturnType<typeof useUsersStore>;
  private authStore: ReturnType<typeof useAuthStore>;
  private static instance: AuthService;

  private constructor(
    authStore: ReturnType<typeof useAuthStore>,
    usersStore: ReturnType<typeof useUsersStore>,
  ) {
    this.authStore = authStore;
    this.usersStore = usersStore;
  }

  static getInstance(
    authStore?: ReturnType<typeof useAuthStore>,
    usersStore?: ReturnType<typeof useUsersStore>,
  ): AuthService {
    if (!this.instance) {
      if (!authStore || !usersStore) {
        throw new Error('You should put authStore and usersStore here');
      }
      this.instance = new AuthService(authStore, usersStore);
    }

    return this.instance;
  }

  login(credentials: LoginDTO): boolean {
    const user = this.usersStore.users.find(
      (currentUser) =>
        currentUser.username === credentials.username &&
        currentUser.password === credentials.password,
    );

    if (!user) {
      return false;
    }

    this.authStore.setLoggedInUser(user);
    return true;
  }

  register(registerData: RegisterDTO): boolean {
    const userExists = this.usersStore.users.some(
      (currentUser) =>
        currentUser.username === registerData.username || currentUser.email === registerData.email,
    );

    if (userExists) {
      return false;
    }

    const newUser: UserInterface = this.usersStore.addUser({
      ...registerData,
      role: 'user',
      computerIds: null,
    });
    this.authStore.setLoggedInUser(newUser);

    return true;
  }

  logout(): void {
    this.authStore.setLoggedInUser(null);
  }

  getLoggedInUser(): UserInterface | null {
    return this.authStore.loggedInUser;
  }

  hasLoggedInUser(): boolean {
    return this.authStore.hasLoggedInUser;
  }
}

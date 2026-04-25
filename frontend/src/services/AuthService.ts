// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { api } from '@api/client';
import type { LoginDTO } from '@dtos/auth/LoginDTO';
import type { RegisterDTO } from '@dtos/auth/RegisterDTO';
import { useAuthStore } from '@stores/AuthStore';
import { useUsersStore } from '@stores/UsersStore';
import type { UserInterface } from '@interfaces/UserInterface';
import axios from 'axios';

export class AuthService {
  public static async login(loginDto: LoginDTO): Promise<void> {
    try {
      const response = await api.post('/auth/login', loginDto);

      const accessToken = response.data.access_token ?? response.data.accessToken ?? '';
      const authStore = useAuthStore();
      authStore.setTokens(accessToken);
      authStore.setLoggedInUser(null);
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw ['Invalid credentials'];
      }

      throw error.response?.data?.message;
    }
  }

  public static async register(registerDto: RegisterDTO): Promise<void> {
    try {
      const response = await api.post('/auth/register', registerDto);

      const accessToken = response.data.access_token ?? response.data.accessToken ?? '';
      const authStore = useAuthStore();
      authStore.setTokens(accessToken);
      authStore.setLoggedInUser(null);
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw ['Registration failed'];
      }

      throw error.response?.data?.message;
    }
  }

  public static logout(): void {
    const authStore = useAuthStore();
    const usersStore = useUsersStore();

    authStore.clearSession();
    usersStore.$reset();
  }

  public static hasLoggedInUser(): boolean {
    return Boolean(useAuthStore().accessToken);
  }

  public static async getLoggedInUser(): Promise<UserInterface | null> {
    const response = await api.get('/auth/profile');
    if (!response.data) {
      throw new Error('Failed to get logged in user');
    }
    const authStore = useAuthStore();
    authStore.setLoggedInUser(response.data);

    return response.data;
  }

  public static getCachedLoggedInUser(): UserInterface | null {
    return useAuthStore().loggedInUser;
  }
}

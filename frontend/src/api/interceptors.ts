// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { api } from '@api/client';
import { AuthService } from '@services/AuthService';
import router from '@/router';

export function setupInterceptors(): void {
  api.interceptors.request.use((config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === 401) {
        AuthService.logout();
        const name = router.currentRoute.value.name;
        if (name !== 'login' && name !== 'register') {
          void router.replace({ name: 'login' });
        }
      }

      return Promise.reject(error);
    },
  );
}

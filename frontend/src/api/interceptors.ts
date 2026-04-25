// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { api } from '@api/client';
import { useAuthStore } from '@stores/AuthStore';

export function setupInterceptors(): void {
  const authStore = useAuthStore();

  api.interceptors.request.use((config) => {
    if (authStore.accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === 401) {
        authStore.clearSession();
      }

      return Promise.reject(error);
    },
  );
}

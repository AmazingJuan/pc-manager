// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useComponentsStore = defineStore('components', {
  state: () => ({
    components: [] as ComponentInterface[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    setComponents(components: ComponentInterface[]) {
      this.components = components;
    },

    addComponent(component: ComponentInterface) {
      this.components.push(component);
    },

    updateComponent(id: number, updated: Partial<ComponentInterface>) {
      const index = this.components.findIndex((c) => c.id === id);
      if (index !== -1) {
        this.components[index] = { ...this.components[index], ...updated };
      }
    },

    removeComponent(id: number) {
      this.components = this.components.filter((c) => c.id !== id);
    },

    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },
  },
});

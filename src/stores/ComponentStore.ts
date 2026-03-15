// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { components } from '@seeders/ComponentSeeder';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useComponentsStore = defineStore('components', {
  state: () => ({
    components: components,
    lastId: components.length,
  }),
  persist: true,
});

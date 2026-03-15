// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { components } from '@seeders/ComponentSeeder';
import type { ComponentInterface } from '@interfaces/ComponentInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useComponentsStore = defineStore('components', {
  state: () => ({ components: components, lastId: components.length }),
  actions: {
    getNextComponentId(): number {
      this.lastId += 1;
      return this.lastId;
    },

    addComponent(componentData: Omit<ComponentInterface, 'id'>): ComponentInterface {
      const newComponent: ComponentInterface = { id: this.getNextComponentId(), ...componentData };

      this.components.push(newComponent);
      return newComponent;
    },

    updateComponentById(id: number, componentData: Partial<Omit<ComponentInterface, 'id'>>): boolean {
      const component = this.components.find((currentComponent) => currentComponent.id === id);

      if (!component) {
        return false;
      }

      Object.assign(component, componentData);
      return true;
    },

    deleteComponentById(id: number): boolean {
      const previousLength = this.components.length;
      this.components = this.components.filter((component) => component.id !== id);

      return this.components.length < previousLength;
    },
  },
  persist: true,
});

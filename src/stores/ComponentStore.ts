// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { components } from '@seeders/ComponentSeeder';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { defineStore } from 'pinia';

export const useComponentsStore = defineStore('components', {
  state: () => ({
    components: components,
    lastId: components.reduce((maxId, component) => Math.max(maxId, component.id), 0),
  }),
  actions: {
    getNextComponentId(): number {
      this.lastId += 1;
      return this.lastId;
    },

    addComponent(componentData: CreateComponentDTO): ComponentInterface {
      const newComponent: ComponentInterface = {
        id: this.getNextComponentId(),
        ...componentData,
        createdAt: new Date(),
      };

      this.components.push(newComponent);
      return newComponent;
    },

    updateComponentById(id: number, componentData: EditComponentDTO): boolean {
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
  persist: {
    afterHydrate: (ctx) => {
      ctx.store.components = ctx.store.components.map(
        (component: ComponentInterface): ComponentInterface => ({
          ...component,
          createdAt: new Date(component.createdAt),
        }),
      );
    },
  },
});

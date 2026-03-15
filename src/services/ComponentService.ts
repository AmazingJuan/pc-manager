// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { useComponentsStore } from '@stores/ComponentStore';

export class ComponentService {
  private componentsStore: ReturnType<typeof useComponentsStore>;
  private static instance: ComponentService;

  private constructor(componentsStore: ReturnType<typeof useComponentsStore>) {
    this.componentsStore = componentsStore;
  }

  static getInstance(componentsStore?: ReturnType<typeof useComponentsStore>): ComponentService {
    if (!this.instance) {
      if (!componentsStore) {
        throw new Error('You should put a store here');
      }
      this.instance = new ComponentService(componentsStore);
    }
    return this.instance;
  }

  getAll(): ComponentInterface[] {
    return this.componentsStore.components;
  }

  getById(id: number): ComponentInterface | undefined {
    return this.componentsStore.components.find((component) => component.id === id);
  }

  create(componentData: Omit<ComponentInterface, 'id'>): ComponentInterface {
    return this.componentsStore.addComponent(componentData);
  }

  update(id: number, componentData: Partial<Omit<ComponentInterface, 'id'>>): boolean {
    return this.componentsStore.updateComponentById(id, componentData);
  }

  delete(id: number): boolean {
    return this.componentsStore.deleteComponentById(id);
  }
}

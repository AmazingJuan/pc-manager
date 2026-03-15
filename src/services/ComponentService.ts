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
    const newId = this.componentsStore.lastId + 1;
    this.componentsStore.lastId = newId;

    const newComponent: ComponentInterface = {
      id: newId,
      name: componentData.name,
      status: componentData.status,
    };

    this.componentsStore.components.push(newComponent);
    return newComponent;
  }

  update(id: number, componentData: Partial<Omit<ComponentInterface, 'id'>>): boolean {
    const component = this.componentsStore.components.find(
      (currentComponent) => currentComponent.id === id,
    );

    if (!component) {
      return false;
    }

    if (componentData.name !== undefined) {
      component.name = componentData.name;
    }

    if (componentData.status !== undefined) {
      component.status = componentData.status;
    }

    return true;
  }

  delete(id: number): boolean {
    const previousLength = this.componentsStore.components.length;
    this.componentsStore.components = this.componentsStore.components.filter(
      (component) => component.id !== id,
    );

    return this.componentsStore.components.length < previousLength;
  }
}

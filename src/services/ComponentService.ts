// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';
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

  create(componentData: CreateComponentDTO): ComponentInterface {
    const newId = this.componentsStore.lastId + 1;
    this.componentsStore.lastId = newId;

    const newComponent: ComponentInterface = {
      id: newId,
      name: componentData.name,
      location: componentData.location,
      userId: componentData.userId,
      status: componentData.status,
      componentIds: componentData.componentIds,
      purchaseDate: componentData.purchaseDate,
      warrantyExpirationDate: componentData.warrantyExpirationDate,
      notes: componentData.notes,
      createdAt: new Date(),
    };

    this.componentsStore.components.push(newComponent);
    return newComponent;
  }

  update(id: number, componentData: EditComponentDTO): boolean {
    const component = this.componentsStore.components.find(
      (currentComponent) => currentComponent.id === id,
    );

    if (!component) {
      return false;
    }

    if (componentData.name !== undefined) {
      component.name = componentData.name;
    }

    if (componentData.location !== undefined) {
      component.location = componentData.location;
    }

    if (componentData.userId !== undefined) {
      component.userId = componentData.userId;
    }

    if (componentData.status !== undefined) {
      component.status = componentData.status;
    }

    if (componentData.componentIds !== undefined) {
      component.componentIds = componentData.componentIds;
    }

    if (componentData.purchaseDate !== undefined) {
      component.purchaseDate = componentData.purchaseDate;
    }

    if (componentData.warrantyExpirationDate !== undefined) {
      component.warrantyExpirationDate = componentData.warrantyExpirationDate;
    }

    if (componentData.notes !== undefined) {
      component.notes = componentData.notes;
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

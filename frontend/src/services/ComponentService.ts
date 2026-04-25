// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComponentType } from '@app-types/Components';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';
import { useComponentsStore } from '@stores/ComponentStore';

// -------------------------------
// Class Definition
// -------------------------------
export class ComponentService {
  // query methods (getAll, getById, stats, filters)
  static filterComponents(
    components: ComponentInterface[] = this.getAll(),
    filters: { type?: string; status?: ComponentType | 'all'; fromDate?: string; toDate?: string } = {},
  ): ComponentInterface[] {
    const { type = 'all', status = 'all', fromDate = '', toDate = '' } = filters;

    return components.filter((component) => {
      const matchesType = type === 'all' || component.type === type;
      const matchesStatus = status === 'all' || component.status === status;
      const matchesFrom = !fromDate || component.purchaseDate >= fromDate;
      const matchesTo = !toDate || component.purchaseDate <= toDate;

      return matchesType && matchesStatus && matchesFrom && matchesTo;
    });
  }

  static getAll(): ComponentInterface[] {
    return useComponentsStore().components;
  }

  static getAveragePriceByType(components: ComponentInterface[] = this.getAll()): { type: string; averagePrice: number }[] {
    const grouped = new Map<string, { sum: number; count: number }>();

    for (const component of components) {
      const current = grouped.get(component.type);

      if (current) {
        current.sum += component.price;
        current.count += 1;
      } else {
        grouped.set(component.type, { sum: component.price, count: 1 });
      }
    }

    return Array.from(grouped.entries()).map(([type, totals]) => ({ type, averagePrice: Number((totals.sum / totals.count).toFixed(2)) }));
  }

  static getById(id: number): ComponentInterface | undefined {
    return useComponentsStore().components.find((component) => component.id === id);
  }

  static getCountByStatus(components: ComponentInterface[] = this.getAll()): { status: ComponentType; count: number }[] {
    const statusOrder: ComponentType[] = ['available', 'in-use', 'maintenance', 'damaged'];
    const counts = new Map<ComponentType, number>();

    for (const status of statusOrder) {
      counts.set(status, 0);
    }

    for (const component of components) {
      counts.set(component.status, (counts.get(component.status) ?? 0) + 1);
    }

    return statusOrder.map((status) => ({ status, count: counts.get(status) ?? 0 }));
  }

  static getCountByType(components: ComponentInterface[] = this.getAll()): { type: string; count: number }[] {
    const counts = new Map<string, number>();

    for (const component of components) {
      counts.set(component.type, (counts.get(component.type) ?? 0) + 1);
    }

    return Array.from(counts.entries()).map(([type, count]) => ({ type, count }));
  }

  // mutation methods (create, update, delete)
  static create(componentData: CreateComponentDTO): ComponentInterface {
    return useComponentsStore().addComponent(componentData);
  }

  static delete(id: number): boolean {
    return useComponentsStore().deleteComponentById(id);
  }

  static update(id: number, componentData: EditComponentDTO): boolean {
    return useComponentsStore().updateComponentById(id, componentData);
  }
}

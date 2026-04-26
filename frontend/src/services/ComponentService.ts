// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { api } from '@api/client';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComponentType } from '@app-types/Components';
import type { CreateComponentDTO } from '@dtos/components/CreateComponentDTO';
import type { EditComponentDTO } from '@dtos/components/EditComponentDTO';
import axios from 'axios';

// -------------------------------
// Class Definition
// -------------------------------
export class ComponentService {
  // query methods (getAll, getById, stats, filters)
  static async getAll(): Promise<ComponentInterface[]> {
    const response = await api.get('/components');
    if (!response.data) {
      throw new Error('Failed to get components');
    }
    return response.data as ComponentInterface[];
  }

  static async getById(id: number): Promise<ComponentInterface> {
    const response = await api.get(`/components/${id}`);
    if (!response.data) {
      throw new Error('Failed to get component');
    }
    return response.data as ComponentInterface;
  }

  static filterComponents(
    components: ComponentInterface[] = [],
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

  static getAveragePriceByType(components: ComponentInterface[]): { type: string; averagePrice: number }[] {
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

  static getCountByStatus(components: ComponentInterface[]): { status: ComponentType; count: number }[] {
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

  static getCountByType(components: ComponentInterface[]): { type: string; count: number }[] {
    const counts = new Map<string, number>();

    for (const component of components) {
      counts.set(component.type, (counts.get(component.type) ?? 0) + 1);
    }

    return Array.from(counts.entries()).map(([type, count]) => ({ type, count }));
  }

  // mutation methods (create, update, delete)
    static async create(componentData: CreateComponentDTO): Promise<ComponentInterface> {
    try {
      const response = await api.post('/components', componentData);
      if (!response.data) {
        throw new Error('Failed to create component');
      }
      return response.data as ComponentInterface;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw ['Failed to create component'];
      }

      throw error.response?.data?.message;
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const response = await api.delete(`/components/${id}`);
      if (response.status !== 204) {
        throw new Error('Failed to delete component');
      }
      return true;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw ['Failed to delete component'];
      }

      throw error.response?.data?.message;
    }
  }

  static async update(id: number, componentData: EditComponentDTO): Promise<ComponentInterface> {
    try {
      const response = await api.patch(`/components/${id}`, componentData);
      if (!response.data) {
        throw new Error('Failed to update component');
      }
      return response.data as ComponentInterface;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw ['Failed to update component'];
      }

      throw error.response?.data?.message;
    }
  }
}


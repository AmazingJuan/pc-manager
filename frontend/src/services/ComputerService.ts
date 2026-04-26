// Author: Juan Pablo Avendaño & Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { api } from '@api/client';
import { ComputerStatusHistoryService } from '@services/ComputerStatusHistoryService';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { ComputerStatus } from '@app-types/Computer';
import type { CreateComputerDTO } from '@dtos/computer/CreateComputerDTO';
import type { EditComputerDTO } from '@dtos/computer/EditComputerDTO';

// -------------------------------
// Third-Party Imports
// -------------------------------
import axios from 'axios';

export class ComputerService {
  static filterComputers(
    computers: ComputerInterface[],
    filters: { searchQuery?: string; status?: ComputerStatus | 'all'; userId?: number | 'all' } = {},
  ): ComputerInterface[] {
    const { searchQuery = '', status = 'all', userId = 'all' } = filters;
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    return computers.filter((computer) => {
      const matchesSearch =
        !normalizedSearchQuery ||
        computer.name.toLowerCase().includes(normalizedSearchQuery) ||
        computer.location.toLowerCase().includes(normalizedSearchQuery);
      const matchesStatus = status === 'all' || computer.status === status;
      const ownerId = computer.userId;
      const matchesUser = userId === 'all' || (userId === 0 ? ownerId == null || ownerId === 0 : ownerId === userId);

      return matchesSearch && matchesStatus && matchesUser;
    });
  }

  static async getAll(): Promise<ComputerInterface[]> {
    const response = await api.get<ComputerInterface[]>('/computers');
    if (!response.data) {
      throw new Error('Failed to get computers');
    }
    return response.data;
  }

  static async getById(id: number): Promise<ComputerInterface | undefined> {
    try {
      const response = await api.get<ComputerInterface>(`/computers/${id}`);
      if (!response.data) {
        return undefined;
      }
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return undefined;
      }
      throw error;
    }
  }

  static async getComponentsByComputerId(computerId: number): Promise<ComponentInterface[]> {
    const response = await api.get<ComponentInterface[]>(`/computers/${computerId}/components`);
    if (!response.data) {
      throw new Error('Failed to get computer components');
    }
    return response.data;
  }

  static getCountByStatus(computers: ComputerInterface[]): { status: ComputerStatus; count: number }[] {
    const statusOrder: ComputerStatus[] = ['active', 'inactive', 'maintenance'];
    const counts = new Map<ComputerStatus, number>();

    for (const s of statusOrder) {
      counts.set(s, 0);
    }

    for (const computer of computers) {
      counts.set(computer.status, (counts.get(computer.status) ?? 0) + 1);
    }

    return statusOrder.map((status) => ({ status, count: counts.get(status) ?? 0 }));
  }

  static getStatusCount(status: ComputerStatus, computers: ComputerInterface[]): number {
    return this.getCountByStatus(computers).find((entry) => entry.status === status)?.count ?? 0;
  }

  static async create(computerData: CreateComputerDTO): Promise<ComputerInterface> {
    const { notes, userId, ...rest } = computerData;
    const body: Record<string, unknown> = { ...rest };
    if (notes != null && notes !== '') {
      body.notes = notes;
    }
    if (userId > 0) {
      body.userId = userId;
    }

    try {
      const response = await api.post<ComputerInterface>('/computers', body);
      if (!response.data) {
        throw new Error('Failed to create computer');
      }
      return response.data;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw new Error('Failed to create computer');
      }
      throw error.response?.data?.message;
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const response = await api.delete(`/computers/${id}`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to delete computer');
      }
      return true;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw new Error('Failed to delete computer');
      }
      throw error.response?.data?.message;
    }
  }

  static async update(id: number, computerData: EditComputerDTO): Promise<ComputerInterface> {
    const previous = await this.getById(id);
    const body: Record<string, unknown> = {};
    (Object.keys(computerData) as (keyof EditComputerDTO)[]).forEach((key) => {
      const value = computerData[key];
      if (value === undefined) {
        return;
      }
      if (key === 'userId') {
        body.userId = typeof value === 'number' && value > 0 ? value : null;
        return;
      }
      (body as Record<string, unknown>)[key] = value;
    });

    try {
      const response = await api.patch<ComputerInterface>(`/computers/${id}`, body);
      if (!response.data) {
        throw new Error('Failed to update computer');
      }
      const updated = response.data;
      if (previous && previous.status !== updated.status) {
        ComputerStatusHistoryService.record({ computerId: id, previousStatus: previous.status, newStatus: updated.status });
      }
      return updated;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw new Error('Failed to update computer');
      }
      throw error.response?.data?.message;
    }
  }
}

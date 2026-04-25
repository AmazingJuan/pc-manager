// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { api } from '@api/client';
import type { CreateUserDTO } from '@dtos/user/CreateUserDTO';
import type { EditUserDTO } from '@dtos/user/EditUserDTO';
import type { UserInterface } from '@interfaces/UserInterface';
import axios from 'axios';
export class UserService {
  // query methods (getAll, getById, stats, filters)
  static async getAll(): Promise<UserInterface[]> {
    const response = await api.get('/users');
    if (!response.data) {
      throw new Error('Failed to get users');
    }
    return response.data as UserInterface[];
  }

  static async getById(id: number): Promise<UserInterface | undefined> {
    const response = await api.get(`/users/${id}`);
    if (!response.data) {
      throw new Error('Failed to get user');
    }
    return response.data as UserInterface;
  }

  // mutation methods (create, update, delete)
  static async create(userData: CreateUserDTO): Promise<UserInterface> {
    try {
      const response = await api.post('/users', userData);
      if (!response.data) {
        throw new Error('Failed to create user');
      }
      return response.data as UserInterface;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw ['Failed to create user'];
      }

      throw error.response?.data?.message;
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.status !== 204) {
        throw new Error('Failed to delete user');
      }
      return true;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw ['Failed to delete user'];
      }

      throw error.response?.data?.message;
    }
  }

  static async update(id: number, userData: EditUserDTO): Promise<UserInterface> {
    try {
      const response = await api.patch(`/users/${id}`, userData);
      if (!response.data) {
        throw new Error('Failed to update user');
      }
      return response.data as UserInterface;
    } catch (error: unknown) {
      if (!axios.isAxiosError(error)) {
        throw ['Failed to update user'];
      }

      throw error.response?.data?.message;
    }
  }
}

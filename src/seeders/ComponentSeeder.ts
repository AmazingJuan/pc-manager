// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';

export const components: ComponentInterface[] = [
  {
    id: 1,
    name: 'RAM 8GB',
    location: 'Warehouse A',
    userId: 1,
    status: 'available',
    componentIds: [],
    purchaseDate: new Date('2024-01-10'),
    warrantyExpirationDate: new Date('2027-01-10'),
    notes: 'Spare RAM module',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 2,
    name: 'SSD 256GB',
    location: 'Warehouse B',
    userId: 1,
    status: 'in-use',
    componentIds: [1],
    purchaseDate: new Date('2023-05-22'),
    warrantyExpirationDate: new Date('2026-05-22'),
    notes: 'Assigned to PC-02',
    createdAt: new Date('2023-05-22'),
  },
  {
    id: 3,
    name: 'GPU',
    location: 'Repair Center',
    userId: 0,
    status: 'maintenance',
    componentIds: [],
    purchaseDate: new Date('2022-11-05'),
    warrantyExpirationDate: new Date('2025-11-05'),
    notes: 'Under warranty repair',
    createdAt: new Date('2022-11-05'),
  },
  {
    id: 4,
    name: 'HDD 1TB',
    location: 'Warehouse A',
    userId: 0,
    status: 'damaged',
    componentIds: [],
    purchaseDate: new Date('2021-08-17'),
    warrantyExpirationDate: new Date('2024-08-17'),
    notes: 'Bad sectors detected',
    createdAt: new Date('2021-08-17'),
  },
];

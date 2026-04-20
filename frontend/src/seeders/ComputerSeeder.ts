// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';

export const computers: ComputerInterface[] = [
  {
    id: 1,
    name: 'PC-01',
    location: 'Main Office',
    userId: 1,
    status: 'active',
    componentIds: [1, 2],
    purchaseDate: new Date('2024-01-15'),
    warrantyExpirationDate: new Date('2027-01-15'),
    notes: 'Administration team computer',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    name: 'PC-02',
    location: 'Technical Support',
    userId: 2,
    status: 'inactive',
    componentIds: [3],
    purchaseDate: new Date('2023-06-10'),
    warrantyExpirationDate: new Date('2026-06-10'),
    notes: 'Pending reassignment',
    createdAt: new Date('2023-06-10'),
  },
  {
    id: 3,
    name: 'PC-03',
    location: 'Laboratory',
    userId: 0,
    status: 'maintenance',
    componentIds: [2, 4],
    purchaseDate: new Date('2022-11-05'),
    warrantyExpirationDate: new Date('2025-11-05'),
    notes: 'Under preventive maintenance',
    createdAt: new Date('2022-11-05'),
  },
];

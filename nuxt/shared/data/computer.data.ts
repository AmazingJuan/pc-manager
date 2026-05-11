// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
import type { ComputerInterface } from '#shared/interfaces/computer.interface';

export const computers: ComputerInterface[] = [
  {
    id: 1,
    name: 'Dell OptiPlex 7090',
    location: 'Administrative office',
    status: 'active',
    purchaseDate: '2024-02-12',
    warrantyExpirationDate: '2027-02-12',
    notes: 'Assigned to accounting with dual monitors and encrypted storage.',
    createdAt: '2024-02-13T09:20:00.000Z',
  },
  {
    id: 2,
    name: 'Lenovo ThinkCentre M70q',
    location: 'IT lab',
    status: 'maintenance',
    purchaseDate: '2023-08-21',
    warrantyExpirationDate: '2026-08-21',
    notes: 'Awaiting replacement RAM after diagnostics detected intermittent errors.',
    createdAt: '2023-08-22T14:35:00.000Z',
  },
  {
    id: 3,
    name: 'HP EliteBook 840 G10',
    location: 'Sales department',
    status: 'active',
    purchaseDate: '2025-01-15',
    warrantyExpirationDate: '2028-01-15',
    notes: 'Portable workstation used for client visits and inventory demos.',
    createdAt: '2025-01-16T11:05:00.000Z',
  },
  {
    id: 4,
    name: 'Acer Veriton X2690G',
    location: 'Storage room',
    status: 'inactive',
    purchaseDate: '2021-06-10',
    warrantyExpirationDate: '2024-06-10',
    notes: 'Retired desktop kept for spare parts and historical asset tracking.',
    createdAt: '2021-06-11T08:10:00.000Z',
  },
];

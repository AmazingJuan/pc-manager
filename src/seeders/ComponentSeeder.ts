// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';

export const components: ComponentInterface[] = [
  {
    id: 1,
    name: 'RAM 8GB',
    status: 'available',
    type: 'RAM',
    manufacturer: 'Kingston',
    model: 'KVR32N22S8',
    serialNumber: 'RAM-0001',
    purchaseDate: '2024-01-10',
    price: 45,
    createdAt: new Date('2024-01-10T00:00:00.000Z'),
  },
  {
    id: 2,
    name: 'SSD 256GB',
    status: 'in-use',
    type: 'SSD',
    manufacturer: 'Samsung',
    model: '870 EVO',
    serialNumber: 'SSD-0002',
    purchaseDate: '2023-05-22',
    price: 65,
    createdAt: new Date('2023-05-22T00:00:00.000Z'),
  },
  {
    id: 3,
    name: 'GPU RTX 3060',
    status: 'maintenance',
    type: 'GPU',
    manufacturer: 'NVIDIA',
    model: 'RTX 3060',
    serialNumber: 'GPU-0003',
    purchaseDate: '2022-11-05',
    price: 320,
    createdAt: new Date('2022-11-05T00:00:00.000Z'),
  },
  {
    id: 4,
    name: 'HDD 1TB',
    status: 'damaged',
    type: 'HDD',
    manufacturer: 'Seagate',
    model: 'Barracuda',
    serialNumber: 'HDD-0004',
    purchaseDate: '2021-08-17',
    price: 55,
    createdAt: new Date('2021-08-17T00:00:00.000Z'),
  },
];

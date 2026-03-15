// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';

export const components: ComponentInterface[] = [
  { id: 1, name: 'RAM 8GB', status: 'available' },
  { id: 2, name: 'SSD 256GB', status: 'in-use' },
  { id: 3, name: 'GPU', status: 'maintenance' },
  { id: 4, name: 'HDD 1TB', status: 'damaged' },
];

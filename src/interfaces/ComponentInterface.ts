// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentType } from '@/types/Components';

export interface ComponentInterface {
  id: number;
  name: string;
  status: ComponentType;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  price: number;
  createdAt: Date;
}

// Author: Juan Manuel Zapata

export interface ComponentInterface {
  id: number;
  name: string;
  location: string;
  userId: number;
  status: 'available' | 'in-use' | 'maintenance' | 'damaged';
  componentIds: number[];
  purchaseDate: Date;
  warrantyExpirationDate: Date;
  notes: string;
  createdAt: Date;
}
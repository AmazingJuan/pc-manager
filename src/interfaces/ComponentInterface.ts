export interface ComponentInterface {
  id: number;
  name: string;
  status: 'available' | 'in-use' | 'maintenance' | 'damaged';
}

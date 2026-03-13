export interface ComputerInterface {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
}

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@/interfaces/Computer';

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  computers: ComputerInterface[] | null;
}

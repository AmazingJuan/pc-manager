// Author: Juan Pablo Avendaño

import type { UserRole } from '@app-types/User';

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

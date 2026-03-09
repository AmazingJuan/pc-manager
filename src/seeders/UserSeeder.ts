// -------------------------------
// Own Imports
// -------------------------------
import type { UserInterface } from '@interfaces/UserInterface';

export const users: UserInterface[] = [
  {
    id: 1,
    name: 'Test admin',
    username: 'admin',
    email: 'test@example.com',
    password: 'admin',
    role: 'admin',
    createdAt: new Date(),
    computers: null,
  },
];

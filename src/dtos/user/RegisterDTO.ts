// -------------------------------
// Own Imports
// -------------------------------
import type { UserInterface } from '@interfaces/UserInterface';

export type RegisterDTO = Omit<UserInterface, 'id' | 'role' | 'createdAt' | 'computers'>;

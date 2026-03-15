// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { UserInterface } from '@interfaces/UserInterface';

export type LoginDTO = Pick<UserInterface, 'username' | 'password'>;

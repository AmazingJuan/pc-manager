// Author: Juan Pablo Avendaño
import type { UserInterface } from '@interfaces/UserInterface';

export type EditUserDTO = Omit<UserInterface, 'id' | 'createdAt'>;

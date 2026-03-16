// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentInterface } from '@interfaces/ComponentInterface';

export type CreateComponentDTO = Omit<ComponentInterface, 'id' | 'createdAt'>;

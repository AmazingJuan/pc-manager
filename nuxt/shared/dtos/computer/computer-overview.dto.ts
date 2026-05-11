// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
import type { ComputerInterface } from '#shared/interfaces/computer.interface';

export type ComputerOverviewDto = Pick<ComputerInterface, 'id' | 'name' | 'location' | 'status'>;

// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
import type { ComputerOverviewDto } from '#shared/dtos/computer/computer-overview.dto';
import { ComputerService } from '../../services/computer.service';

export default defineEventHandler((): ComputerOverviewDto[] =>
  ComputerService.getAll().map(({ id, name, location, status }) => ({ id, name, location, status })),
);

// Author: Juan Manuel Zapata

// -------------------------------
// Third-Party Imports
import { createError } from 'h3';

// -------------------------------
// Own Imports
import type { ComputerDetailDto } from '#shared/dtos/computer/computer-detail.dto';
import { ComputerService } from '../../services/computer.service';

export default defineEventHandler((event): ComputerDetailDto => {
  const id = Number(event.context.params?.id);

  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Computer id must be a number' });
  }

  const computer = ComputerService.getById(id);

  if (!computer) {
    throw createError({ statusCode: 404, statusMessage: 'Computer not found' });
  }

  return computer;
});

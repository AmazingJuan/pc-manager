// Author: Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { COMPUTER_STATUSES } from '@computers/constants';
import type { ComputerStatus } from '@computers/types/computer-status.type';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateComputerStatusHistoryDto {
  @Type(() => Number)
  @IsInt({ message: 'Computer id must be an integer' })
  @Min(1, { message: 'Computer id must be at least 1' })
  computerId: number;

  @IsString({ message: 'Previous status must be text' })
  @IsNotEmpty({ message: 'Previous status is required' })
  @IsIn(COMPUTER_STATUSES, { message: 'Previous status is not valid' })
  previousStatus: ComputerStatus;

  @IsString({ message: 'New status must be text' })
  @IsNotEmpty({ message: 'New status is required' })
  @IsIn(COMPUTER_STATUSES, { message: 'New status is not valid' })
  newStatus: ComputerStatus;
}

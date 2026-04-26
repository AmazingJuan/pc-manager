// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerStatus } from '@computers/types/computer-status.type';
import { COMPUTER_STATUSES } from '@computers/constants';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateComputerDto {
  @IsString({ message: 'Name must be text' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name: string;

  @IsString({ message: 'Location must be text' })
  @IsNotEmpty({ message: 'Location is required' })
  @MinLength(2, { message: 'Location must be at least 2 characters' })
  @MaxLength(100, { message: 'Location must be at most 100 characters' })
  location: string;

  @IsString({ message: 'Status must be text' })
  @IsNotEmpty({ message: 'Status is required' })
  @IsIn(COMPUTER_STATUSES, { message: 'Status is not valid' })
  status: ComputerStatus;

  @Type(() => Date)
  @IsNotEmpty({ message: 'Purchase date is required' })
  @IsDate({ message: 'Purchase date is not valid' })
  purchaseDate: Date;

  @Type(() => Date)
  @IsNotEmpty({ message: 'Warranty expiration date is required' })
  @IsDate({ message: 'Warranty expiration is not valid' })
  warrantyExpirationDate: Date;

  @IsOptional()
  @IsString({ message: 'Notes must be text' })
  @MaxLength(500, { message: 'Notes must be at most 500 characters' })
  notes?: string;

  // Relations
  @IsArray({ message: 'Component ids must be an array' })
  @ArrayMinSize(1, { message: 'Computer must have at least one component' })
  @IsInt({ each: true, message: 'Each component id must be an integer' })
  @Min(1, { each: true, message: 'Each component id must be at least 1' })
  componentIds: number[];

  @IsOptional()
  @ValidateIf((o: CreateComputerDto) => o.userId != null)
  @Type(() => Number)
  @IsInt({ message: 'User id must be an integer' })
  @Min(1, { message: 'User id must be at least 1' })
  userId?: number | null;
}

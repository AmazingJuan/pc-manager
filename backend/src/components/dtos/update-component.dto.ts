// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentStatus } from '@components/types/component-status.type';
import { COMPONENT_STATUSES } from '@components/constants';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateComponentDto {
  @IsOptional()
  @IsString({ message: 'Name must be text' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Status must be text' })
  @IsNotEmpty({ message: 'Status cannot be empty' })
  @IsIn(COMPONENT_STATUSES, { message: 'Status is not valid' })
  status?: ComponentStatus;

  @IsOptional()
  @IsString({ message: 'Type must be text' })
  @IsNotEmpty({ message: 'Type cannot be empty' })
  @MinLength(2, { message: 'Type must be at least 2 characters' })
  @MaxLength(60, { message: 'Type must be at most 60 characters' })
  type?: string;

  @IsOptional()
  @IsString({ message: 'Manufacturer must be text' })
  @IsNotEmpty({ message: 'Manufacturer cannot be empty' })
  @MinLength(2, { message: 'Manufacturer must be at least 2 characters' })
  @MaxLength(80, { message: 'Manufacturer must be at most 80 characters' })
  manufacturer?: string;

  @IsOptional()
  @IsString({ message: 'Model must be text' })
  @IsNotEmpty({ message: 'Model cannot be empty' })
  @MinLength(1, { message: 'Model must be at least 1 character' })
  @MaxLength(80, { message: 'Model must be at most 80 characters' })
  model?: string;

  @IsOptional()
  @IsString({ message: 'Serial number must be text' })
  @IsNotEmpty({ message: 'Serial number cannot be empty' })
  @MinLength(3, { message: 'Serial number must be at least 3 characters' })
  @MaxLength(100, { message: 'Serial number must be at most 100 characters' })
  serialNumber?: string;

  @IsOptional()
  @Type(() => Date)
  @IsNotEmpty({ message: 'Purchase date cannot be empty' })
  @IsDate({ message: 'Purchase date is not valid' })
  purchaseDate?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a valid number' })
  @IsNotEmpty({ message: 'Price cannot be empty' })
  @Min(0, { message: 'Price cannot be negative' })
  price?: number;
}

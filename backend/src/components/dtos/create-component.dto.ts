// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentStatus } from '@components/types/component-status.type';
import { COMPONENT_STATUSES } from '@components/constants';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateComponentDto {
  @IsString({ message: 'Name must be text' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name: string;

  @IsString({ message: 'Status must be text' })
  @IsNotEmpty({ message: 'Status is required' })
  @IsIn(COMPONENT_STATUSES, { message: 'Status is not valid' })
  status: ComponentStatus;

  @IsString({ message: 'Type must be text' })
  @IsNotEmpty({ message: 'Type is required' })
  @MinLength(2, { message: 'Type must be at least 2 characters' })
  @MaxLength(60, { message: 'Type must be at most 60 characters' })
  type: string;

  @IsString({ message: 'Manufacturer must be text' })
  @IsNotEmpty({ message: 'Manufacturer is required' })
  @MinLength(2, { message: 'Manufacturer must be at least 2 characters' })
  @MaxLength(80, { message: 'Manufacturer must be at most 80 characters' })
  manufacturer: string;

  @IsString({ message: 'Model must be text' })
  @IsNotEmpty({ message: 'Model is required' })
  @MinLength(1, { message: 'Model must be at least 1 character' })
  @MaxLength(80, { message: 'Model must be at most 80 characters' })
  model: string;

  @IsString({ message: 'Serial number must be text' })
  @IsNotEmpty({ message: 'Serial number is required' })
  @MinLength(3, { message: 'Serial number must be at least 3 characters' })
  @MaxLength(100, { message: 'Serial number must be at most 100 characters' })
  serialNumber: string;

  @Type(() => Date)
  @IsNotEmpty({ message: 'Purchase date is required' })
  @IsDate({ message: 'Purchase date is not valid' })
  purchaseDate: Date;

  @IsNumber({}, { message: 'Price must be a valid number' })
  @IsNotEmpty({ message: 'Price is required' })
  @Min(0, { message: 'Price cannot be negative' })
  price: number;
}

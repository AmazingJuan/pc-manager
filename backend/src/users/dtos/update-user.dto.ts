// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { UserRole } from '@users/types/user-role.type';
import { USER_ROLES } from '@users/constants';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be text.' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @MinLength(2, { message: 'Name must be at least 2 characters long.' })
  @MaxLength(100, { message: 'Name must be at most 100 characters long.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Username must be text.' })
  @IsNotEmpty({ message: 'Username cannot be empty.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(20, { message: 'Username must be at most 20 characters long.' })
  username?: string;

  @IsOptional()
  @IsString({ message: 'Email must be text.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail({}, { message: 'Email format is invalid.' })
  @MinLength(3, { message: 'Email must be at least 3 characters long.' })
  @MaxLength(100, { message: 'Email must be at most 100 characters long.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Password must be text.' })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'Role must be text.' })
  @IsNotEmpty({ message: 'Role cannot be empty.' })
  @IsIn(USER_ROLES, { message: 'Role must be either admin or user.' })
  role?: UserRole;
}

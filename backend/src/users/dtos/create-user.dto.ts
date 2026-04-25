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
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be text.' })
  @IsNotEmpty({ message: 'Name is required.' })
  @MinLength(2, { message: 'Name must be at least 2 characters long.' })
  @MaxLength(100, { message: 'Name must be at most 100 characters long.' })
  name: string;

  @IsString({ message: 'Username must be text.' })
  @IsNotEmpty({ message: 'Username is required.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(20, { message: 'Username must be at most 20 characters long.' })
  username: string;

  @IsString({ message: 'Email must be text.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email format is invalid.' })
  @MinLength(3, { message: 'Email must be at least 3 characters long.' })
  @MaxLength(100, { message: 'Email must be at most 100 characters long.' })
  email: string;

  @IsString({ message: 'Password must be text.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;

  @IsString({ message: 'Role must be text.' })
  @IsNotEmpty({ message: 'Role is required.' })
  @IsIn(USER_ROLES, { message: 'Role must be either admin or user.' })
  role: UserRole;
}

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
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(USER_ROLES)
  role: UserRole;
}

// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { type UserRole } from '@users/types/user-role.type';
import { User } from '@users/entities/user.entity';

export class UserResponseDto {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role as UserRole,
      createdAt: user.createdAt,
    };
  }

  static fromEntities(users: User[]): UserResponseDto[] {
    return users.map((user) => this.fromEntity(user));
  }
}

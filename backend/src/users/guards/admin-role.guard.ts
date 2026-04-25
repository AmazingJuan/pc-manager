// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { AuthenticatedRequest } from '@auth/types/authenticated-request.type';
import { UsersService } from '@users/users.service';
import { USER_ROLES } from '@users/constants';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userId = request.user?.sub;

    if (!userId) {
      throw new UnauthorizedException('User id not found in token payload');
    }

    const user = await this.usersService.findById(userId);

    if (user.role !== USER_ROLES[0]) {
      throw new ForbiddenException('Admin role required');
    }

    return true;
  }
}

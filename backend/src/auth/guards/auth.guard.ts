// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { AuthenticatedRequest } from '@auth/types/authenticated-request.type';
import type { JwtPayload } from '@auth/types/jwt-payload.type';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const decodedPayload: Record<string, unknown> =
        await this.jwtService.verifyAsync(token);
      request.user = this.toJwtPayload(decodedPayload);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private toJwtPayload(payload: Record<string, unknown>): JwtPayload {
    if (
      typeof payload.sub === 'number' &&
      typeof payload.username === 'string'
    ) {
      return {
        sub: payload.sub,
        username: payload.username,
      };
    }

    throw new UnauthorizedException('Invalid token payload');
  }
}

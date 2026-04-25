// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { AuthGuard } from '@/auth/guards/auth.guard';
import { AuthService } from '@auth/auth.service';
import type { JwtPayload } from '@auth/types/jwt-payload.type';
import { LoginDto } from '@auth/dtos/login.dto';
import { UserResponseDto } from '@users/dtos/user-response.dto';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req: Request & { user: JwtPayload },
  ): Promise<UserResponseDto> {
    const user = await this.authService.getProfile(req.user);

    return user;
  }
}

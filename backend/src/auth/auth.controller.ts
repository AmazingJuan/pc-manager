// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { AuthGuard } from '@/auth/guards/auth.guard';
import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dtos/login.dto';
import { User } from '@users/entities/user.entity';

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
  getProfile(@Request() req: Request & { user: User }): Promise<User> {
    return Promise.resolve(req.user);
  }
}

// Author: Juan Pablo Avendaño

// -------------------------------
// Third-Party Imports
// -------------------------------
import { JwtModule } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from '@users/users.module';

// -------------------------------
// Own Imports
// -------------------------------
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { JWT_SECRET } from '@auth/constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}

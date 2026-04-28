// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { AdminRoleGuard } from '@users/guards/admin-role.guard';
import { AuthModule } from '@/auth/auth.module';
import { User } from '@users/entities/user.entity';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, AdminRoleGuard],
  exports: [UsersService, AdminRoleGuard],
})
export class UsersModule {}

// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { User } from '@users/entities/user.entity';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

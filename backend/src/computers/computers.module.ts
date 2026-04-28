// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { AuthModule } from '@/auth/auth.module';
import { ComponentsModule } from '@components/components.module';
import { Computer } from '@computers/entities/computer.entity';
import { ComputersController } from '@computers/computers.controller';
import { ComputersService } from '@computers/computers.service';
import { UsersModule } from '@users/users.module';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Computer]),
    UsersModule,
    AuthModule,
    ComponentsModule,
  ],
  controllers: [ComputersController],
  providers: [ComputersService],
})
export class ComputersModule {}

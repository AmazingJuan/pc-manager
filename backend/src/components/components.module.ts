// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import { AuthModule } from '@/auth/auth.module';
import { Component } from '@components/entities/component.entity';
import { ComponentsController } from '@components/components.controller';
import { ComponentsService } from '@components/components.service';
import { UsersModule } from '@users/users.module';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Component]), UsersModule, AuthModule],
  controllers: [ComponentsController],
  providers: [ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}

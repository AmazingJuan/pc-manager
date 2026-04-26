// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import { Component } from '@components/entities/component.entity';
import { ComponentsController } from '@components/components.controller';
import { ComponentsService } from '@components/components.service';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  controllers: [ComponentsController],
  providers: [ComponentsService],
})
export class ComponentsModule {}

// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import { AdminRoleGuard } from '@users/guards/admin-role.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { CreateComponentDto } from '@components/dtos/create-component.dto';
import { UpdateComponentDto } from '@components/dtos/update-component.dto';
import { Component } from '@components/entities/component.entity';
import { ComponentsService } from '@components/components.service';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('components')
@UseGuards(AuthGuard)
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Get()
  findAll(): Promise<Component[]> {
    return this.componentsService.findAll();
  }

  @Post()
  @UseGuards(AdminRoleGuard)
  create(@Body() createComponentDto: CreateComponentDto): Promise<Component> {
    return this.componentsService.create(createComponentDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Component> {
    return this.componentsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AdminRoleGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComponentDto: UpdateComponentDto,
  ): Promise<Component> {
    return this.componentsService.update(id, updateComponentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AdminRoleGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.componentsService.delete(id);
  }
}

// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
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
  Patch,
  Post,
} from '@nestjs/common';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Get()
  findAll(): Promise<Component[]> {
    return this.componentsService.findAll();
  }

  @Post()
  create(@Body() createComponentDto: CreateComponentDto): Promise<Component> {
    return this.componentsService.create(createComponentDto);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Component> {
    return this.componentsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateComponentDto: UpdateComponentDto,
  ): Promise<Component> {
    return this.componentsService.update(id, updateComponentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<void> {
    return this.componentsService.delete(id);
  }
}

// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import { CreateComponentDto } from '@components/dtos/create-component.dto';
import { UpdateComponentDto } from '@components/dtos/update-component.dto';
import { Component } from '@components/entities/component.entity';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private readonly componentsRepository: Repository<Component>,
  ) {}

  async findAll(): Promise<Component[]> {
    return this.componentsRepository.find();
  }

  async create(createComponentDto: CreateComponentDto): Promise<Component> {
    const component = this.componentsRepository.create(createComponentDto);

    return this.componentsRepository.save(component);
  }

  async findById(id: number): Promise<Component> {
    const component = await this.componentsRepository.findOneBy({ id });

    if (!component) {
      throw new NotFoundException('Component not found');
    }

    return component;
  }

  async update(id: number, updateComponentDto: UpdateComponentDto): Promise<Component> {
    const component = await this.findById(id);

    const updatedComponent = this.componentsRepository.create({
      ...component,
      ...updateComponentDto,
    });

    return this.componentsRepository.save(updatedComponent);
  }

  async delete(id: number): Promise<void> {
    const component = await this.findById(id);

    await this.componentsRepository.remove(component);
  }
}

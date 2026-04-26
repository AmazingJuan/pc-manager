// Author: Juan Manuel Zapata

// -------------------------------
// Own Imports
// -------------------------------
import { Component } from '@components/entities/component.entity';
import { CreateComponentDto } from '@components/dtos/create-component.dto';
import { UpdateComponentDto } from '@components/dtos/update-component.dto';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    // Verify serial number is not already registered
    const existingBySerial = await this.componentsRepository.findOneBy({
      serialNumber: createComponentDto.serialNumber,
    });

    if (existingBySerial) {
      throw new ConflictException('Serial number already exists');
    }

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

  async findByIds(ids: number[]): Promise<Component[]> {
    if (ids.length === 0) {
      return [];
    }
    return this.componentsRepository.find({
      where: { id: In([...new Set(ids)]) },
    });
  }

  async findByIdsOrThrow(componentIds: number[]): Promise<Component[]> {
    const unique = [...new Set(componentIds)];
    const found = await this.findByIds(unique);
    if (found.length !== unique.length) {
      throw new BadRequestException('One or more component ids are invalid');
    }
    return found;
  }

  async update(
    id: number,
    updateComponentDto: UpdateComponentDto,
  ): Promise<Component> {
    const component = await this.findById(id);

    // Verify serial number is not taken by another component
    if (updateComponentDto.serialNumber) {
      const existingBySerial = await this.componentsRepository.findOneBy({
        serialNumber: updateComponentDto.serialNumber,
      });

      if (existingBySerial && existingBySerial.id !== component.id) {
        throw new ConflictException('Serial number already exists');
      }
    }

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

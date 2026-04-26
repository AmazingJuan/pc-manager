// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { Computer } from '@computers/entities/computer.entity';
import { ComponentsService } from '@components/components.service';
import { CreateComputerDto } from '@computers/dto/create-computer.dto';
import { UpdateComputerDto } from '@computers/dto/update-computer.dto';
import { User } from '@users/entities/user.entity';
import { UsersService } from '@users/users.service';
import { WarrantyDatesUtil } from '@utils/warranty-dates.util';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const defaultRelations = { user: true, components: true } as const;

@Injectable()
export class ComputersService {
  constructor(
    @InjectRepository(Computer)
    private readonly computerRepository: Repository<Computer>,
    private readonly componentsService: ComponentsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createComputerDto: CreateComputerDto): Promise<Computer> {
    WarrantyDatesUtil.assertWarrantyOnOrAfterPurchase(
      createComputerDto.purchaseDate,
      createComputerDto.warrantyExpirationDate,
    );
    if (createComputerDto.userId != null) {
      await this.usersService.assertUserExists(createComputerDto.userId);
    }
    const components = await this.componentsService.findByIdsOrThrow(
      createComputerDto.componentIds,
    );

    const { userId, ...scalars } = createComputerDto;
    const computer = this.computerRepository.create({
      ...scalars,
      notes: createComputerDto.notes ?? '',
      user: userId != null ? ({ id: userId } as User) : null,
      components,
    });
    const saved = await this.computerRepository.save(computer);
    return this.findByIdOrFail(saved.id);
  }

  async findAll(): Promise<Computer[]> {
    return this.computerRepository.find({ relations: defaultRelations });
  }

  async findOne(id: number): Promise<Computer> {
    return this.findByIdOrFail(id);
  }

  async update(
    id: number,
    updateComputerDto: UpdateComputerDto,
  ): Promise<Computer> {
    const computer = await this.findByIdOrFail(id);
    const purchase = updateComputerDto.purchaseDate ?? computer.purchaseDate;
    const warranty =
      updateComputerDto.warrantyExpirationDate ??
      computer.warrantyExpirationDate;
    WarrantyDatesUtil.assertWarrantyOnOrAfterPurchase(purchase, warranty);

    const { componentIds, ...scalars } = updateComputerDto;
    Object.assign(
      computer,
      Object.fromEntries(
        Object.entries(scalars).filter(([, v]) => v !== undefined),
      ),
    );

    if (updateComputerDto.userId !== undefined) {
      if (updateComputerDto.userId == null) {
        computer.user = null;
      } else {
        await this.usersService.assertUserExists(updateComputerDto.userId);
        computer.user = { id: updateComputerDto.userId } as User;
      }
    }
    if (componentIds !== undefined) {
      computer.components =
        await this.componentsService.findByIdsOrThrow(componentIds);
    }

    await this.computerRepository.save(computer);
    return this.findByIdOrFail(id);
  }

  async remove(id: number): Promise<void> {
    const computer = await this.findByIdOrFail(id);
    await this.computerRepository.remove(computer);
  }

  private async findByIdOrFail(id: number): Promise<Computer> {
    const computer = await this.computerRepository.findOne({
      where: { id },
      relations: defaultRelations,
    });
    if (!computer) {
      throw new NotFoundException('Computer not found');
    }
    return computer;
  }
}

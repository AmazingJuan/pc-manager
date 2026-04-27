// Author: Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { Computer } from '@computers/entities/computer.entity';
import { ComputerStatusHistory } from '@computers-history/entities/computer-status-history.entity';
import { CreateComputerStatusHistoryDto } from '@computers-history/dto/create-computer-status-history.dto';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ComputersHistoryService {
  constructor(
    @InjectRepository(ComputerStatusHistory)
    private readonly historyRepository: Repository<ComputerStatusHistory>,
  ) {}

  async create(
    dto: CreateComputerStatusHistoryDto,
  ): Promise<ComputerStatusHistory> {
    const entry = this.historyRepository.create({
      previousStatus: dto.previousStatus,
      newStatus: dto.newStatus,
      computer: { id: dto.computerId } as Computer,
    });
    return this.historyRepository.save(entry);
  }

  async findAll(): Promise<ComputerStatusHistory[]> {
    return this.historyRepository.find();
  }

  async findByComputerId(
    computerId: number,
  ): Promise<ComputerStatusHistory[]> {
    return this.historyRepository.find({ where: { computer: { id: computerId } } });
  }
}

// Author: Andru Quiroz

// -------------------------------
// Own Imports
// -------------------------------
import { ComputersHistoryService } from '@computers-history/computers-history.service';
import { CreateComputerStatusHistoryDto } from '@computers-history/dto/create-computer-status-history.dto';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('computers-history')
export class ComputersHistoryController {
  constructor(
    private readonly computersHistoryService: ComputersHistoryService,
  ) {}

  @Post()
  create(@Body() dto: CreateComputerStatusHistoryDto) {
    return this.computersHistoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.computersHistoryService.findAll();
  }

  @Get('computer/:computerId')
  findByComputerId(@Param('computerId', ParseIntPipe) computerId: number) {
    return this.computersHistoryService.findByComputerId(computerId);
  }
}

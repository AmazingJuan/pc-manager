// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { ComputersService } from '@computers/computers.service';
import { CreateComputerDto } from '@computers/dto/create-computer.dto';
import { UpdateComputerDto } from '@computers/dto/update-computer.dto';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('computers')
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Post()
  create(@Body() createComputerDto: CreateComputerDto) {
    return this.computersService.create(createComputerDto);
  }

  @Get()
  findAll() {
    return this.computersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.computersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComputerDto: UpdateComputerDto,
  ) {
    return this.computersService.update(+id, updateComputerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.computersService.remove(+id);
  }
}

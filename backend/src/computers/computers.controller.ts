// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { ComputersService } from '@computers/computers.service';
import { CreateComputerDto } from '@computers/dto/create-computer.dto';
import { UpdateComputerDto } from '@computers/dto/update-computer.dto';
import { UserResponseDto } from '@users/dtos/user-response.dto';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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

  @Get(':id/components')
  findComponents(@Param('id', ParseIntPipe) id: number) {
    return this.computersService.findComponentsByComputerId(id);
  }

  @Get(':id/user')
  async findUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto | null> {
    return this.computersService.findUserByComputerId(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.computersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComputerDto: UpdateComputerDto,
  ) {
    return this.computersService.update(id, updateComputerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.computersService.remove(id);
  }
}

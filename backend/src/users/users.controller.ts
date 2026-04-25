// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { UpdateUserDto } from '@users/dtos/update-user.dto';
import { UserResponseDto } from '@users/dtos/user-response.dto';
import { UsersService } from '@users/users.service';

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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return UserResponseDto.fromEntities(users);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return UserResponseDto.fromEntity(user);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    return UserResponseDto.fromEntity(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return UserResponseDto.fromEntity(user);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}

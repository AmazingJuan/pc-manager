// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { UpdateUserDto } from '@users/dtos/update-user.dto';
import { User } from '@users/entities/user.entity';

// -------------------------------
// Third-Party Imports
// -------------------------------
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verify duplicate existence of username
    const userExists = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    // Verify duplicate existence of email
    const emailExists = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    return this.usersRepository.save(createUserDto);
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async assertUserExists(id: number): Promise<void> {
    try {
      await this.findById(id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new BadRequestException('User does not exist');
      }
      throw e;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    // Verify duplicate existence of username
    if (updateUserDto.username) {
      const usernameExists = await this.usersRepository.findOneBy({
        username: updateUserDto.username,
      });

      if (usernameExists && usernameExists.id !== user.id) {
        throw new ConflictException('Username already exists');
      }
    }

    // Verify duplicate existence of email
    if (updateUserDto.email) {
      const emailExists = await this.usersRepository.findOneBy({
        email: updateUserDto.email,
      });

      if (emailExists && emailExists.id !== user.id) {
        throw new ConflictException('Email already exists');
      }
    }

    // Hash password
    if (updateUserDto.password) {
      const hashedPassword = await hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    const updatedUser = this.usersRepository.create({
      ...user,
      ...updateUserDto,
    });

    return this.usersRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);

    await this.usersRepository.remove(user);
  }
}

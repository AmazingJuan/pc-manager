// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import { CreateUserDto } from '@users/dtos/create-user.dto';
import type { JwtPayload } from '@auth/types/jwt-payload.type';
import { LoginDto } from '@auth/dtos/login.dto';
import { RegisterDto } from '@auth/dtos/register.dto';
import { UserResponseDto } from '@users/dtos/user-response.dto';
import type { UserRole } from '@users/types/user-role.type';
import { UsersService } from '@users/users.service';
import { USER_ROLES } from '@users/constants';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { compare, hash } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;

    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const createUserDto: CreateUserDto = {
      name: registerDto.name,
      username: registerDto.username,
      email: registerDto.email,
      password: await hash(registerDto.password, 10),
      role: USER_ROLES[1] as UserRole,
    };

    const user = await this.usersService.create(createUserDto);

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async getProfile(jwtPayload: JwtPayload): Promise<UserResponseDto> {
    const user = await this.usersService.findById(jwtPayload.sub);

    return UserResponseDto.fromEntity(user);
  }
}

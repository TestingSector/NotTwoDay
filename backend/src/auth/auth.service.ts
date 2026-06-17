import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { toAuthUserDto } from './auth.mapper';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByPhoneNumber(
      registerDto.phoneNumber,
    );

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким номером уже существует',
      );
    }
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      middleName: registerDto.middleName,
      laboratory: registerDto.laboratory,
      phoneNumber: registerDto.phoneNumber,
      passwordHash,
    });

    return toAuthUserDto(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByPhoneNumber(
      loginDto.phoneNumber,
    );

    if (!user) {
      throw new BadRequestException('Неверный номер телефона или пароль');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Неверный номер телефона или пароль');
    }
    if (!user.isApproved) {
      throw new BadRequestException(
        'Аккаунт ожидает подтверждения администратора',
      );
    }
    return toAuthUserDto(user);
  }
}

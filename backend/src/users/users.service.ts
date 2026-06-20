import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRole } from './user.entity';
import { ApproveUserDto } from './dto/approve-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateUserData } from './types/createUserdata';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }
  async findByPhoneNumber(phoneNumber: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.phoneNumber = :phoneNumber', {
        phoneNumber,
      })
      .getOne();
  }
  async create(createUserData: CreateUserData) {
    const existingUser = await this.userRepository.findOne({
      where: {
        phoneNumber: createUserData.phoneNumber,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Данный номер уже используется!');
    }

    const user = this.userRepository.create({
      ...createUserData,
      role: UserRole.GUEST,
    });

    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async approve(id: string, approveUserDto: ApproveUserDto) {
    const user = await this.findOne(id);

    if (user.isApproved) {
      throw new BadRequestException('Пользователь уже подтвержден');
    }

    user.isApproved = true;
    user.role = approveUserDto.role;

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return {
      message: 'Пользователь удален',
    };
  }

  async updateRole(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    const user = await this.findOne(id);

    user.role = updateUserRoleDto.role;

    return this.userRepository.save(user);
  }
}

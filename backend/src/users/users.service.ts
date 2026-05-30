import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRole } from './user.entity';
import { ApproveUserDto } from './dto/approve-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
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
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        phoneNumber: createUserDto.phoneNumber,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Phone number already exists');
    }

    const user = this.userRepository.create({
      ...createUserDto,
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
      throw new BadRequestException('User already approved');
    }

    user.isApproved = true;
    user.role = approveUserDto.role;

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return {
      message: 'User deleted',
    };
  }

  async updateRole(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    const user = await this.findOne(id);

    user.role = updateUserRoleDto.role;

    return this.userRepository.save(user);
  }
}

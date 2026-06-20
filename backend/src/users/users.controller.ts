import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApproveUserDto } from './dto/approve-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Roles(UserRole.ADMIN, UserRole.DISPATCHER)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.usersService.findOne(id);
  }
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  @Roles(UserRole.ADMIN)
  @Patch(':id/approve')
  approve(
    @Param('id')
    id: string,

    @Body()
    approveUserDto: ApproveUserDto,
  ) {
    return this.usersService.approve(id, approveUserDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.usersService.remove(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id/role')
  updateRole(
    @Param('id')
    id: string,
    @Body()
    updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(id, updateUserRoleDto);
  }
}

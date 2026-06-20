import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/user.entity';
import { User } from '../users/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
  @Roles(
    UserRole.DEVELOPER,
    UserRole.TESTER,
    UserRole.DISPATCHER,
    UserRole.ADMIN,
  )
  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.tasksService.findOne(id);
  }
  @Roles(
    UserRole.DEVELOPER,
    UserRole.TESTER,
    UserRole.DISPATCHER,
    UserRole.ADMIN,
  )
  @Post()
  create(
    @Body()
    createTaskDto: CreateTaskDto,

    @CurrentUser()
    user: User,
  ) {
    return this.tasksService.create(createTaskDto, user.id);
  }
  @Roles(UserRole.TESTER, UserRole.ADMIN)
  @Patch(':id/accept')
  acceptTask(
    @Param('id') taskId: string,

    @CurrentUser() user: User,
  ) {
    return this.tasksService.acceptTask(taskId, user.id);
  }
  @Roles(UserRole.TESTER, UserRole.ADMIN)
  @Patch(':id/complete')
  completeTask(
    @Param('id')
    id: string,

    @CurrentUser()
    user: User,
  ) {
    return this.tasksService.completeTask(id, user.id);
  }
  @Roles(UserRole.TESTER, UserRole.ADMIN)
  @Patch(':id/unassign')
  unassignTask(
    @Param('id')
    id: string,

    @CurrentUser()
    user: User,
  ) {
    return this.tasksService.unassignTask(id, user.id);
  }
  @Roles(UserRole.ADMIN, UserRole.DISPATCHER)
  @Patch(':id')
  updateTask(
    @Param('id')
    id: string,

    @Body()
    updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
  @Roles(UserRole.ADMIN, UserRole.DISPATCHER)
  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.tasksService.remove(id);
  }
}

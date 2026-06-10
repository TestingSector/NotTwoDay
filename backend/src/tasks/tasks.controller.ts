import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { AcceptTaskDto } from './dto/accept-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(
    @Body()
    createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/accept')
  acceptTask(
    @Param('id')
    taskId: string,

    @Body()
    acceptTaskDto: AcceptTaskDto,
  ) {
    return this.tasksService.acceptTask(taskId, acceptTaskDto.executorId);
  }

  @Patch(':id/complete')
  completeTask(
    @Param('id')
    id: string,
  ) {
    return this.tasksService.completeTask(id);
  }

  @Patch(':id/unassign')
  unassignTask(
    @Param('id')
    id: string,
  ) {
    return this.tasksService.unassignTask(id);
  }
  @Patch(':id')
  updateTask(
    @Param('id')
    id: string,

    @Body()
    updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.tasksService.remove(id);
  }

  @Post('seed')
  seed() {
    return this.tasksService.seed();
  }
}

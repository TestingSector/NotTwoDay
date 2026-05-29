import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.taskRepository.find({
      relations: {
        creator: true,
        executor: true,
      },
    });
  }
  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
      relations: {
        creator: true,
        executor: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
  async create(createTaskDto: CreateTaskDto) {
    const creator = await this.userRepository.findOne({
      where: {
        id: createTaskDto.creatorId,
      },
    });

    if (!creator) {
      throw new NotFoundException('Creator not found');
    }

    const task = this.taskRepository.create({
      title: createTaskDto.title,
      gost: createTaskDto.gost,
      creator,
      estimatedTime: createTaskDto.estimatedTime,
      isUrgent: createTaskDto.isUrgent ?? false,
    });

    return this.taskRepository.save(task);
  }

  async acceptTask(taskId: string, executorId: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: {
        executor: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.executor) {
      throw new BadRequestException('Task already taken');
    }

    const executor = await this.userRepository.findOne({
      where: {
        id: executorId,
      },
    });

    if (!executor) {
      throw new NotFoundException('Executor not found');
    }

    task.executor = executor;

    task.status = TaskStatus.ACTIVE;

    return this.taskRepository.save(task);
  }

  async completeTask(taskId: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: {
        executor: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.status !== TaskStatus.ACTIVE) {
      throw new BadRequestException('Only active tasks can be completed');
    }

    task.status = TaskStatus.COMPLETED;
    task.completedAt = new Date();

    return this.taskRepository.save(task);
  }
  async unassignTask(taskId: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: {
        executor: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.status === TaskStatus.COMPLETED) {
      throw new BadRequestException('Completed task cannot be unassigned');
    }

    if (!task.executor) {
      throw new BadRequestException('Task has no executor');
    }

    task.executor = null;

    task.status = TaskStatus.PENDING;

    return this.taskRepository.save(task);
  }
}

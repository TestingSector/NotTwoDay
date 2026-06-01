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
import { SystemSettingsService } from '../system-settings/system-settings.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly systemSettingsService: SystemSettingsService,
  ) { }

  findAll() {
    return this.taskRepository.find({
      relations: {
        creator: true,
        executor: true,
      },
      order: {
        createdAt: 'DESC',
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

    let number = createTaskDto.number;
    if (
      createTaskDto.type === 'KPO' &&
      !createTaskDto.number
    ) {
      throw new BadRequestException(
        'KPO number is required',
      );
    }
    if (!createTaskDto.materialName?.trim()) {
      throw new BadRequestException(
        'Material name is required',
      );
    }
    if (createTaskDto.type === 'NTZ') {
      number = String(
        await this.systemSettingsService.incrementNtzCounter(),
      );
    }
    if (!createTaskDto.materialName?.trim()) {
      throw new BadRequestException(
        'Material name is required',
      );
    }
    const task = this.taskRepository.create({
      creator,

      type: createTaskDto.type,

      number: number ?? '',

      materialName: createTaskDto.materialName,

      topic: createTaskDto.topic,

      testMethod: createTaskDto.testMethod,

      standard: createTaskDto.standard,

      temperatureConditions:
        createTaskDto.temperatureConditions,

      isUrgent: createTaskDto.isUrgent ?? false,

      urgentReason:
        createTaskDto.isUrgent
          ? createTaskDto.urgentReason
          : undefined,

      comment:
        createTaskDto.comment,
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
    if (task.status === TaskStatus.COMPLETED) {
      throw new BadRequestException('Completed task cannot be accepted');
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
    task.acceptedAt = new Date();
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
    if (!task.executor) {
      throw new BadRequestException(
        'Task has no executor',
      );
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
    task.acceptedAt = undefined;
    task.status = TaskStatus.PENDING;

    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.findOne(id);

    await this.taskRepository.remove(task);

    return {
      message: 'Task deleted',
    };
  }
}

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.entity';
import { User } from '../users/user.entity';
import { SystemSettingsService } from '../system-settings/system-settings.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly systemSettingsService: SystemSettingsService,
  ) {}

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
  async create(createTaskDto: CreateTaskDto, creatorId: string) {
    const creator = await this.userRepository.findOne({
      where: {
        id: creatorId,
      },
    });

    if (!creator) {
      throw new NotFoundException('Creator not found');
    }

    let number = createTaskDto.number;
    if (createTaskDto.type === 'KPO' && !createTaskDto.number) {
      throw new BadRequestException('Номер КПО обязателен!');
    }
    if (!createTaskDto.materialName?.trim()) {
      throw new BadRequestException('Марка материала обязательна!');
    }
    if (createTaskDto.type === 'NTZ') {
      number = String(await this.systemSettingsService.incrementNtzCounter());
    }

    const task = this.taskRepository.create({
      creator,

      type: createTaskDto.type,

      number: number ?? '',

      materialName: createTaskDto.materialName,

      topic: createTaskDto.topic,

      testMethod: createTaskDto.testMethod,

      standard: createTaskDto.standard,

      temperatureConditions: createTaskDto.temperatureConditions,

      isUrgent: createTaskDto.isUrgent ?? false,

      urgentReason: createTaskDto.isUrgent
        ? createTaskDto.urgentReason
        : undefined,

      comment: createTaskDto.comment,
    });

    return this.taskRepository.save(task);
  }
  async updateTask(taskId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(taskId);

    if (task.status !== TaskStatus.PENDING) {
      throw new BadRequestException(
        'Редактировать можно только задачи в статусе "в ожидании" ',
      );
    }

    task.materialName = updateTaskDto.materialName ?? task.materialName;
    task.number = updateTaskDto.number ?? task.number;
    task.topic = updateTaskDto.topic ?? task.topic;

    task.temperatureConditions =
      updateTaskDto.temperatureConditions ?? task.temperatureConditions;

    if (updateTaskDto.isUrgent !== undefined) {
      task.isUrgent = updateTaskDto.isUrgent;

      task.urgentReason = updateTaskDto.isUrgent
        ? updateTaskDto.urgentReason
        : undefined;
    }
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
      throw new NotFoundException('Задача не найдена.');
    }

    if (task.executor) {
      throw new BadRequestException('Задача уже взята в работу!');
    }
    if (task.status === TaskStatus.COMPLETED) {
      throw new BadRequestException(
        'Завершенную задачу нельзя взять в работу!',
      );
    }

    const executor = await this.userRepository.findOne({
      where: {
        id: executorId,
      },
    });

    if (!executor) {
      throw new NotFoundException('Исполнитель не найден!');
    }

    task.executor = executor;
    task.acceptedAt = new Date();
    task.status = TaskStatus.ACTIVE;

    return this.taskRepository.save(task);
  }

  async completeTask(taskId: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: {
        executor: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    if (task.status !== TaskStatus.ACTIVE) {
      throw new BadRequestException('Завершить можно только активные задачи!');
    }
    if (!task.executor) {
      throw new BadRequestException('У задачи нет исполнителя!');
    }
    if (task.executor.id !== userId) {
      throw new ForbiddenException('Вы не являетесь исполнителем задачи');
    }
    task.status = TaskStatus.COMPLETED;
    task.completedAt = new Date();

    return this.taskRepository.save(task);
  }
  async unassignTask(taskId: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: {
        executor: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Задача не найдена!');
    }

    if (task.status === TaskStatus.COMPLETED) {
      throw new BadRequestException(
        'Завершенная задача не может быть снята с работы!',
      );
    }

    if (!task.executor) {
      throw new BadRequestException('У задачи нет исполнителя!');
    }
    if (task.executor.id !== userId) {
      throw new ForbiddenException('Вы не являетесь исполнителем задачи');
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

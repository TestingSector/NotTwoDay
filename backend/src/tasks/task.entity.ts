import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

export enum TaskStatus {
  PENDING = 'pending',

  ACTIVE = 'active',

  COMPLETED = 'completed',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  gost!: string;

  @ManyToOne(() => User)
  creator!: User;

  @ManyToOne(() => User, {
    nullable: true,
  })
  executor?: User;

  @Column({
    type: 'enum',

    enum: TaskStatus,

    default: TaskStatus.PENDING,
  })
  status!: TaskStatus;

  @Column({
    default: false,
  })
  isUrgent!: boolean;

  @Column()
  estimatedTime!: string;

  @CreateDateColumn()
  createdAt!: Date;
}

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
  type!: string;

  @Column()
  number!: string;

  @Column()
  materialName!: string;

  @Column({
    nullable: true,
  })
  topic?: string;

  @Column()
  testMethod!: string;

  @Column()
  standard!: string;

  @Column({
    type: 'jsonb',
  })
  temperatureConditions!: {
    temperature: number;
    quantity: number;
    modulus: boolean;
  }[];

  @Column({
    default: false,
  })
  isUrgent!: boolean;

  @Column({
    nullable: true,
  })
  urgentReason?: string;

  @Column({
    nullable: true,
  })
  comment?: string;

  @ManyToOne(() => User)
  creator!: User;

  @ManyToOne(() => User, {
    nullable: true,
  })
  executor?: User | null;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status!: TaskStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  acceptedAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  completedAt?: Date;
}
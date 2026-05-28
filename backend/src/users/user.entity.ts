import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  GUEST = 'guest',

  CUSTOMER = 'customer',

  DISPATCHER = 'dispatcher',

  ENGINEER = 'engineer',

  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    nullable: true,
  })
  middleName?: string;

  @Column()
  laboratory!: string;

  @Column({
    unique: true,
  })
  phoneNumber!: string;

  @Column({
    type: 'enum',

    enum: UserRole,

    default: UserRole.GUEST,
  })
  role!: UserRole;

  @Column({
    default: false,
  })
  isApproved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

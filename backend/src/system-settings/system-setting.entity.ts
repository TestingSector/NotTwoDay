import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("system_settings")
export class SystemSetting {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    unique: true,
  })
  key!: string;

  @Column()
  value!: string;
}
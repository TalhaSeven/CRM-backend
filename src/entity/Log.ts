import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

enum type {
  ADDRESS = "address",
  CALENDER = "calender",
  EMAIL = "email",
  PHONE = "phone",
  TASK = "task",
  USER = "user",
  USER_INFO = "user_info",
}

@Entity("logs")
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: type, default: type.TASK })
  type: type;

  @Column({ type: "varchar", length: 200 })
  process: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}

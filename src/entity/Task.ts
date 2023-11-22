import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./User";

enum type {
  IMPORTANT = "important",
  STANDARD = "standard",
}
enum status {
  APPOINTED = "appointed",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: type, default: type.STANDARD })
  taskType: type;

  @Column({ type: "varchar", length: 250 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "responsibleId" })
  responsible: User;

  @Column({ type: "enum", enum: status, default: status.APPOINTED })
  status: status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}

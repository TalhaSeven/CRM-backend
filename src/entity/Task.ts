import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  AfterInsert,
} from "typeorm";
import { User } from "./User";
import { AppDataSource } from "../data-source";
import { Log } from "./Log";

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

  @Column({ type: "enum", enum: type, default: type.STANDARD, nullable: false })
  taskType: type;

  @Column({ type: "varchar", length: 250, nullable: false })
  title: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "responsibleId" })
  responsible: User;

  @Column({ type: "enum", enum: status, default: status.APPOINTED, nullable: false })
  status: status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @AfterInsert()
  async userLog() {
    const logRepository = AppDataSource.getRepository(Log);
    const log = Object.assign(new Log(), {
      type: "task_info",
      process:
        "task info => ",
      user: this.id,
    });
    logRepository.save(log);
  }
}

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
  MEETING = "meeting",
  PHONE = "phone",
  EMAIL = "email",
  LOCATION = "location",
}

@Entity("calenders")
export class Calender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: type, default: type.MEETING })
  calenderType: type;

  @Column({ type: "varchar", length: 250 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "participantId" })
  participant: User;

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
      type: "calender_info",
      process:
        "calender info => ",
      user: this.id,
    });
    logRepository.save(log);
  }
}

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
  HOME = "home",
  CENTER = "center",
  BRANCH = "branch",
}

@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: type, default: type.HOME })
  emailType: type;

  @Column({ type: "varchar", length: 100 })
  emailAddress: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

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
      type: "mail_info",
      process:
        "mail info => ",
      user: this.id,
    });
    logRepository.save(log);
  }
}

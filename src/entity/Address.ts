import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
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

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: type, default: type.HOME })
  addressType: type;

  @Column()
  addressLine: string;

  @Column()
  location: string;

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
      type: "address_info",
      process:
        "address info => ",
      user: this.id,
    });
    logRepository.save(log);
  }
}

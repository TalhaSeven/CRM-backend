import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

enum phoneType {
  HOME = "home",
  CENTER = "center",
  BRANCH = "branch",
}

@Entity("phones")
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: phoneType, default: phoneType.HOME })
  phoneType: phoneType;

  @Column({ type: "varchar", length: 20 })
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

enum addressType {
  HOME = "home",
  CENTER = "center",
  BRANCH = "branch",
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: addressType, default: addressType.HOME })
  addressType: addressType;

  @Column()
  addressLine: string;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}

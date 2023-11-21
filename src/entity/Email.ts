import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { User } from "./User";
  
  enum emailType {
    HOME = "home",
    CENTER = "center",
    BRANCH = "branch",
  }
  
  @Entity("emails")
  export class Email {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "enum", enum: emailType, default: emailType.HOME })
    emailType: emailType;
  
    @Column({ type: "varchar", length: 100})
    emailAddress: string;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user: User;
  
  }
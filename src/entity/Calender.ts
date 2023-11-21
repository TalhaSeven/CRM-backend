import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { User } from "./User";
  
  enum calenderType {
    MEETING = "meeting",
  }
  
  @Entity("calenders")
  export class Calender {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "enum", enum: calenderType, default: calenderType.MEETING })
    calenderType: calenderType;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user: User;
  }
  
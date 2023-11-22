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
  
  @Entity("user_info")
  export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;
  
    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;
  }
  
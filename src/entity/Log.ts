import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { User } from "./User"
import { LogTypeEnum } from "../enum/LogTypeEnum"

@Entity("logs")
export class Log {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: LogTypeEnum, default: LogTypeEnum.TASK, nullable: false })
    type: LogTypeEnum

    @Column({ type: 'varchar', length: 200, nullable: false })
    process: string

    @ManyToOne(() => User, (user) => user.id, {onDelete: 'CASCADE', nullable: false})
    @JoinColumn({ name: "userId" })
    user: User

    @CreateDateColumn()
    createdAt: Date;
}

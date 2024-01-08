import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterInsert, ManyToMany, AfterLoad, In } from "typeorm"
import { User } from "./User"
import { AppDataSource } from "../data-source"
import { Log } from "./Log"
import { CalenderEnum } from "../enum/CalenderEnum"
import { CalenderUserModel } from "../model/CalenderUserModel"

@Entity("calenders")
export class Calender {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: CalenderEnum, default: CalenderEnum.MEETING, nullable: false })
    calenderType: CalenderEnum

    @Column({ type: 'varchar', length: 250, nullable: false })
    title: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ type: 'json' })
    traits: object;

    @ManyToOne(() => User, (user) => user.id, { nullable: false })
    @JoinColumn({ name: "userId" })
    user: User

    @Column({ type: 'json', nullable: true })
    participants: Number[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updateAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @AfterInsert()
    async userLog() {
        const logRepository = AppDataSource.getRepository(Log)
        const log = Object.assign(new Log(), {
            type: 'calender',
            process: 'yeni takvim bilgisi eklendi',
            user: this.user
        })

        logRepository.save(log)
    }

    participantsUser: User[];

    @AfterLoad()
    async afterLoad() {
        if (this.participants) {
            console.log('participantsUser', this.participants);
            const participants = this.participants.map((k: any) => k.id)
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.find({
                where: { id: In(participants) }, select: { id: true, firstName: true, lastName: true }
            })
            this.participantsUser = user;
        } else {            
            this.participantsUser = [];
        }
    }
}

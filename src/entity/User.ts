import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, AfterInsert, BeforeUpdate, AfterUpdate, SelectQueryBuilder, AfterLoad } from "typeorm"
import { validateOrReject, IsDefined, IsEmail, Length, Max } from "class-validator";
import { Phone } from "./Phone"
import { Email } from "./Email"
import { Address } from "./Address"
import * as bcrypt from 'bcrypt';
import { AppDataSource } from "../data-source";
import { Log } from "./Log";
import { UserRoleEnum } from "../enum/UserRoleEnum";
import { UserConfirmedEnum } from "../enum/UserConfirmedEnum";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100, nullable: false })
    @IsDefined({ message: 'isim gerekli' })
    @Length(3, 100)
    firstName!: string

    @Column({ type: 'varchar', length: 100, nullable: false })
    @IsDefined({ message: 'soyad gerekli' })
    @Length(3, 100)
    lastName: string

    @Column({ type: 'varchar', length: 100, unique: true })
    @IsEmail()
    email: string

    @Column({ type: 'varchar', length: 100 })
    @IsDefined({ message: 'şifre gerekli' })
    @Length(6, 10)
    password: string

    @Column({ type: "enum", enum: UserRoleEnum, default: UserRoleEnum.USER, nullable: false })
    role: UserRoleEnum

    @Column({ type: "enum", enum: UserConfirmedEnum, default: UserConfirmedEnum.PENDING, nullable: false })
    confirmed: UserConfirmedEnum

    @OneToMany(() => Phone, (phone) => phone.user, { cascade: true })
    phone: Phone[]

    @OneToMany(() => Email, (email) => email.user, { cascade: true })
    emails: Email[]

    @OneToMany(() => Address, (address) => address.user, { cascade: true })
    address: Address[]

    @CreateDateColumn({ select: true })
    createdAt: Date;

    @UpdateDateColumn({ nullable: true, select: true })
    updateAt: Date;

    @DeleteDateColumn({ nullable: true, select: true })
    deletedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @BeforeInsert()
    async validate() {
        await validateOrReject(this, { skipUndefinedProperties: true });
    }

    @AfterInsert()
    async userLog() {
        const logRepository = AppDataSource.getRepository(Log)
        const log = Object.assign(new Log(), {
            type: 'user',
            process: 'yeni kulanıcı kayıtı > ' + this.id + ' ' + this.email + ' ' + this.firstName + ' ' + this.lastName,
            user: this.id
        })

        logRepository.save(log)
    }

    @AfterUpdate()
    async userAfterUpdateLog() {
        console.log('----');

        const logRepository = AppDataSource.getRepository(Log)
        const log = Object.assign(new Log(), {
            type: 'user',
            process: 'kulanıcı güncellemesi öncesi > ' + this.email + ' ' + this.firstName + ' ' + this.lastName,
            user: this.id
        })

        logRepository.save(log)
    }
    @BeforeUpdate()
    async userBeforeUpdateLog() {
        console.log('****');

        const logRepository = AppDataSource.getRepository(Log)
        const log = Object.assign(new Log(), {
            type: 'user',
            process: 'kulanıcı güncellemesi sonrası > ' + this.email + ' ' + this.firstName + ' ' + this.lastName,
            user: this.id
        })

        logRepository.save(log)
    }

    fullName: string;

    @AfterLoad()
    afterLoad() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
}

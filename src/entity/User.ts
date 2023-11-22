import * as bcrypt from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  AfterInsert,
} from "typeorm";
import { Phone } from "./Phone";
import { Email } from "./Email";
import { Address } from "./Address";
import { AppDataSource } from "../data-source";
import { Log } from "./Log";

enum role {
  ADMIN = "admin",
  USER = "user",
  CUSTOMER = "customer",
}

enum confirmed {
  PENDING = "pending",
  EMAIL = "email",
  DENIED = "denied",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  firstName: string;

  @Column({ type: "varchar", length: 100 })
  lastName: string;

  @Column({ unique: true, type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "enum", enum: role, default: role.USER })
  role: role;

  @Column({ type: "enum", enum: confirmed, default: confirmed.PENDING })
  confirmed: confirmed;

  @OneToMany(() => Phone, (phone) => phone.user, { cascade: true })
  phones: Phone[];

  @OneToMany(() => Email, (email) => email.user, { cascade: true })
  emails: Email[];

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  async hashPassword() {
    const logRepository = AppDataSource.getRepository(Log);
    const log = Object.assign(new Log(), {
      type: "user",
      process:
        " new account created " +
        this.email +
        " " +
        this.firstName +
        " " +
        this.lastName,
    });
    logRepository.save(log);
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  @AfterInsert()
  async test() {
    console.log("after insert" + this.id);
    const logRepository = AppDataSource.getRepository(Log);
    const log = Object.assign(new Log(), {
      type: "user",
      process:
        " new account created " +
        this.email +
        " " +
        this.firstName +
        " " +
        this.lastName,
    });
    logRepository.save(log);
  }
}

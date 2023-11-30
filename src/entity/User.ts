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
  BeforeUpdate,
  AfterUpdate,
  AfterLoad,
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
  APPROVAL = "approval",
  DENIED = "denied",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 100, nullable: false })
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

  @CreateDateColumn({select:false})
  createdAt: Date;

  @UpdateDateColumn({ nullable: true,select:false })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true,select:false })
  deletedAt?: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @AfterInsert()
  async userLog() {
    const logRepository = AppDataSource.getRepository(Log);
    const log = Object.assign(new Log(), {
      type: "user",
      process:
        "new account created => " +
        this.email +
        " " +
        this.firstName +
        " " +
        this.lastName,
      user: this.id,
    });
    logRepository.save(log);
  }

  @BeforeUpdate()
  async userUpdateLog() {
    const logRepository = AppDataSource.getRepository(Log);
    const log = Object.assign(new Log(), {
      type: "user",
      process:
        "new account updated after => " +
        this.email +
        " " +
        this.firstName +
        " " +
        this.lastName,
      user: this.id,
    });
    logRepository.save(log);
  }

  @AfterUpdate()
  async userAfterUpdateLog() {
    const logRepository = AppDataSource.getRepository(Log);
    const log = Object.assign(new Log(), {
      type: "user",
      process:
        "new account updated before=> " +
        this.email +
        " " +
        this.firstName +
        " " +
        this.lastName,
      user: this.id,
    });
    logRepository.save(log);
  }

  fullName:string;
  @AfterLoad()
  afterLoad() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}

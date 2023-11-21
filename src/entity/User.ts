import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column({type: "enum", enum: role, default: role.USER})
  role: role;

  @Column({type: "enum", enum: confirmed, default: confirmed.PENDING})
  confirmed: confirmed;
}

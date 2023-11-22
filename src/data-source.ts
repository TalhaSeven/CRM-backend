import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Phone } from "./entity/Phone";
import { Email } from "./entity/Email";
import { Address } from "./entity/Address";
import { Calender } from "./entity/Calender";
import { UserInfo } from "./entity/UserInfo";
import { Log } from "./entity/Log";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "crm",
  synchronize: true, // live in false
  logging: false,
  entities: [User, Phone, Email, Address, Calender, UserInfo, Log],
  migrations: [],
  subscribers: [],
});

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Phone } from "./entity/Phone";
import { Email } from "./entity/Email";
import { Address } from "./entity/Address";
import { Calender } from "./entity/Calender";
import { UserInfo } from "./entity/UserInfo";
import { Log } from "./entity/Log";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // live in false in production.
  logging: false,
  entities: [User, Phone, Email, Address, Calender, UserInfo, Log],
  migrations: [],
  subscribers: [],
});

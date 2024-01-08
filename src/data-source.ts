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
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true, // live in false in production.
  logging: false,
  entities: [User, Phone, Email, Address, Calender, UserInfo, Log],
  migrations: [],
  subscribers: [],
});

// Talha Seven
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Phone } from "./entity/Phone";
import { Email } from "./entity/Email";
import { Address } from "./entity/Address";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "crm",
  synchronize: true,
  logging: false,
  entities: [User, Phone, Email, Address],
  migrations: [],
  subscribers: [],
});

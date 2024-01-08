import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Email } from "./entity/Email"
import { Phone } from "./entity/Phone"
import { Address } from "./entity/Address"
import { Calender } from "./entity/Calender"
import { UserInfo } from "./entity/UserInfo"
import { Log } from "./entity/Log"
import { Task } from "./entity/Task"
import { Country } from "./entity/Country"
import { City } from "./entity/City"
import { District } from "./entity/District"
import { Town } from "./entity/Town"
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true, // live in false in production.
    logging: false,
    entities: [User, Email, Phone, Address, Calender, UserInfo, Log, Task, Country, City, District, Town],
    migrations: [],
    subscribers: [],
})

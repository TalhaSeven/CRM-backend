import { NextFunction, Request, Response } from "express";
import { TaskEnum } from "../enum/TaskEnum";
import { CalenderEnum } from "../enum/CalenderEnum";
import { ContactEnum } from "../enum/ContactEnum";
import { LogTypeEnum } from "../enum/LogTypeEnum";
import { TaskStatus } from "../enum/TaskStatus";
import { UserConfirmedEnum } from "../enum/UserConfirmedEnum";
import { UserRoleEnum } from "../enum/UserRoleEnum";

export class EnumController{
    async task(request: Request, response: Response, next: NextFunction) {
        return { data: TaskEnum, status: true }
    }
    async calender(request: Request, response: Response, next: NextFunction) {
        return { data: CalenderEnum, status: true }
    }
    async contact(request: Request, response: Response, next: NextFunction) {
        return { data: ContactEnum, status: true }
    }
    async log(request: Request, response: Response, next: NextFunction) {
        return { data: LogTypeEnum, status: true }
    }
    async taskStatus(request: Request, response: Response, next: NextFunction) {
        return { data: TaskStatus, status: true }
    }
    async confirm(request: Request, response: Response, next: NextFunction) {
        return { data: UserConfirmedEnum, status: true }
    }
    async usersRole(request: Request, response: Response, next: NextFunction) {
        return { data: UserRoleEnum, status: true }
    }
}
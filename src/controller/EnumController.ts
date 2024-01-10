import { NextFunction, Request, Response } from "express";
import { TaskEnum } from "../enum/TaskEnum";
import { CalenderEnum } from "../enum/CalenderEnum";
import { ContactEnum } from "../enum/ContactEnum";
import { LogTypeEnum } from "../enum/LogTypeEnum";
import { TaskStatus } from "../enum/TaskStatus";
import { UserConfirmedEnum } from "../enum/UserConfirmedEnum";
import { UserRoleEnum } from "../enum/UserRoleEnum";

export class EnumController {
    async task(request: Request, response: Response, next: NextFunction) {
        return {
            data: Object.values(TaskEnum).map((item: string, index: number) => {
                return { id: item, name: item };
            }), status: true
        }
    }
    async calender(request: Request, response: Response, next: NextFunction) {
        return {
            data: Object.values(CalenderEnum).map((item: string, index: number) => {
                return { id: item, name: item };
            }), status: true
        }
    }
    async contact(request: Request, response: Response, next: NextFunction) {
        return {
            data: Object.values(ContactEnum).map((item: string, index: number) => {
                return { id: item, name: item };
            }), status: true
        }
    }
    async log(request: Request, response: Response, next: NextFunction) {
        return {
            data: Object.values(LogTypeEnum).map((item: string, index: number) => {
                return { id: item, name: item };
            }), status: true
        }
    }
    async taskStatus(request: Request, response: Response, next: NextFunction) {
        return {
            data: Object.values(TaskStatus).map((item: string, index: number) => {
                return { id: item, name: item };
            }), status: true
        }
    }
    async confirm(request: Request, response: Response, next: NextFunction) {
        return {
            data: Object.values(UserConfirmedEnum).map((item: string, index: number) => {
                return { id: item, name: item };
            }), status: true
        }
    }
    async usersRole(request: Request, response: Response, next: NextFunction) {
        return {
            data: Object.values(UserRoleEnum).map((item: string, index: number) => {
                return { id: item, name: item };
            }), status: true
        }
    }
}
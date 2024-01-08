import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Task } from "../entity/Task"
import { TaskStatus } from "../enum/TaskStatus"
import { Log } from "../entity/Log"
import { getUserFromJWT } from "../utility/getUserIdFromJWT"

export class TaskController {

    private taskRepository = AppDataSource.getRepository(Task)

    async all(request: Request, response: Response, next: NextFunction) {
        const tasks = await this.taskRepository.find({
            relations: { user: true, responsible: true },
            select: {
                id: true,
                type: true,
                title: true,
                description: true,
                user: { id: true, firstName: true, lastName: true },
                responsible: { id: true, firstName: true, lastName: true },
                status: true,
                createdAt: true,
                updateAt: true,
                deletedAt: true
            }
        })

        return { data: tasks, status: tasks.length > 0 }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const task = await this.taskRepository.findOne({
            where: { id },
            relations: { user: true, responsible: true },
            select: {
                id: true,
                type: true,
                title: true,
                description: true,
                user: { id: true, firstName: true, lastName: true },
                responsible: { id: true, firstName: true, lastName: true },
                status: true,
                createdAt: true,
                updateAt: true,
                deletedAt: true
            }
        })

        return { data: task, status: task ? true : false, message: task ? "" : "empty task" }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { type, title, description, userId, responsibleId, status } = request.body;

        const task = Object.assign(new Task(), {
            type,
            title,
            description,
            user: userId,
            responsible: responsibleId,
            status
        })

        try {
            const insert = await this.taskRepository.save(task)
            return { data: insert, status: true }
        } catch (error) {
            next({ error, status: 404 })
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { type, title, description, userId, responsibleId, status } = request.body;

        try {
            const update = await this.taskRepository.update({ id }, {
                type,
                title,
                description,
                user: userId,
                responsible: responsibleId,
                status
            })
            return { data: update, status: update.affected > 0 }
        } catch (error) {
            next({ error, status: 404 })
        }
    }

    async next(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        try {
            const update = await this.taskRepository.update({ id }, {
                status: TaskStatus.IN_PROGRESS
            })

            const user: any = await getUserFromJWT(request)
            console.log(user);
            
            const logRepository = AppDataSource.getRepository(Log)
            const log = Object.assign(new Log(), {
                type: 'task',
                process: 'görev çalışmaya başlandı >>> ',
                user: user.id
            })

            logRepository.save(log)

            return { data: update, status: update.affected > 0 }
        } catch (error) {
            next({ error, status: 404 })
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let taskToRemove = await this.taskRepository.findOneBy({ id })

        if (!taskToRemove) {
            return { message: "this task not exist", status: false }
        }

        await this.taskRepository.remove(taskToRemove)

        return { message: "task has been removed", status: true }
    }

}
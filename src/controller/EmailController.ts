import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Email } from "../entity/Email"
import { EmailModel } from "../model/EmailModel"

export class EmailController {

    private emailRepository = AppDataSource.getRepository(Email)

    async all(request: Request, response: Response, next: NextFunction) {
        const email: EmailModel[] = await this.emailRepository.find({
            relations: { user: true },
            select: {
                id: true,
                emailType: true,
                emailAddress: true,
                user: { id: true, firstName: true, lastName: true },
            }
        })

        return { data: email, status: true }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const email = await this.emailRepository.findOne({
            where: { id },
            relations: { user: true },
            select: {
                id: true,
                emailType: true,
                emailAddress: true,
                user: { id: true, firstName: true, lastName: true },
            }
        })

        if (!email) {
            return { message: "unregistered email", status: false }
        }
        return { data: email, status: true }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { userId, emailType, emailAddress } = request.body;

        const email = Object.assign(new Email(), {
            user: userId,
            emailType,
            emailAddress
        })

        try {
            const insert = await this.emailRepository.save(email)
            return { data: insert, status: true }
        } catch (error) {
            next({ error, status: 404 })
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { userId, emailType, emailAddress } = request.body;

        try {
            const update = await this.emailRepository.update({ id }, {
                user: userId,
                emailType,
                emailAddress
            })
            return { data: update, status: update.affected > 0 }
        } catch (error) {
            next({ error, status: 404 })
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let emailToRemove = await this.emailRepository.findOneBy({ id })

        if (!emailToRemove) {
            return { message: "this email not exist", status: false }
        }

        await this.emailRepository.remove(emailToRemove)

        return { message: "email has been removed", status: true }
    }
}
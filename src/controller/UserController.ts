import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { UserModel } from "../model/UserModel"
import { RegisterModel } from "../model/RegisterModel"
import { BaseUserModel } from "../model/BaseUserModel"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const users: Array<UserModel> = (await this.userRepository.find()).map((k: UserModel) => {
            return {
                id: k.id,
                firstName: k.firstName,
                lastName: k.lastName,
                email: k.email,
                role: k.role,
                confirmed: k.confirmed,
                createdAt: k.createdAt
            } as UserModel
        })

        return { status: true, data: users }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return {
            status: true,
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                confirmed: user.confirmed,
                createdAt: user.createdAt
            } as UserModel
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email, password }: RegisterModel = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            password
        })

        return await this.userRepository.save(user)
    }

    async newUser(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email }: BaseUserModel = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            password: (Math.random() * 1000000).toFixed(0)
        })

        try {
            const insert = await this.userRepository.save(user);
            return { data: {
                firstName: insert.firstName,
                lastName: insert.lastName,
                email: insert.email,
                role: insert.role,
                confirmed: insert.confirmed,
                createdAt: insert.createdAt
            } as UserModel, status: true }
        } catch (error) {
            if (error.code === undefined) {
                error.message = error.map((k: any) => {
                    return { constraints: k.constraints, property: k.property }
                })
            }
            next({ error, status: 404 })
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { firstName, lastName } = request.body;

        const update = await this.userRepository.update({ id }, {
            firstName,
            lastName
        })
        return { update, status: true }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
        return { message: "this user not exist", status: false }
        }

        await this.userRepository.remove(userToRemove)

        return { message: "user has been removed", status: true }
     }

}
import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from 'bcrypt';
import jwt = require('jsonwebtoken')
import { UserModel } from "../model/UserModel";
import { RegisterModel } from "../model/RegisterModel";
import { LoginModel } from "../model/LoginModel";
import { ResponseLoginModel } from "../model/ResponseLoginModel";
import { getUserFromJWT } from "../utility/getUserIdFromJWT";
import { newUser } from "../utility/new-user";
import { LogSave } from "../utility/log-save";

export class AuthController {

    private userRepository = AppDataSource.getRepository(User)

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password }: LoginModel = request.body;
        const user = await this.userRepository.findOne({
            where: { email }
        })

        if (user) {
            const isValid = await bcrypt.compare(password, user.password)
            if (isValid) {
                const loginUser: ResponseLoginModel = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    confirmed: user.confirmed
                }

                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                    data: loginUser,
                }, "secret")

                LogSave(user.id, 'Login Process Done', 'user')

                return { status: true, token, user: loginUser }
            } else {
                const error: any = new Error("Email and/or password invalid")
                next({ error, status: 401 })
            }
        } else {
            const error: any = new Error("Email and/or password invalid")
            next({ error, status: 401 })
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const body: RegisterModel = request.body;
        const {res, status} = await newUser(body)

        if (status) {
                return {
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                role: res.role,
                confirmed: res.confirmed,
            } as UserModel
        } else {
            next({ error: res, status: 404 })
        }
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const user: any = await getUserFromJWT(request)
        const id = user.id
        const { firstName, lastName }: RegisterModel = request.body;

        try {
            const update = await this.userRepository.update({ id }, { firstName, lastName })
            return { status: true, update }
        } catch (error: any) {
            next({ error, status: 404 })
        }
    }

    async changePassword(request: Request, response: Response, next: NextFunction) {
        const user: any = await getUserFromJWT(request)
        const id = user.id
        const { oldPassword, newPassword } = request.body;
        const isValid = await bcrypt.compare(oldPassword, user.password)

        if (isValid) {
            const newPasswordBcrypt = await bcrypt.hash(newPassword, 10)
            const update = await this.userRepository.update({ id }, { password: newPasswordBcrypt })
            return { status: true, update }
        } else {
            const error: any = new Error("Old Password Invalid")
            next({ error, status: 404 })
        }
    }
}
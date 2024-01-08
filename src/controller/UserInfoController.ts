import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { UserInfo } from "../entity/UserInfo"

export class UserInfoController {

    private userInfoRepository = AppDataSource.getRepository(UserInfo)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userInfoRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const userInfo = await this.userInfoRepository.findOne({
            where: { id }
        })

        if (!userInfo) {
            return "unregistered userInfo"
        }
        return userInfo
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {  } = request.body;

        const userInfo = Object.assign(new UserInfo(), {
           
        })

        return await this.userInfoRepository.save(userInfo)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { } = request.body;

        return await this.userInfoRepository.update({ id }, {
            
        })
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userInfoToRemove = await this.userInfoRepository.findOneBy({ id })

        if (!userInfoToRemove) {
            return "this userInfo not exist"
        }

        await this.userInfoRepository.remove(userInfoToRemove)

        return "userInfo has been removed"
    }

}
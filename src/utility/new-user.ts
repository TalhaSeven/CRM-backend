import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { RegisterModel } from "../model/RegisterModel"

export const newUser = async (payload: RegisterModel) => {
    const user = Object.assign(new User(), payload)
    const userRepository = AppDataSource.getRepository(User)

    try {
        const insert = await userRepository.save(user)
        return { res: insert, status: true }
    } catch (error) {
        return { res: error, status: false }
    }
}

exports.module = { newUser }
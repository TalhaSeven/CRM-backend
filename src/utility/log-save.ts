import { AppDataSource } from "../data-source";
import { Log } from "../entity/Log";

export const LogSave = (userId: Number, process: String, type: String) => {
    console.log('test log işlemi');
    const logRepository = AppDataSource.getRepository(Log)
    const log = Object.assign(new Log(), {
        type,
        process,
        user: userId
    })

    logRepository.save(log)
}

exports.module = { LogSave }
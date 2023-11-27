import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Log } from "../entity/Log";

export class LogController {
  private logRepository = AppDataSource.getRepository(Log);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.logRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const log = await this.logRepository.findOne({
      where: { id },
    });
    if (!log) {
      return "unregistered log";
    }
    return log;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {  } = request.body;
    const log = Object.assign(new Log(), {

    });
    return this.logRepository.save(log);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const {  } = request.body;
    return this.logRepository.update(
      { id },
      {

      }
    );
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    let logToRemove = await this.logRepository.findOneBy({ id });
    if (!logToRemove) {
      return "this log not exist";
    }
    await this.logRepository.remove(logToRemove);
    return "log has been removed";
  }
}

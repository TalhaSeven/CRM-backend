import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Calender } from "../entity/Calender";

export class CalenderController {
  private calenderRepository = AppDataSource.getRepository(Calender);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.calenderRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const calender = await this.calenderRepository.findOne({
      where: { id },
    });
    if (!calender) {
      return "unregistered calender";
    }
    return calender;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {  } = request.body;
    const calender = Object.assign(new Calender(), {

    });
    return this.calenderRepository.save(calender);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const {  } = request.body;
    return this.calenderRepository.update(
      { id },
      {

      }
    );
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    let calenderToRemove = await this.calenderRepository.findOneBy({ id });
    if (!calenderToRemove) {
      return "this calender not exist";
    }
    await this.calenderRepository.remove(calenderToRemove);
    return "calender has been removed";
  }
}

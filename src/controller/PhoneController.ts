import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Phone } from "../entity/Phone";

export class PhoneController {
  private phoneRepository = AppDataSource.getRepository(Phone);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.phoneRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const phone = await this.phoneRepository.findOne({
      where: { id },
    });
    if (!phone) {
      return "unregistered phone";
    }
    return phone;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {  } = request.body;
    const phone = Object.assign(new Phone(), {

    });
    return this.phoneRepository.save(phone);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const {  } = request.body;
    return this.phoneRepository.update(
      { id },
      {

      }
    );
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    let phoneToRemove = await this.phoneRepository.findOneBy({ id });
    if (!phoneToRemove) {
      return "this phone not exist";
    }
    await this.phoneRepository.remove(phoneToRemove);
    return "phone has been removed";
  }
}

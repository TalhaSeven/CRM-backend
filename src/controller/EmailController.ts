import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Email } from "../entity/Email";

export class EmailController {
  private emailRepository = AppDataSource.getRepository(Email);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.emailRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const email = await this.emailRepository.findOne({
      where: { id },
    });
    if (!email) {
      return "unregistered email";
    }
    return email;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {  } = request.body;
    const email = Object.assign(new Email(), {

    });
    return this.emailRepository.save(email);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const {  } = request.body;
    return this.emailRepository.update(
      { id },
      {

      }
    );
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    let emailToRemove = await this.emailRepository.findOneBy({ id });
    if (!emailToRemove) {
      return "this email not exist";
    }
    await this.emailRepository.remove(emailToRemove);
    return "email has been removed";
  }
}

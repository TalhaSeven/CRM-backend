import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        confirmed: true,
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = request.body;
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      password,
    });
    return await this.userRepository.save(user);
  }

  async newUser(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email } = request.body;
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      password:(Math.random() * 1000).toFixed(0),
    });
    
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      return response.status(500).json({status:false, code: error.code });
    }
    // return await this.userRepository.save(user);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { firstName, lastName } = request.body;
    return this.userRepository.update(
      { id },
      {
        firstName,
        lastName,
      }
    );
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    let userToRemove = await this.userRepository.findOneBy({ id });
    if (!userToRemove) {
      return "this user not exist";
    }
    await this.userRepository.remove(userToRemove);
    return "user has been removed";
  }
}

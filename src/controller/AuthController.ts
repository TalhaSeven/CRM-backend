import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import e = require("express");

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    const bcryptPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      return "unregistered user";
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) return user;
    else return "wrong password";
  }
}

import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import jwt = require("jsonwebtoken");
import { log } from "console";

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

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const loginUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        confirmed: user.confirmed,
      };
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: loginUser },
        "secret"
      );
      return { status: true, token, user: loginUser };
    } else return "wrong password";
  }
}

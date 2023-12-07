import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    const user = await this.userRepository.findOne({
      where: [{ email }, { password }],
    });
    if (user) {
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
      } else {
        const error: any = new Error("invalid password or email");
        next({ error, status: 401 });
      }
    } else {
      const error: any = new Error("invalid password or email");
      next({ error, status: 401 });
    }
  }

  async register(request: Request, response: Response, next: NextFunction) {
    return "register"
  }

}

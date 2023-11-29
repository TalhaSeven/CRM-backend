import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import * as cors from "cors";
import * as jwt from "jsonwebtoken";
import { User } from "./entity/User";
import { error } from "console";

require("dotenv").config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors({ credentials: true }));

    app.all("*", async (req: Request, res: Response, next: Function) => {
      if (req.url.endsWith("/login") || req.url.endsWith("/register")) {
        next();
      } else {
        try {
          const token = req.headers.authorization.replace("Bearer ", "");
          const verify = jwt.verify(token, "secret");
          const decode: any = verify ? jwt.decode(token) : null;
          const email = decode.data.email;
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email } });
          if (user.confirmed === "approval" || user.confirmed === "email") {
            next();
          } else {
            res.status(401).json({ status: false, message: user.confirmed });
          }
        } catch (error: any) {
          res.status(401).json({ status: false, message: error.message });
        }
      }
    });

    Routes.forEach((route) => {
      (app as any)[route.method](
        `/api/v1${route.route}`,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.use(
      (
        error: ErrorRequestHandler,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        console.log(error);
        response.status(404).json("test");
      }
    );

    app.listen(process.env.PORT);

    console.log("Express server has started on port => " + process.env.PORT);
  })
  .catch((error) => console.log(error));

import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { getUserFromJWT } from "./utility/getUserIdFromJWT";
import cors = require("cors");
require("dotenv").config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.use(cors({ credentials: true }));

    app.all(
      "*",
      async (request: Request, response: Response, next: NextFunction) => {
        console.log("request has been made");
        if (
          request.url.endsWith("/login") ||
          request.url.endsWith("/register")
        ) {
          next();
        } else {
          try {
            const user: any = await getUserFromJWT(request);

            if (user.confirmed === "approval" || user.confirmed === "email") {
              if (request.url.endsWith("/is-login")) {
                response.status(200).json({ status: true });
              } else {
                next();
              }
            } else {
              response.status(401).json({
                status: false,
                message: "authorization error. please consult the administrator",
              });
            }
          } catch (error: any) {
            response
              .status(401)
              .json({ status: false, message: error.message });
          }
        }
      }
    );

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        `/api/v1${route.route}`,
        async (req: Request, res: Response, next: Function) => {
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
        error: any,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        return response.status(error.status).json({
          status: false,
          code: error.error.code,
          errno: error.error.errno,
          message: error.error.message,
        });
      }
    );

    // start express server
    app.listen(process.env.PORT);
    console.log("Express server has started on port " + process.env.PORT);
  })
  .catch((error) => console.log(error));

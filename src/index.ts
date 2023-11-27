import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";

require("dotenv").config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    app.all("*", (req: Request, res: Response, next: Function) => {
      next();
    })

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

    app.use((error: ErrorRequestHandler, request:Request, response:Response, next:NextFunction) => {
      console.log(error);
      response.status(404).json("test");
    })
    
    app.listen(process.env.PORT);

    console.log("Express server has started on port => "+process.env.PORT);
  })
  .catch((error) => console.log(error));

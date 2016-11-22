import { Router, Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { homeApi }  from "./home";

const restApi: Router = Router();

restApi.use("/home", homeApi)

export { restApi }






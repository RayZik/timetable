import { Router, Response, Request, NextFunction } from "express";

import { homeApi }  from "./home";
// import { authApi }  from "./auth";

const restApi: Router = Router();

restApi.use("/home", homeApi)
// restApi.use("/auth", authApi)


export { restApi }






import { Router, Response, Request, NextFunction } from "express";
 
const homeApi: Router = Router();
const db = require("../../../../models/user").User;

homeApi.get("/", (request: Request, response: Response) => {
db.find({}, (err, test) => {
    response.send(test);
  });
});

export { homeApi };
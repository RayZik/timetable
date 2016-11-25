import { Router, Response, Request, NextFunction } from "express";

const homeApi: Router = Router();
const db = require("../../../../models/user").User;

homeApi.get("/", (reqest: Request, response: Response) => {
    db.find({}, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            response.json(res);
        }
    });
});

// homeApi.post("/",(req: Request, res: Response)=>{
//     db.
// })

export { homeApi };
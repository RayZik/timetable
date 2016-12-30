import { Router, Response, Request, NextFunction } from "express";

const homeApi: Router = Router();
const db = require("../../../../models/user").UserModel;

// var user = new db({
// username: "admin",
// password: "admin"
// })

// user.save((err,user,affected)=>{
//     console.log(user);
// })

homeApi.get("/", (reqest: Request, response: Response) => {
    var promise = new Promise(function (resolve, reject) {
        resolve(db.find({}));
    });
    promise
        .then((user) => {
            response.json(user);
        })
        .catch((err) => {
            response.send(err);
        })
});

export { homeApi };
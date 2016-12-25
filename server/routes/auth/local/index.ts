import { Router, Response, Request, NextFunction } from "express";
import { authLocal } from "../../../lib/passport";

const login: Router = Router();
const User = require("../../../../models/user").UserModel;

// var user = new User({
// username: "1",
// password: "1"
// })

// user.save((err,user,affected)=>{
//     console.log(user);
// })

login.get("/", (reqest: Request, response: Response) => {
    var promise = new Promise(function (resolve, reject) {
        resolve(User.find({}));
    });
    promise
        .then((user) => {
            response.json(user);
        })
        .catch((err) => {
            response.send(err);
        })
});

login.post('/login', (req: Request, res: Response, next: NextFunction) => {
    authLocal(req, res, next);
});

export { login };
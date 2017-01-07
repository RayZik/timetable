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

login.get("/", (req: Request, res: Response, next: NextFunction) => {
    User.find({})
        .exec().then((result) => {
            res.json(result);
        }).catch(next);
});

login.post('/login', (req: Request, res: Response, next: NextFunction) => {
    authLocal(req, res, next);
});

export { login };
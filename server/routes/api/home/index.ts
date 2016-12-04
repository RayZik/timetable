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
    db.find({}, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});




// homeApi.post("/",(req: Request, res: Response)=>{
//     var username = req.body.username;
//    db.findOne({username: username}, (err,res)=>{
//        if(err){
//            console.log(err);
//        }else{
//            res.json(res);
//        }
//    })
//  })

export { homeApi };
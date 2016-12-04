"use strict";
var express_1 = require("express");
var homeApi = express_1.Router();
exports.homeApi = homeApi;
var db = require("../../../../models/user").UserModel;
// var user = new db({
// username: "admin",
// password: "admin"
// })
// user.save((err,user,affected)=>{
//     console.log(user);
// })
homeApi.get("/", function (reqest, response) {
    db.find({}, function (err, res) {
        if (err)
            throw err;
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
//# sourceMappingURL=index.js.map
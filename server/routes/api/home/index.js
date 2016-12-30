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
    var promise = new Promise(function (resolve, reject) {
        resolve(db.find({}));
    });
    promise
        .then(function (user) {
        response.json(user);
    })
        .catch(function (err) {
        response.send(err);
    });
});
//# sourceMappingURL=index.js.map
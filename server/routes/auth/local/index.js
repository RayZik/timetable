"use strict";
var express_1 = require("express");
var passport_1 = require("../../../lib/passport");
var login = express_1.Router();
exports.login = login;
var User = require("../../../../models/user").UserModel;
// var user = new User({
// username: "1",
// password: "1"
// })
// user.save((err,user,affected)=>{
//     console.log(user);
// })
login.get("/", function (reqest, response) {
    var promise = new Promise(function (resolve, reject) {
        resolve(User.find({}));
    });
    promise
        .then(function (user) {
        response.json(user);
    })
        .catch(function (err) {
        response.send(err);
    });
});
login.post('/login', function (req, res, next) {
    passport_1.authLocal(req, res, next);
});
//# sourceMappingURL=index.js.map
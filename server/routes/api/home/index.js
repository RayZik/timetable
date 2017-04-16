"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var homeApi = express_1.Router();
exports.homeApi = homeApi;
var db = require('../../../../models/user').UserModel;
// var user = new db({
// username: 'admin',
// password: 'admin'
// })
// user.save((err,user,affected)=>{
//     console.log(user);
// })
homeApi.get('/', function (reest, res, next) {
    db.find({})
        .exec().then(function (result) {
        res.json(result);
    }).catch(next);
});
//# sourceMappingURL=index.js.map
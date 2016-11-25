"use strict";
var express_1 = require("express");
var homeApi = express_1.Router();
exports.homeApi = homeApi;
var db = require("../../../../models/user").User;
homeApi.get("/", function (reqest, response) {
    db.find({}, function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            response.json(res);
        }
    });
});
// homeApi.post("/",(req: Request, res: Response)=>{
//     db.
// })
//# sourceMappingURL=index.js.map
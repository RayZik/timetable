"use strict";
var express_1 = require("express");
var homeApi = express_1.Router();
exports.homeApi = homeApi;
var db = require("../../../../models/user").User;
homeApi.get("/", function (request, response) {
    db.find({}, function (err, test) {
        response.send(test);
    });
});
//# sourceMappingURL=index.js.map
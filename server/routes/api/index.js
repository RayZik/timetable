"use strict";
var express_1 = require("express");
var home_1 = require("./home");
var restApi = express_1.Router();
exports.restApi = restApi;
restApi.use("/home", home_1.homeApi);
//# sourceMappingURL=index.js.map
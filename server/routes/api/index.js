"use strict";
var express_1 = require("express");
var home_1 = require("./home");
// import { authApi }  from "./auth";
var restApi = express_1.Router();
exports.restApi = restApi;
restApi.use("/home", home_1.homeApi);
// restApi.use("/auth", authApi)
//# sourceMappingURL=index.js.map
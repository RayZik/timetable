"use strict";
var express_1 = require("express");
var home_1 = require("./home");
var admin_1 = require("./admin");
var teacher_1 = require("./teacher");
var subject_1 = require("./subject");
var office_1 = require("./office");
var group_1 = require("./group");
var restApi = express_1.Router();
exports.restApi = restApi;
restApi.use("/home", home_1.homeApi);
restApi.use("/admin", admin_1.adminApi);
restApi.use("/admin/teacher", teacher_1.teacher);
restApi.use("/admin/subject", subject_1.subject);
restApi.use("/admin/office", office_1.office);
restApi.use("/admin/group", group_1.group);
//# sourceMappingURL=index.js.map
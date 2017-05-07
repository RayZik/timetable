"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var cors = require("cors");
var path_1 = require("path");
var body_parser_1 = require("body-parser");
var api_1 = require("./routes/api");
var user_1 = require("./routes/user");
require("./typesext");
var config = require('../config/index.js');
var mongoose = require('../lib/mongoose');
// require('./config/passport')(passport)
var app = express();
exports.app = app;
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(express.static(path_1.join(__dirname, '../public')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', api_1.restApi);
app.use('/user', user_1.userApi);
app.use('/client', express.static(path_1.join(__dirname, '../client')));
if (app.get('env') === 'development') {
    app.use(express.static(path_1.join(__dirname, '../node_modules')));
    app.use(express.static(path_1.join(__dirname, '../tools')));
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}
// Error 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});
//# sourceMappingURL=app.js.map
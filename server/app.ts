import * as express from "express";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";

const flash: any = require('connect-flash');
const config: any = require('../config');
var mongoose: any = require('../lib/mongoose');
var MongoStore = require('connect-mongo')(session);

import { join } from "path";
import { json, urlencoded } from "body-parser";

import { restApi } from "./routes/api";
import { login } from "./routes/auth/local";
import { admin } from "./routes/timetable/admin";

import './typesext';

const app: express.Application = express();
app.disable("x-powered-by");

app.use(json());
app.use(urlencoded({ extended: true }));
//настройки пасспорта
app.use(cookieParser());
app.use(session(
    {
        secret: 'Timetable',
        resave: false,
        saveUninitialized: true,
        cookie: config.get('session:cookie'),
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(join(__dirname, '../public')));

app.use("/api", restApi);
app.use("/user", login);
app.use("/admin", admin);
app.use('/client', express.static(join(__dirname, '../client')));

if (app.get("env") === "development") {

    app.use(express.static(join(__dirname, '../node_modules')));
    app.use(express.static(join(__dirname, '../tools')));

    app.use(function (err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// Error 404
app.use(function (req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }

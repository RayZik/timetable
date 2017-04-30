import * as express from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { join } from 'path';
import { json, urlencoded } from 'body-parser';
import { restApi } from './routes/api';
import { auth } from './routes/auth';
import './typesext';

const config: any = require('../config');
let mongoose: any = require('../lib/mongoose');
let MongoStore = require('connect-mongo')(session);

const app: express.Application = express();
app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use(cookieParser());
app.use(session(
    {
        secret: 'Timetable',
        resave: false,
        saveUninitialized: true,
        cookie: config.get('session:cookie'),
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

app.use(express.static(join(__dirname, '../public')));

app.use('/api', restApi);
app.use('/user', restApi);
app.use('/user', auth);
app.use('/client', express.static(join(__dirname, '../client')));

if (app.get('env') === 'development') {

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
    let err = new Error('Not Found');
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

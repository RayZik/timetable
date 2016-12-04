import { Router, Response, Request, NextFunction } from "express";
import * as passport from "passport";
import { Strategy } from "passport-local";
// import { UserModel } from "../../../../models/user";

const login: Router = Router();
const User = require("../../../../models/user").UserModel;

// var user = new db({
// username: "admin",
// password: "admin"
// })

// user.save((err,user,affected)=>{
//     console.log(user);
// })

login.get("/", (reqest: Request, response: Response) => {
    User.find({}, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local', new Strategy(
    function (username, password, done) {
        console.log(username + " " + password + " SERVER");
        User.findOne({ username: username }, function (err, user) {
            return err
                ? done(err)
                : user
                    ? password === user.password
                        ? done(null, user)
                        : done(null, false, { message: 'Incorrect password.' })
                    : done(null, false, { message: 'Incorrect username.' });
        });
    }));

login.post('/login', function (req, res, next) {
    console.log(req.body);
    passport.authenticate('local',
        function (err, user, info) {
            if (err) throw err;
            next(err);
            if (user) {
                req.logIn(user, err => {
                    if (err) throw err;
                    next(err);
                    res.redirect('/private');
                })
            } else {
                res.redirect('/');
            }
        })(req, res, next);
});


export { login };
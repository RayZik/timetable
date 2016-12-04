"use strict";
var express_1 = require("express");
var passport = require("passport");
var passport_local_1 = require("passport-local");
// import { UserModel } from "../../../../models/user";
var login = express_1.Router();
exports.login = login;
var User = require("../../../../models/user").UserModel;
// var user = new db({
// username: "admin",
// password: "admin"
// })
// user.save((err,user,affected)=>{
//     console.log(user);
// })
login.get("/", function (reqest, response) {
    User.find({}, function (err, res) {
        if (err)
            throw err;
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
passport.use('local', new passport_local_1.Strategy(function (username, password, done) {
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
    passport.authenticate('local', function (err, user, info) {
        if (err)
            throw err;
        next(err);
        if (user) {
            req.logIn(user, function (err) {
                if (err)
                    throw err;
                next(err);
                res.redirect('/private');
            });
        }
        else {
            res.redirect('/');
        }
    })(req, res, next);
});
//# sourceMappingURL=index.js.map
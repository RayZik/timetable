"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_local_1 = require("passport-local");
var User = require("../../../models/user").UserModel;
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use('local', new passport_local_1.Strategy(function (username, password, done) {
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
function authLocal(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err)
            throw err;
        next(err);
        if (user) {
            req.logIn(user, function (err) {
                if (err)
                    throw err;
                next(err);
                // res.setHeader('')
                res.redirect('/#/admin');
            });
        }
        else {
            res.redirect('/');
        }
        next();
    })(req, res, next);
}
exports.authLocal = authLocal;
//# sourceMappingURL=index.js.map
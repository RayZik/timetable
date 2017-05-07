const JwtStr = require('passport-jwt').Strategy;
const ExtJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user').UserModel;
const conf = require('../config/index.js');

module.exports = (passport) => {
    var opt = {};
    opt.jwtFromRequest = ExtJwt.fromAuthHeader();
    opt.secretOrKey = conf.secret;
    passport.use(new JwtStr(opt, (payload, done) => {

        User.findOne({ username: payload }, (err, user) => {
            if (err) { return done(err, false) }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
};
import * as passport from 'passport';
import { Strategy } from 'passport-local';
const User: any = require('../../../models/user').UserModel;

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local', new Strategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
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
    passport.authenticate('local',
        (err, user, info) => {
            if (err) throw err;
            next(err);
            if (user) {
                req.logIn(user, err => {
                    if (err) throw err;
                    next(err);
                    // res.setHeader('')
                    res.redirect('/#/admin');
                })
            } else {
                res.redirect('/');
            }
            next();
        })(req, res, next);
}

export { authLocal }

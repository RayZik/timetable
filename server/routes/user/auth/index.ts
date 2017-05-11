import { Router, Response, Request, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import * as passport from 'passport';

const config: any = require('../../../../config/index.js');
const auth: Router = Router();
const User = require('../../../../models/user').UserModel;

// var user = new User({
//     username: '1',
//     password: '12'
// })

// user.save((err, user, affected) => {
//     console.log(user);
// })

auth.post('/', (req: Request, res: Response, next: NextFunction) => {

    User.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.password === req.body.password) {
                let token = JWT.sign({ id: user._id }, config.secret);
                req.session.userId = user._id;
                res.send({ success: true, token: JSON.stringify(token) });
                res.end();
            } else {
                res.send({ success: false });
                res.end();
            }
        })
        .catch(next)
});

auth.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    if (req.session) {
        req.session.destroy(() => { });
        res.sendStatus(200);
        res.end();
    }
    res.redirect('/#/login');
    res.sendStatus(403);
    res.end();
});

export { auth };

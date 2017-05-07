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
                res.send({ success: true, token: JSON.stringify(token) });
            } else {
                res.send({ success: false });
            }
        })
        .catch(next)
});

export { auth };

import { Router, Response, Request, NextFunction } from 'express';

const login: Router = Router();
const User = require('../../../../models/user').UserModel;

// var user = new User({
//     username: '1',
//     password: '12'
// })

// user.save((err, user, affected) => {
//     console.log(user);
// })

login.get('/', (req: Request, res: Response, next: NextFunction) => {
    User.find({})
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

login.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.id)
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

export { login };

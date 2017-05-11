import { Router, Response, Request, NextFunction } from 'express';

const homeApi: Router = Router();
const db = require('../../../../models/user').UserModel;

// var user = new db({
// username: 'admin',
// password: 'admin'
// })

// user.save((err,user,affected)=>{
//     console.log(user);
// })

homeApi.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === 'null') { res.sendStatus(403); res.end(); }

    db.find({})
        .exec().then((result) => {
            res.json(result);
        }).catch(next);
});

export { homeApi };

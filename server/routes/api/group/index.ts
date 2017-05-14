import { Router, Response, Request, NextFunction } from 'express';

const group: Router = Router();

const Group = require('../../../../models/group').GroupModel;

group.get('/', (req: Request, res: Response, next: NextFunction) => {
    Group.find({})
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

group.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Group.findById(req.params.id)
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

group.put('/update/:id', (req: Request, res: Response, next: NextFunction) => {
    Group.update({ _id: req.body._id }, { $set: { name: req.body.name } })
        .exec().then((result) => {
            if (result.ok === 1) {
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }

        }).catch(next);

});

group.post('/create', (req: Request, res: Response, next: NextFunction) => {
    let grp = new Group({ name: req.body.name });
    grp.save()
        .then((result) => {
            if (result) {
                res.send(grp);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

group.delete('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
    Group.findById(req.params.id)
        .exec().then((result) => {
            if (result) {
                result.remove();
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

export { group };

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
        .exec().then(() => {
            res.end();
        }).catch(next);

});

group.post('/create', (req: Request, res: Response, next: NextFunction) => {
    let g = new Group({ name: req.body.name });
    g.save()
        .then((result) => {
            res.end();
        }).catch(next);
});

group.delete('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
    Group.findById(req.params.id)
        .exec().then((result) => {
            if (result != null) {
                result.remove();
                res.end();
            }
        }).catch(next);
});

export { group };

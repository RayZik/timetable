import { Router, Response, Request, NextFunction } from 'express';
import * as passport from 'passport';

const subject: Router = Router();

const Subject = require('../../../../models/subject').SubjectModel;

subject.get('/', (req: Request, res: Response, next: NextFunction) => {
    Subject.find({})
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

subject.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Subject.findById(req.params.id)
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

subject.put('/update/:id', (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === 'null') { res.sendStatus(403); res.end(); }

    Subject.update({ _id: req.body._id }, { $set: { name: req.body.name } })
        .exec().then(() => {
            res.end();
        }).catch(next);
});

subject.post('/create', (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === 'null') { res.sendStatus(403); res.end(); }

    let s = new Subject({ name: req.body.name });
    s.save()
        .then((result) => {
            res.end();
        }).catch(next);
});

subject.delete('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === 'null') { res.sendStatus(403); res.end(); }
    
    Subject.findById(req.params.id)
        .exec().then((result) => {
            if (result != null) {
                result.remove();
                res.end();
            }
        }).catch(next);
});


export { subject };

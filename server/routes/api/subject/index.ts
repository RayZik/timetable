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
    Subject.update({ _id: req.body._id }, { $set: { name: req.body.name } })
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

subject.post('/create', (req: Request, res: Response, next: NextFunction) => {
    let sbj = new Subject({ name: req.body.name });
    sbj.save()
        .then((result) => {
            if (result) {
                res.send(sbj);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

subject.delete('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
    Subject.findById(req.params.id)
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


export { subject };

import { Router, Response, Request, NextFunction } from 'express';

const teacher: Router = Router();

const Teacher = require('../../../../models/teacher').TeacherModel;

teacher.get('/', (req: Request, res: Response, next: NextFunction) => {
    Teacher.find({})
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

teacher.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Teacher.findById(req.params.id)
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

teacher.put('/update/:id', (req: Request, res: Response, next: NextFunction) => {
    Teacher.update({ _id: req.body._id }, {{ $set: { name: req.body.name, lastName: req.body.lastName, surname: req.body.surname } })
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

teacher.post('/create', (req: Request, res: Response, next: NextFunction) => {
    let tch = new Teacher({ name: req.body.name, lastName: req.body.lastName, surname: req.body.surname });
    tch.save()
        .then((result) => {
            if (result) {
                res.send(tch);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

teacher.delete('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
    Teacher.findById(req.params.id)
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

export { teacher };

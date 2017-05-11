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
    if (req.query.token === 'null') { res.sendStatus(403); res.end(); }

    Teacher.update({ _id: req.body._id }, { $set: { name: req.body.name, lastName: req.body.lastName, surname: req.body.surname } })
        .exec().then(() => {
            res.end();
        }).catch(next);
});

teacher.post('/create', (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === 'null') { res.sendStatus(403); res.end(); }

    let t = new Teacher({ name: req.body.name, lastName: req.body.lastName, surname: req.body.surname });
    t.save()
        .then((result) => {
            res.end();
        }).catch(next);
});

teacher.delete('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === 'null') { res.sendStatus(403); res.end(); }
    
    Teacher.findById(req.params.id)
        .exec().then((result) => {
            if (result != null) {
                result.remove();
            }
            res.end();
        }).catch(next);
});

export { teacher };

import { Router, Response, Request, NextFunction } from 'express';

const office: Router = Router();

const Office = require('../../../../models/office').OfficeModel;

office.get('/', (req: Request, res: Response, next: NextFunction) => {
    Office.find({})
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

office.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Office.findById(req.params.id)
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

office.put('/update/:id', (req: Request, res: Response, next: NextFunction) => {
    Office.update({ _id: req.body._id }, { $set: { name: req.body.name } })
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

office.post('/create', (req: Request, res: Response, next: NextFunction) => {
    let ofc = new Office({ name: req.body.name });
    ofc.save()
        .then((result) => {
            if (result) {
                res.send(ofc);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

office.delete('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
    Office.findById(req.params.id)
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

export { office };

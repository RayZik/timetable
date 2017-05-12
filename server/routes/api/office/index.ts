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
        .exec().then(() => {
            res.end();
        }).catch(next);
});

office.post('/create', (req: Request, res: Response, next: NextFunction) => {
    let o = new Office({ name: req.body.name });
    o.save()
        .then((result) => {
            res.end();
        }).catch(next);
});

office.delete('/remove/:id', (req: Request, res: Response, next: NextFunction) => {
    Office.findById(req.params.id)
        .exec().then((result) => {
            if (result != null) {
                result.remove();
                res.end();
            }
        }).catch(next);
});

export { office };

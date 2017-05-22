import { Router, Response, Request, NextFunction } from 'express';

const cellTimetableApi: Router = Router();

const cellTimetable = require('../../../../models/cellTimetable').CellTimetableModel;
const Group = require('../../../../models/group').GroupModel;
const Office = require('../../../../models/office').OfficeModel;
const Subject = require('../../../../models/subject').SubjectModel;
const Teacher = require('../../../../models/teacher').TeacherModel;

cellTimetableApi.get('/', (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.find()
        .populate('office')
        .populate('subject')
        .populate('teacher')
        .populate('group')
        .exec().then((result) => {
            res.send(result);
            res.end();
        }).catch(next);
});

cellTimetableApi.post('/add_teacher', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let cellId: string = req.body.cellId;

    cellTimetable.findById({ _id: cellId })
        .exec()
        .then((result) => {
            if (result) {
                result.teacher.push(req.body.id);
                result.save();
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

cellTimetableApi.post('/delete_teacher/:id', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let cellId: string = req.body.cellId;

    cellTimetable.update({ _id: cellId }, { $pull: { teacher: id } })
        .then((result) => {
            if (result.ok) {
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        })
        .catch(next)
});

cellTimetableApi.post('/add_group', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let cellId: string = req.body.cellId;

    cellTimetable.findById({ _id: cellId })
        .exec().then((result) => {
            if (result) {
                result.group.push(id);
                result.save();
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

cellTimetableApi.post('/delete_group/:id', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let cellId: string = req.body.cellId;

    cellTimetable.update({ _id: cellId }, { $pull: { group: id } })
        .then((result) => {
            if (result.ok) {
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end
            }
        })
        .catch(next)
});


cellTimetableApi.post('/add_subject', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let cellId: string = req.body.cellId;

    cellTimetable.findById({ _id: cellId })
        .exec().then((result) => {
            if (result) {
                result.subject.push(id);
                result.save();
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

cellTimetableApi.post('/delete_subject/:id', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let cellId: string = req.body.cellId;

    cellTimetable.update({ _id: cellId }, { $pull: { subject: id } })
        .then((result) => {
            if (result.ok) {
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        })
        .catch(next)
});

cellTimetableApi.post('/add_office', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id;
    let cellId: string = req.body.cellId;

    cellTimetable.findById({ _id: cellId })
        .exec().then((result) => {
            if (result) {
                result.office.push(id);
                result.save();
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
});

cellTimetableApi.post('/delete_office/:id', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id;
    let cellId: string = req.body.cellId;

    cellTimetable.update({ _id: cellId }, { $pull: { office: id } })
        .then((result) => {
            if (result.ok) {
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        })
        .catch(next)
});

cellTimetableApi.post('/add_cell', (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.body.id || false;

    if (id) {
        let t = new cellTimetable({ timetableId: id });
        t.save()

        res.sendStatus(200);
        res.end();
    } else {
        res.sendStatus(500);
        res.end();
    }
});

cellTimetableApi.post('/delete_cell/:id', (req: Request, res: Response, next: NextFunction) => {
    let time = req.body.time;

    cellTimetable.update({ _id: req.params.id }, { $set: { 'time': time } })
        .then((result) => {
            if (result.ok) {
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        })
        .catch(next)
});

cellTimetableApi.put('/save_cell', (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.id;
    let time = req.body.time;
    let timetableId = req.body.timetableId;

    cellTimetable.findOne({ _id: id })
        .exec().then((result) => {
            if (result) {
                let cell = new cellTimetable(result);
                time.forEach(e => {
                    cell.time.push({ begin: e.begin, end: e.end });
                });
                cell.save();
                res.sendStatus(200);
                res.end();
            } else {
                res.sendStatus(500);
                res.end();
            }
        }).catch(next);
    res.end();
});

export { cellTimetableApi };

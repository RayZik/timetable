import { Router, Response, Request, NextFunction } from "express";

const cellTimetableApi: Router = Router();

const cellTimetable = require("../../../../models/cellTimetable").CellTimetableModel;
const Group = require("../../../../models/group").GroupModel;
const Office = require("../../../../models/office").OfficeModel;
const Subject = require("../../../../models/subject").SubjectModel;
const Teacher = require("../../../../models/teacher").TeacherModel;

cellTimetableApi.get("/", (req: Request, res: Response, next: NextFunction) => {
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

cellTimetableApi.post("/add_teacher", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.findById({ _id: req.body.cellTimetableId })
        .exec().then((result) => {
            result.teacher.push(req.body.id);
            result.save();
            res.end();
        }).catch(next);
});

cellTimetableApi.post("/delete_teacher/:id", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.update({ _id: req.body.cellTimetableId }, { $pull: { teacher: req.params.id } })
        .then((r) => {
            console.log(r)
            res.end();
        })
        .catch(next)
});

cellTimetableApi.post("/add_group", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.findById({ _id: req.body.cellTimetableId })
        .exec().then((result) => {
            result.group.push(req.body.id);
            result.save();
            res.end();
        }).catch(next);
});

cellTimetableApi.post("/delete_group/:id", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.update({ _id: req.body.cellTimetableId }, { $pull: { group: req.params.id } })
        .then((r) => {
            console.log(r)
            res.end();
        })
        .catch(next)
});


cellTimetableApi.post("/add_subject", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.findById({ _id: req.body.cellTimetableId })
        .exec().then((result) => {
            result.subject.push(req.body.id);
            result.save();
            res.end();
        }).catch(next);
});

cellTimetableApi.post("/delete_subject/:id", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.update({ _id: req.body.cellTimetableId }, { $pull: { subject: req.params.id } })
        .then((r) => {
            console.log(r)
            res.end();
        })
        .catch(next)
});

cellTimetableApi.post("/add_office", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.findById({ _id: req.body.cellTimetableId })
        .exec().then((result) => {
            result.office.push(req.body.id);
            result.save();
            res.end();
        }).catch(next);
});

cellTimetableApi.post("/delete_office/:id", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.update({ _id: req.body.cellTimetableId }, { $pull: { office: req.params.id } })
        .then((r) => {
            console.log(r)
            res.end();
        })
        .catch(next)
});

cellTimetableApi.post("/add_cell", (req: Request, res: Response, next: NextFunction) => {
    let t = new cellTimetable();
    t.save()
    res.end();
});

cellTimetableApi.delete("/delete_cell/:id", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.findById({ _id: req.params.id })
        .then((r) => {
            r.remove();
            res.end();
        })
        .catch(next)
});

export { cellTimetableApi };
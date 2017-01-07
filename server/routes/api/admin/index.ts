import { Router, Response, Request, NextFunction } from "express";

const adminApi: Router = Router();
const Timetable = require("../../../../models/timetable").TimetableModel;
const Group = require("../../../../models/group").GroupModel;
const Office = require("../../../../models/office").OfficeModel;
const Subject = require("../../../../models/subject").SubjectModel;
const Teacher = require("../../../../models/teacher").TeacherModel;

// var off = new Office({ name: "21224" });
// off.save(function (err) {
//     if (err) return;
// });

// var gr = new Group({name:"4pasdi"});
// gr.save(function (err) {
//     if (err) return;
// });

// var su = new Subject({ name: "masdatan" });
// su.save(function (err) {
//     if (err) return;
// });

// var tea = new Teacher({ name: "Ivansad" , lastName:"Ivanosadsv" });
// tea.save(function (err) {
//     if (err) return;
// });

// var tt = new Timetable();
// tt._office.push(off._id);
// tt._subject.push(su._id);
// tt._teacher.push(tea._id);
// tt._group.push(gr._id);
// tt.time.push({begin:2, end:4});
// tt.save(function (err) {
//     if (err) return;
// });
// console.log(tt);

// Timetable.findOne({})
//     .populate('_office')
//     .populate('_subject')
//     .populate('_teacher')
//     .populate('_group')
//     .exec((err, blog) => {
//         if (err) return err;
//         console.log(blog);
//     });

adminApi.get("/", (req: Request, res: Response, next: NextFunction) => {
    Timetable.find()
        .populate('_office')
        .populate('_subject')
        .populate('_teacher')
        .populate('_group')
        .exec().then((result) => {
            res.send(result);
            res.end();
        }).catch(next);
});

adminApi.post("/add_teacher", (req: Request, res: Response, next: NextFunction) => {
    Timetable.findById({ _id: req.body.timetableLineId })
        .exec().then((result) => {
            result._teacher.push(req.body.id);
            result.save();
            res.end();
        }).catch(next);
});

adminApi.post("/delete_teacher/:id", (req: Request, res: Response, next: NextFunction) => {
    Timetable.update({ _id: req.body.idTimetable }, { $pull: { _teacher: req.params.id } })
        .then((r) => {
            console.log(r)
            res.end();
        })
        .catch(next)
});

adminApi.post("/add_group", (req: Request, res: Response, next: NextFunction) => {
    Timetable.findById({ _id: req.body.timetableLineId })
        .exec().then((result) => {
            result._group.push(req.body.id);
            result.save();
            res.end();
        }).catch(next);
});

adminApi.post("/delete_group/:id", (req: Request, res: Response, next: NextFunction) => {
    Timetable.update({ _id: req.body.idTimetable }, { $pull: { _group: req.params.id } })
        .then((r) => {
            console.log(r)
            res.end();
        })
        .catch(next)
});


adminApi.post("/add_subject", (req: Request, res: Response, next: NextFunction) => {
    Timetable.findById({ _id: req.body.timetableLineId })
        .exec().then((result) => {
            result._subject.push(req.body.id);
            result.save();
            res.end();
        }).catch(next);
});

adminApi.post("/delete_subject/:id", (req: Request, res: Response, next: NextFunction) => {
    Timetable.update({ _id: req.body.idTimetable }, { $pull: { _subject: req.params.id } })
        .then((r) => {
            console.log(r)
            res.end();
        })
        .catch(next)
});

adminApi.post("/add_office", (req: Request, res: Response, next: NextFunction) => {
    Timetable.findById({ _id: req.body.timetableLineId })
        .exec().then((result) => {
            result._office.push(req.body.id);
            result.save();
            res.end();
        }).catch(next);
});

adminApi.post("/delete_office/:id", (req: Request, res: Response, next: NextFunction) => {
    Timetable.update({ _id: req.body.idTimetable }, { $pull: { _office: req.params.id } })
        .then((r) => {
            console.log(r)
            res.end();
        })
        .catch(next)
});

export { adminApi };
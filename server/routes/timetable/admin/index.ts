import { Router, Response, Request, NextFunction } from "express";

const admin: Router = Router();
const Timetable = require("../../../../models/timetable").TimetableModel;
const Group = require("../../../../models/group").GroupModel;
const Office = require("../../../../models/office").OfficeModel;
const Subject = require("../../../../models/subject").SubjectModel;
const Teacher = require("../../../../models/teacher").TeacherModel;

// var off = new Office({ name: "214" });
// off.save(function (err) {
//     if (err) return;
// });

// var gr = new Group({ name: "4pi" });
// gr.save(function (err) {
//     if (err) return;
// });

// var su = new Subject({ name: "matan" });
// su.save(function (err) {
//     if (err) return;
// });

// var tea = new Teacher({ name: "Ivan" , lastName:"Ivanov" });
// tea.save(function (err) {
//     if (err) return;
// });

//var tt = new Timetable();
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

admin.get("/", (req: Request, res: Response) => {
    Timetable.findOne({})
        .populate('_office')
        .populate('_subject')
        .populate('_teacher')
        .populate('_group')
        .exec((err, table) => {
            if (err) return err;
            res.send(table);
        });
});

admin.post("/", (req: Request, res: Response) => {
    Timetable.findOne({ _id: req.body.id })
        .populate('_office')
        .populate('_subject')
        .populate('_teacher')
        .populate('_group')
        .exec((err, table) => {
            if (err) {
                res.status(500);
            } else {
                table.time[0].end = req.body.timeEnd;
                table.time[0].begin = req.body.timeBegin;
                table.save();

                Group.findOne({ _id: table._group[0]._id }, (err, result) => {
                    if (err) throw err;
                    result.name = req.body.group;
                    result.save();
                });

                Teacher.findOne({ _id: table._teacher[0]._id }, (err, result) => {
                    if (err) throw err;
                    result.name = req.body.tName;
                    result.lastName = req.body.tLName;
                    result.save();
                });

                Subject.findOne({ _id: table._subject[0]._id }, (err, result) => {
                    if (err) throw err;
                    result.name = req.body.subject;
                    result.save();
                });

                Office.findOne({ _id: table._office[0]._id }, (err, result) => {
                    if (err) throw err;
                    result.name = req.body.office;
                    result.save();
                });
            }
        });
});

export { admin }; 
import { Router, Response, Request, NextFunction } from "express";

const teacher: Router = Router();

const Timetable = require("../../../../models/timetable").TimetableModel;
const Teacher = require("../../../../models/teacher").TeacherModel;

teacher.get("/", (req: Request, res: Response) => {
    Teacher.find({}, (err, Obj) => {
        if (err) {
            res.status(500);
        } else {
            res.json(Obj);
        }
    });
});

teacher.get("/:id", (req: Request, res: Response) => {
    Teacher.findById(req.params.id, (err, Obj) => {
        if (err) {
            res.status(500);
        } else {
            res.json(Obj);
        }
    });
});

teacher.post("/:id", (req: Request, res: Response) => {
    Teacher.update({ _id: req.body._id }, { $set: { name: req.body.name, lastName: req.body.lastName } }, (err, result) => {
        if (err) {
            res.status(500);
        } else {
            console.log(result);
        }
    });
});

teacher.post("/", (req: Request, res: Response) => {
    var t = new Teacher({ name: req.body.name, lastName: req.body.lastName });
    t.save(function (err) {
        if (err) return err;
        console.log(t);
    });
});

export { teacher }; 
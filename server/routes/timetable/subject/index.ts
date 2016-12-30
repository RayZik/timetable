import { Router, Response, Request, NextFunction } from "express";

const subject: Router = Router();

const Timetable = require("../../../../models/timetable").TimetableModel;
const Subject = require("../../../../models/subject").SubjectModel;

subject.get("/", (req: Request, res: Response) => {
    Subject.find({}, (err, Obj) => {
        if (err) {
            res.status(500);
        } else {
            res.json(Obj);
        }
    });
});

subject.get("/:id", (req: Request, res: Response) => {
    Subject.findById(req.params.id, (err, Obj) => {
        if (err) {
            res.status(500);
        } else {
            res.json(Obj);
        }
    });
});

subject.post("/:id", (req: Request, res: Response) => {
    Subject.update({ _id: req.body._id }, { $set: { name: req.body.name } }, (err, result) => {
        if (err) {
            res.status(500);
        }
    });
});

export { subject }; 
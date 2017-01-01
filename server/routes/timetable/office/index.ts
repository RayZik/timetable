import { Router, Response, Request, NextFunction } from "express";

const office: Router = Router();

const Timetable = require("../../../../models/timetable").TimetableModel;
const Office = require("../../../../models/office").OfficeModel;

office.get("/", (req: Request, res: Response) => {
    Office.find({}, (err, Obj) => {
        if (err) {
            res.status(500);
        } else {
            res.json(Obj);
        }
    });
});

office.get("/:id", (req: Request, res: Response) => {
    Office.findById(req.params.id, (err, Obj) => {
        if (err) {
            res.status(500);
        } else {
            res.json(Obj);
        }
    });
});

office.post("/:id", (req: Request, res: Response) => {
    Office.update({ _id: req.body._id }, { $set: { name: req.body.name } }, (err, result) => {
        if (err) {
            res.status(500);
        }
    });
});

export { office }; 
import { Router, Response, Request, NextFunction } from "express";

const group: Router = Router();

const Timetable = require("../../../../models/timetable").TimetableModel;
const Group = require("../../../../models/group").GroupModel;

group.get("/", (req: Request, res: Response) => {
    Group.find({}, (err, Obj) => {
        if (err) {
            res.status(500);
        } else {
            res.json(Obj);
        }
    });
});

group.get("/:id", (req: Request, res: Response) => {
    Group.findById(req.params.id, (err, Obj) => {
        if (err) {
            res.status(500);
        } else {
            res.json(Obj);
        }
    });
});

group.post("/:id", (req: Request, res: Response) => {
    Group.update({ _id: req.body._id }, { $set: { name: req.body.name} },(err,result)=>{
        if(err){
            res.status(500);
        }
    });
});

export { group }; 
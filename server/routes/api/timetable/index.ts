import { Router, Response, Request, NextFunction } from "express";

const timetableApi: Router = Router();

const Timetable = require("../../../../models/timetable").TimetableModel;
const cellTimetable = require("../../../../models/cellTimetable").CellTimetableModel;

timetableApi.get("/", (req: Request, res: Response, next: NextFunction) => {
    Timetable.find({})
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

timetableApi.post("/add_date", (req: Request, res: Response, next: NextFunction) => {
    let les = new Timetable({
        beginDate: req.body.beginDate,
        endDate: req.body.endDate
    });
    les.save();
    console.log("ADDED");
    res.end();
});

timetableApi.post("/add_time_lesson", (req: Request, res: Response, next: NextFunction) => {
    Timetable.findOneAndUpdate({}, { $push: { lessons: { begin: req.body.begin, end: req.body.end } } })
        .exec().then(() => {
            console.log("ADDED");
            res.end();
        }).catch(next);
});

timetableApi.put("/set_time_cell", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.update({ _id: req.body.idCell }, { $push: { time: { begin: req.body.begin, end: req.body.begin } } })
        .exec().then(() => {
            console.info("time setted ");
            res.end();
        }).catch(next);
});

export { timetableApi }; 
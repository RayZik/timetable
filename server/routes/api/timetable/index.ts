import { Router, Response, Request, NextFunction } from "express";

const timetableApi: Router = Router();

const Timetable = require("../../../../models/timetable").TimetableModel;

timetableApi.get("/", (req: Request, res: Response, next: NextFunction) => {
    Timetable.find({})
        .exec().then((result) => {
            res.json(result);
            res.end();
        }).catch(next);
});

timetableApi.post("/add_time_lesson", (req: Request, res: Response, next: NextFunction) => {
    let les = new Timetable({
        beginDate: Date.now(),
        endDate: Date.now(),
        lessons: {
            begin: req.body.begin,
            end: req.body.end
        }
    });
    console.log(les);
});

export { timetableApi }; 
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
    res.end();
});

timetableApi.post("/add_time_lesson", (req: Request, res: Response, next: NextFunction) => {
    Timetable.findOneAndUpdate({}, { $push: { lessons: { begin: req.body.begin, end: req.body.end } } })
        .exec().then(() => {
            res.end();
        }).catch(next);
});

timetableApi.put("/save", (req: Request, res: Response, next: NextFunction) => {
    let data = req.body.data;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].slots.length; j++)
            if (data[i].slots[j].length > 0) {
                data[i].slots[j].forEach(cell => {
                    let dateBegin = new Date();
                    let dateEnd = new Date();
                    cellTimetable.update({ _id: cell._id }, { $push: { time: { begin: dateBegin.setTime(data[i].begin), end: dateEnd.setTime(data[i].end) } } })
                        .exec().then(() => {
                            // console.log('Saved: _id: ' + cell._id + ' begin: ' + dateBegin.setTime(data[i].begin) + ' end: ' + dateEnd.setTime(data[i].end))
                            res.end();
                        }).catch(next);
                });
            }
    }
});

export { timetableApi }; 
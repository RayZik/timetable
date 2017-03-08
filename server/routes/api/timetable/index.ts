import { Router, Response, Request, NextFunction } from "express";
import * as moment from 'moment';

const timetableApi: Router = Router();

const Timetable = require("../../../../models/timetable").TimetableModel;
const cellTimetable = require("../../../../models/cellTimetable").CellTimetableModel;
const holiday = require("../../../../models/holiday").HolidayModel;

// let h = new holiday({date: moment().toDate()});
// h.save();

timetableApi.get("/", (req: Request, res: Response, next: NextFunction) => {
    Timetable.find({})
        .exec().then((result) => {
            res.send(result);
            res.end();
        }).catch(next);
});

timetableApi.get("/holidays", (req: Request, res: Response, next: NextFunction) => {
    holiday.find({})
        .exec().then((result) => {
            res.send(result);
            res.end();
        }).catch(next);
});

timetableApi.post("/add_date", (req: Request, res: Response, next: NextFunction) => {
    let begin: Date = moment.utc(req.body.beginDate).toDate();
    let end: Date = moment.utc(req.body.endDate).toDate();

    let les = new Timetable({
        beginDate: begin,
        endDate: end
    });
    les.save();
    res.end();
});

timetableApi.post("/add_time_lesson", (req: Request, res: Response, next: NextFunction) => {
    let date: Date = moment(0).hour(0).toDate();
    let begin: Number = moment(date).minute(req.body.begin).unix();
    let end: Number = moment(date).minute(req.body.end).unix();
    Timetable.findOneAndUpdate({}, { $push: { lessons: { begin: begin, end: end } } })
        .exec().then(() => {
            res.end();
        }).catch(next);
});

timetableApi.put("/save_one", (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.id;
    let time = req.body.time;
    cellTimetable.findOneAndUpdate({ _id: id }, { $push: { time: { begin: time.begin, end: time.end } } })
        .exec().then((res) => {
        }).catch(next);
    res.end();
});

timetableApi.put("/save_to_end", (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.id;
    let time = req.body.time;

    cellTimetable.findOne({ _id: id })
        .exec().then((res) => {

            let cell = new cellTimetable(res);
            time.forEach(e => {
                cell.time.push({ begin: e.begin, end: e.end });
            });
            cell.save();
        }).catch(next);
    res.end();
});

timetableApi.post("/delete_time_lesson", (req: Request, res: Response, next: NextFunction) => {
    let lesson = req.body.lesson;

    Timetable.findOne({})
        .exec().then((result) => {
            result.lessons.forEach(les => {
                if (les._id == lesson[0]) {
                    les.remove();
                    lesson[1].forEach(cellId => {
                        cellTimetable.findOneAndUpdate({ _id: cellId }, { $set: { time: [] } })
                            .exec().then(() => { }).catch(next);
                    });
                }
            });
        }).catch(next);
    res.end();
});

export { timetableApi }; 
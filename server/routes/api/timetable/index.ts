import { Router, Response, Request, NextFunction } from "express";
import * as moment from 'moment';

const timetableApi: Router = Router();

const Timetable = require("../../../../models/timetable").TimetableModel;
const cellTimetable = require("../../../../models/cellTimetable").CellTimetableModel;

timetableApi.get("/", (req: Request, res: Response, next: NextFunction) => {
    cellTimetable.find({})
        .exec().then((result) => {
            if(result){

            }
            res.end();
        }).catch(next);
});

timetableApi.post("/add_date", (req: Request, res: Response, next: NextFunction) => {
    let begin: Date = new Date(moment.utc(req.body.beginDate).format());
    let end: Date = new Date(moment.utc(req.body.endDate).format());

    let les = new Timetable({
        beginDate: begin,
        endDate: end
    });
    les.save();

    res.end();
});

timetableApi.post("/add_time_lesson", (req: Request, res: Response, next: NextFunction) => {
    let date: Date = new Date(moment(new Date(0)).hour(0).format());
    let begin: Number = moment(date).minute(req.body.begin).unix().valueOf();
    let end: Number = moment(date).minute(req.body.end).unix().valueOf();
    Timetable.findOneAndUpdate({}, { $push: { lessons: { begin: begin, end: end } } })
        .exec().then(() => {
            res.end();
        }).catch(next);
});

timetableApi.put("/save", (req: Request, res: Response, next: NextFunction) => {
    let data = req.body.data;
    data.forEach(item => {
        cellTimetable.findOneAndUpdate(item[0]._id, { $set: { time: { begin:item[1].begin, end: item[1].end } } })
        .exec().then(() => {
            res.end();
        }).catch(next); 
    });

});

timetableApi.post("/delete_time_lesson", (req: Request, res: Response, next: NextFunction) => {
    let lesson = req.body.lesson;

    Timetable.findById(lesson._id)
        .exec().then((result) => {
            if (result != null) {
                result.remove();

                lesson.slots.forEach(slot => {
                    slot.forEach(id => {
                        cellTimetable.update({ _id: lesson.id }, {
                            $pull: {
                                time: {
                                    begin: lesson.begin,
                                    end: lesson.end
                                }
                            }
                        })
                            .exec().then(() => {
                                res.end();
                            }).catch(next);
                    });
                    res.end();
                }).catch(next);
            }

        });
});

export { timetableApi }; 
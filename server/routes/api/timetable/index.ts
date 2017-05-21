import { Router, Response, Request, NextFunction } from 'express';
import * as moment from 'moment';
import * as passport from 'passport';

const timetableApi: Router = Router();

const Timetable = require('../../../../models/timetable').TimetableModel;
const cellTimetable = require('../../../../models/cellTimetable').CellTimetableModel;
const holiday = require('../../../../models/holiday').HolidayModel;
const User = require('../../../../models/user').UserModel;
// let h = new holiday({date: moment().toDate()});
// h.save();

function isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session.userId) {
        User.find({ _id: req.session.userId })
            .exec()
            .then((user) => {
                if (!user) {
                    res.redirect('/#/login');
                } else {
                    next();
                }
            });
    } else {
        res.redirect('/#/login');
    }
}

timetableApi.get('/', (req: Request, res: Response, next: NextFunction) => {

    Timetable.find({})
        .exec()
        .then((result) => {
            res.send(result);
            res.end();
        }).catch(next);
});

timetableApi.get('/holidays', (req: Request, res: Response, next: NextFunction) => {
    holiday.find({})
        .exec().then((result) => {
            res.send(result);
            res.end();
        }).catch(next);
});

timetableApi.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Timetable.findById({ _id: req.params.id })
        .exec()
        .then((result) => {
            res.send(result);
            res.end();
        }).catch(next);
});



timetableApi.post('/add_date', (req: Request, res: Response, next: NextFunction) => {
    let begin: Date = moment.utc(req.body.beginDate).toDate();
    let end: Date = moment.utc(req.body.endDate).toDate();
    let name = req.body.name;

    if (!!begin && !!end && !!name) {
        let les = new Timetable({
            name: name,
            beginDate: begin,
            endDate: end
        });
        les.save();
        res.send(les);
        res.sendStatus(200);
        res.end();
    } else {
        res.sendStatus(500);
        res.end();
    }
});

timetableApi.post('/add_time_lesson', (req: Request, res: Response, next: NextFunction) => {


    let date: Date = moment(0).hour(0).toDate();
    let begin: Number = moment(date).minute(req.body.begin).unix();
    let end: Number = moment(date).minute(req.body.end).unix();
    let id: string = req.body.timetableId;

    Timetable.findOneAndUpdate({ _id: id }, { $push: { lessons: { begin: begin, end: end } } })
        .exec().then().catch(next);
});

timetableApi.post('/delete_time_lesson', (req: Request, res: Response, next: NextFunction) => {


    let lesson = req.body.lesson;

    Timetable.findOne({})
        .exec().then((result) => {
            result.lessons.forEach(les => {
                if (les._id === lesson[0]) {
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

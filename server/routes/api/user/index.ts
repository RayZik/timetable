import { Router, Response, Request, NextFunction } from 'express';

const userApi: Router = Router();
const cellTimetable = require('../../../../models/cellTimetable').CellTimetableModel;
const Timetable = require('../../../../models/timetable').TimetableModel;
const Group = require('../../../../models/group').GroupModel;
const Teacher = require('../../../../models/teacher').TeacherModel;
const Subject = require('../../../../models/subject').SubjectModel;
const Office = require('../../../../models/office').OfficeModel;

userApi.get('/', (req: Request, res: Response, next: NextFunction) => {
    let result: Object = {};

    cellTimetable.find()
        .populate('office')
        .populate('subject')
        .populate('teacher')
        .populate('group')
        .exec().then((cells) => {
            result['cells'] = cells;
            Timetable.find({})
                .exec().then((time) => {
                    result['timeLesson'] = time;
                    res.send(result);
                    res.end();
                }).catch(next);
        }).catch(next);
});



userApi.get('/filter', (req: Request, res: Response, next: NextFunction) => {
    let result: Object = {};
    Group.find({})
        .exec().then((group) => {
            result['group'] = group;

            Teacher.find({})
                .exec().then((teacher) => {
                    result['teacher'] = teacher;

                    Subject.find({})
                        .exec().then((subject) => {
                            result['subject'] = subject;

                            Office.find({})
                                .exec().then((office) => {
                                    result['office'] = office;
                                    res.json(result);
                                    res.end();
                                }).catch(next);

                        }).catch(next);

                }).catch(next);
        }).catch(next);
});

export { userApi };

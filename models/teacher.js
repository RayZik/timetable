"use strict";
var mongoose = require('../lib/mongoose');
var Timetable = require('./timetable').TimetableModel;
var Schema = mongoose.Schema;

var Teacher = new Schema({
    _timeT: { type: Schema.Types.ObjectId, ref: 'Timetable' },
    name: {
        type: String,
        unique: true,
        required: true
    },
     lastName: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports.TeacherModel = mongoose.model('Teacher', Teacher);
module.exports.Teacher = Teacher;
"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var Teacher = new Schema({
    _timeT: { type: Schema.Types.ObjectId, ref: 'CellTimetable' },
    name: {
        type: String,
        required: true
    },
     lastName: {
        type: String,
        required: true
    }
});

module.exports.TeacherModel = mongoose.model('Teacher', Teacher);
module.exports.Teacher = Teacher;
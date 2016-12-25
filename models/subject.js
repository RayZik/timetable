"use strict";
var mongoose = require('../lib/mongoose');
var Timetable = require('./timetable').TimetableModel;
var Schema = mongoose.Schema;

var Subject = new Schema({
    _timeT: { type: Schema.Types.ObjectId, ref: 'Timetable' },
    name: {
        type: String,
        unique: true,
        required: true,
        index:true
    }
});

module.exports.SubjectModel = mongoose.model('Subject', Subject);
module.exports.Subject = Subject;
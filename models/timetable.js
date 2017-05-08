"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var Timetable = new Schema({
    name: String,
    beginDate: Date,
    endDate: Date,
    lessons: [{
        begin: Number,
        end: Number
    }]
});

module.exports.TimetableModel = mongoose.model('Timetable', Timetable);
module.exports.Timetable = Timetable;
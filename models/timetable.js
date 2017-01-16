"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var Timetable = new Schema({
    beginDate: Date,
    endDate: Date,
    lessons: [{
        begin: String,
        end: String
    }]
});

module.exports.TimetableModel = mongoose.model('Timetable', Timetable);

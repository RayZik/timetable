"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var CellTimetable = new Schema({
    timetableId: {
        type: String,
        required: true
    },
    office: [{
        type: Schema.Types.ObjectId,
        ref: 'Office'
    }],
    group: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
    subject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    time: [{
        begin: Date,
        end: Date
    }]

});

module.exports.CellTimetableModel = mongoose.model('CellTimetable', CellTimetable);
module.exports.CellTimetable = CellTimetable;
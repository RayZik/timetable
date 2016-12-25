"use strict";
var mongoose = require('../lib/mongoose');

var Office = require('./office').OfficeModel,
    Group = require("./group").Group,
    Teacher = require("./teacher").Teacher,
    Subject = require("./subject").Subject;

var Schema = mongoose.Schema;

var Timetable = new Schema({
    _office: [{
        type: Schema.Types.ObjectId,
        ref: 'Office'
    }],
    _group: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    _teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
    _subject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    time: [{ begin: Number, end: Number }]
});

module.exports.TimetableModel = mongoose.model('Timetable', Timetable);

"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var Subject = new Schema({
    _timeT: { type: Schema.Types.ObjectId, ref: 'CellTimetable' },
    name: {
        type: String,
        unique: true,
        required: true,
        index:true
    }
});

module.exports.SubjectModel = mongoose.model('Subject', Subject);
module.exports.Subject = Subject;
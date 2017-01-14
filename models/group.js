"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var Group = new Schema({
    _timeT: { type: Schema.Types.ObjectId, ref: 'CellTimetable' },
    name: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports.GroupModel = mongoose.model('Group', Group);
module.exports.Group = Group;
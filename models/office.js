"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var Office = new Schema({
    _timeT: { type: Schema.Types.ObjectId, ref: 'CellTimetable' },
    name: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports.OfficeModel = mongoose.model('Office', Office);
module.exports.Office = Office;
"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var Holiday = new Schema({
    date: Date,
    name: String
});

module.exports.HolidayModel = mongoose.model('Holiday', Holiday);

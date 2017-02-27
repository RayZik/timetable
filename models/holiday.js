"use strict";
var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;

var Holiday = new Schema({
    date: [{}]
});

module.exports.HolidayModel = mongoose.model('Holiday', Holiday);

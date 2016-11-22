"use strict";

var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
username: {
    type: String,
    unique: true,
    required: true
},
created: {
    type: Date,
    default: Date.now
}
});

exports.User = mongoose.model('User',schema);
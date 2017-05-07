"use strict";
var bcrypto = require('bcrypt-nodejs');
var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

User.methods.compPasw = (req, done) => {
    if (this.password !== req) {
        return done(null, false)
    }
    done(null, true);
}

module.exports.UserModel = mongoose.model('User', User);
const mongoose = require('mongoose');
const login = 'mralexrabota';
const psw = '192837465Zd'

mongoose.connect('mongodb://' + login + ':' + psw + '@ds149511.mlab.com:49511/timetable_mean');
var db = mongoose.connection.db;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function cb() {
    console.log('Connected to DB');
});

module.exports = mongoose;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Timetable');
var db = mongoose.connection.db;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function cb(){
  console.log('Connected to DB');
});

module.exports = mongoose;
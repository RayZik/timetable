var mongoose = require('mongoose'),
assert = require('assert');;
//var config = require('config');

// mongoose.connect("mongodb://localhost:27017/Timetable",(err,db)=>{
//     assert.equal(null,err);
//     console.log("CONNECTED_TO_DB");
// });

mongoose.connect('mongodb://localhost:27017/Timetable');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
  console.log('Connected to DB');
});

module.exports = mongoose;
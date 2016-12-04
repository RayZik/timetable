// var passport = require('passport');
// var LocalStrat = require('passport-local');
// var User = require("../../../../models/user").UserModel;

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.getUserById(id, function (err, user) {
//         done(err, user);
//     });
// });

// passport.use('login', new LocalStrat(
//     function (username, password, done) {
//         User.getUserByUsername(username, function (err, user) {
//             if (err) throw err;
//             if (!user) {
//                 return done(null, false, { message: 'Unknown User' });
//             }

//             User.comparePassword(password, user.password, function (err, isMatch) {
//                 if (err) throw err;
//                 if (isMatch) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false, { message: 'Invalid password' });
//                 }
//             });
//         });
//     }));

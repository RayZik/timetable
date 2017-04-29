var User = require('../models/user').UserModel;

var user = new User({
    username: 'admin',
    hashPassword: 'dasdasdasd',
    salt: 'sdadfsdpfkdsp',
    created: Date.now
});
user.save();
var User = require('../models/user').UserModel;

var users = [new User({
    username: 'admin',
    hashPassword: 'dasdasdasd',
    salt: 'sdadfsdpfkdsp',
    created: Date.now
}),
new User({
    username: 'admin2',
    hashPassword: 'sdfsdfsdf',
    salt: 'sdfsdf',
    created: Date.now
})
];
for(var i = 0; i < users.length; i++){
    users[i].save();
}
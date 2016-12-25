var nconfig = require('nconf');
var path = require('path');

nconfig.argv()
    .env()
    .file({file: path.join(__dirname,'config.json')});

module.exports = nconfig;
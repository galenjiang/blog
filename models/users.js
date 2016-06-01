var mongoose = require('mongoose');
var configure = require('../configure');
mongoose.connect(configure.dbUrl + ':' +  configure.dbPort + '/' + configure.dbName);

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

exports.userModel = mongoose.model('user', userSchema);
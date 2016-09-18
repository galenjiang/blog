var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
});

exports.userModel = mongoose.model('user', userSchema);
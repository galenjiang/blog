var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    title: String,
    brief: String,
    content: String,
    image: String,
    createAt: {type: Date, default: Date.now()}
});

exports.articleModel = mongoose.model('article', articleSchema);
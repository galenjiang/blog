/**
 * Created by Galen on 2016/5/31.
 */
var express = require('express');
var router = express.Router();
//注册
router.get('/post', function(req, res, next) {
    res.send('发表文章');
});

module.exports = router;
var express = require('express');
var router = express.Router();
//注册
router.get('/reg', function(req, res, next) {
  res.send('reg');
});
//登陆
router.get('/login', function(req, res, next) {
  res.send('login');
});
//登出
router.get('/logout', function(req, res, next) {
  res.send('logout');
});



module.exports = router;

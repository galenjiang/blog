var express = require('express');
var router = express.Router();
var userModel = require('../models/users').userModel;
var util = require('../util');


//注册页面
router.get('/reg', function(req, res, next) {
  res.render('users/reg',{
    title: '注册'
  });
});


//注册提交
router.post('/reg', function(req, res, next) {
  //加密
  req.body.password = util.md5(req.body.password);

  userModel.create(req.body,function(err, doc){
    res.redirect('/users/login');
  })
});



//登陆页面
router.get('/login', function(req, res, next) {
  res.render('users/login',{
    title: '登录'
  });
});


//登陆提交
router.post('/login', function(req, res, next) {
  req.body.password = util.md5(req.body.password);

  userModel.findOne(req.body, function(err,doc){
    if(err){
      res.redirect('back');
    }else{
      if(doc){
        res.redirect('/');
      }else{
        res.redirect('back');
      }
    }
  })
});



//登出
router.get('/logout', function(req, res, next) {
  res.render('users/logout',{
    title: 'logout'
  });
});


module.exports = router;

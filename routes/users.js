var express = require('express');
var router = express.Router();
var userModel = require('../mongo-models/users').userModel;
var util = require('../util');
var auth = require('../middleware/auth');


//注册页面
router.get('/reg', auth.checkNoLogin,function(req, res) {
  res.render('users/reg',{
    title: '注册'
  });
});


//注册提交
router.post('/reg', function(req, res) {
  //加密
  req.body.password = util.md5(req.body.password);
  req.body.avatar = 'https://www.gravatar.com/avatar/' + util.md5(req.body.email);
  userModel.findOne({$or:[{username: req.body.username},{email: req.body.email}]}, function(err, doc){
    if(err){
      req.flash('error', '系统错误！');
      res.redirect('back')
    }else{
      if(doc){
        req.flash('error', '已存在用户名或者邮箱,请重新注册！');
        res.redirect('back')
      }else{
        userModel.create(req.body,function(err, doc){
          req.flash('success', '注册成功， 请登录！');
          res.redirect('/users/login');
        })
      }

    }
  });

});



//登陆页面
router.get('/login', auth.checkNoLogin, function(req, res) {
  res.render('users/login',{
    title: '登录'
  });
});


//登陆提交
router.post('/login', function(req, res) {
  req.body.password = util.md5(req.body.password);

  userModel.findOne(req.body, function(err,doc){
    if(err){
      req.flash('error', '登录失败！');
      res.redirect('back');
    }else{
      if(doc){
        req.session.user = doc;
        req.flash('success', '登录成功！');
        res.redirect('/');
      }else{
        req.flash('error', '登录失败！');
        res.redirect('back');
      }
    }
  })
});


//登出
router.get('/logout', auth.checkLogin, function(req, res) {
  req.session.user = null;
  req.flash('success', '登出成功');
  res.redirect('/users/login')
});


module.exports = router;

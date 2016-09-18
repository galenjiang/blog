var auth = require('../middleware/auth');
var express = require('express');
var router = express.Router();
var articleModel = require('../mongo-models/articles').articleModel;
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage });

// 发表文章
router.get('/add', auth.checkLogin, function(req, res) {
    res.render('articles/add',{
        title: '发表文章'
    });
});

router.post('/add', upload.single('image'),function(req, res) {
    console.log(req.body);
    if(!req.body.title){
        req.flash('error', '请输入标题');
        res.redirect('back');
    }else if(!req.body.brief){
        req.flash('error', '请输入简介');
        res.redirect('back');
    }else if(!req.body.content){
        req.flash('error', '请输入文章内容');
        res.redirect('back');
    }else{
        req.body.user = req.session.user._id;
        if(req.file){
            req.body.image = '/uploads/' + req.file.filename;
        }

        articleModel.create(req.body, function(err, doc){
            if(err){
                req.flash('error', '文章发表失败');
                res.redirect('back');

            }else{
                req.flash('success', '文章发表成功');
                res.redirect('/')

            }

        });
    }




});

module.exports = router;
var express = require('express');
var router = express.Router();
var articleModel = require('../mongo-models/articles').articleModel;
var markdown = require('markdown');

/* GET home page. */
router.get('/', function(req, res) {
  var search = req.query.search;
  var submit = req.query.submit;
  var size = parseInt(req.query.size) || 3;
  var page = parseInt(req.query.page) || 1;


  var queryObject = {};
  if(submit){
    req.session.search = search;
  }
  search = req.session.search;

  var expSearch = new RegExp(search,'i');
  queryObject = {$or: [{title: expSearch}, {brief: expSearch}]};


  articleModel.find(queryObject).skip(size*(page-1)).limit(size).populate('user').exec(function(err, doc){
    if(err){
    }else{
      doc.forEach(function(el){
        el.content = markdown.parse(el.content);
      });
      articleModel.count(queryObject, function(err, count){
        if(err){
        }else{

          res.render('index', {
            articles: doc,
            title: '主页',
            keyword: search,
            page: page,
            size: size,
            total: Math.ceil(count/size)

          })
        }

      });


    }
  });
});

module.exports = router;

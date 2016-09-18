exports.checkLogin = function(req, res, next){
    if(req.session.user){
        next();
    }else{
        req.flash('error', '必须登录才能访问');
        res.redirect('/users/login');
    }
};

exports.checkNoLogin = function(req, res, next){
    if(!req.session.user){
        next();
    }else{
        req.flash('error', '必须未登录才能访问');
        res.redirect('/');
    }
};
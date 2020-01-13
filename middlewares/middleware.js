var db = require('../db');

module.exports.cookie = function(req, res,next){
   if(!req.signedCookies.userId){
      res.redirect('/auth/login');
      return;
   }
   var userId = db.get('account').find({id: req.signedCookies.userId}).value();
   if(!userId){
   	  res.redirect('/auth/login');
      return;
   }
   res.locals.user = userId;
   next();
};

const shortid = require('shortid');
var db = require('../db');
var md5 = require('md5');
module.exports.login = function (req, res){
   res.render('auth/login');
};

module.exports.signin = function(req, res){
	res.render('auth/signin');
};

module.exports.postLogin = function(req, res){
	var email = req.body.email;
    var password = req.body.password;
    var id = shortid.generate();
	var user = db.get('account').find({email: email}).value();
	if(!user){
		res.render('auth/login',{
           errors: [
              'email does not exits'
           ],
           values : req.body
		});
		return;
	}
	if(user.password !== md5(password)){
		res.render('auth/login',{
           errors: [
              'wrong password'
           ],
           values: req.body
		});
		return;
	}
	res.cookie('userId',id,{
		signed: true
	});
	db.get('account').find({email: email}).assign({id: id}).write();
	res.redirect('/users');
}
module.exports.postSignin = function(req, res){
    req.body.id = shortid.generate();
    var account = {
    	id: req.body.id,
    	email: req.body.email,
    	password: md5(req.body.password),
    	name: req.body.name
    }
    db.get('account').push(account).write();
    res.cookie('userId',req.body.id,{
    	signed: true
    } );
    res.redirect('/users');
};

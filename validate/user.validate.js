var db = require('../db');

module.exports.createPost = function(req, res, next){
	var error=[];
	if(!req.body.name){
		error.push("Name is required");
	}
	if(!req.body.phone){
		error.push("Phone is required");
	}
	if(error.length){
		res.render('user/create',{
			errors: error,
			values: req.body
		});
		return;
	}
	next();
};
module.exports.postValidateSignin = function(req, res, next){
	var errors =[];
	if(!req.body.name){
		errors.push('name is required');
	}
	if(!req.body.email){
		errors.push('email is required');
	}
	var email = req.body.email;
	if(!db.get('account').find({email: email}).value()){
		if(!req.body.password){
			errors.push('password is required');
		}
		if(!req.body.validate_password){
			errors.push('validate_password is required');
		}
		if(req.body.password != req.body.validate_password){
			errors.push('password is not validate');
		}

	}else {
		errors.push("Email already exists");
	}
	
	if(errors.length){
		res.render('auth/signin',{
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
};